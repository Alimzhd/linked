/**
 * ============================================================================
 * FLUID MOTION & 3D MESH MORPHING TOOLKIT (PRODUCTION READY SAMPLE FILE)
 * ============================================================================
 * Reverse-engineered from:
 * - Lusion.co (GPU vertex animation, elastic curvature, dynamic halftone raster)
 * - Antigravity.google (Harmonic spring physics, magnetic cursor gravitation)
 * - transitions.dev (Motion primitives, compositor-only transforms, damping)
 * - Autarkeia (Dual-vector morph targets: Simplex Noise A <-> Geometric Grid B)
 *
 * This file is completely standalone. You can copy and drop this into any
 * TypeScript/JavaScript project (React, Next.js, Astro, Vite, or Vanilla JS).
 * ============================================================================
 */

import * as THREE from 'three';

/* 1. MATHEMATICAL SIMPLEX 3D NOISE GENERATOR (Zero External Dependencies) */
const F3 = 1.0 / 3.0;
const G3 = 1.0 / 6.0;
const pTable = new Uint8Array([
  151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,
  8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,
  35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,
  134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,
  55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,
  18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,
  250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,
  189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,
  172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,
  228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,
  107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,
  138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
]);
const perm = new Uint8Array(512);
const permMod12 = new Uint8Array(512);
for (let i = 0; i < 512; i++) {
  perm[i] = pTable[i & 255];
  permMod12[i] = perm[i] % 12;
}
const grad3 = new Float32Array([
  1,1,0, -1,1,0, 1,-1,0, -1,-1,0,
  1,0,1, -1,0,1, 1,0,-1, -1,0,-1,
  0,1,1, 0,-1,1, 0,1,-1, 0,-1,-1
]);

export function simplexNoise3D(xin: number, yin: number, zin: number): number {
  let n0 = 0, n1 = 0, n2 = 0, n3 = 0;
  const s = (xin + yin + zin) * F3;
  const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s);
  const t = (i + j + k) * G3;
  const x0 = xin - (i - t), y0 = yin - (j - t), z0 = zin - (k - t);

  let i1 = 0, j1 = 0, k1 = 0, i2 = 0, j2 = 0, k2 = 0;
  if (x0 >= y0) {
    if (y0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
    else if (x0 >= z0) { i1 = 1; j1 = 0; k1 = 0; i2 = 1; j2 = 0; k2 = 1; }
    else { i1 = 0; j1 = 0; k1 = 1; i2 = 1; j2 = 0; k2 = 1; }
  } else {
    if (y0 < z0) { i1 = 0; j1 = 0; k1 = 1; i2 = 0; j2 = 1; k2 = 1; }
    else if (x0 < z0) { i1 = 0; j1 = 1; k1 = 0; i2 = 0; j2 = 1; k2 = 1; }
    else { i1 = 0; j1 = 1; k1 = 0; i2 = 1; j2 = 1; k2 = 0; }
  }

  const x1 = x0 - i1 + G3, y1 = y0 - j1 + G3, z1 = z0 - k1 + G3;
  const x2 = x0 - i2 + 2.0 * G3, y2 = y0 - j2 + 2.0 * G3, z2 = z0 - k2 + 2.0 * G3;
  const x3 = x0 - 1.0 + 3.0 * G3, y3 = y0 - 1.0 + 3.0 * G3, z3 = z0 - 1.0 + 3.0 * G3;

  const ii = i & 255, jj = j & 255, kk = k & 255;
  let t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
  if (t0 > 0) {
    const gi0 = permMod12[ii + perm[jj + perm[kk]]] * 3;
    t0 *= t0;
    n0 = t0 * t0 * (grad3[gi0] * x0 + grad3[gi0 + 1] * y0 + grad3[gi0 + 2] * z0);
  }
  let t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
  if (t1 > 0) {
    const gi1 = permMod12[ii + i1 + perm[jj + j1 + perm[kk + k1]]] * 3;
    t1 *= t1;
    n1 = t1 * t1 * (grad3[gi1] * x1 + grad3[gi1 + 1] * y1 + grad3[gi1 + 2] * z1);
  }
  let t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
  if (t2 > 0) {
    const gi2 = permMod12[ii + i2 + perm[jj + j2 + perm[kk + k2]]] * 3;
    t2 *= t2;
    n2 = t2 * t2 * (grad3[gi2] * x2 + grad3[gi2 + 1] * y2 + grad3[gi2 + 2] * z2);
  }
  let t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
  if (t3 > 0) {
    const gi3 = permMod12[ii + 1 + perm[jj + 1 + perm[kk + 1]]] * 3;
    t3 *= t3;
    n3 = t3 * t3 * (grad3[gi3] * x3 + grad3[gi3 + 1] * y3 + grad3[gi3 + 2] * z3);
  }

  return 32.0 * (n0 + n1 + n2 + n3);
}

