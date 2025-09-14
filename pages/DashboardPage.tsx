
import React from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import AIAssistant from '../components/dashboard/AIAssistant';
import { UsersIcon, CalendarIcon } from '../components/icons';

const DashboardPage: React.FC = () => {
  const { patients, appointments, loading } = useData();

  if (loading) {
    return <div>Loading...</div>;
  }

  const admittedPatients = patients.filter(p => p.status === 'Admitted').length;
  const scheduledAppointments = appointments.filter(a => a.status === 'Scheduled' && new Date(a.date) >= new Date()).length;

  const recentPatients = [...patients].sort((a, b) => new Date(b.admittedDate).getTime() - new Date(a.admittedDate).getTime()).slice(0, 5);

  const StatCard = ({ title, value, icon }: { title: string; value: number | string; icon: React.ReactNode }) => (
    <Card className="flex items-center p-4">
        <div className="p-3 rounded-full bg-primary-light text-primary-dark mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-semibold text-gray-800">{value}</p>
        </div>
    </Card>
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Admitted':
        return 'bg-blue-100 text-blue-800';
      case 'Under Observation':
        return 'bg-yellow-100 text-yellow-800';
      case 'Discharged':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Patients" value={patients.length} icon={<UsersIcon className="h-6 w-6"/>} />
        <StatCard title="Admitted Patients" value={admittedPatients} icon={<UsersIcon className="h-6 w-6"/>} />
        <StatCard title="Upcoming Appointments" value={scheduledAppointments} icon={<CalendarIcon className="h-6 w-6"/>} />
        <StatCard title="Total Doctors" value={3} icon={<UsersIcon className="h-6 w-6"/>} />
      </div>

      <div className="mt-8">
        <Card title="Recent Patients">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b-2">
                            <th className="py-2 px-4">Name</th>
                            <th className="py-2 px-4 hidden md:table-cell">Diagnosis</th>
                            <th className="py-2 px-4 hidden lg:table-cell">Doctor</th>
                            <th className="py-2 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentPatients.map(patient => (
                            <tr key={patient.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{patient.name}</td>
                                <td className="py-3 px-4 hidden md:table-cell">{patient.diagnosis}</td>
                                <td className="py-3 px-4 hidden lg:table-cell">{patient.doctor}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(patient.status)}`}>
                                        {patient.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
      </div>
      
      <AIAssistant />

    </div>
  );
};

export default DashboardPage;
