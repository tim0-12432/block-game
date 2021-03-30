import { PointerLockControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThree, extend } from "react-three-fiber";

extend({PointerLockControls});

const PointerControls = (props: any) => {
    const { camera, gl } = useThree();
    const controls = useRef<any>();

    useEffect(() => {
        document.addEventListener("click", () => {
            controls.current.lock();
        });
    }, [])

    return (
        <PointerLockControls
            ref={ controls }
            args={ [camera, gl.domElement] }
            { ...props }
        />
    );
}

export default PointerControls;