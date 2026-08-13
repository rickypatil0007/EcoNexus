"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, Preload } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

// ── PROCEDURAL TREE ────────────────────────────────────────────────────────
function Tree({ position, scale, colorHue }: { position: [number, number, number]; scale: number; colorHue: number }) {
  const treeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (treeRef.current) {
      // Gentle swaying in the wind
      const t = state.clock.elapsedTime;
      treeRef.current.rotation.z = Math.sin(t + position[0]) * 0.05;
      treeRef.current.rotation.x = Math.cos(t + position[2]) * 0.05;
    }
  });

  const leafColor = new THREE.Color().setHSL(colorHue, 0.7, 0.4);

  return (
    <group ref={treeRef} position={position} scale={[scale, scale, scale]}>
      {/* Trunk */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 0.8, 6]} />
        <meshStandardMaterial color="#5C4033" roughness={0.9} />
      </mesh>
      {/* Leaves (Tier 1) */}
      <mesh castShadow receiveShadow position={[0, 1.0, 0]}>
        <coneGeometry args={[0.6, 1.2, 7]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
      {/* Leaves (Tier 2) */}
      <mesh castShadow receiveShadow position={[0, 1.6, 0]}>
        <coneGeometry args={[0.45, 1.0, 7]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
      {/* Leaves (Tier 3) */}
      <mesh castShadow receiveShadow position={[0, 2.1, 0]}>
        <coneGeometry args={[0.3, 0.8, 7]} />
        <meshStandardMaterial color={leafColor} roughness={0.8} />
      </mesh>
    </group>
  );
}

// ── PROCEDURAL ANIMAL (BUNNY) ──────────────────────────────────────────────
function Bunny({ position, offset }: { position: [number, number, number]; offset: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime * 3 + offset;
      // Hopping motion
      const jump = Math.max(0, Math.sin(t));
      groupRef.current.position.y = position[1] + jump * 0.3;
      
      // Moving slightly in a circle
      const angle = state.clock.elapsedTime * 0.2 + offset;
      const radius = Math.sqrt(position[0]*position[0] + position[2]*position[2]);
      groupRef.current.position.x = Math.cos(angle) * radius;
      groupRef.current.position.z = Math.sin(angle) * radius;
      
      // Face the direction of movement
      groupRef.current.rotation.y = -angle + Math.PI;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={[0.3, 0.3, 0.3]}>
      {/* Body */}
      <mesh castShadow receiveShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[0.5, 0.4, 0.6]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.7} />
      </mesh>
      {/* Head */}
      <mesh castShadow receiveShadow position={[0, 0.7, 0.3]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.7} />
      </mesh>
      {/* Ears */}
      <mesh castShadow receiveShadow position={[-0.1, 1.0, 0.2]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.7} />
      </mesh>
      <mesh castShadow receiveShadow position={[0.1, 1.0, 0.2]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.7} />
      </mesh>
      {/* Tail */}
      <mesh castShadow receiveShadow position={[0, 0.4, -0.35]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
    </group>
  );
}

