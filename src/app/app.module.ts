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
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FooterComponent } from './footer/footer.component';
import { AllCampaignComponent } from './all-campaign/all-campaign.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyCampaignComponent } from './my-campaign/my-campaign.component';
import { MyInvestmentComponent } from './my-investment/my-investment.component';
import { HeaderComponent } from './header/header.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
@NgModule({
  declarations: [
    AppComponent,
    CampaignFormComponent,
    CampaignComponent,
    SearchBarComponent,
    FooterComponent,
    AllCampaignComponent,
    HomePageComponent,
    MyCampaignComponent,
    MyInvestmentComponent,
    HeaderComponent,
    CampaignDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
    SwiperModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
