import { Component } from '@angular/core';
import { API } from 'src/app/api/api.service';
import { Register } from 'src/app/models/register.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  constructor(public api: API) {
  }

  allCustomers: Register[] = [];

  ngOnInit(): void {
    this.searchAllCustomers();
  }

  customer: Register = new Register;

  deleteCustomer(id: number) {
    if (confirm("Delete this customer informations ?")) {
      this.api.deleteUser(id).subscribe((res) => {
        alert("Customer informations deleted !");
        this.api.getUserData();
      },
        (error) => {
          alert(error);
        })
    }
  }

  updateData(u: Register) {
    this.customer = u;
  }

  putCustomerData() {
    if (this.customer.Email != '' && this.customer.Name != '')
      this.api.putUserData(this.customer).subscribe((res) => {
        alert("Customer data updated !");
        this.customer = new Register;
      },
        (error) => {
          alert(error);
        })
  }

  customers: Register[] = [];
  searchByData: string = '';

  searchCustomers() {
    this.customers = [];
    this.allCustomers.forEach(element => {
      if (element.Name.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.Email.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.CustomerId == parseInt(this.searchByData)) {

        this.customers.push(element);

      }
    });

  }

  searchAllCustomers() {

    this.api.getUserData().subscribe((res) => {
      this.allCustomers = res as Register[];
      this.customers = this.allCustomers;
    })
  }
}
