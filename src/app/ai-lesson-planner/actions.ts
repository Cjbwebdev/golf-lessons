'use server';
import { suggestLessonPlan, type SuggestLessonPlanInput, type SuggestLessonPlanOutput } from '@/ai/flows/suggest-lesson-plan';
import { z } from 'zod';

const SuggestLessonPlanActionInputSchema = z.object({
  skillLevel: z.string().min(1, "Skill level is required."),
  goals: z.string().min(1, "Goals are required."),
});

interface FormState {
  lessonPlan?: string;
  error?: string;
  fieldErrors?: {
    skillLevel?: string[];
    goals?: string[];
  };
}

export async function handleSuggestLessonPlan(prevState: FormState | undefined, formData: FormData): Promise<FormState> {
  const rawFormData = {
    skillLevel: formData.get('skillLevel') as string,
    goals: formData.get('goals') as string,
  };

  const validatedFields = SuggestLessonPlanActionInputSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      error: "Invalid input. Please check the fields.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }
  
  try {
    const input: SuggestLessonPlanInput = validatedFields.data;
    const result: SuggestLessonPlanOutput = await suggestLessonPlan(input);
    return { lessonPlan: result.lessonPlan };
  } catch (error) {
    console.error("Error suggesting lesson plan:", error);
    return { error: "Failed to generate lesson plan. Please try again." };
  }
}
