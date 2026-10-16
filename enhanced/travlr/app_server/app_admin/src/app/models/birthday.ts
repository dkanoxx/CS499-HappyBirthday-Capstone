export interface Birthday {
  _id: string;
  name: string;
  month: number;
  day: number;
  relationship: string;
  reminderEnabled: boolean;
  notes: string;
  daysRemaining?: number;
  nextBirthday?: string;
}

export type BirthdayInput = Pick<Birthday, 'name' | 'month' | 'day' | 'relationship' | 'reminderEnabled' | 'notes'>;
