import { Zap, Trophy, Users, Map } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Nitro Boost",
    description: "Unleash explosive speed with the nitro system. Time it right to dominate the race.",
    color: "text-neon-cyan"
  },
  {
    icon: Trophy,
    title: "Championship Mode",
    description: "Compete in tournaments and climb the leaderboards to become the ultimate street racer.",
    color: "text-neon-pink"
  },
  {
    icon: Users,
    title: "Multiplayer",
    description: "Challenge racers worldwide in intense real-time multiplayer battles.",
    color: "text-neon-purple"
  },
  {
    icon: Map,
    title: "Dynamic Tracks",
    description: "Race through ever-changing cyberpunk cities with weather effects and shortcuts.",
    color: "text-neon-blue"
  }
];

const GameFeatures = () => {
  return (
    <section className="py-20 px-4 bg-gradient-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="text-foreground">GAME </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">FEATURES</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the most advanced street racing mechanics
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-card rounded-2xl border-2 border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-neon"
            >
              <div className={`${feature.color} mb-6 transition-transform duration-300 group-hover:scale-110`}>
                <feature.icon size={48} strokeWidth={2} />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>

              <div className={`mt-6 h-1 w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r ${
                feature.color === 'text-neon-cyan' ? 'from-neon-cyan to-neon-blue' :
                feature.color === 'text-neon-pink' ? 'from-neon-pink to-secondary' :
                feature.color === 'text-neon-purple' ? 'from-neon-purple to-accent' :
                'from-neon-blue to-primary'
              } rounded-full`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameFeatures;
