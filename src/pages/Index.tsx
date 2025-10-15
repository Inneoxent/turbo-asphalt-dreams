import { useState } from "react";
import GameHero from "@/components/GameHero";
import Car3DShowcase from "@/components/Car3DShowcase";
import GameFeatures from "@/components/GameFeatures";
import { RacingGame } from "@/components/RacingGame";

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return <RacingGame onExit={() => setIsPlaying(false)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <GameHero onPlayClick={() => setIsPlaying(true)} />
      <Car3DShowcase />
      <GameFeatures />
      
      {/* Footer */}
      <footer className="py-12 px-4 border-t border-primary/10">
        <div className="container mx-auto text-center">
          <div className="space-y-4">
            <h3 className="text-3xl font-black">
              <span className="bg-gradient-neon bg-clip-text text-transparent">
                TURBO STREETS
              </span>
            </h3>
            <p className="text-muted-foreground">
              © 2025 Turbo Streets. Built with passion for racing.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
