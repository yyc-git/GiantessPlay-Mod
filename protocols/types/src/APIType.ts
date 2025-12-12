import { characterType, nullable, state, usedGirl } from "./CommonType"
import { careerFeatureName } from "career-feature-protocol/src/service/ServiceType"
import { blockName } from "./ModType"

type NumberUtils = {
    convertDecimalToPercent: (value: number, digit?: number) => number,
    getRandomFloat: (start: number, end: number) => number,
}

type MutableRecordUtils = {
    createFromObject: (obj: Object) => Object,
}

type computeFunc = (state: state, value: number) => number

type LittleManBuildUtils = {
    setHp: (state: state, computeFunc: computeFunc, isSetToFullHp: boolean) => state,
}

type GiantessBuildUtils = {
    setFullHp: (state: state, computeFunc: computeFunc, isSetToFullHp: boolean, usedGirl: usedGirl) => state,
}

type eventName = string

export type customEvent = {
    name: eventName,
    userData: nullable<any>
}

export type eventHandler = (api: api, state: state, customEvent: customEvent) => Promise<state>

export type eventAPI = {
    // on: (state: state, name: eventName, handler: eventHandler) => state,
    onWithUserData: (state: state, name: eventName, handler: any) => state,
    // onForGetData: (state: state, name: eventName, handler: any) => state,
    // onByReadWriteState: (state: state, name: eventName, handler: any) => state,
    // // off: (state: state, name: eventName, handler: eventHandler) => state,
    // offAll: (state: state, name: eventName) => state,
    // trigger: any,

    getLoadWholeResourceEventName: () => eventName,
    getPlayIndexSoundEventName: () => eventName,
    getStopIndexSoundEventName: () => eventName,


    getLoadSceneResourceEventName: () => eventName,
    getInitWhenImportSceneEventName: () => eventName,
    getUpdateEventName: () => eventName,
    getDisposeEventName: () => eventName,
    getHandleGiantessRemainHpEventName: () => eventName,
    getHandleDamageGiantessEventName: () => eventName,
    getHandleDamageLittleManEventName: () => eventName,
    getHandleDamageArmyEventName: () => eventName,
    getHandleAfterDamageLittleManEventName: () => eventName,
    getHandleAfterDamageGiantessEventName: () => eventName,
    getHandleAfterUsePropEventName: () => eventName,
    // getLevelGiantessDestoyedEventName: () => eventName,
    // getEnemyGiantessDestoyedEventName: () => eventName,
    getLevelGiantessDestoyedEventName: () => eventName,
    getBossDestroyedEventName: () => eventName,
    getBeforeAddGirlEventName: () => eventName,
    getAfterRemoveGirlEventName: () => eventName,
    getGenerateArmyEventName: () => eventName,
    getUpdateUIEventName: () => eventName,
    getMissionFinishEventName: () => eventName,
    getGetLittleManValueEventName: () => eventName,
    getGiantessStressingEventName: () => eventName,
    getGiantessExcitementEventName: () => eventName,
    getGiantessClimaxEventName: () => eventName,
    getGenerateLittleManRandomCareerEventName: () => eventName,
    getGenerateGiantessRandomCareerEventName: () => eventName,
    getTriggerPlayerGirlEatHandlerEventName: () => eventName,
    getPickPropRangeDistanceFactorForLittleManEventName: () => eventName,
    getGetPropEventName: () => eventName,
    getStompHitTerrainEventName: () => eventName,
    getStartKeepStompEventName: () => eventName,
    getEndStompBackEventName: () => eventName,
    getFirstStartKeepLeftStompEventName: () => eventName,
    getEndLeftStompBackEventName: () => eventName,
    getInsertEventName: () => eventName,
    getPutToBreastEventName: () => eventName,
    getPutToShoeEventName: () => eventName,
    getPickupEventName: () => eventName,
    getStartKeepBreastPressEventName: () => eventName,
    getEndBreastPressBackEventName: () => eventName,
    getFreeUBEventName: () => eventName,
    getFreeShoeEventName: () => eventName,
    getRemovePickDataEventName: () => eventName,
    getRemoveBreastDataEventName: () => eventName,
    getRemoveShoeDataEventName: () => eventName,
    getRemoveUBDataEventName: () => eventName,



    getKeydownEventName: () => eventName,
    getKeyupEventName: () => eventName,
    getPointdownEventName: () => eventName,
    getPointupEventName: () => eventName,
}

export type blockAPI = {
    getBlockState<blockState>(state: state, blockProtocolName: string, blockName: string): blockState,
    setBlockState<blockState>(state: state, blockProtocolName: string, blockName: string, blockState: blockState): state,

    getBlockService<blockService>(state: state, blockProtocolName: string, blockName: string): blockService,

    getAllBlockServiceFuncWithDefault<blockService>(state: state, func: (service: blockService) => any, blockProtocolName: string, defaultValue: any): any,
}

export type api = {
    NumberUtils: NumberUtils,
    MutableRecordUtils: MutableRecordUtils,

    block: blockAPI,
    event: eventAPI,

    LittleManBuildUtils: LittleManBuildUtils,
    GiantessBuildUtils: GiantessBuildUtils,

    getLanguageDataByData: (state: state, data: any, key: number) => any,
    getCareerFeatureName: (api: api, state: state, blockName: blockName) => careerFeatureName,
    isOtherCharacterTypeApplied: (api: api, state: state, characterType: characterType, name: careerFeatureName) => boolean,
}