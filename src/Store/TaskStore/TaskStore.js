import { request } from "../../Helper/Axios";
import HttpMethod from "../../Constant/HttpMethod";

const START_EVENT =  "LOAD_TASK_START";
const END_EVENT = "LOAD_TASK_END";

export function loadTask(id) {
    return (dispatch) => {
        dispatch({ type: START_EVENT });
        request(
            HttpMethod.GET, 
            `/task/${id}`
        ).then(res => {
            dispatch({ type: END_EVENT, payLoad: res.data });
        }).catch(err => {
            console.log(err);
        })
    }
}

export function updateTask(body) {
    return (dispatch) => {
        dispatch({ type: START_EVENT});
        request(
            HttpMethod.PUT,
            '/task/update',
            body
        ).then(res => {
            dispatch({ type: END_EVENT, payLoad: res.data });
        }).catch(err => {
            console.log(err);
        })
    }
}

function taskReducer( state = {
        isLoading: true,
        task: null
    }, action) {
      switch(action.type) {
        case "LOAD_TASK_START":
            return {
                ...state,
                isLoading: true
              };
        case "LOAD_TASK_END":
            return {
                ...state,
                isLoading: false,
                task: action.payLoad
            }
        default:
            return state;
      }  
}

export default taskReducer;