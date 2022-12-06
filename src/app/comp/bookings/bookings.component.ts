import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  constructor(public api: API, private router: Router) { }

  ticketList: Ticket[] = [];
  tickets: Ticket[] = [];

  ngOnInit(): void {
    this.getTickets();

    if (!this.api.isLoggedIn) {
      this.router.navigate(["comp/login"]);
    }
  }

  viewInvoice(ticket: Ticket) {
    this.router.navigate(["comp/invoice"]);
    this.api.ticketData = ticket;
    this.api.getFlightDataById(ticket.TicketId);
  }

  getTickets() {
    this.tickets = [];
    this.api.getBookings().subscribe((res) => {
      this.ticketList = res as Ticket[];
    },
      (err) => {
        console.log(err);
      });

    this.ticketList.forEach(element => {
      if (element.CustomerId == this.api.userData.CustomerId) {
        this.tickets.push(element);
      }
    });
  }

  cancelTicket(ticket: Ticket) {
    this.api.getTicketBYId(ticket.TicketId).subscribe(
      (res) => {
        ticket = res as Ticket;

        if (ticket != null) {
          if (ticket.Status) {
            if (confirm("Please provide your confirmation of ticket cancellation !")) {
              ticket.Status = false;
              this.api.updateTicketStatus(ticket).subscribe(
                (res) => {
                  alert("You have cancelled your ticket successfully." + res);
                  this.getTickets();
                },
                (err) => {
                  alert(err);
                }
              )
            }
          }
        }
      },
      (err) => {
        alert(err);
      }
    )
  }
}