import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import React, { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const box_geometry = new THREE.BoxGeometry(1, 1, 1);
const floor1Material = new THREE.MeshStandardMaterial({ color: "limegreen" });
const floor2Material = new THREE.MeshStandardMaterial({ color: "greenyellow" });
const obstacleMaterial = new THREE.MeshStandardMaterial({ color: "orangered" });
const wallMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export const TrapSpinner = (props) => {
  const { position = [0, 0, 0] } = props;
  const obstacle = useRef();
  const [speed] = useState(
    () => (2 + Math.random()) * (Math.random() < 0.5 ? -1 : 1)
  );
  useFrame((state, delta) => {
    let time = state.clock.elapsedTime;
    const eulerRotation = new THREE.Euler(0, time * speed, 0);
    const quaternion = new THREE.Quaternion();
    quaternion.setFromEuler(eulerRotation);
    obstacle?.current?.setNextKinematicRotation(quaternion);
  });
  return (
    <group position={position}>
      <mesh
        geometry={box_geometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.1}
        friction={0}
      >
        <mesh
          geometry={box_geometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
};

export const TrapLimbo = (props) => {
  const { position = [0, 0, 0] } = props;
  const obstacle = useRef(null);
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    let time = state.clock.elapsedTime;
    const y = Math.sin(time + timeOffset) + 1.15;
    if(obstacle.current){
      obstacle.current.setNextKinematicTranslation({
        x: position[0],
        y: position[1] + y,
        z: position[2],
      });
    }
  });
  return (
    <group position={position}>
      <mesh
        geometry={box_geometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.1}
        friction={0}
      >
        <mesh
          geometry={box_geometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
};

export const TrapAxe = (props) => {
  const { position = [0, 0, 0] } = props;
  const obstacle = useRef(null);
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2);
  useFrame((state) => {
    let time = state.clock.elapsedTime;
    const x = Math.sin(time + timeOffset) * 1.25;
    if(obstacle.current){
      obstacle.current.setNextKinematicTranslation({
        x: position[0] + x,
        y: position[1] + 0.75,
        z: position[2],
      });
    }
  });
  return (
    <group position={position}>
      <mesh
        geometry={box_geometry}
        material={floor2Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
      <RigidBody
        ref={obstacle}
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.1}
        friction={0}
      >
        <mesh
          geometry={box_geometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
          receiveShadow
          castShadow
        />
      </RigidBody>
    </group>
  );
};

export const BlockStart = (props) => {
  const { position = [0, 0, 0] } = props;
  return (
    <group position={position}>
      <mesh
        geometry={box_geometry}
        material={floor1Material}
        position={[0, -0.1, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
};
export const BlockEnd = (props) => {
  const { position = [0, 0, 0] } = props;
  return (
    <group position={position}>
      <mesh
        geometry={box_geometry}
        material={floor1Material}
        position={[0, 0, 0]}
        scale={[4, 0.2, 4]}
        receiveShadow
      />
    </group>
  );
};

const Bound = ({ length = 1 }) => {
  return (
    <>
      <RigidBody type="fixed" friction={0} restitution={0.2}>
        <mesh
          geometry={box_geometry}
          material={wallMaterial}
          position={[2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, length * 4]}
          castShadow
        />
        <mesh
          geometry={box_geometry}
          material={wallMaterial}
          position={[-2.15, 0.75, -(length * 2) + 2]}
          scale={[0.3, 1.5, length * 4]}
          receiveShadow
        />
        <mesh
          geometry={box_geometry}
          material={wallMaterial}
          position={[0, 0.75, -(length * 4) + 2]}
          scale={[4, 1.5, 0.3]}
          receiveShadow
        />
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length*2)+2]}
          restitution={0.2}
          friction={1}
        />
      </RigidBody>
    </>
  );
};

const Level = ({ count = 5, types = [TrapAxe, TrapLimbo, TrapSpinner] }) => {
  const traps = useMemo(() => {
    let result = [];
    for (let i = 0; i < count; i++) {
      let trap_type = Math.floor(Math.random() * types?.length);
      result.push(types[trap_type]);
    }
    return result;
  }, [count, types]);
  return (
    <>
      <BlockStart position={[0, 0, 0]} />
      {traps.map((Trap, index) => {
        return <Trap key={index} position={[0, 0, -(index + 1) * 4]} />;
      })}
      <BlockEnd position={[0, 0, -(count + 1) * 4]} />
      <Bound length={count + 2} />
    </>
  );
};

export default Level;
