import { Time, Times, TimeUnit } from "../../util/time"

/**
 * @description 实现音频特效的静态类
 * @author KotoriK
 * @date 2020-04-13
 * @export
 * @class AudioEffects
 */
export default class AudioEffects {
    /**
     * @description 根据option变化增益值
     * @author KotoriK
     * @static
     * @param {GainNode} gainNode 
     * @param {number} targetValue 指定目标值
     * @param {number} endTime 指定在多长时间内到达目标值
     * @memberof AudioEffects
     */
    public static fade(param: AudioParam, option: FullFadeOption) {
        let endTime=Times.convert(option.endTime,TimeUnit.Second).value 
        if (option.method === 'exp') {
            param.exponentialRampToValueAtTime(option.targetValue, endTime)
        } else if (option.method === 'linear') {
            param.linearRampToValueAtTime(option.targetValue, endTime)
        } else {
            //silently failed
        }
    }
}

/**
 * 传递淡入淡出参数
 *
 * @author KotoriK
 * @export
 * @interface FadeOption
 */
export interface FullFadeOption extends FadeOption {
    method: 'exp' | 'linear'
    targetValue: number
    endTime: Time
}
export interface FadeOption {
    method: 'exp' | 'linear'
    targetValue?: number
    endTime: Time
}