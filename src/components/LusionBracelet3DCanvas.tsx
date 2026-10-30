import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from 'framer-motion';
import { Sparkles, Move } from 'lucide-react';

/**
 * LusionBracelet3DCanvas Component
 *
 * Immersive, interactive 3D WebGL Modular Charm Bracelet built with Three.js.
 * Directly references:
 * - Lusion Studio (lusion.co, atlas_motion, everswap)
 *   - Real-time mouse raycasting, 3D specular shine, and fluid Lerp physics.
 * - Google Antigravity (antigravity.google)
 *   - Kinetic impulses on drag, natural damping, and inertia.
 * - LINKED! Italian Charm Bracelet Specifications
 *   - 9mm modular surgical stainless steel (316L) links with beveled rims,
 *     internal spring pins, and customizable charm emblems.
 */

interface LusionBracelet3DCanvasProps {
  interactive?: boolean;
  activeCharmsCount?: number; // 0 to 3
  height?: string;
  showControls?: boolean;
  mode?: 'bracelet' | 'single-link';
}

export const LusionBracelet3DCanvas: React.FC<LusionBracelet3DCanvasProps> = ({
  interactive = true,
  activeCharmsCount = 3,
  height = '420px',
  showControls = true,
  mode = 'bracelet',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || prefersReduced) return;

    const width = container.clientWidth || 600;
    const heightPx = container.clientHeight || 420;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / heightPx, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(width, heightPx);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);
    } catch {
      // Fallback for headless test environments (jsdom) where WebGL is unavailable
      return;
    }

    // 2. Realistic Surgical Steel 316L Material
    const steelMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.92,
      roughness: 0.18,
      envMapIntensity: 1.2,
    });

    const darkSteelMaterial = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.35,
    });

    const goldAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.1,
    });

    const charmMaterials: { [key: string]: THREE.Material } = {
      heart: new THREE.MeshStandardMaterial({
        color: 0xe11d48, // Rose Enamel
        metalness: 0.3,
        roughness: 0.2,
      }),
      star: new THREE.MeshStandardMaterial({
        color: 0xf59e0b, // Gold Star
        metalness: 0.8,
        roughness: 0.2,
      }),
      initialA: new THREE.MeshStandardMaterial({
        color: 0x121212, // Ink Black Enamel
        metalness: 0.4,
        roughness: 0.25,
      }),
    };

    // 3. Construct 3D Bracelet Band Group
    const braceletGroup = new THREE.Group();
    scene.add(braceletGroup);

    const linkMeshes: THREE.Group[] = [];

    if (mode === 'single-link') {
      const linkGroup = new THREE.Group();

      // Main 9mm modular link chassis
      const linkGeo = new THREE.BoxGeometry(2.6, 1.6, 0.45);
      const linkMesh = new THREE.Mesh(linkGeo, steelMaterial);
      linkMesh.castShadow = true;
      linkMesh.receiveShadow = true;
      linkGroup.add(linkMesh);

      // Top specular beveled rim
      const rimGeo = new THREE.BoxGeometry(2.4, 1.4, 0.52);
      const rimMesh = new THREE.Mesh(rimGeo, goldAccentMaterial);
      linkGroup.add(rimMesh);

      // Inner brushed center plate
      const centerGeo = new THREE.BoxGeometry(2.1, 1.1, 0.56);
      const centerMesh = new THREE.Mesh(centerGeo, steelMaterial);
      linkGroup.add(centerMesh);

      // Lateral Spring Latch Pins (Left & Right)
      const pinGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.7, 16);
      const pinLeft = new THREE.Mesh(pinGeo, darkSteelMaterial);
      pinLeft.rotation.z = Math.PI / 2;
      pinLeft.position.set(-1.35, 0, 0);
      linkGroup.add(pinLeft);

      const pinRight = new THREE.Mesh(pinGeo, darkSteelMaterial);
      pinRight.rotation.z = Math.PI / 2;
      pinRight.position.set(1.35, 0, 0);
      linkGroup.add(pinRight);

      braceletGroup.add(linkGroup);
    } else {
      const totalLinks = 14;
      const radius = 2.4;

      for (let i = 0; i < totalLinks; i++) {
        const linkGroup = new THREE.Group();
        const angle = (i / totalLinks) * Math.PI * 2;

        // Position in continuous oval/circle
        const x = Math.cos(angle) * (radius * 1.15);
        const y = Math.sin(angle) * (radius * 0.7);
        linkGroup.position.set(x, y, 0);
        linkGroup.rotation.z = angle + Math.PI / 2;

        // Link Main Body (9mm modular block)
        const linkGeo = new THREE.BoxGeometry(0.85, 0.48, 0.22);
        const linkMesh = new THREE.Mesh(linkGeo, steelMaterial);
        linkMesh.castShadow = true;
        linkMesh.receiveShadow = true;
        linkGroup.add(linkMesh);

        // Top Specular Ridge Bevel
        const ridgeGeo = new THREE.BoxGeometry(0.8, 0.04, 0.24);
        const ridgeMesh = new THREE.Mesh(ridgeGeo, goldAccentMaterial);
        ridgeMesh.position.set(0, 0.21, 0);
        linkGroup.add(ridgeMesh);

        // Lateral Spring Latch Pins
        const pinGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.52, 12);
        const pinLeft = new THREE.Mesh(pinGeo, darkSteelMaterial);
        pinLeft.rotation.z = Math.PI / 2;
        pinLeft.position.set(-0.43, 0, 0);
        linkGroup.add(pinLeft);

        // Embedded Charms in front links (links 0, 1, 2)
        if (i === 0 && activeCharmsCount >= 1) {
          // Heart Charm Link
          const heartShape = new THREE.Shape();
          heartShape.moveTo(0, 0.08);
          heartShape.bezierCurveTo(0, 0.14, -0.12, 0.14, -0.12, 0.08);
          heartShape.bezierCurveTo(-0.12, 0.02, 0, -0.06, 0, -0.1);
          heartShape.bezierCurveTo(0, -0.06, 0.12, 0.02, 0.12, 0.08);
          heartShape.bezierCurveTo(0.12, 0.14, 0, 0.14, 0, 0.08);

          const extrudeSettings = { depth: 0.05, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.01, bevelThickness: 0.01 };
          const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
          const heartMesh = new THREE.Mesh(heartGeo, charmMaterials.heart);
          heartMesh.scale.set(1.4, 1.4, 1.4);
          heartMesh.position.set(0, 0, 0.1);
          linkGroup.add(heartMesh);
        } else if (i === 1 && activeCharmsCount >= 2) {
          // Star Charm Link
          const starGeo = new THREE.OctahedronGeometry(0.12, 0);
          const starMesh = new THREE.Mesh(starGeo, charmMaterials.star);
          starMesh.position.set(0, 0, 0.12);
          starMesh.rotation.z = Math.PI / 4;
          linkGroup.add(starMesh);
        } else if (i === totalLinks - 1 && activeCharmsCount >= 3) {
          // Monogram / Initial Link
          const discGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.04, 24);
          const discMesh = new THREE.Mesh(discGeo, charmMaterials.initialA);
          discMesh.rotation.x = Math.PI / 2;
          discMesh.position.set(0, 0, 0.11);
          linkGroup.add(discMesh);
        }

        braceletGroup.add(linkGroup);
        linkMeshes.push(linkGroup);
      }
    }

    // Tilt the bracelet group towards the viewer in 3D
    braceletGroup.rotation.x = 0.55;
    braceletGroup.rotation.y = -0.3;

    // 4. Studio Lighting & Specular Spotlights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 8, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xcbd5e1, 1.2);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Dynamic mouse point light (Lusion specular shine sweep)
    const cursorLight = new THREE.PointLight(0xffffff, 2.2, 10);
    cursorLight.position.set(0, 0, 3);
    scene.add(cursorLight);

    // 5. Interactive Mouse & Drag Physics (Lusion & Google Antigravity)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let targetRotX = 0.55;
    let targetRotY = -0.3;
    let rotVelX = 0;
    let rotVelY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      setIsInteracting(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      // Move cursor specular spotlight
      cursorLight.position.x = normX * 3.5;
      cursorLight.position.y = normY * 2.5;

      if (isDragging) {
        const deltaX = clientX - prevMouseX;
        const deltaY = clientY - prevMouseY;
        prevMouseX = clientX;
        prevMouseY = clientY;

        rotVelY = deltaX * 0.008;
        rotVelX = deltaY * 0.008;

        targetRotY += rotVelY;
        targetRotX += rotVelX;
      } else if (interactive) {
        // Natural hover tilt (Lusion Lerp)
        targetRotY = -0.3 + normX * 0.45;
        targetRotX = 0.55 - normY * 0.35;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    domEl.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 6. 60fps Animation Loop with Lerp Smoothing
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Inertia & continuous gentle rotation when not dragging
      if (!isDragging) {
        targetRotY += 0.002;
        rotVelX *= 0.94;
        rotVelY *= 0.94;
        targetRotX += rotVelX;
        targetRotY += rotVelY;
      }

      // Lusion Lerp interpolation: current += (target - current) * 0.08
      braceletGroup.rotation.x += (targetRotX - braceletGroup.rotation.x) * 0.08;
      braceletGroup.rotation.y += (targetRotY - braceletGroup.rotation.y) * 0.08;

      // Subtle breathing float on z-axis
      braceletGroup.position.y = Math.sin(elapsed * 1.5) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 600;
      const newH = container.clientHeight || 420;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      domEl.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      domEl.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(domEl)) {
        container.removeChild(domEl);
      }
      renderer.dispose();
    };
  }, [interactive, activeCharmsCount, prefersReduced]);

  if (prefersReduced) {
    return (
      <div className="w-full flex items-center justify-center p-8 bg-paper rounded-xl border border-steel">
        <span className="font-mono text-xs text-neutral-500">3D WebGL Model (Reduced Motion Active)</span>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full rounded-2xl overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Interactive Micro Badge (Lusion Style) */}
      {showControls && (
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 micro-label text-ink bg-white px-3 py-1 rounded-full border border-steel shadow-xs pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-neutral-800 animate-pulse" />
          <span>WEBGL 3D INTERACTIVE · DRAG TO ROTATE</span>
        </div>
      )}

      {/* Tactile drag hint */}
      {showControls && isHovered && !isInteracting && (
        <div className="absolute bottom-4 right-4 z-20 micro-label text-neutral-500 bg-white/80 px-2.5 py-1 rounded border border-steel shadow-xs flex items-center gap-1.5 pointer-events-none">
          <Move className="w-3 h-3 text-neutral-700" />
          <span>KLIK & GESER UNTUK MEMUTAR 360°</span>
        </div>
      )}
    </div>
  );
};
