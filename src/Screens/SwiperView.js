import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { Icon, Image } from 'react-native-elements';
import SwipeView from 'react-native-vertical-swipe-view';

import { GlobalStyles } from '../GlobalStyles';
import { stubStringText } from '../Helpers/helpers';
import trackAction from '../Redux/Action';
import { LAST_TRACK } from '../Redux/Type';
import { connector } from '../connector';

const { width } = Dimensions.get('window');

const SwiperView = (props) => {
    const { songs, lastTrack, dispatch } = props;
    const [isVisible, setIsVisible] = useState(false);

    const selectSong = (item) => {
        dispatch(trackAction(item, LAST_TRACK));
    }

    return (
        <SwipeView
            position="bottom"
            visible={isVisible}
            style={styles.curtainView}
            maxHeight={500}
            headerStyle={styles.headerStyle}
            renderHeader={() => (
                <View style={styles.bottom}>
                    <View style={GlobalStyles.center}>
                        <View style={[styles.lineTop]}></View>
                    </View>
                    <View style={GlobalStyles.row_between_center}>
                        <TouchableOpacity
                            onPress={() => setIsVisible(!isVisible)}
                        >
                            <Text style={styles.text_header}>A SUIVRE</Text>
                        </TouchableOpacity>
                        <Text style={styles.picsou}>PICSOU</Text>
                        <TouchableOpacity
                            onPress={() => setIsVisible(!isVisible)}
                        >
                            <Text style={styles.text_header}>SIMILAIRES</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}>
            <View style={styles.curtainContainer}>
                <FlatList 
                    data={songs}
                    showsVerticalScrollIndicator={false}
                    initialScrollIndex={lastTrack - 1}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity style={[styles.item, GlobalStyles.row_between_center]} key={index}
                            onPress={() => selectSong(index)}
                        >
                            <View style={GlobalStyles.row}>
                                <Image style={styles.img} source={require('../Images/picsou.jpg')} />
                                <View>
                                    <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>
                                        {stubStringText(item.title, 25)}
                                    </Text>
                                    <Text style={{ color: "#fff" }}>{item.artist}</Text>
                                </View>
                            </View>
                            <View style={GlobalStyles.row}>
                                {lastTrack === index && (
                                    <Image style={styles.gift} source={require('../Images/music.gif')} />
                                )}
                                <Icon name="dots-vertical" type="material-community" size={20} color="#fff" />
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SwipeView>
    )
}

const styles = StyleSheet.create({
    curtainView: {
        width,
        position: 'absolute',
        bottom: 0,
    },
    headerStyle: {
        backgroundColor: 'rgba(107, 5, 5, 1)', 
        height: 65, 
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottom: {
        backgroundColor: 'rgba(107, 5, 5, 1)',
        paddingHorizontal: 30,
    },
    text_header: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.9)',
    },
    picsou: { 
        fontSize: 14, 
        fontWeight: 'bold', 
        color: 'rgba(255, 255, 255, 0.6)' 
    },
    lineTop: {
        width: 45,
        height: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 15,
        borderRadius: 5,
    },
    curtainContainer: {
        backgroundColor: 'rgba(107, 5, 5, 1)',
        flex: 1,
        height: 500,
        paddingHorizontal: 20,
    },
    item: {
        height: 60,
        backgroundColor: 'transparent',
        marginBottom: 10,
        borderRadius: 5,
        paddingHorizontal: 10,
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

export default connector(SwiperView);