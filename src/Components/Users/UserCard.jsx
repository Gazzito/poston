// Register.js
import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const UserCard = ({ key, userId, firstName, lastName, isOnline, profilePic , userIdRequesting, refreshFriends}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  console.log("testeeeee",userId);
  const handleClickLink = () => {
    navigate("/login");
  };

  

  const followUser = async (userRequesting, userReceiving) => {
    try {
        const requestBody = JSON.stringify({ userRequesting, userReceiving });
      const response = await fetch(`http://localhost:5022/requestFriendship?userRequestingId=${userRequesting}&userReceivingId=${userReceiving}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: requestBody,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
      } else {
       refreshFriends(userRequesting)
      }
    } catch (error) {
      throw new Error(`Error creating User: ${error}`);
    }
  };

  const followAuser = () =>{

    followUser(userIdRequesting,userId)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    console.log("Registration submitted:", formData);
  };

  return (
    <>
      <div className="p-3 mt-2 rounded-xl h-auto bg-black bg-opacity-5">
        <div className="grid grid-cols-12">
          <div className="col-span-8 flex items-center">
            
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
            <div className="col-span-4 flex justify-end">
              <Button className=" bg-primary" onClick={followAuser}>
                <span className="text-base font-montserrat">Seguir</span>
              </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
