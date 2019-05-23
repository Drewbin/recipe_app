const initialState = {

    recipeName: '',
    ingredients: [],
    instructions: '',
    time: '',
    img: '',
    link: '',
    email: '',
 
}

const UPDATE_RECIPE = 'UPDATE_RECIPE';
const UPDATE_IMAGE = 'UPDATE_IMAGE';
const UPDATE_USER = 'UPDATE_USER';
const CLEAR_INFO = 'CLEAR_INFO';
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT'

export default function reducer(state = initialState, action) {
    let { type, payload } = action;

    switch(type) {

        case UPDATE_RECIPE: 
            return { ...state, ...payload };

        case UPDATE_IMAGE:
            return { ...state, img: payload };

        case UPDATE_USER:
            return { ...state, email: payload.username };

        case CLEAR_INFO: 
            return payload;

        case LOGIN: 
            return Object.assign( {}, state, {user: action.payload})

        case LOGOUT: 
            return initialState;
        
        default : return state;
    }
};


export function updateRecipe( recipe ) {
    return{
        type: UPDATE_RECIPE,
        payload: recipe,
    }
};

export function updateImage( img ) {
    return {
        type: UPDATE_IMAGE,
        payload: img,
    }
};

export function updateUser( email ) {
    return {
        type: UPDATE_USER, 
        payload: email ,
    }
};

export function clear() {
    return{
        type: CLEAR_INFO,
        payload: initialState,
    }
};

export function login( userInfo ) {
    return {
        type: LOGIN,
        payload: userInfo,
    }
};

export function logout() {
    return {
        type: LOGOUT,
    }
};

