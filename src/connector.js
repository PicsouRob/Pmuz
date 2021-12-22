import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        playlist: state.playlist,
        isRepeat: state.isRepeat,
        isSuffle: state.isSuffle,
        lastTrack: state.lastTrack
    }
};

export const connector = connect(mapStateToProps);