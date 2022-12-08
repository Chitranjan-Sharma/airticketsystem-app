import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Ticket } from '../models/ticket.model';
import { FlightDetail } from '../models/flight.model';
import { Feedback } from '../models/feedback.model';
import { Register } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})

export class API {
  isLoggedIn: boolean = false;
  isRegister: boolean = false;

  constructor(private http: HttpClient) { }

  userData: Register = new Register;
  readonly baseUrl = "https://atr-system-api.azurewebsites.net/api";

  ticketData: Ticket = new Ticket;
  feedbackData: Feedback = new Feedback;
  flightData: FlightDetail = new FlightDetail;

  flightDetailList: FlightDetail[] = [];

  postData() {
    return this.http.post(this.baseUrl + "/Customers", this.userData);
  }

  getUserData() {
    return this.http.get(this.baseUrl + "/Customers");
  }

  bookTicket(ticket: Ticket) {
    return this.http.post(this.baseUrl + "/Tickets", ticket);
  }

  getBookings() {
    return this.http.get(this.baseUrl + "/Tickets");
  }

  getFlightData() {
    this.http.get(this.baseUrl + "/Flights").subscribe((res) => {
      this.flightDetailList = res as FlightDetail[];
      console.log(this.flightDetailList);
    },
      (error) => {
        console.log(error);
      });
  }

  getFlightDataById(id: number) {
    this.http.get(this.baseUrl + "/Flights/" + id).subscribe((res) => {
      this.flightData = res as FlightDetail;
      console.log(this.flightData);
    },
      (error) => {
        console.log(error);
      });
  }

  postFeedback() {
    return this.http.post(this.baseUrl + "/Feedbacks", this.feedbackData);
  }

  getTicketBYId(id: number) {
    return this.http.get(this.baseUrl + "/Tickets/" + id);
  }

  updateTicketStatus(ticket: Ticket) {
    return this.http.put(this.baseUrl + "/Tickets/" + ticket.TicketId, ticket);
  }

}