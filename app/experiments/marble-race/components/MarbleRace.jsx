"use client";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import Lights from "./Lights.jsx";
import Level from "./Level.jsx";
import { Physics } from "@react-three/rapier";
import Player from "./Player.jsx";
const MarbleRace = () => {
  return (
    <>
      <color attach="background" args={["ivory"]} />
      <OrbitControls makeDefault />
      <Physics>
        <Lights />
        <Level count={10} />
        <Player/>
      </Physics>
    </>
  );
};

export default MarbleRace;
