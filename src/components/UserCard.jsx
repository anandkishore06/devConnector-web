import React from "react";

const UserCard = ({ user }) => {
  // const {firstname, lastname, age, gender, photoURL, about} = user;

  return (
    <div>
      <div className="card-xl bg-base-300 w-96 shadow-lg rounded">
        <figure>
          <img src={user?.photoURL} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {user?.firstname + " " + user?.lastname}
          </h2>
          <p>{user?.age + ", "+ user?.gender}</p>
          <p>{user?.about}</p>
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
