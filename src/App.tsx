import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProductPage from './pages/ProductPage';
import DashboardPage from './pages/DashboardPage';
import IntegrationsPage from './pages/IntegrationsPage';
import ResourcesPage from './pages/ResourcesPage';
import SolutionsPage from './pages/SolutionsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TermsPage from './pages/TermsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;