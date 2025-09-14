
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import type { Appointment } from '../types';

const AppointmentsPage: React.FC = () => {
  const { appointments, addAppointment, updateAppointmentStatus } = useData();
  const [formData, setFormData] = useState({
    patientName: '',
    doctor: 'Dr. Smith',
    date: '',
    time: '',
    reason: ''
  });
  const [filter, setFilter] = useState<'All' | 'Scheduled' | 'Completed' | 'Cancelled'>('All');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.patientName && formData.date && formData.time && formData.reason) {
        addAppointment(formData);
        setFormData({ patientName: '', doctor: 'Dr. Smith', date: '', time: '', reason: '' });
    } else {
        alert("Please fill all required fields.");
    }
  };

  const filteredAppointments = useMemo(() => {
    if (filter === 'All') return appointments;
    return appointments.filter(app => app.status === filter);
  }, [appointments, filter]);

  const getStatusBadge = (status: Appointment['status']) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card title="Book an Appointment">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
              <input type="text" name="patientName" id="patientName" value={formData.patientName} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
            </div>
            <div>
              <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
              <select name="doctor" id="doctor" value={formData.doctor} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                <option>Dr. Smith</option>
                <option>Dr. Jones</option>
                <option>Dr. Brown</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                    <input type="date" name="date" id="date" value={formData.date} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                </div>
                <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</label>
                    <input type="time" name="time" id="time" value={formData.time} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                </div>
            </div>
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700">Reason for Visit</label>
              <textarea name="reason" id="reason" rows={3} value={formData.reason} onChange={handleInputChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">Book Appointment</button>
          </form>
        </Card>
      </div>
      <div className="lg:col-span-2">
        <Card>
            <div className="flex justify-between items-center mb-4 border-b pb-4">
                 <h3 className="text-lg font-semibold text-gray-800">All Appointments</h3>
                 <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="border border-gray-300 rounded-md py-1 px-2 focus:outline-none focus:ring-primary focus:border-primary">
                    <option>All</option>
                    <option>Scheduled</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                 </select>
            </div>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {filteredAppointments.map(app => (
              <div key={app.id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-gray-800">{app.patientName}</p>
                    <p className="text-sm text-gray-600">{app.doctor}</p>
                    <p className="text-sm text-gray-500">{new Date(app.date).toLocaleDateString()} at {app.time}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(app.status)}`}>{app.status}</span>
                </div>
                <p className="mt-2 text-sm text-gray-700">{app.reason}</p>
                {app.status === 'Scheduled' && (
                    <div className="mt-3 flex space-x-2">
                        <button onClick={() => updateAppointmentStatus(app.id, 'Completed')} className="text-xs bg-success/20 text-success font-semibold py-1 px-2 rounded hover:bg-success/30">Complete</button>
                        <button onClick={() => updateAppointmentStatus(app.id, 'Cancelled')} className="text-xs bg-danger/20 text-danger font-semibold py-1 px-2 rounded hover:bg-danger/30">Cancel</button>
                    </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentsPage;
