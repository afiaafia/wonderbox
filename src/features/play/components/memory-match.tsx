'use client';

import { useEffect, useState } from 'react';

import { GameResult } from './game-result';

type MemoryCard = {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
};

const SYMBOLS = ['◆', '●', '▲', '■', '★', '✦'];

const INITIAL_CARDS: MemoryCard[] = SYMBOLS.flatMap((symbol, index) => [
  {
    id: index * 2,
    symbol,
    isFlipped: false,
    isMatched: false,
  },
  {
    id: index * 2 + 1,
    symbol,
    isFlipped: false,
    isMatched: false,
  },
]);

function shuffleCards(cards: MemoryCard[]) {
  const shuffled = [...cards];

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

  const stored = window.localStorage.getItem('wonderbox-memory-best');

  if (!stored) {
    return null;
  }

  const value = Number(stored);

  return Number.isFinite(value) ? value : null;
}

export function MemoryMatch() {
  const [cards, setCards] = useState(() => shuffleCards(INITIAL_CARDS));

  const [openCardId, setOpenCardId] = useState<number | null>(null);

  const [locked, setLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [bestScore, setBestScore] = useState<number | null>(getStoredBest);
  const [completed, setCompleted] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || completed) {
      return;
    }

    const timer = window.setInterval(() => {
      setSeconds((currentSeconds) => currentSeconds + 1);
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, [started, completed]);

  function resetGame() {
    setCards(shuffleCards(INITIAL_CARDS));
    setOpenCardId(null);
    setLocked(false);
    setMoves(0);
    setSeconds(0);
    setCompleted(false);
    setStarted(false);
  }

  function finishGame(finalMoves: number) {
    setCompleted(true);

    if (bestScore === null || finalMoves < bestScore) {
      window.localStorage.setItem('wonderbox-memory-best', String(finalMoves));

      setBestScore(finalMoves);
    }
  }

  function handleCardClick(cardId: number) {
    if (locked || completed) {
      return;
    }

    const clickedCard = cards.find((card) => card.id === cardId);

    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) {
      return;
    }

    if (!started) {
      setStarted(true);
    }

    if (openCardId === null) {
      setCards((currentCards) =>
        currentCards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                isFlipped: true,
              }
            : card
        )
      );

      setOpenCardId(cardId);
      return;
    }

    const firstCard = cards.find((card) => card.id === openCardId);

    if (!firstCard) {
      return;
    }

    const secondCard = clickedCard;
    const nextMoves = moves + 1;
    const matched = firstCard.symbol === secondCard.symbol;

    setMoves(nextMoves);

    setCards((currentCards) =>
      currentCards.map((card) => {
        if (card.id === firstCard.id || card.id === secondCard.id) {
          return {
            ...card,
            isFlipped: matched ? true : true,
            isMatched: matched ? true : card.isMatched,
          };
        }

        return card;
      })
    );

    setLocked(true);

    window.setTimeout(() => {
      if (matched) {
        const matchedPairs = cards.filter((card) => card.isMatched).length / 2;

        const totalPairs = SYMBOLS.length;

        if (matchedPairs + 1 === totalPairs) {
          finishGame(nextMoves);
        }
      }

      setCards((currentCards) =>
        currentCards.map((card) => {
          if (
            !matched &&
            (card.id === firstCard.id || card.id === secondCard.id)
          ) {
            return {
              ...card,
              isFlipped: false,
            };
          }

          return card;
        })
      );

      setOpenCardId(null);
      setLocked(false);
    }, 650);
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-border px-4 py-2 text-sm">
          Moves: <span className="font-semibold">{moves}</span>
        </div>

        <div className="rounded-full border border-border px-4 py-2 text-sm">
          Time: <span className="font-semibold">{seconds}s</span>
        </div>

        <div className="rounded-full border border-border px-4 py-2 text-sm">
          Best:{' '}
          <span className="font-semibold">
            {bestScore !== null ? `${bestScore} moves` : '—'}
          </span>
        </div>

        <button
          type="button"
          onClick={resetGame}
          className="ml-auto rounded-full border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Restart
        </button>
      </div>

      <div className="mx-auto mt-8 grid max-w-xl grid-cols-3 gap-3 sm:grid-cols-4">
        {cards.map((card) => {
          const visible = card.isFlipped || card.isMatched;

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card.id)}
              disabled={locked || card.isMatched || card.isFlipped}
              aria-label={visible ? `Card ${card.symbol}` : 'Hidden card'}
              className={[
                'aspect-square rounded-2xl border p-2 transition-all duration-200',
                visible
                  ? 'border-foreground/20 bg-foreground text-background'
                  : 'border-border bg-background hover:-translate-y-0.5 hover:bg-muted',
                card.isMatched ? 'scale-[0.98] opacity-80' : '',
              ].join(' ')}
            >
              <span className="flex h-full items-center justify-center text-2xl font-semibold sm:text-3xl">
                {visible ? card.symbol : '?'}
              </span>
            </button>
          );
        })}
      </div>

      {!started && !completed ? (
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Flip any card to begin.
        </p>
      ) : null}

      {completed ? (
        <GameResult
          eyebrow="Memory complete"
          title={`Finished in ${moves} moves`}
          description={`You cleared the board in ${seconds} seconds.`}
          primaryLabel="Play again"
          onPrimary={resetGame}
          bestLabel="Best score"
          bestValue={bestScore !== null ? `${bestScore} moves` : '—'}
        />
      ) : null}
    </section>
  );
}
