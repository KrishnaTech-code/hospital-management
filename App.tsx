
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AppointmentsPage from './pages/AppointmentsPage';
import PatientsListPage from './pages/PatientsListPage';
import MainLayout from './components/layout/MainLayout';

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <MainLayout>
                    <DashboardPage />
                  </MainLayout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/appointments" 
              element={
                <PrivateRoute>
                  <MainLayout>
                    <AppointmentsPage />
                  </MainLayout>
                </PrivateRoute>
              } 
            />
            <Route 
              path="/patients" 
              element={
                <PrivateRoute>
                  <MainLayout>
                    <PatientsListPage />
                  </MainLayout>
                </PrivateRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