/* 2. 3D MESH MORPHING DUAL-BUFFER BUILDER */
export function createMorphMeshGeometry(width = 6, height = 5, segments = 64) {
  const basePlane = new THREE.PlaneGeometry(width, height, segments, segments);
  const count = basePlane.attributes.position.count;

  const stateAPos = new Float32Array(count * 3);
  const stateBPos = new Float32Array(count * 3);
  const stateANorm = new Float32Array(count * 3);
  const stateBNorm = new Float32Array(count * 3);

  const posAttr = basePlane.attributes.position;
  const normAttr = basePlane.attributes.normal;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);

    // State B: Geometric Precision Plane
    stateBPos[i3] = x;
    stateBPos[i3 + 1] = y;
    stateBPos[i3 + 2] = z;
    stateBNorm[i3] = normAttr.getX(i);
    stateBNorm[i3 + 1] = normAttr.getY(i);
    stateBNorm[i3 + 2] = normAttr.getZ(i);

    // State A: Dispersed Simplex Noise (Organic Abstract)
    const noiseDisplacement = simplexNoise3D(x * 0.7, y * 0.7, 0.4) * 1.5;
    stateAPos[i3] = x + simplexNoise3D(y * 0.5, z * 0.5, 1.2) * 0.7;
    stateAPos[i3 + 1] = y + simplexNoise3D(x * 0.5, z * 0.5, 2.4) * 0.7;
    stateAPos[i3 + 2] = z + noiseDisplacement;
    stateANorm[i3] = 0.0;
    stateANorm[i3 + 1] = 0.0;
    stateANorm[i3 + 2] = 1.0;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(stateAPos, 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(stateANorm, 3));
  geometry.setAttribute('uv', basePlane.attributes.uv);
  geometry.setAttribute('aPositionTarget', new THREE.BufferAttribute(stateBPos, 3));
  geometry.setAttribute('aNormalTarget', new THREE.BufferAttribute(stateBNorm, 3));
  basePlane.dispose();
  return geometry;
}

/* 3. GLSL SHADER SCRIPTS */
export const morphVertexShader = /* glsl */ `
  attribute vec3 aPositionTarget;
  attribute vec3 aNormalTarget;
  uniform float uMorphProgress;
  uniform float uTime;
  uniform float uCurvature;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vCurvatureAmount;

  void main() {
    vUv = uv;
    vec3 morphedPos = mix(position, aPositionTarget, uMorphProgress);
    vec3 morphedNorm = normalize(mix(normal, aNormalTarget, uMorphProgress));

    float wave = sin(morphedPos.x * 2.2 + uTime * 1.4);
    morphedPos.z += wave * 0.22 * uCurvature;
    morphedPos.y += cos(morphedPos.y * 2.0 + uTime * 1.0) * 0.08 * uCurvature;

    vCurvatureAmount = wave;
    vPosition = morphedPos;
    vNormal = normalize(normalMatrix * morphedNorm);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(morphedPos, 1.0);
  }
`;

