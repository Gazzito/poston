// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ComplexNavbar from "../NavBar.jsx"

const PostInput = () => {
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
    
    <div className="bg-white w-auto h-36 rounded-xl font-montserrat p-3 overflow-auto">
        <div className="p-3 rounded-xl h-auto">
          <Typography className="text-sm font-montserrat font-extralight text-black leading-4">
           <span className="">Post Something</span>
           <textarea className="resize-none mt-3 w-full h-16 p-3 !border border-primary rounded-xl" placeholder="What's in your soul today?"></textarea>
           </Typography></div>
           
        
    </div>
    </>
  );
};

export default PostInput;
