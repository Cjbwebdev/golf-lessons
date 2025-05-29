
import { InstructorCard } from '@/components/features/instructors/instructor-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockInstructors } from '@/lib/mock-data';
import { Search, MapPin, Star, CalendarDays,SlidersHorizontal } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Find Golf Instructors Worldwide | TeeTime Trainer',
  description: 'Search for golf instructors anywhere in the world and filter by rating or availability.',
};

export default function InstructorSearchPage() {
  // In a real app, instructors would be fetched based on search/filter criteria
  const instructors = mockInstructors;

  return (
    <div className="space-y-10">
      <section className="bg-primary/10 p-8 rounded-xl shadow-sm">
        <h1 className="text-4xl font-bold text-primary mb-4">Find Your Perfect Golf Coach</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
          Search for skilled instructors anywhere in the world. Enter a city, region, or country, and use filters to narrow down your search.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-grow w-full sm:w-auto">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Enter city, region, or country (e.g., London, Tokyo, California)"
              className="pl-10 pr-16 h-12 text-base shadow-inner"
            />
          </div>
          <Button size="lg" className="w-full sm:w-auto h-12 shadow-md hover:shadow-lg transition-shadow">
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </section>

      <section>
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between p-4 bg-card rounded-lg shadow">
           <h2 className="text-2xl font-semibold text-foreground">Filter Instructors</h2>
           <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px] h-10 shadow-sm">
                <Star className="h-4 w-4 mr-2 text-accent" />
                <SelectValue placeholder="Rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars & Up</SelectItem>
                <SelectItem value="3">3 Stars & Up</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px] h-10 shadow-sm">
                <CalendarDays className="h-4 w-4 mr-2 text-accent" />
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="next-week">Next Week</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="h-10 shadow-sm">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              More Filters
            </Button>
           </div>
        </div>
        {instructors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <InstructorCard key={instructor.id} instructor={instructor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No instructors found matching your criteria. Try broadening your search.</p>
          </div>
        )}
      </section>
    </div>
  );
}
