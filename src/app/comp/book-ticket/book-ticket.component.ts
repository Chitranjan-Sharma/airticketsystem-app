import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';

import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  constructor(public api: API, public router: Router) { }

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

  tickets: Ticket[] = [];

  postTicketData() {
    if (this.ticket.PassengerName != '' && this.ticket.Gender != '' &&
      this.ticket.PassengerEmail != '' && this.ticket.PassengerEmail.includes("@") && this.ticket.PassengerPhone != '' &&
      this.ticket.Address != '' && this.ticket.JourneyDate != '' && this.ticket.TotalFare != 0) {
      this.api.bookTicket(this.ticket).subscribe((res) => {
        this.api.ticketData = new Ticket;
        this.api.isTicketBooked = true;
        this.api.ticketData = this.ticket;

        this.api.getBookings().subscribe((res) => {
          this.tickets = res as Ticket[];

          this.tickets.forEach(t => {
            if (t.PassengerEmail == this.ticket.PassengerEmail && t.CustomerId == this.ticket.CustomerId &&
              t.FlightId == this.ticket.FlightId && t.PassengerPhone == this.ticket.PassengerPhone &&
              t.JourneyDate == this.ticket.JourneyDate && t.PassengerName == this.ticket.PassengerName) {

              this.api.ticketData = t;
              this.router.navigate(["comp/payment"]);
            }
          })
        });

      },
        (error) => {
          alert(error);
          console.log(this.ticket)
        });
    }
  }
}