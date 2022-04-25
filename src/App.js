import { Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import './App.css';

function App() {
  return (
    <div className="App">
        <h1> PunkAPI Bar Chart</h1>

        <nav className="Navbar">
		    <Link to='/' className="Link">Home Page</Link>
		    <Link to='/About' className="Link">About This Project</Link>
	  	</nav>

        <Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='About' element={<AboutPage />} />
		</Routes>
    </div>
  );
}

export default App;
