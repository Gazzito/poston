import React from "react";
import { useQuery } from "react-query";
import CardPeople from "./CardPeople";


const CardList = ({friends}) => {
    console.log(friends,"USERRRR")

  return (
    <>
      {/* Render your CardPeople components using the 'friends' data */}
      {friends.map((friend,index) => (
        console.log(friend.firstName, "frienda"),
        <CardPeople key={friend.userId} firstName={friend.firstName} lastName={friend.lastName} profilePic={friend.profilePic}/>
      ))}
    </>
  );
};

export default CardList;
