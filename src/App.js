import React from 'react';
import Navbar from './navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LandingPage from './components/LandingPage';
import Items from './components/Items';
import Invoices from './components/Invoices';
import SendEmail from './components/SendEmail';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/items" element={<Items />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/sendemail" element={<SendEmail />} />
      </Routes>
    </Router>
  );
}

export default App;
