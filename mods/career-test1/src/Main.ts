export let getBlockService = (api) => {
    return {
        getCareerData: (api, state) => {
            return {
                title: "Career Test1",

                imageResourceId: "career_test1_icon",
                soundResourceId: "career_test1_sound",
                glbResourceId: "career_test1_glb",

                needGem: 1000,

                getCareerFeatureData: (state) => api.MutableRecordUtils.createFromObject({
                    ["IncreaseFullHp"]: 1,
                    ["IncreaseRestoreHpStrength"]: 1,
                    ["ReduceDamageButIncreaseWhenDamaged"]: [1, 0.05, 20],
                })
            }
        },
        getCharacterType: () => 2,
    }
}

export let createBlockState = (api) => {
    return null
}