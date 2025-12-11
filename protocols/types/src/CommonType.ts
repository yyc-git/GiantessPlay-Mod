import { api } from "./APIType"

export type state = any

export enum language {
    Chinese = "Chinese",
    English = "English"
}

export type variableTextData = Record<language, Record<any, (value: string) => string>>

export type textData = Record<language, Record<any, string>>

export enum characterType {
    Giantess,
    LittleMan,
    Both,
    GiantessOrNone,
    LittleManOrNone,
    BothOrNone,
    None,
}

export enum rate {
    Zero = 0,
    VeryLow2 = 0.03,
    VeryLow1 = 0.04,
    VeryLow = 0.05,
    Low1 = 0.07,
    Low = 0.1,
    Middle1 = 0.2,
    Middle2 = 0.3,
    Middle3 = 0.4,
    High = 0.5,
    VeryHigh1 = 0.6,
    VeryHigh = 0.7,
    Must = 1,
}

export enum needGem {
    Zero = 0,
    // VeryLow = 500,
    // // Low = 5000,
    // Low = 1000,
    // // Middle = 10000,
    // Middle = 2000,
    // // High = 20000,
    // // VeryHigh = 40000,
    // // MostHigh = 80000,
    // High = 4000,
    // VeryHigh = 8000,

    // MostHigh = 50000,
    VeryLow = 250,
    // Low = 5000,
    Low = 500,
    // Middle = 10000,
    Middle = 1000,
    // High = 20000,
    // VeryHigh = 40000,
    // MostHigh = 80000,
    High = 2000,
    VeryHigh = 4000,
    VeryHigh2 = 6000,
    VeryHigh3 = 8000,

    // MostHigh = 80000,
    // MostHigh = 50000,
    MostHigh = 10000,
}

export type getBlockService<blockService> = (api: api) => blockService

export type createBlockState<blockState> = (api: api) => blockState

export type nullable<Value extends any> = Value | null | undefined

export type strictNullable<Value extends any> = Value | null


export enum usedGirlEnum {
    None = "None",
    PlayerGirl = "PlayerGirl",
    WildGiantess = "WildGiantess",
    EnemyGiantess = "EnemyGiantess",
    PlayerGoddess = "PlayerGoddess",
    BossGiantess = "BossGiantess",
}

export type usedGirl = usedGirlEnum | string