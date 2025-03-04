import React, { useEffect } from "react";
import { useNavigate } from "react-router"; // Correct import
import { usePoll } from "../../context/PollContext";
import styles from "./Home.module.scss";

const Home = () => {
  const { polls, fetchPolls } = usePoll();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.pollList}>
        {polls.length === 0 ? (
          <p>No polls available.</p>
        ) : (
          polls.map((poll) => (
            <div key={poll._id} className={styles.pollCard}>
              <h3>{poll.question}</h3>
              <p>Created by: {poll?.createdBy?.firstName}</p>
              <button onClick={() => navigate(`/poll/${poll._id}`)}>
                View Poll
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Home;
