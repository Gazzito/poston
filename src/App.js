// App.js with routing
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
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
        <Routes>
        <Route path="https://gazzito.github.io/poston/" element={<Login />} />
          <Route path="https://gazzito.github.io/poston/register" element={<Register />} />
          <Route path="https://gazzito.github.io/poston/login" element={<Login />} />
          <Route
          path="https://gazzito.github.io/poston/feed"
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }></Route>
        </Routes>
      </div>
    </Router>
    </QueryClientProvider>
    </>
  );
};

export default App;