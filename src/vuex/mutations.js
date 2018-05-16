
import * as types from './mutation-type'


export default {
    [types.set_increment](state,num){
        state.count+=num
    },
    [types.set_songSheetId](state,e){
        state.songSheetId=e
    },
    [types.set_songSheet](state,e){
        state.songSheet=e
    },
    [types.set_musicId](state,e){
        state.musicId=e
    },
    [types.set_musicBlurPic](state,e){
        state.musicBlurPic=e
    },
    [types.set_musicState](state,e){
        state.musicState=e
    },
    [types.set_musiczIndex](state,e){
        state.musiczIndex=e
    },
}
