import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar.jsx";
import './styles/index.css';
import CreatePage from './pages/CreatePage.jsx';
import HomePage from './pages/HomePage.jsx';
import PollPage from './pages/PollPage.jsx';

function App() {
  return (
   <Router>
    <Navbar/>
    <main className="main-content">
    <Routes>
      <Route path="/" element={<HomePage />} />
    <Route path="/create" element={<CreatePage />} />
    <Route path="/poll/:id" element={<PollPage />} />

    </Routes>
    </main>

   </Router>
  );
}

export default App;
