import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    Modal,
    Dimensions,
    findNodeHandle,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import QRCode from 'react-native-qrcode-svg';
import { useLanguage } from '../../LanguageContext';

const { height: WINDOW_HEIGHT } = Dimensions.get('window');

// Data definitions
interface Table {
    header: string[];
    rows: string[][];
}

interface ImageItem {
    src: any;
    typeKey: string;
}

interface SubItem {
    key: string;
    titleKey: string;
    images: ImageItem[];
    table: Table;
}

interface Section {
    key: string;
    titleKey: string;
    subItems: SubItem[];
}

const DAMAGE_SECTIONS: Section[] = [
    {
        key: 'frontVehicle',
        titleKey: 'frontVehicle',
        subItems: [
            {
                key: 'frontVehicle_1.1',
                titleKey: 'frontBumper',
                images: [
                    { src: require('../../assets/images/scr-ex.png'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/dent-ex.png'), typeKey: 'Dent' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'Dent', 'BCMNas'],
                    rows: [
                        ["Economy", "250,00 €", "500,00 €", "700,00 €"],
                        ["Compact", "300,00 €", "600,00 €", "1.200,00 €"],
                        ["Intermediate", "350,00 €", "700,00 €", "1.300,00 €"],
                        ["Premium", "400,00 €", "1.100,00 €", "1.850,00 €"],
                        ["Luxury", "400,00 €", "1.100,00 €", "2.200,00 €"],
                        ["Van", "350,00 €", "900,00 €", "1.500,00 €"]
                    ]
                }
            },
            {
                key: 'frontVehicle_1.2',
                titleKey: 'headLamp',
                images: [
                    { src: require('../../assets/images/fl-scr.png'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/fl-brok.png'), typeKey: 'Broken' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "200,00 €", "850,00 €"],
                        ["Compact", "300,00 €", "950,00 €"],
                        ["Intermediate", "400,00 €", "1.200,00 €"],
                        ["Premium", "400,00 €", "1.500,00 €"],
                        ["Luxury", "500,00 €", "1.500,00 €"],
                        ["Van", "500,00 €", "1.200,00 €"]
                    ]
                }
            },
            {
                key: 'frontVehicle_1.3',
                titleKey: 'fogLamp',
                images: [
                    { src: require('../../assets/images/fl-scr.png'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/fl-brok.png'), typeKey: 'Broken' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "150,00 €", "200,00 €"],
                        ["Compact", "200,00 €", "300,00 €"],
                        ["Intermediate", "250,00 €", "400,00 €"],
                        ["Premium", "350,00 €", "450,00 €"],
                        ["Luxury", "450,00 €", "550,00 €"],
                        ["Van", "350,00 €", "450,00 €"]
                    ]
                }
            },
            {
                key: 'frontVehicle_1.4',
                titleKey: 'hood',
                images: [
                    { src: require('../../assets/images/hood-scr.png'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/hood-de.png'), typeKey: 'Dent' },
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'Dent', 'BCMNas'],
                    rows: [
                        ["Economy", "350,00 €", "600,00 €", "900,00 €"],
                        ["Compact", "400,00 €", "850,00 €", "1.300,00 €"],
                        ["Intermediate", "450,00 €", "1.000,00 €", "1.500,00 €"],
                        ["Premium", "400,00 €", "1.100,00 €", "1.600,00 €"],
                        ["Luxury", "600,00 €", "1.100,00 €", "1.750,00 €"],
                        ["Van", "400,00 €", "900,00 €", "1.500,00 €"]
                    ]
                }
            }
        ]
    },
    {
        key: 'sideVehicle',
        titleKey: 'sideVehicle',
        subItems: [
            {
                key: 'sideVehicle_2.1',
                titleKey: 'doors',
                images: [
                    { src: require('../../assets/images/scr-do.jpg'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/dent-do.jpg'), typeKey: 'Dent' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'Dent', 'BCMNas'],
                    rows: [
                        ["Economy", "400,00 €", "650,00 €", "1.200,00 €"],
                        ["Compact", "450,00 €", "750,00 €", "1.300,00 €"],
                        ["Intermediate", "500,00 €", "850,00 €", "1.400,00 €"],
                        ["Premium", "500,00 €", "1.000,00 €", "1.750,00 €"],
                        ["Luxury", "550,00 €", "1.000,00 €", "1.750,00 €"],
                        ["Van", "500,00 €", "850,00 €", "1.450,00 €"]
                    ]
                }
            },
            {
                key: 'sideVehicle_2.2',
                titleKey: 'doorknobs',
                images: [
                    { src: require('../../assets/images/dk-sc.jpg'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/dk-ms.png'), typeKey: 'Missing' }
                ],
                table: {
                    header: ['vehCat', 'SBCM'],
                    rows: [
                        ["Economy", "100,00 €"],
                        ["Compact", "150,00 €"],
                        ["Intermediate", "150,00 €"],
                        ["Premium", "550,00 €"],
                        ["Luxury", "550,00 €"],
                        ["Van", "450,00 €"]
                    ]
                }
            },
            {
                key: 'sideVehicle_2.3',
                titleKey: 'sill',
                images: [
                    { src: require('../../assets/images/sill-str.png'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/sill-br.jpg'), typeKey: 'Broken' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'Dent', 'BCMNas'],
                    rows: [
                        ["Economy", "250,00 €", "450,00 €", "800,00 €"],
                        ["Compact", "300,00 €", "600,00 €", "1.000,00 €"],
                        ["Intermediate", "350,00 €", "650,00 €", "1.100,00 €"],
                        ["Premium", "350,00 €", "850,00 €", "1.200,00 €"],
                        ["Luxury", "400,00 €", "1.000,00 €", "1.500,00 €"],
                        ["Van", "400,00 €", "1.100,00 €", "1.500,00 €"]
                    ]
                }
            },
            {
                key: 'sideVehicle_2.4',
                titleKey: 'fuelDoor',
                images: [
                    { src: require('../../assets/images/fuel-str.png'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/fuel-br.png'), typeKey: 'BCMNas' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "50,00 €", "150,00 €"],
                        ["Compact", "70,00 €", "200,00 €"],
                        ["Intermediate", "70,00 €", "200,00 €"],
                        ["Premium", "90,00 €", "270,00 €"],
                        ["Luxury", "110,00 €", "350,00 €"],
                        ["Van", "90,00 €", "270,00 €"]
                    ]
                }
            },
            {
                key: 'sideVehicle_2.5',
                titleKey: 'frontFender',
                images: [
                    { src: require('../../assets/images/ff-str.png'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/ff-de.jpg'), typeKey: 'Dent' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'Dent', 'BCMNas'],
                    rows: [
                        ["Economy", "250,00 €", "350,00 €", "550,00 €"],
                        ["Compact", "300,00 €", "550,00 €", "750,00 €"],
                        ["Intermediate", "350,00 €", "600,00 €", "1.000,00 €"],
                        ["Premium", "350,00 €", "700,00 €", "1.100,00 €"],
                        ["Luxury", "400,00 €", "800,00 €", "1.300,00 €"],
                        ["Van", "350,00 €", "700,00 €", "1.100,00 €"]
                    ]
                }
            },
            {
                key: 'sideVehicle_2.6',
                titleKey: 'rearFender',
                images: [
                    { src: require('../../assets/images/rf-str.png'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/rf-de.jpg'), typeKey: 'Dent' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'Dent', 'BCMNas'],
                    rows: [
                        ["Economy", "250,00 €", "500,00 €", "1.000,00 €"],
                        ["Compact", "350,00 €", "750,00 €", "1.500,00 €"],
                        ["Intermediate", "400,00 €", "1.000,00 €", "2.000,00 €"],
                        ["Premium", "350,00 €", "1.000,00 €", "2000,00 €"],
                        ["Luxury", "400,00 €", "1.100,00 €", "2000,00 €"],
                        ["Van", "400,00 €", "1.000,00 €", "1.600,00 €"]
                    ]
                }
            },
            {
                key: 'sideVehicle_2.7',
                titleKey: 'rearviewMirror',
                images: [
                    { src: require('../../assets/images/rm-str.jpg'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/rm-br.png'), typeKey: 'Broken' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "100,00 €", "550,00 €"],
                        ["Compact", "200,00 €", "750,00 €"],
                        ["Intermediate", "200,00 €", "950,00 €"],
                        ["Premium", "250,00 €", "1.100,00 €"],
                        ["Luxury", "250,00 €", "1.100,00 €"],
                        ["Van", "300,00 €", "800,00 €"]
                    ]
                }
            },
            {
                key: 'sideVehicle_2.8',
                titleKey: 'tire',
                images: [
                    { src: require('../../assets/images/ti-scr.jpg'), typeKey: 'a' },
                    { src: require('../../assets/images/ti-br.jpg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'OPN'],
                    rows: [
                        ["Economy", "160,00 €"],
                        ["Compact", "220,00 €"],
                        ["Intermediate", "220,00 €"],
                        ["Premium", "250,00 €"],
                        ["Luxury", "300,00 €"],
                        ["Van", "300,00 €"]
                    ]
                }
            },
            {
                key: 'sideVehicle_2.9',
                titleKey: 'hubcap',
                images: [
                    { src: require('../../assets/images/hc-str.jpg'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/hc-br.png'), typeKey: 'Broken' }
                ],
                table: {
                    header: ['vehCat', 'SBCM'],
                    rows: [
                        ["Economy", "70,00 €"],
                        ["Compact", "80,00 €"],
                        ["Intermediate", "90,00 €"],
                        ["Premium", "90,00 €"],
                        ["Luxury", "110,00 €"],
                        ["Van", "110,00 €"]
                    ]
                }
            },
            {
                key: 'sideVehicle_2.10',
                titleKey: 'wheelRim',
                images: [
                    { src: require('../../assets/images/wr-str.jpg'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/wr-br.jpg'), typeKey: 'Broken' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "150,00 € s. / 150,00 € al.", "170,00 € s. / 500,00 € al."],
                        ["Compact", "150,00 € s. / 150,00 € al.", "220,00 € s. / 600,00 € al."],
                        ["Intermediate", "150,00 € s. / 150,00 € al.", "220,00 € s. / 600,00 € al."],
                        ["Premium", "200,00 € s. / 400,00 € al.", "400,00 € s. / 800,00 € al."],
                        ["Luxury", "200,00 € s. / 400,00 € al.", "400,00 € s. / 800,00 € al."],
                        ["Van", "200,00 € s. / 400,00 € al.", "400,00 € s. / 800,00 € al."]
                    ]
                }
            },

        ]
    },
    {
        key: 'backVehicle',
        titleKey: 'backVehicle',
        subItems: [
            {
                key: 'backVehicle_3.1',
                titleKey: 'bumper',
                images: [
                    { src: require('../../assets/images/bb-str.jpg'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/bb-de.jpg'), typeKey: 'Dent' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'Dent', 'BCMNas'],
                    rows: [
                        ["Economy", "300,00 €", "500,00 €", "750,00 €"],
                        ["Compact", "400,00 €", "600,00 €", "1.200,00 €"],
                        ["Intermediate", "500,00 €", "600,00 €", "1.200,00 €"],
                        ["Premium", "600,00 €", "900,00 €", "1.300,00 €"],
                        ["Luxury", "650,00 €", "1000,00 €", "1.700,00 €"],
                        ["Van", "500,00 €", "650,00 €", "1.000,00 €"]
                    ]
                }
            },
            {
                key: 'backVehicle_3.2',
                titleKey: 'catadioptricLight',
                images: [
                    { src: require('../../assets/images/cl-cr.png'), typeKey: 'c' },
                    { src: require('../../assets/images/cl-br.png'), typeKey: 'c' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "60,00 €", "100,00 €"],
                        ["Compact", "80,00 €", "150,00 €"],
                        ["Intermediate", "100,00 €", "250,00 €"],
                        ["Premium", "100,00 €", "300,00 €"],
                        ["Luxury", "120,00 €", "300,00 €"],
                        ["Van", "100,00 €", "250,00 €"]
                    ]
                }
            },
            {
                key: 'backVehicle_3.3',
                titleKey: 'tailLight',
                images: [
                    { src: require('../../assets/images/cl-cr.png'), typeKey: 'Cracked' },
                    { src: require('../../assets/images/tl-br.jpg'), typeKey: 'Broken' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "250,00 €", "500,00 €"],
                        ["Compact", "350,00 €", "650,00 €"],
                        ["Intermediate", "350,00 €", "700,00 €"],
                        ["Premium", "350,00 €", "1.200,00 €"],
                        ["Luxury", "350,00 €", "1.200,00 €"],
                        ["Van", "350,00 €", "2.300,00 €"]
                    ]
                }
            },
            {
                key: 'backVehicle_3.4',
                titleKey: 'trunkDoor',
                images: [
                    { src: require('../../assets/images/td-de.jpg'), typeKey: 'Dent' },
                    { src: require('../../assets/images/td-str.jpg'), typeKey: 'Scratch' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'Dent', 'BCMNas'],
                    rows: [
                        ["Economy", "350,00 €", "600,00 €", "1.200,00 €"],
                        ["Compact", "350,00 €", "800,00 €", "1.600,00 €"],
                        ["Intermediate", "400,00 €", "850,00 €", "1.800,00 €"],
                        ["Premium", "500,00 €", "1.100,00 €", "1.800,00 €"],
                        ["Luxury", "600,00 €", "1.400,00 €", "2.200,00 €"],
                        ["Van", "600,00 €", "1.100,00 €", "2.200,00 €"]
                    ]
                }
            }
        ]
    },
    {
        key: 'insideVehicle',
        titleKey: 'insideVehicle',
        subItems: [
            {
                key: 'insideVehicle_4.1',
                titleKey: 'seatUpholstery',
                images: [
                    { src: require('../../assets/images/st-str.png'), typeKey: 'a' },
                    { src: require('../../assets/images/st-rip.jpg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "400,00 €", "450,00 €"],
                        ["Compact", "500,00 €", "700,00 €"],
                        ["Intermediate", "500,00 €", "850,00 €"],
                        ["Premium", "800,00 €", "1.000,00 €"],
                        ["Luxury", "1.200,00 €", "1.500,00 €"],
                        ["Van", "600,00 €", "800,00 €"]
                    ]
                }
            },
            {
                key: 'insideVehicle_4.2',
                titleKey: 'luggageCover',
                images: [
                    { src: require('../../assets/images/lc-str.png'), typeKey: 'a' },
                    { src: require('../../assets/images/lc-cr.png'), typeKey: 'Craacked' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "70,00 €", "140,00 €"],
                        ["Compact", "150,00 €", "300,00 €"],
                        ["Intermediate", "150,00 €", "300,00 €"],
                        ["Premium", "150,00 €", "300,00 €"],
                        ["Luxury", "200,00 €", "400,00 €"],
                        ["Van", "250,00 €", "400,00 €"]
                    ]
                }
            },
            {
                key: 'insideVehicle_4.3',
                titleKey: 'ceiling',
                images: [
                    { src: require('../../assets/images/ce-rip.jpg'), typeKey: 'a' },
                    { src: require('../../assets/images/ce-str.png'), typeKey: 'B' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "400,00 €", "600,00 €"],
                        ["Compact", "600,00 €", "1.000,00 €"],
                        ["Intermediate", "700,00 €", "1.200,00 €"],
                        ["Premium", "700,00 €", "1.200,00 €"],
                        ["Luxury", "700,00 €", "1.400,00 €"],
                        ["Van", "700,00 €", "1.400,00 €"]
                    ]
                }
            },
            {
                key: 'insideVehicle_4.4',
                titleKey: 'windshield',
                images: [
                    { src: require('../../assets/images/ws-str.jpg'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/ws-br.jpg'), typeKey: 'Broken' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "70,00 €", "500,00 €"],
                        ["Compact", "70,00 €", "500,00 €"],
                        ["Intermediate", "70,00 €", "700,00 €"],
                        ["Premium", "70,00 €", "1.500,00 €"],
                        ["Luxury", "70,00 €", "1.500,00 €"],
                        ["Van", "70,00 €", "1.500,00 €"]
                    ]
                }
            },
            {
                key: 'insideVehicle_4.5',
                titleKey: 'multimedia',
                images: [
                    { src: require('../../assets/images/mm-str.jpg'), typeKey: 'Scratch' },
                    { src: require('../../assets/images/mm-cr.png'), typeKey: 'Cracked' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "250,00 €", "1.000,00 €"],
                        ["Compact", "350,00 €", "1.300,00 €"],
                        ["Intermediate", "350,00 €", "1.800,00 €"],
                        ["Premium", "500,00 €", "2.000,00 €"],
                        ["Luxury", "500,00 €", "2.400,00 €"],
                        ["Van", "400,00 €", "1.800,00 €"]
                    ]
                }
            },
            {
                key: 'insideVehicle_4.6',
                titleKey: 'interiorKnob',
                images: [
                    { src: require('../../assets/images/id-br.png'), typeKey: 'Broken' },
                    { src: require('../../assets/images/id-ms.png'), typeKey: 'BCMNas' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'BCMNas'],
                    rows: [
                        ["Economy", "60,00 €", "100,00 €"],
                        ["Compact", "70,00 €", "130,00 €"],
                        ["Intermediate", "80,00 €", "150,00 €"],
                        ["Premium", "130,00 €", "400,00 €"],
                        ["Luxury", "100,00 €", "400,00 €"],
                        ["Van", "100,00 €", "250,00 €"]
                    ]
                }
            },
            {
                key: 'insideVehicle_4.7',
                titleKey: 'sunVisor',
                images: [
                    { src: require('../../assets/images/sv-br.png'), typeKey: 'a' },
                    { src: require('../../assets/images/sv-br2.png'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'Scratch', 'Dent', 'BCMNas'],
                    rows: [
                        ["Economy", "100,00 €", "200,00 €", "200,00 €"],
                        ["Compact", "120,00 €", "220,00 €", "220,00 €"],
                        ["Intermediate", "150,00 €", "250,00 €", "250,00 €"],
                        ["Premium", "160,00 €", "250,00 €", "250,00 €"],
                        ["Luxury", "200,00 €", "300,00 €", "300,00 €"],
                        ["Van", "200,00 €", "300,00 €", "300,00 €"]
                    ]
                }
            }
        ]
    },
    {
        key: 'nestoVehicle',
        titleKey: 'nestoVehicle',
        subItems: [
            {
                key: 'nestoVehicle_5.1',
                titleKey: 'wipers',
                images: [
                    { src: require('../../assets/images/wi-br.png'), typeKey: 'Broken' },
                    { src: require('../../assets/images/wi-ms.png'), typeKey: 'Missing' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ["Economy / Compact / Intermediate", "70,00 €"],
                        ["Premium / Luxury / Van", "90,00 €"],
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.2',
                titleKey: 'antenna',
                images: [
                    { src: require('../../assets/images/an-br.jpg'), typeKey: 'Broken' },
                    { src: require('../../assets/images/an-br2.jpg'), typeKey: 'Broken' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ["Economy", "200,00 €"],
                        ["Compact", "200,00 €"],
                        ["Intermediate", "280,00 €"],
                        ["Premium", "350,00 €"],
                        ["Luxury", "350,00 €"],
                        ["Van", "200,00 €"]
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.3',
                titleKey: 'spareWheel',
                images: [
                    { src: require('../../assets/images/sw-ms.jpg'), typeKey: 'a' },
                    { src: require('../../assets/images/sw-br.jpg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ["Economy", "100,00 €"],
                        ["Compact", "150,00 €"],
                        ["Intermediate", "150,00 €"],
                        ["Premium", "400,00 €"],
                        ["Luxury", "400,00 €"],
                        ["Van", "400,00 €"]
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.4',
                titleKey: 'tireRepairTool',
                images: [
                    { src: require('../../assets/images/trk.jpg'), typeKey: 'a' },
                    { src: require('../../assets/images/trk2.jpg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ['All', "70,00 €"],
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.5',
                titleKey: 'jack',
                images: [
                    { src: require('../../assets/images/jc-ms.png'), typeKey: 'a' },
                    { src: require('../../assets/images/jc-br.jpeg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ['All', "130,00 €"],
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.6',
                titleKey: 'fireExt',
                images: [
                    { src: require('../../assets/images/fire.jpeg'), typeKey: 'a' },
                    { src: require('../../assets/images/fire.jpeg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ['All', "60,00 €"],
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.7',
                titleKey: 'standNav',
                images: [
                    { src: require('../../assets/images/cn.jpg'), typeKey: 'a' },
                    { src: require('../../assets/images/cn2.jpg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ['All', "250,00 €"],
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.8',
                titleKey: 'ashtray',
                images: [
                    { src: require('../../assets/images/ash.png'), typeKey: 'a' },
                    { src: require('../../assets/images/ash2.png'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ["Economy", "60,00 €"],
                        ["Compact", "60,00 €"],
                        ["Intermediate", "80,00 €"],
                        ["Premium", "80,00 €"],
                        ["Luxury", "80,00 €"],
                        ["Van", "100,00 €"]
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.9',
                titleKey: 'mandatoryEq',
                images: [
                    { src: require('../../assets/images/mce-br.png'), typeKey: 'Broken' },
                    { src: require('../../assets/images/mce-ms.png'), typeKey: 'Missing' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ['All', "70,00 €"],
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.10',
                titleKey: 'ckey',
                images: [
                    { src: require('../../assets/images/c-br.png'), typeKey: 'a' },
                    { src: require('../../assets/images/ck-br.png'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ["Economy", "450,00 €"],
                        ["Compact", "500,00 €"],
                        ["Intermediate", "500,00 €"],
                        ["Premium", "550,00 €"],
                        ["Luxury", "600,00 €"],
                        ["Van", "500,00 €"]
                    ]
                }
            },
            {
                key: 'nestoVehicle_5.11',
                titleKey: 'vehDoc',
                images: [
                    { src: require('../../assets/images/cd-ms.png'), typeKey: 'a' },
                    { src: require('../../assets/images/cd-br.png'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'BCMNas'],
                    rows: [
                        ['All', "280,00 €"],
                    ]
                }
            }

        ]
    },
    {
        key: 'cleanVehicle',
        titleKey: 'cleanVehicle',
        subItems: [
            {
                key: 'cleanVehicle_6.1',
                titleKey: 'dryCleaning',
                images: [
                    { src: require('../../assets/images/dc.jpg'), typeKey: 'a' },
                    { src: require('../../assets/images/dc2.jpg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'pps', 'ppk'],
                    rows: [
                        ["All", "80,00 €", "150,00 €"],
                    ]
                }
            },
            {
                key: 'cleanVehicle_6.2',
                titleKey: 'ozonCleaning',
                images: [
                    { src: require('../../assets/images/dc.jpg'), typeKey: 'a' },
                    { src: require('../../assets/images/dc2.jpg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'prajs'],
                    rows: [
                        ["All", "90,00 €"],
                    ]
                }
            },
            {
                key: 'cleanVehicle_6.3',
                titleKey: 'extradrt',
                images: [
                    { src: require('../../assets/images/dc.jpg'), typeKey: 'a' },
                    { src: require('../../assets/images/dc2.jpg'), typeKey: 'a' }
                ],
                table: {
                    header: ['vehCat', 'prajs'],
                    rows: [
                        ["Economy / Compact / Intermediate", "200,00 €"],
                        ["Premium / Luxury", "250,00 €"],
                        ["Van", "400,00 €"]
                    ]
                }
            }
        ]
    }
];

export default function TermsAndConditions() {
    const router = useRouter();
    const { language, languages } = useLanguage();
    const scrollRef = useRef<ScrollView>(null);
    const subRefs = useRef<{ [key: string]: any }>({});

    const [expandedSection, setExpandedSection] = useState<string | null>(null);
    const [expandedSubsection, setExpandedSubsection] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Scroll back to top
    const scrollToTop = () => {
        scrollRef.current?.scrollTo({ y: 0, animated: true });
    };

    // Handle subsection accordion open/close and auto-scroll
    const handleSubPress = (key: string) => {
        const opening = expandedSubsection !== key;
        setExpandedSubsection(opening ? key : null);

        if (opening && scrollRef.current) {
            setTimeout(() => {
                const node = subRefs.current[key];
                const scrollHandle = findNodeHandle(scrollRef.current);
                if (node && scrollHandle) {
                    node.measureLayout(
                        scrollHandle,
                        (_x: number, y: number, _w: number, h: number) => {
                            const offset = y - WINDOW_HEIGHT / 2 + h / 2;
                            scrollRef.current?.scrollTo({ y: offset, animated: true });
                        },
                        (err: any) => console.warn('Layout measure error', err)
                    );
                }
            }, 100);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView ref={scrollRef} contentContainerStyle={styles.scrollContent}>
                {/* Logo and Title */}
                <Image style={styles.logo} source={require('../../assets/images/hertzlogo.png')} />
                <Text style={styles.title}>{languages[language].dmgCostCatalogue}</Text>

                {/* Introduction */}
                <Text style={styles.sectionTitle}>{languages[language].introduction}</Text>
                {['I1Text', 'I2Text', 'I3Text', 'I4Text', 'I5Text', 'I6Text', 'I7Text', 'I8Text'].map((k) => (
                    <Text key={k} style={styles.paragraph}>{languages[language][k]}</Text>
                ))}

                {/* Warning */}
                <View style={styles.warningBox}>
                    <Text style={styles.warningText}>{languages[language].vehicleInstructions}</Text>
                </View>
                {['I9Text', 'I10Text', 'I11Text', 'I12Text', 'I13Text', 'I14Text', 'I15Text'].map((k) => (
                    <Text key={k} style={styles.paragraph}>{languages[language][k]}</Text>
                ))}

                {/* Evaluator */}
                <Text style={styles.sectionTitle}>{languages[language].dmgEvaluator}</Text>
                <Image style={styles.evaluatorImage} source={require('../../assets/images/dmg-evaluator.png')} />
                {['E1Text', 'E2Text', 'E3Text', 'E4Text'].map((k) => (
                    <Text key={k} style={styles.paragraph}>{languages[language][k]}</Text>
                ))}

                {/* Definitions */}
                <Text style={styles.sectionTitle}>{languages[language].DefOdDmg}</Text>
                {['Scratch', 'Dent', 'BCMNas', 'Rip', 'Dirt', 'Mal'].map((typeKey) => (
                    <View key={typeKey} style={styles.definitionRow}>
                        <Image style={styles.defImage} source={
                            {
                                Scratch: require('../../assets/images/scr-ex.png'),
                                Dent: require('../../assets/images/dent-ex.png'),
                                BCMNas: require('../../assets/images/BCM.png'),
                                Rip: require('../../assets/images/rip.png'),
                                Dirt: require('../../assets/images/dirt.jpg'),
                                Mal: require('../../assets/images/mal.png'),
                            }[typeKey]
                        } />
                        <View style={styles.defText}>
                            <Text style={styles.defTitle}>{languages[language][typeKey]}</Text>
                            <Text style={styles.paragraph}>{languages[language][typeKey + 'Para']}</Text>
                            {typeKey === 'Rip' && <Text style={styles.paragraph}>{languages[language].RipPara2}</Text>}
                        </View>
                    </View>
                ))}

                {/* Damage Examples Accordion */}
                <Text style={styles.sectionTitle}>{languages[language].dmgExamples}</Text>
                {DAMAGE_SECTIONS.map((section) => (
                    <View key={section.key}>
                        <TouchableOpacity
                            style={[styles.accordionHeader, expandedSection === section.key && styles.activeHeader]}
                            onPress={() => {
                                setExpandedSection(prev => prev === section.key ? null : section.key);
                                setExpandedSubsection(null);
                            }}
                        >
                            <Text style={styles.headerText}>{languages[language][section.titleKey]}</Text>
                        </TouchableOpacity>
                        {expandedSection === section.key && (
                            <View style={styles.accordionBody}>
                                {section.subItems.map((sub) => (
                                    <View key={sub.key} ref={(el) => (subRefs.current[sub.key] = el)}>
                                        <TouchableOpacity
                                            style={[styles.subHeader, expandedSubsection === sub.key && styles.activeSubHeader]}
                                            onPress={() => handleSubPress(sub.key)}
                                        >
                                            <Text style={styles.subHeaderText}>{languages[language][sub.titleKey]}</Text>
                                        </TouchableOpacity>
                                        {expandedSubsection === sub.key && (
                                            <View style={styles.subContent}>
                                                <View style={styles.imageGrid}>
                                                    {sub.images.map((img, i) => (
                                                        <View key={i} style={styles.imageItem}>
                                                            <Image style={styles.itemImage} source={img.src} />
                                                            <Text style={styles.imageLabel}>{languages[language][img.typeKey]}</Text>
                                                        </View>
                                                    ))}
                                                </View>
                                                <View style={styles.table}>
                                                    <View style={styles.tableHeader}>
                                                        {sub.table.header.map(h => (
                                                            <Text key={h} style={styles.cellHeader}>{languages[language][h] || h}</Text>
                                                        ))}
                                                    </View>
                                                    {sub.table.rows.map((row, ri) => (
                                                        <View key={ri} style={styles.tableRow}>
                                                            {row.map((cell, ci) => (
                                                                <Text key={ci} style={styles.cell}>{languages[language][cell] || cell}</Text>
                                                            ))}
                                                        </View>
                                                    ))}
                                                </View>
                                            </View>
                                        )}
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                ))}

                <Text style={styles.footer}>{languages[language].footer}</Text>
            </ScrollView>

            {/* Floating Buttons */}
            <TouchableOpacity style={styles.fabTop} onPress={scrollToTop}>
                <Icon name="arrow-up" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabHome} onPress={() => router.push('/')}>
                <Icon name="home" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.fabBack} onPress={() => router.push('/menu')}>
                <Icon name="arrow-left" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.qrButton} onPress={() => setModalVisible(true)}>
                <QRCode value="https://drive.google.com/file/d/1y5dK-rZLORjrO4ytoxM8-ZEYjhkUCc9G/view?usp=sharing" size={60} />
            </TouchableOpacity>

            {/* QR Modal */}
            <Modal transparent visible={modalVisible} animationType="fade" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
                        <QRCode value="https://drive.google.com/file/d/1y5dK-rZLORjrO4ytoxM8-ZEYjhkUCc9G/view?usp=sharing" size={220} />
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 60 },
    scrollContent: { padding: 20, paddingBottom: 60 },
    logo: { width: 150, height: 75, alignSelf: 'center', resizeMode: 'contain' },
    title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 },
    sectionTitle: { fontSize: 22, fontWeight: '600', marginTop: 20, marginBottom: 10 },
    paragraph: { fontSize: 16, lineHeight: 24, marginBottom: 10 },
    warningBox: { backgroundColor: '#FFCC00', padding: 16, borderRadius: 8, marginVertical: 15 },
    warningText: { fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
    evaluatorImage: { alignSelf: 'center', marginVertical: 15, resizeMode: 'contain' },
    definitionRow: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
    defImage: { width: 550, height: 250, resizeMode: 'cover', borderRadius: 8 },
    defText: { flex: 1, paddingLeft: 10 },
    defTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
    accordionHeader: { padding: 10, backgroundColor: '#D0D0D0', borderRadius: 6, marginTop: 10 },
    activeHeader: { backgroundColor: '#A9A9A9' },
    headerText: { fontSize: 16, fontWeight: 'bold' },
    accordionBody: { paddingLeft: 10 },
    subHeader: { padding: 8, backgroundColor: '#E0E0E0', borderRadius: 6, marginTop: 5 },
    activeSubHeader: { backgroundColor: '#A9A9A9' },
    subHeaderText: { fontSize: 14, fontWeight: '500' },
    subContent: { paddingLeft: 10, marginTop: 5 },
    imageGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    imageItem: { width: '48%', alignItems: 'center' },
    itemImage: { width: '100%', height: 300, borderRadius: 8, resizeMode: 'cover' },
    imageLabel: { marginTop: 6, fontSize: 14 },
    table: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, overflow: 'hidden' },
    tableHeader: { flexDirection: 'row', backgroundColor: '#FFCC00', paddingVertical: 8 },
    tableRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 8 },
    cellHeader: { flex: 1, textAlign: 'center', fontWeight: 'bold' },
    cell: { flex: 1, textAlign: 'center' },
    footer: { textAlign: 'center', fontSize: 14, color: '#666', marginTop: 30 },
    fabTop: { position: 'absolute', bottom: 120, right: 20, backgroundColor: '#FFCC00', padding: 12, borderRadius: 24, elevation: 5 },
    fabHome: { position: 'absolute', bottom: 60, right: 20, backgroundColor: '#FFCC00', padding: 12, borderRadius: 24, elevation: 5 },
    fabBack: { position: 'absolute', bottom: 60, right: 80, backgroundColor: '#FFCC00', padding: 12, borderRadius: 24, elevation: 5 },
    qrButton: { position: 'absolute', top: 40, right: 20, zIndex: 10 },
    modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalClose: { backgroundColor: '#fff', padding: 20, borderRadius: 10 },
});
