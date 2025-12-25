import { service } from "career-feature-protocol/src/service/ServiceType"
import { state } from "career-feature-protocol/src/state/StateType"
import { api } from "types/src/APIType"
import { variableTextData, characterType, rate, getBlockService as getBlockServiceBlockManager, createBlockState as createBlockStateBlockManager } from "types/src/CommonType"
import { modProtocolName } from "types/src/ModType"

export enum languageVariableKey {
    Description
}

let _getTextDataByVariable = (): variableTextData => {
    return {
        ["Chinese"]: {
            [languageVariableKey.Description]: ([v1, v2, v3]) => `减少${v1}%伤害。受到攻击后，增加${v2}%伤害，持续${v3}秒`,
        },
        ["English"]: {
            [languageVariableKey.Description]: ([v1, v2, v3]) => `Decrease ${v1}% damage. After be attacked, increase ${v2}% damage, keep ${v3}s`,
        }
    }
}

let _getBuffProtocolName = () => modProtocolName.BuffProtocol

let _getLittleManBuffMasochismBlockName = () => "buff-littleman-masochism"

let _getGiantessBuffMasochismBlockName = () => "buff-giantess-masochism"

let _computeDamageForReduceDamageButIncreaseWhenDamaged = (api: api, state: state, fromName, [v1, v2]) => {
    let superPositionCount
    if (api.littleMan.isLittleMan(fromName)) {
        let service = api.block.getBlockService<any>(state, _getBuffProtocolName(), _getLittleManBuffMasochismBlockName())

        let buff = api.findBuff(state, service.getName(), fromName, api.NullableUtils.getEmpty())

        superPositionCount = api.NullableUtils.getWithDefault(
            api.NullableUtils.map(buff => buff.superPositionCount,
                buff),
            0
        )
    }
    else if (api.girl.isGirl(fromName)) {
        let service = api.block.getBlockService<any>(state, _getBuffProtocolName(), _getGiantessBuffMasochismBlockName())

        let buff = api.findBuff(state, service.getName(), fromName, api.NullableUtils.return_(api.girl.getUsedGirlByName(fromName)))

        superPositionCount = api.NullableUtils.getWithDefault(
            api.NullableUtils.map(buff => buff.superPositionCount,
                buff),
            0
        )
    }
    else {
        superPositionCount = 0
    }

    return 1 - v1 + v2 * superPositionCount
}

let _handleDamageHandlerForReduceDamageButIncreaseWhenDamaged = (api: api, state: state, data) => {
    let userData = api.NullableUtils.getExn(data.userData)
    let careerFeatureName_ = getName()

    if (
        api.isUseCareerFeature(state, userData.fromName, careerFeatureName_)
        && api.isNotMaxForce(userData.forceSize)
    ) {
        let [v1, v2, v3] = api.getCareerFeatureValue(state, userData.fromName, careerFeatureName_)

        userData = {
            ...userData,
            damage: userData.damage * _computeDamageForReduceDamageButIncreaseWhenDamaged(api, state, userData.fromName, [v1, v2])
        }
    }
    else if (api.isUseCareerFeature(state, userData.name, careerFeatureName_)) {
        let [v1, v2, v3] = api.getCareerFeatureValue(state, userData.name, careerFeatureName_)

        if (api.littleMan.isLittleMan(userData.name)) {
            return api.block.getBlockService<any>(state, _getBuffProtocolName(), _getLittleManBuffMasochismBlockName()).addBuff(api, state, v3, v2).then(state => [state, userData])
        }
        else if (api.girl.isGirl(userData.name)) {
            let usedGirl = api.girl.getUsedGirlByName(userData.name)
            return api.block.getBlockService<any>(state, _getBuffProtocolName(), _getGiantessBuffMasochismBlockName()).addBuff(api, state, usedGirl, v3, v2).then(state => [state, userData])
        }
        else {
            throw new Error("err")
        }
    }

    return Promise.resolve([state, userData])
}

export let getName = () => "ReduceDamageButIncreaseWhenDamaged"

export let getBlockService: getBlockServiceBlockManager<
    service
> = (api) => {
    return {
        getFeatureData: (api, state) => {
            return {
                name: getName(),
                positive: false,
                characterType: characterType.Both,
                rate: rate.Middle2,
                getDescriptionFunc: (state, [v1, v2, v3]) => {
                    return api.getLanguageDataByData(state, _getTextDataByVariable(), languageVariableKey.Description)([Math.round(v1 * 100), Math.round(v2 * 100), v3])
                },
                generateRandomValueFunc: (state) => {
                    return [
                        api.NumberUtils.randomSelect([
                            0.5,
                            0.75,
                            1
                        ]),
                        api.NumberUtils.getRandomFloat(0.02, 0.1),
                        api.NumberUtils.getRandomInteger(15, 25)
                    ]
                },
                applyFunc: (state, characterType_, value, name) => {
                    if (api.isOtherCharacterTypeApplied(api, state, characterType_, name)) {
                        return Promise.resolve(state)
                    }

                    state = api.event.onWithUserData(state, api.event.getHandleDamageArmyEventName(), _handleDamageHandlerForReduceDamageButIncreaseWhenDamaged)
                    state = api.event.onWithUserData(state, api.event.getHandleDamageLittleManEventName(), _handleDamageHandlerForReduceDamageButIncreaseWhenDamaged)
                    state = api.event.onWithUserData(state, api.event.getHandleDamageGiantessEventName(), _handleDamageHandlerForReduceDamageButIncreaseWhenDamaged)

                    return Promise.resolve(state)

                },
            }
        },
    }
}

export let createBlockState: createBlockStateBlockManager<
    state
> = (api) => {
    return null
}