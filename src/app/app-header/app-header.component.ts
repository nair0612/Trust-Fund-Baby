import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CampaignFormComponent } from '../campaign-form/campaign-form.component';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {
  public walletConnected : boolean = false;
  public walletId : string = '';

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
