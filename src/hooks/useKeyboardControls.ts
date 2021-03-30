import { useEffect, useState } from "react";
import { useStorage } from "./useStorage";

type KeyProp = {
    [key: string]: string
}

const keyHandler = (key: string) => {
    const keys: KeyProp = {
        "KeyW": "moveForward",
        "KeyS": "moveBackward",
        "KeyA": "moveLeft",
        "KeyD": "moveRight",
        "Space": "jump"
    };
    return keys[key];
}

export const useKeyboardControls = () => {
    const [movement, setMovement] = useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false,
        jump: false,
    });
    const [setTexture] = useStorage((state) => [state.setTexture]);

    useEffect(() => {
        const handleKeyDown = (e: { code: string}) => {
            if (keyHandler(e.code)) {
            setMovement((state) => ({
                ...state,
                [keyHandler(e.code)]: true,
            }));
            }
        };

        const handleKeyUp = (e: { code: string}) => {
            if (keyHandler(e.code)) {
            setMovement((state) => ({
                ...state,
                [keyHandler(e.code)]: false,
            }));
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [setTexture]);

    return movement;
  };