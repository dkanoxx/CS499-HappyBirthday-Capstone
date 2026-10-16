
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Birthday {
  id: number;
  name: string;
  date: string;
  relationship: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  birthdays: Birthday[] = [];

  showModal = false;
  editingId: number | null = null;

  form = {
    name: '',
    date: '',
    relationship: ''
  };

  openAdd() {
    this.editingId = null;
    this.form = { name: '', date: '', relationship: '' };
    this.showModal = true;
  }

  openEdit(birthday: Birthday) {
    this.editingId = birthday.id;
    this.form = {
      name: birthday.name,
      date: birthday.date,
      relationship: birthday.relationship
    };
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveBirthday() {
    if (!this.form.name.trim() || !this.form.date) {
      return;
    }

    if (this.editingId !== null) {
      this.birthdays = this.birthdays.map(b =>
        b.id === this.editingId ? { ...b, ...this.form } : b
      );
    } else {
      this.birthdays.push({
        id: Date.now(),
        ...this.form
      });
    }

    this.closeModal();
  }

  deleteBirthday(id: number) {
    if (confirm('Delete this birthday?')) {
      this.birthdays = this.birthdays.filter(b => b.id !== id);
    }
  }
}
