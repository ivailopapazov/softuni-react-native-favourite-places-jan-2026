import { TouchableOpacity, StyleSheet, View, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { usePlace } from "../../contexts/places/usePlaces.js";
import PlaceCard from "../../components/PlaceCard.jsx";
import { GestureDetector, Gesture, } from "react-native-gesture-handler";
import { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from 'react-native-worklets'
import { selectionAsync } from 'expo-haptics';

const PlaceCardWithGesture = ({
    item,
    onPress,
    onDelete,
}) => {
    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: positionX.value }, { translateY: positionY.value }],
    }));

    const deleteGesture = Gesture.Pan()
        .activeOffsetX(-20)
        .onUpdate((event) => {
            positionX.value = event.translationX;
        })
        .onEnd((event) => {
            if (event.translationX < -100) {
                return scheduleOnRN(onDelete, item.id);
            }

            positionX.value = 0;
        });

    const sortGesture = Gesture.Pan()
        // .activeOffsetY([-20, 20])
        .activateAfterLongPress(500)
        .onStart(() => {
            scheduleOnRN(selectionAsync);
        })
        .onUpdate((event) => {
            positionY.value = event.translationY;
        })
        .onEnd(() => {
            positionY.value = 0;
        });

    const combinedGesture = Gesture.Race(deleteGesture, sortGesture);

    return (
        <GestureDetector gesture={combinedGesture}>
            <PlaceCard
                {...item}
                style={animatedStyle}
                onPress={onPress}
            />
        </GestureDetector>
    );
}

export default function ListPlaceScreen({ navigation }) {
    const { places, deletePlace } = usePlace();

    return (
        <View style={styles.container}>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) =>
                    <PlaceCardWithGesture
                        item={item}
                        onPress={() => navigation.navigate('PlaceDetails', { place: item })}
                        onDelete={deletePlace}
                    />
                }
            />

            <TouchableOpacity
                style={styles.fab}
                onPress={() => navigation.navigate('CreatePlace')}
                activeOpacity={0.8}
            >
                <Ionicons name="add" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    listContent: {
        paddingVertical: 12,
    },
    emptyList: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 48,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#f1f5f9',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 14,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 22,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#6366f1',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6366f1',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
});

