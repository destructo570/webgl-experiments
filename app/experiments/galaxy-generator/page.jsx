"use client";
import CanvasWrapper from "@/components/canvasWrapper/CanvasWrapper";
import { Canvas, useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import React, { useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";
const Galaxy = (props) => {
  const { params } = props;
  const galaxy_ref = useRef(null);
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(params.count * 3);
  const colors = new Float32Array(params.count * 3);
  const color_inside = new THREE.Color(params.inside_color);
  const color_outside = new THREE.Color(params.outside_color);

  useFrame((state) => {
    if (galaxy_ref?.current) {
      galaxy_ref.current.rotation.y = -(state.clock.elapsedTime * 0.3);
    }
  });

  for (let i = 0; i < params.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * params.radius;
    const spin_angle = radius * params.spin;
    const branch_angle =
      ((i % params.branches) / params.branches) * Math.PI * 2;

    const random_x =
      Math.pow(Math.random(), params.randomness_power) *
      (Math.random() < 0.5 ? 1 : -1);
    const random_y =
      Math.pow(Math.random(), params.randomness_power) *
      (Math.random() < 0.5 ? 1 : -1);
    const random_z =
      Math.pow(Math.random(), params.randomness_power) *
      (Math.random() < 0.5 ? 1 : -1);

    positions[i3 + 0] = Math.cos(branch_angle + spin_angle) * radius + random_x;
    positions[i3 + 1] = random_y;
    positions[i3 + 2] = Math.sin(branch_angle + spin_angle) * radius + random_z;

    //Colors
    const mixed_color = color_inside.clone();
    mixed_color.lerp(color_outside, radius / params.radius);

    colors[i3 + 0] = mixed_color.r;
    colors[i3 + 1] = mixed_color.g;
    colors[i3 + 2] = mixed_color.b;
  }
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: params.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  return (
    <>
      <points ref={galaxy_ref} geometry={geometry} material={material}></points>
    </>
  );
};

const GalaxyGenerator = () => {
  const params = useControls({
    count: { min: 10, max: 100000, value: 1000 },
    size: { min: 0.01, max: 0.2, value: 0.01 },
    radius: { min: 1, max: 100, value: 5 },
    branches: { min: 1, max: 100, value: 3 },
    spin: { min: -10, max: 10, value: -5 },
    randomness: { min: 0, max: 100, value: 0 },
    randomness_power: { min: 1, max: 100, value: 5.9 },
    inside_color: { value: "#ff6030" },
    outside_color: { value: "#1b3984" },
  });
  return (
    <CanvasWrapper>
      <Canvas>
        <OrbitControls makeDefault />
        <Galaxy params={params} />
      </Canvas>
    </CanvasWrapper>
  );
};

export default GalaxyGenerator;
