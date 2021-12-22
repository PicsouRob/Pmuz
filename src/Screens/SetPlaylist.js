import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { Input} from 'react-native-elements';

import FadeIn from '../FadeIn';
import { GlobalStyles } from '../GlobalStyles';
import { PLAYLIST } from '../Redux/Type';
import trackAction from '../Redux/Action';
import { connector } from '../connector';

const { width } = Dimensions.get('window');

const SetPlaylist = (props) => {
    const { setIsVisible, isVisible, dispatch, playlist, 
        songSelected, closeShower, toastRef
    } = props;
    const [value, setValue] = useState('');
    const autoFocus = useRef();

    useEffect(() => {
        if(isVisible) {
            autoFocus.current.focus();
        }
    }, [isVisible]);

    const setNewPlaylist = async () => {
        const playlistIsExist = playlist.findIndex(item => item.name === value);
        if(playlistIsExist !== -1) {
            toastRef.current.show(`Sorry!, You already have a playlist called ${value}`, 1500);
            setIsVisible(false);
        } else {
            const data = {
                id: playlist.length + 1,
                name: value,
                songs: songSelected,
            };
    
            await dispatch(trackAction(data, PLAYLIST));
            closeShower();
            toastRef.current.show(`${value} playlist is update with success`, 1500);
    
            setIsVisible(false);
        }
    }

    return (
        <FadeIn>
            <View style={[styles.modal, GlobalStyles.center]}>
                <Text style={styles.text_modal}>Create New PlayList</Text>
                <Text style={[styles.text_empty, { textAlign: 'left' }]}>Entrer le nom de la piste de lecture</Text>
                <Input
                    placeholder="Nom de la Playlist" 
                    containerStyle={styles.container_style}
                    inputContainerStyle={styles.input}
                    ref={autoFocus}
                    onChangeText={(e) => setValue(e)}
                    inputStyle={{ color: '#fff' }}
                />
                <View style={GlobalStyles.row_between_center}>
                    <TouchableOpacity style={[styles.btn, { backgroundColor: 'rgba(66, 0, 0, 1)' },
                        GlobalStyles.center]} onPress={() => setIsVisible(false)}
                    >
                        <Text style={styles.text_btn}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.btn, { backgroundColor: "rgba(252, 3, 32, 1)" }, 
                    GlobalStyles.center]}
                        onPress={() => setNewPlaylist()}
                    >
                        <Text style={styles.text_btn}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </FadeIn>
    )
}

const styles = StyleSheet.create({
    modal: {
        zIndex: 100,
        width: width - 40,
        height: 320,
        borderRadius: 25,
        backgroundColor: '#6b0505',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },
    btn: {
        width: 140,
        height: 50,
        borderRadius: 25,
        marginTop: 30,
        marginHorizontal: 10,
    },
    container_style: {
        backgroundColor: 'rgba(66, 0, 0, 0.6)',
        height: 50,
        borderRadius: 5,
        marginTop: 20,
    },
    input: {
        borderBottomColor: 'transparent',
    },
    text_modal: {
        color: "rgba(255, 255, 255, 0.8)",
        fontWeight: 'bold',
        fontSize: 23,
    },
    text_btn: {
        color: "rgba(255, 255, 255, 1)",
        fontWeight: 'bold',
        fontSize: 17,
    },
    text_empty: {
        color: "rgba(255, 255, 255, 0.8)",
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 30,
    },
});

export default connector(SetPlaylist);