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

  const { rotation_speed, wireframe } = useControls("Shapes", {
    rotation_speed: {
      value: 0.5,
      min: -10,
      max: 10,
      step: 0.1,
    },
    wireframe: false,
  });

  const renderMaterial = (props) => {
    return <meshStandardMaterial {...props} wireframe={wireframe} />;
  };

  useFrame((state, delta) => {
    cube_ref.current.rotation.x += delta * rotation_speed;
    sphere_ref.current.rotation.x += delta * rotation_speed;
    torus_ref.current.rotation.x += delta * rotation_speed;
    torus_knot_ref.current.rotation.x += delta * rotation_speed;
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
  const { position, intensity, enabled, color, decay } = useControls(
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
      decay: {
        value: 0.6,
        min: -2,
        max: 2,
        step: 0.01,
      }
    },
    { collapsed: true }
  );
  return (
    <pointLight
      position={[position.x, position.y, position.z]}
      intensity={intensity}
      isLight={enabled}
      color={color}
      decay={decay}
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
    },
    { collapsed: true }
  );
  return (
    <ambientLight
      intensity={intensity}
      isAmbientLight={enabled}
      color={color}
    />
  );
};

const HemiSphereLight = () => {
  const { intensity, enabled, color, ground_color, position } = useControls(
    "HemiSphere Light",
    {
      enabled: false,
      intensity: {
        value: 1.0,
        min: 0,
        max: 100,
        step: 0.1,
      },
      color: "#f44369",
      ground_color: "#413d9a",
      position: {
        x: 10,
        y: 10,
        z: 10,
      },
    },
    { collapsed: true }
  );
  return (
    <hemisphereLight
      intensity={intensity}
      isHemisphereLight={enabled}
      position={[position.x, position.y, position.z]}
      groundColor={ground_color}
      color={color}
    />
  );
};

const SpotLight = () => {
  const { intensity, enabled, color, position } = useControls(
    "Spot Light",
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
    },
    { collapsed: true }
  );
  return (
    <spotLight
      intensity={intensity}
      isSpotLight={enabled}
      position={[position.x, position.y, position.z]}
      color={color}
    />
  );
};

const RectAreaLight = () => {
  const { intensity, enabled, color, position } = useControls(
    "React Area Light",
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
    },
    { collapsed: true }
  );
  return (
    <rectAreaLight
      intensity={intensity}
      isRectAreaLight={enabled}
      position={[position.x, position.y, position.z]}
      color={color}
    />
  );
};

const BasicLight = () => {
  return (
    <CanvasWrapper>
      <Canvas
        camera={{
          position: [50, 20, 40],
        }}
      >
        <GetShapes />
        <mesh position={[5, -10, 0]} rotation={[300, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial side={DoubleSide} />
        </mesh>
        <OrbitControls />
        <DirectionalLight />
        <PointLight />
        <AmbientLight />
        <HemiSphereLight />
        <SpotLight />
        <RectAreaLight />
      </Canvas>
    </CanvasWrapper>
  );
};

export default BasicLight;
