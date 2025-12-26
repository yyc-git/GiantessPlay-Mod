import { service } from "career-protocol/src/service/ServiceType"
import { state } from "career-protocol/src/state/StateType"
import { getBlockService as getBlockServiceBlockManager, createBlockState as createBlockStateBlockManager, textData, characterType, needGem } from "types/src/CommonType"

export enum languageKey {
    Title,
}

let _getTextData = (): textData => {
    return {
        ["Chinese"]: {
            [languageKey.Title]: "测试1"
        },
        ["English"]: {
            [languageKey.Title]: "Test1"
        }
    }
}

export let getBlockService: getBlockServiceBlockManager<
    service
> = (api) => {
    return {
        getCareerData: (api, state) => {
            return {
                title: api.getLanguageDataByData(state, _getTextData(), languageKey.Title),

                iconId: "career_test1_icon",

                needGem: needGem.Middle,

                getCareerFeatureData: (state) => api.MutableRecordUtils.createFromObject({
                    [api.getCareerFeatureName(api, state, "career-feature-increasefullhp")]: 0.5,
                    [api.getCareerFeatureName(api, state, "career-feature-increasedamagebycoin")]: 0.01,
                    [api.getCareerFeatureName(api, state, "career-feature-reducedamagebutincreasewhendamaged")]: [1, 0.5, 20],
                })
            }
        },
        getCharacterType: () => characterType.Both,
    }
}

export let createBlockState: createBlockStateBlockManager<
    state
> = (api) => {
    return {}
}