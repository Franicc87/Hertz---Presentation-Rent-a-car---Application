import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useLanguage } from '../../LanguageContext'; // useLanguage hook

export default function MenuScreen() {
    const router = useRouter();
    const { language, languages, switchLanguage } = useLanguage();

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/h-icon.png')} style={styles.logo} />

            <Text style={styles.title}>{languages[language].menu}</Text>

            <TouchableOpacity style={styles.buttonYellow} onPress={() => router.push('/page2')}>
                <Text style={styles.buttonTextDark}>{languages[language].fleet}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonYellow} onPress={() => router.push('/page5')}>
                <Text style={styles.buttonTextDark}>{languages[language].choose_protection}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonYellow} onPress={() => router.push('/page4')}>
                <Text style={styles.buttonTextDark}>{languages[language].dmgCostCatalogue}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonYellow} onPress={() => router.push('/page1')}>
                <Text style={styles.buttonTextDark}>{languages[language].termsAndConditions}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.buttonYellow} onPress={() => router.push('/page3')}>
                <Text style={styles.buttonTextDark}>{languages[language].locations}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.fab} onPress={() => router.push('/')}>
                <Text style={styles.fabText}>↩</Text>
            </TouchableOpacity>

            <View style={styles.languageButtons}>
                <TouchableOpacity onPress={() => switchLanguage('en')} style={styles.button}>
                    <Image source={require('../../assets/images/eng-fl.png')} style={styles.flagImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchLanguage('it')} style={styles.button}>
                    <Image source={require('../../assets/images/it-fl.png')} style={styles.flagImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchLanguage('hr')} style={styles.button}>
                    <Image source={require('../../assets/images/cro-fl.png')} style={styles.flagImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchLanguage('de')} style={styles.button}>
                    <Image source={require('../../assets/images/de-fl.png')} style={styles.flagImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchLanguage('fr')} style={styles.button}>
                    <Image source={require('../../assets/images/fr-fl.png')} style={styles.flagImage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => switchLanguage('nl')} style={styles.button}>
                    <Image source={require('../../assets/images/ne-fl.png')} style={styles.flagImage} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    logo: {
        resizeMode: "contain",
        height: 120,
        marginBottom: 15,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#121212',
        marginBottom: 20,
    },
    buttonYellow: {
        width: '30%',
        paddingVertical: 12,
        marginVertical: 10,
        backgroundColor: '#FFCC00',
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: '#FFD700',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
        elevation: 6,
    },
    buttonTextDark: {
        color: '#1a1a1a',
        fontSize: 16,
        fontWeight: '700',
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
    fabText: {
        fontSize: 24,
        color: '#1a1a1a',
        fontWeight: '700',
    },
    languageButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 37,
    },
    flagImage: {
        width: 35,
        height: 35,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#ffd700',
        margin: 10,
        borderRadius: 5,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
