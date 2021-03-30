import { useRef } from "react";
import { NearestFilter, TextureLoader } from "three";
import { getTexture } from "../../hooks/useTextureMap";

type Props = {
    position: any,
    id: number
}

const Block = ({ position, id }: Props) => {
    const ref = useRef(null);
    const texture = new TextureLoader().load(getTexture(id));
    texture.magFilter = NearestFilter;
    return (
        <mesh ref={ ref } position={ position } receiveShadow>
            <boxBufferGeometry attach="geometry" args={ [1, 1, 1] } />
            <meshStandardMaterial attach="material" color="white" map={ texture } />
        </mesh>
    );
}

export default Block;