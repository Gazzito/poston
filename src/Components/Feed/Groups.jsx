// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const Groups = () => {
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
    
    <div className="bg-white w-auto h-[38rem] shadow-2xl rounded-xl font-montserrat mx-5 p-3 overflow-auto">
        <div className="p-3 rounded-xl h-auto bg-black bg-opacity-5"><Typography className="text-sm h-full font-montserrat font-extralight text-black leading-4">
          My groups
        </Typography></div>
    </div>
    </>
  );
};

export default Groups;
