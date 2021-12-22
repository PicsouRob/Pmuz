import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Vibration } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image, Icon } from 'react-native-elements';
import TrackPlayer, { Event, usePlaybackState, Capability
} from 'react-native-track-player';

import { GlobalStyles } from '../GlobalStyles';
import { stubStringText } from '../Helpers/helpers';
import { connector } from '../connector';
import { LAST_TRACK } from '../Redux/Type';
import trackAction from '../Redux/Action';

const ListSong = (props) => {
    const { songs, isSelectShow, setIsSelectShow, selectedCount, 
        setSelectedCount, lastTrack, setSongSheet, setShowBottomSheet,
        dispatch,
    } = props;
    const navigation = useNavigation();
    const playBackState = usePlaybackState();
    const dataSongPlaylist = [];

    useEffect(() => {
        TrackPlayer.updateOptions({
            capabilities: [
                Capability.Play,
                Capability.Pause,
                Capability.SkipToNext,
                Capability.SkipToPrevious,
            ],
        });
    }, []);

    const onPressSong = async (item, index) => {
        setShowBottomSheet(false);
        if(!isSelectShow) {
            await navigation.navigate('Player', { songs: songs });
            await TrackPlayer.setupPlayer();
            await TrackPlayer.add(songs[index]);
            await TrackPlayer.play();
            await dispatch(trackAction(index, LAST_TRACK));
        } else {
            const data = songs.map((ele, index) => {
                if(ele === item && item.checked === false) {
                    ele.checked = true;
                    // console.log(ele);
                    setSelectedCount(selectedCount + 1);
                } else if(ele === item && item.checked === true) {
                    ele.checked = false;
                    setSelectedCount(selectedCount - 1);
                }
            });

            songs.filter((res) => {
                if(res.checked === true) {
                    // setdataPlaylist([...dataPlaylist, res]);
                    dataSongPlaylist.push(res);
                }
                // console.log(dataSongPlaylist);
            })
            
            return data;
        }
    };

    const longPress = async (item) => {
        await Vibration.vibrate(100, false);
        setIsSelectShow(true);
        setSelectedCount(1);
        const data = await songs.map(async (ele, ind) => {
            if(ele === item) {
                item.checked = true;
            }
        });

        return data;
    };

    const songsDotSelect = (item, index) => {
        setShowBottomSheet(true);
        setSongSheet(item);
    }

    return (
        <View style={styles.container}>
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={songs}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                    <View style={[styles.item, GlobalStyles.row_between_center]} 
                        key={index}
                    >
                        <TouchableOpacity style={[GlobalStyles.row, { flex: 9 }]}
                            onPress={() => onPressSong(item, index)}
                            onLongPress={() => longPress(item, index)}
                        >
                            <Image style={styles.img} source={require('../Images/picsou.jpg')} 
                                onLoad={lastTrack === index ? true : false}
                            />
                            <View>
                                <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}
                                >{stubStringText(item.title, 30)}</Text>
                                <Text style={{ color: "#fff" }}>{stubStringText(item.artist, 30)}</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{  }}>
                            {isSelectShow ? (
                                <Icon name={item.checked ? "checkmark-circle" : "ellipse"} 
                                    type="ionicon" size={30} 
                                    color={item.checked ? "#f39c12" : "#bdc3c7"} 
                                />
                            ) : (
                                <View style={GlobalStyles.row}>
                                    {(lastTrack === index && playBackState === 3) && (
                                        <Image style={styles.gift} source={require('../Images/music.gif')} />
                                    )}
                                    <TouchableOpacity 
                                        onPress={() => songsDotSelect(item, index)}
                                    >
                                        <Icon name="dots-vertical" type="material-community" size={20} color="#fff" 
                                            
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={{ marginBottom: 20, paddingBottom: 20 }}
                ListFooterComponent={() => (
                    <View style={{ paddingVertical: 20 }}></View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(66, 0, 0, 1)',
    },
    item: {
        height: 60,
        backgroundColor: 'transparent',
        marginBottom: 5,
        borderRadius: 5,
        zIndex: 0,
    },
    img: {
        width: 50,
        height: 45,
        borderRadius: 5,
        marginRight: 20,
    },
    gift: {
        width: 25,
        height: 25,
        borderRadius: 5,
        marginRight: 10,
    }
});

export default connector(ListSong);