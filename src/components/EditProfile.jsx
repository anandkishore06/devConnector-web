import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const EditProfile = ({ user }) => {
  console.log(user?.firstname);

  const [firstname, setFirstname] = useState(user?.firstname);
  const [lastname, setLastname] = useState(user?.lastname);
  const [age, setAge] = useState(user?.age);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [photoURL, setPhotoURL] = useState(user?.photoURL);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);

  const dispatch = useDispatch();

  const handleEditProfile = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/profile/edit",
        {
          firstname,
          lastname,
          about,
          age,
          gender,
          photoURL,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      setToast(true);
      setTimeout(() => {
        setToast(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="flex justify-center my-12">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-200 w-96 shadow-xl card-lg">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div className="py-4">
                <div className="py-1">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text py-1">Firstname : </span>
                    </div>
                    <input
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div className="py-1">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text py-1">Lastname : </span>
                    </div>
                    <input
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div className="py-1">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text py-1">Age : </span>
                    </div>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div className="py-1">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text py-1">Gender : </span>
                    </div>
                    <input
                      type="text"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div className="py-1">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text py-1">About : </span>
                    </div>
                    <input
                      type="text"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div className="py-1">
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text py-1">Photo URL : </span>
                    </div>
                    <input
                      type="text"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
              </div>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={handleEditProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstname, lastname, age, gender, about, photoURL }}
        />
      </div>
      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile Save successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
