import { PLAYLIST, IS_REPEAT, IS_SUFFLE, LAST_TRACK, DELETE } from './Type';

const initialState = {
    playlist: [],
    isRepeat: false,
    isSuffle: false,
    lastTrack: 0,
};

function Reducer(state = initialState, action) {
    switch (action.type) {
        case PLAYLIST:
            const isExist = state.playlist.findIndex(item => item.name === action.value.name);
            if(isExist !== -1) {
                state.playlist[isExist] = action.value;

                return { 
                    ...state.playlist,
                    playlist: [...state.playlist], 
                }
            } else {
                return {
                    ...state,
                    playlist: [ ...state.playlist, action.value ],
                }
            }
        break;
        case DELETE: 
            const isDelete = state.playlist.findIndex(item => item.name === action.value.name);
            return {
                ...state.playlist,
                playlist: state.playlist.filter((item, index) => index !== isDelete),
            };
        break;
        case IS_SUFFLE: 
            return {
                ...state.isSuffle,
                isSuffle: action.value
            }
            break;
        case IS_REPEAT:
            return {
                ...state.isRepeat,
                isRepeat: action.value
            }
            break;
        case LAST_TRACK:
            return {
                ...state.lastTrack,
                lastTrack: action.value
            }
            break;
        default:
            return state;
    }
};

export default Reducer;