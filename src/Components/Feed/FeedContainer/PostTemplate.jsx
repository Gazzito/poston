// Register.js
import { Avatar, Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import ComplexNavbar from "../NavBar.jsx";
import {
  AdjustmentsHorizontalIcon,
  AdjustmentsVerticalIcon,
  ChatBubbleBottomCenterIcon,
  ChevronDownIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";

const PostTemplate = ({ post }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [postData, setPostData] = useState({
    postId: post.postId,
    userId: post.user.userId,
    firstName: post.user.firstName,
    lastName: post.user.lastName,
    profilePic: post.user.profilePic,
    content: post.content,
    likes: post.likes,
    dislikes: post.dislikes,
    createdOn: post.createdOn,
  });

  const [likes, setLikes] = useState(post.likes) 
  const [dislikes, setDislikes] = useState(post.dislikes) 
  const handleLike = async () => {
    try {
      
      const response = await fetch(`http://localhost:5022/likePost?postId=${postData.postId}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body:  postData.postId,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setLikes(data.likes)
    } catch (error) {
        console.error('Error:', error);
    }
};

const handleDislike = async () => {
    try {
      const response = await fetch(`http://localhost:5022/dislikePost?postId=${postData.postId}`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body:  postData.postId,
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setDislikes(data.dislikes)
    } catch (error) {
        console.error('Error:', error);
    }
};

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Usage
const formattedDate = formatDate(postData.createdOn);

  console.log(postData);
  const handleClickLink = () => {
    navigate("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    console.log("Registration submitted:", postData);
  };

  return (
    <>
      <div className="lg:visible lg:lg:px-2 py-2 lg:rounded-xl lg:h-auto lg:w-full">
        <div className="grid grid-cols-12 lg:grid lg:grid-cols-12">
          <div className=" col-span-8 lg:col-span-5 flex justify-start items-center lg:z-10">
            <Avatar
              variant="circular"
              size="xl"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src={postData.profilePic}
            />
            <div className="ml-4">
              <Typography className="text-base lg:text-xl">
                {postData.firstName + " "+ postData.lastName}
              </Typography>
            </div>
            
          </div>
          <div className="col-span-3 lg:col-span-6 flex justify-center items-center"><div className="lg:ml-10">
              {" "}
              <Typography className="text-xs ml-1 lg:ml-0">
                Posted {formattedDate}
              </Typography>
            </div></div>
          <div className="col-span-1 lg:col-span-1 lg:flex lg:justify-start lg:items-center">
            <Button
              variant="text"
              color="blue-gray"
              className="hover:bg-black hover:bg-opacity-5 flex items-center gap-1 rounded-full py-0.5 pr-2 pl-2 lg:ml-auto"
            >
              <AdjustmentsHorizontalIcon
                strokeWidth={10}
                className={`h-5 w-5 transition-transform ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </div>
        </div>
        <div className="mt-2 grid grid-rows-10">
          <div className="grid grid-cols-12 ">
          <div className="lg:col-span-2">
            </div>
            <div className="text-sm lg:text-base col-span-9 break-all text-justify">
              {postData.content}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 mt-4 lg:text-white">
            <div className="col-span-5 lg:col-span-7"></div>
            <div className="col-span-1 flex justify-center w-full items-center ">

                
                <div className="lg:col-span-6">
                  <Button
                    variant="text"
                    color="blue-gray"
                    onClick={handleLike}
                    className="hover:bg-black hover:bg-opacity-5 py-1 px-3 w-full bg-primary rounded-xl"
                  >
                    <HandThumbUpIcon
                      strokeWidth={10}
                      className={`h-6 w-6 transition-transform  text-white ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>
                <div className="col-span-2 text-primary ml-2">  {likes}</div>
            </div>
            <div className="col-span-2 lg:col-span-1 flex justify-center w-full items-center ">
            <div className="col-span-6 ml-20 lg:ml-20">
                  <Button
                    variant="text"
                    color="blue-gray"
                    onClick={handleDislike}
                    className="hover:bg-black hover:bg-opacity-5 py-1 px-3 w-full bg-primary rounded-xl"
                  >
                    <HandThumbDownIcon
                      strokeWidth={10}
                      className={`h-6 w-6 transition-transform  text-white ${
                        isMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>
                <div className="lg:col-span-2 text-red-500 ml-2">  {dislikes}</div>
            </div>
          </div>
        </div>
        <hr className="mt-4"></hr>
      </div>
    </>
  );
};

export default PostTemplate;
