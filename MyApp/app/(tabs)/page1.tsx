import React, { useRef, useState, } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import { useLanguage } from '../../LanguageContext';

export default function TermsAndConditions() {
    const router = useRouter();
    const { language, languages } = useLanguage();
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <View style={styles.container} pointerEvents="box-none">
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                keyboardShouldPersistTaps="handled"
            >

                <View>
                    <Image source={require('../../assets/images/hertzlogo.png')} style={styles.logo} />

                    <Text style={styles.title}>{languages[language].termsAndConditions}</Text>
                    <Text style={styles.paragraph}>{languages[language].termsIntro}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h1_DAC}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_dac}</Text>
                    <Text style={styles.paragraph}>{languages[language].p2_dac}</Text>
                    <Text style={styles.paragraph}>{languages[language].p3_dac}</Text>
                    <Text style={styles.paragraph}>{languages[language].p4_dac}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h2_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p2_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p3_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p4_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p5_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p6_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p7_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p8_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p9_td}</Text>
                    <Text style={styles.paragraph}>{languages[language].p10_td}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h3_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p2_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p3_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p4_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p5_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p6_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p7_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p8_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p9_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p10_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p11_ch}</Text>
                    <Text style={styles.paragraph}>{languages[language].p12_ch}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h4_tou}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_tou}</Text>
                    <Text style={styles.paragraph}>{languages[language].p2_tou}</Text>
                    <Text style={styles.paragraph}>{languages[language].p3_tou}</Text>
                    <Text style={styles.paragraph}>{languages[language].p4_tou}</Text>
                    <Text style={styles.paragraph}>{languages[language].p5_tou}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h5_erp}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_erp}</Text>
                    <Text style={styles.paragraph}>{languages[language].p2_erp}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h6_ind}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_ind}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h7_acc}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_acc}</Text>
                    <Text style={styles.paragraph}>{languages[language].p2_acc}</Text>
                    <Text style={styles.paragraph}>{languages[language].p3_acc}</Text>
                    <Text style={styles.paragraph}>{languages[language].p4_acc}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h8_ins}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_ins}</Text>
                    <Text style={styles.paragraph}>{languages[language].p2_ins}</Text>
                    <Text style={styles.paragraph}>{languages[language].p3_ins}</Text>
                    <Text style={styles.paragraph}>{languages[language].p4_ins}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h9_pd}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_pd}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h10_mis}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_mis}</Text>
                    <Text style={styles.paragraph}>{languages[language].p2_mis}</Text>
                    <Text style={styles.paragraph}>{languages[language].p3_mis}</Text>
                    <Text style={styles.paragraph}>{languages[language].p4_mis}</Text>

                    <Text style={styles.sectionTitle}>{languages[language].h11_jur}</Text>
                    <Text style={styles.paragraph}>{languages[language].p1_jur}</Text>

                    <Text style={styles.footer}>{languages[language].footer}</Text>
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.fab2} onPress={() => router.push('/')}>
                <Icon name="home" size={30} color="#1a1a1a" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fab} onPress={() => router.push('/menu')}>
                <Text style={styles.fabText}>↩</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qrButton} onPress={() => setModalVisible(true)}>
                <QRCode value="https://drive.google.com/file/d/1WXSB1P9ZseRKIm1fIjYvIgt0pfDMb7Bj/view?usp=sharing" size={60} />
            </TouchableOpacity>


            <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
                        <QRCode value="https://drive.google.com/file/d/1WXSB1P9ZseRKIm1fIjYvIgt0pfDMb7Bj/view?usp=sharing" size={220} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 60,
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    logo: {
        alignSelf: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#121212',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginTop: 20,
        marginBottom: 10,
        color: '#333',
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555',
        marginBottom: 10,
    },
    footer: {
        fontSize: 14,
        marginTop: 30,
        textAlign: 'center',
        color: '#666',
        marginBottom: 30,
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
    qrButton: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalClose: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
});
