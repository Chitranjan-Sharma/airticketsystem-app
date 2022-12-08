import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/api/api.service';
import { FlightDetail } from 'src/app/models/flight.model';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit {
  constructor(public api: API) {
  }

  allFlights: FlightDetail[] = [];

  ngOnInit(): void {
    this.api.getFlightData();
    this.fetchAllFlights();
  }

  flight: FlightDetail = new FlightDetail;

  addFlighData() {
    if (this.flight.FlightName != '' && this.flight.Source != '' && this.flight.Destination != '') {
      this.flight.FlightId = 0;
      this.api.postFlights(this.flight).subscribe((res) => {
        alert("Flight Added");
        this.api.getFlightData();
      },
        (error) => {
          alert(error);
        });
    }
  }

  deleteFlight(id: number) {
    if (confirm("Delete this flight informations ?")) {
      this.api.deleteFlight(id).subscribe((res) => {
        alert("Fligh informations deleted !");
        this.api.getFlightData();
      },
        (error) => {
          alert(error);
        })
    }
  }

  updateData(f: FlightDetail) {
    this.flight = f;
  }

  putFlighData() {
    if (this.flight != null)
      this.api.putFlight(this.flight).subscribe((res) => {
        alert("Flight data updated !");
      },
        (error) => {
          alert(error);
        })
  }

  flights: FlightDetail[] = [];
  searchByData: string = '';

  searchFlights() {
    this.flights = [];
    this.api.flightDetailList.forEach(element => {
      if (element.FlightName.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.Source.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.Destination.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.FlightId == parseInt(this.searchByData)) {

        this.flights.push(element);

        this.allFlights = this.flights;
      }
    });

  }

  fetchAllFlights() {
    this.allFlights = this.api.flightDetailList;
  }
}
