"use client";

import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { useLayoutEffect, useRef } from "react";
import { useGLTF, MeshRefractionMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { easing } from "maath";
import { useAppStore } from "@/store/app.store";

const Ring: React.FC = () => {
  const ringRef = useRef<THREE.Group>(null);
  const { nodes } = useGLTF("/3d-models/ring.glb") as unknown as {
    nodes: {
      circle: THREE.Mesh;
      gem: THREE.Mesh;
      inner: THREE.Mesh;
      sticks: THREE.Mesh;
      ring: THREE.Mesh;
    };
  };

  const texture = useLoader(
    RGBELoader,
    "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr",
  );

  const { circleColor, gemColor, sticksColor, ringColor } = useAppStore();

  useFrame((_state, delta) => {
    if (ringRef.current) {
      // Smooth intro animation
      easing.damp(ringRef.current.position, "x", 0, 1.2, delta);
      easing.damp(ringRef.current.position, "y", -0.5, 1.2, delta);
      easing.damp(ringRef.current.position, "z", 0, 1.2, delta);

      // Subtle idle floating
      const t = _state.clock.elapsedTime;
      ringRef.current.position.y = -0.5 + Math.sin(t * 0.8) * 0.08;
    }
  });

  useLayoutEffect(() => {
    const updateScale = () => {
      if (ringRef.current) {
        const screenWidth = window.innerWidth;
        const scale = screenWidth < 768 ? 0.45 : 0.65;
        ringRef.current.scale.set(scale, scale, scale);
      }
    };

    window.addEventListener("resize", updateScale);
    updateScale();

    return () => {
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <group
      position={[-3, 0, 2]}
      rotation={[0.4, 0, -0.2]}
      scale={0.9}
      ref={ringRef}
      dispose={null}
    >
      {/* Gem setting base */}
      <mesh
        geometry={nodes.circle.geometry}
        position={[0, 2.942, 0]}
        scale={[0.512, 0.197, 0.512]}
      >
        <meshPhysicalMaterial
          roughness={0.15}
          metalness={0.9}
          color={circleColor}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Gem */}
      <mesh
        geometry={nodes.gem.geometry}
        position={[0, 3.951, 0]}
        scale={1.018}
      >
        <MeshRefractionMaterial
          envMap={texture}
          toneMapped={false}
          bounces={4}
          aberrationStrength={0.015}
          ior={2.75}
          fresnel={1.0}
          color={gemColor}
        />
      </mesh>

      {/* Prongs */}
      <mesh
        geometry={nodes.sticks.geometry}
        position={[0, 3.951, 0]}
        scale={1.018}
      >
        <meshPhysicalMaterial
          metalness={1.0}
          roughness={0.08}
          color={sticksColor}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Band */}
      <mesh
        geometry={nodes.ring.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.228}
      >
        <meshPhysicalMaterial
          roughness={0.05}
          metalness={1.0}
          color={ringColor}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
};

export default Ring;
