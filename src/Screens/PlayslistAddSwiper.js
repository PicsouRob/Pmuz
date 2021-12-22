import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,
    Dimensions, Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import SwipeView from 'react-native-vertical-swipe-view';

import { connector } from '../connector';
import { GlobalStyles } from '../GlobalStyles';
import { PLAYLIST } from '../Redux/Type';
import trackAction from '../Redux/Action';

const PlayslistAddSwiper = (props) => {
    const { swiperVisible, playlist, selectedCount, closeShower,
        setSwiperVisible, setChoosePlaylist, toastRef, musics,
        dispatch, 
    } = props;

    const alertPlaylist = async (text, name) => {
        Alert.alert('Error Creating Playlist',
            `You need to select at least 1 song for ${text === 'new' ? 
                'add a new playlist'
                : 'update this playlist ' + name}`,
            [
                { text: 'cancel' },
                { text: 'Ok', onPress: () =>  {}}
            ]
        );
    }

    const existPlaylist = async (name) => {
        if(selectedCount === 0) {
            alertPlaylist('exist', name);
        } else {
            const existSong = await playlist.find((item) => item.name === name);
            await musics.filter(mus => {
                if(mus.checked === true) {
                    existSong.songs.push(mus);
                }
            });
            
            const { id, songs } = await existSong;
            const data = await { name, id, songs };
            dispatch(trackAction(data, PLAYLIST));
            
            closeShower();
            toastRef.current.show(`${name} playlist is update with success`, 2500);
        }
    }

    const newPlaylist = async () => {
        await setSwiperVisible(false);
        if(selectedCount === 0) {
            alertPlaylist('new');
        } else {
            setChoosePlaylist(true);
        }
    }

    return (
        <SwipeView
            position="bottom"
            visible={swiperVisible}
            style={styles.curtainView}
            maxHeight={500}
            headerStyle={styles.header}
            renderHeader={() => (
                <View>
                    <View style={GlobalStyles.center}>
                        <View style={styles.lineTop}></View>
                    </View>
                    <Text style={styles.header_swiper}>Add to a PlayList</Text>
                </View>
            )}
        >
            <ScrollView showsVerticalScrollIndicator={false}
                style={styles.playlist_option}
            >
                <TouchableOpacity style={[GlobalStyles.row_between_center, { paddingVertical: 10 }]}
                    onPress={() => newPlaylist()}
                >
                    <View style={GlobalStyles.row}>
                        <Icon name='duplicate-outline' type='ionicon' 
                            color='#fff' size={20} iconStyle={{ marginRight: 20 }}
                        />
                        <Text style={styles.text_playlist}>New PlayList</Text>
                    </View>
                    <Icon name='chevron-forward-outline' type='ionicon' 
                            color='#fff' size={20} 
                    />
                </TouchableOpacity>
                {playlist &&
                    playlist.map((item, index) => (
                        <TouchableOpacity key={index} 
                            style={[GlobalStyles.row_between_center, { paddingVertical: 10 }]}
                            onPress={() => existPlaylist(item.name)}
                        >
                            <View style={GlobalStyles.row}>
                                <Icon name='duplicate-outline' type='ionicon' 
                                    color='#fff' size={20} iconStyle={{ marginRight: 20 }}
                                />
                                <Text style={styles.text_playlist}>{item.name}</Text>
                            </View>
                            <Icon name='chevron-forward-outline' type='ionicon' 
                                color='#fff' size={20} 
                            />
                        </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </SwipeView>
    )
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    playlist_option: {
        backgroundColor: '#6b0505',
        flex: 1,
        height: 500,
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    lineTop: {
        width: 45,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 15,
        borderRadius: 5,
    },
    header_swiper: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    header: {
        height: 65,
        backgroundColor: 'rgba(107, 5, 5, 1)', 
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        zIndex: 200,
    },
    curtainView: {
        width,
        position: 'absolute',
        bottom: -70,
        zIndex: 220,
    },
    text_playlist: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default connector(PlayslistAddSwiper);