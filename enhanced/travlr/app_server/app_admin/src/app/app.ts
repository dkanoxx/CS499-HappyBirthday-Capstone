
import {
  Component,
  OnInit,
  inject,
  ChangeDetectorRef
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { Login } from './login/login';
import { AuthService, AuthUser } from './services/auth';

import { Birthday, BirthdayInput } from './models/birthday';
import { BirthdayData } from './services/birthday-data';

// ========================================
// EMPTY BIRTHDAY FORM
// ========================================

const emptyBirthday = (): BirthdayInput => ({
  name: '',
  month: 1,
  day: 1,
  relationship: '',
  reminderEnabled: true,
  notes: ''
});

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  // ========================================
  // SERVICES
  // ========================================

  private readonly api = inject(BirthdayData);
  private readonly auth = inject(AuthService);
  private readonly cdr = inject(ChangeDetectorRef);

  // ========================================
  // AUTHENTICATION
  // ========================================

  currentUser: AuthUser | null = null;
  checkingAuth = true;

  // ========================================
  // BIRTHDAY DATA
  // ========================================

  birthdays: Birthday[] = [];

  loading = true;
  saving = false;
  deletingId: string | null = null;

  error = '';
  formError = '';
  notice = '';
  search = '';

  formOpen = false;
  editingId: string | null = null;

  // ========================================
  // DASHBOARD NAVIGATION
  // ========================================

  currentPage: 'overview' | 'birthdays' = 'overview';

  form: BirthdayInput = emptyBirthday();

  readonly months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  // ========================================
  // APPLICATION INITIALIZATION
  // ========================================

  ngOnInit(): void {
    console.log('HappyBirthday application initialized');

    // Check whether the user already has
    // an active session in MongoDB.
    this.auth.getCurrentUser().subscribe({
      next: response => {
        this.currentUser = response.user;
        this.checkingAuth = false;

        console.log(
          'Authenticated user:',
          response.user.name
        );

        this.load();
        this.cdr.detectChanges();
      },

      error: () => {
        this.currentUser = null;
        this.checkingAuth = false;
        this.loading = false;

        console.log('No active login session');

        this.cdr.detectChanges();
      }
    });
  }

  // ========================================
  // LOGIN SUCCESS
  // ========================================

  onSignedIn(user: AuthUser): void {
    this.currentUser = user;
    this.currentPage = 'overview';

    this.error = '';
    this.notice = '';
    this.search = '';

    console.log('Login successful:', user.name);

    this.load();
    this.cdr.detectChanges();
  }

  // ========================================
  // LOGOUT
  // ========================================

 

logout(): void {
  console.log('Sign Out button clicked');

  this.auth.logout().subscribe({
    next: () => {
      console.log('Logout successful');
      this.clearUserSession();
    },

    error: (err: HttpErrorResponse) => {
      console.error('Logout failed:', err);

      this.error =
        'Unable to sign out. Please try again.';

      this.cdr.detectChanges();
    }
  });
}


  private clearUserSession(): void {
    this.currentUser = null;
    this.birthdays = [];

    this.currentPage = 'overview';
    this.formOpen = false;
    this.editingId = null;

    this.search = '';
    this.notice = '';
    this.error = '';
    this.formError = '';

    this.loading = false;
    this.saving = false;
    this.deletingId = null;

    this.form = emptyBirthday();

    this.cdr.detectChanges();
  }

  // ========================================
  // NAVIGATION
  // ========================================

  navigate(page: 'overview' | 'birthdays'): void {
    this.currentPage = page;
    this.formOpen = false;
    this.error = '';

    console.log('Navigating to:', page);
    this.cdr.detectChanges();
  }

  // ========================================
  // LOAD BIRTHDAYS
  // ========================================

  load(): void {
    if (!this.currentUser) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.api.getAll().subscribe({
      next: birthdays => {
        if (!this.currentUser) {
          return;
        }

        this.birthdays = birthdays.sort(
          (a, b) => this.daysLeft(a) - this.daysLeft(b)
        );

        this.loading = false;

        console.log(
          'Birthdays loaded:',
          this.birthdays.length
        );

        this.cdr.detectChanges();
      },

      error: (err: HttpErrorResponse) => {
        if (!this.currentUser) {
          return;
        }

        console.error('Birthday API error:', err);

        this.error =
          err.status === 503
            ? 'MongoDB is not connected. Start MongoDB and press Try again.'
            : err.status === 401
              ? 'Your session has expired. Please sign in again.'
              : 'Unable to load birthdays. Start the backend on port 3000 and try again.';

        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ========================================
  // SEARCH
  // ========================================

  get filtered(): Birthday[] {
    const query = this.search.trim().toLowerCase();

    if (!query) {
      return this.birthdays;
    }

    return this.birthdays.filter(b =>
      [b.name, b.relationship, b.notes].some(value =>
        (value || '').toLowerCase().includes(query)
      )
    );
  }

  // ========================================
  // DASHBOARD STATISTICS
  // ========================================

  get thisMonth(): number {
    const month = new Date().getMonth() + 1;

    return this.birthdays.filter(
      b => b.month === month
    ).length;
  }

  get nextBirthday(): Birthday | undefined {
    return this.birthdays[0];
  }

  // ========================================
  // BIRTHDAY CALCULATIONS
  // ========================================

  daysLeft(b: Birthday): number {
    if (typeof b.daysRemaining === 'number') {
      return b.daysRemaining;
    }

    const now = new Date();

    const today = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );

    let year = now.getUTCFullYear();

    const occurrence = (y: number) =>
      Date.UTC(
        y,
        b.month - 1,
        b.month === 2 &&
        b.day === 29 &&
        !this.leap(y) ? 28 : b.day
      );

    let next = occurrence(year);

    if (next < today) {
      next = occurrence(++year);
    }

    return Math.round(
      (next - today) / 86400000
    );
  }

  private leap(year: number): boolean {
    return year % 4 === 0 &&
      (year % 100 !== 0 || year % 400 === 0);
  }

  dateLabel(b: Birthday): string {
    return `${this.months[b.month - 1] ?? ''} ${b.day}`;
  }

  daysLabel(b: Birthday): string {
    const days = this.daysLeft(b);

    if (days === 0) return 'Today!';
    if (days === 1) return 'Tomorrow';

    return `In ${days} days`;
  }

  initials(name: string): string {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map(part => part[0]?.toUpperCase() ?? '')
      .join('');
  }

  // ========================================
  // ADD BIRTHDAY
  // ========================================

  openAdd(): void {
    console.log('Add Birthday button clicked');

    this.editingId = null;
    this.form = emptyBirthday();
    this.formError = '';
    this.notice = '';
    this.formOpen = true;

    console.log('Form open:', this.formOpen);
    this.cdr.detectChanges();
  }

  // ========================================
  // EDIT BIRTHDAY
  // ========================================

  openEdit(b: Birthday): void {
    console.log('Editing birthday:', b.name);

    this.editingId = b._id;

    this.form = {
      name: b.name,
      month: b.month,
      day: b.day,
      relationship: b.relationship || '',
      reminderEnabled: b.reminderEnabled,
      notes: b.notes || ''
    };

    this.formError = '';
    this.formOpen = true;

    this.cdr.detectChanges();
  }

  // ========================================
  // CLOSE FORM
  // ========================================

  closeForm(): void {
    if (this.saving) return;

    this.formOpen = false;
    this.formError = '';

    console.log('Birthday form closed');
    this.cdr.detectChanges();
  }

  // ========================================
  // SAVE BIRTHDAY
  // ========================================

  save(): void {
    if (this.saving || !this.currentUser) return;

    this.formError = '';

    const input: BirthdayInput = {
      ...this.form,
      name: this.form.name.trim(),
      relationship: this.form.relationship.trim(),
      notes: this.form.notes.trim(),
      month: Number(this.form.month),
      day: Number(this.form.day)
    };

    if (!input.name || input.name.length > 100) {
      this.formError =
        'Enter a name (up to 100 characters).';
      return;
    }

    if (
      input.relationship.length > 50 ||
      input.notes.length > 500
    ) {
      this.formError =
        'Relationship must be at most 50 characters and notes at most 500.';
      return;
    }

    const maxDay = [
      31, 29, 31, 30, 31, 30,
      31, 31, 30, 31, 30, 31
    ][input.month - 1];

    if (
      !Number.isInteger(input.month) ||
      !Number.isInteger(input.day) ||
      !maxDay ||
      input.day < 1 ||
      input.day > maxDay
    ) {
      this.formError =
        'Enter a valid birthday date.';
      return;
    }

    this.saving = true;

    const isEditing = this.editingId !== null;

    const request = this.editingId
      ? this.api.update(this.editingId, input)
      : this.api.create(input);

    request.subscribe({
      next: () => {
        this.saving = false;
        this.formOpen = false;
        this.editingId = null;

        this.notice = isEditing
          ? 'Birthday updated successfully.'
          : 'Birthday added successfully.';

        console.log(this.notice);

        this.cdr.detectChanges();

        this.load();
      },

      error: (err: HttpErrorResponse) => {
        this.saving = false;

        console.error('Save birthday error:', err);

        this.formError = err.status === 409
          ? 'This birthday is already saved.'
          : (
              typeof err.error?.message === 'string'
                ? err.error.message
                : 'Could not save birthday. Please try again.'
            );

        this.cdr.detectChanges();
      }
    });
  }

  // ========================================
  // DELETE BIRTHDAY
  // ========================================

  remove(b: Birthday): void {
    if (this.deletingId || !this.currentUser) return;

    const confirmed = window.confirm(
      `Delete ${b.name}'s birthday?`
    );

    if (!confirmed) return;

    this.deletingId = b._id;

    this.api.delete(b._id).subscribe({
      next: () => {
        this.deletingId = null;

        this.notice = 'Birthday deleted successfully.';

        console.log('Birthday deleted:', b.name);

        this.cdr.detectChanges();
        this.load();
      },

      error: (err: HttpErrorResponse) => {
        this.deletingId = null;

        console.error('Delete birthday error:', err);

        this.error =
          'Unable to delete birthday. Please try again.';

        this.cdr.detectChanges();
      }
    });
  }
}
