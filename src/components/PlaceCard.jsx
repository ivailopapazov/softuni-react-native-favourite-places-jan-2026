import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated from 'react-native-reanimated';
import { useRef, useEffect } from 'react';

const PlaceCard = ({
    imageUri,
    title,
    address,
    // onPress,
    style = {},
}) => {
    // const ref = useRef();

    // useEffect(() => {
    //     ref.current.measure((x, y, width, height, pageX, pageY) => {
    //         console.log('Measured:', { x, y, width, height, pageX, pageY });
    //     })
    // }, []);

    return (
        <Animated.View style={[styles.container, style]}>
            <View style={styles.imageContainer}>
                {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="image-outline" size={40} color="#cbd5e1" />
                    </View>
                )}
            </View>
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{title}</Text>
                <View style={styles.addressContainer}>
                    <Ionicons name="location-outline" size={14} color="#64748b" />
                    <Text style={styles.address} numberOfLines={1}>{address || 'No address'}</Text>
                </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
        </Animated.View>

    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginHorizontal: 16,
        marginVertical: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    imageContainer: {
        position: 'relative',
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 12,
    },
    imagePlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 12,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    offlineBadge: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: '#f59e0b',
        borderRadius: 10,
        padding: 4,
    },
    content: {
        flex: 1,
        marginLeft: 14,
        marginRight: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 4,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    address: {
        fontSize: 13,
        color: '#64748b',
        flex: 1,
    },
});

export default PlaceCard;
