import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      //
    }
  };
  useEffect(() => {
    if (connections.length === 0) fetchConnections();
  }, []);

  if (connections.length === 0) return <h1>No Connection Found</h1>;

  return (
    // <div className="flex justify-center my-10">
    //     <div>
    //   <h1 className="text-bold text-2xl text-yellow-500">My Connections</h1>
    //   </div>
    //   <div>
    //     {connections.map((connection) => {
    //       const { firstname, lastname, photoURL, age, gender, about } =
    //         connection;
    //       return (
    //         <ul className="list bg-base-100 rounded-box shadow-md">
    //           <li className="list-row">
    //             <div>
    //               <img
    //                 className="size-10 rounded-box"
    //                 src="https://img.daisyui.com/images/profile/demo/1@94.webp"
    //               />
    //             </div>
    //             <div>
    //               <div>{firstname}</div>
    //               <div className="text-xs uppercase font-semibold opacity-60">
    //                 Remaining Reason
    //               </div>
    //             </div>
    //             <button className="btn btn-square btn-ghost">
    //               <svg
    //                 className="size-[1.2em]"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <g
    //                   strokeLinejoin="round"
    //                   strokeLinecap="round"
    //                   strokeWidth="2"
    //                   fill="none"
    //                   stroke="currentColor"
    //                 >
    //                   <path d="M6 3L20 12 6 21 6 3z"></path>
    //                 </g>
    //               </svg>
    //             </button>
    //             <button className="btn btn-square btn-ghost">
    //               <svg
    //                 className="size-[1.2em]"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 24 24"
    //               >
    //                 <g
    //                   strokeLinejoin="round"
    //                   strokeLinecap="round"
    //                   strokeWidth="2"
    //                   fill="none"
    //                   stroke="currentColor"
    //                 >
    //                   <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    //                 </g>
    //               </svg>
    //             </button>
    //           </li>
    //         </ul>
    //       );
    //     })}
    //   </div>
    // </div>

    
        <div className="flex flex-col items-center my-10 gap-6">
          {/* Heading Centered */}
          <h1 className="font-bold text-3xl text-yellow-500 text-center">
            My Connections
          </h1>
      
          {/* Connections List Centered */}
          <div className="flex flex-col items-center gap-4 w-full max-w-xl">
            {connections.map((connection, index) => {
              const { firstname, lastname, photoURL, age, gender, about } = connection;
              return (
                <ul
  key={index}
  className="w-full bg-base-300 rounded-box shadow-md p-4 flex items-center gap-4"
>
  <li className="flex items-center justify-between w-full">
    <div className="flex items-center gap-4">
      <img
        className="size-10 rounded-box"
        src={photoURL || "https://img.daisyui.com/images/profile/demo/1@94.webp"}
        alt="photo"
      />
      <div>
        <div className="font-semibold">{firstname} {lastname}</div>
        <div className="text-xs uppercase font-semibold opacity-60">
         {age+",  "+ gender}
        </div>
        {about && (
          <p className="text-sm text-gray-300 mt-1">
            {about}
          </p>
        )}
      </div>
    </div>
    <div className="flex gap-2">
      <button className="btn btn-square btn-ghost">
        <svg
          className="size-[1.2em]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
          </g>
        </svg>
      </button>
    </div>
  </li>
</ul>

              );
            })}
          </div>
        </div>
      );
      
};

export default Connections;
