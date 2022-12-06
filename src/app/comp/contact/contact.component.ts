import { Component, OnInit } from '@angular/core';
import { API } from 'src/app/api/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public api: API) { }

  ngOnInit(): void {
  }

  submitFeedback() {
    console.log(this.api.feedbackData);
    if (this.api.feedbackData.FullName != '' && this.api.feedbackData.Email != '' && this.api.feedbackData.Message.trim() != '') {

      this.api.postFeedback().subscribe((res) => {
        console.log(res);
        alert("Message sent ! Thank you for writing us :)")
        this.api.feedbackData.FullName = '';
        this.api.feedbackData.Email = '';
        this.api.feedbackData.Message = ''
      },
        (error) => {
          console.log(error);

        })
    } else {
      alert("All field required !");
    }
  }
}