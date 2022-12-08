import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { API } from 'src/app/api/api.service';
import { Admin } from 'src/app/models/admin.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(public router: Router, public api: API) { }

  adminExtensionkey: string = '';

  enterExtensionKey(n: string) {
    this.adminExtensionkey = this.adminExtensionkey + n;
  }

  admins: Admin[] = [];

  adminLogin() {
    if (this.adminExtensionkey != '') {
      this.api.fetchAdmins().subscribe((res) => {
        this.admins = res as Admin[];
        this.admins.forEach(element => {
          if (element.ExtensionKey.toLowerCase() == this.adminExtensionkey.toLowerCase()) {
            this.api.isAdminLoggedIn = true;
            this.router.navigate(["admin/flights"]);
          }
        });
      });


    }
  }

  customerLogin() {
    this.api.isAdminLoggedIn = false;
    this.router.navigate(["comp/login"]);
  }
}