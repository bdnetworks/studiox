'use server';

/**
 * @fileOverview Adjusts the difficulty of Bengali texts by simplifying complex words or sentence structures.
 *
 * - adjustTextDifficulty - A function that handles the text difficulty adjustment process.
 * - AdjustTextDifficultyInput - The input type for the adjustTextDifficulty function.
 * - AdjustTextDifficultyOutput - The return type for the adjustTextDifficulty function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdjustTextDifficultyInputSchema = z.object({
  text: z
    .string()
    .describe('The Bengali text to be adjusted for difficulty.'),
});
export type AdjustTextDifficultyInput = z.infer<typeof AdjustTextDifficultyInputSchema>;

const AdjustTextDifficultyOutputSchema = z.object({
  simplifiedText: z
    .string()
    .describe('The simplified version of the input Bengali text.'),
});
export type AdjustTextDifficultyOutput = z.infer<typeof AdjustTextDifficultyOutputSchema>;

export async function adjustTextDifficulty(input: AdjustTextDifficultyInput): Promise<AdjustTextDifficultyOutput> {
  return adjustTextDifficultyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adjustTextDifficultyPrompt',
  input: {schema: AdjustTextDifficultyInputSchema},
  output: {schema: AdjustTextDifficultyOutputSchema},
  prompt: `You are an expert in simplifying Bengali text for language learners.

  Please simplify the following text, making it easier to understand while preserving the original meaning.

  Text: {{{text}}}`,
});

const adjustTextDifficultyFlow = ai.defineFlow(
  {
    name: 'adjustTextDifficultyFlow',
    inputSchema: AdjustTextDifficultyInputSchema,
    outputSchema: AdjustTextDifficultyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
