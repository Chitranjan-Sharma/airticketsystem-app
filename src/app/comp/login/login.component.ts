import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public api: API, private router: Router) { }

  ngOnInit(): void {
  }

  email: string = '';
  password: string = '';
  userName: string = '';

  adminLogin() {
    this.router.navigate(["comp/admin"]);
    this.api.getFlightData();
  }

  loginToAccount() {
    this.api.getUserData().subscribe((res) => {
      let users: any = res;
      if (users != null && this.email.includes("@")) {
        users.forEach((e: any) => {
          if (e.Email == this.email && e.Password == this.password) {

            this.api.isLoggedIn = true;
            this.gotoSearchFlight();
            this.api.isLoggedIn = true;
            this.api.isAdminLoggedIn = false;

            this.api.userData.CustomerId = e.CustomerId;
            this.api.ticketData.CustomerId = e.CustomerId;
            this.api.feedbackData.CustomerId = this.api.userData.CustomerId;
          }
        });
      }
    });

  }

  gotoSearchFlight() {
    this.router.navigate(["comp/searchFlights"]);
  }

  createNewAccount() {
    if (this.password == this.api.userData.Password) {
      if (this.api.userData.Email != '' && this.email.includes("@") && this.api.userData.Password != '' && this.api.userData.Name != '') {
        console.log(this.api.userData);

        this.api.postData().subscribe((res) => {
          this.api.userData.Email = '';
          this.api.userData.Name = '';
          this.api.userData.Password = '';

          this.api.isRegister = false;
        },
          (error) => {
            console.log(error);
          });
      } else {
        console.log('Email and password required !');
      }
    } else {
      alert("Password not matched");
    }

  }
}