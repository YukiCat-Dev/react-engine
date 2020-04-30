import { ReactComponent } from "../Resource/ResourceControl";
import { TriParamColor } from "../UI/color";
import Image from '../Resource/Image'
import Video from '../Resource/Video'
import { Time } from "../util/time";
import { StartOptions } from "~Engine/Audio/AudioSource";

export enum GainChangeType {
    linear, exp, directly
}
export enum SceneActionType {
    au_play_source, au_remove_all_source, au_stop_source, au_mute_track, au_resume_track, au_gain_change,
    au_mute_all, au_resume_all,
    react_show,
    bg_change,
    jump_to,
    _if, _switch, _wait, _interval
}
interface SA_If {
    type: SceneActionType._if
    statement: (...args) => boolean//TODO:
    trueAction?: SceneAction
    falseAction?: SceneAction
}
interface SA_Switch {
    type: SceneActionType._switch
    statement: any
    cases: Map<any, SceneAction>
}
interface SA_BG_Change {
    type: SceneActionType.bg_change
    value: Image | Video | ReactComponent | TriParamColor
}
interface SA_Jump_To {
    type: SceneActionType.jump_to
    value: number | "end" | 'next'
}
interface SA_Audio_Source_Play extends SA_Audio_Source {
    startOptions?: StartOptions
}
interface SA_Audio_Source {
    type: SceneActionType.au_play_source | SceneActionType.au_stop_source
    trackId: string
    resId: string
}
interface SA_Audio_Track {
    type: SceneActionType.au_mute_track | SceneActionType.au_resume_track
    trackId: string
    resId: string
}
interface SA_Time {
    type: SceneActionType._wait | SceneActionType._interval
    value: Time
}
export type SceneAction_Audio = SA_Audio_Source | SA_Audio_Source_Play | SA_Audio_Track
export type SceneAction = SA_If | SA_Switch | SA_BG_Change | SA_Jump_To | SceneAction_Audio | SA_Time

