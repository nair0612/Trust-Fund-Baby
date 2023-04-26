import { Component } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  index = 0;
  btnClass: any;
  iptClass:any;

tabChange(data: number){
this.index = data;
}
btnClickHandler() {
  if(this.btnClass) {
this.btnClass  = '';
this.iptClass  = '';
  } else {
this.btnClass = 'close'
this.iptClass = 'square'

  }
}
}