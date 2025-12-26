import { service } from "career-feature-protocol/src/service/ServiceType"
import { state } from "career-feature-protocol/src/state/StateType"
import { variableTextData, characterType, rate, getBlockService as getBlockServiceBlockManager, createBlockState as createBlockStateBlockManager, usedGirlEnum } from "types/src/CommonType"

export enum languageVariableKey {
    Description
}

let _getTextDataByVariable = (): variableTextData => {
    return {
        ["Chinese"]: {
            [languageVariableKey.Description]: (value) => `生命上限增加${value}%`
        },
        ["English"]: {
            [languageVariableKey.Description]: (value) => `Maximum health increased by ${value}%`
        }
    }
}

export let getName = () => "IncreaseFullHp"

export let getBlockService: getBlockServiceBlockManager<
    service
> = (api) => {
    return {
        getFeatureData: (api, state) => {
            return {
                name: getName(),
                positive: true,
                characterType: characterType.Both,
                rate: rate.Middle2,
                getDescriptionFunc: (state, value) => {
                    return api.getLanguageDataByData(state, _getTextDataByVariable(), languageVariableKey.Description)(api.NumberUtils.convertDecimalToPercent(value, 3))
                },
                generateRandomValueFunc: (state) => {
                    return api.NumberUtils.getRandomFloat(0.2, 1)
                },
                applyFunc: (state, characterType_, value, name) => {
                    // for debug
                    console.log("debug3", characterType_, value, name)

                    switch (characterType_) {
                        case characterType.LittleMan:
                            state = api.LittleManBuildUtils.setHp(state, (state, hp) => {
                                return hp * (1 + value)
                            }, true)
                            break
                        case characterType.Giantess:
                            state = api.GiantessBuildUtils.setFullHp(state, (state, hp) => {
                                return hp * (1 + value)
                            }, true, usedGirlEnum.PlayerGirl)
                            break
                    }

                    return Promise.resolve(state)
                },
            }
        },
    }
}

export let createBlockState: createBlockStateBlockManager<
    state
> = (api) => {
    return null
}