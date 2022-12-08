import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(public api: API, public router: Router) { }

  ngOnInit(): void {
  }

  logOut() {
    this.api.isLoggedIn = false;
  }
}