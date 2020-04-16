import Mixer,{MixerOptions } from "./Mixer";

export default class AudioControl{
    constructor(options:AudioControlOptions){
        this.mainMixer=new Mixer(options.mainMixerOption)
        let initArray:Array<[string,Mixer]>=[]
        for(const track of options.tracks){
            initArray.push([track.name,
                new Mixer(track.mixerOption?track.mixerOption:options.mainMixerOption)])
        }
        this.trackMap=new Map(initArray)
    }
    mainMixer:Mixer
    trackMap:Map<string,Mixer>
    

}
export interface AudioControlOptions{
    mainMixerOption?:MixerOptions
    tracks:Array<Track>
}
export interface Track{
    name:string,
    mixerOption?:MixerOptions
}