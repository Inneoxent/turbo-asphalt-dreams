import { Gauge, Zap, Trophy } from "lucide-react";

interface GameHUDProps {
  speed: number;
  nitro: number;
  lap: number;
  position: number;
}

export const GameHUD = ({ speed, nitro, lap, position }: GameHUDProps) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Speedometer - Bottom Left */}
      <div className="absolute bottom-8 left-8 pointer-events-auto">
        <div className="bg-background/80 backdrop-blur-md border border-neon-cyan/30 rounded-2xl p-6 shadow-neon">
          <div className="flex items-center gap-3 mb-2">
            <Gauge className="w-6 h-6 text-neon-cyan" />
            <span className="text-sm text-muted-foreground">Speed</span>
          </div>
          <div className="text-5xl font-bold text-neon-cyan">
            {Math.round(speed)}
          </div>
          <div className="text-sm text-muted-foreground">KM/H</div>
        </div>
      </div>

      {/* Nitro - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-auto">
        <div className="bg-background/80 backdrop-blur-md border border-neon-pink/30 rounded-2xl p-4 shadow-pink min-w-[250px]">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-neon-pink" />
            <span className="text-sm text-muted-foreground">Nitro Boost</span>
          </div>
          <div className="w-full bg-background/50 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-pink to-neon-purple transition-all duration-300"
              style={{ width: `${nitro}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground mt-1 text-center">
            Press SHIFT for boost
          </div>
        </div>
      </div>

      {/* Race Info - Top Right */}
      <div className="absolute top-8 right-8 pointer-events-auto">
        <div className="bg-background/80 backdrop-blur-md border border-neon-cyan/30 rounded-2xl p-6 shadow-neon">
          <div className="flex items-center gap-3 mb-4">
            <Trophy className="w-6 h-6 text-neon-cyan" />
            <span className="text-sm text-muted-foreground">Race Info</span>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs text-muted-foreground">Position</div>
              <div className="text-3xl font-bold text-neon-cyan">{position}/8</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Lap</div>
              <div className="text-2xl font-bold text-foreground">{lap}/3</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls - Top Left */}
      <div className="absolute top-8 left-8 pointer-events-auto">
        <div className="bg-background/80 backdrop-blur-md border border-neon-cyan/30 rounded-2xl p-4 shadow-neon">
          <div className="text-xs text-muted-foreground space-y-1">
            <div><span className="text-neon-cyan font-bold">↑/W</span> - Accelerate</div>
            <div><span className="text-neon-cyan font-bold">↓/S</span> - Brake</div>
            <div><span className="text-neon-cyan font-bold">←/A</span> - Left</div>
            <div><span className="text-neon-cyan font-bold">→/D</span> - Right</div>
            <div><span className="text-neon-pink font-bold">SHIFT</span> - Nitro</div>
            <div><span className="text-muted-foreground font-bold">ESC</span> - Exit</div>
          </div>
        </div>
      </div>
    </div>
  );
};
