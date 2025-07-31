import React from 'react';
import { cn } from '@/lib/utils';

type CharacterProps = {
  character: string;
  state: 'pending' | 'correct' | 'incorrect' | 'current';
};

const Character = React.memo(({ character, state }: CharacterProps) => {
  return (
    <span
      className={cn('text-2xl md:text-3xl font-body transition-colors duration-100', {
        'text-muted-foreground/70': state === 'pending',
        'text-foreground': state === 'correct',
        'text-destructive bg-destructive/20 rounded-sm': state === 'incorrect',
        'text-primary-foreground bg-primary rounded-sm animate-pulse': state === 'current',
      })}
    >
      {character === ' ' && state === 'current' ? ' ' : character}
    </span>
  );
});

Character.displayName = 'Character';

export default Character;
