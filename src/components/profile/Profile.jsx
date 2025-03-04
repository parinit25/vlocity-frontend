import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./Profile.module.scss";

const Profile = () => {
  const { user, getUserData } = useAuth();
  const [accessToken, setAccessToken] = useState(user?.accessToken);

  useEffect(() => {
    getUserData(accessToken);
  }, []);

  if (!user) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className={styles.container}>
      <h2>User Profile</h2>
      <div className={styles.profileInfo}>
        {/* <img src={user?.profilePicture} alt="Profile" className={styles.avatar} /> */}
        <p>
          <strong>Name:</strong> {user?.firstName + " " + user?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
      </div>

      <h3>Created Polls</h3>
      <ul>
        {user?.createdPolls?.length === 0 ? (
          <p>No polls created.</p>
        ) : (
          <p>{user?.createdPolls?.length}</p>
        )}
      </ul>

      <h3>Voted Polls</h3>
      <ul>
        {user?.votedPolls?.length === 0 ? (
          <p>No polls voted on.</p>
        ) : (
          <p>{user?.votedPolls?.length}</p>
        )}
      </ul>
    </div>
  );
};

export default Profile;