export const morphFragmentShader = /* glsl */ `
  uniform float uHalftoneScale;
  uniform float uHalftoneDotSize;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uLightPos;
  uniform vec2 uMouse;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying float vCurvatureAmount;

  void main() {
    vec3 norm = normalize(vNormal);
    vec3 lightDir = normalize(uLightPos - vPosition);
    vec3 viewDir = normalize(-vPosition);

    float diff = max(dot(norm, lightDir), 0.0);
    float fresnel = pow(1.0 - max(dot(norm, viewDir), 0.0), 3.0);

    vec2 gridUv = fract(vUv * uHalftoneScale) - 0.5;
    float dist = length(gridUv);
    float luminance = diff * 0.7 + fresnel * 0.5 + 0.15;
    float dotRadius = clamp(luminance * uHalftoneDotSize, 0.04, 0.48);
    float dotMask = smoothstep(dotRadius + fwidth(dist), dotRadius - fwidth(dist), dist);

    float mouseDist = length(vUv - uMouse);
    float mouseGlow = smoothstep(0.4, 0.0, mouseDist) * 0.3;

    vec3 baseColor = mix(uColorA, uColorB, vUv.y + vCurvatureAmount * 0.4);
    vec3 finalColor = mix(vec3(0.04, 0.04, 0.06), baseColor * 1.5, dotMask)
                    + (vec3(0.2, 0.7, 1.0) * fresnel * 0.8)
                    + (vec3(0.7, 0.4, 1.0) * mouseGlow);

    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

/* 4. HARMONIC SPRING PHYSICS SOLVER */
export class SpringSimulator {
  public stiffness = 180;
  public damping = 16;
  public mass = 1.0;
  public position = 0;
  public velocity = 0;
  public target = 0;

  constructor(stiffness = 180, damping = 16, mass = 1.0) {
    this.stiffness = stiffness;
    this.damping = damping;
    this.mass = mass;
  }

  public step(dt = 0.016): number {
    const displacement = this.position - this.target;
    const springForce = -this.stiffness * displacement;
    const dampingForce = -this.damping * this.velocity;
    const acceleration = (springForce + dampingForce) / this.mass;

    this.velocity += acceleration * dt;
    this.position += this.velocity * dt;
    return this.position;
  }
}

/* 5. MAGNETIC BUTTON MICRO-INTERACTION */
export function computeMagneticPull(cursorX: number, cursorY: number, elementRect: DOMRect, strength = 0.35) {
  const centerX = elementRect.left + elementRect.width / 2;
  const centerY = elementRect.top + elementRect.height / 2;
  return {
    x: (cursorX - centerX) * strength,
    y: (cursorY - centerY) * strength
  };
}

/* 6. LENIS INERTIA SMOOTH SCROLL */
export class InertiaSmoothScroll {
  private currentY = 0;
  private targetY = 0;
  private dampingFactor = 0.085;
  private isRunning = false;
  private rafId = 0;
  private callbacks: ((progress: number, y: number) => void)[] = [];

  constructor(dampingFactor = 0.085) {
    this.dampingFactor = dampingFactor;
  }

  public start() {
    this.targetY = window.scrollY;
    this.currentY = window.scrollY;
    window.addEventListener('scroll', () => { this.targetY = window.scrollY; }, { passive: true });

    const tick = () => {
      this.currentY += (this.targetY - this.currentY) * this.dampingFactor;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(Math.max(this.currentY / maxScroll, 0), 1);
      for (const cb of this.callbacks) cb(progress, this.currentY);
      this.rafId = requestAnimationFrame(tick);
    };
    this.isRunning = true;
    this.rafId = requestAnimationFrame(tick);
  }

  public onUpdate(cb: (progress: number, y: number) => void) {
    this.callbacks.push(cb);
  }

  public stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.rafId);
  }

  public get active(): boolean {
    return this.isRunning;
  }
}