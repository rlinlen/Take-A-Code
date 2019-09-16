import axios from 'axios';

import {FETCH_USER, SET_DICTVALUE, RESET_DICTVALUE, FINISH_DICTVALUE} from './types';
import {DEFAULT_JOIN_CHAR} from '../appConstant';

///////User///////
export const fetchUser = () => {
        return async (dispatch) => {
            return new Promise(async (resolve, reject) => {
                const res = await axios.get('/api/me');
    
                dispatch({ type: FETCH_USER, payload: res.data});
          
                resolve();
              })
        }
    }

///////Take///////
export const setDictValue = (projectItemId, seq, dictId, value, type, dictRule, current, projectItemRule) => {
    //console.log('hi')
    /* {[projectItemId]:
        {
            [dictId]:{
                seq:seq,
                value:(+value + +numCurrent).toString().padStart(dictRule, "0"),
                inc: value,  //for posting db the increment
                type:type
            },
            'join':projectItemRule,
            'set':1,
            'code':abc-123
        }
    } */
    let join = projectItemRule === 'N' ? '' : projectItemRule;
    switch (type){
        case 'number':
            let numCurrent = current || 0;
            return dispatch => {
                //
                dispatch(
                    {
                        type: SET_DICTVALUE,
                        payload: {[projectItemId]:
                                    {
                                        [dictId]:{
                                            seq:seq,
                                            value:(+value + +numCurrent).toString().padStart(dictRule, "0"),
                                            inc: value,  //for posting db the increment
                                            type:type
                                        },
                                        'join':join
                                    }
                                }
                    }
                )
            }
        case 'date':
            //console.log(value)
            let fValue = null;
           
            //to avoid date deleted
            if(value){
                if (!dictRule){
                    //default format
                   fValue = (value.getYear() + 1900).toString().padStart(4, "0")
                           + (value.getMonth() + 1).toString().padStart(2, "0")
                           + value.getDate().toString().padStart(2, "0")
               }
               else{
                   //generate based on dictRule
                   fValue = [...dictRule].map(f => {
                       if(f === 'M' || f === 'm'){
                           return (value.getMonth() + 1).toString().padStart(2, "0");
                       }else if (f === 'D' || f === 'd'){
                           return value.getDate().toString().padStart(2, "0")
                       }else if(f === 'Y' || f === 'y'){
                           return (value.getYear() + 1900).toString().padStart(4, "0")
                       }
                   }).join('');
               }
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
                                    },
                                    'join':join}
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
                            },
                            'join':join}
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