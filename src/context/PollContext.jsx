import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { io } from "socket.io-client";

const PollContext = createContext();

const socket = io(process.env.REACT_APP_BASE_URL, {
  withCredentials: true,
});

export const PollProvider = ({ children }) => {
  const { user } = useAuth();
  const [polls, setPolls] = useState([]);
  const [userPolls, setUserPolls] = useState([]);
  const [votedPolls, setVotedPolls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = `${process.env.REACT_APP_BASE_URL}/api/polls`;

  const fetchPolls = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(API_URL);
      setPolls(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchUserPolls = async () => {
    if (!user?.accessToken) return;
    try {
      const { data } = await axios.get(`${API_URL}/user/created`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setUserPolls(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchVotedPolls = async () => {
    if (!user?.accessToken) return;
    try {
      const { data } = await axios.get(`${API_URL}/user/voted`, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      setVotedPolls(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const createPoll = async (question, options) => {
    if (!user?.accessToken) return;
    try {
      const { data } = await axios.post(
        API_URL,
        { question, options },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      setPolls((prev) => [...prev, data.poll]);
      setUserPolls((prev) => [...prev, data.poll]);
      await fetchPolls();
    } catch (err) {
      setError(err.message);
    }
  };

  const votePoll = async (pollId, optionIndex) => {
    if (!user?.accessToken) return;
    try {
      const { data } = await axios.post(
        `${API_URL}/vote`,
        { pollId, optionIndex },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      setPolls((prev) =>
        prev.map((poll) => (poll._id === pollId ? data.poll : poll))
      );
      setVotedPolls((prev) => [...prev, data.poll]);
    } catch (err) {
      setError(err.message);
    }
  };

  const addComment = async (pollId, text) => {
    if (!user?.accessToken) return;
    try {
      const { data } = await axios.post(
        `${API_URL}/${pollId}/comment`,
        { text },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      setPolls((prev) =>
        prev.map((poll) => (poll._id === pollId ? data.poll : poll))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const replyToComment = async (pollId, commentId, text) => {
    if (!user?.accessToken) return;
    try {
      const { data } = await axios.post(
        `${API_URL}/${pollId}/comment/${commentId}/reply`,
        { text },
        { headers: { Authorization: `Bearer ${user?.accessToken}` } }
      );
      setPolls((prev) =>
        prev.map((poll) => (poll._id === pollId ? data.poll : poll))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    socket.on("pollUpdated", (data) => {
      console.log("Poll updated:", data);
      setPolls((prev) =>
        prev.map((poll) =>
          poll._id === data.pollId ? { ...poll, options: data.options } : poll
        )
      );
    });

    socket.on("commentAdded", (data) => {
      console.log("Comment added:", data);
      setPolls((prev) =>
        prev.map((poll) =>
          poll._id === data.pollId
            ? {
                ...poll,
                comments: [...poll.comments, data.comment],
              }
            : poll
        )
      );
    });

    return () => {
      socket.off("pollUpdated");
      socket.off("commentAdded");
    };
  }, []);

  useEffect(() => {
    fetchPolls();
    if (user?.accessToken) {
      fetchUserPolls();
      fetchVotedPolls();
    }
  }, [user?.accessToken]);

  return (
    <PollContext.Provider
      value={{
        polls,
        userPolls,
        votedPolls,
        loading,
        error,
        fetchPolls,
        createPoll,
        votePoll,
        addComment,
        replyToComment,
      }}
    >
      {children}
    </PollContext.Provider>
  );
};

export const usePoll = () => useContext(PollContext);
