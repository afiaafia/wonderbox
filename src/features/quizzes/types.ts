export type PersonalityOption = {
  id: string;
  label: string;
  resultKey: string;
};

export type PersonalityQuestion = {
  id: string;
  prompt: string;
  options: PersonalityOption[];
};

export type TriviaOption = {
  id: string;
  label: string;
};

export type TriviaQuestion = {
  id: string;
  prompt: string;
  options: TriviaOption[];
  correctOptionId: string;
};

export type PersonalityResult = {
  title: string;
  description: string;
  emoji: string;
};

export type PersonalityQuizDefinition = {
  slug: string;
  type: 'personality';
  title: string;
  eyebrow: string;
  description: string;
  questions: PersonalityQuestion[];
  results: Record<string, PersonalityResult>;
};

export type TriviaQuizDefinition = {
  slug: string;
  type: 'trivia';
  title: string;
  eyebrow: string;
  description: string;
  questions: TriviaQuestion[];
};

export type QuizDefinition = PersonalityQuizDefinition | TriviaQuizDefinition;
