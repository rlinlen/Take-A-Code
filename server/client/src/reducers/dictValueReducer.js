
import {SET_DICTVALUE, RESET_DICTVALUE, FINISH_DICTVALUE} from '../actions/types';

const init = {}

const dictValueReducer = (state=init,action) => {
    /* {[projectItemId]:
        {[dictId]:{
            seq:seq,
            value:value
        },
        code:}
    } */
    
    let merged = {...state}
    switch (action.type){
        case SET_DICTVALUE:
            //console.log(state);
            for (var att in action.payload){
                merged[att] = {...merged[att],...action.payload[att]};
                /* Object.entries(merged[att]).filter(i => Number.isInteger(+i[0])).sort((a, b) => a[1].seq - b[1].seq).map(kv => {
                    if(kv[1]['type']==='number'){
                        return [kv[1].,kv[1].inc]
                    }else{
                        return kv[1].value
                    }
                }) */
                let joinChar = (merged[att]['join'] === 'N') ? '' : merged[att]['join'];
                merged[att]['code'] = Object.entries(merged[att]).filter(i => Number.isInteger(+i[0])).sort((a, b) => a[1].seq - b[1].seq).map(i => i[1].value).join(joinChar)
            }
            //console.log(merged);
            return merged;
        case FINISH_DICTVALUE:
            merged[action.payload]['set'] = 1
            return merged;
        case RESET_DICTVALUE:
            return init;
        default:
            return state;
    }
}

export default dictValueReducer;