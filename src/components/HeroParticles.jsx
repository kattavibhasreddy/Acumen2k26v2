import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const HeroParticles = () => {
  const canvasMountRef = useRef(null);
  const h1Ref = useRef(null);

  const [showText, setShowText] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    let renderer, scene, camera, mesh;
    let isActive = true;

    const init = async () => {
      // 1. Ensure fonts are completely loaded so bounding boxes are accurate
      await document.fonts.ready;

      // A small delay to ensure React commits the DOM position of h1Ref
      await new Promise(r => setTimeout(r, 100));

      if (!isActive || !canvasMountRef.current || !h1Ref.current) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      scene = new THREE.Scene();

      // 2. Use OrthographicCamera. This allows exactly 1:1 mapping of pixel to Three.js unit
      camera = new THREE.OrthographicCamera(w / -2, w / 2, h / 2, h / -2, 0.1, 1000);
      camera.position.z = 100;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      canvasMountRef.current.appendChild(renderer.domElement);

      const mobileFlag = window.innerWidth < 768;

      // 3. Compute exact DOM characteristics of the actual target text
      const rect = h1Ref.current.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(h1Ref.current);
      const exactFontSize = parseFloat(computedStyle.fontSize);
      const fontFam = computedStyle.fontFamily; // Usually: "Space Grotesk", sans-serif

      // CRITICAL: Force the browser to aggressively load this specific weight/family into the canvas context
      // before taking our snapshot, otherwise iOS Safari/Mobile defaults to Arial and ruins the particle layout!
      try {
        await document.fonts.load(`900 ${exactFontSize}px ${fontFam}`);
      } catch (e) { }

      // Center of the text
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // Convert mapping for orthographic space (origin is screen center)
      // Removing any manual optical shift entirely to rely completely on the pure mathematical mapping
      const orthoX = cx - w / 2;
      const orthoY = h / 2 - cy;

      // 4. Draw to Canvas replicating the exact styling perfectly
      const canvas = document.createElement('canvas');
      const cw = rect.width;
      const ch = rect.height;

      // Increase internal resolution for drawing
      canvas.width = cw * 2;
      canvas.height = ch * 2;
      const ctx = canvas.getContext('2d');
      ctx.scale(2, 2);

      ctx.fillStyle = 'black';
      ctx.font = `900 ${exactFontSize}px ${fontFam}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (ctx.letterSpacing !== undefined) {
        ctx.letterSpacing = computedStyle.letterSpacing;
      }

      // Draw text exactly like the DOM does, supporting newlines natively
      const lines = h1Ref.current.innerText.split('\n');
      const lh = parseFloat(computedStyle.lineHeight) || (exactFontSize * 1.05);

      // Offset starting Y so that the whole block is centered
      const startY = ch / 2 - ((lines.length - 1) * lh) / 2;

      lines.forEach((line, idx) => {
        // No arbitrary offsets, true raw baseline middle centering
        ctx.fillText(line, cw / 2, startY + (idx * lh));
      });

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      const pts = [];
      // Lower step -> higher particle density -> looks more like continuous solid text
      const step = mobileFlag ? 3 : 2;

      for (let y = 0; y < canvas.height; y += step) {
        for (let x = 0; x < canvas.width; x += step) {
          if (imageData[(y * canvas.width + x) * 4 + 3] > 128) {
            const realX = x / 2;
            const realY = y / 2;

            const offsetX = realX - cw / 2;
            const offsetY = realY - ch / 2;

            pts.push({
              x: orthoX + offsetX,
              y: orthoY - offsetY
            });
          }
        }
      }

      const count = pts.length;

      // Make cubes slightly larger per the user's request for a thicker, chunkier pixel effect
      const particleScale = mobileFlag ? 1.6 : 1.4;
      const geometry = new THREE.BoxGeometry(particleScale, particleScale, particleScale);
      const material = new THREE.MeshBasicMaterial({ color: '#FFD600' });
      mesh = new THREE.InstancedMesh(geometry, material, count);
      scene.add(mesh);

      const dummy = new THREE.Object3D();

      const positions = new Float32Array(count * 3);
      const targetPositions = new Float32Array(count * 3);
      const rotations = new Float32Array(count * 3);
      const targetRotations = new Float32Array(count * 3);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;

        targetPositions[i3] = pts[i].x;
        targetPositions[i3 + 1] = pts[i].y;

        // Give particles a tiny bit of depth offset at the end so it looks organic
        targetPositions[i3 + 2] = (Math.random() - 0.5) * 5;

        // 5. Spawn points ALL OVER the screen instead of a slit
        positions[i3] = (Math.random() - 0.5) * w * 2.5;
        positions[i3 + 1] = (Math.random() - 0.5) * h * 2.5;
        positions[i3 + 2] = (Math.random() - 0.5) * 600;

        targetRotations[i3] = 0;
        targetRotations[i3 + 1] = 0;
        targetRotations[i3 + 2] = 0;

        rotations[i3] = Math.random() * Math.PI * 2;
        rotations[i3 + 1] = Math.random() * Math.PI * 2;
        rotations[i3 + 2] = Math.random() * Math.PI * 2;

        dummy.position.set(positions[i3], positions[i3 + 1], positions[i3 + 2]);
        dummy.rotation.set(rotations[i3], rotations[i3 + 1], rotations[i3 + 2]);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }

      mesh.instanceMatrix.needsUpdate = true;

      const animObj = { progress: 0 };
      gsap.to(animObj, {
        progress: 1,
        duration: 3,
        ease: "power3.inOut",
        onUpdate: () => {
          const p = animObj.progress;
          for (let i = 0; i < count; i++) {
            const i3 = i * 3;

            const cx = positions[i3] + (targetPositions[i3] - positions[i3]) * p;
            const cy = positions[i3 + 1] + (targetPositions[i3 + 1] - positions[i3 + 1]) * p;
            const cz = positions[i3 + 2] + (targetPositions[i3 + 2] - positions[i3 + 2]) * p;

            const rx = rotations[i3] + (targetRotations[i3] - rotations[i3]) * p;
            const ry = rotations[i3 + 1] + (targetRotations[i3 + 1] - rotations[i3 + 1]) * p;
            const rz = rotations[i3 + 2] + (targetRotations[i3 + 2] - rotations[i3 + 2]) * p;

            dummy.position.set(cx, cy, cz);
            dummy.rotation.set(rx, ry, rz);

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
          }
          mesh.instanceMatrix.needsUpdate = true;
        },
        onComplete: () => {
          if (isActive) {
            setShowText(true);
          }
        }
      });

      const animate = () => {
        if (!isActive) return;
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };

      animate();
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (!camera || !renderer || !canvasMountRef.current) return;
      // Refresh component basically occurs due to React state change, but to guarantee:
      camera.left = window.innerWidth / -2;
      camera.right = window.innerWidth / 2;
      camera.top = window.innerHeight / 2;
      camera.bottom = window.innerHeight / -2;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();
    window.addEventListener('resize', handleResize);

    return () => {
      isActive = false;
      window.removeEventListener('resize', handleResize);
      if (canvasMountRef.current && renderer) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        canvasMountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={canvasMountRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          opacity: showText ? 0 : 1,
          transition: 'opacity 0.15s ease-in-out',
          pointerEvents: 'none'
        }}
      />

      <div style={{ position: 'relative', width: '100%', height: '40vh', minHeight: '250px', marginTop: '-8vh' }}>
        <h1
          ref={h1Ref}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            fontFamily: "'Villagers', var(--font-display)",
            fontWeight: 900,
            // Since 'ACUMEN' is the longest line now instead of 'ACUMEN IT', we can make the relative size much larger
            fontSize: isMobile ? 'clamp(3rem, 18vw, 8rem)' : 'clamp(3.5rem, 10vw, 8rem)',
            lineHeight: 1.05,
            letterSpacing: '0.1em',
            color: '#FFD600',
            opacity: showText ? 1 : 0,
            transform: 'none',
            transition: 'opacity 0.15s ease-in-out',
            pointerEvents: showText ? 'auto' : 'none',
            whiteSpace: 'pre-wrap',
            textAlign: 'center',
            zIndex: 1
          }}
        >
          {isMobile ? "ACUMEN\nIT\n2026" : "ACUMEN IT 2026"}
        </h1>
      </div>
    </>
  );
};

export default HeroParticles;
