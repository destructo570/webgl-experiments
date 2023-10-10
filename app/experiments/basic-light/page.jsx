"use client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import CanvasWrapper from "@/components/canvasWrapper/CanvasWrapper";
import { OrbitControls } from "@react-three/drei";
import { DoubleSide } from "three";
import { useControls } from "leva";

function GetShapes() {
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

const DirectionalLight = () => {
  const { position, intensity, enabled, color } = useControls(
    "Directional Light",
    {
      enabled: true,
      intensity: {
        value: 1.0,
        min: 0,
        max: 100,
        step: 0.1,
      },
      color: "white",
      position: {
        x: 10,
        y: 10,
        z: 10,
      },
    }
  );
  return (
    <directionalLight
      position={[position.x, position.y, position.z]}
      intensity={intensity}
      isDirectionalLight={enabled}
      color={color}
    />
  );
};

const PointLight = () => {
  const { position, intensity, enabled, color } = useControls(
    "Point Light",
    {
      enabled: false,
      intensity: {
        value: 1.0,
        min: 0,
        max: 100,
        step: 0.1,
      },
      color: "white",
      position: {
        x: 10,
        y: 10,
        z: 10,
      },
    }
  );
  return (
    <pointLight
      position={[position.x, position.y, position.z]}
      intensity={intensity}
      isLight={enabled}
      color={color}
    />
  );
};

const AmbientLight = () => {
  const { intensity, enabled, color } = useControls(
    "Ambient Light",
    {
      enabled: false,
      intensity: {
        value: 1.0,
        min: 0,
        max: 100,
        step: 0.1,
      },
      color: "white",
    }
  );
  return (
    <ambientLight
      intensity={intensity}
      isAmbientLight={enabled}
      color={color}
    />
  );
};

const BasicLight = () => {
  return (
    <CanvasWrapper>
      <Canvas>
        <OrbitControls />
        <DirectionalLight />
        <PointLight />
        <AmbientLight />
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
