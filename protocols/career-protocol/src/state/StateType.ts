// import { careerFeatureName, careerFeatureValue } from "frontend/src/scene3d_layer/script/scene/scene_city/data/build/CareerFeatureData"
// TODO restore type
type careerFeatureName = any

type careerFeatureValue = any


export type state = {
    // careerFeatureData?: Array<[careerFeatureName, careerFeatureValue]>,
    careerFeatureData?: Record<careerFeatureName, careerFeatureValue>,
}

