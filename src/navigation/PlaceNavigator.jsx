import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/places/HomeScreen.jsx";
import { CreatePlaceScreen } from "../screens/places/CreatePlaceScreen.jsx";
import ListPlaceScreen from "../screens/places/ListPlaceScreen.jsx";
import PlaceDetailsScreen from "../screens/places/PlaceDetailsScreen.jsx";

export default function PlaceNavigator() {
    const Stack = createNativeStackNavigator();
    
    return (
        <Stack.Navigator>
            {/* Define your screens here */}
            <Stack.Screen name="Home" component={HomeScreen}  options={{title: 'Home'}}/>
            <Stack.Screen name="CreatePlace" component={CreatePlaceScreen} options={{title: 'Create Place'}} />
            <Stack.Screen name="ListPlaces" component={ListPlaceScreen}  options={{title: 'List Places'}}/>
            <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen}  options={{title: 'Place Details'}}/>
        </Stack.Navigator>
    );
}
