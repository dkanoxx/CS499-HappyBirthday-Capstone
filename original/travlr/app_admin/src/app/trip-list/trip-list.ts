import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';

@Component({ selector: 'app-trip-list', standalone: true, imports: [CommonModule, TripCard], templateUrl: './trip-list.html', styleUrls: ['./trip-list.css'] })
export class TripList implements OnInit {
  trips: Trip[] = [];
  loading = true;
  errorMessage = '';
  constructor(private tripService: TripData) {}
  ngOnInit(): void { this.refreshTrips(); }
  refreshTrips(): void {
    this.loading = true;
    this.tripService.getTrips().subscribe({
      next: (data: Trip[]) => { this.trips = data; this.errorMessage = ''; this.loading = false; },
      error: (err) => { console.error(err); this.errorMessage = 'Unable to load trips. Please try again.'; this.loading = false; }
    });
  }
}
