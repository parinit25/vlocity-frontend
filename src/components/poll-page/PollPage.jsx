import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { usePoll } from "../../context/PollContext";
import styles from "./PollPage.module.scss";

const PollPage = () => {
  const { pollId } = useParams();
  const { polls, votePoll, fetchPolls, addComment, replyToComment } = usePoll();
  const [selectedOption, setSelectedOption] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  useEffect(() => {
    fetchPolls();
  }, []);

  const poll = polls.find((p) => p._id === pollId);

  if (!poll) return <p>Loading poll...</p>;

  const handleVote = () => {
    if (selectedOption !== null) {
      votePoll(pollId, selectedOption);
      setSelectedOption(null); // Reset selection after voting
    }
  };

  const handleCommentSubmit = () => {
    if (commentText.trim()) {
      addComment(pollId, commentText);
      setCommentText("");
    }
  };

  const handleReplySubmit = (commentId) => {
    if (replyText.trim()) {
      replyToComment(pollId, commentId, replyText);
      setReplyingTo(null);
      setReplyText("");
    }
  };

  return (
    <div className={styles.container}>
      <h2>{poll.question}</h2>
      <div className={styles.pollSection}>
        {poll?.options?.map((option, index) => (
          <label key={index} className={styles.option}>
            <input
              type="radio"
              name="poll"
              value={index}
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
            />
            {option.text}
          </label>
        ))}
        <button
          className={styles.voteButton}
          onClick={handleVote}
          disabled={selectedOption === null}
        >
          Submit Vote
        </button>
      </div>

      <div className={styles.resultsSection}>
        <h3>Results:</h3>
        {poll?.options?.map((option, index) => (
          <div key={index} className={styles.result}>
            <span>{option.text}</span>
            <span className={styles.votes}>{option.votes} votes</span>
          </div>
        ))}
      </div>

      <div className={styles.commentsSection}>
        <h3>Comments</h3>

        <div className={styles.commentInput}>
          <textarea
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>

        <div className={styles.commentsList}>
          {poll.comments.map((comment) => (
            <div key={comment._id} className={styles.comment}>
              <p>
                <strong>
                  {comment?.firstName} {comment?.lastName}:
                </strong>{" "}
                {comment.text}
              </p>
              <button onClick={() => setReplyingTo(comment._id)}>Reply</button>

              {replyingTo === comment._id && (
                <div className={styles.replySection}>
                  <textarea
                    placeholder="Write a reply..."
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                  />
                  <button onClick={() => handleReplySubmit(comment._id)}>
                    Submit Reply
                  </button>
                </div>
              )}

              {comment?.replies?.length > 0 && (
                <div className={styles.replies}>
                  {comment.replies.map((reply) => (
                    <p key={reply._id}>
                      <strong>
                        {reply?.firstName} {reply?.lastName}:
                      </strong>{" "}
                      {reply?.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollPage;
