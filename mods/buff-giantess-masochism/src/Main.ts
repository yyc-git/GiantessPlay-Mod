import { createState } from "./script/Utils"
import { addBuff, getBuffData, getCharacterType, getDescription, getImageSrc, getName, isPositive } from "./json/Data"
import { getCount } from "./script/GetCount"
import { bindEvent, unbindEvent } from "./script/Event"
import { service } from "buff-protocol/src/service/ServiceType"
import { state } from "buff-protocol/src/state/StateType"
import { api } from "types/src/APIType"
import { getBlockService as getBlockServiceBlockManager, createBlockState as createBlockStateBlockManager } from "types/src/CommonType"

export let getBlockService: getBlockServiceBlockManager<
    service
> = (api) => {
    return {
        init: (api: api, state) => {
            state = bindEvent(api, state)

            return Promise.resolve(state)
        },
        dispose: (api: api, state) => {
            state = unbindEvent(api, state)

            return Promise.resolve(state)
        },

        getName: getName,
        getBuffData: getBuffData,
        addBuff: addBuff,
        getCharacterType: getCharacterType,
        isPositive: isPositive,
        getImageSrc: getImageSrc,
        getDescription: getDescription,

        getCount: getCount,
    }
}

export let createBlockState: createBlockStateBlockManager<
    state
> = (api: api) => {
    return createState(api)
}