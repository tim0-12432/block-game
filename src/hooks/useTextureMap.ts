import grassTop from "./../resources/textures/terrain/grass-top.png";
import grassSide from "./../resources/textures/terrain/grass-side.png";
import stone from "./../resources/textures/terrain/stone.png";

type Map = {
    [key: number]: Items
}
type Items = {
    [index: number]: {
        name: string,
        texture: string
    }
}

const TEXTURE_MAP: Map = {
    1: [
        {
            name: "grass-top",
            texture: grassTop
        },
        {
            name: "grass-side",
            texture: grassSide
        }
    ],
    2: [{
        name: "stone",
        texture: stone
    }]
} as const;

export const getTexture = (id: number): string => {
    if (id in TEXTURE_MAP) {
        const map = TEXTURE_MAP[id]
        return map[0].texture;
    } else {
        return TEXTURE_MAP[1][0].texture;
    }
}