'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Book, BrainCircuit, Languages, Loader2, RefreshCw } from 'lucide-react';
import { content, timerOptions } from '@/lib/content';
import { useToast } from '@/hooks/use-toast';
import { adjustTextDifficulty } from '@/ai/flows/adjust-text-difficulty';
import Character from './character';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Language = 'bengali' | 'english';
type Status = 'waiting' | 'running' | 'finished';

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('bengali');
  const [selectedContentIndex, setSelectedContentIndex] = useState(0);
  const [text, setText] = useState(content[language][selectedContentIndex].text);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<Status>('waiting');
  const [timerDuration, setTimerDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(timerDuration);
  const [stats, setStats] = useState({ wpm: 0, accuracy: 0, errors: 0 });
  const [isSimplifying, setIsSimplifying] = useState(false);

  const { toast } = useToast();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const contentList = content[language];

  useEffect(() => {
    resetTest();
    setText(content[language][0].text);
    setSelectedContentIndex(0);
  }, [language]);

  useEffect(() => {
    if (status === 'running' && timeLeft === 0) {
      setStatus('finished');
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      calculateStats();
    }
  }, [timeLeft, status]);

  const resetTest = useCallback(() => {
    setStatus('waiting');
    setUserInput('');
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setTimeLeft(timerDuration);
    setStats({ wpm: 0, accuracy: 0, errors: 0 });
    inputRef.current?.focus();
  }, [timerDuration]);

  useEffect(() => {
    resetTest();
  }, [timerDuration, text, resetTest]);

  const handleContentChange = (index: string) => {
    const newIndex = parseInt(index, 10);
    setSelectedContentIndex(newIndex);
    setText(content[language][newIndex].text);
    resetTest();
  };

  const startTimer = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };
  
  const calculateStats = () => {
    const durationInMinutes = (timerDuration - timeLeft) / 60;
    if (durationInMinutes === 0) {
      setStats({wpm: 0, accuracy: 0, errors: 0});
      return;
    };
    
    const wordsTyped = userInput.length / 5;
    const wpm = Math.round(wordsTyped / durationInMinutes);
    
    let errorCount = 0;
    userInput.split('').forEach((char, index) => {
      if (char !== text[index]) {
        errorCount++;
      }
    });

    const accuracy = Math.round(((userInput.length - errorCount) / userInput.length) * 100);
    setStats({ wpm, accuracy: accuracy > 0 ? accuracy: 0, errors: errorCount });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    if (status === 'finished') return;

    if (status === 'waiting') {
      setStatus('running');
      startTimer();
    }

    setUserInput(value);
    
    if (value.length === text.length) {
      setStatus('finished');
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      calculateStats();
    }
  };
  
  const handleSimplify = async () => {
    if (isSimplifying || status !== 'waiting') return;
    setIsSimplifying(true);
    try {
      const result = await adjustTextDifficulty({ text });
      setText(result.simplifiedText);
      resetTest();
      toast({
        title: 'লেখাটি সহজ করা হয়েছে',
        description: 'এখন সহজ ভাষায় অনুশীলন করতে পারেন।',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: 'লেখাটি সহজ করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
      });
    } finally {
      setIsSimplifying(false);
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
  
  const handleCardClick = () => {
    if(status !== 'finished') {
        inputRef.current?.focus();
    }
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="font-headline text-5xl md:text-6xl text-primary">Ôkkhor Sadhona</h1>
        <p className="text-muted-foreground mt-2 text-lg">আপনার টাইপিং দক্ষতা বৃদ্ধি করুন</p>
      </header>

      <main className="w-full max-w-5xl space-y-6">
        <Card>
          <CardContent className="p-4 flex flex-wrap items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <Languages className="h-5 w-5 text-primary" />
              <RadioGroup
                defaultValue={language}
                onValueChange={(val) => setLanguage(val as Language)}
                className="flex gap-2"
                disabled={status === 'running'}
              >
                <RadioGroupItem value="bengali" id="bengali" className="sr-only" />
                <Label
                  htmlFor="bengali"
                  className={cn(
                    'cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    language === 'bengali' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  )}
                >
                  বাংলা
                </Label>
                <RadioGroupItem value="english" id="english" className="sr-only" />
                <Label
                  htmlFor="english"
                  className={cn(
                    'cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    language === 'english' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  )}
                >
                  English
                </Label>
              </RadioGroup>
            </div>
            
            <div className="flex items-center gap-3">
              <Book className="h-5 w-5 text-primary" />
              <Select
                value={String(selectedContentIndex)}
                onValueChange={handleContentChange}
                disabled={status === 'running'}
              >
                <SelectTrigger className="w-[280px] font-body">
                  <SelectValue placeholder="গল্প বা কবিতা বাছাই করুন" />
                </SelectTrigger>
                <SelectContent>
                  {contentList.map((item, index) => (
                    <SelectItem key={index} value={String(index)}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             {language === 'bengali' && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={handleSimplify} disabled={isSimplifying || status !== 'waiting'} variant="outline" size="sm">
                      {isSimplifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
                      সহজ করুন
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>AI ব্যবহার করে লেখাকে সহজ করুন</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle className="font-headline text-2xl">Start Typing Here</CardTitle>
                <div className="flex items-center gap-4">
                  <RadioGroup
                    defaultValue={String(timerDuration)}
                    onValueChange={(val) => setTimerDuration(Number(val))}
                    className="flex items-center gap-2"
                    disabled={status === 'running'}
                  >
                    {timerOptions.map(opt => (
                        <div key={opt.value} className="flex items-center">
                            <RadioGroupItem value={String(opt.value)} id={`r${opt.value}`} />
                            <Label htmlFor={`r${opt.value}`} className="ml-2 cursor-pointer">{opt.label}</Label>
                        </div>
                    ))}
                  </RadioGroup>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            <div
              onClick={handleCardClick}
              className="relative cursor-text text-justify leading-relaxed tracking-wider p-4 border rounded-md mb-4"
            >
              <textarea
                 ref={inputRef}
                 className="absolute inset-0 z-10 h-full w-full cursor-text opacity-0"
                 value={userInput}
                 onChange={handleInputChange}
                 onPaste={(e) => e.preventDefault()}
                 disabled={status === 'finished'}
               />
              <div className="relative z-0">
                 <p>
                   {characters.map((props, index) => (
                     <Character key={index} {...props} />
                   ))}
                 </p>
              </div>
              {status === 'finished' && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-card/80 backdrop-blur-sm">
                  <CardTitle className="text-3xl font-headline">Time's Up!</CardTitle>
                   <div className="mt-4 flex gap-4 text-center">
                      <div>
                          <p className="text-3xl font-bold text-primary">{stats.wpm}</p>
                          <p className="text-sm text-muted-foreground">WPM</p>
                      </div>
                      <div>
                          <p className="text-3xl font-bold text-primary">{stats.accuracy}%</p>
                          <p className="text-sm text-muted-foreground">Accuracy</p>
                      </div>
                  </div>
                  <Button onClick={resetTest} className="mt-6">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Try Again
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

         <Card>
            <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="rounded-lg bg-secondary p-4">
                    <p className="text-3xl font-bold text-primary">{timeLeft}</p>
                    <p className="text-sm text-muted-foreground">Time Left</p>
                </div>
                <div className="rounded-lg bg-secondary p-4">
                    <p className="text-3xl font-bold text-primary">{status === 'running' ? Math.round((userInput.length/5)/((timerDuration-timeLeft)/60) || 0) : stats.wpm}</p>
                    <p className="text-sm text-muted-foreground">WPM</p>
                </div>
                 <div className="rounded-lg bg-secondary p-4">
                    <p className="text-3xl font-bold text-primary">
                      {status === 'running' ? Math.round(((userInput.length - (userInput.split('').reduce((acc, char, i) => acc + (char !== text[i] ? 1 : 0), 0))) / userInput.length * 100) || 100) : stats.accuracy}%
                    </p>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
                <div className="rounded-lg bg-secondary p-4">
                    <Button onClick={resetTest} variant="ghost" className="h-full w-full">
                        <RefreshCw className="h-6 w-6 text-primary"/>
                        <span className="ml-2 font-headline">Reset</span>
                    </Button>
                </div>
            </CardContent>
        </Card>
      </main>
      <footer className="mt-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ôkkhor Sadhona. All rights reserved.</p>
      </footer>
    </div>
  );
}
