"use client";

import { useState, useEffect } from "react";
import { Subject, Fact, MultipleChoiceQuestion } from "@/lib/facts-data";

// Fisher-Yates shuffle algorithm to randomize array order
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a dynamic quiz question based on presented facts
const generateQuizFromFacts = (facts: Fact[]): MultipleChoiceQuestion => {
  // Pick a random fact to base the question on
  const questionFact = facts[Math.floor(Math.random() * facts.length)];

  // Extract a key element from the fact text for the question
  const factText = questionFact.text;
  const keywords = questionFact.keywords;

  // Generate question based on a primary keyword (use the first one for consistency)
  const targetKeyword = keywords[0];

  // Create a clear question asking which fact they saw
  const question = `Which fact did you learn about ${targetKeyword}?`;
  const correctAnswer = factText;

  // Generate wrong answers from other facts
  const otherFacts = facts.filter(f => f.id !== questionFact.id);
  const wrongAnswers = shuffleArray(otherFacts).slice(0, 3).map(f => f.text);

  // Shuffle all options
  const allOptions = shuffleArray([correctAnswer, ...wrongAnswers]);
  const correctIndex = allOptions.indexOf(correctAnswer);

  console.log('Quiz generated:', {
    question,
    targetKeyword,
    correctAnswerText: correctAnswer.substring(0, 50) + '...',
    correctIndex,
    totalOptions: allOptions.length
  });

  return {
    question,
    options: allOptions,
    correctAnswer: correctIndex
  };
};

interface SubjectCircleProps {
  subject: Subject;
  onComplete: (subjectId: string) => void;
  isCompleted: boolean;
}

