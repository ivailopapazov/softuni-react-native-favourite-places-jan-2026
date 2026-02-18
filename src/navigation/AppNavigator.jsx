import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator.jsx";
import PlaceNavigator from "./PlaceNavigator.jsx";
import { useAuth } from "../contexts/auth/useAuth.js";
import { ActivityIndicator } from "react-native";

export default function AppNavigator() {
    const Stack = createNativeStackNavigator();
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <ActivityIndicator size="large" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated
                ? <Stack.Screen name="Places" component={PlaceNavigator} />
                : <Stack.Screen name="Auth" component={AuthNavigator} />
            }
        </Stack.Navigator>
    );
}
