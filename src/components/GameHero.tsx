import { Button } from "@/components/ui/button";
import heroRacing from "@/assets/hero-racing.jpg";

const GameHero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroRacing})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-slide-up space-y-8">
          {/* Logo/Title */}
          <div className="space-y-4">
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
              <span className="bg-gradient-neon bg-clip-text text-transparent animate-glow-pulse">
                TURBO
              </span>
            </h1>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-foreground">
              STREETS
            </h2>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-medium">
            Race through neon-lit cyberpunk streets at breakneck speeds
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg"
              className="text-lg px-8 py-6 bg-primary hover:bg-primary-glow shadow-neon hover:shadow-pink transition-all duration-300 font-bold"
            >
              START RACE
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-bold"
            >
              VIEW GARAGE
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12">
            <div className="space-y-2">
              <div className="text-4xl font-black text-neon-cyan">15+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Cars</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-neon-pink">8</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Tracks</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-black text-neon-purple">∞</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Speed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default GameHero;
