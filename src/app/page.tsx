import { Button } from "@/components/ui/button";
import { Disc, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center text-center space-y-8">
      <header className="mt-12 space-y-4">
        <div className="inline-block p-4 bg-primary/10 rounded-full">
          <Disc className="h-16 w-16 text-primary" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight text-gray-800">
          Welcome to <span className="text-primary">TeeTime Trainer</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover expert golf instructors, book lessons seamlessly, and elevate your game with AI-powered insights.
        </p>
      </header>

      <div className="relative w-full max-w-3xl h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-2xl">
        <Image
          src="https://source.unsplash.com/random/1200x600/?golf,course,landscape"
          alt="Golf course scenery"
          layout="fill"
          objectFit="cover"
          data-ai-hint="golf course landscape"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      <div className="space-y-6">
        <p className="text-lg text-gray-700 max-w-xl mx-auto">
          Ready to find your perfect coach or get a personalized lesson plan?
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/instructors/search" className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find an Instructor
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="shadow-lg hover:shadow-xl transition-shadow">
            <Link href="/ai-lesson-planner">
              Get AI Lesson Plan
            </Link>
          </Button>
        </div>
      </div>

      <section className="w-full max-w-4xl py-12">
        <h2 className="text-3xl font-semibold mb-8 text-gray-800">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-left">
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <h3 className="text-xl font-semibold mb-2 text-primary">1. Search</h3>
            <p className="text-muted-foreground">Find instructors by location or postcode. Filter by ratings and availability to match your needs.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <h3 className="text-xl font-semibold mb-2 text-primary">2. Book</h3>
            <p className="text-muted-foreground">View profiles, check available slots, and book your lessons securely in minutes.</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
            <h3 className="text-xl font-semibold mb-2 text-primary">3. Improve</h3>
            <p className="text-muted-foreground">Take your lesson, leave a review, and use our AI tool to get personalized practice plans.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
