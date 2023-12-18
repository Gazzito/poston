import React from "react";
import { useQuery } from "react-query";
import UserCard from "./UserCard";


const UserList = ({users,isLoadingSearch, userIdRequesting, refreshFriends}) => {



   // If data is loading or an error occurred, you can return loading indicators or error messages
  
  console.log(users)
  return (
    <>
      {/* Render your CardPeople components using the 'user' data */}
      {
       !users ? 
        (<div>Loading...</div>):
      users.map((user,index) => (
        console.log(user.userId),
        <UserCard userIdRequesting = {userIdRequesting} key={user.userId} userId={user.userId} firstName={user.firstName} lastName={user.lastName} profilePic={user.profilePic} isOnline = {user.isOnline} refreshFriends= {refreshFriends}/>
      ))}
    </>
  );
};

export default UserList;
