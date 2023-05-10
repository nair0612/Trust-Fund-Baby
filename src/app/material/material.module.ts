import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';

const materialComponents = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatDialogModule,
  MatCardModule,
  MatGridListModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
]

@NgModule({
  imports: [materialComponents],
  exports: [materialComponents]
})
export class MaterialModule {}
