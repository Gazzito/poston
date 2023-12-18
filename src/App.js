// App.js with routing
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate, BrowserRouter } from 'react-router-dom';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Feed from './Components/Feed/FeedPage';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';
import { useAuth } from './Services/Auth';
import { jwtDecode } from 'jwt-decode';
import ProtectedRoute from './Services/ProtectedRoute';

const queryClient = new QueryClient();

const App = () => {
  
  return (
    <>
    <QueryClientProvider client={queryClient}>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"></link>
    <Router>
    
      <div>
      <BrowserRouter basename="/poston/">
        <Routes>
        <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
          path="/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }></Route>
        </Routes>
        </BrowserRouter>
      </div>
    </Router>
    </QueryClientProvider>
    </>
  );
};

export default App;