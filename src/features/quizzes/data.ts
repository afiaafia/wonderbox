import type { QuizDefinition } from './types';

export const quizzes: QuizDefinition[] = [
  {
    slug: 'your-thinking-style',
    type: 'personality',
    title: 'What’s Your Thinking Style?',
    eyebrow: 'Know Yourself',
    description:
      'A playful personality quiz about how you approach ideas, problems, people, and new experiences.',
    questions: [
      {
        id: 'q1',
        prompt: 'You get a completely free afternoon. What sounds best?',
        options: [
          {
            id: 'a',
            label: 'Explore somewhere I have never been.',
            resultKey: 'explorer',
          },
          {
            id: 'b',
            label: 'Solve something interesting just for fun.',
            resultKey: 'strategist',
          },
          {
            id: 'c',
            label: 'Build, create, or experiment with something.',
            resultKey: 'maker',
          },
          {
            id: 'd',
            label: 'Spend it with people I enjoy.',
            resultKey: 'connector',
          },
        ],
      },
      {
        id: 'q2',
        prompt: 'A difficult problem appears. What do you do first?',
        options: [
          {
            id: 'a',
            label: 'Look for a new angle nobody has tried.',
            resultKey: 'explorer',
          },
          {
            id: 'b',
            label: 'Break it into smaller logical pieces.',
            resultKey: 'strategist',
          },
          {
            id: 'c',
            label: 'Start testing possible solutions.',
            resultKey: 'maker',
          },
          {
            id: 'd',
            label: 'Ask others how they would approach it.',
            resultKey: 'connector',
          },
        ],
      },
      {
        id: 'q3',
        prompt: 'Which compliment feels most like you?',
        options: [
          {
            id: 'a',
            label: 'You always bring fresh ideas.',
            resultKey: 'explorer',
          },
          {
            id: 'b',
            label: 'You think things through carefully.',
            resultKey: 'strategist',
          },
          {
            id: 'c',
            label: 'You actually make things happen.',
            resultKey: 'maker',
          },
          {
            id: 'd',
            label: 'You understand people really well.',
            resultKey: 'connector',
          },
        ],
      },
      {
        id: 'q4',
        prompt: 'When learning something new, you prefer to…',
        options: [
          {
            id: 'a',
            label: 'Follow curiosity wherever it leads.',
            resultKey: 'explorer',
          },
          {
            id: 'b',
            label: 'Understand the system behind it.',
            resultKey: 'strategist',
          },
          {
            id: 'c',
            label: 'Learn by doing it yourself.',
            resultKey: 'maker',
          },
          {
            id: 'd',
            label: 'Talk about it with someone else.',
            resultKey: 'connector',
          },
        ],
      },
      {
        id: 'q5',
        prompt: 'Your team has to choose between two ideas.',
        options: [
          {
            id: 'a',
            label: 'Try a different third option.',
            resultKey: 'explorer',
          },
          {
            id: 'b',
            label: 'Compare the pros and cons.',
            resultKey: 'strategist',
          },
          {
            id: 'c',
            label: 'Prototype both and see what works.',
            resultKey: 'maker',
          },
          {
            id: 'd',
            label: 'Find the option everyone can get behind.',
            resultKey: 'connector',
          },
        ],
      },
      {
        id: 'q6',
        prompt: 'What usually pulls your attention first?',
        options: [
          {
            id: 'a',
            label: 'Something unfamiliar.',
            resultKey: 'explorer',
          },
          {
            id: 'b',
            label: 'Something that needs to be figured out.',
            resultKey: 'strategist',
          },
          {
            id: 'c',
            label: 'Something I could improve or create.',
            resultKey: 'maker',
          },
          {
            id: 'd',
            label: 'Something happening with people around me.',
            resultKey: 'connector',
          },
        ],
      },
    ],
    results: {
      explorer: {
        title: 'The Explorer',
        emoji: '✦',
        description:
          'You are naturally drawn toward discovery, novelty, and fresh perspectives. Curiosity is often your starting point.',
      },
      strategist: {
        title: 'The Strategist',
        emoji: '◆',
        description:
          'You tend to look for structure, patterns, and the logic underneath a problem before deciding what to do.',
      },
      maker: {
        title: 'The Maker',
        emoji: '◈',
        description:
          'You like turning ideas into something tangible. Experimentation and action often teach you more than theory alone.',
      },
      connector: {
        title: 'The Connector',
        emoji: '●',
        description:
          'You naturally notice people, perspectives, and relationships. Collaboration and conversation are powerful tools for you.',
      },
    },
  },

  {
    slug: 'quick-fire-trivia',
    type: 'trivia',
    title: 'Quick-Fire Trivia',
    eyebrow: 'Test Yourself',
    description:
      'Six quick questions across science, history, geography, technology, and everyday knowledge.',
    questions: [
      {
        id: 'q1',
        prompt: 'Which planet is known for its prominent ring system?',
        options: [
          { id: 'a', label: 'Mars' },
          { id: 'b', label: 'Saturn' },
          { id: 'c', label: 'Venus' },
          { id: 'd', label: 'Mercury' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q2',
        prompt: 'What does HTML stand for?',
        options: [
          { id: 'a', label: 'HyperText Markup Language' },
          { id: 'b', label: 'HighText Machine Language' },
          { id: 'c', label: 'Hyperlink Text Management Language' },
          { id: 'd', label: 'Home Tool Markup Language' },
        ],
        correctOptionId: 'a',
      },
      {
        id: 'q3',
        prompt: 'Which ocean is the largest on Earth?',
        options: [
          { id: 'a', label: 'Atlantic Ocean' },
          { id: 'b', label: 'Indian Ocean' },
          { id: 'c', label: 'Pacific Ocean' },
          { id: 'd', label: 'Arctic Ocean' },
        ],
        correctOptionId: 'c',
      },
      {
        id: 'q4',
        prompt: 'How many sides does a hexagon have?',
        options: [
          { id: 'a', label: 'Five' },
          { id: 'b', label: 'Six' },
          { id: 'c', label: 'Seven' },
          { id: 'd', label: 'Eight' },
        ],
        correctOptionId: 'b',
      },
      {
        id: 'q5',
        prompt: 'Which language is primarily used to style web pages?',
        options: [
          { id: 'a', label: 'Python' },
          { id: 'b', label: 'SQL' },
          { id: 'c', label: 'CSS' },
          { id: 'd', label: 'C++' },
        ],
        correctOptionId: 'c',
      },
      {
        id: 'q6',
        prompt: "Which gas makes up the largest portion of Earth's atmosphere?",
        options: [
          { id: 'a', label: 'Oxygen' },
          { id: 'b', label: 'Carbon dioxide' },
          { id: 'c', label: 'Hydrogen' },
          { id: 'd', label: 'Nitrogen' },
        ],
        correctOptionId: 'd',
      },
    ],
  },
];

export function getQuizBySlug(slug: string) {
  return quizzes.find((quiz) => quiz.slug === slug);
}
