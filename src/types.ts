export type OptionsProps = {
    [key: string]: boolean
}
export type LayerProps = {
    x: number,
    z: number,
    width: number,
    depth: number,
    direction: string
}
export type OverhangProps = {
    x: number,
    z: number,
    width: number,
    depth: number
}
export type BoxProps = {
    x: number,
    y: number,
    z: number,
    width: number,
    depth: number,
    falls: boolean
}
export type CutProps = {
	topLayer: any,
	overlap: any,
	size: any,
	delta: any
}