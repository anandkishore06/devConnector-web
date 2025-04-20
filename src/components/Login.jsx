import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

// const Login = () => {
//   const [emailId, setEmailId] = useState("anand@gmail.com");
//   const [password, setPassword] = useState("Anand@123");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");
//   const handleLogin = async () => {
//     try {
//       const res = await axios.post(
//         BASE_URL+ "/login",
//         {
//           emailId,
//           password,
//         },
//         { withCredentials: true }
//       );
    
//       dispatch(addUser(res.data));
//       return navigate("/");
      
//     } catch (err) {
      
//       setError("InValid Credentials");
      
//     }
//   };

//   return (
//     <>
//       <div className="flex justify-center my-12">
//         <div className="card bg-base-200 w-96 shadow-xl card-lg">
//           <div className="card-body">
//             <h2 className="card-title justify-center">Login</h2>
//             <div className="py-4">
//               <div className="py-1">
//                 <label className="form-control w-full max-w-xs">
//                   <div className="label">
//                     <span className="label-text py-1">Email ID : </span>
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Type here"
//                     value={emailId}
//                     onChange={(e) => setEmailId(e.target.value)}
//                     className="input input-bordered w-full max-w-xs"
//                   />
//                 </label>
//               </div>
//               <div className="py-1">
//                 <label className="form-control w-full max-w-xs">
//                   <div className="label">
//                     <span className="label-text py-1">Password </span>
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Type here"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="input input-bordered w-full max-w-xs"
//                   />
//                 </label>
//               </div>
//             </div>
//             <p className="text-red-500">{error}</p>
//             <div className="card-actions justify-center">
//               <button className="btn btn-primary" onClick={handleLogin}>
//                 login
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstname: firstName,
          lastname: lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      setError("InValid Credentials");
    }
  };

  return (
    <div
    className="min-h-screen w-full flex items-center justify-center bg-cover bg-no-repeat bg-center"
    style={{
      backgroundImage:
        "url('https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
    }}
  >
      <div className="card bg-base-200 w-full max-w-md shadow-xl p-6">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl mb-6">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          <div className="flex flex-col gap-5">
            {!isLogin && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>
              </>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Email ID</label>
              <input
                type="email"
                placeholder="Enter email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          <div className="card-actions justify-center mt-6">
            <button
              className="btn btn-primary w-full"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </div>

          <p className="text-sm text-center mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-blue-500 cursor-pointer font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
