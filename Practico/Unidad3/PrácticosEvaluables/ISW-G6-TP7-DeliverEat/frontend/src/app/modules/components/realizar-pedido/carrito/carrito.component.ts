import { Component, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-carrito",
  templateUrl: "./carrito.component.html",
  styleUrls: ["./carrito.component.scss"],
})
export class CarritoComponent implements OnInit {
  form: FormGroup;
  data: any;
  cantidad: number[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.cantidad.push(i);
    }
    this.crearForm();

    if (history.state.navSettings) {
      this.nCantidad.setValue(+history.state.navSettings);
    }
  }

  crearForm() {
    this.form = this.fb.group({
      nCantidad: [1, [Validators.max(10), Validators.min(1)]],
      txTotal: [450],
    });

    this.nCantidad.valueChanges.subscribe((value) => {
      this.txTotal.setValue(value * 450);
    });
  }

  calcularTotal(): number {
    return this.nCantidad.value * 450;
  }

  get nCantidad() {
    return this.form.get("nCantidad");
  }

  get txTotal() {
    return this.form.get("txTotal");
  }

  guardarPedido() {
    this.router.navigate(["pedido", "pedido"], {
      state: { navSettings: this.nCantidad.value },
    });
  }

}
