import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed.length > 0) return;

    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      const feedData = res?.data?.users;
      
      dispatch(addFeed(feedData));
      
    } catch (err) {
      //
    }
  };
  useEffect(() => {
    if (!feed || feed.length === 0) {
      getFeed();
    }
  }, []);
  
  if(!feed) return;
  if (feed.length <= 0)
    return (
      <div className="flex items-center justify-center h-64">
        <h1 className="text-2xl font-semibold text-gray-500">
          🚫 No More Users Found
        </h1>
      </div>
    );
  

  return (
    <div className="flex justify-center my-10">
      <UserCard user={feed[0]}/>
    </div>
  );
};

export default Feed;
