import React from 'react';
import { Animated, Dimensions } from 'react-native';

class FadeIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            bottomPosition: new Animated.Value(Dimensions.get('window').height),
        }
    }

    componentDidMount() {
        Animated.spring(this.state.bottomPosition,
            {
                toValue: 90,
                useNativeDriver: false,
            }
        ).start();
    }

    render() {
        return (
            <Animated.View style={{ position: 'absolute', 
                top: this.state.bottomPosition,
                left: 20,
                right: 20,
            }}>
                {this.props.children}
            </Animated.View>
        )
    }
}

export default FadeIn;