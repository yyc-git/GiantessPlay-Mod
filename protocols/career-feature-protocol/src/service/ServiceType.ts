// import { careerFeatureData } from "frontend/src/scene3d_layer/script/scene/scene_city/data/build/CareerFeatureData"

export type careerFeatureData = any

export type service = {
	// init?: any,
	// dispose?: any,

	getFeatureData: (api, state) => careerFeatureData,
}