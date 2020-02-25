import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ImageForm from './components/ImageForm';
import Images from './components/Images'
import Navbar from './components/Navbar';


function App() {
  return (
    <Router>
      <Navbar/>
    <div className="container p-4">
      <Route path='/' exact component={Images} />
      <Route path='/images/add' component={ImageForm} />
    </div>

  </Router>
  );
}

export default App;
