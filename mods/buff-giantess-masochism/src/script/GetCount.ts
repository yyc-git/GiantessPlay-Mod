import { api } from "types/src/APIType"
import { state } from "types/src/CommonType"
import { state as blockState } from "buff-protocol/src/state/StateType";
import { getBlockName, getProtocolName } from "./Utils";

export let getCount = (api: api, usedGirl) => (state: state) => {
    return api.MutableRecordUtils.get(api.block.getBlockState<blockState>(state, getProtocolName(), getBlockName()).oldValue, usedGirl)
}