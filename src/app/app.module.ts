import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './comp/login/login.component';
import { BookTicketComponent } from './comp/book-ticket/book-ticket.component';
import { AboutComponent } from './comp/about/about.component';
import { ContactComponent } from './comp/contact/contact.component';
import { BookingsComponent } from './comp/bookings/bookings.component';
import { InvoiceComponent } from './comp/invoice/invoice.component';
import { NavbarComponent } from './comp/navbar/navbar.component';
import { SearchFlightsComponent } from './comp/search-flights/search-flights.component';
import { HomeComponent } from './comp/home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BookTicketComponent,
    AboutComponent,
    ContactComponent,
    BookingsComponent,
    InvoiceComponent,
    NavbarComponent,
    SearchFlightsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
