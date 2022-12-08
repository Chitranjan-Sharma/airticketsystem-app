import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './comp/about/about.component';
import { BookTicketComponent } from './comp/book-ticket/book-ticket.component';
import { BookingsComponent } from './comp/bookings/bookings.component';
import { ContactComponent } from './comp/contact/contact.component';

import { HomeComponent } from './comp/home/home.component';
import { InvoiceComponent } from './comp/invoice/invoice.component';
import { LoginComponent } from './comp/login/login.component';
import { PaymentComponent } from './comp/payment/payment.component';

import { SearchFlightsComponent } from './comp/search-flights/search-flights.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'comp/about', component: AboutComponent },
  { path: 'comp/contact', component: ContactComponent },
  { path: 'comp/login', component: LoginComponent },
  { path: 'comp/bookticket', component: BookTicketComponent },
  { path: 'comp/searchFlights', component: SearchFlightsComponent },
  { path: 'comp/bookings', component: BookingsComponent },
  { path: 'comp/invoice', component: InvoiceComponent },
  { path: 'comp/payment', component: PaymentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
