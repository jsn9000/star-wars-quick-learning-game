"use client";

import { useState, useEffect, useRef } from "react";
import { SUBJECTS } from "@/lib/facts-data";
import SubjectCircle from "./subject-circle";
import RulesDropdown from "./rules-dropdown";
import RainAnimation from "./rain-animation";
import LightningAnimation from "./lightning-animation";
import VictoryScreen from "./victory-screen";

interface CompletionRewardProps {
  onClose: () => void;
}

function CompletionReward({ onClose }: CompletionRewardProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 z-50 flex items-center justify-center">
        <div className="w-[400px] h-[300px]" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 z-50 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-green-600 mb-4">🎉 Congratulations! 🎉</h1>
        <p className="text-xl text-gray-700">You've completed all subjects!</p>
        <p className="text-lg text-gray-600 mt-2">Here's your R2-D2 reward!</p>
      </div>

      <video
        width="400"
        height="300"
        autoPlay
        playsInline
        onEnded={() => {
          setTimeout(onClose, 2000); // Auto close 2 seconds after video ends
        }}
        className="rounded-lg shadow-2xl"
      >
        <source src="/videos/r2d2-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button
        onClick={onClose}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Continue Learning
      </button>
    </div>
  );
}

export default function LearningDashboard() {
  const [completedSubjects, setCompletedSubjects] = useState<string[]>([]);
  const [globalTimer, setGlobalTimer] = useState(300); // 5 minutes total
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [playVideo, setPlayVideo] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [showRain, setShowRain] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [showVictoryScreen, setShowVictoryScreen] = useState(false);
  const [victoryPhase, setVictoryPhase] = useState<"waiting" | "dark" | "light">("waiting");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect to play video when playVideo state changes
  useEffect(() => {
    if (playVideo && videoRef.current && mounted) {
      console.log("Attempting to play video...");
      videoRef.current.currentTime = 0; // Reset to beginning
      videoRef.current.muted = false; // Unmute for actual playback
      videoRef.current.play().then(() => {
        console.log("Video started playing successfully");
      }).catch(error => {
        console.log("Video play failed:", error);
        // If unmuted fails, try muted
        videoRef.current!.muted = true;
        videoRef.current!.play().catch(e => console.log("Muted play also failed:", e));
      });
    }
  }, [playVideo, mounted]);

  const handleSubjectComplete = (subjectId: string) => {
    if (!completedSubjects.includes(subjectId)) {
      console.log("Subject completed:", subjectId);
      if (!isGameStarted) {
        setIsGameStarted(true);
      }

      const newCompleted = [...completedSubjects, subjectId];
      setCompletedSubjects(newCompleted);
      console.log("New completed subjects:", newCompleted);

      // Trigger rain animation after second subject completion
      if (newCompleted.length === 2) {
        setShowRain(true);
      }

      // Trigger lightning after third subject completion (all subjects)
      if (newCompleted.length === 3) {
        setShowLightning(true);
      }

      // Play video for each completed subject
      console.log("Setting playVideo to true");
      setPlayVideo(true);
    }
  };

  // Global timer effect
  useEffect(() => {
    if (isGameStarted && globalTimer > 0 && completedSubjects.length < SUBJECTS.length) {
      const timer = setTimeout(() => {
        setGlobalTimer(globalTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isGameStarted, globalTimer, completedSubjects.length]);

  const resetProgress = () => {
    setCompletedSubjects([]);
    setIsGameStarted(false);
    setGlobalTimer(300);
    setPlayVideo(false);
    setShowRain(false);
    setShowLightning(false);
    setShowVictoryScreen(false);
    setVictoryPhase("waiting");
    setResetKey(prev => prev + 1); // Force re-mount of all circles
  };

  const allCompleted = completedSubjects.length === SUBJECTS.length;

  // Play winning sound and trigger victory screen when all subjects are completed
  useEffect(() => {
    if (allCompleted && completedSubjects.length > 0 && !showVictoryScreen) {
      const audio = new Audio('/sounds/winner-game-sound-404167.mp3');
      audio.play().catch(error => {
        console.log('Could not play winning sound:', error);
      });

      // Show victory screen after a brief delay
      setTimeout(() => {
        setShowVictoryScreen(true);
      }, 500);
    }
  }, [allCompleted, completedSubjects.length, showVictoryScreen]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Rain Animation - stop when victory message appears */}
      {showRain && victoryPhase !== "light" && <RainAnimation />}

      {/* Lightning Animation - stop when screen goes dark */}
      {showLightning && victoryPhase !== "dark" && victoryPhase !== "light" && <LightningAnimation victoryMode={allCompleted} />}

      {/* Victory Screen */}
      {showVictoryScreen && <VictoryScreen onComplete={() => {}} onPhaseChange={setVictoryPhase} />}

      {/* Top Section */}
      <div className="relative z-10 p-8">
        {/* Rules Dropdown - Left Side */}
        <div className="absolute top-32 left-8">
          <RulesDropdown />
        </div>

        {/* R2-D2 Video Animation */}
        <div className="flex justify-center mt-0 mb-0">
          <div className="w-[600px] h-[450px]">
            <video
              ref={videoRef}
              width="600"
              height="450"
              autoPlay={false}
              muted
              playsInline
              className="w-full h-full"
              onEnded={() => setPlayVideo(false)}
              suppressHydrationWarning
            >
              <source src="/videos/r2d2-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Subject Circles */}
        <div className="flex justify-center items-center gap-16 max-w-4xl mx-auto mt-0" suppressHydrationWarning>
          {SUBJECTS.map((subject, index) => (
            <div key={subject.id} className="flex flex-col items-center">
              <SubjectCircle
                key={`${subject.id}-${resetKey}`}
                subject={subject}
                onComplete={handleSubjectComplete}
                isCompleted={completedSubjects.includes(subject.id)}
              />
            </div>
          ))}
        </div>

        {/* Game Status */}
        {mounted && isGameStarted && !allCompleted && (
          <div className="text-center mt-8" suppressHydrationWarning>
            <p className="text-lg text-gray-700 font-rajdhani font-medium tracking-wide">
              Progress: {completedSubjects.length} of {SUBJECTS.length} subjects completed
            </p>
          </div>
        )}

        {/* Completion Message */}
        {mounted && allCompleted && (
          <div className="text-center mt-8" suppressHydrationWarning>
            <h2 className="text-2xl font-bold text-green-600 mb-4 font-orbitron tracking-wider">
              ALL SUBJECTS COMPLETED!
            </h2>
            <p className="text-lg text-gray-700 mb-4 font-exo">
              Great job! You've learned amazing facts from all subjects.
            </p>
          </div>
        )}

        {/* Reset Button */}
        <div className="text-center mt-8">
          <button
            onClick={resetProgress}
            className="px-4 py-2 bg-gray-600 bg-opacity-70 text-white rounded-lg hover:bg-opacity-90 transition-all text-sm font-rajdhani font-semibold tracking-widest uppercase"
          >
            Reset Progress
          </button>
        </div>
      </div>
    </div>
  );
}