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
import { useQuery } from "react-query";


const fetchFriends = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5022/friends?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log("adasd", data);
    return data;
  } catch (error) {
    console.error('Error fetching friends:', error);
    throw error;
  }
};

const fetchUserDetails = async (userId) => {
  try {
    const response = await fetch(`http://localhost:5022/userDetails?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("token")}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.log(response);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const dataUserDetails = await response.json();
    console.log("userDetails", dataUserDetails);
    return dataUserDetails;
  } catch (error) {
    console.error('Error fetching userDetails:', error);
    throw error;
  }
};



const Feed = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [connections, setConnections] = useState(null);
  const [connectionState, setConnectionState] = useState("OFF")
  const [isOnline, setIsOnline] = useState("Online")

  

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
      setIsOnline("Offline")
    }else{
      console.log("Erroo")
    }

  }

  const isBackOnline= () => {
    if (connections || connectionState === "Connected"){
      console.log("ENTROUUUU backonline" ,  decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"])
       // Call the backend method
      connections.invoke("FriendBackOnline", decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      setIsOnline("Online")
    }else{
      console.log("Erroo")
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
    if(decodedToken["exp"]*1000 < Math.floor(Date.now() / 1000)){
      navigate("/login");
    }
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

  const { data, isLoading, isError, error } = useQuery(['friends', decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]], () => fetchFriends(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]));
  const { data: dataUserDetails, isLoading: isLoadingUserDetails, isError: isErrorUserDetails, error: errorUserDetails } = useQuery(['userDetails', decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]], () => fetchUserDetails(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]));

  if (isLoading || isLoadingUserDetails) {
    return <p>Loading...</p>;
  }else{
    console.log(dataUserDetails)
  }

  if (isError || isErrorUserDetails) {
    return <p>Error: {error.message}</p>;
  }

  const friends = data || []; // Ensure friends is not undefined
  const userDetails = dataUserDetails || []



  return (
    <>
    
    <div className="mb-0 bg-gradient-to-t from-primary to-highlight font-montserrat min-h-screen flex justify-center items-center">
    <ComplexNavbar userDetails={userDetails}></ComplexNavbar> 
    <div className="hidden md:visible lg:visible fixed top-24 w-full lg:grid-container lg:grid lg:grid-cols-4 ">
        <div className="lg:col-span-1 "><Groups className=""></Groups></div>
        <div className="lg:col-span-2"><FeedContainer></FeedContainer></div>
          <div className=""> <OnlinePeople friends={friends} isOnline={isOnline}></OnlinePeople></div>
        </div> 
    </div>

    <div className="lg:hidden fixed top-24 w-full ">
        <div className=""><FeedContainer></FeedContainer></div>
    </div> 
    
    
    </>
  );
};

export default Feed;
