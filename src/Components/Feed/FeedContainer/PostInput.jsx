// Register.js
import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ComplexNavbar from "../NavBar.jsx"
import { useMutation } from "react-query";

const PostInput = ({userId,setTrigger}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: userId,
    content: "",
    likes:0,
    dislikes:0
  });
  const [errors, setError] = useState("");
  
  const createPost = async (postToCreate) => {
    try {
      const response = await fetch(`http://localhost:5022/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(postToCreate),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        setError(errorData);
      } else {
        response.json().then((data) => {
          console.log(data)
          setFormData( {
            userId: userId,
            content: "",
            likes:0,
            dislikes:0})
            setTrigger(true);
          // Now you can use the token as needed, such as decoding it
          // const decodedToken = jwt_decode(token);
          // console.log(decodedToken);
        });
      }
    } catch (error) {
      throw new Error(`Error creating User: ${error}`);
    }
  };

  const mutation = useMutation(createPost);

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
    const formattedData = {
      CreatedBy: formData.userId,
      Content: formData.content,
      likes: 0,
      dislikes:0
    };
    
    console.log ("content",formattedData.content)
    mutation.mutate(formattedData);

  };

  return (
    <>
   
    <div className="bg-white w-auto h-36 rounded-xl font-montserrat p-3 ">
    <form onSubmit={handleSubmit}>
        <div className="p-0 rounded-xl h-auto">
          <Typography className="text-sm font-montserrat font-extralight text-black leading-4">
           <span className="">Post Something</span>
           <textarea id="content"
            name="content" 
            value= {formData.content}
            onChange={(e) => handleChange(e)}
            className="resize-none mt-2 w-full h-16 p-3 !border border-primary rounded-xl" placeholder="What's in your soul today?"></textarea>
           </Typography></div>
           {formData.content !== ""? <Button size="sm" className="mt-3 bg-primary" type="submit" fullWidth>
            <span className="text-base font-montserrat">Post</span>
          </Button>: <div></div>}
           
           </form>
    </div>
    </>
  );
};

export default PostInput;
