import React, { useLayoutEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { Icon } from 'react-native-elements';

import { GlobalStyles } from '../GlobalStyles';
import { svg } from '../svg';
import ListSong from './ListSong';
import { DELETE } from '../Redux/Type';
import trackAction from '../Redux/Action';
import { connector } from '../connector';

const TrackPlaylist = (props) => {
    const { route, navigation, dispatch } = props;
    const { title, songs } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            title,
            headerRight: () => renderHeaderRigth(),
        });
    }, []);

    const deletePlaylist = () => {
        Alert.alert('Delete user',  `Are you sure to delete ${title} playlist`,
            [
                { text: 'Cancel', style: 'destructive' },
                { text: 'Yes', onPress: async () => {
                    await dispatch(trackAction({ name: title }, DELETE));

                    navigation.goBack();
                }}
            ],
            {
              cancelable: true,
              onDismiss: () => {},
            }   
        );
    }

    const renderHeaderRigth = () => {
        return (
            <TouchableOpacity style={styles.header_rigth}
                onPress={() => deletePlaylist()}
            >
                <Icon name="trash-outline" size={20} type="ionicon" color="#fff" 
                    iconStyle={{ padding: 5 }}
                />
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            {songs.length < 1 ? (
                <View style={[GlobalStyles.center, { marginTop: 40 }]}>
                    <SvgXml xml={svg} width='90%' height={300} />
                    <Text style={styles.text}>This Playlist is empty</Text>
                </View>
            ) : (
                <ListSong songs={songs} />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: 'rgba(66, 0, 0, 1)',
        paddingTop: 20,
    },
    text: {
        fontSize: 21,
        color: '#fff',
        fontWeight: 'bold',
        marginTop: 20,
    },
    header_rigth: {
        marginRight: 15,
    }
});

export default connector(TrackPlaylist);