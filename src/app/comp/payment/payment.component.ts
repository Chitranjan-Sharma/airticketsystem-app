import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';
import { PaymentDetail } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {

  constructor(public router: Router, public api: API) { }

  paymentData: PaymentDetail = new PaymentDetail;

  paymentDone() {
    if (this.paymentData.CardNumber != 0 && this.paymentData.CVVCode != 0 && this.paymentData.ExpiryDate != '' && this.paymentData.NameOnCard != '') {
      alert("Payment completed !");
      this.router.navigate(["comp/bookings"]);
    }

  }
}
