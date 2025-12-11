import { characterType, state, rate } from "types/src/CommonType"
import { api } from "types/src/APIType"

export enum category {
	Number,
	Mechanism,
}

export type careerFeatureValue = number | any

export type careerFeatureName = string

export type careerFeatureData = {
	name: careerFeatureName,
	positive: boolean,
	category: category,
	characterType: characterType,
	rate: rate,
	getDescriptionFunc: (state: state, value: careerFeatureValue) => string,
	generateRandomValueFunc: (state: state) => careerFeatureValue,
	selectRandomConditionFunc?: (state: state, data: Array<careerFeatureData>) => boolean,
	applyFunc: (state: state, characterType: characterType, value: careerFeatureValue, name: careerFeatureName) => Promise<state>,
	deapplyFunc?: (state: state, characterType: characterType, name: careerFeatureName) => Promise<state>,
}

export type service = {
	getFeatureData: (api: api, state: state) => careerFeatureData,
}