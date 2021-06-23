import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthService {
  private TOKEN_CELL = "lmsToken";

  constructor(private http: HttpClient) {}

  saveToken(data) {
    window.sessionStorage.setItem(this.TOKEN_CELL, data["accessToken"]);
  }

  getToken() {
    return window.sessionStorage.getItem(this.TOKEN_CELL);
  }

  isLoggedIn() {
    const token = window.sessionStorage.getItem(this.TOKEN_CELL);
    if (token) {
      return true;
    }
    return false;
  }
}
