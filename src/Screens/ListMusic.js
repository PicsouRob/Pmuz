import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView,
    Dimensions, Alert, ActivityIndicator
} from 'react-native';
import MusicFiles, {
    Constants,
  } from "react-native-get-music-files-v3dev-test";
import { Image, Icon, Input } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import TrackPlayer, { Event, usePlaybackState, Capability, useProgress
} from 'react-native-track-player';

import { requestPermission, stubStringText, getProgressValue } from '../Helpers/helpers';
import { GlobalStyles } from '../GlobalStyles';
import ListSong from './ListSong';
import { connector } from '../connector';
import SetPlaylist from './SetPlaylist';
import BottomSheet from './BottomSheet';
import PlayslistAddSwiper from './PlayslistAddSwiper';
import { IS_REPEAT, IS_SUFFLE, LAST_TRACK } from '../Redux/Type';
import trackAction from '../Redux/Action';

const ListMusic = (props) => {
    const { navigation, dispatch, playlist, lastTrack } = props;
    const [musics, setMusics] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isSelectShow, setIsSelectShow] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);
    const [selectAll, setSelectAll] = useState(false);
    const [choosePlaylist, setChoosePlaylist] = useState(false);
    const [swiperVisible, setSwiperVisible] = useState(false);
    const [songSelected, setSongSelected] = useState([]);
    const [songSheet, setSongSheet] = useState({});
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const playBackState = usePlaybackState();
    const { position, duration } = useProgress();
    const toastRef = useRef();

    useEffect(() => {
        MusicFiles.getAll({
            blured : true, // works only when 'cover' is set to true
            artist : true,
            duration : true, //default : true
            cover : false, //default : true,
            genre : true,
            title : true,
            cover: true,
            batchSize: 0,
            batchNumber: 0,
            sortBy: Constants.SortBy.Title,
            sortOrder: Constants.SortOrder.Descending
        }).then((songs) => {
            const resultsArray = [];
            songs.results.forEach(async (res) => {
                const song = {
                    id: res.id,
                    duration: res.duration,
                    url: `file://${res.path}`,
                    title: res.title,
                    artist: res.artist,
                    album: res.album,
                    artwork: require('../Images/picsou.jpg'),
                    checked: false,
                };
                
                resultsArray.push(song);
            })
            
            setMusics(resultsArray);
        }).catch(er => console.log(e));
    }, []);

    const handleSearchSong = (val) => {
        MusicFiles.search({
            searchParam: val,
            batchSize: 0,
            batchNumber: 0,
            sortBy: Constants.SortBy.Title,
            sortOrder: Constants.SortOrder.Ascending,
        })
        .then(songs => {
            setMusics(songs.results);
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        if(playBackState === 'playing' || playBackState === 3) {
            setIsPlaying(true);
        } else if(playBackState === 'playing' || playBackState === 2) {
            setIsPlaying(false);
        }
    }, [playBackState]);

    // useEffect(() => {
    //     const setup = async () => {
    //         if(getProgressValue(position) >= getProgressValue(duration)) {
    //             dispatch(trackAction((lastTrack + 1), LAST_TRACK));
    //             await TrackPlayer.setupPlayer();
    //             await TrackPlayer.add(musics[lastTrack]);
    //             TrackPlayer.play();
    //         }
    //     }

    //     setup();
    // }, [lastTrack]);

    const closeShower = () => {
        setIsSelectShow(false);
        setSelectAll(false);
        setSelectedCount(0);
        setSwiperVisible(false);

        musics.filter(mus => {
            if(mus.checked === true) {
                mus.checked = false;
            }
        });
    }

    const selectPlaylist = () => {
        setSwiperVisible(true);
        const musicsChecked = [];
        musics.filter(mus => {
            if(mus.checked === true) {
                musicsChecked.push(mus);
            }
        });
        
        setSongSelected(musicsChecked);
    }

    const toggleMusic = async () => {
        await setIsPlaying(!isPlaying);

        isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
    }

    const goNext = async () => {
        if(lastTrack === musics.length - 1) {
            await dispatch(trackAction(0, LAST_TRACK));
        } else {
            await dispatch(trackAction((lastTrack + 1), LAST_TRACK));
        }

        if(playBackState === 'paused' || playBackState === 2) {
            TrackPlayer.play();
        }
    }

    return (
        <View style={styles.container}>
            <Toast position='top' ref={toastRef} opacity={0.9} />
            {choosePlaylist && (
                <SetPlaylist setIsVisible={setChoosePlaylist} 
                    isVisible={choosePlaylist} songSelected={songSelected}
                    closeShower={closeShower} toastRef={toastRef}
                />
            )}
            {showBottomSheet && (
                <BottomSheet songSheet={songSheet} setShowBottomSheet={setShowBottomSheet} 
                    showBottomSheet={showBottomSheet}
                />
            )}
            {isSelectShow ? (
                <View style={[GlobalStyles.row_between_center, { marginVertical: 15 }]}>
                    <TouchableOpacity onPress={() => closeShower()}>
                        <Icon name='close' type='ionicon' color='#fff' size={25} 
                            iconStyle={{ padding: 5 }}
                        />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}>
                        {selectedCount} Songs Selected
                    </Text>
                    <Icon name={selectAll ? "checkmark-circle" : "ellipse"} 
                        type="ionicon" size={30} 
                        color={selectAll ? "#f39c12" : "#bdc3c7"} 
                    />
                </View>
            ) : (
                <View style={[GlobalStyles.center]}>
                    <Input 
                        placeholder='Rechercher des chansons'
                        inputContainerStyle={styles.input}
                        inputStyle={{ fontSize: 15, color: 'rgba(255, 255, 255, 0.8)' }}
                        leftIcon={() => (
                            <Icon name='search' type='ionicon' color='#fff' size={20} />
                        )}
                        rightIcon={() => (
                            <View style={GlobalStyles.row_between_center}>
                                <Text style={styles.text}>|</Text>
                                <Icon name='mic-outline' type='ionicon' color='#fff' size={20} />
                            </View>
                        )}
                        onChangeText={(e) => handleSearchSong(e)}
                    />
                </View>
            )}
            <ListSong songs={musics} isSelectShow={isSelectShow} setIsSelectShow={setIsSelectShow} 
                selectedCount={selectedCount} setSelectedCount={setSelectedCount}
                setSongSheet={setSongSheet} setShowBottomSheet={setShowBottomSheet}
            />
            <View style={styles.bottom}>
                {isSelectShow ? (
                    <View style={[GlobalStyles.row_between_center, { paddingTop: 3 }]}>
                        <TouchableOpacity>
                            <Icon name='close-circle-outline' type='ionicon' color='#fff' size={25} 
                                iconStyle={{ padding: 3 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => selectPlaylist()}>
                            <Icon name='duplicate-outline' type='ionicon' color='#fff' size={25} 
                                iconStyle={{ padding: 3 }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name='trash-outline' type='ionicon' color='#fff' size={25} 
                                iconStyle={{ padding: 3 }} 
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon name='ellipsis-vertical-circle-outline' type='ionicon' color='#fff' size={25} 
                                iconStyle={{ padding: 3 }}
                            />
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={GlobalStyles.row_between_center}>
                        <TouchableOpacity style={[GlobalStyles.row, { flex: 9 }]}
                            onPress={() => navigation.navigate('Player', { songs: musics })}
                        >
                            <View style={styles.bottom_img}>
                                <Image style={styles.img_bottom} source={require('../Images/picsou.jpg')} />
                            </View>
                            {musics.length > 0 ? (
                                <View>
                                    <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>
                                        {stubStringText(musics[lastTrack].title, 28)}
                                    </Text>
                                    <Text style={{ color: "#fff" }}>
                                        {stubStringText(musics[lastTrack].artist, 30)}
                                    </Text>
                                </View>
                            ) : (<ActivityIndicator size='small' color="#fff" />)}
                        </TouchableOpacity>
                        <View style={[GlobalStyles.row, { flex: 2 }]}>
                            <Icon name={isPlaying ? "pause" : 'play'} type="ionicon" size={22} color="#fff" 
                                onPress={() => toggleMusic()}
                                iconStyle={{ marginRight: 15, padding: 5 }}
                            />
                            <Icon name="step-forward" type="font-awesome" color="#fff" 
                                onPress={() => goNext()} iconStyle={{ padding: 3 }} size={18}
                            />
                        </View>
                    </View>
                )}
            </View>
            <PlayslistAddSwiper swiperVisible={swiperVisible} selectedCount={selectedCount} 
                setSwiperVisible={setSwiperVisible} setChoosePlaylist={setChoosePlaylist}
                closeShower={() => closeShower()} toastRef={toastRef} musics={musics}
            />
        </View>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(66, 0, 0, 1)',
        paddingHorizontal: 20,
    },
    input: {
        width: width - 40,
        height: 40,
        backgroundColor: '#6b0505',
        borderBottomColor: 'transparent',
        borderWidth: 0,
        borderRadius: 50,
        marginTop: 20,
        marginLeft: -10,
        paddingHorizontal: 10,
        color: '#fff',
    },
    text: {
        color: 'grey',
        fontWeight: 'bold',
        paddingRight: 10,
        fontSize: 20,
    },
    bottom: {
        width,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        backgroundColor: '#6b0505',
        paddingHorizontal: 20,
        paddingVertical: 5,
        zIndex: 100,
    },
    img_bottom: {
        width: 45,
        height: 45,
        borderRadius: 50,
        marginRight: 20,
    },
    bottom_img: {
        marginTop: -20,
    },
});

export default connector(ListMusic);