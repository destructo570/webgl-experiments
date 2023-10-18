"use client";
import React from "react";
import CanvasWrapper from "@/components/canvasWrapper/CanvasWrapper";
import { Canvas } from "@react-three/fiber";
import MarbleRace from "./components/MarbleRace";
import { KeyboardControls } from "@react-three/drei";
import './styles.css';
import Interface from "./components/Interface";

const Page = () => {
  return (
    <KeyboardControls map={[
      {name: 'forward', keys: ['ArrowUp', 'KeyW']},
      {name: 'backward', keys: ['ArrowDown', 'KeyS']},
      {name: 'leftward', keys: ['ArrowLeft', 'KeyA']},
      {name: 'rightward', keys: ['ArrowRight', 'KeyD']},
      {name: 'jump', keys: ['Space']},
    ]}>
      <CanvasWrapper className='marbel-race'>
        <Canvas>
          <React.Suspense fallback={<></>}>
            <MarbleRace />
          </React.Suspense>
        </Canvas>
      </CanvasWrapper>
      <Interface/>
    </KeyboardControls>
  );
};

export default Page;
