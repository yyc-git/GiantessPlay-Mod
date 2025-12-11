import { careerFeatureName, careerFeatureValue } from "career-feature-protocol/src/service/ServiceType"

export type state = {
    careerFeatureData?: Record<careerFeatureName, careerFeatureValue>,
}

