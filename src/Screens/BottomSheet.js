import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Animated, 
    Dimensions, TouchableOpacity 
} from 'react-native';
import { Icon } from 'react-native-elements';

import { GlobalStyles } from '../GlobalStyles';
import { stubStringText } from '../Helpers/helpers';

const { width, height } = Dimensions.get('window');

const BottomSheet = (props) => {
    const { songSheet, showBottomSheet, setShowBottomSheet } = props;
    const { title } = songSheet;
    const position = new Animated.Value(-height);

    useEffect(() => {
        Animated.spring(position,
            {
                toValue: 0,
                useNativeDriver: false,
            }
        ).start();
    }, []);

    const unShowBottomSheet = () => {
        setShowBottomSheet(false);
    }

    return (
        <Animated.View style={[{ position: 'absolute', 
            bottom: position,
        }, styles.container]}
            onPress={() => setShowBottomSheet(false)}
        >
            <Text style={styles.text_header}>{stubStringText(title, 25)}</Text>
            <View style={styles.text_render}>
                <TouchableOpacity style={[styles.text_render_containt, 
                    GlobalStyles.row_between_center]}
                    onPress={() => unShowBottomSheet()}
                >
                    <Text style={styles.text_2}>Play later</Text>
                    <Icon name="chevron-forward" type='ionicon' color="#fff" size={15} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.text_render_containt, 
                    GlobalStyles.row_between_center]}
                    onPress={() => unShowBottomSheet()}
                >
                    <Text style={styles.text_2}>Add to queue</Text>
                    <Icon name="chevron-forward" type='ionicon' color="#fff" size={15} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.text_render_containt, 
                    GlobalStyles.row_between_center]}
                    onPress={() => unShowBottomSheet()}
                >
                    <Text style={styles.text_2}>Add to playlist</Text>
                    <Icon name="chevron-forward" type='ionicon' color="#fff" size={15} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.text_render_containt, 
                    GlobalStyles.row_between_center]}
                    onPress={() => unShowBottomSheet()}
                >
                    <Text style={styles.text_2}>Delete</Text>
                    <Icon name="chevron-forward" type='ionicon' color="#fff" size={15} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.text_render_containt, 
                    GlobalStyles.row_between_center]}
                    onPress={() => unShowBottomSheet()}    
                >
                    <Text style={styles.text_2}>Share</Text>
                    <Icon name="chevron-forward" type='ionicon' color="#fff" size={15} />
                </TouchableOpacity>
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        width, backgroundColor: "#6b0505",
        height: 400,
        zIndex: 200,
        borderTopStartRadius: 30,
        borderTopRightRadius: 30,
        padding: 20,
    },
    text_header: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 23,
        color: "#fff",
    },
    text_2: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 17,
    },
    text_render: {
        marginVertical: 20,
    },
    text_render_containt: {
        paddingVertical: 20,
    },
});

export default BottomSheet;