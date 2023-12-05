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

const PostTemplate = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
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
    console.log(e);

    console.log("Registration submitted:", formData);
  };

  return (
    <>
      <div className="px-2 py-2 rounded-xl h-auto w-full">
        <div className="grid grid-cols-12">
          <div className="col-span-5 flex justify-start items-center">
            <Avatar
              variant="circular"
              size="xl"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <div className="ml-4">
              <Typography className="text-xl">Ricardo Almeida</Typography>
            </div>
          </div>
          <div className="col-span-4 "></div>
          <div className="col-span-3 flex justify-start items-center">
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
            <div className="col-span-2 flex justify-start items-center">
              {" "}
              <Typography className="text-xs">Posted 07/12/2023</Typography>
            </div>
            <div className="col-span-9 break-all text-justify">
              Há muito tempo atrás, decidi criar uma rede social, ao inicio
              estava hesitante porque não sabia, se ia conseguir. Afinal, não é
              qualquer pessoa que tem essa capacidade. Mas decidir acreditar nas
              minhas capacidades e então estou a meio da mesma. Algo que queria
              apenas partilhar, não desistam, acreditem em vocês!
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2 mt-4 text-white">
            <div className="col-span-7"></div>
            <div className="col-span-1 flex justify-center w-full items-center ">
              <div className="">
                <Button
                  variant="text"
                  color="blue-gray"
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
            </div>
            <div className="col-span-1 flex justify-center w-full items-center ">
              <div className="">
                <Button
                  variant="text"
                  color="blue-gray"
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
            </div>
            <div className="col-span-1 flex justify-center w-full items-center ">
              <div className="">
                <Button
                  variant="text"
                  color="blue-gray"
                  className="hover:bg-black hover:bg-opacity-5 py-1 px-3 w-full bg-primary rounded-xl"
                >
                  <ChatBubbleBottomCenterIcon
                    strokeWidth={10}
                    className={`h-6 w-6 transition-transform  text-white ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>
            <div className="col-span-1 flex justify-center w-full items-center ">
              <div className="">
                <Button
                  variant="text"
                  color="blue-gray"
                  className="hover:bg-black hover:bg-opacity-5 py-1 px-3 w-full bg-primary rounded-xl"
                >
                  <ShareIcon
                    strokeWidth={10}
                    className={`h-6 w-6 transition-transform  text-white ${
                      isMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-4"></hr>
      </div>
    </>
  );
};

export default PostTemplate;
