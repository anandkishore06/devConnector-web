import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import {addUser} from "../utils/userSlice";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUser = async () => {

    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      console.log(res);
      
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
