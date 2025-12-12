import { service, category } from "career-feature-protocol/src/service/ServiceType"
import { state } from "career-feature-protocol/src/state/StateType"
import { api, customEvent, handleDamageArmyEventNameUserData, handleDamageGiantessEventNameUserData } from "types/src/APIType"
import { variableTextData, characterType, rate, getBlockService as getBlockServiceBlockManager, createBlockState as createBlockStateBlockManager } from "types/src/CommonType"

export enum languageVariableKey {
    Description
}

let _getTextDataByVariable = (): variableTextData => {
    return {
        ["Chinese"]: {
            [languageVariableKey.Description]: (value) => `每持有50金币，伤害增加${value}%`
        },
        ["English"]: {
            [languageVariableKey.Description]: (value) => `For every 50 coins held, damage increases by ${value}%`
        }
    }
}

let _handleDamageHandlerForIncreaseDamageByCoin = (api: api, state: state, data: customEvent<handleDamageArmyEventNameUserData | handleDamageGiantessEventNameUserData>) => {
    let userData = api.NullableUtils.getExn(data.userData)
    let careerFeatureName_ = getName()

    if (
        api.isUseCareerFeature(state, userData.fromName, careerFeatureName_)
    ) {
        userData = {
            ...userData,
            damage: userData.damage * (1 + (api.getRealTotalCoin(state) / 50) * api.getCareerFeatureValue(state, careerFeatureName_))
        }
    }

    return Promise.resolve([state, userData])
}

export let getName = () => "IncreaseDamageByCoin"

export let getBlockService: getBlockServiceBlockManager<
    service
> = (api) => {
    return {
        getFeatureData: (api, state) => {
            return {
                name: getName(),
                positive: true,
                category: category.Mechanism,
                characterType: characterType.Both,
                rate: rate.Middle2,
                getDescriptionFunc: (state, value) => {
                    return api.getLanguageDataByData(state, _getTextDataByVariable(), languageVariableKey.Description)(api.NumberUtils.convertDecimalToPercent(value, 3))
                },
                generateRandomValueFunc: (state) => {
                    return api.NumberUtils.getRandomFloat(0.0025, 0.01)
                },
                applyFunc: (state, characterType_, value, name) => {
                    if (api.isOtherCharacterTypeApplied(api, state, characterType_, name)) {
                        return Promise.resolve(state)
                    }

                    state = api.event.onWithUserData(state, api.event.getHandleDamageArmyEventName(), _handleDamageHandlerForIncreaseDamageByCoin)
                    state = api.event.onWithUserData(state, api.event.getHandleDamageGiantessEventName(), _handleDamageHandlerForIncreaseDamageByCoin)

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