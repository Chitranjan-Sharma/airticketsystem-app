import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';
import { FlightDetail } from 'src/app/models/flight.model';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.css']
})
export class SearchFlightsComponent {
  constructor(public router: Router, public api: API) { }

  ngOnInit(): void {
    this.api.getFlightData();
  }

  searchButtonClicked: boolean = false;

  flights: FlightDetail[] = [];

  source: string = 'Delhi';
  destination: string = 'Bangaluru';
  bookingDate: any = '';

  showFlights() {

    this.flights = [];
    if (this.source != '' && this.destination != '') {
      this.api.flightDetailList.forEach(element => {
        if (element.Source.toLowerCase() == this.source.toLowerCase() && element.Destination.toLowerCase() == this.destination.toLowerCase()) {
          this.flights.push(element);
        }
      });
      this.searchButtonClicked = true;
    } else {
      alert('All field required !');
      this.searchButtonClicked = false;
    }

  }

  bookTicket(f: any) {

    if (!this.api.isLoggedIn) {
      this.router.navigate(["comp/login"]);
    } else {
      this.api.flightData = f;
      this.router.navigate(["comp/bookticket"])
    }


  }

  flightList: any[] = [
    { flighId: 1101, flightName: 'Indigo', flightSource: '', flightDestination: '', flightTime: '04:20 pm', arivalTime: '06:45 pm', generalFare: 6112, premiumPlus: 9850 },
    { flighId: 1102, flightName: 'AirAsia', flightSource: '', flightDestination: '', flightTime: '09:35 pm', arivalTime: '12:05 am', generalFare: 6320, premiumPlus: 9400 },
    { flighId: 1103, flightName: 'Akash-Air', flightSource: '', flightDestination: '', flightTime: '11:50 pm', arivalTime: '01:20 am', generalFare: 6450, premiumPlus: 9750 },
    { flighId: 1103, flightName: 'AirGo', flightSource: '', flightDestination: '', flightTime: '01:20 am', arivalTime: '02:20 am', generalFare: 6150, premiumPlus: 10350 },
  ];
}
