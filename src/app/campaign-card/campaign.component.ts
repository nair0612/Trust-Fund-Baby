import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

interface CardData {
  imageUrl: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {
  @Input() cardData: CardData;
  constructor(private router: Router) {}

  openCampaignDetails() {
    this.router.navigate(['/campaignDetails']);
  }
}
