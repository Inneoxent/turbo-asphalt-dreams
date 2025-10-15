import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { GameHUD } from "./GameHUD";

interface CarProps {
  onSpeedChange: (speed: number) => void;
  onNitroChange: (nitro: number) => void;
}

const Car = ({ onSpeedChange, onNitroChange }: CarProps) => {
  const carRef = useRef<THREE.Group>(null);
  const [keys, setKeys] = useState({
    w: false,
    s: false,
    a: false,
    d: false,
    shift: false,
  });

  const velocity = useRef(0);
  const rotation = useRef(0);
  const nitro = useRef(100);
  const isNitroActive = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "w" || key === "arrowup") setKeys((k) => ({ ...k, w: true }));
      if (key === "s" || key === "arrowdown") setKeys((k) => ({ ...k, s: true }));
      if (key === "a" || key === "arrowleft") setKeys((k) => ({ ...k, a: true }));
      if (key === "d" || key === "arrowright") setKeys((k) => ({ ...k, d: true }));
      if (key === "shift") setKeys((k) => ({ ...k, shift: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "w" || key === "arrowup") setKeys((k) => ({ ...k, w: false }));
      if (key === "s" || key === "arrowdown") setKeys((k) => ({ ...k, s: false }));
      if (key === "a" || key === "arrowleft") setKeys((k) => ({ ...k, a: false }));
      if (key === "d" || key === "arrowright") setKeys((k) => ({ ...k, d: false }));
      if (key === "shift") setKeys((k) => ({ ...k, shift: false }));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (!carRef.current) return;

    const maxSpeed = 200;
    const acceleration = 100;
    const braking = 150;
    const turnSpeed = 2;
    const friction = 50;
    const nitroBoost = 50;

    // Acceleration
    if (keys.w) {
      velocity.current = Math.min(velocity.current + acceleration * delta, maxSpeed);
    } else if (keys.s) {
      velocity.current = Math.max(velocity.current - braking * delta, -maxSpeed / 2);
    } else {
      // Friction
      if (velocity.current > 0) {
        velocity.current = Math.max(0, velocity.current - friction * delta);
      } else if (velocity.current < 0) {
        velocity.current = Math.min(0, velocity.current + friction * delta);
      }
    }

    // Nitro boost
    if (keys.shift && nitro.current > 0 && velocity.current > 0) {
      velocity.current = Math.min(velocity.current + nitroBoost * delta, maxSpeed + 100);
      nitro.current = Math.max(0, nitro.current - 50 * delta);
      isNitroActive.current = true;
    } else {
      isNitroActive.current = false;
      nitro.current = Math.min(100, nitro.current + 20 * delta);
    }

    // Steering
    if (keys.a && velocity.current !== 0) {
      rotation.current += turnSpeed * delta * (velocity.current / maxSpeed);
    }
    if (keys.d && velocity.current !== 0) {
      rotation.current -= turnSpeed * delta * (velocity.current / maxSpeed);
    }

    // Apply rotation
    carRef.current.rotation.y = rotation.current;

    // Apply movement
    const moveX = Math.sin(rotation.current) * velocity.current * delta;
    const moveZ = Math.cos(rotation.current) * velocity.current * delta;
    carRef.current.position.x += moveX;
    carRef.current.position.z += moveZ;

    // Update HUD
    onSpeedChange(Math.abs(velocity.current));
    onNitroChange(nitro.current);

    // Camera follow
    const cameraDistance = 8;
    const cameraHeight = 4;
    const targetX = carRef.current.position.x - Math.sin(rotation.current) * cameraDistance;
    const targetZ = carRef.current.position.z - Math.cos(rotation.current) * cameraDistance;
    const targetY = carRef.current.position.y + cameraHeight;

    state.camera.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);
    state.camera.lookAt(carRef.current.position);
  });

  return (
    <group ref={carRef} position={[0, 0.5, 0]}>
      {/* Car Body */}
      <mesh castShadow>
        <boxGeometry args={[1.5, 0.8, 3]} />
        <meshStandardMaterial color="#00ffff" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Car Roof */}
      <mesh position={[0, 0.6, -0.3]} castShadow>
        <boxGeometry args={[1.3, 0.6, 1.5]} />
        <meshStandardMaterial color="#0099cc" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wheels */}
      <mesh position={[-0.8, -0.3, 1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.8, -0.3, 1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-0.8, -0.3, -1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.8, -0.3, -1]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Neon Underglow */}
      <pointLight position={[0, -0.5, 0]} color="#ff00ff" intensity={2} distance={5} />
    </group>
  );
};

const Track = () => {
  return (
    <>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.3} roughness={0.8} />
      </mesh>

      {/* Racing track */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.01, 0]}>
        <ringGeometry args={[15, 25, 64]} />
        <meshStandardMaterial color="#2a2a3e" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Track lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0.02, 0]}>
        <ringGeometry args={[19.8, 20.2, 64]} />
        <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
      </mesh>

      {/* Buildings */}
      {Array.from({ length: 20 }).map((_, i) => {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 40 + Math.random() * 20;
        const height = 10 + Math.random() * 30;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * radius, height / 2, Math.sin(angle) * radius]}
            castShadow
          >
            <boxGeometry args={[5 + Math.random() * 3, height, 5 + Math.random() * 3]} />
            <meshStandardMaterial 
              color="#1a1a2e" 
              emissive="#ff00ff" 
              emissiveIntensity={0.1}
            />
          </mesh>
        );
      })}
    </>
  );
};

interface RacingGameProps {
  onExit: () => void;
}

export const RacingGame = ({ onExit }: RacingGameProps) => {
  const [speed, setSpeed] = useState(0);
  const [nitro, setNitro] = useState(100);
  const [lap, setLap] = useState(1);
  const [position, setPosition] = useState(3);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onExit]);

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={75} />
        
        {/* Lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[10, 20, 10]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#00ffff" />

        {/* Game Elements */}
        <Car onSpeedChange={setSpeed} onNitroChange={setNitro} />
        <Track />

        {/* Fog for atmosphere */}
        <fog attach="fog" args={["#0a0a1e", 10, 100]} />
      </Canvas>

      <GameHUD speed={speed} nitro={nitro} lap={lap} position={position} />
    </div>
  );
};
