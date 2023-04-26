import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { SwiperModule } from 'swiper/angular';
import { CampaignComponent } from './campaign-card/campaign.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
<<<<<<< HEAD
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppHeaderComponent } from './app-header/app-header.component';

const routes:Routes = [];

=======
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AllCampaignComponent } from './all-campaign/all-campaign.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyCampaignComponent } from './my-campaign/my-campaign.component';
import { MyInvestmentComponent } from './my-investment/my-investment.component';
>>>>>>> 4ae9a1a1edc95e9b8bba78e34a0ff403061d0988
@NgModule({
  declarations: [
    AppComponent,
    CampaignFormComponent,
    CampaignComponent,
<<<<<<< HEAD
    CampaignDetailsComponent,
    HomeComponent,
    AppHeaderComponent
=======
    SearchBarComponent,
    FooterComponent,
    AllCampaignComponent,
    HomePageComponent,
    MyCampaignComponent,
    MyInvestmentComponent
>>>>>>> 4ae9a1a1edc95e9b8bba78e34a0ff403061d0988
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
<<<<<<< HEAD
=======
    SwiperModule
>>>>>>> 4ae9a1a1edc95e9b8bba78e34a0ff403061d0988
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
