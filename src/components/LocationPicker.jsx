// import { AppleMaps, GoogleMaps, useLocationPermissions } from 'expo-maps';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, } from "react-native";
import { getCurrentPositionAsync, Accuracy, useForegroundPermissions, reverseGeocodeAsync } from 'expo-location';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function LocationPicker({
    onLocationPicked,
    onCoordsPicked,
    coords,
}) {
    const [status, requestPermission] = useForegroundPermissions();

    if (!status) {
        return <ActivityIndicator size="large" color="#6366f1" style={styles.container} />;
    }

    if (!status.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.permissionText}>Location permission is required to select a place on the map.</Text>
                <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                    <Ionicons name="location" size={20} color="#fff" />
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const getAddressFromCoords = async (coords) => {
        try {
            const addresses = await reverseGeocodeAsync(coords);
            if (addresses.length > 0) {
                const addr = addresses[0];
                const addressString = [
                    addr.name,
                    addr.street,
                    addr.city,
                    addr.region,
                    addr.country,
                ].filter(Boolean).join(', ');

                return addressString;
            }
        } catch (error) {
            console.error('Geocoding error:', error);
        }
    };

    const getCurrentLocationHandler = async () => {
        const result = await getCurrentPositionAsync({
            accuracy: Accuracy.Highest,
        });

        const address = await getAddressFromCoords(result.coords);

        onCoordsPicked(result.coords);
        onLocationPicked(address);
    };

    // const mapPressedHandler = async (event) => {
    //     console.log(event);

    //     const { latitude, longitude } = event.nativeEvent.coordinate;

    //     const address = await getAddressFromCoords({ latitude, longitude });
    //     onCoordsPicked({ latitude, longitude });
    //     onLocationPicked(address);
    // };

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {/* <GoogleMaps.View
                    style={styles.map}
                    initialCamera={{
                        center: { latitude: 37.78825, longitude: -122.4324 },
                    }}
                    onPress={mapPressedHandler}
                /> */}

                <View style={styles.mapOverlay}>
                    <Text style={styles.overlayText}>Map preview will appear here</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocationHandler}>
                <Ionicons name="locate" size={20} color="#6366f1" />
                <Text style={styles.locationButtonText}>Use Current Location</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    mapContainer: {
        height: 250,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#f1f5f9',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    mapOverlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
    },
    overlayText: {
        fontSize: 14,
        color: '#64748b',
        fontWeight: '500',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    locationButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#e0e7ff',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginTop: 12,
    },
    locationButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#6366f1',
    },
});
