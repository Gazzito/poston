// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Form, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [errors, setError] = useState('');
  const sendLoginDetails = async (userToCreate) => {
    try {
      const response = await fetch("http://localhost:5022/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userToCreate),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData)
        setError(errorData)
      } else {
        navigate("/feed");
      }
    } catch (error) {
      throw new Error(`Error creating User: ${error}`);
    }
  };

  const mutation = useMutation(sendLoginDetails);



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
    console.log(formData);
    const formattedData = {
      
        Username: formData.username,
        PasswordHash: formData.password,
        user: null,
    };
    console.log(formattedData)
    console.log(mutation.mutate(formattedData));
    
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
        {errors !== '' && (
        <div className="">
          {/* Display the error message to the user */}
          <Typography variant="h5" color="white" className="font-montserrat font-bold mt-3">
            {errors}
          </Typography>
        </div>
      )}
        </form>
      </div>
    </div>
  );
};

export default Login;
