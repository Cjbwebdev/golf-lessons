
"use client"; // Required for useAuth hook and useRouter

import Link from 'next/link';
import { Disc, Users, Brain, Search, LogIn, LogOut, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

export function Header() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

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
              AI Planner
            </Link>
          </Button>
          
          {loading ? (
            <div className="h-9 w-20 animate-pulse bg-muted rounded-md"></div>
          ) : user ? (
            <>
              {/* Optionally display user email or name */}
              {/* <span className="text-sm text-muted-foreground hidden sm:inline">Welcome, {user.email}</span> */}
              <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-1 text-sm sm:text-base">
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login" className="flex items-center gap-1 text-sm sm:text-base">
                  <LogIn className="h-4 w-4 sm:h-5 sm:w-5" />
                  Login
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup" className="flex items-center gap-1 text-sm sm:text-base">
                  <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                 Sign Up
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
