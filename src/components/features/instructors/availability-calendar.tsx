"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import type { AvailabilitySlot } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

interface AvailabilityCalendarProps {
  availability: AvailabilitySlot[];
  instructorName: string;
}

export function AvailabilityCalendar({ availability, instructorName }: AvailabilityCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const availableDates = availability.map(slot => new Date(slot.date + 'T00:00:00')); // Ensure date is parsed in local timezone correctly for matching

  const modifiers = {
    available: availableDates,
  };

  const modifiersStyles = {
    available: {
      backgroundColor: 'hsl(var(--primary)/ 0.1)',
      color: 'hsl(var(--primary))',
      fontWeight: 'bold',
      borderRadius: 'var(--radius)',
    },
  };

  const selectedDayAvailability = selectedDate 
    ? availability.find(slot => new Date(slot.date + 'T00:00:00').toDateString() === selectedDate.toDateString())
    : undefined;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Availability for {instructorName}</CardTitle>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className="rounded-md border shadow-sm bg-background p-0"
            fromDate={new Date()} // Users can only book future dates
          />
          <p className="text-sm text-muted-foreground mt-2 p-1">
            Dates in <span className="font-semibold text-primary">green</span> have available slots.
            Each slot is 45 minutes.
          </p>
        </div>
        <div className="space-y-4 pt-2">
          {selectedDate && (
            <h3 className="text-xl font-semibold text-foreground">
              Available Slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}:
            </h3>
          )}
          {selectedDayAvailability && selectedDayAvailability.timeSlots.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {selectedDayAvailability.timeSlots.map(time => (
                <Button key={time} variant="outline" className="w-full flex items-center justify-center gap-2 hover:bg-primary/10 hover:border-primary group">
                  <Clock className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="group-hover:text-primary transition-colors">{time}</span>
                </Button>
              ))}
            </div>
          ) : selectedDate ? (
            <p className="text-muted-foreground">No slots available for this date. Please select an available (green) date.</p>
          ) : (
            <p className="text-muted-foreground">Select a date to see available time slots.</p>
          )}
           {selectedDayAvailability && (
             <Button className="w-full mt-4 shadow-md hover:shadow-lg transition-shadow" size="lg">Book Selected Slot</Button>
           )}
        </div>
      </CardContent>
    </Card>
  );
}
