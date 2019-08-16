import axios from 'axios';

import {SET_DICTVALUE, RESET_DICTVALUE} from './types';

export const setDictValue = (projectItemId, seq, dictId, value, type, rule, current) => {
    //console.log('hi')
    switch (type){
        case 'number':
            let numCurrent = current || 0;
            return dispatch => {
                //
                dispatch(
                    {
                        type: SET_DICTVALUE,
                        payload: {[projectItemId]:
                                    {[dictId]:{
                                        seq:seq,
                                        value:(+value + +numCurrent).toString().padStart(rule, "0"),
                                        inc: value,  //for posting db the increment
                                        type:type
                                    }}
                                }
                    }
                )
            }
        default:
            return {
                type: SET_DICTVALUE,
                payload: {[projectItemId]:
                            {[dictId]:{
                                seq:seq,
                                value:value,
                                type:type
                            }}
                        }
            }
    }
}

export const resetDictValue = () => {
    return {
        type: RESET_DICTVALUE,
    }
}
