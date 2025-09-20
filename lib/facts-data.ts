export interface MultipleChoiceQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer in options array
}

export interface Fact {
  id: number;
  text: string;
  question?: MultipleChoiceQuestion;
}

export interface Subject {
  id: string;
  title: string;
  color: string;
  icon: string;
  facts: Fact[];
}

export const SUBJECTS: Subject[] = [
  {
    id: 'galactic-science',
    title: 'Galactic Science',
    color: 'bg-gray-100',
    icon: '⚡',
    facts: [
      {
        id: 1,
        text: "A day on Venus is longer than its year. Venus takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun."
      },
      {
        id: 2,
        text: "If you could drive a car straight up, you'd reach space in about an hour going highway speeds (60 mph)."
      },
      {
        id: 3,
        text: "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 6 billion tons on Earth."
      },
      {
        id: 4,
        text: "Black holes can bend light and time due to their extreme gravitational pull, making time pass slower near them.",
        question: {
          question: "What happens to time near a black hole?",
          options: ["Time moves faster", "Time moves slower", "Time stops completely", "Time moves backwards"],
          correctAnswer: 1
        }
      }
    ]
  },
  {
    id: 'ai-facts',
    title: 'AI Facts',
    color: 'bg-gray-100',
    icon: '🛸',
    facts: [
      {
        id: 1,
        text: "The first AI program was written in 1951 by Christopher Strachey. It played checkers and could beat most human players."
      },
      {
        id: 2,
        text: "Deep Blue, the chess computer that beat Garry Kasparov in 1997, could evaluate 200 million positions per second."
      },
      {
        id: 3,
        text: "GPT-3 has 175 billion parameters, which is roughly equivalent to the number of synapses in the cerebellum of the human brain."
      },
      {
        id: 4,
        text: "Machine learning algorithms can now detect diseases from medical scans with accuracy matching or exceeding human doctors.",
        question: {
          question: "What can modern AI do with medical scans?",
          options: ["Only identify basic shapes", "Detect diseases as well as doctors", "Replace all doctors", "Only work on X-rays"],
          correctAnswer: 1
        }
      }
    ]
  },
  {
    id: 'earth-history',
    title: 'Earth History',
    color: 'bg-gray-100',
    icon: '🪐',
    facts: [
      {
        id: 1,
        text: "Oxford University is older than the Aztec Empire. Oxford was founded around 1096, while Tenochtitlan was founded in 1325."
      },
      {
        id: 2,
        text: "Cleopatra lived closer in time to the Moon landing (1969) than to the construction of the Great Pyramid of Giza (2580 BC)."
      },
      {
        id: 3,
        text: "The last woolly mammoth died just 4,000 years ago on Wrangel Island, about 1,000 years after the Great Pyramid was built."
      },
      {
        id: 4,
        text: "The Earth's atmosphere was once completely toxic to life, with no oxygen until cyanobacteria created it as waste 2.4 billion years ago.",
        question: {
          question: "How did Earth get its oxygen atmosphere?",
          options: ["It always had oxygen", "From volcanoes", "Cyanobacteria produced it as waste", "From meteorites"],
          correctAnswer: 2
        }
      }
    ]
  }
];

export const getSubjectById = (id: string): Subject | undefined => {
  return SUBJECTS.find(subject => subject.id === id);
};