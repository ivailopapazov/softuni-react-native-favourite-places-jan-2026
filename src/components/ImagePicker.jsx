import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync, MediaType } from 'expo-image-picker';


export default function ImagePicker({
    styles = {},
    imageUri,
    onImagePicked,
}) {
    const requestPermission = async () => {
        const { status } = await requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission denied! You need to grant camera roll permissions to use this feature.');

            return false;
        }

        return true;
    };

    const pickImageHandler = async () => {
        const hasPermission = await requestPermission();

        if (!hasPermission) {
            return;
        }

        const result = await launchImageLibraryAsync({
            // allowsEditing: true,
            // aspect: [16, 9],
            quality: 0.3,
        });

        onImagePicked(result.assets[0].uri);
    }

    return (
        <View style={[styles.container, styles]}>
            <TouchableOpacity style={styles.picker} onPress={pickImageHandler}>
                {imageUri
                    ? <Image source={{ uri: imageUri }} style={styles.image} />
                    : (
                        <View style={styles.placeholder}>
                            <Ionicons name="images-outline" size={48} color="#94a3b8" />
                            <Text style={styles.placeholderText}>Tap to select from gallery</Text>
                        </View>
                    )}
            </TouchableOpacity>

            {imageUri && (
                <TouchableOpacity style={styles.changeButton} onPress={pickImageHandler}>
                    <Ionicons name="refresh" size={16} color="#6366f1" />
                    <Text style={styles.changeText}>Change Image</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    picker: {
        width: '100%',
        height: 200,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#f1f5f9',
        borderWidth: 2,
        borderColor: '#e2e8f0',
        borderStyle: 'dashed',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    placeholderText: {
        fontSize: 14,
        color: '#94a3b8',
        fontWeight: '500',
    },
    changeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        marginTop: 12,
        padding: 8,
    },
    changeText: {
        fontSize: 14,
        color: '#6366f1',
        fontWeight: '600',
    },
});

