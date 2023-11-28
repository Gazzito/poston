// App.js with routing
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;