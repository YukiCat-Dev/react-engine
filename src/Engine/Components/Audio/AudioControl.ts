import Mixer,{MixerOptions } from "./Mixer";

export default class AudioControl{
    constructor(options:AudioControlOptions){
        this.mainMixer=new Mixer(options.mainMixerOption)
        let initArray:Array<[string,Mixer]>=[]
        for(const trace of options.traces){
            initArray.push([trace.name,
                new Mixer(trace.mixerOption?trace.mixerOption:options.mainMixerOption)])
        }
        this.traceMap=new Map(initArray)
    }
    mainMixer:Mixer
    traceMap:Map<string,Mixer>
    

}
export interface AudioControlOptions{
    mainMixerOption?:MixerOptions
    traces:Array<Trace>
}
export interface Trace{
    name:string,
    mixerOption?:MixerOptions
}