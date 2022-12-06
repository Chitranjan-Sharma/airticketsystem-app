import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/api/api.service';
import { FlightDetail } from 'src/app/models/flight.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  constructor(public api: API) { }

  ticketStatus: string = "Booked"
  ngOnInit(): void {
    if (!this.api.ticketData.Status) {
      this.ticketStatus = "Cancelled"
    }
  }

  printTicket() {
    if (this.api.ticketData.PassengerName != '') {
      window.print();
    }
  }
}