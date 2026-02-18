import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';
import Button from '../../components/Button';
import { usePlace } from '../../contexts/places/usePlaces.js';
import { useEffect, useState } from 'react';

const { width } = Dimensions.get('window');

const PlaceDetailsScreen = ({ route, navigation }) => {
    const { placeId } = route.params;
    const { getPlaceById } = usePlace();
    const [place, setPlace] = useState(null);

    useEffect(() => {
        const placeDetails = getPlaceById(placeId);
        if (!placeDetails) {
            navigation.goBack();
        }

        setPlace(placeDetails);
    }, []);

    if (!place) {
        return (
            <ActivityIndicator style={styles.loadingContainer} size="large" color="#6366f1" />
        );
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* TODO: Show image */}

            <View style={styles.imagePlaceholder}>
                {place.imageUri
                    ? <Image source={{ uri: place.imageUri }} style={styles.image} />
                    : <Ionicons name="image-outline" size={64} color="#cbd5e1" />
                }
            </View>

            <View style={styles.content}>
                <Text style={styles.title}>{place.title}</Text>

                <View style={styles.addressContainer}>
                    <Ionicons name="location" size={18} color="#6366f1" />
                    <Text style={styles.address}>{place.address}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.description}>{place.description}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Location</Text>
                    <View style={styles.mapContainer}>
                        {/* TODO: Map View */}
                    </View>
                    <Text style={styles.coordinates}>
                        latitude, longitude
                    </Text>
                </View>


                <View style={styles.actions}>
                    <Button
                        title="Share Place"
                        icon={<Ionicons name="share-outline" size={20} color="#fff" />}
                        onPress={() => {
                            Sharing.shareAsync(place.imageUri, {
                                mimeType: 'image/jpeg', // Android
                                UTI: 'public.jpeg', // iOS
                                dialogTitle: 'Share Place Image',
                            });
                        }}
                    />
                </View>

                <Text style={styles.createdAt}>
                    Added on {new Date("2025-02-20T14:45:00Z").toLocaleDateString()}
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerButtons: {
        flexDirection: 'row',
        gap: 16,
    },
    headerButton: {
        padding: 4,
    },
    image: {
        width: width,
        height: width * 0.6,
    },
    imagePlaceholder: {
        width: width,
        height: width * 0.6,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    offlineBadge: {
        position: 'absolute',
        top: 16,
        right: 16,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#f59e0b',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    offlineBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    content: {
        padding: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 12,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        marginBottom: 24,
    },
    address: {
        flex: 1,
        fontSize: 15,
        color: '#64748b',
        lineHeight: 22,
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#334155',
        marginBottom: 12,
    },
    description: {
        fontSize: 15,
        color: '#475569',
        lineHeight: 24,
    },
    mapContainer: {
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    coordinates: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 8,
        textAlign: 'center',
    },
    actions: {
        marginBottom: 24,
    },
    createdAt: {
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'center',
    },
});

export default PlaceDetailsScreen;
