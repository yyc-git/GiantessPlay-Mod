import { api } from "types/src/APIType"
import { modProtocolName } from "types/src/ModType"

export let getProtocolName = () => modProtocolName.BuffProtocol

export let getBlockName = () => "buff-giantess-masochism"


export let getState = (api: api, state) => {
    return api.block.getBlockState<any>(state,
        getProtocolName(),
        getBlockName()
    )
}

export let setState = (api: api, state, s) => {
    return api.block.setBlockState(state,
        getProtocolName(),
        getBlockName(),
        s
    )
}

export let createState = (api: api) => {
    return {
        oldValue: api.NullableUtils.return_(api.MutableRecordUtils.create())
    }
}