import { singleBuffData } from "types/src/BuffDataType"
import { getBlockName, getProtocolName } from "../script/Utils"
import { characterType, language, state } from "types/src/CommonType"
import { api } from "types/src/APIType"

export let getName = () => "Buff_Giantess_Masochism"

export enum languageKey {
    Description,
}

let _getTextData = () => {
    return {
        [language.Chinese]: {
            [languageKey.Description]: "受虐狂"
        },
        [language.English]: {
            [languageKey.Description]: "Masochism"
        },
    }
}

export let getBuffData = (api: api): singleBuffData => {
    return {
        name: getName(),
        imageSrc: getImageSrc(),

        isPositive: isPositive(),

        characterType: getCharacterType(),

        // value: 0.2,

        maxSuperPositionCount: +Infinity,

        getDescriptionFunc: (state, superPositionCount: number, value: number) => api.getLanguageDataByData(state, _getTextData(), languageKey.Description),

        applyFunc: (state, name, usedGirl, superPositionCount: number, sumValue: number) => {
            state = api.block.setBlockState(state, getProtocolName(), getBlockName(),
                {
                    ...api.block.getBlockState<any>(state, getProtocolName(), getBlockName()),
                    oldValue: api.NullableUtils.return_(api.MutableRecordUtils.set(api.block.getBlockState<any>(state, getProtocolName(), getBlockName()), usedGirl, superPositionCount))
                }
            )

            return Promise.resolve(state)
        },
        deapplyFunc: (state, name, usedGirl, superPositionCount: number, sumValue: number) => {


            state = api.block.setBlockState(state, getProtocolName(), getBlockName(),
                {
                    ...api.block.getBlockState<any>(state, getProtocolName(), getBlockName()),
                    oldValue: api.MutableRecordUtils.remove(api.block.getBlockState<any>(state, getProtocolName(), getBlockName()), usedGirl)
                }
            )

            return Promise.resolve(state)
        },
    }
}

export let getCharacterType = () => characterType.GiantessOrNone

export let isPositive = () => true

export let getImageSrc = () => `./${getBlockName()}/src/asset/buff.png`

export let getDescription = (api, state) => api.getLanguageDataByData(state, _getTextData(), languageKey.Description)

export let addBuff = (api: api, state: state, usedGirl, lastTime, value) => {
    return api.addBuff(state, getName(), api.girl.buildNameByUsedGirl(usedGirl), api.NullableUtils.return_(usedGirl), lastTime, 1, getCharacterType(), value)
}