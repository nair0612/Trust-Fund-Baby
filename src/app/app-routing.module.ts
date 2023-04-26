import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { AllCampaignComponent } from './all-campaign/all-campaign.component';
import { MyCampaignComponent } from './my-campaign/my-campaign.component';
import { MyInvestmentComponent } from './my-investment/my-investment.component';

const routes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full'},
  { path: 'Home', component: HomePageComponent },
  { path: 'AllCampaign', component: AllCampaignComponent },
  { path: 'MyCampaign', component: MyCampaignComponent },
  { path: 'MyInvestment', component: MyInvestmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
