export function Footer() {
  return (
    <footer className="bg-muted py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TeeTime Trainer. All rights reserved.</p>
        <p className="text-sm mt-1">Swing by for success!</p>
      </div>
    </footer>
  );
}
