import { singleBuffData } from "types/src/BuffDataType"
import { getBlockName, getProtocolName } from "../script/Utils"
import { characterType, language, state } from "types/src/CommonType"
import { api } from "types/src/APIType"

export let getName = () => "Buff_LittleMan_Masochism"

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

        applyFunc: (state, name, usedGirl_, superPositionCount: number, sumValue: number) => {
            state = api.block.setBlockState(state, getProtocolName(), getBlockName(),
                {
                    ...api.block.getBlockState<any>(state, getProtocolName(), getBlockName()),
                    oldValue: api.NullableUtils.return_(superPositionCount)
                }
            )

            return Promise.resolve(state)
        },
        deapplyFunc: (state, name, usedGirl_, superPositionCount: number, sumValue: number) => {
            state = api.block.setBlockState(state, getProtocolName(), getBlockName(),
                {
                    ...api.block.getBlockState<any>(state, getProtocolName(), getBlockName()),
                    oldValue: api.NullableUtils.getEmpty()
                }
            )

            return Promise.resolve(state)
        },
    }
}

export let getCharacterType = () => characterType.LittleMan

export let isPositive = () => true

export let getImageSrc = () => `./${getBlockName()}/src/asset/buff.png`

export let getDescription = (api, state) => api.getLanguageDataByData(state, _getTextData(), languageKey.Description)

export let addBuff = (api: api, state: state, lastTime, value) => {
    return api.addBuff(state, getName(), api.getLittleManName(), api.NullableUtils.getEmpty(), lastTime, 1, getCharacterType(), value)
}