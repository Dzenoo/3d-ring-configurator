"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import Ring from "./3d-models/Ring";
import LoadingScreen from "./LoadingScreen";

const BaseCanvas: React.FC = () => {
  return (
    <>
      <LoadingScreen />
      <Canvas dpr={[1, 2]} camera={{ position: [5, 5, 10], fov: 29 }}>
        <ambientLight intensity={0.5 * Math.PI} />
        <spotLight decay={0} position={[5, 5, -10]} angle={0.15} penumbra={1} />
        <pointLight decay={0} position={[-10, -10, -10]} />

        <OrbitControls
          makeDefault
          autoRotate
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          minDistance={7.5}
          maxDistance={15}
          enableDamping={true}
          dampingFactor={0.05}
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
          <Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </>
  );
};

export default BaseCanvas;
