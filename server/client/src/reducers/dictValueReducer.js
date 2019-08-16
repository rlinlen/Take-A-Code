
import {SET_DICTVALUE, RESET_DICTVALUE} from '../actions/types';

const init = {}

const dictValueReducer = (state=init,action) => {
    /* {[projectItemId]:
        {[dictId]:{
            seq:seq,
            value:value
        }}
    } */
    switch (action.type){
        case SET_DICTVALUE:
            //console.log(state);
            let merged = {...state}
            for (var att in action.payload){
                merged[att] = {...merged[att],...action.payload[att]};
                merged[att]['code'] = Object.entries(merged[att]).filter(i => i[0] !== 'code').sort((a, b) => a[1].seq - b[1].seq).map(i => i[1].value).join('-')
            }
            //console.log(merged);
            return merged;
        case RESET_DICTVALUE:
            return init;
        default:
            return state;
    }
}

export default dictValueReducer;