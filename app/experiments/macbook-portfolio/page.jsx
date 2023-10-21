"use client";
import React from "react";
import {
  PresentationControls,
  Float,
  Environment,
  useGLTF,
  ContactShadows,
  Html,
  Text,
} from "@react-three/drei";
import CanvasWrapper from "@/components/canvasWrapper/CanvasWrapper";
import { Canvas } from "@react-three/fiber";
import './styles.css';

const Macbook = () => {
  const macbook = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );

  return (
    <>
      <primitive object={macbook.scene} position-y={-1.2}>
        <Html
          transform
          className="portfolio-html"
          distanceFactor={1.17}
          position={[0, 1.56, -1.4]}
          rotation-x={-0.256}
        >
          <iframe src="https://www.destructo.dev" />
        </Html>
      </primitive>
    </>
  );
};

const page = () => {
  return (
    <CanvasWrapper className="mac-portfolio">
      <Canvas
        camera={{
          fov: 45,
          near: 0.1,
          far: 2000,
          position: [-3, 1.5, 4],
        }}
      >
        <Environment preset="city" />
        <color attach="background" args={["#0b0c0f"]} />
        <PresentationControls
          global
          rotation={[0.13, 0.1, 0]}
          polar={[-0.4, 0.2]}
          azimuth={[-1, 0.75]}
          config={{ mass: 2, tension: 400 }}
          snap={{ mass: 4, tension: 400 }}
        >
          <Float rotationIntensity={0.4}>
            <rectAreaLight
              width={2.5}
              height={1.65}
              intensity={65}
              color={"#2c5938"}
              rotation={[0.1, Math.PI, 0]}
              position={[0, 0.55, -1.15]}
            />
            <Macbook />
            <Text
              font="/fonts/bangers-v20-latin-regular.woff"
              size={1}
              position={[2, 0.75, 0.75]}
              rotation-y={-1.25}
              maxWidth={2}
            >
              VISHAL KASHI
            </Text>
          </Float>
        </PresentationControls>
        <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
      </Canvas>
    </CanvasWrapper>
  );
};

export default page;
