import { PointerLockControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useThree, extend } from "react-three-fiber";

extend({PointerLockControls});

const PointerControls = (props: any) => {
    const { camera, gl } = useThree();
    const controls = useRef();

    useEffect(() => {
        document.addEventListener("click", () => {
                console.log("Lock controls!");
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