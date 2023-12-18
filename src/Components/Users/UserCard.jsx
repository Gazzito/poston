// Register.js
import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const UserCard = ({ userId, firstName, lastName, isOnline, profilePic }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  console.log(firstName);
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
    console.log(e);

    console.log("Registration submitted:", formData);
  };

  return (
    <>
      <div className="p-3 mt-2 rounded-xl h-auto bg-black bg-opacity-5">
        <div className="grid grid-cols-12">
          <div className="col-span-8 flex items-center border-2">
            
              <Avatar
                variant="circular"
                size="sm"
                alt="tania andrew"
                className="border border-gray-900 p-0.5"
                src={profilePic}
              />
              {isOnline ? (
                <span className="ml-4 border-4 border-primary rounded-full"></span>
              ) : (
                <span className="ml-4 border-4 border-gray rounded-full"></span>
              )}

              <span className="ml-3">{firstName + " " + lastName}</span>
    

            
            </div>
            <div className="col-span-4 flex justify-end border-2">
              <Button className=" bg-primary" type="submit">
                <span className="text-base font-montserrat">Login</span>
              </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
