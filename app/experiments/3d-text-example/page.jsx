"use client";
import CanvasWrapper from "@/components/canvasWrapper/CanvasWrapper";
import React, { useEffect, useRef } from "react";
import {
  Center,
  OrbitControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Perf } from "r3f-perf";
import { getRandomPosition, getRandomRotation } from "@/utils/utils";
import * as THREE from "three";

const torus_geometry = new THREE.TorusGeometry(1, 0.4, 32, 64);
const material = new THREE.MeshMatcapMaterial();

const Text = ({ texture }) => {
  return (
    <Text3D
      font={"/fonts/helvetiker_regular.typeface.json"}
      size={0.75}
      height={0.2}
      curveSegments={12}
      bevelEnabled={true}
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
    >
      React 3 Fiber
      <meshMatcapMaterial matcap={texture} />
    </Text3D>
  );
};

const Donut = (props) => {
    const { texture } = props;
  return (
    <mesh {...props} geometry={torus_geometry}>
      <meshMatcapMaterial matcap={texture} />
    </mesh>
  );
};

const Scene = () => {
  const [matcapTexture] = useMatcapTexture("8A6565_2E214D_D48A5F_ADA59C", 256);
    const donutGroup = useRef(null);

    useFrame((_, delta)=>{
        for(const donut of donutGroup.current.children){
            donut.rotation.y += delta * 0.1;
        }
    })
  useEffect(() => {
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, [matcapTexture]);

  const renderDonuts = () => {
    const donuts = [...Array(100)];
    return donuts.map((_, index) => {
      let scale = 0.2 + Math.random() * 0.2;
      return (
        <Donut
          key={`donut_${index + 1}`}
          scale={scale}
          rotation={getRandomRotation(0, Math.PI)}
          position={getRandomPosition(20)}
          texture={matcapTexture}
        />
      );
    });
  };
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <Center>
        <Text texture={matcapTexture} />
      </Center>
      <group ref={donutGroup}>
        {renderDonuts()}
      </group>
    </>
  );
};

const Page = () => {
  return (
    <CanvasWrapper>
      <Canvas>
        <React.Suspense fallback={<></>}>
          <Scene />
        </React.Suspense>
      </Canvas>
    </CanvasWrapper>
  );
};

export default Page;
