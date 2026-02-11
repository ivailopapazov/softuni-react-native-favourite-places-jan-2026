import { StatusBar } from 'expo-status-bar';

import AppNavigator from './navigation/AppNavigator.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/auth/AuthProvider.jsx';
import { PlaceProvider } from './contexts/places/PlaceProvider.jsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <AuthProvider>
          <PlaceProvider>
            <AppNavigator />
          </PlaceProvider>
        </AuthProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
