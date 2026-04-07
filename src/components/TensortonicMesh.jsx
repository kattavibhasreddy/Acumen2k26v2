import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const TerrainPlane = () => {
  const meshRef = useRef();

  // Create a custom shader material for maximum performance topographic math calculations
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#FFD600') }
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vPosition;

        void main() {
          vec3 pos = position;
          
          // Generate complex topographical waves using combined sine/cosine waves mapped to world space
          float noiseFreq = 0.05;
          float noiseAmp = 15.0;
          vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.5, pos.y * noiseFreq + uTime * 0.3, pos.z);
          
          // Basic procedural wave (mocking perlin displacement)
          pos.z += sin(noisePos.x) * cos(noisePos.y) * noiseAmp;
          pos.z += sin(noisePos.y * 0.5) * noiseAmp * 0.5;
          
          vPosition = pos;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vPosition;
        
        void main() {
          // Dynamic alpha based on Z height depth so peaks are intensely yellow and valleys fade to black
          float depthAlpha = smoothstep(-20.0, 20.0, vPosition.z) * 0.6 + 0.1;
          gl_FragColor = vec4(uColor, depthAlpha);
        }
      `,
      wireframe: true,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.elapsedTime;
      // Very slow global rotation to make the mesh drift
      meshRef.current.rotation.z += 0.0005;
    }
  });

  return (
    <mesh ref={meshRef} material={material} rotation={[-Math.PI / 2.15, 0, 0]} position={[0, -50, -60]}>
      {/* 250x250 grid with 80 segments to create highly detailed topographic squares */}
      <planeGeometry args={[300, 300, 100, 100]} />
    </mesh>
  );
};

export default function TensortonicMesh() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      zIndex: 0, // Behind Hero particles (which is zIndex 1) but above pure background
      overflow: 'hidden',
      opacity: 0.8, // Slightly muted to act as background
      pointerEvents: 'none'
    }}>
      <Canvas camera={{ position: [0, 20, 40], fov: 60 }} dpr={[1, 2]}>
        <TerrainPlane />
      </Canvas>
    </div>
  );
}
