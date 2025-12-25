import { nullable } from "types/src/CommonType"

export type state = {
    oldValue: nullable<any>,
    startTime?: number,
    pauseTime?: nullable<number>,

    customData?: any,
}
