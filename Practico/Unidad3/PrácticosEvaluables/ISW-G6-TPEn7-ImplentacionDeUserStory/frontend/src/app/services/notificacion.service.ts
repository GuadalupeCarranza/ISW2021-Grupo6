import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MessageComponent } from "../shared/messages/message.component";

@Injectable({
  providedIn: "root",
})
export class NotificacionService {
  constructor(private modalService: MatDialog) {}

  public messageOpen(
    mensaje: string,
    titulo: string,
    tipo: number
  ): MatDialogRef<any> {
    const modalRef = this.modalService.open(MessageComponent, {
      height: "auto",
      width: "auto",
      autoFocus: false,
    });
    modalRef.componentInstance.message = mensaje;
    modalRef.componentInstance.title = titulo;
    modalRef.componentInstance.type = tipo;
    return modalRef;
  }
}
