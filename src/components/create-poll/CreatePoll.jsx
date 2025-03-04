import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./CreatePoll.module.scss";
import { usePoll } from "../../context/PollContext";

const CreatePoll = () => {
  const { createPoll } = usePoll();
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (question.trim() === "" || options.some((opt) => opt.trim() === "")) {
      alert("Please fill out all fields.");
      return;
    }

    const pollData = { question, options };
    console.log(pollData, "pollData");
    createPoll( question, options );
  };

  return (
    <div className={styles.container}>
      <h2>Create a New Poll</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Question:</label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />

        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index} className={styles.option}>
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
            {options.length > 2 && (
              <button type="button" onClick={() => removeOption(index)}>
                ❌
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addOption} className={styles.addOption}>
          ➕ Add Option
        </button>

        <button type="submit" className={styles.submitButton}>
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
