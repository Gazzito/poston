// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import UserList from "./UserList";


const Users = ({users, isLoadingSearch, userIdRequesting, refreshFriends}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  console.log(users);
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
    <div className="bg-white mt-3 w-auto h-full lg:h-full rounded-xl font-montserrat p-3 overflow-auto">
        <UserList users={users} isLoadingSearch={isLoadingSearch} userIdRequesting={userIdRequesting} refreshFriends={refreshFriends}></UserList>
    </div>
    </>
  );
};

export default Users;
