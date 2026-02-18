import { TouchableOpacity, StyleSheet, View, FlatList, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { usePlace } from "../../contexts/places/usePlaces.js";
import PlaceCard from "../../components/PlaceCard.jsx";
import { GestureDetector, Gesture, } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { scheduleOnRN } from 'react-native-worklets'
import { selectionAsync } from 'expo-haptics';

const CART_ITEM_HEIGHT = 105;

const PlaceCardWithGesture = ({
    item,
    index,
    onPress,
    onDelete,
    onSort,
}) => {
    const positionX = useSharedValue(0);
    const positionY = useSharedValue(0);
    const scale = useSharedValue(1);

    const animatedStyle = useAnimatedStyle(() => {
        const isSelected = scale.value > 1;

        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
                { scale: scale.value }
            ],
            zIndex: isSelected ? 1 : 0,
        };
    });

    const trashOpacity = useAnimatedStyle(() => {
        const opacity = (-positionX.value - 50) / 300;

        return {
            opacity: Math.min(Math.max(opacity, 0), 1),
        };
    });

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
            scale.value = 1.05;
        })
        .onUpdate((event) => {
            positionY.value = event.translationY;

            const currentOffset = index * CART_ITEM_HEIGHT + event.translationY;
            const newIndex = Math.round(currentOffset / CART_ITEM_HEIGHT);

            if (newIndex !== index) {
                scheduleOnRN(onSort, item.id, newIndex);
            }
        })
        .onEnd(() => {
            positionY.value = 0;
            scale.value = 1;
        });

    const tapGesture = Gesture.Tap()
        .onEnd(() => {
            scheduleOnRN(onPress);
        });

    const combinedGesture = Gesture.Race(deleteGesture, sortGesture, tapGesture);

    return (
        <GestureDetector gesture={combinedGesture}>
            <View>
                <PlaceCard
                    {...item}
                    style={[animatedStyle,]}
                    onPress={onPress}
                />

                <Animated.View style={[trashOpacity, { position: 'absolute', zIndex: -1, right: 20, top: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fee2e2', borderRadius: 20, padding: 8 }]}>
                    <Ionicons name="trash-outline" size={60} color="#b40000" />
                </Animated.View>
            </View>
        </GestureDetector>
    );
}

export default function ListPlaceScreen({ navigation }) {
    const { places, deletePlace, sortPlace } = usePlace();

    return (
        <View style={styles.container}>
            <FlatList
                data={places}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) =>
                    <PlaceCardWithGesture
                        item={item}
                        index={index}
                        onPress={() => navigation.navigate('PlaceDetails', { placeId: item.id })}
                        onDelete={deletePlace}
                        onSort={sortPlace}
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

