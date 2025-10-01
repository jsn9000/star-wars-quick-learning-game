export interface MultipleChoiceQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct answer in options array
}

export interface Fact {
  id: number;
  text: string;
  keywords: string[]; // Keywords for dynamic quiz generation
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
    color: 'bg-white',
    icon: '⚡',
    facts: [
      {
        id: 1,
        text: "A day on Venus is longer than its year. Venus takes 243 Earth days to rotate once but only 225 Earth days to orbit the Sun.",
        keywords: ["Venus", "rotation", "orbit", "year"]
      },
      {
        id: 2,
        text: "If you could drive a car straight up, you'd reach space in about an hour going highway speeds (60 mph).",
        keywords: ["space", "distance", "atmosphere", "hour"]
      },
      {
        id: 3,
        text: "Neutron stars are so dense that a teaspoon of neutron star material would weigh about 6 billion tons on Earth.",
        keywords: ["neutron star", "density", "mass", "tons"]
      },
      {
        id: 4,
        text: "Black holes can bend light and time due to their extreme gravitational pull, making time pass slower near them.",
        keywords: ["black hole", "gravity", "time", "light"]
      },
      {
        id: 5,
        text: "The Sun converts about 4 million tons of matter into pure energy every second through nuclear fusion.",
        keywords: ["Sun", "fusion", "energy", "matter"]
      },
      {
        id: 6,
        text: "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth, traveling at 186,282 miles per second.",
        keywords: ["light", "Sun", "speed", "travel time"]
      },
      {
        id: 7,
        text: "Jupiter's Great Red Spot is a storm that has been raging for at least 400 years and is larger than Earth.",
        keywords: ["Jupiter", "storm", "Great Red Spot", "size"]
      },
      {
        id: 8,
        text: "Saturn is the only planet in our solar system that is less dense than water - it would float in a giant bathtub.",
        keywords: ["Saturn", "density", "water", "float"]
      },
      {
        id: 9,
        text: "There are more stars in the universe than grains of sand on all of Earth's beaches - over 100 billion trillion stars.",
        keywords: ["stars", "universe", "quantity", "billions"]
      },
      {
        id: 10,
        text: "One year on Neptune equals 165 Earth years, meaning a single season lasts more than 40 Earth years.",
        keywords: ["Neptune", "year", "orbit", "season"]
      }
    ]
  },
  {
    id: 'ai-facts',
    title: 'AI Facts',
    color: 'bg-white',
    icon: '🛸',
    facts: [
      {
        id: 1,
        text: "The first AI program was written in 1951 by Christopher Strachey. It played checkers and could beat most human players.",
        keywords: ["first AI", "1951", "checkers", "Christopher Strachey"]
      },
      {
        id: 2,
        text: "Deep Blue, the chess computer that beat Garry Kasparov in 1997, could evaluate 200 million positions per second.",
        keywords: ["Deep Blue", "chess", "Kasparov", "1997"]
      },
      {
        id: 3,
        text: "GPT-3 has 175 billion parameters, which is roughly equivalent to the number of synapses in the cerebellum of the human brain.",
        keywords: ["GPT-3", "parameters", "brain", "synapses"]
      },
      {
        id: 4,
        text: "Machine learning algorithms can now detect diseases from medical scans with accuracy matching or exceeding human doctors.",
        keywords: ["machine learning", "medical", "diagnosis", "accuracy"]
      },
      {
        id: 5,
        text: "The Turing Test, proposed by Alan Turing in 1950, determines if a machine can exhibit intelligent behavior indistinguishable from a human.",
        keywords: ["Turing Test", "Alan Turing", "1950", "intelligence"]
      },
      {
        id: 6,
        text: "AlphaGo defeated the world champion Lee Sedol at Go in 2016, a game considered more complex than chess with 10^170 possible positions.",
        keywords: ["AlphaGo", "Go", "Lee Sedol", "2016"]
      },
      {
        id: 7,
        text: "Modern AI language models are trained on hundreds of billions of words from books, websites, and other text sources.",
        keywords: ["language models", "training", "data", "text"]
      },
      {
        id: 8,
        text: "Neural networks are inspired by the human brain, using interconnected nodes that strengthen connections through learning.",
        keywords: ["neural networks", "brain", "learning", "connections"]
      },
      {
        id: 9,
        text: "AI can generate realistic images from text descriptions, creating artwork that has never existed before.",
        keywords: ["image generation", "text-to-image", "artwork", "AI art"]
      },
      {
        id: 10,
        text: "Self-driving cars use AI to process data from cameras, radar, and lidar sensors to navigate roads safely.",
        keywords: ["self-driving", "sensors", "autonomous", "navigation"]
      }
    ]
  },
  {
    id: 'earth-history',
    title: 'Earth History',
    color: 'bg-white',
    icon: '🪐',
    facts: [
      {
        id: 1,
        text: "Oxford University is older than the Aztec Empire. Oxford was founded around 1096, while Tenochtitlan was founded in 1325.",
        keywords: ["Oxford", "Aztec", "1096", "1325"]
      },
      {
        id: 2,
        text: "Cleopatra lived closer in time to the Moon landing (1969) than to the construction of the Great Pyramid of Giza (2580 BC).",
        keywords: ["Cleopatra", "Moon landing", "Great Pyramid", "timeline"]
      },
      {
        id: 3,
        text: "The last woolly mammoth died just 4,000 years ago on Wrangel Island, about 1,000 years after the Great Pyramid was built.",
        keywords: ["mammoth", "Wrangel Island", "4000 years", "extinction"]
      },
      {
        id: 4,
        text: "The Earth's atmosphere was once completely toxic to life, with no oxygen until cyanobacteria created it as waste 2.4 billion years ago.",
        keywords: ["oxygen", "cyanobacteria", "atmosphere", "2.4 billion"]
      },
      {
        id: 5,
        text: "The Roman Empire and the Han Dynasty in China existed at the same time but never knew about each other's existence.",
        keywords: ["Roman Empire", "Han Dynasty", "China", "concurrent"]
      },
      {
        id: 6,
        text: "Dinosaurs ruled Earth for 165 million years, while humans have only existed for about 300,000 years.",
        keywords: ["dinosaurs", "165 million", "humans", "300,000 years"]
      },
      {
        id: 7,
        text: "The printing press was invented in 1440 by Johannes Gutenberg, revolutionizing the spread of information.",
        keywords: ["printing press", "Gutenberg", "1440", "information"]
      },
      {
        id: 8,
        text: "Antarctica was once a warm, tropical paradise with forests and dinosaurs before drifting to the South Pole.",
        keywords: ["Antarctica", "tropical", "dinosaurs", "continental drift"]
      },
      {
        id: 9,
        text: "The Great Wall of China took over 2,000 years to build and stretches over 13,000 miles including all its branches.",
        keywords: ["Great Wall", "China", "2000 years", "13000 miles"]
      },
      {
        id: 10,
        text: "The youngest person to climb Mount Everest was 13 years old, while the oldest was 80 years old.",
        keywords: ["Mount Everest", "youngest", "oldest", "climbing"]
      }
    ]
  }
];

export const getSubjectById = (id: string): Subject | undefined => {
  return SUBJECTS.find(subject => subject.id === id);
};