import { service } from "career-protocol/src/service/ServiceType"
import { state } from "career-protocol/src/state/StateType"
import { getBlockService as getBlockServiceBlockManager, createBlockState as createBlockStateBlockManager, textData, characterType } from "types/src/CommonType"
import { modProtocolName } from "types/src/ModType"

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

// TODO move to utils
export let getCareerFeatureProtocolName = () => modProtocolName.CareerProtocol

export let getIncreaseFullHpBlockName = () => "career-feature-increasefullhp"

export let getIncreaseDamageByCoinBlockName = () => "career-feature-increasedamagebycoin"

export let getBlockService: getBlockServiceBlockManager<
    service
> = (api) => {
    return {
        getCareerData: (api, state) => {
            return {
                title: api.getLanguageDataByData(state, _getTextData(), languageKey.Title),

                imageResourceId: "career_test1_icon",
                soundResourceId: "career_test1_sound",
                glbResourceId: "career_test1_glb",

                needGem: 1000,

                getCareerFeatureData: (state) => api.MutableRecordUtils.createFromObject({
                    [api.getCareerFeatureName(api, state, getIncreaseFullHpBlockName())]: 1,
                    [api.getCareerFeatureName(api, state, getIncreaseDamageByCoinBlockName())]: 0.01
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