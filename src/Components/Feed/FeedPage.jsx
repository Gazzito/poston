// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useRef, useState } from "react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import ComplexNavbar from "./NavBar.jsx"
import FeedContainer from "./FeedContainer/FeedContainer.jsx";
import OnlinePeople from "../Friends/OnlinePeople.jsx";
import Groups from "./Groups.jsx";
import { jwtDecode } from "jwt-decode";
import * as signalR from '@microsoft/signalr';
import { createConnection } from "../../Services/SignalR.jsx";
import { useQuery } from "react-query";
import { debounce } from "lodash";





const Feed = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const [connections, setConnections] = useState(null);
  const [connectionState, setConnectionState] = useState("OFF")
  const [isOnline, setIsOnline] = useState(true)
  const userId = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  const [triggerFetch, setTriggerFetch] = useState(false);
  const { data, isLoading, isError, error } = useQuery(
    ['friends', userId],
    () => fetchFriends(userId),
    {
      enabled: triggerFetch,
      onSettled: () => {
        // Reset triggerFetch after query completion
        setTriggerFetch(false);
      },
    }
  );

  const [users, setUsers] = useState([]);
  

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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const dataUserDetails = await response.json();
      return dataUserDetails;
    } catch (error) {
      console.error('Error fetching userDetails:', error);
      throw error;
    }
  };
  
  const fetchUsers = async (search) => {
    try {
      const response = await fetch(`http://localhost:5022/users?search=${search}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const dataSearch = await response.json();
      setUsers(dataSearch);
      console.log(dataSearch);
      return dataSearch;
    } catch (error) {
      console.error('Error fetching userDetails:', error);
      throw error;
    }
  };
  
  

  useEffect(() => {
    const connection = createConnection();
    
    const startConnection = async () => {
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

    connection.on("FriendOnline", (userId) => {
      setTriggerFetch(true);
      console.log(`${userId} is online.`);
      // Implement your logic to display the notification to the user.
    });

    connection.on("FriendBackOnline", (userId) => {
      setTriggerFetch(true);
      console.log(`${userId} is back Online.`);
      // Implement your logic to display the notification to the user.
    });

    connection.on("FriendOffline", (userId) => {
      setTriggerFetch(true);
      console.log(`${userId} is offline.`);
      // Implement your logic to display the notification to the user.
    });

    setTriggerFetch(true);
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
      connections.invoke("FriendOffline", decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      setIsOnline(false)
    }else{
      console.log("Erroo")
    }

  }

  const isBackOnline= () => {
    if (connections || connectionState === "Connected"){
      connections.invoke("FriendBackOnline", decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]);
      setIsOnline(true)
    }else{
      console.log("Erroo")
    }

  }


  
const [searchValue, setSearchValue] = useState('');
const [debouncedValue, setDebouncedValue] = useState('');

// Debounced search function
const debouncedSearch = debounce((value) => {
  setDebouncedValue(value);
}, 500);

// Update debouncedValue whenever searchValue changes
useEffect(() => {
  if (searchValue) {
    debouncedSearch(searchValue);
  }
  // Cancel the debounce on unmount
  return () => debouncedSearch.cancel();
}, [searchValue]);

const { dataSearch, isLoadingSearch, isErrorSearch, errorSearch, refetch } = useQuery(
  ['users', debouncedValue],
  () => fetchUsers(debouncedValue),
  {
    enabled: !!debouncedValue,
  }
);

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
  const inactivityTimerRef = useRef(null);
  useEffect(()=>{

    createConnection();
},[])







useEffect(() => {
  
  const checkTokenExpiration = () => {
    if (decodedToken["exp"] * 1000 < Date.now()) {
      navigate("/login");
    }
  };

  // Call immediately and set an interval for continuous checking
  checkTokenExpiration();
  const tokenCheckInterval = setInterval(checkTokenExpiration, 60000); // Check every minute

  

  const resetInactivityTimer = () => {
    if (!isUserActive) {
      setIsUserActive(true);
      console.log('User is active.');
      isBackOnline();
    }

    clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setIsUserActive(false);
      isOffline();
      console.log('User is inactive.');
      
    }, 10000); // Adjusted to 5 minutes
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      resetInactivityTimer();
      checkTokenExpiration(); // Re-check token expiration when tab is visible
    }
  };

  document.addEventListener('mousemove', resetInactivityTimer);
  document.addEventListener('keydown', resetInactivityTimer);
  document.addEventListener('visibility', resetInactivityTimer);

  return () => {
    document.removeEventListener('mousemove', resetInactivityTimer);
    document.removeEventListener('keydown', resetInactivityTimer);
    document.removeEventListener('visibility', resetInactivityTimer);
    clearTimeout(inactivityTimerRef.current);
    clearInterval(tokenCheckInterval);
  };
}, [isUserActive, decodedToken, navigate]);

 
  const { data: dataUserDetails, isLoading: isLoadingUserDetails, isError: isErrorUserDetails, error: errorUserDetails } = useQuery(['userDetails', decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]], () => fetchUserDetails(decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]));

  if (isLoading || isLoadingUserDetails) {
    return <p>Loading...</p>;
  }else{
  }
  

  if (isError || isErrorUserDetails) {
    return <p>Error: {error.message}</p>;
  }

  const friends = data || []; // Ensure friends is not undefined
  
  const userDetails = dataUserDetails || []
  console.log(users,"teste")


  return (
    <>
    
    <div className="mb-0 bg-gradient-to-t from-primary to-highlight font-montserrat min-h-screen flex justify-center items-center">
    <ComplexNavbar onSearchChange={setSearchValue} userDetails={userDetails}></ComplexNavbar> 
    <div className="hidden md:visible lg:visible fixed top-24 w-full lg:grid-container lg:grid lg:grid-cols-4 ">
        <div className="lg:col-span-1 "><Groups className=""></Groups></div>
        <div className="lg:col-span-2"><FeedContainer searchValue={searchValue} users={users} isLoading={isLoadingSearch}></FeedContainer></div>
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
