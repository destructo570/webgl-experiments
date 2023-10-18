import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from 'three'

const Player = () => {
  const [subscribeKeys, getKeys] = useKeyboardControls();
  const player_ref = useRef(null);
  const { rapier, world } = useRapier();
  const [smooth_cam_position] = useState(() => new THREE.Vector3(10,10,10));
  const [smooth_cam_target] = useState(() => new THREE.Vector3());

  const jump = useCallback(() => {
    const { current: body } = player_ref;
    if (body) {
      const origin = body.translation();
      origin.y -= 0.31;
      const direction = { x: 0, y: -1, z: 0 };
      const ray = new rapier.Ray(origin, direction);
      const hit = world.castRay(ray, 10, true);
      if (hit && hit.toi < 0.15) {
        body.applyImpulse({ x: 0, y: 0.5, z: 0 });
      }
    }
  }, [rapier.Ray, world]);

  useEffect(() => {
    const selector = (state) => state.jump;
    const unsubscribeJump = subscribeKeys(selector, (value) => {
      if (value) jump();
    });
    return () => {
      unsubscribeJump();
    };
  }, [jump, subscribeKeys]);

  useFrame((state, delta) => {

    /**
     * Controls
     */
    const { forward, backward, leftward, rightward, jump } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulse_strength = 0.6 * delta;
    const torque_strength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulse_strength;
      torque.x -= torque_strength;
    }
    if (backward) {
      impulse.z += impulse_strength;
      torque.x += torque_strength;
    }
    if (leftward) {
      impulse.x -= impulse_strength;
      torque.z += torque_strength;
    }
    if (rightward) {
      impulse.x += impulse_strength;
      torque.z -= torque_strength;
    }

    if (player_ref.current) {
      player_ref.current.applyImpulse(impulse);
      player_ref.current.applyTorqueImpulse(torque);
    }


    /**
     * Camera
     */

    if(player_ref.current){
      const body_position = player_ref.current.translation();
      const camera_position = new THREE.Vector3();
      camera_position.copy(body_position);
      camera_position.z += 2.25;
      camera_position.y += 0.65;

      const camera_target = new THREE.Vector3();
      camera_target.copy(body_position);
      camera_position.y += 0.25;

      smooth_cam_position.lerp(camera_position, 5*delta);
      smooth_cam_target.lerp(camera_target, 5*delta);

      state.camera.position.copy(smooth_cam_position);
      state.camera.lookAt(smooth_cam_target);
    }
  });

  return (
    <>
      <RigidBody
        ref={player_ref}
        colliders="ball"
        restitution={0.2}
        friction={1}
        position={[0, 1, 0]}
        linearDamping={0.5}
        angularDamping={0.5}
      >
        <mesh castShadow>
          <icosahedronGeometry args={[0.3, 1]} />
          <meshStandardMaterial flatShading color={"mediumpurple"} />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Player;
