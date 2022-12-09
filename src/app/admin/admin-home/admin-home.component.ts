import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent {
  constructor(public router: Router) {

  }
  
  manageCustomers() {
    this.router.navigate(["admin/customers"]);
  }
  manageBookings() {
    this.router.navigate(["admin/admin-bookings"]);
  }
  manageFeedbacks() {
    this.router.navigate(["admin/feedbacks"]);
  }
  manageFlights() {
    this.router.navigate(["admin/flights"]);
  }
}
