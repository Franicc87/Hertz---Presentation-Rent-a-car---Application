import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, AppState, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLanguage } from '../../LanguageContext';

const protections = [
    {
        title: 'title1',
        stitle: ' ',
        deductible: 'fullLia',
        depozit: '2.000,00 €',
        benefits: ['roadHelp'],
    },
    {
        title: 'title2',
        stitle: '(CDW)',
        deductible: '850,00 - 1.850,00 €',
        depozit: '600,00 - 1.200,00 €',
        benefits: ['partialCoverage', 'theftIncluded', 'roadHelp'],
        stitl: 'CDW',
        priceis: 'PriceIss',
        price: ' 14,00 - 32,00 €',
        addition: '                                                                                                                                           a ',
    },
    {
        title: 'title3',
        stitle: '(SCDW)',
        deductible: '200,00 - 375,00 €',
        depozit: '200,00 - 375,00 €',
        benefits: ['smallCoverage', 'smallDep', 'theftIncluded', 'roadHelp'],
        stitl: 'SCDW',
        priceis: 'PriceIs',
        price: ' 9,00 - 20,00 €',
        addition: 'additionSCDW',
    },
    {
        title: 'title4',
        stitle: '(SUP)',
        deductible: '0,00 €',
        depozit: '100,00 - 250,00 €',
        benefits: ['fullCoverage', 'smallerDep', 'theftIncluded', 'tyreProtection', 'roadHelp'],
        stitl: 'SUP',
        priceis: 'PriceIs',
        price: ' 4,00 - 7,00 €',
        addition: 'additionSUP',
    },
];

export default function Menu5() {
    const router = useRouter();
    const { language, languages } = useLanguage();


    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/hertzlogo.png')} style={styles.logo} />
            <ScrollView contentContainerStyle={styles.contentWrapper}>
                <Text style={styles.title}>{languages[language].choose_protection}</Text>

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        flexGrow: 1,
                        justifyContent: 'center',
                        paddingHorizontal: 20
                    }}
                >
                    {protections.map((item, index) => (
                        <View
                            key={index}
                            style={[
                                styles.card,
                                {
                                    marginLeft: index === 0 ? 0 : 12,
                                    marginRight: index === protections.length - 1 ? 0 : 12,
                                },
                            ]}
                        >
                            <Text style={styles.cardTitle}>{languages[language][item.title] || item.title}</Text>
                            <Text style={styles.cardSTitle}>{languages[language][item.stitle] || item.stitle}</Text>
                            <Text style={styles.deductible}>
                                <Text style={{ color: item.deductible === '$0.00' ? '#28a745' : '#e63946' }}>
                                    {languages[language].deductibleLabel}{' '}
                                    {index === 0
                                        ? languages[language][item.deductible] || item.deductible
                                        : item.deductible}
                                </Text>
                            </Text>
                            <Text style={styles.depozit}>
                                <Text style={{ color: item.depozit === '$0.00' ? '#28a745' : '#e63946' }}>
                                    {languages[language].depozitLabel} {item.depozit}
                                </Text>
                            </Text>

                            <View style={styles.benefitList}>
                                {item.benefits.map((b, i) => {
                                    const isBold = ['smallCoverage', 'smallDep', 'fullCoverage', 'smallerDep', 'tyreProtection'].includes(b);
                                    return (
                                        <View key={i} style={styles.benefitRow}>
                                            <Icon name="check" color="#ffcc00" size={16} />
                                            <Text
                                                style={[
                                                    styles.benefitText,
                                                    isBold && { fontWeight: 'bold' }
                                                ]}
                                            >
                                                {languages[language][b]}
                                            </Text>
                                        </View>
                                    );
                                })}
                            </View>
                            {index > 0 && (
                                <>
                                    <TouchableOpacity style={styles.priceButton}>
                                        <Text style={styles.priceButtonText}>{item.stitl}{languages[language][item.priceis] || item.priceis}{'\n'}{item.price}</Text>
                                    </TouchableOpacity>

                                    {item.addition && (
                                        <Text
                                            style={[
                                                styles.extraText,
                                                index === 1 && { color: '#ffffff' } // Bijela boja samo za drugi box
                                            ]}
                                        >
                                            {languages[language][item.addition] || item.addition}
                                        </Text>

                                    )}

                                </>
                            )}

                        </View>
                    ))}
                </ScrollView>

                <TouchableOpacity style={styles.fab2} onPress={() => router.push('/')}>
                    <Icon name="home" size={30} color="#1a1a1a" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.fab} onPress={() => router.push('/menu')}>
                    <Text style={styles.fabText}>↩</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#d3d3d3' },
    contentWrapper: { paddingTop: 60 },
    logo: { position: 'absolute', top: 30, left: 40, width: 75, height: 75, resizeMode: 'contain', zIndex: 10 },
    title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginVertical: 20, color: '#333' },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 16,
        width: 280,
        height: 510,
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#ffcc00', // Dodano: žuti okvir
        shadowColor: '#ffcc00', // Dodano: žuta sjena
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 8,
        position: 'relative'
    },

    cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
    cardSTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#333' },
    deductible: { fontSize: 14, marginBottom: 4, marginTop: 5, color: '#555' },
    depozit: { fontSize: 14, marginBottom: 8, color: '#555' },
    benefitList: { marginBottom: 12, marginTop: 20 },
    benefitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
    benefitText: { marginLeft: 6, fontSize: 14, color: '#333' },
    fab: {
        position: 'absolute',
        left: 450,
        bottom: -70,
        backgroundColor: '#FFCC00',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    fab2: {
        position: 'absolute',
        right: 450,
        bottom: -70,
        backgroundColor: '#FFCC00',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    fabText: { fontSize: 20, color: '#1a1a1a' },
    priceButton: {
        marginTop: 'auto',
        backgroundColor: '#ffcc00',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceButtonText: {
        fontSize: 16,
        color: '#1a1a1a',
        textAlign: 'center'
    },
    extraText: {
        marginTop: 8,
        fontSize: 11,
        color: '#444',
        textAlign: 'center',
    },


});
