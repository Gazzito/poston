// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleClickLink = () => {
      navigate("/register")
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
    // Add your registration logic here
    console.log("Login Button Clicked:", formData);
  };

  return (
    <div className="bg-gradient-to-t from-primary to-highlight font-montserrat min-h-screen  flex justify-center items-center">
      <div className="px-5 py-5 min-w-full md:min-w-fit xl:min-w-fit xl:w-4/12 bg-black bg-opacity-25  xl:px-16 xl:py-10 xl:border-solid md:rounded-2xl md:px-12 md:py-10 xl:rounded-2xl shadow-2xl">
        <div className="flex justify-center"><Typography variant="h2" color="white" className="font-bold font-montserrat">
            Welcome to PostON
          </Typography></div>
      
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" color="white" className="font-bold mt-3">
            Username
          </Typography>
          <Input
            type="text"
            id="username" 
            name="username"
            onChange={(e) => handleChange(e)} // Add this line to handle the change
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
           <Typography variant="h4" color="white" className="font-bold mt-3">
            Password
          </Typography>
          <Input
            type="password"
            id="password" 
            name="password"
            onChange={(e) => handleChange(e)} 
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />
          <Button className="mt-6 bg-primary" type="submit" fullWidth>
          <span className="text-lg font-montserrat">Login</span>
        </Button>
        <p className='font-montserrat flex justify-center text-highlight underline hover:text-primary hover:cursor-pointer mt-2' onClick={handleClickLink}>New here? Register then!</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
