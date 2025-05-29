import Link from 'next/link';
import { Disc, Users, Brain, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="bg-background shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80 transition-opacity">
          <Disc className="h-8 w-8" />
          <span>TeeTime Trainer</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/instructors/search" className="flex items-center gap-1 text-sm sm:text-base">
              <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              Find Instructors
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/ai-lesson-planner" className="flex items-center gap-1 text-sm sm:text-base">
              <Brain className="h-4 w-4 sm:h-5 sm:w-5" />
              AI Lesson Planner
            </Link>
          </Button>
          {/* Future auth buttons */}
          {/* <Button variant="outline">Log In</Button> */}
          {/* <Button>Sign Up</Button> */}
        </nav>
      </div>
    </header>
  );
}
