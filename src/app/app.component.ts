import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trust-Fund-Baby';

  constructor(private _dialog: MatDialog) {}

  openCampaignForm() {
    this._dialog.open(CampaignFormComponent)
  }
}
