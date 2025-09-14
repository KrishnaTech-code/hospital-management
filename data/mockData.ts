
import type { Patient, Appointment } from '../types';

export const MOCK_PATIENTS: Patient[] = [
  { id: 'PAT-001', name: 'John Doe', age: 45, gender: 'Male', bloodType: 'O+', admittedDate: '2024-07-20', diagnosis: 'Pneumonia', doctor: 'Dr. Smith', status: 'Admitted' },
  { id: 'PAT-002', name: 'Jane Smith', age: 34, gender: 'Female', bloodType: 'A-', admittedDate: '2024-07-21', diagnosis: 'Fractured Arm', doctor: 'Dr. Jones', status: 'Under Observation' },
  { id: 'PAT-003', name: 'Peter Pan', age: 29, gender: 'Male', bloodType: 'B+', admittedDate: '2024-07-18', diagnosis: 'Appendicitis', doctor: 'Dr. Brown', status: 'Discharged' },
  { id: 'PAT-004', name: 'Mary Poppins', age: 62, gender: 'Female', bloodType: 'AB+', admittedDate: '2024-07-22', diagnosis: 'Hypertension', doctor: 'Dr. Smith', status: 'Admitted' },
  { id: 'PAT-005', name: 'Bruce Wayne', age: 38, gender: 'Male', bloodType: 'O-', admittedDate: '2024-07-22', diagnosis: 'Migraine', doctor: 'Dr. Jones', status: 'Under Observation' },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'APP-001', patientName: 'Clark Kent', doctor: 'Dr. Smith', date: '2024-07-25', time: '10:00 AM', reason: 'Annual Checkup', status: 'Scheduled' },
  { id: 'APP-002', patientName: 'Diana Prince', doctor: 'Dr. Jones', date: '2024-07-25', time: '11:30 AM', reason: 'Follow-up', status: 'Scheduled' },
  { id: 'APP-003', patientName: 'Barry Allen', doctor: 'Dr. Brown', date: '2024-07-24', time: '02:00 PM', reason: 'Consultation', status: 'Completed' },
  { id: 'APP-004', patientName: 'Arthur Curry', doctor: 'Dr. Smith', date: '2024-07-26', time: '09:00 AM', reason: 'Dental Cleaning', status: 'Scheduled' },
];
