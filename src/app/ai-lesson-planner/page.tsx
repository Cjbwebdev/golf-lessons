"use client"; // Required because we are using useState for lessonPlan state

import { useState } from 'react';
import { LessonPlanForm } from '@/components/features/ai-lesson-planner/lesson-plan-form';
import { LessonPlanDisplay } from '@/components/features/ai-lesson-planner/lesson-plan-display';
import { Brain } from 'lucide-react';

// Metadata cannot be defined in client components. Move to a server component parent if needed,
// or define it statically if the page content doesn't require dynamic metadata.
// For now, removing dynamic metadata export from here.
// export const metadata: Metadata = { ... }

export default function AiLessonPlannerPage() {
  const [lessonPlan, setLessonPlan] = useState<string | undefined>(undefined);

  const handleLessonPlanGenerated = (plan: string | undefined) => {
    setLessonPlan(plan);
  };

  return (
    <div className="space-y-10">
      <section className="text-center">
         <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
          <Brain className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">AI Golf Lesson Planner</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get a custom-tailored lesson plan from our AI golf expert. Just enter your current abilities and what you want to achieve.
        </p>
      </section>
      
      <LessonPlanForm onLessonPlanGenerated={handleLessonPlanGenerated} />
      
      {lessonPlan && (
        <LessonPlanDisplay lessonPlan={lessonPlan} />
      )}
    </div>
  );
}
