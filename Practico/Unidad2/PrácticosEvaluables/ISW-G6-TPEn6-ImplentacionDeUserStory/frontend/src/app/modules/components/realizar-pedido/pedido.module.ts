import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../../../shared/shared.module";
import { PedidoRoutingModule } from "./pedido-routing.module";
import { FormsModule } from "@angular/forms";
import { CarritoComponent } from "./carrito/carrito.component";
import { PedidoComponent } from "./pedido/pedido.component";

import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from "@angular-material-components/datetime-picker";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";

@NgModule({
  declarations: [CarritoComponent, PedidoComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    SharedModule,
    FormsModule,
    NgxMatDatetimePickerModule,
    NgxMaterialTimepickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
  ],
  exports: [],
  providers: [],
})
export class PedidoModule {}
