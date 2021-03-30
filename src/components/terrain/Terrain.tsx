import React from "react";
import { Vector3 } from "three";
import Block from "./Block";


const Terrain = () => {
    const blocklist = []

    for (let blockX = -2; blockX < 2; blockX++) {
        for (let blockZ = -2; blockZ < 2; blockZ++) {
            blocklist.push(<Block position={ new Vector3(blockX, -1, blockZ) } id={ 1 } key={ blockX * blockZ * Math.random() + Math.random() * 20 } />);
        }
    }
    console.log(blocklist);

    return (
        <>
            { blocklist }
        </>
    );
}

export default Terrain;