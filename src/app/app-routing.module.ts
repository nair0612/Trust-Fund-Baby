import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path:'campaignDetails', component: CampaignDetailsComponent}
=======
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
>>>>>>> 4ae9a1a1edc95e9b8bba78e34a0ff403061d0988
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
