
import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import Card from '../components/ui/Card';
import type { Patient } from '../types';

const PatientsListPage: React.FC = () => {
  const { patients } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredPatients = useMemo(() => {
    return patients
      .filter(patient => {
        if (filterStatus === 'All') return true;
        return patient.status === filterStatus;
      })
      .filter(patient =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [patients, searchTerm, filterStatus]);

  const getStatusBadge = (status: Patient['status']) => {
    switch (status) {
      case 'Admitted': return 'bg-blue-100 text-blue-800';
      case 'Under Observation': return 'bg-yellow-100 text-yellow-800';
      case 'Discharged': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="animate-fade-in">
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Patient Records</h2>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="All">All Statuses</option>
              <option value="Admitted">Admitted</option>
              <option value="Under Observation">Under Observation</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Age</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Diagnosis</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Doctor</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{patient.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{patient.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{patient.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden lg:table-cell">{patient.diagnosis}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">{patient.doctor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(patient.status)}`}>
                      {patient.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredPatients.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No patients found.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PatientsListPage;
