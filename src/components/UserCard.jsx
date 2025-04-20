import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUserFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const _id = user?._id;

  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFeed(userId));
    } catch (err) {
      //
    }
  };

  return (
    // <div>
    //   {/* <div className="card-xl bg-base-300 w-96 shadow-lg rounded">
    //     <figure>
    //       <img src={user?.photoURL} alt="photo" />
    //     </figure>
    //     <div className="card-body">
    //       <h2 className="card-title">
    //         {user?.firstname + " " + user?.lastname}
    //       </h2>
    //       <p>{user?.age + ", " + user?.gender}</p>
    //       <p>{user?.about}</p>
    //       <div className="card-actions justify-center my-4">
    //         <button
    //           className="btn btn-primary"
    //           onClick={() => handleSendRequest("ignored", _id)}
    //         >
    //           Ignore
    //         </button>
    //         <button
    //           className="btn btn-secondary"
    //           onClick={() => handleSendRequest("interested", _id)}
    //         >
    //           Interested
    //         </button>
    //       </div>
    //     </div>
    //   </div> */}
      
    // </div>
    <div>
      <div className="card-xl bg-base-300 w-96 shadow-lg rounded">
        <figure>
          <img
            src={
              user?.photoURL ||
              "https://img.daisyui.com/images/profile/demo/1@94.webp"
            }
            alt="photo"
            className="w-full h-64 object-cover"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {user?.firstname || "First"} {user?.lastname || "Last"}
          </h2>

          {/* Only show age/gender if they exist */}
          {(user?.age || user?.gender) && (
            <p className="text-sm text-gray-400">
              {user?.age ? `${user.age}` : ""}{" "}
              {user?.age && user?.gender ? ", " : ""}
              {user?.gender || ""}
            </p>
          )}

          {/* Show about if available */}
          {user?.about && (
            <p className="text-sm mt-2 text-gray-300">{user.about}</p>
          )}

          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-primary"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
