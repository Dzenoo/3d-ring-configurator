"use client";

import * as THREE from "three";
import { RGBELoader } from "three/examples/jsm/Addons.js";
import { useLayoutEffect, useRef } from "react";
import { useGLTF, MeshRefractionMaterial } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { easing } from "maath";
import { useControls } from "leva";

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

  const { circle, gem, sticks, ring } = useControls({
    circle: {
      value: "#2d2d2d",
      label: "Circle Color",
    },
    gem: {
      value: "#648dce",
      label: "Gem Color",
    },
    sticks: {
      value: "#C0C0C0",
      label: "Sticks Color",
    },
    ring: {
      value: "#FFD700",
      label: "Ring Color",
    },
  });

  useFrame((state, delta) => {
    if (ringRef.current) {
      easing.damp(ringRef.current.position, "x", 0, 1.5, delta);
      easing.damp(ringRef.current.position, "y", -1, 1.5, delta);
      easing.damp(ringRef.current.position, "z", 0, 1.5, delta);
    }
  });

  useLayoutEffect(() => {
    const updateScale = () => {
      if (ringRef.current) {
        const screenWidth = window.innerWidth;
        const scale = screenWidth < 768 ? 0.3 : 1;
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
      rotation={[0.8, 1.5, 0]}
      scale={0.9}
      ref={ringRef}
      dispose={null}
    >
      <mesh
        geometry={nodes.circle.geometry}
        position={[0, 2.942, 0]}
        scale={[0.512, 0.197, 0.512]}
      >
        <meshPhysicalMaterial
          roughness={0.2}
          metalness={0.8}
          color={circle}
          clearcoat={0.7}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh
        geometry={nodes.gem.geometry}
        position={[0, 3.951, 0]}
        scale={1.018}
      >
        <MeshRefractionMaterial
          envMap={texture}
          toneMapped={false}
          bounces={3}
          aberrationStrength={0.01}
          ior={2.8}
          fresnel={1.0}
          color={gem}
        />
      </mesh>

      <mesh
        geometry={nodes.sticks.geometry}
        position={[0, 3.951, 0]}
        scale={1.018}
      >
        <meshPhysicalMaterial
          metalness={1.0}
          roughness={0.1}
          color={sticks}
          clearcoat={1.0}
          clearcoatRoughness={0.2}
        />
      </mesh>

      <mesh
        geometry={nodes.ring.geometry}
        rotation={[Math.PI / 2, 0, 0]}
        scale={2.228}
      >
        <meshPhysicalMaterial
          roughness={0.05}
          metalness={1.0}
          color={ring}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
};

export default Ring;
