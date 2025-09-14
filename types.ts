
export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  admittedDate: string;
  diagnosis: string;
  doctor: string;
  status: 'Admitted' | 'Discharged' | 'Under Observation';
}

export interface Appointment {
  id: string;
  patientName: string;
  doctor: string;
  date: string;
  time: string;
  reason: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Admin' | 'Doctor' | 'Receptionist';
}
