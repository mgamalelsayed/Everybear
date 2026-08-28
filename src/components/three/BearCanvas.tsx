'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import {
  EffectComposer,
  ChromaticAberration,
  Bloom,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

function useTexture(url: string): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    let cancelled = false;
    new THREE.TextureLoader().load(url, (tex) => {
      if (cancelled) return;
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });
    return () => {
      cancelled = true;
    };
  }, [url]);
  return texture;
}

/**
 * Bear photograph on a plane behind everything. Drifts against the cursor and
 * fades up from black on mount.
 *
 * The dark tint multiplies the texture, crushing the bright fur highlights so
 * the bear melts into the canvas instead of competing with the foreground type.
 */
function BearPlane({ targetOpacity }: { targetOpacity: number }) {
  const texture = useTexture('/bear-bg.jpg');
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const pointer = state.pointer;
    meshRef.current.position.x = pointer.x * 0.1 - 0.25;
    meshRef.current.position.y = -pointer.y * 0.06;

    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    mat.opacity += (targetOpacity - mat.opacity) * 0.06;
  });

  if (!texture) return null;

  return (
    <mesh position={[-0.25, 0, -3.5]} ref={meshRef}>
      <planeGeometry args={[11, 6.5]} />
      <meshBasicMaterial
        map={texture}
        color={'#8a8a8a'}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * Persistent WebGL surface for the bear backdrop.
 *
 * Only the plane is left in here: the extruded scratch mark and both dust
 * fields were removed by request. The material is unlit, so the scene carries
 * no lights either.
 */
export function BearCanvas({ isHome }: { isHome: boolean }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ contain: 'strict' }}
    >
      <Canvas
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 5], fov: 45, near: 0.1, far: 100 }}
        eventSource={typeof document !== 'undefined' ? document.body : undefined}
        eventPrefix="client"
      >
        <BearPlane targetOpacity={isHome ? 0.22 : 0.12} />

        <Preload all />

        <EffectComposer enableNormalPass={false} multisampling={0}>
          <Bloom
            intensity={0.4}
            luminanceThreshold={0.8}
            luminanceSmoothing={0.4}
            mipmapBlur
          />
          <ChromaticAberration
            offset={[0.0004, 0.0004]}
            blendFunction={BlendFunction.NORMAL}
            radialModulation={false}
            modulationOffset={0}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
