import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidoComponent } from './pedido/pedido.component';
import { CarritoComponent } from './carrito/carrito.component';


let routes: Routes;
routes = [
  {
    path: "",
    children: [
      { path: "pedido", component: PedidoComponent },
      { path: "carrito", component: CarritoComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidoRoutingModule {
}
