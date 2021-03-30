import React, { useState } from "react";
import { Canvas } from "react-three-fiber";
import { Sky } from "@react-three/drei";
import { Vector3 } from "three";
import Player from "./components/player/Player";
import Terrain from "./components/terrain/Terrain";
import { FPSStats } from "fps-react";

import styles from "./App.module.scss";

function App() {
  const [playerPos, setPlayerPos] = useState(new Vector3(0, 10, 0));
  const [devEnabled, setDevEnabled] = useState(true);

  return (
    <>
      { devEnabled ? <div id={ styles.dev }>
        <FPSStats />
      </div> : null }
      <div id={ styles.app }>
        <Canvas colorManagement>
          <Sky sunPosition={ [100, 20, 100] } />
          <pointLight castShadow intensity={ 0.7 } position={ [100, 100, 100] } />
          <ambientLight intensity={ .3 } />
          <Terrain />
          <Player position={ playerPos } setPosition={ setPlayerPos } />
        </Canvas>
      </div>
    </>
  );
}

export default App;
