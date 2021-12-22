const trackAction = (val, type) => {
    return {
        type,
        value: val
    }
};

export default trackAction;