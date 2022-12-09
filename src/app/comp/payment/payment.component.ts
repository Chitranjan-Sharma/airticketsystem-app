import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(public router: Router, public api: API) { }


  paymentDone() {
    if (this.api.paymentData.CardNumber != 0 && this.api.paymentData.CVVCode != 0 && this.api.paymentData.ExpiryDate != '' && this.api.paymentData.NameOnCard != '') {
      this.api.paymentData.TicketId = this.api.ticketData.TicketId;
      this.api.postPayments().subscribe((res) => {
        alert("Payment completed and \n Tickets booked !");
        console.log(this.api.paymentData);
        this.router.navigate(["comp/bookings"]);
      },
        (error) => {
          alert(error);
        }
      );

    }
  }
}
