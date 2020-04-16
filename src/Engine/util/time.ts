import num_between from './number-between.js'
export enum TimeUnit {
    Microsecond, Second, Minute, Hour, Day
}
const TimeUnitFactor = [1000, 60, 60, 24]
export interface Time {
    value: number
    unit: TimeUnit
}
export class Times {
    static convert(from: Time, to: TimeUnit) {
        return {value:from.value*this._time_between(from.unit,to),unit:to} as Time
    }
    private static _time_between(leftUnit: TimeUnit, rightUnit: TimeUnit) {
        if (leftUnit === rightUnit) return 1
        let array = num_between(leftUnit, rightUnit), factor = 1
        if (array) {

            for (const i of array) {
                factor *= TimeUnitFactor[i]
            }
        }
        let bool = leftUnit < rightUnit
        factor *= TimeUnitFactor[bool ? leftUnit : rightUnit]
        return bool ? factor : 1 / factor
    }
   
}