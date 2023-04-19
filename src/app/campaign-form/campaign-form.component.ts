import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CampaignService } from '../services/campaign.service';

@Component({
  selector: 'app-campaign-form',
  templateUrl: './campaign-form.component.html',
  styleUrls: ['./campaign-form.component.css']
})
export class CampaignFormComponent implements OnInit {
  isDisabled: boolean = true
  camForm: FormGroup;
  
  constructor(
    private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _camService: CampaignService,
    private _dialogRef: MatDialogRef<CampaignFormComponent>,
  ) { 
    this.camForm = this._fb.group({
      fullName: '',
      campaignTitle: '',
      description: '',
      noTokens: '',
      tokenPrice: '',
      goal: '',
      endDate: '',
      imageURL: '',
    })

  }

  ngOnInit() : void {
  this.camForm.patchValue(this.data);
}

campaignForm = new FormGroup({
  fullName: new FormControl("", [Validators.required, Validators.minLength(2)]),
  campaignTitle: new FormControl("", [Validators.required, Validators.minLength(10)]),
  description: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
  noTokens: new FormControl("", [Validators.required]),
  tokenPrice: new FormControl("", [Validators.required]),
  goal: new FormControl("", [Validators.required]),
  endDate: new FormControl("", [Validators.required]),
  imageURL: new FormControl("", [Validators.required]),
});

campaignSubmitted() {
  console.log(this.camForm.value);
  if(this.camForm.value.fullName== '' || this.camForm.value.campaignTitle== '' || this.camForm.value.description== '' || this.camForm.value.noTokens== ''
  || this.camForm.value.tokenPrice== '' || this.camForm.value.goal== '' || this.camForm.value.endDate== '' || this.camForm.value.imageURL== '') {
    alert('Please fill all the empty fields')
  }
  else {
      this._camService.addCampaign(this.camForm.value).subscribe({
        next: (val: any) => {
          alert('Campaign Added Successfully')
          this._dialogRef.close();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }



 get FullName(): FormControl{
  return this.campaignForm.get("fullName") as FormControl;
 }

 get CampaignTitle(): FormControl{
  return this.campaignForm.get("campaignTitle") as FormControl;
 }

 get Description(): FormControl{
  return this.campaignForm.get("description") as FormControl;
 }

 get NoTokens(): FormControl{
  return this.campaignForm.get("noTokens") as FormControl;
 }

 get TokenPrice(): FormControl{
  return this.campaignForm.get("tokenPrice") as FormControl;
 }

 get Goal(): FormControl{
  return this.campaignForm.get("goal") as FormControl;
 }

 get EndDate(): FormControl{
  return this.campaignForm.get("endDate") as FormControl;
 }

 get ImageURL(): FormControl{
  return this.campaignForm.get("imageURL") as FormControl;
 }

}