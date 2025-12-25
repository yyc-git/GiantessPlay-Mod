import { box3, characterType, collisionPart, damagePart, damageType, forceSize, matrix4, name, nullable, state, usedGirl, vector3 } from "./CommonType"
import { careerFeatureName, careerFeatureValue } from "career-feature-protocol/src/service/ServiceType"
import { blockName } from "./ModType"
import { weaponValue } from "./ValueType"

type NumberUtils = {
    convertDecimalToPercent: (value: number, digit?: number) => number,
    getRandomFloat: (start: number, end: number) => number,

    randomSelect,
    getRandomInteger,
}

type MutableRecordUtils = {
    createFromObject: (obj: Object) => Object,

    remove,
    set,
    create,
    get,
}

type NullableUtils = {
    getExn: <T>(nullableValue: nullable<T>) => T,
    return_: <T>(value: T) => nullable<T>,
    isNullable: <T>(nullableValue: nullable<T>) => boolean,
    getWithDefault: <T>(nullableValue: nullable<T>, default_: T) => T,
    getWithDefaultFunc: <T>(nullableValue: nullable<T>, getDefaultFunc: () => T) => T,
    getEmpty: <T>() => nullable<T>,

    map,
}

type computeFunc = (state: state, value: number) => number

type LittleManBuildUtils = {
    setHp: (state: state, computeFunc: computeFunc, isSetToFullHp: boolean) => state,
}

type GiantessBuildUtils = {
    setFullHp: (state: state, computeFunc: computeFunc, isSetToFullHp: boolean, usedGirl: usedGirl) => state,
}

type eventName = string

export type customEvent<userData> = {
    name: eventName,
    userData: nullable<userData>
}

export type eventHandler = (api: api, state: state, customEvent: customEvent<any>) => Promise<state>

export type handleDamageArmyEventNameUserData = {
    forceSize: forceSize,
    damage: number,
    damageType: damageType,
    fromName: string,
    name: string,
    transform: matrix4,
    box: box3,
    damagePosition: vector3,
    weaponValue: weaponValue
}

export type handleDamageGiantessEventNameUserData = {
    usedGirl: usedGirl,
    forceSize: forceSize,
    damage: number,
    damageType: damageType,
    fromName: string,
    name: string,
    box: box3,
    damagePosition: vector3,
    damagePartByJudge: damagePart,
    actuallyDamagePartsByJudge: Array<damagePart>,
    collisionPart: collisionPart,
    weaponValue: weaponValue
}

export type eventAPI = {
    on: (state: state, name: eventName, handler: eventHandler) => state,
    onWithUserData: (state: state, name: eventName, handler: eventHandler) => state,
    // onForGetData: (state: state, name: eventName, handler: any) => state,
    // onByReadWriteState: (state: state, name: eventName, handler: any) => state,
    // // off: (state: state, name: eventName, handler: eventHandler) => state,
    offAll: (state: state, name: eventName) => state,
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
    NullableUtils: NullableUtils,

    block: blockAPI,
    event: eventAPI,

    /**
     * Operate LittleMan attribute
     */
    LittleManBuildUtils: LittleManBuildUtils,
    /**
     * Operate Giantess attribute
     */
    GiantessBuildUtils: GiantessBuildUtils,

    getLanguageDataByData: (state: state, data: any, key: number) => any,
    getCareerFeatureName: (api: api, state: state, blockName: blockName) => careerFeatureName,
    /**
     * This function is used to avoid bind the same events multiple times for characterType.Both
     */
    isOtherCharacterTypeApplied: (api: api, state: state, characterType: characterType, name: careerFeatureName) => boolean,
    isUseCareerFeature: (state: state, fromName: string, careerFeatureName: careerFeatureName) => boolean,
    getRealTotalCoin: (state: state) => number,
    //     /**
    //  * Represents a book.
    //  * @param state - The title of the book.
    //  * @param careerFeatureName - The author of the book.
    //  */
    getCareerFeatureValue: (state: state, name: name, careerFeatureName: careerFeatureName) => careerFeatureValue,



    addBuff,
    getLittleManName,
    girl,
    littleMan,
    findBuff,
    isNotMaxForce,


}