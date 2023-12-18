// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ComplexNavbar from "../NavBar.jsx"
import PostInput from "./PostInput";
import FeedHistory from "./FeedHistory.jsx";
import PostTemplate from "./PostTemplate.jsx";
import Users from "../../Users/Users.jsx";
import { useQuery } from "react-query";

const FeedContainer = ({searchValue, users, userId, isLoadingSearch,userIdRequesting,refreshFriends}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [triggerFetch, setTriggerFetch] = useState(true);
  const { data, isLoading, isError, error, refetch } = useQuery(
    ['friendsPosts', userId],
    () => fetchFriendsPosts(userId),{
      enabled: triggerFetch,
      onSettled: () => {
        // Reset triggerFetch after query completion
        setTriggerFetch(false);
      },
    }
  );



  
  const fetchFriendsPosts = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5022/friendsPosts?userId=${userId}`, {
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
      console.log(data,"posts")
      return data;
    } catch (error) {
      console.error('Error fetching friends:', error);
      throw error;
    }
  };
  useEffect(()=>{
    const interval = setInterval(() => {
      setTriggerFetch(true)
    }, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
   
    
  },[triggerFetch])
  

  return (
    <>
    {
    isLoading?<div>loading...</div>:
    <div className="bg-white bg-opacity-75 w-auto h-screen lg:h-[38rem] shadow-2xl rounded-xl font-montserrat p-3">
    {searchValue ==="" ? (<div><PostInput setTrigger ={setTriggerFetch} userId={userId}></PostInput> <FeedHistory isLoading={isLoading} postData={data} userId ={userId}></FeedHistory></div>): (<div className=""><Users users={users} isLoadingSearch={isLoadingSearch} userIdRequesting={userIdRequesting} refreshFriends={refreshFriends}></Users></div>)}
        
        
    </div>
  }
    </>
  );
};

export default FeedContainer;
