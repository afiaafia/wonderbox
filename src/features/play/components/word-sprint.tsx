'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, RotateCcw, Timer, Trophy, X } from 'lucide-react';

import { GameResult } from './game-result';

const WORD_BANK = [
  'wonder',
  'build',
  'create',
  'learn',
  'focus',
  'design',
  'future',
  'system',
  'react',
  'nextjs',
  'prisma',
  'database',
  'browser',
  'logic',
  'memory',
  'coding',
  'project',
  'debug',
  'deploy',
  'explore',
  'playground',
  'interface',
  'component',
  'function',
  'challenge',
  'pixel',
  'motion',
  'schema',
  'server',
  'client',
];

const GAME_DURATION = 30;

function shuffleWords(words: string[]) {
  const shuffled = [...words];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }

  return shuffled;
}

function getStoredBest() {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem('wonderbox-word-sprint-best');

  if (!stored) {
    return null;
  }

  const value = Number(stored);

  return Number.isFinite(value) ? value : null;
}

export function WordSprint() {
  const [words, setWords] = useState(WORD_BANK);

  const [wordIndex, setWordIndex] = useState(0);

  const [input, setInput] = useState('');

  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);

  const [score, setScore] = useState(0);

  const [mistakes, setMistakes] = useState(0);

  const [bestScore, setBestScore] = useState<number | null>(getStoredBest);

  const [phase, setPhase] = useState<'idle' | 'playing' | 'finished'>('idle');

  const scoreRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentWord = useMemo(
    () => words[wordIndex] ?? WORD_BANK[0],
    [words, wordIndex]
  );

  useEffect(() => {
    if (phase !== 'playing') {
      return;
    }

    inputRef.current?.focus();

    const interval = window.setInterval(() => {
      setTimeLeft((currentTime) => {
        if (currentTime <= 1) {
          window.clearInterval(interval);

          const finalScore = scoreRef.current;

          setPhase('finished');

          setBestScore((currentBest) => {
            if (currentBest !== null && finalScore <= currentBest) {
              return currentBest;
            }

            window.localStorage.setItem(
              'wonderbox-word-sprint-best',
              String(finalScore)
            );

            return finalScore;
          });

          return 0;
        }

        return currentTime - 1;
      });
    }, 1000);

    return () => window.clearInterval(interval);
  }, [phase]);

  function startGame() {
    const nextWords = shuffleWords(WORD_BANK);

    setWords(nextWords);
    setWordIndex(0);
    setInput('');
    setTimeLeft(GAME_DURATION);
    setScore(0);
    setMistakes(0);

    scoreRef.current = 0;

    setPhase('playing');

    window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  function submitWord() {
    if (phase !== 'playing') {
      return;
    }

    const typed = input.trim().toLowerCase();

    if (!typed) {
      return;
    }

    if (typed === currentWord.toLowerCase()) {
      scoreRef.current += 1;

      setScore(scoreRef.current);
    } else {
      setMistakes((currentMistakes) => currentMistakes + 1);
    }

    setInput('');

    setWordIndex((currentIndex) => (currentIndex + 1) % words.length);
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
          <Timer className="size-4" aria-hidden="true" />
          {timeLeft}s
        </div>

        <div className="rounded-full border border-border px-4 py-2 text-sm">
          Score: <span className="font-semibold">{score}</span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
          <Trophy className="size-4" aria-hidden="true" />
          Best: <span className="font-semibold">{bestScore ?? '—'}</span>
        </div>

        <button
          type="button"
          onClick={startGame}
          className="ml-auto inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        >
          <RotateCcw className="size-4" aria-hidden="true" />

          {phase === 'playing' ? 'Restart' : 'Start'}
        </button>
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-background p-7 text-center sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Type this word
        </p>

        <div className="mt-5 min-h-20 text-4xl font-semibold tracking-tight sm:text-6xl">
          {phase === 'playing' ? currentWord : 'Ready?'}
        </div>

        <div className="mx-auto mt-8 max-w-2xl">
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={phase !== 'playing'}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                submitWord();
              }
            }}
            placeholder={
              phase === 'playing'
                ? 'Type the word and press Enter'
                : 'Start the game to begin'
            }
            className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-center text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground"
            autoComplete="off"
            spellCheck={false}
          />

          <button
            type="button"
            onClick={submitWord}
            disabled={phase !== 'playing'}
            className="mt-4 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Submit word
          </button>
        </div>

        <div className="mt-7 flex justify-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Check className="size-3.5" aria-hidden="true" />
            Correct: {score}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <X className="size-3.5" aria-hidden="true" />
            Mistakes: {mistakes}
          </span>
        </div>
      </div>

      {phase === 'idle' ? (
        <p className="mt-5 text-center text-sm text-muted-foreground">
          You have {GAME_DURATION} seconds. Accuracy matters, but speed matters
          too.
        </p>
      ) : null}

      {phase === 'finished' ? (
        <GameResult
          eyebrow="Sprint complete"
          title={`${score} correct words`}
          description={`${mistakes} mistakes in ${GAME_DURATION} seconds.`}
          primaryLabel="Sprint again"
          onPrimary={startGame}
          bestLabel="Best score"
          bestValue={bestScore}
        />
      ) : null}
    </section>
  );
}
