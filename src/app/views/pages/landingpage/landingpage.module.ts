import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store/reducers';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('posts', reducers),

  ],
  providers: [
		DatePipe
	]
})
export class LandingpageModule { }
