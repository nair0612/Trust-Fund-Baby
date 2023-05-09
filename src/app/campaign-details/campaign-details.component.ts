import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-campaign-details',
  templateUrl: './campaign-details.component.html',
  styleUrls: ['./campaign-details.component.css']
})
export class CampaignDetailsComponent {

  myForm: FormGroup;

 constructor() {
    this.myForm = new FormGroup({
      actionPrice: new FormControl('invest', Validators.required)
  });
  }

  items = ['BBCDx33532353fdg4545343',
  'CBCDx33532353fdg4545343', 
  'DBCDx33532353fdg4545343',
  'EBCDx33532353fdg4545343',
  'FBCDx33532353fdg4545343', 
  'GBCDx33532353fdg4545343',
  'HBCDx33532353fdg4545343',
  'IBCDx33532353fdg4545343', 
  'JBCDx33532353fdg4545343',
  'KBCDx33532353fdg4545343',
  'LBCDx33532353fdg4545343', 
  'MBCDx33532353fdg4545343',
  'NBCDx33532353fdg4545343',
  'OBCDx33532353fdg4545343', 
  'PBCDx33532353fdg4545343',
  'QBCDx33532353fdg4545343',
  'RBCDx33532353fdg4545343', 
  'SBCDx33532353fdg4545343',
  'TBCDx33532353fdg4545343',
  'UBCDx33532353fdg4545343', 
  'VBCDx33532353fdg4545343'];
  
  onSubmit() {
    console.log(this.myForm.value);
  }
}
