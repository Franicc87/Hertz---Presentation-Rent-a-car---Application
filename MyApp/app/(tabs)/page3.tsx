import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, AppState, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLanguage } from '../../LanguageContext';

export default function Locations() {
    const router = useRouter();
    const { language, languages } = useLanguage();


    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
            >
                <Image source={require('../../assets/images/hertzlogo.png')} style={styles.logoSlika} />

                <Text style={styles.title}>{languages[language].locations}</Text>

                <View style={styles.locationCard}>
                    <Image source={require('../../assets/images/zg-dt.png')} style={styles.locationImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.locationTitle}>{languages[language].ZGDT}</Text>
                        <Text style={styles.locationDescription}>{languages[language].dtDes}</Text>
                        <Text style={styles.locationAddress}>Ulica grada Vukovara 274, 10000 Zagreb</Text>
                    </View>
                </View>

                <View style={styles.locationCard}>
                    <Image source={require('../../assets/images/zg-apt.jpg')} style={styles.locationImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.locationTitle}>{languages[language].ZGAP}</Text>
                        <Text style={styles.locationDescription}>{languages[language].aptDes}</Text>
                        <Text style={styles.locationAddress}>Ulica Rudolfa Fizira 1, 10410 Velika Gorica</Text>
                    </View>
                </View>

                <View style={styles.locationCard}>
                    <Image source={require('../../assets/images/pu-apt.jpg')} style={styles.locationImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.locationTitle}>{languages[language].PUAP}</Text>
                        <Text style={styles.locationDescription}>{languages[language].aptDes}</Text>
                        <Text style={styles.locationAddress}>Ližnjan, Valtursko polje 210, 52100 Pula</Text>
                    </View>
                </View>

                <View style={styles.locationCard}>
                    <Image source={require('../../assets/images/zd-apt.png')} style={styles.locationImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.locationTitle}>{languages[language].ZDAP}</Text>
                        <Text style={styles.locationDescription}>{languages[language].aptDes2}</Text>
                        <Text style={styles.locationAddress}>Ulica I 2A, 23222 Zemunik Donji</Text>
                    </View>
                </View>

                <View style={styles.locationCard}>
                    <Image source={require('../../assets/images/st-apt.png')} style={styles.locationImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.locationTitle}>{languages[language].STAP}</Text>
                        <Text style={styles.locationDescription}>{languages[language].aptDes}</Text>
                        <Text style={styles.locationAddress}>Cesta Dr. Franje Tuđmana 1270, 21217 Kaštel Štafilić</Text>
                    </View>
                </View>

                <View style={styles.locationCard}>
                    <Image source={require('../../assets/images/du-apt.png')} style={styles.locationImage} />
                    <View style={styles.textContainer}>
                        <Text style={styles.locationTitle}>{languages[language].DUAP}</Text>
                        <Text style={styles.locationDescription}>{languages[language].aptDes2}</Text>
                        <Text style={styles.locationAddress}>Dobrota 24, 20213 Močići</Text>
                    </View>
                </View>

                <Text style={styles.footer}>{languages[language].footer}</Text>
            </ScrollView>

            <TouchableOpacity style={styles.fab2} onPress={() => router.push('/')}>
                <Icon name="home" size={30} color="#1a1a1a" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.fab} onPress={() => router.push('/menu')}>
                <Text style={styles.fabText}>↩</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    logoSlika: {
        height: 75,
        width: 150,
        resizeMode: 'contain',
    },
    scrollContainer: {
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    locationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
    },
    locationImage: {
        width: 120,
        height: 120,
        borderRadius: 12,
        marginRight: 20,
        objectFit: 'cover',
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    locationTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    locationDescription: {
        fontSize: 16,
        color: '#666',
        marginVertical: 5,
    },
    locationAddress: {
        fontSize: 14,
        color: '#888',
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: '#FFCC00',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        marginBottom: 30,
    },
    fab2: {
        position: 'absolute',
        bottom: 30,
        right: 90,
        backgroundColor: '#FFCC00',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 8,
        marginBottom: 30,
    },
    fabText: {
        fontSize: 24,
        color: '#1a1a1a',
        fontWeight: '700',
    },
    footer: {
        fontSize: 14,
        marginTop: 30,
        textAlign: 'center',
        color: '#666',
        marginBottom: 60,
    },
});
