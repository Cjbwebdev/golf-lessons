
"use client";

import React from 'react'; // Added React import for useEffect
import { useActionState, useFormStatus } from 'react'; // Changed from 'react-dom' and useFormState
import { handleSuggestLessonPlan } from '@/app/ai-lesson-planner/actions';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Wand2 } from 'lucide-react';

interface LessonPlanFormProps {
  onLessonPlanGenerated: (plan: string | undefined) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto shadow-md hover:shadow-lg transition-shadow">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Lesson Plan
        </>
      )}
    </Button>
  );
}

export function LessonPlanForm({ onLessonPlanGenerated }: LessonPlanFormProps) {
  const initialState = { lessonPlan: undefined, error: undefined, fieldErrors: undefined };
  const [state, dispatch] = useActionState(handleSuggestLessonPlan, initialState); // Changed from useFormState

  // Notify parent component when lesson plan is generated or an error occurs
  React.useEffect(() => {
    if (state?.lessonPlan) {
      onLessonPlanGenerated(state.lessonPlan);
    } else if (state?.error || state?.fieldErrors) {
      onLessonPlanGenerated(undefined); // Clear previous plan on error
    }
  }, [state, onLessonPlanGenerated]);


  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">AI-Powered Golf Lesson Planner</CardTitle>
        <CardDescription>
          Tell us about your current skill level and goals, and our AI will suggest a personalized lesson plan for you.
        </CardDescription>
      </CardHeader>
      <form action={dispatch}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="skillLevel" className="text-base">Current Skill Level</Label>
             <Select name="skillLevel" required>
              <SelectTrigger id="skillLevel" className="h-11 shadow-inner">
                <SelectValue placeholder="Select your skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            {state?.fieldErrors?.skillLevel && (
              <p className="text-sm text-destructive">{state.fieldErrors.skillLevel.join(', ')}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="goals" className="text-base">Your Golfing Goals</Label>
            <Textarea
              id="goals"
              name="goals"
              placeholder="e.g., Improve my driving distance, get more consistent with irons, lower my handicap by 5 strokes."
              rows={4}
              required
              className="shadow-inner"
            />
            {state?.fieldErrors?.goals && (
              <p className="text-sm text-destructive">{state.fieldErrors.goals.join(', ')}</p>
            )}
          </div>
          
          {state?.error && !state.fieldErrors && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}

