import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Animated } from 'react-native';
import Slider from '@react-native-community/slider';
import { Icon } from 'react-native-elements';
import TrackPlayer, { usePlaybackState, useProgress, RepeatMode
} from 'react-native-track-player';

import { formatTime, stubStringText } from '../Helpers/helpers';
import { GlobalStyles } from '../GlobalStyles';
import { connector } from '../connector';
import { IS_REPEAT, IS_SUFFLE, LAST_TRACK } from '../Redux/Type';
import trackAction from '../Redux/Action';

const { width } = Dimensions.get('window');

const Controller = (props) => {
    const { isPause, songs,
        dispatch, playlist, isRepeat, isSuffle, lastTrack
    } = props;
    const { position, duration } = useProgress();
    const playBackState = usePlaybackState();
    const animationValue = new Animated.Value(0);

    const toggleControl = async () => {
        if(playBackState === 'playing' || playBackState === 3) {
            TrackPlayer.pause();
        } else if(playBackState === 'paused' || playBackState === 2) {
            TrackPlayer.play();
        }
    }

    const setup = async (ind) => {
        await TrackPlayer.setupPlayer();
        await TrackPlayer.add(songs[ind]);
        TrackPlayer.play();
    }

    const goNext = async () => {
        let musIndex;
        if(lastTrack === songs.length - 1) {
            await dispatch(trackAction(0, LAST_TRACK));
            musIndex = 0;
            setup(musIndex);
        } else {
            await dispatch(trackAction((lastTrack + 1), LAST_TRACK));
            musIndex = lastTrack + 1;
            setup(musIndex);
        }
    }

    useEffect(() => {
        if(position > duration) {
            dispatch(trackAction((lastTrack + 1), LAST_TRACK));
        }
    }, [position, duration]);

    useEffect(() => {
        Animated.timing(animationValue, {
            toValue: -500,
            duration: 9500,
            useNativeDriver: false,
        }).start();
    }, [animationValue]);

    const goBack = async() => {
        let musIndex;
        if(lastTrack >= 0) {
            await dispatch(trackAction((lastTrack - 1), LAST_TRACK));
            musIndex = lastTrack - 1;
            setup(musIndex);
        } else {
            await dispatch(trackAction((songs.length - 1), LAST_TRACK));

            musIndex = songs.length - 1;
            setup(musIndex);
        }
    }

    const onRepeatMode = async () => {
        if(!isRepeat) {
            dispatch(trackAction(true, IS_REPEAT));
        //    TrackPlayer.setRepeatMode({mode: RepeatMode.Track});
        } else {
            dispatch(trackAction(false, IS_REPEAT));
            // TrackPlayer.setRepeatMode(RepeatMode.Off);
        }
    } 

    return (
        <View style={{ paddingHorizontal: 40 }}>
            <View style={GlobalStyles.row_between_center}>
                <Icon name="thumb-down-outline" type="material-community" color="#fff" size={20} 
                    // iconStyle={{ flex: 2 }}
                />
                <View style={{ flex: 7, overflow: 'hidden', }}>
                    <Animated.Text style={[styles.title, {
                        transform: [
                            {
                                translateX: animationValue.interpolate({
                                    inputRange: [0, 50],
                                    outputRange: [-50, 400],
                                }),
                            }
                        ],
                        width: 800,
                    }]}>
                        {stubStringText(songs[lastTrack].title.toString(), 50)}
                    </Animated.Text>
                </View>
                <Icon name="thumb-up-outline" type="material-community" color="#fff" size={20} 
                    // iconStyle={{ flex: 2 }}
                />
            </View>
            <Text style={styles.artist_name}>{songs[lastTrack].artist.toString()}</Text>
            <View style={{ marginTop: 10 }}>
                <Slider
                    style={{ height: 40, width: width - 50, marginLeft: -15 }}
                    value={position}
                    minimumValue={0}
                    maximumValue={duration}
                    minimumTrackTintColor="#FFFFFF"
                    maximumTrackTintColor="#ffffff"
                    thumbTintColor='#fff'
                    onSlidingComplete={(val) => TrackPlayer.seekTo(val)}
                />
            </View>
            <View style={[GlobalStyles.row_between_center, { marginTop: -10 }]}>
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{formatTime(position)}</Text>
                <Text style={{ color: 'rgba(255, 255, 255, 0.9)' }}>{formatTime(duration)}</Text>
            </View>
            <View style={[GlobalStyles.row_between_center, { marginTop: 30 }]}>
                <Icon name="shuffle" type="ionicon" color="#fff" 
                    onPress={() => {}}
                />
                <Icon name="step-backward" type="font-awesome" color="#fff" 
                    onPress={() => goBack()} iconStyle={{ padding: 10 }}
                />
                <TouchableOpacity style={[styles.btn_pause, GlobalStyles.center]}
                    onPress={() => toggleControl()}
                >
                    <Icon name={isPause ? "play" : "pause"} type="ionicon" color="#fff" 
                        size={40} 
                    />
                </TouchableOpacity>
                <Icon name="step-forward" type="font-awesome" color="#fff" 
                    onPress={() => goNext()} iconStyle={{ padding: 10 }}
                />
                <Icon name={isRepeat ? "repeat-sharp" : "repeat"} type="ionicon" 
                    color={isRepeat ? "yellow" : "#fff"}
                    onPress={() => onRepeatMode()}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    artist_name: {
        textAlign: 'center',
        marginVertical: 5,
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 16,
    },
    btn_pause: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: 'rgba(107, 5, 5, 1)',
    },
});

export default connector(Controller);