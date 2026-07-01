import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import BottleModel from './BottleModel';

export default function BottleCanvas({ targetProps, mouseProps }) {
  return (
    <div className="canvas-container select-none">
      <Canvas
        shadows
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, Math.min(window.devicePixelRatio, 2)]} // Cap at 2 for performance
      >
        {/* Slightly reduced ambient light for dramatic high-contrast shadows */}
        <ambientLight intensity={0.4} />

        {/* Primary Key Light - sharp white highlight */}
        <directionalLight 
          position={[6, 10, 5]} 
          intensity={3.0} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Intense Crimson/Red Rim Light representing the Strawberry reflection */}
        <directionalLight 
          position={[-6, 5, -5]} 
          intensity={2.8} 
          color="#FF3F5E" 
        />

        {/* Soft Botanical Green Fill Light from bottom-front to bounce off leaf textures */}
        <directionalLight 
          position={[1, -5, 4]} 
          intensity={1.0} 
          color="#52B788"
        />

        {/* Loading fallback and 3D Bottle */}
        <Suspense fallback={null}>
          <BottleModel targetProps={targetProps} mouseProps={mouseProps} />
          
          {/* Environment Studio preset for realistic specular reflections */}
          <Environment preset="studio" />
        </Suspense>

        {/* Soft Contact Shadow beneath the bottle */}
        <ContactShadows 
          position={[0, -2.6, 0]} 
          opacity={0.8} 
          scale={10} 
          blur={3.5} 
          far={5.0}
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
