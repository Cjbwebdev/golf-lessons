// use server'

/**
 * @fileOverview This file defines a Genkit flow for suggesting lesson plans tailored to a student's skill level and golfing goals.
 *
 * - suggestLessonPlan - A function that suggests a lesson plan.
 * - SuggestLessonPlanInput - The input type for the suggestLessonPlan function.
 * - SuggestLessonPlanOutput - The output type for the suggestLessonPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLessonPlanInputSchema = z.object({
  skillLevel: z
    .string()
    .describe("The student's current skill level (e.g., beginner, intermediate, advanced)."),
  goals: z
    .string()
    .describe('The specific golfing goals the student wants to achieve.'),
});
export type SuggestLessonPlanInput = z.infer<typeof SuggestLessonPlanInputSchema>;

const SuggestLessonPlanOutputSchema = z.object({
  lessonPlan: z
    .string()
    .describe('A detailed lesson plan tailored to the student.'),
});
export type SuggestLessonPlanOutput = z.infer<typeof SuggestLessonPlanOutputSchema>;

export async function suggestLessonPlan(input: SuggestLessonPlanInput): Promise<SuggestLessonPlanOutput> {
  return suggestLessonPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestLessonPlanPrompt',
  input: {schema: SuggestLessonPlanInputSchema},
  output: {schema: SuggestLessonPlanOutputSchema},
  prompt: `You are an expert golf instructor. A student has requested a lesson plan.

  Skill Level: {{{skillLevel}}}
  Goals: {{{goals}}}

  Please provide a detailed lesson plan to help the student achieve their goals, formatted as a numbered list.`,
});

const suggestLessonPlanFlow = ai.defineFlow(
  {
    name: 'suggestLessonPlanFlow',
    inputSchema: SuggestLessonPlanInputSchema,
    outputSchema: SuggestLessonPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
