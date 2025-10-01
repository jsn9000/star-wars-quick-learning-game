"use client";

import { useState } from "react";
import ChatPage from "@/components/chat-page";
import LearningDashboard from "@/components/learning-dashboard";

export default function Home() {
  const [showGame, setShowGame] = useState(false);

  if (!showGame) {
    return <ChatPage onStartGame={() => setShowGame(true)} />;
  }

  return <LearningDashboard />;
}
