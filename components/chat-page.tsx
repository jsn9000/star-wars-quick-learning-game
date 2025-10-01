"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

interface ChatPageProps {
  onStartGame: () => void;
}

export default function ChatPage({ onStartGame }: ChatPageProps) {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 font-orbitron tracking-wider mb-4">
            STAR WARS LEARNING ASSISTANT
          </h1>
          <p className="text-lg text-gray-600 font-exo">
            Ask me anything before you begin your journey!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white border-4 border-gray-300 rounded-lg shadow-2xl overflow-hidden">
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 font-exo">
                Start a conversation or click "Start Game" to begin learning!
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border-2 border-gray-300 text-gray-900"
                    }`}
                  >
                    <p className="text-sm font-exo">
                      {message.parts.map((part, i) => {
                        if (part.type === 'text') {
                          return <span key={i}>{part.text}</span>;
                        }
                        return null;
                      })}
                    </p>
                  </div>
                </div>
              ))
            )}
            {status === "streaming" && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-gray-300 text-gray-900 px-4 py-2 rounded-lg">
                  <p className="text-sm font-exo">Thinking...</p>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                sendMessage({ text: input });
                setInput("");
              }
            }}
            className="border-t-4 border-gray-300 p-4 bg-white"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 font-exo"
                disabled={status === "streaming"}
              />
              <button
                type="submit"
                disabled={status === "streaming" || !input.trim()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-orbitron font-bold tracking-wider transition-colors"
              >
                SEND
              </button>
            </div>
          </form>
        </div>

        {/* Start Game Button */}
        <div className="text-center mt-8">
          <button
            onClick={onStartGame}
            className="px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-orbitron font-bold text-xl tracking-widest shadow-lg"
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}
