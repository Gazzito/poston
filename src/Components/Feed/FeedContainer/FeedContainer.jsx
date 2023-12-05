// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ComplexNavbar from "../NavBar.jsx"

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
    
    <div className="bg-white w-auto !border h-[38rem] border-primary rounded-xl font-montserrat p-3 overflow-auto">
        <div className="p-3 rounded-xl h-auto bg-black bg-opacity-5"><Typography className="text-sm h-full font-montserrat font-extralight text-black leading-4">
          I started my journey by taking a Professional Course in the HighSchool
          of Entroncamento and proceeded furthermore to the PolyTechnic
          Institute of Tomar where I got my passion for programming, and by
          using technical skills that I gathered over my previous academic
          experiences I was able to accomplish Higher Technician Diploma in
          Technology and Programming in Information Systems (Level 5). At the
          time being I'm finishing my Bachelor's Degree.<br></br>
          My professional path began during my academic pursuit, when I started
          an internship at "SSDMI" where I mantained the hardware of a
          supermarket's network called "Os Mosqueteiros". I gained more software
          knowledge by joining a company called "Softinsa" where I was a web developer using Agile Methodology, I acquired more
          soft skills and team building experiences. <b></b>
        </Typography></div>
    </div>
    </>
  );
};

export default FeedContainer;
