import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import SwiperCore, { Navigation, Pagination} from 'swiper';
import { WalletService } from './services/wallet.service';
import {MatSidenav} from '@angular/material/sidenav';

SwiperCore.use([Navigation, Pagination]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None   
})
export class AppComponent {
  @ViewChild('sidenav') sidenav: MatSidenav;

  title = 'Trust-Fund-Baby';
  public walletConnected : boolean = false;
  public walletId : string = '';

  close() {
    this.sidenav.close();
  }

  constructor(
    private _dialog: MatDialog,
    private _walletService : WalletService
    ) {}

  openCampaignForm() {
    this._dialog.open(CampaignFormComponent);
  }

  connectToWallet = () => {
     this._walletService.connectWallet();
     window.location.reload();
  }

  checkWalletConnected = async () => {
    const accounts = await this._walletService.checkWalletConnected();
    if(accounts.length >0) {
      this.walletConnected = true;
      this.walletId = accounts[0];
    }

  }

  ngOnInit() : void {
    // this.connectToWallet();
    this.checkWalletConnected();
  }

}
