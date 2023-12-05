// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ComplexNavbar from "./NavBar.jsx"
import FeedContainer from "./FeedContainer/FeedContainer.jsx";
import OnlinePeople from "./OnlinePeople.jsx";
import Groups from "./Groups.jsx";

const Feed = () => {
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
    
    <div className="mb-0 bg-gradient-to-t from-primary to-highlight font-montserrat min-h-screen  flex justify-center items-center">
    <ComplexNavbar></ComplexNavbar> 
    <div className="fixed top-24 grid-container grid grid-cols-4 ">
        <div className="col-span-1 "><Groups></Groups></div>
        <div className="col-span-2"><FeedContainer></FeedContainer></div>
        <div className="col-span-1"> <OnlinePeople></OnlinePeople></div>
        </div> 
    </div>
    </>
  );
};

export default Feed;
