import React, { useState, useCallback, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, 
    Dimensions } from 'react-native';
import { Icon, Avatar, Image } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native'; 
import Toast from 'react-native-easy-toast';

import { GlobalStyles } from '../GlobalStyles';
import { connector } from '../connector';
import SetPlaylist from './SetPlaylist';

const { width } = Dimensions.get('window');

const PlayList = (props) => {
    const { playlist, navigation } = props;
    const [isVisible, setIsVisible] = useState(false);
    const toastRef = useRef();

    useFocusEffect(useCallback(() => {
        console.log(playlist);
    }, [playlist]));

    return (
        <View style={styles.container}>
            <Toast position='top' ref={toastRef} opacity={0.9} />
            <View style={[styles.header, GlobalStyles.row_between_center]}>
                <Text style={styles.text_header}>PICSOU</Text>
                <Avatar source={require('../Images/picsou.jpg')} size={30} rounded 
                    avatarStyle={styles.avatar}
                />
                <Icon name="add-circle" type="ionicon" color="#fff" 
                    onPress={() => setIsVisible(true)} size={25}
                />
            </View>
            {playlist ? (
                <FlatList 
                    data={playlist.reverse()}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => (
                        <TouchableOpacity onPress={() => {}}
                            style={[styles.flat_list_item, GlobalStyles.center]}
                            onPress={() => navigation.navigate('TrackPlaylist', {
                                title: item.name, songs: item.songs
                            })}
                        >
                            <Text style={styles.rigth}></Text>
                            <View style={[styles.icon, GlobalStyles.center]}>
                                <Icon name="musical-notes-sharp" type="ionicon" color="#fff" />
                            </View>
                            <Text style={styles.text_1}>{item.name}</Text>
                            <Text style={styles.text_2}>{item.songs.length} Songs</Text>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.flat_list}
                    numColumns={2}
                />
            ) : (
                <View style={GlobalStyles.center}>
                    <Image style={styles.img_empty} source={require('../Images/picsou.png')} />
                    <Text style={styles.text_empty}>My PlayList is empty</Text>
                </View>
            )}

            {isVisible && (
                <SetPlaylist setIsVisible={setIsVisible} isVisible={isVisible} 
                    songSelected={[]} closeShower={() => {}} toastRef={toastRef}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(66, 0, 0, 1)',
    },
    img: {
        width: (width / 2) - 40,
    },
    header: {
        marginTop: 10,
        marginBottom: 20,
    },
    text_header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    flat_list: {
        paddingVertical: 20,
        justifyContent: 'flex-start',
    },
    flat_list_item: {
        width: 170,
        height: 150,
        backgroundColor: "#6b0505",
        borderRadius: 15,
        marginBottom: 20,
        marginRight: 15,
    },
    icon: {
        width: 50,
        height: 50,
        backgroundColor: 'rgba(66, 0, 0, 0.6)',
        borderRadius: 50,
        marginBottom: 15,
    },
    text_1: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    },
    text_2: {
        color: "rgba(255, 255, 255, 0.5)",
        fontWeight: 'bold',
        fontSize: 16,
    },
    rigth: {
        backgroundColor: "#6b0505",
        height: 20,
        width: 60,
        marginTop: -30,
        marginLeft: 80,
        borderRadius: 5,
    },
    img_empty: {
        width: width - 40,
        height: 350,
        marginTop: 40,
    },
    text_empty: {
        color: "rgba(255, 255, 255, 0.8)",
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 30,
    },
});

export default connector(PlayList);