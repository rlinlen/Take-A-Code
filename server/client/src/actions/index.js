import axios from 'axios';

import {SET_DICTVALUE, RESET_DICTVALUE} from './types';

export const setDictValue = (projectItemId, seq, dictId, value, type, rule) => {
    //console.log('hi')
    switch (type){
        case 'number':
            return {
                type: SET_DICTVALUE,
                payload: {[projectItemId]:
                            {[dictId]:{
                                seq:seq,
                                value:value.padStart(rule, "0")
                            }}
                        }
            }
        default:
            return {
                type: SET_DICTVALUE,
                payload: {[projectItemId]:
                            {[dictId]:{
                                seq:seq,
                                value:value
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
