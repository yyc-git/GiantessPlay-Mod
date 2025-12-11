export enum languageVariableKey {
    Description
}

let _getTextDataByVariable = (): any => {
    return {
        ["Chinese"]: {
            [languageVariableKey.Description]: (value) => `生命上限增加${value}%`
        },
        ["English"]: {
            [languageVariableKey.Description]: (value) => `Maximum health increased by ${value}%`
        }
    }
}


export let getBlockService = (api) => {
    return {
        getFeatureData: (api, state) => {
            return {
                name: "IncreaseFullHp",
                positive: true,
                // category: category.Number,
                // characterType: characterType.Both,
                // rate: rate.Middle2,
                category: 0,
                characterType: 2,
                rate: 0.3,
                getDescriptionFunc: (state, value) => {
                    return api.getLanguageDataByData(state, _getTextDataByVariable(), languageVariableKey.Description)(api.NumberUtils.convertDecimalToPercent(value, 3))
                },
                generateRandomValueFunc: (state) => {
                    return api.NumberUtils.getRandomFloat(0.2, 1)
                },
                applyFunc: (state, characterType_, value, name) => {
                    switch (characterType_) {
                        case 1:
                            state = api.LittleManBuildUtils.setHp(state, (state, hp) => {
                                return hp * (1 + value)
                            }, true)
                            break
                        case 0:
                            state = api.GiantessBuildUtils.setFullHp(state, (state, hp) => {
                                return hp * (1 + value)
                                // }, true, usedGirlEnum.PlayerGirl)
                            }, true, "PlayerGirl")
                            break
                    }

                    return Promise.resolve(state)
                },
            }
        },
    }
}

export let createBlockState = (api) => {
    return null
}