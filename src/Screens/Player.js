import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, TouchableOpacity, 
    Dimensions, StatusBar } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import TrackPlayer, { Event, usePlaybackState
} from 'react-native-track-player';

import { GlobalStyles } from '../GlobalStyles';
import Controller from './Controller';
import SwiperView from './SwiperView';
import { trackAction } from '../Redux/Action';
import { IS_REPEAT, IS_SUFFLE, LAST_TRACK } from '../Redux/Type';
import { connector } from '../connector';

const { width } = Dimensions.get('window');

const Player = (props) => {
    const { route, navigation, dispatch, lastTrack } = props;
    const { songs } = route.params;
    const [isPause, setIsPause] = useState(true);
    const playBackState = usePlaybackState();

    useEffect(() => {
        if(playBackState === 'playing' || playBackState === 3) {
            setIsPause(false);
        } else if(playBackState === 'playing' || playBackState === 2) {
            setIsPause(true);
        } else {
            setIsPause(false);
        }
    }, [playBackState]);

    return (
        <View style={styles.container}>
            <StatusBar barStyle='light-content' backgroundColor='rgba(66, 0, 0, 1)' />
            <View style={[GlobalStyles.row_between_center, styles.top]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="angle-down" type="font-awesome" color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name="dots-vertical" type="material-community" color="#fff" />
                </TouchableOpacity>
            </View>
            <View style={{ height: 360, width }}>
                <View style={{ width: width, alignItems: 'center' }}>
                    <Image source={require('../Images/picsou.jpg')} style={styles.image} 
                        resizeMode='contain'
                    />
                </View>
            </View>
            <Controller isPause={isPause} songs={songs} />
            <SwiperView songs={songs} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(66, 0, 0, 1)',
    },
    music_control: {

    },
    image: {
        width: width -40,
        height: 300,
        marginVertical: 30,
        alignItems: 'center',
    },
    top: {
        marginTop: 5,
        marginBottom: 20,
        marginHorizontal: 20,
    },
});

export default connector(Player);