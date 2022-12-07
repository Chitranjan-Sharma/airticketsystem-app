import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private api: API, public router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.api.isLoggedIn = false;
    this.api.isRegister = true;
    this.router.navigate(["comp/login"]);
  }

  bookFlight() {
    this.router.navigate(["comp/searchFlights"]);
  }

  askQuery() {
    this.router.navigate(["comp/contact"]);
  }

  loginNow() {
    this.router.navigate(["comp/login"]);
  }
}
