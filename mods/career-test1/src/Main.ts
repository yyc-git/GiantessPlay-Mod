export enum languageKey {
    Title,
}

let _getTextData = (): any => {
    return {
        ["Chinese"]: {
            [languageKey.Title]: "测试1"
        },
        ["English"]: {
            [languageKey.Title]: "Test1"
        }
    }
}


// TODO move to utils
export let getCareerFeatureProtocolName = () => "career-feature-protocol"

export let getIncreaseFullHpBlockName = () => "career-feature-increasefullhp"

export let getIncreaseDamageByCoinBlockName = () => "career-feature-increasedamagebycoin"

export let getBlockService = (api) => {
    return {
        getCareerData: (api, state) => {
            return {
                title: api.getLanguageDataByData(state, _getTextData(), languageKey.Title),

                imageResourceId: "career_test1_icon",
                soundResourceId: "career_test1_sound",
                glbResourceId: "career_test1_glb",

                needGem: 1000,

                getCareerFeatureData: (state) => api.MutableRecordUtils.createFromObject({
                    [api.blockAPI.getBlockService(state, getCareerFeatureProtocolName(), getIncreaseFullHpBlockName()).getFeatureData(api, state).name]: 1,
                    [api.blockAPI.getBlockService(state, getCareerFeatureProtocolName(), getIncreaseDamageByCoinBlockName()).getFeatureData(api, state).name]: 0.01,
                    // ["IncreaseRestoreHpStrength"]: 1,
                    // ["ReduceDamageButIncreaseWhenDamaged"]: [1, 0.05, 20],
                })
            }
        },
        getCharacterType: () => 2,
    }
}

export let createBlockState = (api) => {
    // return createState(api)
    return null
}

// export let getBlockInfo = (api) => {
//     return {
//         protocolName: "career-protocol",
//         blockName: "career-test1",
//         /*! title should be unique
//         *
//         */
//         title: "Career->受虐狂",
//         author: "官方",
//         category: "Career",
//         version: "0.0.1",
//     }
// }