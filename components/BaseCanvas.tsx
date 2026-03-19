"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import Ring from "./3d-models/Ring";
import LoadingScreen from "./LoadingScreen";
import ConfiguratorPanel from "./ConfiguratorPanel";

const BaseCanvas: React.FC = () => {
  return (
    <>
      <LoadingScreen />
      <ConfiguratorPanel />
      <Canvas dpr={[1, 2]} camera={{ position: [0, 3, 14], fov: 25 }}>
        <ambientLight intensity={0.3} />

        <OrbitControls
          makeDefault
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={10}
          maxDistance={20}
          enableDamping={true}
          dampingFactor={0.04}
          enablePan={false}
        />

        <Suspense fallback={null}>
          <Ring />
        </Suspense>

        <Environment preset="studio" environmentIntensity={0.8} />

        <EffectComposer>
          <Bloom
            luminanceThreshold={1.2}
            intensity={0.8}
            levels={6}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default BaseCanvas;
