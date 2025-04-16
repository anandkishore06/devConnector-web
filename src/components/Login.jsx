import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("anand@gmail.com");
  const [password, setPassword] = useState("Anand@123");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL+ "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-12">
        <div className="card bg-base-200 w-96 shadow-xl card-lg">
          <div className="card-body">
            <h2 className="card-title justify-center">Login</h2>
            <div className="py-4">
              <div className="py-1">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text py-1">Email ID : </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
              <div className="py-1">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text py-1">Password </span>
                  </div>
                  <input
                    type="text"
                    placeholder="Type here"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>
            </div>
            <div className="card-actions justify-center">
              <button className="btn btn-primary" onClick={handleLogin}>
                login
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
