"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Preload, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Custom shader for atmospheric glow
const AtmosphereMaterial = {
  uniforms: {
    color: { value: new THREE.Color("#4FA9FF") },
    viewVector: { value: new THREE.Vector3() },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 color;
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1.0)), 3.5);
      gl_FragColor = vec4(color, 1.0) * intensity * 1.5;
    }
  `,
  side: THREE.BackSide,
  blending: THREE.AdditiveBlending,
  transparent: true,
  depthWrite: false,
};

function Globe() {
  const groupRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const satellitesRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Group>(null);
  const mouseLightRef = useRef<THREE.PointLight>(null);

  const { pointer, viewport } = useThree();

  // Generate random data node positions in orbit
  const dataNodes = useMemo(() => {
    const nodes = [];
    for (let i = 0; i < 24; i++) {
      const radius = 2.8 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      nodes.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.sin(phi) * Math.sin(theta),
        z: radius * Math.cos(phi),
        speed: 0.2 + Math.random() * 0.4,
        scale: 0.02 + Math.random() * 0.03,
      });
    }
    return nodes;
  }, []);

  // Slow continuous rotation + Dynamic Cursor Interaction
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    if (groupRef.current) {
      // Base continuous rotation
      groupRef.current.rotation.y = t * 0.05;

      // Interactive tilt towards mouse cursor
      const targetRotationX = (pointer.y * viewport.height) / 8;
      const targetRotationY = (pointer.x * viewport.width) / 8;

      // Smooth interpolation for rotation
      groupRef.current.rotation.x += (targetRotationX - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.z += (-targetRotationY - groupRef.current.rotation.z) * 0.08;

      // Responsive micro scale on cursor hover proximity
      const distFromCenter = Math.sqrt(pointer.x * pointer.x + pointer.y * pointer.y);
      const targetScale = 1 + Math.max(0, 0.08 * (1 - distFromCenter));
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }

    // Make clouds rotate slightly faster than the earth to simulate weather
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.02;
    }

    // Fast orbiting satellites
    if (satellitesRef.current) {
      satellitesRef.current.rotation.y = t * 0.3;
      satellitesRef.current.rotation.z = t * 0.15;
    }

    // Floating eco data node cloud
    if (particlesRef.current) {
      particlesRef.current.rotation.y = -t * 0.08;
      particlesRef.current.rotation.x = t * 0.04;
    }

    // Dynamic 3D mouse light beam following cursor across the canvas
    if (mouseLightRef.current) {
      const targetX = (pointer.x * viewport.width) / 2;
      const targetY = (pointer.y * viewport.height) / 2;
      mouseLightRef.current.position.x += (targetX - mouseLightRef.current.position.x) * 0.1;
      mouseLightRef.current.position.y += (targetY - mouseLightRef.current.position.y) * 0.1;
    }
  });

  // Load earth textures
  const [colorMap, normalMap, specularMap, cloudsMap, lightsMap] = useTexture([
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png",
    "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_lights_2048.png"
  ]);

  return (
    <group 
      ref={groupRef}
      position={[viewport.width > 7 ? viewport.width * 0.25 : 0, 0, 0]}
    >
      {/* Dynamic Cursor Light Source */}
      <pointLight
        ref={mouseLightRef}
        position={[0, 0, 4]}
        intensity={3.5}
        distance={12}
        color="#2ED47A"
      />

      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Core Planet */}
        <mesh ref={globeRef} receiveShadow castShadow>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial 
            map={colorMap}
            normalMap={normalMap}
            roughnessMap={specularMap}
            emissiveMap={lightsMap}
            emissive={new THREE.Color(0xffff88)}
            emissiveIntensity={0.25}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>

        {/* Cloud Layer */}
        <mesh ref={cloudsRef} scale={[1.01, 1.01, 1.01]}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <meshStandardMaterial 
            map={cloudsMap}
            transparent={true}
            opacity={0.45}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Inner solid core */}
        <mesh>
          <sphereGeometry args={[2.48, 32, 32]} />
          <meshBasicMaterial color="#05070a" />
        </mesh>

        {/* Orbiting Satellites / Data Nodes */}
        <group ref={satellitesRef}>
          {[...Array(8)].map((_, i) => (
            <mesh 
              key={i} 
              position={[
                Math.sin((i / 8) * Math.PI * 2) * 3.2,
                Math.cos((i / 4) * Math.PI * 2) * 1.5,
                Math.cos((i / 8) * Math.PI * 2) * 3.2
              ]}
            >
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#2ED47A" />
              {/* Mini glow for satellite */}
              <mesh scale={[2.5, 2.5, 2.5]}>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshBasicMaterial color="#4FA9FF" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
              </mesh>
            </mesh>
          ))}
          {/* Orbital Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[3.2, 0.005, 16, 100]} />
            <meshBasicMaterial color="#2ED47A" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>

        {/* Floating Eco Data Node Particles */}
        <group ref={particlesRef}>
          {dataNodes.map((node, i) => (
            <mesh key={i} position={[node.x, node.y, node.z]}>
              <sphereGeometry args={[node.scale, 8, 8]} />
              <meshBasicMaterial 
                color={i % 2 === 0 ? "#2ED47A" : "#4FA9FF"} 
                transparent 
                opacity={0.8}
                blending={THREE.AdditiveBlending} 
              />
            </mesh>
          ))}
        </group>

        {/* Atmosphere Glow */}
        <mesh scale={[1.15, 1.15, 1.15]}>
          <sphereGeometry args={[2.5, 64, 64]} />
          <shaderMaterial
            args={[AtmosphereMaterial]}
            uniforms-color-value={new THREE.Color("#2ED47A")}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function EarthCanvas() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.25} />
        <directionalLight position={[5, 3, 5]} intensity={1.6} color="#ffffff" />
        <directionalLight position={[-5, -3, -5]} intensity={0.6} color="#4FA9FF" />
        
        <Stars 
          radius={50} 
          depth={50} 
          count={2000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={0.5} 
        />

        <Globe />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          autoRotate={false}
          maxPolarAngle={Math.PI / 1.5}
          minPolarAngle={Math.PI / 3}
        />
        <Preload all />
      </Canvas>
    </div>
  );
}
