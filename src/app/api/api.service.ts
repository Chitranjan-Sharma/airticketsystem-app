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
  isTicketBooked: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(private http: HttpClient) { }

  userData: Register = new Register;
  readonly baseUrl = "https://atr-system-api.azurewebsites.net/api";

  ticketData: Ticket = new Ticket;
  feedbackData: Feedback = new Feedback;
  flightData: FlightDetail = new FlightDetail;

  flightDetailList: FlightDetail[] = [];

  //Customer api implementations
  postData() {
    return this.http.post(this.baseUrl + "/Customers", this.userData);
  }

  getUserData() {
    return this.http.get(this.baseUrl + "/Customers");
  }

  putUserData(u: Register) {
    return this.http.put(this.baseUrl + "/Customers/" + u.CustomerId, u);
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + "/Customers/" + id);
  }

  //Ticket book api connections
  bookTicket(ticket: Ticket) {
    return this.http.post(this.baseUrl + "/Tickets", ticket);
  }

  getBookings() {
    return this.http.get(this.baseUrl + "/Tickets");
  }

  putBookings(t: Ticket) {
    return this.http.put(this.baseUrl + "/Tickets/" + t.TicketId, t);
  }

  deleteBookings(id: number) {
    return this.http.delete(this.baseUrl + "/Tickets/" + id);
  }

  //Flights api connections
  getFlightData() {
    this.http.get(this.baseUrl + "/Flights").subscribe((res) => {
      this.flightDetailList = res as FlightDetail[];
      console.log(this.flightDetailList);
    },
      (error) => {
        console.log(error);
      });
  }

  postFlights(f: FlightDetail) {
    return this.http.post(this.baseUrl + "/Flights", f);
  }

  putFlight(f: FlightDetail) {
    return this.http.put(this.baseUrl + "/Flights/" + f.FlightId, f);
  }

  deleteFlight(id: number) {
    return this.http.delete(this.baseUrl + "/Flights/" + id);
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

  //Feedback api implementation
  postFeedback() {
    return this.http.post(this.baseUrl + "/Feedbacks", this.feedbackData);
  }

  getFeedbacks() {
    return this.http.get(this.baseUrl + "/Feedbacks");
  }

  getTicketBYId(id: number) {
    return this.http.get(this.baseUrl + "/Tickets/" + id);
  }

  updateTicketStatus(ticket: Ticket) {
    return this.http.put(this.baseUrl + "/Tickets/" + ticket.TicketId, ticket);
  }

  fetchAdmins() {
    return this.http.get(this.baseUrl + "/Admins");
  }
}