import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const navigate = useNavigate();
  const [errors, setError] = useState('');
  const sendRegistrationData = async (userToCreate) => {
    try {
      const response = await fetch("http://localhost:5022/register", {
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
        navigate("/login");
      }
    } catch (error) {
      throw new Error(`Error creating User: ${error}`);
    }
  };

  const mutation = useMutation(sendRegistrationData);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
  });

 
  

  const handleClickLink = () => {
    navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedData = {
      FirstName: formData.firstName,
      LastName: formData.lastName,
      email: formData.email,
      biography:'',
      profilepic:'',
      isOnline:false,
      login: {
        Username: formData.username,
        PasswordHash: formData.password,
        user: null,
      },
    };
    console.log(mutation.mutate(formattedData));
    
  };

  return (
    <div className="bg-gradient-to-t from-primary to-highlight font-montserrat min-h-screen  flex justify-center items-center">
      <div className="px-5 py-5 min-w-full md:min-w-fit xl:min-w-fit xl:w-4/12 bg-black bg-opacity-25  xl:px-16 xl:py-10 xl:border-solid md:rounded-2xl md:px-12 md:py-10 xl:rounded-2xl shadow-2xl">
        <div className="flex justify-center">
          <Typography variant="h2" color="white" className="font-bold font-montserrat">
            Welcome to PostON
          </Typography>
        </div>
      
        <form onSubmit={handleSubmit}>
          <Typography variant="h4" color="white" className="font-bold mt-4">
            First Name
          </Typography>
          <Input required
            type="text"
            id="firstName" 
            name="firstName"
            onChange={(e) => handleChange(e)}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />

          <Typography variant="h4" color="white" className="font-bold mt-3">
            Last Name
          </Typography>
          <Input required
            type="text"
            id="lastName" 
            name="lastName"
            onChange={(e) => handleChange(e)}
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />

          <Typography variant="h4" color="white" className="font-bold mt-3">
            Email
          </Typography>
          <Input required
            type="email"
            id="email" 
            name="email"
            onChange={(e) => handleChange(e)} 
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />

          <Typography variant="h4" color="white" className="font-bold mt-3">
            Username
          </Typography>
          <Input required
            type="text"
            id="username" 
            name="username"
            onChange={(e) => handleChange(e)} 
            className="!border !border-gray-300 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
            labelProps={{
              className: "hidden",
            }}
            containerProps={{ className: "min-w-[100px]" }}
          />

          <Typography variant="h4" color="white" className="font-bold mt-3">
            Password
          </Typography>
          <Input required
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

          <Button
            className="mt-6 bg-primary"
            type="submit"
            fullWidth
            disabled={mutation.isLoading}
          >
            <span className="text-lg font-montserrat">Register</span>
          </Button>

          <p className='font-montserrat flex justify-center text-highlight underline hover:text-primary hover:cursor-pointer mt-2' onClick={handleClickLink}>
            Have an account? Sign in instead!
          </p>

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

export default Register;
