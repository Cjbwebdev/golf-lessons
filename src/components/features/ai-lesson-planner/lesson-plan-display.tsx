import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ClipboardCopy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

interface LessonPlanDisplayProps {
  lessonPlan: string | undefined;
}

export function LessonPlanDisplay({ lessonPlan }: LessonPlanDisplayProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!lessonPlan) {
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(lessonPlan)
      .then(() => {
        setCopied(true);
        toast({
          title: "Copied to clipboard!",
          description: "Your lesson plan has been copied.",
        });
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
        toast({
          title: "Copy failed",
          description: "Could not copy the lesson plan. Please try manually.",
          variant: "destructive",
        });
      });
  };

  const formattedPlan = lessonPlan.split('\n').map((line, index) => {
    // Check if line starts with a number followed by a period (e.g., "1. ", "10. ")
    if (line.match(/^\d+\.\s+/)) {
      return (
        <li key={index} className="mb-2 ml-4 list-decimal list-inside text-foreground/90">
          {line.substring(line.indexOf('.') + 2)}
        </li>
      );
    }
    return <p key={index} className="mb-2 text-foreground/90">{line}</p>;
  });


  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 shadow-xl border">
      <CardHeader className="flex flex-row justify-between items-start">
        <div>
          <CardTitle className="text-2xl text-primary">Your Personalized Lesson Plan</CardTitle>
          <CardDescription>Here's a plan tailored to your skill level and goals.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" onClick={handleCopy} className="text-muted-foreground hover:text-primary">
          {copied ? <CheckCircle className="h-4 w-4 mr-2 text-green-500" /> : <ClipboardCopy className="h-4 w-4 mr-2" />}
          {copied ? 'Copied!' : 'Copy Plan'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm sm:prose-base max-w-none bg-primary/5 p-4 sm:p-6 rounded-md">
          <ul>{formattedPlan}</ul>
        </div>
      </CardContent>
    </Card>
  );
}
