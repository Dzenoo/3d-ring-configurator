"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import Ring from "./3d-models/Ring";
import LoadingScreen from "./LoadingScreen";
import { Leva } from "leva";

const BaseCanvas: React.FC = () => {
  return (
    <>
      <LoadingScreen />
      <Canvas
        gl={{ antialias: true }}
        dpr={[1, 2]}
        camera={{ position: [5, 5, 10], fov: 29 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 7.5]} intensity={5} />

        <OrbitControls
          autoRotate
          minDistance={7.5}
          maxDistance={15}
          enableDamping={true}
          enablePan={false}
        />

        <Suspense fallback={null}>
          <Ring />
        </Suspense>

        <Environment
          preset="apartment"
          background={false}
          environmentIntensity={1}
        />

        <EffectComposer>
          <Bloom
            intensity={0.25}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.1}
          />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default BaseCanvas;
