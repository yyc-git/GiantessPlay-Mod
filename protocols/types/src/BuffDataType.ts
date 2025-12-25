import { characterType, name, nullable, state, usedGirl } from "./CommonType";

export type singleBuffData = {
    // name: buffName | string,
    name: string,
    imageSrc: string,

    isPositive: boolean,

    characterType: characterType,

    maxSuperPositionCount: number,

    value?: number,

    isWorkInContinueLevels?: boolean,


    getDescriptionFunc: (state: state, superPositionCount: number, sumValue: number) => string,

    applyFunc: (state: state, name: name, usedGirl: nullable<usedGirl>, superPositionCount: number, sumValue: number) => Promise<state>,
    deapplyFunc: (state: state, name: name, usedGirl: nullable<usedGirl>, superPositionCount: number, sumValue: number) => Promise<state>,

    removeFunc?: (state: state, name: name, usedGirl: nullable<usedGirl>, superPositionCount: number, sumValue: number) => Promise<state>,
}