import { Component } from '@angular/core';
import { API } from 'src/app/api/api.service';
import { PaymentDetail } from 'src/app/models/payment.model';

@Component({
  selector: 'app-payment-data',
  templateUrl: './payment-data.component.html',
  styleUrls: ['./payment-data.component.css']
})
export class PaymentDataComponent {
  constructor(public api: API) {
  }

  ngOnInit(): void {
    this.fetchAllPayments();
  }

  payments: PaymentDetail[] = [];
  allPayments: PaymentDetail[] = [];

  searchByData: string = '';

  searchPayments() {
    this.payments = [];
    this.allPayments.forEach(element => {
      if (element.NameOnCard.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.ExpiryDate.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.PaymentId == parseInt(this.searchByData) ||
        element.TicketId == parseInt(this.searchByData) ||
        element.CardNumber == parseInt(this.searchByData)) {

        this.payments.push(element);

      }
    });

  }

  viewFeedback(payment: PaymentDetail) {
    this.api.paymentData = payment;
  }

  fetchAllPayments() {
    this.api.getPayments().subscribe((res) => {
      this.allPayments = res as PaymentDetail[];
      this.payments = this.allPayments;
    })
  }
}
