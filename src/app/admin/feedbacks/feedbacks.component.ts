import { Component } from '@angular/core';
import { API } from 'src/app/api/api.service';
import { Feedback } from 'src/app/models/feedback.model';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent {
  constructor(public api: API) {
  }

  ngOnInit(): void {
    this.fetchAllFeedbacks();
  }

  feedbacks: Feedback[] = [];
  allFeedbacks: Feedback[] = [];

  searchByData: string = '';

  searchFeedbacks() {
    this.feedbacks = [];
    this.allFeedbacks.forEach(element => {
      if (element.FullName.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.Email.toLowerCase().includes(this.searchByData.toLowerCase()) ||
        element.CustomerId == parseInt(this.searchByData)) {

        this.feedbacks.push(element);

      }
    });

  }

  viewFeedback(feedback: Feedback) {

  }
  fetchAllFeedbacks() {
    this.api.getFeedbacks().subscribe((res) => {
      this.allFeedbacks = res as Feedback[];
      this.feedbacks = this.allFeedbacks;
    })
  }
}
