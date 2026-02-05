import { use, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { usePlace } from '../../contexts/places/usePlaces.js';
import ImagePicker from '../../components/ImagePicker.jsx';
import CameraCapture from '../../components/CameraCapture.jsx';

export function CreatePlaceScreen({ navigation }) {
    const { createPlace } = usePlace();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUri, setImageUri] = useState(null);

    const savePlaceHandler = async () => {
        await createPlace({ title, description, imageUri });

        navigation.goBack();
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        >
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
            >
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Photo</Text>
                    {/* TODO ImagePicker  */}
                    <ImagePicker onImagePicked={setImageUri} imageUri={imageUri} />
                    <CameraCapture onPhotoTaken={setImageUri} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Details</Text>
                    <Input
                        label="Title"
                        placeholder="Enter place name"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Input
                        label="Description"
                        placeholder="Describe this place..."
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={4}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Location</Text>

                    {/* <Text style={styles.errorText}>Location error</Text> */}

                    {/* TODO LocationPicker*/}

                    {/* Address preview */}
                    {/* <View style={styles.addressPreview}>
              <Ionicons name="location" size={16} color="#6366f1" />
              <Text style={styles.addressText}>address</Text>
            </View>*/}
                </View>

                <Button
                    title="Save Place"
                    icon={<Ionicons name="checkmark" size={20} color="#fff" />}
                    onPress={savePlaceHandler}
                    style={styles.submitButton}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    offlineNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#fef3c7',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
    },
    offlineText: {
        flex: 1,
        fontSize: 13,
        color: '#92400e',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 16,
    },
    errorText: {
        fontSize: 12,
        color: '#ef4444',
        marginBottom: 8,
    },
    addressPreview: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        backgroundColor: '#f1f5f9',
        padding: 12,
        borderRadius: 12,
        marginTop: 12,
    },
    addressText: {
        flex: 1,
        fontSize: 14,
        color: '#475569',
        lineHeight: 20,
    },
    submitButton: {
        marginTop: 8,
    },
});

