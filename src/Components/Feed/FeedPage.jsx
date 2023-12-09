// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import ComplexNavbar from "./NavBar.jsx"
import FeedContainer from "./FeedContainer/FeedContainer.jsx";
import OnlinePeople from "../Friends/OnlinePeople.jsx";
import Groups from "./Groups.jsx";
import { jwtDecode } from "jwt-decode";
import * as signalR from '@microsoft/signalr';

const Feed = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
  .withUrl("http://localhost:5022/friendsHub", {
    withCredentials: true,
    accessTokenFactory: () => localStorage.getItem("token"),
  })
  .build();
   
    newConnection.start()
      .then(() => {
        console.log("Connected to SignalR hub.");
      })
      .catch(err => {
        console.error("Error connecting to SignalR hub:", err);
      });

    setConnection(newConnection);


    newConnection.on("FriendOnline", (friendUsername) => {
        console.log(`${friendUsername} is online.`);
        // Implement your logic to display the notification to the user.
      });
  
    // Clean up the connection when the component is unmounted
    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, []); // Empty dependency array ensures this effect runs once on mount


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleClickLink = () => {
      navigate("/login")
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    
  

    
    console.log("Registration submitted:", formData);
  };


  const [isUserActive, setIsUserActive] = useState(true);

  useEffect(() => {
    console.log(decodedToken)
    let inactivityTimer;
    

    const resetInactivityTimer = () => {
      if (!isUserActive) {
        setIsUserActive(true);
        console.log('User is active.');
      }

      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setIsUserActive(false);
        console.log('User is inactive.');
         // Send a WebSocket message to the backend to update last seen timestamp
       //  websocket.send(JSON.stringify({userId: decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"], expirationTime: decodedToken["exp"] * 1000}));
      }, 5000); // Adjust the time threshold as needed
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        resetInactivityTimer();
      }
    };
   
    document.addEventListener('mousemove', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener('mousemove', resetInactivityTimer);
      document.removeEventListener('keydown', resetInactivityTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(inactivityTimer);
     
    };
  }, [isUserActive]);

  return (
    <>
    
    <div className="mb-0 bg-gradient-to-t from-primary to-highlight font-montserrat min-h-screen flex justify-center items-center">
    <ComplexNavbar></ComplexNavbar> 
    <div className="hidden md:visible lg:visible fixed top-24 w-full lg:grid-container lg:grid lg:grid-cols-4 ">
        <div className="lg:col-span-1 "><Groups className=""></Groups></div>
        <div className="lg:col-span-2"><FeedContainer></FeedContainer></div>
        <div className=""> <OnlinePeople></OnlinePeople></div>
        </div> 
    </div>

    <div className="lg:hidden fixed top-24 w-full ">
        <div className=""><FeedContainer></FeedContainer></div>
    </div> 
    
    
    </>
  );
};

export default Feed;
