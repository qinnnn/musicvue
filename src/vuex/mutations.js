
import * as types from './mutation-type'


export default {
    [types.set_increment](state,num){
        state.count+=num
    }
}
