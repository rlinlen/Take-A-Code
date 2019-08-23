import axios from 'axios';

import {SET_DICTVALUE, RESET_DICTVALUE, FINISH_DICTVALUE} from './types';

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
        case 'date':
            let fValue;
            //default format
            if (!rule){
                fValue = (value.getYear() + 1900).toString().padStart(4, "0")
                        + (value.getMonth() + 1).toString().padStart(2, "0")
                        + value.getDate().toString().padStart(2, "0")
            }
            else{
                //generate based on rule
                fValue = [...rule].map(f => {
                    if(f == 'M' || f == 'm'){
                        return (value.getMonth() + 1).toString().padStart(2, "0");
                    }else if (f == 'D' || f == 'd'){
                        return value.getDate().toString().padStart(2, "0")
                    }else if(f == 'Y' || f == 'y'){
                        return (value.getYear() + 1900).toString().padStart(4, "0")
                    }
                }).join('');
            }

            return dispatch => {
                //
                dispatch(
                    {
                        type: SET_DICTVALUE,
                        payload: {[projectItemId]:
                                    {[dictId]:{
                                        seq:seq,
                                        value:fValue,
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

export const finishDictValue = (projectItemId) => {
    return {
        type: FINISH_DICTVALUE,
        payload: projectItemId
    }
}