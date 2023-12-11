// Register.js
import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const CardPeople = ({userId, firstName, lastName, isOnline, profilePic}) => {
  const navigate = useNavigate();
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

  return (
    <>
    
    <div className="p-3 mt-2 rounded-xl h-auto bg-black bg-opacity-5">
        <div>
        <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={profilePic}
            />
            <span className="ml-4">{firstName + " "+ lastName}</span> 
            <span className="ml-4 border-4 border-primary rounded-full"></span> 
        </div>
       
    </div>
    </>
  );
};

export default CardPeople;
