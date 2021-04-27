import { DefaultComponent } from "../layouts/default/default.component";

export const routes = [
  {
    path: "",
    component: DefaultComponent,
    children: [
      { path: "", redirectTo: "pedido/carrito", pathMatch: "full" },
      {
        path: "pedido",
        loadChildren: () =>
          import("../modules/components/realizar-pedido/pedido.module").then(
            (m) => m.PedidoModule
          ),
      },
    ],
  },
  {
    path: "pedido",
    component: DefaultComponent,
    children: [
      {
        path: "pedido/carrito",
        redirectTo: "pedido/detalle-pedido",
      },
    ],
  },
  {
    path: "pedido",
    component: DefaultComponent,
    children: [
      {
        path: "pedido/detalle-pedido",
        redirectTo: "pedido/carrito",
      },
    ],
  },
  // Not found
  { path: "**", redirectTo: "home" },
];
