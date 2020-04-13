/**
 * @description 实现音频特效的静态类
 * @author KotoriK
 * @date 2020-04-13
 * @export
 * @class AudioEffects
 */
export default class AudioEffects {
    /**
     * @description 指数变化增益值
     * @author KotoriK
     * @static
     * @param {GainNode} gainNode 
     * @param {number} targetValue 指定目标值
     * @param {number} endTime 指定在多长时间内到达目标值
     * @memberof AudioEffects
     */
    public static fade_exp(gainNode: GainNode, targetValue: number, endTime: number) {
        gainNode.gain.exponentialRampToValueAtTime(targetValue, endTime)

    }

}