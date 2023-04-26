import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {

  constructor(private router: Router) {}

  openCampaignDetails() {
    this.router.navigate(['/campaignDetails']);
  }
}