// ── FOREST SYSTEM ──────────────────────────────────────────────────────────
function ForestSystem({ greenPoints }: { greenPoints: number }) {
  const islandRef = useRef<THREE.Group>(null);

  // Slow rotation for the entire island
  useFrame((state) => {
    if (islandRef.current) {
      islandRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  // Calculate forest density based on points
  // 1 tree per 10 points, up to 100 trees
  const treeCount = Math.min(Math.floor(greenPoints / 10) + 1, 100);
  
  // Calculate animal density
  // 1 bunny per 50 points, up to 15 bunnies
  const bunnyCount = Math.min(Math.floor(greenPoints / 50), 15);

  // Procedurally generate trees
  const trees = useMemo(() => {
    const arr = [];
    const islandRadius = 4.5;
    
    // Always put one tree in the center
    arr.push({
      id: 0,
      position: [0, 0.1, 0] as [number, number, number],
      scale: 1.2,
      colorHue: 0.3 + Math.random() * 0.05,
    });

    for (let i = 1; i < treeCount; i++) {
      // Golden ratio spiral for even distribution
      const theta = i * Math.PI * (1 + Math.sqrt(5));
      const radius = Math.sqrt(i / treeCount) * islandRadius;
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      // Randomize slightly
      const scale = 0.5 + Math.random() * 0.6;
      // Base green hue is ~0.33, we vary it between 0.25 and 0.4
      const colorHue = 0.25 + Math.random() * 0.15;
      
      arr.push({ id: i, position: [x, 0.1, z] as [number, number, number], scale, colorHue });
    }
    return arr;
  }, [treeCount]);

  // Procedurally generate bunnies
  const bunnies = useMemo(() => {
    const arr = [];
    for (let i = 0; i < bunnyCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const radius = 1 + Math.random() * 3.5;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      arr.push({
        id: i,
        position: [x, 0.1, z] as [number, number, number],
        offset: Math.random() * 10, // random animation offset
      });
    }
    return arr;
  }, [bunnyCount]);

  return (
    <group ref={islandRef}>
      {/* Terrain Grass Layer */}
      <mesh receiveShadow position={[0, -0.2, 0]}>
        <cylinderGeometry args={[5.2, 5.0, 0.4, 32]} />
        <meshStandardMaterial color="#4ade80" roughness={1} />
      </mesh>
      
      {/* Terrain Dirt Layer */}
      <mesh receiveShadow position={[0, -0.8, 0]}>
        <cylinderGeometry args={[5.0, 4.0, 0.8, 32]} />
        <meshStandardMaterial color="#78350f" roughness={1} />
      </mesh>
      
      {/* Bottom Rock Cone */}
      <mesh receiveShadow position={[0, -2.2, 0]}>
        <cylinderGeometry args={[4.0, 0.1, 2.0, 16]} />
        <meshStandardMaterial color="#475569" roughness={0.8} />
      </mesh>

      {/* Render Trees */}
      {trees.map((t) => (
        <Tree key={t.id} position={t.position} scale={t.scale} colorHue={t.colorHue} />
      ))}

      {/* Render Bunnies */}
      {bunnies.map((b) => (
        <Bunny key={b.id} position={b.position} offset={b.offset} />
      ))}
    </group>
  );
}

export function EcoForestScene({ greenPoints }: { greenPoints: number }) {
  return (
    <div className="w-full h-[60vh] md:h-[75vh] bg-[#87CEEB] overflow-hidden relative rounded-2xl shadow-inner border border-white/10">
      {/* UI Overlay */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="bg-white/20 backdrop-blur-md p-5 rounded-2xl border border-white/40 shadow-lg">
          <h2 className="text-2xl font-black text-emerald-900 mb-1 drop-shadow-sm">Living Forest</h2>
          <p className="text-sm font-medium text-emerald-800">
            Green Points Visualized: <span className="text-emerald-950 font-bold text-lg">{greenPoints}</span>
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-emerald-700 bg-white/30 px-2 py-1 rounded-md inline-block">
              🌳 1 Tree per 10 points
            </p>
            <br/>
            <p className="text-xs text-emerald-700 bg-white/30 px-2 py-1 rounded-md inline-block">
              🐇 1 Bunny per 50 points
            </p>
          </div>
        </div>
      </div>

      <Canvas
        shadows
        camera={{ position: [0, 4, 10], fov: 45, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <Sky 
            distance={450000} 
            sunPosition={[5, 1, 8]} 
            inclination={0} 
            azimuth={0.25} 
            turbidity={10} 
            rayleigh={2}
          />
          
          <ambientLight intensity={0.4} />
          <directionalLight
            castShadow
            position={[10, 15, 10]}
            intensity={1.2}
            color="#fffbea"
            shadow-mapSize={[2048, 2048]}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <directionalLight position={[-10, 5, -10]} intensity={0.3} color="#93c5fd" />

          <ForestSystem greenPoints={greenPoints} />

          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            minDistance={4} 
            maxDistance={25} 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 2 + 0.1} 
            enableDamping={true}
            dampingFactor={0.05}
            target={[0, 1, 0]}
          />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
