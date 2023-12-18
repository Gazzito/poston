// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import CardPeople from "./CardPeople";
import CardList from "./CardList";

const OnlinePeople = ({userId, friends}) => {
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
    
    <div className="bg-white w-auto h-[38rem] shadow-2xl rounded-xl font-montserrat mx-5 p-3 overflow-auto">
        <div className="p-3 rounded-xl h-auto bg-black bg-opacity-5"><Typography className="text-sm h-full font-montserrat font-extralight text-black leading-4">
          My interests
        </Typography></div>
          <CardList userId={userId} friends={friends}></CardList>
        
    </div>
    </>
  );
};

export default OnlinePeople;
