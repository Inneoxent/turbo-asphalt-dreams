import { useEffect, useRef } from "react";

const Car3DShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create script elements for Three.js
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;

    script.onload = () => {
      initThreeJS();
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initThreeJS = () => {
    if (!containerRef.current) return;

    // @ts-ignore - Three.js is loaded via CDN
    const THREE = window.THREE;
    if (!THREE) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });

    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0x00d4ff, 3);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xff006e, 2);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);

    // Create a stylized car shape
    const carGroup = new THREE.Group();

    // Car body
    const bodyGeometry = new THREE.BoxGeometry(4, 1, 2);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x1a1a2e,
      shininess: 100,
      specular: 0x00d4ff
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.5;
    carGroup.add(body);

    // Car top
    const topGeometry = new THREE.BoxGeometry(2, 0.8, 1.8);
    const topMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x0a0a15,
      shininess: 100,
      specular: 0xff006e
    });
    const top = new THREE.Mesh(topGeometry, topMaterial);
    top.position.set(0, 1.4, 0);
    carGroup.add(top);

    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.3, 32);
    const wheelMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xff006e,
      emissive: 0xff006e,
      emissiveIntensity: 0.5
    });

    const wheels = [
      { x: 1.5, z: 1.2 },
      { x: -1.5, z: 1.2 },
      { x: 1.5, z: -1.2 },
      { x: -1.5, z: -1.2 }
    ];

    wheels.forEach(pos => {
      const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
      wheel.position.set(pos.x, 0, pos.z);
      wheel.rotation.z = Math.PI / 2;
      carGroup.add(wheel);
    });

    // Neon underglow
    const underglowGeometry = new THREE.PlaneGeometry(4.5, 2.5);
    const underglowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
    const underglow = new THREE.Mesh(underglowGeometry, underglowMaterial);
    underglow.position.y = -0.2;
    underglow.rotation.x = Math.PI / 2;
    carGroup.add(underglow);

    scene.add(carGroup);
    camera.position.set(5, 3, 5);
    camera.lookAt(0, 0, 0);

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        targetRotation.y += deltaX * 0.01;
        targetRotation.x += deltaY * 0.01;
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseup', onMouseUp);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth rotation interpolation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.1;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.1;

      if (!isDragging) {
        targetRotation.y += 0.005;
      }

      carGroup.rotation.x = currentRotation.x;
      carGroup.rotation.y = currentRotation.y;

      // Pulsing underglow effect
      underglow.material.opacity = 0.4 + Math.sin(Date.now() * 0.003) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeChild(renderer.domElement);
    };
  };

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-5xl md:text-6xl font-black tracking-tight">
            <span className="text-foreground">YOUR </span>
            <span className="bg-gradient-neon bg-clip-text text-transparent">GARAGE</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Customize and upgrade your ride. Click and drag to rotate the car.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div 
            ref={containerRef}
            className="w-full h-[500px] md:h-[600px] rounded-2xl bg-card border-2 border-primary/20 shadow-neon overflow-hidden"
          />
          
          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="px-6 py-3 bg-card rounded-lg border border-primary/30">
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Top Speed</div>
                <div className="text-2xl font-black text-neon-cyan">320 km/h</div>
              </div>
              <div className="px-6 py-3 bg-card rounded-lg border border-secondary/30">
                <div className="text-sm text-muted-foreground uppercase tracking-wider">0-100</div>
                <div className="text-2xl font-black text-neon-pink">2.8s</div>
              </div>
              <div className="px-6 py-3 bg-card rounded-lg border border-accent/30">
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Power</div>
                <div className="text-2xl font-black text-neon-purple">850 HP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Car3DShowcase;
