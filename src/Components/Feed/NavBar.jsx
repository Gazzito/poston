import React, { useEffect, useMemo, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
  Input,
  Collapse,
} from "@material-tailwind/react";
import debounce from 'lodash/debounce';
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
 
// profile menu component
const profileMenuItems = [
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
 
function ProfileMenu({profilePic, onLogout}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);
 
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
      <div className="lg:ml-10">
      <Button
          variant="text"
          color="blue-gray"
          className="hover:bg-black hover:bg-opacity-5 flex items-center gap-1 w-16 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={profilePic}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </div>
        
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          const handleAction = isLastItem ? onLogout : closeMenu;
          return (
            <MenuItem
              key={label}
              onClick={handleAction}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

 
// nav list component
const navListItems = [
  
];
 
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:hover:text-primary">
     
      {navListItems.map(({ label, icon }, key) => (
        <Typography
          key={label}
          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500 "
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full hover:bg-black hover:bg-opacity-5">
            {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
            <span className="font-montserrat text-gray-900"> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}
 
export default function ComplexNavbar({userDetails,onSearchChange, isOffline }) {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  const navigate = useNavigate();

  const handleLogout = () => {
    isOffline();
  };


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <div className="fixed top-5 mx-6 font-montserrat">
    <Navbar className="max-w-screen-xl p-2 lg:rounded-full lg:pl-6 lg:mx-0 bg-white" color="" >
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="hidden md:visible lg: visible font-montserrat mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          PostON
        </Typography>
        <input
        placeholder="Search for friends"
        onChange={(e) => onSearchChange(e.target.value)}
         className="mr-2 !border border-primary outline-none hover:transition-all hover:transform-gpu hover:scale-105  rounded-xl py-1 px-2"></input>

        <div className="hidden lg:block">
          
          <NavList />
          
        </div>
       
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-10" />
        </IconButton>
        <ProfileMenu profilePic={userDetails[0].profilePic} onLogout={handleLogout}/>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
    </div>
  );
}