import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<boolean> = new EventEmitter();
  @Output() entro: EventEmitter<boolean> = new EventEmitter();

  @Output()
  public isAuthenticated = false;
  public isLoggedIn: boolean;

  constructor(public dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit() {
  }

}
