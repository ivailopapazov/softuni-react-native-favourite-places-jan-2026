import { launchCameraAsync, useCameraPermissions } from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from './Button.jsx';
import {
    ActivityIndicator,
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
} from 'react-native';

export default function CameraCapture({
    style = {},
    onPhotoTaken,
}) {
    const [status, requestPermission] = useCameraPermissions();

    if (!status) {
        // Camera permissions are still loading
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (!status.granted) {
        // Camera permissions are not granted yet
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>Camera access is required to take photos.</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    const takePhotoHandler = async () => {
        const result = await launchCameraAsync({
            allowsEditing: false,
            quality: 0.5,
        })

        if (!result.canceled) {
            console.log('Photo taken:', result.assets[0].uri);
            if (onPhotoTaken) {
                onPhotoTaken(result.assets[0].uri);
            }
        }
    };

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity style={styles.cameraButton} onPress={takePhotoHandler}>
                <Ionicons name="camera-outline" size={24} color="#6366f1" />
                <Text style={styles.cameraButtonText}>Take Photo</Text>
            </TouchableOpacity>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {},
    cameraButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        backgroundColor: '#e0e7ff',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
    },
    cameraButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6366f1',
    },
    permissionText: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    cameraControls: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    closeButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },
    bottomControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32,
        paddingBottom: 40,
    },
    spacer: {
        width: 50,
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    captureButtonInner: {
        width: 66,
        height: 66,
        borderRadius: 33,
        backgroundColor: '#fff',
    },
    flipButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
