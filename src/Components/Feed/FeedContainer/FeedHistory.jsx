// Register.js
import { Button, Input, Navbar, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ComplexNavbar from "../NavBar.jsx"
import PostTemplate from "./PostTemplate.jsx";
import { useQuery } from "react-query";
import CardPeople from "../../Friends/CardPeople.jsx";

const FeedHistory = ({userId, postData, isLoading}) => {
  const navigate = useNavigate();
  

  return (
    
    <>
    <div className="bg-white mt-3 w-auto h-screen lg:h-[26.6rem] rounded-xl font-montserrat p-3 overflow-auto">
    {
    !isLoading ? postData.map((post,index) => (
        
        
        <PostTemplate  key={post.postId} post ={post} />

        

      )): <div>loading</div>}
    </div>
    </>
  );
};

export default FeedHistory;
