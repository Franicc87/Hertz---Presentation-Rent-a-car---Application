import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Dimensions, AppState, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLanguage } from '../../LanguageContext';

interface Vehicle {
    id: string;
    group: string;
    image: any;
    name: string;
    klasa?: string;
    pklasa?: string;
    size?: string;
    seats?: number;
    suitcases?: number;
    Bsuitcases?: number;
    ac?: boolean;
    transmission?: boolean;
}

const { width } = Dimensions.get('window');
const numColumns = 3;
const imageMargin = 10;
const imageWidth = (width - numColumns * imageMargin * 2) / numColumns;

export default function TermsAndConditions() {
    const router = useRouter();
    const { language, languages } = useLanguage();

    /** @type {Vehicle[]} */
    const vehicles: Vehicle[] = [
        { id: '1', group: 'Mini', image: require('../../assets/images/page2/picanto.png'), name: 'Kia Picanto', klasa: 'Group A', pklasa: 'MDMR', size: '|   Small', seats: 4, suitcases: 2, Bsuitcases: 0, ac: true, transmission: true },
        { id: '2', group: 'Mini', image: require('../../assets/images/page2/panda.png'), name: 'Fiat Panda', klasa: 'Group A', pklasa: 'MDMR', size: '|   Small', seats: 4, suitcases: 2, Bsuitcases: 0, ac: true, transmission: true },
        { id: '3', group: 'Economy', image: require('../../assets/images/page2/corsa.png'), name: 'Opel Corsa ', klasa: 'Group B', pklasa: 'EDMR', size: '|   Small', seats: 4, suitcases: 2, Bsuitcases: 0, ac: true, transmission: true },
        { id: '4', group: 'Economy', image: require('../../assets/images/page2/yaris.png'), name: 'Toyota Yaris', klasa: 'Group K', pklasa: 'EDAR', size: '|   Small', seats: 5, suitcases: 2, Bsuitcases: 1, ac: true, transmission: false },
        { id: '5', group: 'Compact', image: require('../../assets/images/page2/i30.png'), name: 'Hyundai i30', klasa: 'Group D', pklasa: 'CDMR', size: '|   Medium', seats: 4, suitcases: 1, Bsuitcases: 1, ac: true, transmission: true },
        { id: '6', group: 'Compact', image: require('../../assets/images/page2/leon.png'), name: 'Seat Leon', klasa: 'Group D', pklasa: 'CDMR', size: '|   Crossover/SUV', seats: 4, suitcases: 2, Bsuitcases: 0, ac: true, transmission: true },
        { id: '7', group: 'Crossover', image: require('../../assets/images/page2/stonic.png'), name: 'Kia Stonic', klasa: 'Group C', pklasa: 'CGMR', size: '|   Crossover/SUV, Medium', seats: 5, suitcases: 1, Bsuitcases: 2, ac: true, transmission: true },
        { id: '8', group: 'Crossover', image: require('../../assets/images/page2/scross.png'), name: 'Suzuki S-Cross', klasa: 'Group F', pklasa: 'CGMV', size: '|   Crossover/SUV', seats: 5, suitcases: 2, Bsuitcases: 2, ac: true, transmission: true },
        { id: '9', group: 'Crossover', image: require('../../assets/images/page2/kona.png'), name: 'Hyundai Kona', klasa: 'Group M', pklasa: 'CGAR', size: '|   Crossover/SUV', seats: 5, suitcases: 1, Bsuitcases: 2, ac: true, transmission: false },
        { id: '10', group: 'SUV', image: require('../../assets/images/page2/sportageB.png'), name: 'Kia Sportage', klasa: 'Group N', pklasa: 'IGAR', size: '|   Crossover/SUV', seats: 5, suitcases: 1, Bsuitcases: 2, ac: true, transmission: false },
        { id: '11', group: 'SUV', image: require('../../assets/images/page2/mghs.jpg'), name: 'MG HS', klasa: 'Group N', pklasa: 'IGAR', size: '|   Crossover/SUV', seats: 5, suitcases: 1, Bsuitcases: 2, ac: true, transmission: false },
        { id: '12', group: 'Economy', image: require('../../assets/images/page2/mg3.jpg'), name: 'MG 3', klasa: 'Group K', pklasa: 'EDAR', size: '|   Small', seats: 5, suitcases: 2, Bsuitcases: 0, ac: true, transmission: false },
        { id: '13', group: 'SUV', image: require('../../assets/images/page2/qashqai.jpg'), name: 'Nissan Qashqai', klasa: 'Group N', pklasa: 'IGAR', size: '|   Crossover/SUV', seats: 5, suitcases: 2, Bsuitcases: 2, ac: true, transmission: false },
        { id: '14', group: 'Crossover', image: require('../../assets/images/page2/mgzs.jpg'), name: 'MG ZS', klasa: 'Group F', pklasa: 'CGAR', size: '|   Crossover/SUV', seats: 5, suitcases: 2, Bsuitcases: 1, ac: true, transmission: false },
        { id: '14', group: 'Van', image: require('../../assets/images/page2/ford.jpg'), name: 'Ford Tourneo', klasa: 'Group YL', pklasa: 'FVMR', size: '|   People Carrier, Large', seats: 9, suitcases: 3, Bsuitcases: 3, ac: true, transmission: true },
    ];

    const groupedVehicles: Record<string, Vehicle[]> = vehicles.reduce((acc, vehicle) => {
        if (!acc[vehicle.group]) acc[vehicle.group] = [];
        acc[vehicle.group].push(vehicle);
        return acc;
    }, {} as Record<string, Vehicle[]>);

    const groupKeys = Object.keys(groupedVehicles);
    const [selectedGroup, setSelectedGroup] = useState<string>(groupKeys[0] || '');
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

    const currentVehicles = groupedVehicles[selectedGroup] ?? [];

    const handleVehiclePress = (vehicle: Vehicle) => {
        setSelectedVehicle(prev => (prev?.id === vehicle.id ? null : vehicle));
    };

    const renderVehicleItem = (vehicle: Vehicle) => (
        <View style={styles.vehicleContainer} key={vehicle.id}>
            <TouchableOpacity onPress={() => handleVehiclePress(vehicle)}>
                <Image source={vehicle.image} style={styles.vehicleImage} />
            </TouchableOpacity>
            {selectedVehicle?.id === vehicle.id && (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{vehicle.name}</Text>
                    <View style={styles.rowTwoItems}>
                        <View style={styles.cardRow3}>
                            <Text style={styles.cardText3}>{vehicle.klasa} - {vehicle.pklasa}</Text>
                        </View>
                        <View>
                            <Text style={styles.cardText3}>{vehicle.size}</Text>
                        </View>
                    </View>
                    <View style={[styles.rowTwoItems, { marginTop: 9 }]}>
                        <View style={styles.cardRow}>
                            <Icon name="user" size={16} style={{ marginLeft: 2, marginRight: 8 }} />
                            <Text style={styles.cardText}>{vehicle.seats}</Text>
                        </View>
                        <View style={styles.cardRow2}>
                            <Icon name="suitcase" size={22} />
                            <Text style={styles.cardText2}>x{vehicle.Bsuitcases}</Text>
                            <Icon name="suitcase" size={16} />
                            <Text style={styles.cardText}>x{vehicle.suitcases}</Text>
                        </View>
                    </View>
                    <View style={[styles.rowTwoItems, { marginTop: 10 }]}>
                        <View style={styles.cardRow}>
                            <Icon name="snowflake-o" size={16} />
                            <Text style={styles.cardText}>{vehicle.ac ? 'A/C' : 'Bez klima'}</Text>
                        </View>
                        <View style={styles.cardRow2}>
                            <Icon name="gear" size={16} />
                            <Text style={styles.cardText}>{vehicle.transmission ? 'Manual' : 'Automatic'}</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    );


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Image source={require('../../assets/images/hertzlogo.png')} style={styles.logo} />
                <Text style={styles.title}>{languages[language].fleet}</Text>

                <View style={styles.groupSelector}>
                    {groupKeys.map(key => (
                        <TouchableOpacity
                            key={key}
                            style={[styles.groupButton, selectedGroup === key && styles.groupButtonSelected]}
                            onPress={() => {
                                setSelectedGroup(key);
                                setSelectedVehicle(null);
                            }}
                        >
                            <Text style={[styles.groupButtonText, selectedGroup === key && styles.groupButtonTextSelected]}>
                                {key}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {currentVehicles.length >= 4 ? (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.listContainerHorizontal}
                    >
                        {currentVehicles.map(renderVehicleItem)}
                    </ScrollView>
                ) : (
                    <FlatList
                        data={currentVehicles}
                        keyExtractor={item => item.id}
                        numColumns={numColumns}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                        renderItem={({ item }) => renderVehicleItem(item)}
                    />
                )}

                <Text style={styles.footer}>{languages[language].footer}</Text>

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
    container: { flex: 1, backgroundColor: '#808080' },
    scrollContainer: { padding: 20, paddingBottom: 40 },
    logo: { height: 75, width: 150, resizeMode: 'contain', alignSelf: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#121212' },

    groupSelector: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
    groupButton: { padding: 10, backgroundColor: '#fff', borderRadius: 5, margin: 5 },
    groupButtonSelected: { backgroundColor: '#FFCC00' },
    groupButtonText: { fontSize: 16, color: '#121212' },
    groupButtonTextSelected: { fontWeight: 'bold', color: '#1a1a1a' },

    listContainer: { paddingBottom: imageMargin },
    listContainerHorizontal: { paddingVertical: imageMargin },

    vehicleContainer: { flex: 1, margin: imageMargin / 2, alignItems: 'center' },
    vehicleImage: { width: imageWidth, height: imageWidth * 0.66, borderRadius: 10 },

    card: {
        marginTop: 10, backgroundColor: '#fff', padding: 12, borderRadius: 8,
        shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2,
        shadowRadius: 4, elevation: 4, width: imageWidth
    },
    cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 8, color: '#121212', marginLeft: 30 },

    rowTwoItems: { flexDirection: 'row' },
    cardRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 30 },
    cardRow2: { flexDirection: 'row', alignItems: 'center', marginLeft: 90 },
    cardRow3: { flexDirection: 'row', alignItems: 'center', marginLeft: 25 },
    cardText: { marginLeft: 6, fontSize: 14, color: '#333' },
    cardText2: { marginLeft: 6, marginRight: 6, fontSize: 14, color: '#333' },
    cardText3: { marginLeft: 6, marginRight: 6, fontSize: 14, color: '#333', fontWeight: 'bold' },

    footer: { fontSize: 14, marginTop: 30, textAlign: 'center', color: '#666' },
    fab: {
        position: 'absolute', bottom: 30, right: 30, backgroundColor: '#FFCC00', width: 50, height: 50,
        borderRadius: 25, justifyContent: 'center', alignItems: 'center', shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 8
    },
    fab2: {
        position: 'absolute', bottom: 30, right: 90, backgroundColor: '#FFCC00', width: 50, height: 50,
        borderRadius: 25, justifyContent: 'center', alignItems: 'center', shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 4, elevation: 8
    },
    fabText: { fontSize: 24, color: '#1a1a1a', fontWeight: '700' },
});
