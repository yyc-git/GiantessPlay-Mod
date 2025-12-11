import { state } from "../state/StateType";
import { api } from "types/src/APIType"
import { careerFeatureValue, careerFeatureName } from "career-feature-protocol/src/service/ServiceType"
import { characterType } from "types/src/CommonType";

export type careerData = {
	title: string,

	// TODO restore?
	imageSrc?: string,
	imageResourceId?: string,
	soundResourceId?: string,
	glbResourceId?: string,


	needGem: number,


	getCareerFeatureData: (state: state) => Record<
		careerFeatureName, careerFeatureValue
	>
}

export type service = {
	getCareerData: (api: api, state: state) => careerData,
	getCharacterType: () => characterType,
}