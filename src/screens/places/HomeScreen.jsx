import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/auth/useAuth.js';
import { usePlace } from '../../contexts/places/usePlaces.js';

const HomeScreen = ({ navigation }) => {
    const { logout, user } = useAuth();
    const { places } = usePlace();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.welcomeSection}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={40} color="#6366f1" />
                    </View>
                    <Text style={styles.welcomeText}>Welcome back,</Text>
                    <Text style={styles.userName}>{user.name}</Text>
                </View>

                <View style={styles.statsSection}>
                    <View style={styles.statCard}>
                        <Ionicons name="location" size={32} color="#6366f1" />
                        <Text style={styles.statNumber}>{places.length}</Text>
                        <Text style={styles.statLabel}>Saved Places</Text>
                    </View>
                </View>

                <View style={styles.actionsSection}>
                    <Button
                        title="View My Places"
                        onPress={() => navigation.navigate('ListPlaces')}
                        icon={<Ionicons name="list" size={20} color="#fff" />}
                        style={styles.actionButton}
                    />

                    <Button
                        title="Add New Place"
                        variant="secondary"
                        onPress={() => navigation.navigate('CreatePlace')}
                        icon={<Ionicons name="add-circle" size={20} color="#6366f1" />}
                        style={styles.actionButton}
                    />
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Sign Out"
                        variant="ghost"
                        onPress={logout}
                        icon={<Ionicons name="log-out-outline" size={20} color="#6366f1" />}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    welcomeSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e0e7ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    welcomeText: {
        fontSize: 16,
        color: '#64748b',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1e293b',
        marginTop: 4,
    },
    statsSection: {
        marginBottom: 32,
    },
    statCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statNumber: {
        fontSize: 48,
        fontWeight: '700',
        color: '#1e293b',
        marginTop: 8,
    },
    statLabel: {
        fontSize: 16,
        color: '#64748b',
        marginTop: 4,
    },
    actionsSection: {
        gap: 12,
        marginBottom: 24,
    },
    actionButton: {
        width: '100%',
    },
    footer: {
        marginTop: 'auto',
        alignItems: 'center',
    },
});

export default HomeScreen;
