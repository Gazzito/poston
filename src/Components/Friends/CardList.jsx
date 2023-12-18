import React from "react";
import { useQuery } from "react-query";
import CardPeople from "./CardPeople";


const CardList = ({friends}) => {
  console.log(friends)
  return (
    <>
      {/* Render your CardPeople components using the 'friends' data */}
      {friends.map((friend,index) => (
        <CardPeople key={friend.userId} firstName={friend.firstName} lastName={friend.lastName} profilePic={friend.profilePic} isOnline = {friend.isOnline}/>
      ))}
    </>
  );
};

export default CardList;
