/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Text, Float } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({
  position = [0, 0, 20],
  gravity = [0, -40, 0],
  fov = 25,
  transparent = true
}) {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true, stencil: false, depth: true }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.AgXToneMapping;
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Physics gravity={gravity} interpolate timeStep={1/60}>
          <Band isMobile={isMobile} />
        </Physics>

        <Environment resolution={256}>
          <Lightformer intensity={2} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 2, 1]} />
        </Environment>
      </Canvas>
    </div>
  );
}

function Band({ isMobile }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef();
  const vec = new THREE.Vector3(), dir = new THREE.Vector3();
  const [dragged, drag] = useState(false);

  const [curve] = useState(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()
  ]));

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2
  };

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.2]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.2]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.4, 0]]);

  useFrame((state) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z
      });
    }

    if (j1.current && j2.current && j3.current && fixed.current) {
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.translation());
      curve.points[2].copy(j1.current.translation());
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>

        <RigidBody
          ref={card}
          position={[2, 0, 0]}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          angularDamping={1}
          linearDamping={1}
        >
          <CuboidCollider args={[0.8, 1.1, 0.05]} />
          
          <group 
            onPointerDown={(e) => { e.target.setPointerCapture(e.pointerId); drag(new THREE.Vector3().copy(e.point)); }}
            onPointerUp={(e) => { e.target.releasePointerCapture(e.pointerId); drag(false); }}
          >
            {/* Metal Clip */}
            <mesh position={[0, 1.35, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.1, 32]} rotation={[Math.PI/2, 0, 0]} />
              <meshStandardMaterial color="#888" metalness={1} roughness={0.1} />
            </mesh>

            {/* Main ID Card Body */}
            <mesh>
              <boxGeometry args={[1.6, 2.2, 0.04]} />
              <meshPhysicalMaterial 
                color="#111" 
                metalness={0.2} 
                roughness={0.5} 
                clearcoat={1} 
              />
            </mesh>

            {/* Branding Text & Content */}
            <Text
              position={[0, 0.7, 0.03]}
              fontSize={0.15}
              color="#FFD600"
              font="/fonts/SpaceMono-Bold.ttf" // Use your font path or default
              anchorX="center"
            >
              ACUMEN IT 2026
            </Text>

            <mesh position={[0, 0.1, 0.025]}>
                <planeGeometry args={[1.3, 0.8]} />
                <meshStandardMaterial color="#222" />
                <Text position={[0, 0, 0.01]} fontSize={0.08} color="white">
                    PARTICIPANT PASS
                </Text>
            </mesh>

            <Text
              position={[-0.6, -0.7, 0.03]}
              fontSize={0.1}
              color="white"
              anchorX="left"
            >
              {"RANK: DEVELOPER\nDEPT: INFO TECH"}
            </Text>

            {/* Glossy Overlay/Sleeve */}
            <mesh position={[0, 0, 0.01]}>
              <boxGeometry args={[1.62, 2.22, 0.05]} />
              <meshPhysicalMaterial 
                transparent 
                opacity={0.2} 
                transmission={0.9} 
                thickness={0.1} 
                roughness={0} 
              />
            </mesh>
          </group>
        </RigidBody>
      </group>

      {/* ROPE/STRAP */}
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial 
          color="#111" 
          lineWidth={0.25} 
          dashArray={0.1}
          dashRatio={0}
        />
      </mesh>
    </>
  );
} 