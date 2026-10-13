import { Component, ViewChild } from '@angular/core';
import { TripList } from './trip-list/trip-list';
import { TripForm } from './trip-form/trip-form';

@Component({ selector: 'app-root', imports: [TripList, TripForm], templateUrl: './app.html', styleUrl: './app.css' })
export class App {
  @ViewChild(TripList) tripList?: TripList;
  refreshTrips(): void { this.tripList?.refreshTrips(); }
}
