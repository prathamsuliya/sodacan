import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function BottleModel({ targetProps, mouseProps }) {
  const meshRef = useRef();
  
  // Load local GLB model
  // Note: Vite will serve public/models/bottle.glb at /models/bottle.glb
  const { scene } = useGLTF('/models/bottle.glb');

  // Preload the model
  useEffect(() => {
    useGLTF.preload('/models/bottle.glb');
  }, []);

  // Ensure all child meshes cast and receive shadows for realistic rendering
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          // Let's refine materials to make them look premium
          if (child.material) {
            // If the model contains glass or metal, tune roughness and metalness
            child.material.roughness = THREE.MathUtils.clamp(child.material.roughness, 0.1, 0.4);
            child.material.metalness = THREE.MathUtils.clamp(child.material.metalness, 0.1, 0.8);
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  useFrame((state, delta) => {
    if (!meshRef.current || !targetProps.current) return;

    const target = targetProps.current;
    const isMobile = window.innerWidth < 768;

    // 1. Calculate responsive layout adjustments
    // If mobile, center the bottle horizontally, push slightly back and down/up
    const finalTargetX = isMobile ? 0 : target.x;
    const finalTargetY = isMobile ? target.y + 0.35 : target.y; 
    const finalTargetZ = isMobile ? target.z - 0.6 : target.z;
    const finalTargetScale = isMobile ? target.scale * 0.55 : target.scale;

    // 4. Calculate continuous gentle idle rotation on Y
    // (Slowly spins around Y axis)
    const idleY = state.clock.getElapsedTime() * 0.08;
    
    // 5. Calculate subtle mouse parallax (Desktop only)
    const px = mouseProps.current.x; // range [-1, 1]
    const py = mouseProps.current.y; // range [-1, 1]
    const parallaxRx = isMobile ? 0 : -py * 0.12; // tilt on X based on mouse Y
    const parallaxRy = isMobile ? 0 : px * 0.15;   // tilt on Y based on mouse X

    // Premium Float & Rotate Animations (60fps synced)
    const floatY = Math.sin(state.clock.getElapsedTime() * 1.5) * 0.1; // ~10px float
    const floatRy = Math.cos(state.clock.getElapsedTime() * 1.2) * 0.04; // ~2-3 deg float

    const finalAnimatedTargetY = finalTargetY + floatY;

    // 2. Interpolate Position with Float
    meshRef.current.position.x = THREE.MathUtils.damp(meshRef.current.position.x, finalTargetX, 3.8, delta);
    meshRef.current.position.y = THREE.MathUtils.damp(meshRef.current.position.y, finalAnimatedTargetY, 3.8, delta);
    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, finalTargetZ, 3.8, delta);

    // 3. Interpolate Scale
    meshRef.current.scale.x = THREE.MathUtils.damp(meshRef.current.scale.x, finalTargetScale, 3.8, delta);
    meshRef.current.scale.y = THREE.MathUtils.damp(meshRef.current.scale.y, finalTargetScale, 3.8, delta);
    meshRef.current.scale.z = THREE.MathUtils.damp(meshRef.current.scale.z, finalTargetScale, 3.8, delta);

    // 6. Interpolate Rotation (combining scroll target + idle rotation + mouse parallax + float)
    const targetRx = target.rx + parallaxRx;
    const targetRy = target.ry + idleY + parallaxRy + floatRy;
    const targetRz = target.rz;

    // Damp rotation smoothly
    meshRef.current.rotation.x = THREE.MathUtils.damp(meshRef.current.rotation.x, targetRx, 3.5, delta);
    meshRef.current.rotation.y = THREE.MathUtils.damp(meshRef.current.rotation.y, targetRy, 3.5, delta);
    meshRef.current.rotation.z = THREE.MathUtils.damp(meshRef.current.rotation.z, targetRz, 3.5, delta);
  });

  return (
    <primitive 
      ref={meshRef}
      object={scene} 
      position={[0, -0.6, 0]}
      rotation={[0.3, -0.6, -0.25]}
      scale={1.2}
    />
  );
}
