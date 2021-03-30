import { useEffect, useRef } from "react";
import { useFrame, useThree } from "react-three-fiber";
import { useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import { useKeyboardControls } from "../../hooks/useKeyboardControls";
import PointerControls from "./PointerControls";

const SPEED = 1;

const Player = ({ position, setPosition }: any) => {
    const { camera } = useThree();

    const {
        moveForward,
        moveBackward,
        moveLeft,
        moveRight,
        jump,
    } = useKeyboardControls();
      
    const [ref, api] = useSphere(() => ({
        mass: 1,
        type: "Dynamic",
        position: position
    }));

    const velocity = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (velocity.current = v));
    }, [api.velocity]);

    useFrame(() => {
            camera.position.copy(new Vector3(
                ref.current !== undefined ? ref.current.position.x : 0,
                ref.current !== undefined ? ref.current.position.y + 1 : 0,
                ref.current !== undefined ? ref.current.position.z : 0
        ));

        const frontVector = new Vector3(
            0, 0, (moveBackward ? 1 : 0) - (moveForward ? 1 : 0),
        );
        const sideVector = new Vector3(
            (moveLeft ? 1 : 0) - (moveRight ? 1 : 0), 0, 0,
        );

        const direction = new Vector3();
        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(SPEED)
            .applyEuler(camera.rotation);
        
        api.velocity.set(direction.x, velocity.current[1], direction.z);

        if (jump && (Math.abs(Number(velocity.current[1].toFixed(2))) < 0.05)) {
            api.velocity.set(velocity.current[0], 8, velocity.current[2]);
        }
    });

    return (
        <>
            <PointerControls />
            <mesh ref={ ref } />
        </>
    );
}

export default Player;