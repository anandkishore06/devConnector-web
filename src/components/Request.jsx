import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Request = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) =>{
    try{
        const res = await axios.post(BASE_URL + "/request/review/" + status + "/"+ _id, {},{
            withCredentials: true
        })
        dispatch(removeRequest(_id));
    }
    catch(err){
        // 
    }
  }

  const fetchRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/received", {
      withCredentials: true,
    });
    console.log(res.data.data);
    dispatch(addRequest(res?.data?.data));
  };

  useEffect(() => {
    if (requests.length === 0) fetchRequests();
  }, []);
  return (
    // <div className="flex flex-col items-center my-10 gap-6">
    //   {/* Heading Centered */}
    //   <h1 className="font-bold text-3xl text-yellow-500 text-center">
    //     Connection Requests
    //   </h1>

    //   {/* Connections List Centered */}
    //   <div className="flex flex-col items-center gap-4 w-full max-w-xl">
    //     {requests.map((request, index) => {
    //       const { firstname, lastname, photoURL, age, gender, about } =
    //         request.fromUserId;
    //       return (
    //         <ul
    //           key={index}
    //           className="w-full bg-base-300 rounded-box shadow-md p-4 flex items-center gap-4"
    //         >
    //           <li className="flex items-center justify-between w-full">
    //             <div className="flex items-center gap-4">
    //               <img
    //                 className="size-10 rounded-box"
    //                 src={
    //                   photoURL ||
    //                   "https://img.daisyui.com/images/profile/demo/1@94.webp"
    //                 }
    //                 alt="photo"
    //               />
    //               <div>
    //                 <div className="font-semibold">
    //                   {firstname} {lastname}
    //                 </div>
    //                 <div className="text-xs uppercase font-semibold opacity-60">
    //                   {age + ",  " + gender}
    //                 </div>
    //                 {about && (
    //                   <p className="text-sm text-gray-300 mt-1">{about}</p>
    //                 )}
    //               </div>
    //             </div>

    //           </li>
    //         </ul>
    //       );
    //     })}
    //   </div>
    // </div>
    <div className="flex flex-col items-center my-10 gap-6">
      {/* Heading Centered */}
      <h1 className="font-bold text-3xl text-yellow-500 text-center">
        Connection Requests
      </h1>

      {/* Connections List Centered */}
      <div className="flex flex-col items-center gap-4 w-full max-w-xl">
        {requests.map((request, index) => {
          const { firstname, lastname, photoURL, age, gender, about } =
            request.fromUserId;
          return (
            <ul
              key={index}
              className="w-full bg-base-300 rounded-box shadow-md p-4 flex items-center gap-4"
            >
              <li className="flex items-center justify-between w-full">
                {/* Left Side: Profile Info */}
                <div className="flex items-center gap-4">
                  <img
                    className="size-10 rounded-box"
                    src={
                      photoURL ||
                      "https://img.daisyui.com/images/profile/demo/1@94.webp"
                    }
                    alt="photo"
                  />
                  <div>
                    <div className="font-semibold">
                      {firstname} {lastname}
                    </div>
                    <div className="text-xs uppercase font-semibold opacity-60">
                      {age + ", " + gender}
                    </div>
                    {about && (
                      <p className="text-sm text-gray-300 mt-1">{about}</p>
                    )}
                  </div>
                </div>

                {/* Right Side: Action Buttons */}
                <div className="flex gap-2">
                  <button className="btn btn-success btn-md" onClick={()=>reviewRequest("accepted", request._id)}>Accept</button>
                  <button className="btn btn-error  btn-md" onClick={()=>reviewRequest("rejected", request._id)}>Reject</button>
                </div>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Request;
