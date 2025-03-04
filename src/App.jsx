import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedLayout from "./utils/ProtectedLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreatePoll from "./components/create-poll/CreatePoll";
import Profile from "./components/profile/Profile";
import { PollProvider } from "./context/PollContext";
import PollPage from "./components/poll-page/PollPage";

export const App = () => {
  return (
    <AuthProvider>
      <PollProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProtectedLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="/create" element={<CreatePoll />} />
            <Route path="/poll/:pollId" element={<PollPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </PollProvider>
    </AuthProvider>
  );
};
