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
import { createConnection } from "../../Services/SignalR.jsx";

const Feed = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [connections, setConnections] = useState(null);
  const [connectionState, setConnectionState] = useState("OFF")
  useEffect(() => {
    const connection = createConnection();

    const startConnection = async () => {
      console.log("started connection function on feedPage.jsx");
      try {
        await connection.start();
        console.log('SignalR connection started');
        setConnectionState("ON");
      } catch (err) {
        console.error('Error starting SignalR connection:', err);
      }
      setConnections(connection);
    };

    startConnection();
    
    
    // Handle connection events
    connection.onclose(() => {
      console.log('SignalR connection closed');
    });

    connection.on("FriendOnline", (friendUsername) => {
      console.log(`${friendUsername} is online.`);
      // Implement your logic to display the notification to the user.
    });

    connection.on("FriendBackOnline", (userId) => {
      console.log(`${userId} is back Online.`);
      // Implement your logic to display the notification to the user.
    });

    connection.on("FriendOffline", (userId) => {
      console.log(`${userId} is offline.`);
      // Implement your logic to display the notification to the user.
    });


    // Clean up the connection when the component unmounts
    return () => {
      if (connection.state === 'Connected') {
        setConnectionState("OFF");
        connection.stop();
        console.log('SignalR connection stopped');
      }
    };
  }, []); // Empty dependency array means the effect runs only once

  const isOffline = () => {
    if (connections || connectionState === "Connected"){
      console.log("ENTROUUUU" ,  decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
       // Call the backend method
      connections.invoke("FriendOffline", decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);

    }

  }

  const isBackOnline= () => {
    if (connections || connectionState === "Connected"){
      console.log("ENTROUUUU backonline" ,  decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
       // Call the backend method
      connections.invoke("FriendBackOnline", decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);

    }

  }


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

  useEffect(()=>{

    createConnection();
},[])

  useEffect(() => {
    console.log(decodedToken)
    let inactivityTimer;
    

    const resetInactivityTimer = () => {
      if (!isUserActive) {
        setIsUserActive(true);
        console.log('User is active.');
        isBackOnline()
      }

      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        setIsUserActive(false);
        isOffline();
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
