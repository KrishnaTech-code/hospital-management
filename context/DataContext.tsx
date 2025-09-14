
import React, { createContext, useState, useContext, useEffect } from 'react';
import type { Patient, Appointment } from '../types';
import { MOCK_PATIENTS, MOCK_APPOINTMENTS } from '../data/mockData';

interface DataContextType {
  patients: Patient[];
  appointments: Appointment[];
  addPatient: (patient: Omit<Patient, 'id'>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: 'Completed' | 'Cancelled') => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const useLocalStorage = <T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [patients, setPatients] = useLocalStorage<Patient[]>('hospitalPatients', MOCK_PATIENTS);
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('hospitalAppointments', MOCK_APPOINTMENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    setLoading(false);
  }, []);

  const addPatient = (patient: Omit<Patient, 'id'>) => {
    const newPatient: Patient = { ...patient, id: `PAT-${Date.now()}` };
    setPatients(prev => [newPatient, ...prev]);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'| 'status'>) => {
    const newAppointment: Appointment = { ...appointment, id: `APP-${Date.now()}`, status: 'Scheduled' };
    setAppointments(prev => [newAppointment, ...prev].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  };

  const updateAppointmentStatus = (id: string, status: 'Completed' | 'Cancelled') => {
    setAppointments(prev => prev.map(app => app.id === id ? { ...app, status } : app));
  };
  
  const value = { patients, appointments, addPatient, addAppointment, updateAppointmentStatus, loading };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
