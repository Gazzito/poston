// Register.js
import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const CardPeople = ({
  userId,
  firstName,
  lastName,
  isOnline,
  profilePic
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  return (
    <>
      <div className="p-3 mt-2 rounded-xl h-auto bg-black bg-opacity-5">
        <div className="grid grid-cols-12">
          <div className="col-span-12 flex items-center"><Avatar
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
        </div>
      </div>
    </>
  );
};

export default CardPeople;
