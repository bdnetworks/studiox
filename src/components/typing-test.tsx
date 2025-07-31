
'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Character from './character';
import { RefreshCw } from 'lucide-react';

export type Status = 'waiting' | 'running' | 'finished';

type TypingTestProps = {
  text: string;
  timerDuration: number;
  status: Status;
  setStatus: (status: Status) => void;
  resetTest: () => void;
};

export default function TypingTest({
  text,
  timerDuration,
  status,
  setStatus,
  resetTest,
}: TypingTestProps) {
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, errors: 0 });

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = useCallback(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  }, []);

  const calculateStats = useCallback(() => {
    const durationInMinutes = (timerDuration - timeLeft) / 60;
    if (durationInMinutes === 0) {
      setStats({ wpm: 0, accuracy: 0, errors: 0 });
      return;
    }

    const wordsTyped = userInput.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / durationInMinutes);

    let errorCount = 0;
    userInput.split('').forEach((char, index) => {
      if (index < text.length && char !== text[index]) {
        errorCount++;
      }
    });

    const accuracy = Math.round(
      ((userInput.length - errorCount) / userInput.length) * 100
    );
    setStats({ wpm, accuracy: accuracy > 0 ? accuracy : 0, errors: errorCount });
  }, [timerDuration, timeLeft, userInput, text]);

  useEffect(() => {
    setUserInput('');
    setTimeLeft(timerDuration);
    setStats({ wpm: 0, accuracy: 0, errors: 0 });
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    inputRef.current?.focus();
  }, [text, timerDuration]);
  
  useEffect(() => {
    if (status === 'running') {
      calculateStats();
    }
    if (status === 'running' && timeLeft === 0) {
      setStatus('finished');
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      calculateStats();
    }
  }, [timeLeft, status, calculateStats, setStatus]);

  const handleLocalReset = () => {
    resetTest();
    setUserInput('');
    setTimeLeft(timerDuration);
    setStats({ wpm: 0, accuracy: 0, errors: 0 });
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    inputRef.current?.focus();
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (status === 'finished') return;

    if (status === 'waiting' && value.length > 0) {
      setStatus('running');
      startTimer();
    }
    setUserInput(value);
    
    if (value.length === text.length) {
      setStatus('finished');
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
  };

  const characters = useMemo(() => {
    return text.split('').map((char, index) => {
      let state: 'pending' | 'correct' | 'incorrect' | 'current' = 'pending';
      if (index < userInput.length) {
        state = char === userInput[index] ? 'correct' : 'incorrect';
      }
      if (index === userInput.length) {
        state = 'current';
      }
      return { char, state };
    });
  }, [text, userInput]);

  const liveWpm = useMemo(() => {
      const durationInMinutes = (timerDuration - timeLeft) / 60;
      if (durationInMinutes === 0) return 0;
      const wordsTyped = userInput.trim().split(/\s+/).length;
      return Math.round(wordsTyped / durationInMinutes) || 0;
  }, [userInput, timeLeft, timerDuration])


  const liveAccuracy = useMemo(() => {
    if (userInput.length === 0) return 100;
    const errors = userInput.split('').reduce((acc, char, i) => {
      if (i < text.length && char !== text[i]) {
        return acc + 1;
      }
      return acc;
    }, 0);
    return Math.round(((userInput.length - errors) / userInput.length) * 100);
  }, [userInput, text]);


  return (
    <Card>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mb-6">
            <div className="rounded-lg bg-secondary p-3">
                <p className="text-2xl font-bold text-primary">{timeLeft}</p>
                <p className="text-xs text-muted-foreground">Time Left</p>
            </div>
            <div className="rounded-lg bg-secondary p-3">
                <p className="text-2xl font-bold text-primary">{status === 'running' ? liveWpm : stats.wpm}</p>
                <p className="text-xs text-muted-foreground">WPM</p>
            </div>
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-2xl font-bold text-primary">
                  {status === 'running' ? liveAccuracy : stats.accuracy}%
                </p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
            </div>
            <div className="rounded-lg bg-secondary p-3">
                <p className="text-2xl font-bold text-primary">{stats.errors}</p>
                <p className="text-xs text-muted-foreground">Errors</p>
            </div>
        </div>

        <div
          onClick={() => inputRef.current?.focus()}
          className="relative cursor-text text-justify leading-relaxed tracking-wider p-4 border rounded-md"
        >
          <textarea
            ref={inputRef}
            className="absolute inset-0 z-10 h-full w-full p-4 resize-none bg-transparent text-transparent caret-primary opacity-100"
            value={userInput}
            onChange={handleInputChange}
            onPaste={(e) => e.preventDefault()}
            disabled={status === 'finished'}
            spellCheck="false"
            autoCapitalize="none"
            autoCorrect="off"
          />
          <div className="relative z-0">
            <p>
              {characters.map((props, index) => (
                <Character key={index} {...props} />
              ))}
            </p>
          </div>
          {status === 'finished' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm rounded-md">
              <h2 className="text-3xl font-headline text-primary">Time's Up!</h2>
              <div className="mt-4 flex gap-6 text-center">
                  <div>
                      <p className="text-3xl font-bold">{stats.wpm}</p>
                      <p className="text-sm text-muted-foreground">WPM</p>
                  </div>
                  <div>
                      <p className="text-3xl font-bold">{stats.accuracy}%</p>
                      <p className="text-sm text-muted-foreground">Accuracy</p>
                  </div>
              </div>
              <Button onClick={handleLocalReset} className="mt-6">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
