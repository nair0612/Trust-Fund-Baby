import { Component, Input } from '@angular/core'
import { Router } from '@angular/router';

interface CardData {
  profileImage: string;
  title: string;
  description: string;
  campaignAddress : string;
}
@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {
  @Input() cardData: CardData;
  constructor(private router: Router) {}

  openCampaignDetails(campaignId : string) {
    this.router.navigate(['/campaignDetails', campaignId]);
  }
}
