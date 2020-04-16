import { ReactComponent } from "../Resource/Resources";
import { TriParamColor } from "../Components/UI/ui";
import Image from '../Resource/Image'
import Video from '../Resource/Video'
import { Time } from "../util/time";

export enum GainChangeType {
    linear, exp, directly
}
export enum SceneActionType {
    au_play_source, au_clear_all_source, au_remove_source, au_mute_track, au_resume_track, au_gain_change,
    au_mute_all, au_resume_all,
    bg_change,
    jump_to,
    _if, _switch,_wait,_interval
}
 interface SA_If {
    type: SceneActionType._if
    statement: (...args)=>boolean//TODO:
    trueAction?: SceneAction
    falseAction?: SceneAction
}
 interface SA_Switch {
    type: SceneActionType._switch
    statement: any
    cases: Map<any, SceneAction>
}
 interface SA_BG_Change{
    type:SceneActionType.bg_change
    value:Image | Video | ReactComponent | TriParamColor
}
 interface SA_Jump_To{
    type:SceneActionType.jump_to
    value:number | "end" |'next'
}
interface SA_Audio_Source{
    type:SceneActionType.au_play_source|SceneActionType.au_remove_source
    track:string
    resId:string
}
interface SA_Time{
    type:SceneActionType._wait|SceneActionType._interval
    value:Time
}
export type SceneAction = SA_If | SA_Switch | SA_BG_Change |SA_Jump_To|SA_Audio_Source|SA_Time

