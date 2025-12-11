export enum languageVariableKey {
    Description
}

let _getTextDataByVariable = (): any => {
    return {
        ["Chinese"]: {
            [languageVariableKey.Description]: (value) => `每持有50金币，伤害增加${value}%`
        },
        ["English"]: {
            [languageVariableKey.Description]: (value) => `For every 50 coins held, damage increases by ${value}%`
        }
    }
}

// let _isOtherCharacterTypeApplied = (api, state, characterType_, careerFeatureName) => {
//     let otherCharacterType = characterType_ == 0 ? 1 : 0

//     return api.isUseCareerFeatureByCharacterType(state, otherCharacterType, careerFeatureName)
// }

let _handleDamageHandlerForIncreaseDamageByCoin = (api, state, data) => {
    let userData = api.NullableUtils.getExn(data.userData)
    // let careerFeatureName_ = careerFeatureName.IncreaseDamageByCoin
    let careerFeatureName_ = "IncreaseDamageByCoin"

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


export let getBlockService = (api) => {
    return {
        getFeatureData: (api, state) => {
            return {
                name: "IncreaseDamageByCoin",
                positive: true,
                // category: category.Number,
                // characterType: characterType.Both,
                // rate: rate.Middle2,
                category: 1,
                characterType: 2,
                rate: 0.3,
                getDescriptionFunc: (state, value) => {
                    return api.getLanguageDataByData(state, _getTextDataByVariable(), languageVariableKey.Description)(api.NumberUtils.convertDecimalToPercent(value, 3))
                },
                generateRandomValueFunc: (state) => {
                    return api.NumberUtils.getRandomFloat(0.0025, 0.01)
                },
                applyFunc: (state, characterType_, value, name) => {
                    // if (_isOtherCharacterTypeApplied(api, state, characterType_, name)) {
                    //     return Promise.resolve(state)
                    // }

                    state = api.event.onWithUserData(state, api.event.getHandleDamageArmyEventName(), _handleDamageHandlerForIncreaseDamageByCoin)
                    state = api.event.onWithUserData(state, api.event.getHandleDamageGiantessEventName(), _handleDamageHandlerForIncreaseDamageByCoin)

                    return Promise.resolve(state)
                },
            }
        },
    }
}

export let createBlockState = (api) => {
    return null
}