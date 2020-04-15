export default interface SceneAction{
    type:SceneActionType
    data:any
}

export enum SceneActionType{
    au_play_source,au_clear_all_source,au_remove_source,au_mute_trace,au_resume_trace,au_gain_change,
    au_mute_all,au_resume_all,
    bg_change,
    jump_to
}
export interface SceneActionData{
    resId?:string
    value?:string
}
