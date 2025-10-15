import { useEffect } from "react";
import { Link } from "react-router-dom";
import Car3DShowcase from "@/components/Car3DShowcase";

const Garage = () => {
  useEffect(() => {
    document.title = "Garage | Turbo Streets";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", "Explore cars in the Turbo Streets garage. Rotate, view stats, and get ready to race.");
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <header className="container mx-auto px-4 py-8 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-black">
          <span className="text-foreground">Turbo Streets </span>
          <span className="bg-gradient-neon bg-clip-text text-transparent">Garage</span>
        </h1>
        <Link to="/" className="story-link text-primary">Back to Home</Link>
      </header>

      <section aria-label="Car Showcase">
        <Car3DShowcase />
      </section>

      <footer className="py-12 px-4 border-t border-primary/10">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">Pick your ride and head to the track!</p>
        </div>
      </footer>
    </main>
  );
};

export default Garage;
