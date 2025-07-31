'use client';

import { useState, useEffect, useCallback } from 'react';
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
import { cn } from '@/lib/utils';
import TypingTest, { Status } from './typing-test';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Language = 'bengali' | 'english';

export default function HomePage() {
  const [language, setLanguage] = useState<Language>('bengali');
  const [selectedContentIndex, setSelectedContentIndex] = useState(0);
  const [text, setText] = useState(content[language][selectedContentIndex].text);
  const [status, setStatus] = useState<Status>('waiting');
  const [timerDuration, setTimerDuration] = useState(60);
  const [isSimplifying, setIsSimplifying] = useState(false);

  const { toast } = useToast();
  
  const contentList = content[language];

  const resetTest = useCallback(() => {
    setStatus('waiting');
  }, []);

  useEffect(() => {
    resetTest();
    setText(content[language][0].text);
    setSelectedContentIndex(0);
  }, [language, resetTest]);
  
  const handleContentChange = (index: string) => {
    const newIndex = parseInt(index, 10);
    setSelectedContentIndex(newIndex);
    setText(content[language][newIndex].text);
    resetTest();
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

  const handleTimerDurationChange = (value: string) => {
    setTimerDuration(Number(value));
    resetTest();
  }

  return (
    <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      <header className="w-full max-w-5xl text-center mb-8">
        <h1 className="font-headline text-5xl md:text-6xl text-primary">Ôkkhor Sadhona</h1>
        <p className="text-muted-foreground mt-2 text-lg">আপনার টাইপিং দক্ষতা বৃদ্ধি করুন</p>
      </header>

      <main className="w-full max-w-5xl space-y-6">
        <Card>
          <CardContent className="p-4 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-3">
              <Languages className="h-5 w-5 text-primary" />
              <Label>ভাষা</Label>
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
                    language === 'bengali' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'
                  )}
                >
                  বাংলা
                </Label>
                <RadioGroupItem value="english" id="english" className="sr-only" />
                <Label
                  htmlFor="english"
                  className={cn(
                    'cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                    language === 'english' ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-accent'
                  )}
                >
                  English
                </Label>
              </RadioGroup>
            </div>
            
            <div className="flex items-center gap-3">
              <Book className="h-5 w-5 text-primary" />
              <Label>অনুচ্ছেদ</Label>
              <Select
                value={String(selectedContentIndex)}
                onValueChange={handleContentChange}
                disabled={status === 'running'}
              >
                <SelectTrigger className="w-[240px] font-body">
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

        <TypingTest 
          key={text + timerDuration}
          text={text}
          timerDuration={timerDuration}
          status={status}
          setStatus={setStatus}
          resetTest={resetTest}
        />

        <Card>
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-center gap-4">
               <div className="flex items-center gap-2">
                 <Label>সময়:</Label>
                  <RadioGroup
                    defaultValue={String(timerDuration)}
                    onValueChange={handleTimerDurationChange}
                    className="flex items-center gap-2"
                    disabled={status === 'running'}
                  >
                    {timerOptions.map(opt => (
                        <div key={opt.value} className="flex items-center">
                            <RadioGroupItem value={String(opt.value)} id={`r${opt.value}`} />
                            <Label htmlFor={`r${opt.value}`} className="ml-1.5 cursor-pointer font-normal">{opt.label}</Label>
                        </div>
                    ))}
                  </RadioGroup>
                </div>
                <Button onClick={resetTest} variant="outline" className="w-full sm:w-auto">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                </Button>
            </CardContent>
        </Card>
      </main>
      <footer className="mt-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Ôkkhor Sadhona. All rights reserved.</p>
      </footer>
    </div>
  );
}
