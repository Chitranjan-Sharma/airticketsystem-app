import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/api/api.service';

import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  constructor(public api: API) { }

  ticket: Ticket = new Ticket;

  ngOnInit(): void {

    console.log(this.api.flightData);
  }

  private selectedLink: string = "generalFare";

  setradio(e: string): void {

    this.selectedLink = e;
    console.log(e);

    if (this.selectedLink == "generalFare") {
      this.ticket.TotalFare = this.api.flightData.GeneralFare;
    } else {
      this.ticket.TotalFare = this.api.flightData.PremiumPlus;
    }

  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }

  bookTicket() {
    this.ticket.CustomerId = this.api.userData.CustomerId;
    this.ticket.FlightId = this.api.flightData.FlightId;
    this.ticket.Status = true;

    this.postTicketData();

    console.log(this.ticket);
  }

  postTicketData() {
    if (this.ticket.PassengerName != '' && this.ticket.Gender != '' &&
      this.ticket.PassengerEmail != '' && this.ticket.PassengerEmail.includes("@") && this.ticket.PassengerPhone != '' &&
      this.ticket.Address != '' && this.ticket.JourneyDate != '' && this.ticket.TotalFare != 0) {
      this.api.bookTicket(this.ticket).subscribe((res) => {
        alert("Ticket booked !");
        this.api.ticketData = new Ticket;
      },
        (error) => {
          alert(error);
          console.log(this.ticket)
        });
    }
  }
}