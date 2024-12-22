import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StateModule } from 'state-management';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [BrowserModule, StoreModule.forRoot({}), StateModule.forRoot()]
})
export class AppModule {}