export default function SubjectCircle({ subject, onComplete, isCompleted }: SubjectCircleProps) {
  const [shuffledFacts, setShuffledFacts] = useState<Fact[]>([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0); // Start with fact 1 (index 0)
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [showingQuestion, setShowingQuestion] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [quizQuestion, setQuizQuestion] = useState<MultipleChoiceQuestion | null>(null);

  useEffect(() => {
    setMounted(true);
    // Select 4 random facts when component mounts
    const randomFacts = shuffleArray(subject.facts).slice(0, 4);
    setShuffledFacts(randomFacts);
  }, [subject.facts]);

  const playSound = () => {
    try {
      // Create a synthetic swoosh sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Create a swoosh-like sound effect
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.type = 'sawtooth';
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.log('Sound generation failed:', error);
    }
  };

  const handleClick = () => {
    if (isCompleted || gameEnded) return;

    // Play swoosh sound on every click
    playSound();

    if (!isStarted) {
      // First click - start the learning session and show first fact
      // Select 4 random facts for this new game session
      const randomFacts = shuffleArray(subject.facts).slice(0, 4);
      setShuffledFacts(randomFacts);
      // Generate quiz question based on the selected facts
      const quiz = generateQuizFromFacts(randomFacts);
      setQuizQuestion(quiz);
      setCurrentFactIndex(0);
      setIsStarted(true);
      setTimeRemaining(90); // 90 seconds timer (1 minute 30 seconds)
      setIsFlipped(true);
      return;
    }

    // Don't allow circle clicks while showing question (auto-completes after answer)

    if (isFlipped && !showingQuestion) {
      // Currently showing a fact - flip back to front
      setIsFlipped(false);

      // If this was the last fact, automatically show question after flipping back
      if (currentFactIndex === shuffledFacts.length - 1 && !questionAnswered) {
        setTimeout(() => {
          setShowingQuestion(true);
        }, 500); // Small delay to let flip animation complete
      }
      return;
    }

    if (!isFlipped && !showingQuestion) {
      // Currently showing front - advance to next fact
      if (currentFactIndex < shuffledFacts.length - 1) {
        // Move to next fact
        setCurrentFactIndex(currentFactIndex + 1);
        setIsFlipped(true);
      }
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (questionAnswered) return; // Prevent multiple selections

    setSelectedAnswer(answerIndex);
    setQuestionAnswered(true);

    console.log('Answer selected:', { answerIndex, correctAnswer: quizQuestion?.correctAnswer, quizQuestion });

    // TESTING: Always mark as correct
    const isCorrect = true; // quizQuestion && answerIndex === quizQuestion.correctAnswer;

    if (isCorrect) {
      // Auto-hide quiz after 4 seconds for correct answer
      setTimeout(() => {
        setShowingQuestion(false);
        setIsFlipped(false);
        onComplete(subject.id);
      }, 4000);
    } else {
      // Wrong answer - reset the game after 2 seconds
      setTimeout(() => {
        setGameEnded(true);
        setTimeRemaining(0);

        setTimeout(() => {
          setGameEnded(false);
          setSelectedAnswer(null);
          setQuestionAnswered(false);
          setShowingQuestion(false);
          setIsFlipped(false);
          setIsStarted(false);
          setCurrentFactIndex(0);
          setQuizQuestion(null);
        }, 2000);
      }, 2000);
    }
  };

  // Timer effect
  useEffect(() => {
    if (isStarted && timeRemaining > 0 && !isCompleted && !gameEnded) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isStarted, timeRemaining, isCompleted, gameEnded]);

  // Format timer display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Always render the same structure to avoid hydration mismatch

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Timer Display */}
      {mounted && isStarted && !isCompleted && (
        <div className="text-lg font-orbitron text-gray-900 font-bold tracking-wider" suppressHydrationWarning>
          {formatTime(timeRemaining)}
        </div>
      )}

      {/* Multiple Choice Question Above Circle */}
      {mounted && showingQuestion && quizQuestion && (
        <div className="w-64 bg-white bg-opacity-95 rounded-lg p-4 shadow-xl border-2 border-blue-300">
          <div className="text-sm font-bold text-gray-900 mb-3 font-orbitron text-center">
            {quizQuestion.question}
          </div>
          <div className="space-y-2">
            {quizQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={questionAnswered}
                className={`w-full text-xs py-2 px-3 rounded border font-exo transition-colors text-left ${
                  questionAnswered
                    ? index === quizQuestion.correctAnswer
                      ? 'bg-green-500 text-white border-green-500'
                      : index === selectedAnswer
                      ? 'bg-red-500 text-white border-red-500'
                      : 'bg-gray-100 text-gray-600 border-gray-300'
                    : 'bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {questionAnswered && (
            <div className="mt-3 text-center font-orbitron font-bold">
              {selectedAnswer === quizQuestion.correctAnswer ? (
                <div className="text-green-600 text-sm">
                  Excellent, young Padawan!
                </div>
              ) : (
                <div className="text-red-600 text-sm">
                  Try again, young Jedi! The Force is not strong with this answer.
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Subject Circle */}
      <div
        className={`relative w-52 h-52 cursor-pointer transform transition-all duration-500 hover:scale-105 ${
          isCompleted ? 'opacity-75 cursor-not-allowed' : ''
        }`}
        onClick={handleClick}
      >
        {/* Circle Container with Flip Animation */}
        <div
          className={`w-full h-full rounded-full shadow-lg transform-gpu transition-transform duration-700 preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front Side - Subject Title and Icon */}
          <div
            className={`absolute inset-0 w-full h-full rounded-full ${subject.color} border-4 border-gray-300 flex flex-col items-center justify-center text-gray-800 font-semibold backface-hidden shadow-lg`}
          >
            {/* Icon based on subject */}
            {subject.id === 'galactic-science' && (
              <div className="mb-2">
                <img
                  src="/images/mando-helmet.png"
                  alt="Mandalorian Helmet"
                  className="w-16 h-16 object-contain"
                />
              </div>
            )}
            {subject.id === 'ai-facts' && (
              <div className="mb-2">
                <img
                  src="/images/rebel-symbol.png"
                  alt="Rebel Alliance Symbol"
                  className="w-16 h-16 object-contain"
                />
              </div>
            )}
            {subject.id === 'earth-history' && (
              <div className="mb-2">
                <img
                  src="/images/xwing-symbol.png"
                  alt="X-Wing Symbol"
                  className="w-32 h-32 object-contain"
                />
              </div>
            )}
            <div className="text-sm text-center font-medium font-orbitron tracking-wide">{subject.title}</div>
            {isCompleted && (
              <div className="absolute top-2 right-2 text-2xl">✅</div>
            )}
          </div>

          {/* Back Side - Current Fact */}
          <div
            className="absolute inset-0 w-full h-full rounded-full bg-white border-4 border-gray-300 flex items-center justify-center p-4 text-center backface-hidden rotate-y-180"
          >
            <div className="text-sm text-gray-800 leading-relaxed font-exo">
              {shuffledFacts[currentFactIndex]?.text}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="flex space-x-1" suppressHydrationWarning>
        {shuffledFacts.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              mounted && index <= currentFactIndex && isStarted ? 'bg-green-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Status Text */}
      <div className="text-sm text-center font-rajdhani font-medium tracking-wide" suppressHydrationWarning>
        {mounted ? (
          gameEnded ? <span className="text-red-600 font-bold">GAME ENDED - CLICK TO TRY AGAIN</span> :
          !isStarted ? <span className="text-gray-800 font-bold">CLICK TO START LEARNING</span> :
          isCompleted ? <span className="text-gray-600">COMPLETED!</span> :
          showingQuestion && questionAnswered ? <span className="text-green-600 font-bold">WELL DONE! MOVING ON...</span> :
          showingQuestion ? <span className="text-blue-600 font-bold">ANSWER THE QUESTION ABOVE</span> :
          isFlipped ? <span className="text-green-600 font-bold">CLICK TO CONTINUE</span> :
          <span className="text-gray-600">{`FACT ${currentFactIndex + 1} OF ${shuffledFacts.length} - CLICK TO FLIP`}</span>
        ) : (
          <span className="text-gray-800 font-bold">CLICK TO START LEARNING</span>
        )}
      </div>
    </div>
  );
}