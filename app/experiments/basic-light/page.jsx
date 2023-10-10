"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import CanvasWrapper from "@/components/canvasWrapper/CanvasWrapper";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide } from "three";

function GetShapes(props) {
  const cube_ref = useRef(null);
  const sphere_ref = useRef(null);
  const torus_ref = useRef(null);
  const torus_knot_ref = useRef(null);

  const renderMaterial = (props) => {
    return <meshStandardMaterial {...props} />;
  };

  useFrame((state, delta) => {
    cube_ref.current.rotation.x += delta * 0.5;
    sphere_ref.current.rotation.x += delta * 0.5;
    torus_ref.current.rotation.x += delta * 0.5;
    torus_knot_ref.current.rotation.x += delta * 0.5;
  });
  return (
    <>
      <mesh ref={cube_ref} position={[-10, 0, 0]}>
        <boxGeometry args={[6, 6, 6]} />
        {renderMaterial()}
      </mesh>
      <mesh ref={sphere_ref} position={[0, 0, 0]}>
        <sphereGeometry args={[4, 32, 64]} />
        {renderMaterial()}
      </mesh>
      <mesh ref={torus_ref} position={[10, 0, 0]}>
        <torusGeometry args={[2.5, 1, 16, 50]} />
        {renderMaterial()}
      </mesh>
      <mesh ref={torus_knot_ref} position={[20, 0, 0]}>
        <torusKnotGeometry args={[2, 1, 100, 16]} />
        {renderMaterial()}
      </mesh>
    </>
  );
}

const BasicLight = () => {
  return (
    <CanvasWrapper>
      <Canvas
        gl={{
          antialias: true,
        }}
      >
        <OrbitControls />
        {/* <ambientLight /> */}
        {/* <pointLight position={[10, 10, 10]} /> */}
        <directionalLight position={[10, 10, 10]} />
        <GetShapes />
        <mesh position={[5, -10, 0]} rotation={[300, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>
      </Canvas>
    </CanvasWrapper>
  );
};

export default BasicLight;
