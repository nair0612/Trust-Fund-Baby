import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignFormComponent } from './campaign-form/campaign-form.component';
import { CampaignDetailsComponent } from './campaign-details/campaign-details.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppHeaderComponent } from './app-header/app-header.component';

const routes:Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    CampaignFormComponent,
    CampaignComponent,
    CampaignDetailsComponent,
    HomeComponent,
    AppHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
