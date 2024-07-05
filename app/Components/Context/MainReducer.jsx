'use client';
import {RESET, LOGIN_USER, SETSELECTED} from "./types";
// import setAuthToken from "../../../utils/setAuthToken";

const MainReducer = (state, action)=>{
    switch(action.type){
        case RESET:
            // setAuthToken(action.payload.token);
            return {...action.payload};

        case LOGIN_USER:
            // setAuthToken(action.payload.token);
            return{
                ...state,
                isAuthenticated: action.payload.success,
				token: action.payload.token,
				id: action.payload.id,
				userImage: action.payload.userImage,
				designation: action.payload.designation,
				firstName: action.payload.firstName,
                lastName:action.payload.lastName
            };
        case SETSELECTED:
            return {
                ...state,
                selectedItem:action.payload
            }
        default:
            return state;
    
    }

}
export default MainReducer;