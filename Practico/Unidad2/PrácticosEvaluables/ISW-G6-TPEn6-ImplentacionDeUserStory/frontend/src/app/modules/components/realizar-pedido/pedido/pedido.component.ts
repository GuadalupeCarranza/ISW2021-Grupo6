import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Pedido } from "../../../../models/pedido";
import { Tarjeta } from "../../../../models/tarjeta";
import { Combo } from "../../../../models/combo";
import { Router } from "@angular/router";
import { CustomValidators } from "../../../../shared/custom-validator/custom-validators";
import { MatDatepicker } from "@angular/material/datepicker";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MomentDateAdapter,
} from "@angular/material-moment-adapter";
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
// tslint:disable-next-line:no-duplicate-imports
// @ts-ignore
import { default as _rollupMoment, Moment } from "moment";
import * as _moment from "moment";
import { NotificacionService } from "../../../../services/notificacion.service";
import * as XLSX from "xlsx";
import { AuthService } from "../../../../services/auth.service";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { CarritoComponent } from "../carrito/carrito.component";
import { ThrowStmt } from "@angular/compiler";
import { DatePipe, formatDate } from "@angular/common";

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: "MM/YYYY",
  },
  display: {
    dateInput: "MM/YYYY",
    monthYearLabel: "MMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};

@Component({
  selector: "app-pedido",
  templateUrl: "./pedido.component.html",
  styleUrls: ["./pedido.component.scss"],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class PedidoComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  get txNroTarjeta() {
    return this.formTarjeta.get("txNroTarjeta");
  }

  get txEfectivo() {
    return this.formEfectivo.get("txEfectivo");
  }

  get txNombreTarjeta() {
    return this.formTarjeta.get("txNombreTarjeta");
  }

  get txCVC() {
    return this.formTarjeta.get("txCVC");
  }

  get txApellidoTarjeta() {
    return this.formTarjeta.get("txApellidoTarjeta");
  }

  get dpFechaVencimiento() {
    return this.formTarjeta.get("dpFechaVencimiento");
  }

  get horaEntrega() {
    return this.form.get("horaEntrega");
  }

  get txCalle() {
    return this.form.get("txCalle");
  }

  get nCiudad() {
    return this.form.get("nCiudad");
  }

  get txNroCalle() {
    return this.form.get("txNroCalle");
  }

  get txDescripcion() {
    return this.form.get("txDescripcion");
  }
  form: FormGroup;
  formTarjeta: FormGroup;
  formEfectivo: FormGroup;
  data: Pedido = new Pedido();
  ciudadLista: Combo[] = [
    { id: 1, nombre: "Córdoba" },
    { id: 2, nombre: "Buenos Aires" },
    { id: 3, nombre: "Rosario" },
  ];
  formaPago = "Efectivo";
  formaPagoLista = ["Efectivo", "Tarjeta Visa"];
  secondForm: any;
  public cantidad: number;
  date = new FormControl(moment());
  minDate = new Date();
  dpFechaEntrega = new FormControl(new Date());
  rbFormaPago = new FormControl("Efectivo");

  listDetalle: any[] = [];

  fileName = "Pedido";
  count = 0;
  fechaActual = new Date();
  fechaEntrega = "";

  ngOnInit(): void {
    this.data.tarjeta = new Tarjeta();
    this.cantidad = +history.state.navSettings;
    console.error(this.cantidad);
    this.crearForm();

    this.rbFormaPago.valueChanges.subscribe((value) => {
      if (value) {
        if (value === "Efectivo") {
          this.formTarjeta.reset();
        } else if (value === "Tarjeta Visa") {
          this.formEfectivo.reset();
        }
      }
    });
  }

  public crearForm() {
    this.form = this.fb.group({
      txCalle: [""],
      txNroCalle: [""],
      nCiudad: [],
      txDescripcion: [""],
      txNroTarjeta: [
        "",
        [CustomValidators.digitNumber(16), CustomValidators.naranja],
      ],
      txNombreTarjeta: ["", CustomValidators.validText],
      txApellidoTarjeta: ["", CustomValidators.validText],
      dpFechaVencimiento: ["", CustomValidators.minDate()],
      txCVC: ["", CustomValidators.digitNumber(3)],
      horaEntrega: [true],
    });

    this.formEfectivo = this.fb.group({
      txEfectivo: [
        "",
        [CustomValidators.minValue(this.cantidad * 450), Validators.required],
      ],
    });
    this.formTarjeta = this.fb.group({
      txNroTarjeta: [
        "",
        [CustomValidators.digitNumber(16), CustomValidators.naranja],
      ],
      txNombreTarjeta: ["", CustomValidators.validText],
      txApellidoTarjeta: ["", CustomValidators.validText],
      dpFechaVencimiento: ["", CustomValidators.minDate()],
      txCVC: ["", CustomValidators.digitNumber(3)],
    });
  }

  // guardarPedido() {
  //   this.notificacionService.messageOpen('¿Desea confirmar su pedido?', 'Atención', 1).beforeClosed().subscribe(value => {});

  irADetallePedido() {
    this.router.navigate(["pedido", "detalle-pedido"], {
      state: { navSettings: this.cantidad },
    });
  }

  anterior() {
    this.router.navigate(["pedido", "carrito"], {
      state: { navSettings: this.cantidad },
    });
  }
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dpFechaVencimiento.value;
    ctrlValue.year(normalizedYear.year());
    this.dpFechaVencimiento.setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.dpFechaVencimiento.value;
    ctrlValue.month(normalizedMonth.month());
    this.dpFechaVencimiento.setValue(ctrlValue);
    datepicker.close();
  }

  valdiarForms(): boolean {
    if (this.rbFormaPago.value === "Efectivo") {
      if (this.horaEntrega.value) {
        return (
          this.form.invalid ||
          this.formEfectivo.invalid ||
          this.dpFechaEntrega.invalid
        );
      } else {
        return this.form.invalid || this.formEfectivo.invalid;
      }
    } else if (this.rbFormaPago.value === "Tarjeta Visa") {
      if (this.horaEntrega.value) {
        return (
          this.form.invalid ||
          this.formTarjeta.invalid ||
          this.dpFechaEntrega.invalid
        );
      } else {
        return this.form.invalid || this.formTarjeta.invalid;
      }
    }
  }
  guardarExcel(): void {
    const element = document.getElementById("excel-table");
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    /* save to file */
    XLSX.writeFile(
      workbook,
      this.fileName +
        "-Nro" +
        (this.count + 1) +
        "-Fecha-" +
        this.fechaActual +
        ".xlsx"
    );
  }
  crearDetalle(): void {
    const detalle: any = {
      txCalle: this.form.get("txCalle")?.value,
      txNroCalle: this.form.get("txNroCalle")?.value,
      nCiudad: this.form.get("nCiudad")?.value,
      txDescripcion: this.form.get("txDescripcion")?.value,
      txNroTarjeta: this.formTarjeta.get("txNroTarjeta")?.value,
      txNombreTarjeta: this.formTarjeta.get("txNombreTarjeta")?.value,
      txApellidoTarjeta: this.formTarjeta.get("txApellidoTarjeta")?.value,
      dpFechaVencimiento: this.formTarjeta.get("dpFechaVencimiento")?.value,
      txCVC: this.formTarjeta.get("txCVC")?.value,
      txEfectivo: this.formEfectivo.get("txEfectivo")?.value,
      txCantidad: this.cantidad,
    };
    this.listDetalle.push(detalle);
    this.toastr.success(
      "El pedido fue realizado con exito",
      "E x c e l e n t e !"
    );
  }
  btnGuardar = false;

  verBtnGuardar() {
    if (this.btnGuardar === false) {
      this.btnGuardar = true;
    }
    }
}


