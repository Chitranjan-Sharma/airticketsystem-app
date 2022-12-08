import { Component } from '@angular/core';
import { API } from 'src/app/api/api.service';
import { Ticket } from 'src/app/models/ticket.model';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent {

  constructor(public api: API) {
  }

  allTickets: Ticket[] = [];

  ngOnInit(): void {
    this.fetchAllBookings();
  }

  ticket: Ticket = new Ticket;
  searchByData: string = '';
  searchedTicketList: Ticket[] = [];


  deleteBooking(id: number) {
    if (confirm("Delete this flight informations ?")) {
      this.api.deleteBookings(id).subscribe((res) => {
        alert("Flight ticket informations deleted !");
        this.api.getBookings();
      },
        (error) => {
          alert(error);
        })
    }
  }

  searchTickets() {
    this.searchedTicketList = [];
    this.allTickets.forEach(element => {
      if (element.PassengerEmail.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.PassengerName.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.PassengerPhone.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.TicketId == parseInt(this.searchByData)) {

        this.searchedTicketList.push(element);

      }
    });
    this.searchByData = '';

  }

  fetchAllBookings() {
    this.api.getBookings().subscribe((res) => {
      this.allTickets = res as Ticket[];
      this.searchedTicketList = this.allTickets;
      this.searchByData = '';
    },
      (error) => {
        alert(error);
      });
  }

  updateData(t: Ticket) {
    this.ticket = t;
  }

  updateBookingData() {
    if (this.ticket.PassengerPhone != '' && this.ticket.PassengerEmail != '' && this.ticket.PassengerPhone != '' && this.ticket.TicketId != 0) {
      this.api.putBookings(this.ticket).subscribe((res) => {
        alert("Flight booking data updated !");
      },
        (error) => {
          alert(error);
        });
    }
  }

  cancelBookingData() {
    if (this.ticket.PassengerPhone != '' && this.ticket.PassengerEmail != '' && this.ticket.PassengerPhone != '' && this.ticket.TicketId != 0) {
      this.ticket.Status = false;
      if (confirm("Cancel this ticket booking !")) {
        this.api.putBookings(this.ticket).subscribe((res) => {
          alert("Flight booking cancelled !");
          this.api.getBookings();
        },
          (error) => {
            alert(error);
          });
      }
    }
  }
}
