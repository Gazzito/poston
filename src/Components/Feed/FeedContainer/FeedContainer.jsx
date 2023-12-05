// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ComplexNavbar from "../NavBar.jsx"
import PostInput from "./PostInput";
import FeedHistory from "./FeedHistory.jsx";
import PostTemplate from "./PostTemplate.jsx";

const FeedContainer = () => {
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
    
    <div className="bg-white bg-opacity-75 w-auto h-screen lg:h-[38rem] shadow-2xl rounded-xl font-montserrat p-3">

        <PostInput></PostInput>
        <FeedHistory></FeedHistory>
    </div>
    </>
  );
};

export default FeedContainer;
