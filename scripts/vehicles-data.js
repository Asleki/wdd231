// js/vehicles-data.js

// Define a global placeholder image path. This can be used if a specific car image fails to load.
const PLACEHOLDER_IMAGE_URL = 'images/placeholder.png'; // Make sure you have this image!

const vehicles = [
    {
        id: 'v001',
        make: 'AC Schnitzer',
        model: 'AC Schnitzer',
        year: 2022,
        price: 9_500_000, // KSh
        condition: 'Foreign Used',
        availability: 'Imported',
        shippingFee: 350_000,
        deliveryDays: 45,
        vatInclusive: false,
        color: 'Black',
        availableColors: ['Black', 'White', 'Silver'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/ac_schnitzer/ac_schnitzer1.webp', 'images/ac_schnitzer/ac_schnitzer2.webp',
            'images/ac_schnitzer/ac_schnitzer3.webp'
        ],
        interiorImages: [
            'images/ac_schnitzer/interior/ac_schnitzer_interior1.jpg',
            'images/ac_schnitzer/interior/ac_schnitzer_interior2.jpg',
            'images/ac_schnitzer/interior/ac_schnitzer_interior3.jpg',
            'images/ac_schnitzer/interior/ac_schnitzer_interior4.jpg'
        ],
        bodyType: 'Coupe',
        transmission: 'Automatic',
        engineSize: '3000cc'
    },
    {
        id: 'v002',
        make: 'Bentley',
        model: 'Mulsanne - Grand Limousine',
        year: 2023,
        price: 75_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 1_500_000,
        deliveryDays: 90,
        vatInclusive: true,
        color: 'Silver',
        availableColors: ['Silver', 'Black', 'Blue'],
        inStock: 0, // Order on demand
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/bentley_mulsanne_grand_limousine/bentley_mulsanne_grand_limousine1.webp',
            'images/bentley_mulsanne_grand_limousine/bentley_mulsanne_grand_limousine2.webp',
            'images/bentley_mulsanne_grand_limousine/bentley_mulsanne_grand_limousine3.webp'
        ],
        interiorImages: [
            'images/bentley_mulsanne_grand_limousine/interior/bentley_mulsanne_grand_limousine_interior1.webp',
            'images/bentley_mulsanne_grand_limousine/interior/bentley_mulsanne_grand_limousine_interior2.webp',
            'images/bentley_mulsanne_grand_limousine/interior/bentley_mulsanne_grand_limousine_interior3.webp'
        ],
        bodyType: 'Limousine',
        transmission: 'Automatic',
        engineSize: '6750cc'
    },
    {
        id: 'v003',
        make: 'Bugatti',
        model: 'Chiron S',
        year: 2023,
        price: 450_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 2_000_000,
        deliveryDays: 120,
        vatInclusive: true,
        color: 'Blue',
        availableColors: ['Blue', 'Black', 'Red'],
        inStock: 0,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/bugatti_chiron_s/bugatti_chiron_s1.webp',
            'images/bugatti_chiron_s/bugatti_chiron_s2.webp',
            'images/bugatti_chiron_s/bugatti_chiron_s3.webp'
        ],
        interiorImages: [
            'images/bugatti_chiron_s/interior/bugatti_chiron_s_interior1.webp',
            'images/bugatti_chiron_s/interior/bugatti_chiron_s_interior2.webp'
        ],
        bodyType: 'Coupe',
        transmission: 'Automatic',
        engineSize: '8000cc'
    },
    {
        id: 'v004',
        make: 'Bugatti',
        model: 'Veyron',
        year: 2012,
        price: 280_000_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 1_800_000,
        deliveryDays: 90,
        vatInclusive: true,
        color: 'Black',
        availableColors: ['Black', 'White', 'Silver'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/bugatti_veyron/bugatti_veyron1.webp',
            'images/bugatti_veyron/bugatti_veyron2.webp',
            'images/bugatti_veyron/bugatti_veyron3.webp'
        ],
        interiorImages: [
            'images/bugatti_veyron/interior/bugatti_veyron_interior1.webp',
            'images/bugatti_veyron/interior/bugatti_veyron_interior2.webp'
        ],
        bodyType: 'Coupe',
        transmission: 'Automatic',
        engineSize: '8000cc'
    },
    {
        id: 'v005',
        make: 'Chevrolet',
        model: '2026 Corvette ZR1',
        year: 2026,
        price: 25_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 600_000,
        deliveryDays: 75,
        vatInclusive: false,
        color: 'Red',
        availableColors: ['Red', 'Yellow', 'White', 'Black'],
        inStock: 0,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/chevrolet_corvette_zr1/chevrolet_corvette_zr11.webp',
            'images/chevrolet_corvette_zr1/chevrolet_corvette_zr12.webp',
            'images/chevrolet_corvette_zr1/chevrolet_corvette_zr13.webp'
        ],
        interiorImages: [
            'images/chevrolet_corvette_zr1/interior/chevrolet_corvette_zr1_interior1.webp',
            'images/chevrolet_corvette_zr1/interior/chevrolet_corvette_zr1_interior2.webp'
        ],
        bodyType: 'Sports Car',
        transmission: 'Automatic',
        engineSize: '6200cc'
    },
    {
        id: 'v006',
        make: 'Ferrari',
        model: 'F40',
        year: 1992,
        price: 200_000_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'Red',
        availableColors: ['Red'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/ferrari_f40/ferrari_f401.webp',
            'images/ferrari_f40/ferrari_f402.webp',
            'images/ferrari_f40/ferrari_f403.webp'
        ],
        interiorImages: [
            'images/ferrari_f40/interior/ferrari_f40_interior1.webp',
            'images/ferrari_f40/interior/ferrari_f40_interior2.webp'
        ],
        bodyType: 'Coupe',
        transmission: 'Manual',
        engineSize: '2900cc'
    },
    {
        id: 'v007',
        make: 'Frank Stephenson',
        model: 'n-P1-Tavarieh',
        year: 2025,
        price: 1_000_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 5_000_000,
        deliveryDays: 180,
        vatInclusive: true,
        color: 'Customizable',
        availableColors: ['Customizable'],
        inStock: 0,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/frank_stephenson_n_p1_tavarieh/frank_stephenson_n_p1_tavarieh1.webp',
            'images/frank_stephenson_n_p1_tavarieh/frank_stephenson_n_p1_tavarieh2.webp'
        ],
        interiorImages: [
            'images/frank_stephenson_n_p1_tavarieh/interior/frank_stephenson_n_p1_tavarieh_interior1.webp'
        ],
        bodyType: 'Concept',
        transmission: 'Automatic',
        engineSize: 'EV'
    },
    {
        id: 'v008',
        make: 'Lamborghini',
        model: 'Murcielago',
        year: 2008,
        price: 45_000_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 800_000,
        deliveryDays: 60,
        vatInclusive: false,
        color: 'Yellow',
        availableColors: ['Yellow', 'Orange', 'Black'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/lamborghini_murcielago/lamborghini_murcielago1.webp',
            'images/lamborghini_murcielago/lamborghini_murcielago2.webp'
        ],
        interiorImages: [
            'images/lamborghini_murcielago/interior/lamborghini_murcielago_interior1.webp'
        ],
        bodyType: 'Coupe',
        transmission: 'Manual',
        engineSize: '6500cc'
    },
    {
        id: 'v009',
        make: 'Lamborghini',
        model: 'Reventon',
        year: 2009,
        price: 120_000_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 1_000_000,
        deliveryDays: 70,
        vatInclusive: true,
        color: 'Matte Grey',
        availableColors: ['Matte Grey'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/lamborghini_reventon/lamborghini_reventon1.webp',
            'images/lamborghini_reventon/lamborghini_reventon2.webp'
        ],
        interiorImages: [
            'images/lamborghini_reventon/interior/lamborghini_reventon_interior1.webp'
        ],
        bodyType: 'Coupe',
        transmission: 'Automatic',
        engineSize: '6500cc'
    },
    {
        id: 'v010',
        make: 'Mansory',
        model: 'Bentley Continental-GT',
        year: 2021,
        price: 38_000_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 700_000,
        deliveryDays: 50,
        vatInclusive: false,
        color: 'Black',
        availableColors: ['Black', 'White', 'Customizable'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/mansory_bentley_continental_gt/mansory_bentley_continental_gt1.webp',
            'images/mansory_bentley_continental_gt/mansory_bentley_continental_gt2.webp'
        ],
        interiorImages: [
            'images/mansory_bentley_continental_gt/interior/mansory_bentley_continental_gt_interior1.webp'
        ],
        bodyType: 'Coupe',
        transmission: 'Automatic',
        engineSize: '6000cc'
    },
    {
        id: 'v011',
        make: 'Mansory',
        model: 'Rolls-Royce Cullinan',
        year: 2022,
        price: 70_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 1_200_000,
        deliveryDays: 70,
        vatInclusive: true,
        color: 'White',
        availableColors: ['White', 'Black', 'Customizable'],
        inStock: 0,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/mansory_rolls_royce_cullinan/mansory_rolls_royce_cullinan1.webp',
            'images/mansory_rolls_royce_cullinan/mansory_rolls_royce_cullinan2.webp'
        ],
        interiorImages: [
            'images/mansory_rolls_royce_cullinan/interior/mansory_rolls_royce_cullinan_interior1.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '6750cc'
    },
    {
        id: 'v012',
        make: 'Mercedes-Benz',
        model: 'CLA 13',
        year: 2020,
        price: 6_800_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'Grey',
        availableColors: ['Grey', 'White', 'Black', 'Blue'],
        inStock: 2,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/mercedes_cla_13/mercedes_cla_131.webp',
            'images/mercedes_cla_13/mercedes_cla_132.webp',
            'images/mercedes_cla_13/mercedes_cla_133.webp'
        ],
        interiorImages: [
            'images/mercedes_cla_13/interior/mercedes_cla_13_interior1.webp',
            'images/mercedes_cla_13/interior/mercedes_cla_13_interior2.webp'
        ],
        bodyType: 'Sedan',
        transmission: 'Automatic',
        engineSize: '1300cc'
    },
    {
        id: 'v013',
        make: 'Nissan',
        model: 'GT R34',
        year: 2000,
        price: 15_000_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 400_000,
        deliveryDays: 55,
        vatInclusive: false,
        color: 'Blue',
        availableColors: ['Blue', 'White', 'Black'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/nissan_gt_r34/nissan_gt_r341.webp',
            'images/nissan_gt_r34/nissan_gt_r342.webp',
            'images/nissan_gt_r34/nissan_gt_r343.webp'
        ],
        interiorImages: [
            'images/nissan_gt_r34/interior/nissan_gt_r34_interior1.webp',
            'images/nissan_gt_r34/interior/nissan_gt_r34_interior2.webp'
        ],
        bodyType: 'Coupe',
        transmission: 'Manual',
        engineSize: '2600cc'
    },
    {
        id: 'v014',
        make: 'Rolls Royce',
        model: 'Comiche',
        year: 1985,
        price: 12_000_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'Cream',
        availableColors: ['Cream'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/rolls_royce_comiche/rolls_royce_comiche1.webp',
            'images/rolls_royce_comiche/rolls_royce_comiche2.webp'
        ],
        interiorImages: [
            'images/rolls_royce_comiche/interior/rolls_royce_comiche_interior1.webp'
        ],
        bodyType: 'Convertible',
        transmission: 'Automatic',
        engineSize: '6750cc'
    },
    {
        id: 'v015',
        make: 'Rolls Royce',
        model: 'Cullinan',
        year: 2022,
        price: 60_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 1_000_000,
        deliveryDays: 60,
        vatInclusive: true,
        color: 'Black',
        availableColors: ['Black', 'White', 'Silver', 'Blue'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/rolls_royce_cullinan/rolls_royce_cullinan1.webp',
            'images/rolls_royce_cullinan/rolls_royce_cullinan2.webp',
            'images/rolls_royce_cullinan/rolls_royce_cullinan3.webp'
        ],
        interiorImages: [
            'images/rolls_royce_cullinan/interior/rolls_royce_cullinan_interior1.webp',
            'images/rolls_royce_cullinan/interior/rolls_royce_cullinan_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '6750cc'
    },
    {
        id: 'v016',
        make: 'Rolls Royce',
        model: 'Wraith-Mansory Gold',
        year: 2020,
        price: 85_000_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 950_000,
        deliveryDays: 70,
        vatInclusive: true,
        color: 'Gold',
        availableColors: ['Gold'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/rolls_royce_wraith_mansory_gold/rolls_royce_wraith_mansory_gold1.webp',
            'images/rolls_royce_wraith_mansory_gold/rolls_royce_wraith_mansory_gold2.webp'
        ],
        interiorImages: [
            'images/rolls_royce_wraith_mansory_gold/interior/rolls_royce_wraith_mansory_gold_interior1.webp'
        ],
        bodyType: 'Coupe',
        transmission: 'Automatic',
        engineSize: '6600cc'
    },
    {
        id: 'v017',
        make: 'Subaru',
        model: 'Solterra',
        year: 2023,
        price: 7_500_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 200_000,
        deliveryDays: 40,
        vatInclusive: false,
        color: 'Blue',
        availableColors: ['Blue', 'White', 'Black', 'Grey'],
        inStock: 3,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/subaru_solterra/subaru_solterra1.webp',
            'images/subaru_solterra/subaru_solterra2.webp',
            'images/subaru_solterra/subaru_solterra3.webp'
        ],
        interiorImages: [
            'images/subaru_solterra/interior/subaru_solterra_interior1.webp',
            'images/subaru_solterra/interior/subaru_solterra_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: 'EV'
    },
    {
        id: 'v018',
        make: 'Subaru',
        model: 'Forester',
        year: 2019,
        price: 4_200_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'Silver',
        availableColors: ['Silver', 'Black', 'Blue'],
        inStock: 5,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer'],
        images: [
            'images/subaru_forester/subaru_forester1.webp',
            'images/subaru_forester/subaru_forester2.webp',
            'images/subaru_forester/subaru_forester3.webp'
        ],
        interiorImages: [
            'images/subaru_forester/interior/subaru_forester_interior1.webp',
            'images/subaru_forester/interior/subaru_forester_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2500cc'
    },
    {
        id: 'v019',
        make: 'Toyota',
        model: 'GR Yaris',
        year: 2021,
        price: 6_000_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 180_000,
        deliveryDays: 40,
        vatInclusive: false,
        color: 'White',
        availableColors: ['White', 'Red', 'Black'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/toyota_gr_yaris/toyota_gr_yaris1.webp',
            'images/toyota_gr_yaris/toyota_gr_yaris2.webp',
            'images/toyota_gr_yaris/toyota_gr_yaris3.webp'
        ],
        interiorImages: [
            'images/toyota_gr_yaris/interior/toyota_gr_yaris_interior1.webp',
            'images/toyota_gr_yaris/interior/toyota_gr_yaris_interior2.webp'
        ],
        bodyType: 'Hatchback',
        transmission: 'Manual',
        engineSize: '1600cc'
    },
    {
        id: 'v020',
        make: 'Toyota',
        model: 'RAV4',
        year: 2020,
        price: 4_800_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used', // Changed from Imported to better reflect status
        shippingFee: 250_000,
        deliveryDays: 35,
        vatInclusive: false,
        color: 'White',
        availableColors: ['White', 'Silver', 'Blue', 'Black'],
        inStock: 4,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/toyota_rav4/toyota_rav41.webp',
            'images/toyota_rav4/toyota_rav42.webp',
            'images/toyota_rav4/toyota_rav43.webp'
        ],
        interiorImages: [
            'images/toyota_rav4/interior/toyota_rav4_interior1.webp',
            'images/toyota_rav4/interior/toyota_rav4_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2500cc'
    },
    {
        id: 'v021',
        make: 'Toyota',
        model: 'RAV4 Pickup',
        year: 2021,
        price: 5_500_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 300_000,
        deliveryDays: 45,
        vatInclusive: false,
        color: 'Green',
        availableColors: ['Green', 'Black', 'White'],
        inStock: 2,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/toyota_rav4_pickup/toyota_rav4_pickup1.webp',
            'images/toyota_rav4_pickup/toyota_rav4_pickup2.webp'
        ],
        interiorImages: [
            'images/toyota_rav4_pickup/interior/toyota_rav4_pickup_interior1.webp'
        ],
        bodyType: 'Pickup',
        transmission: 'Automatic',
        engineSize: '2500cc'
    },
    {
        id: 'v022',
        make: 'Toyota',
        model: 'RAV4 Adventure',
        year: 2022,
        price: 5_200_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 280_000,
        deliveryDays: 38,
        vatInclusive: false,
        color: 'Khaki',
        availableColors: ['Khaki', 'Lunar Rock', 'White'],
        inStock: 1,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/toyota_rav4_adventure/toyota_rav4_adventure1.webp',
            'images/toyota_rav4_adventure/toyota_rav4_adventure2.webp'
        ],
        interiorImages: [
            'images/toyota_rav4_adventure/interior/toyota_rav4_adventure_interior1.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2500cc'
    },
    {
        id: 'v023',
        make: 'Volvo',
        model: 'V60 Polestar',
        year: 2020,
        price: 7_800_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 300_000,
        deliveryDays: 40,
        vatInclusive: false,
        color: 'Rebel Blue',
        availableColors: ['Rebel Blue', 'Black', 'White'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/volvo_v60_polestar/volvo_v60_polestar1.webp',
            'images/volvo_v60_polestar/volvo_v60_polestar2.webp'
        ],
        interiorImages: [
            'images/volvo_v60_polestar/interior/volvo_v60_polestar_interior1.webp'
        ],
        bodyType: 'Wagon',
        transmission: 'Automatic',
        engineSize: '2000cc'
    },
    {
        id: 'v024',
        make: 'Volvo',
        model: 'XC70',
        year: 2016,
        price: 4_000_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'Bronze',
        availableColors: ['Bronze', 'Black', 'Grey'],
        inStock: 1,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer'],
        images: [
            'images/volvo_xc70/volvo_xc701.webp',
            'images/volvo_xc70/volvo_xc702.webp'
        ],
        interiorImages: [
            'images/volvo_xc70/interior/volvo_xc70_interior1.webp',
            'images/volvo_xc70/interior/volvo_xc70_interior2.webp'
        ],
        bodyType: 'Wagon',
        transmission: 'Automatic',
        engineSize: '2400cc'
    },
    {
        id: 'v025',
        make: 'Porsche',
        model: '911 Carrera S',
        year: 2023,
        price: 28_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 700_000,
        deliveryDays: 60,
        vatInclusive: true,
        color: 'Silver',
        availableColors: ['Silver', 'Black', 'Red', 'Yellow'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/porsche_911_carrera_s/porsche_911_carrera_s1.webp',
            'images/porsche_911_carrera_s/porsche_911_carrera_s2.webp',
            'images/porsche_911_carrera_s/porsche_911_carrera_s3.webp'
        ],
        interiorImages: [
            'images/porsche_911_carrera_s/interior/porsche_911_carrera_s_interior1.webp',
            'images/porsche_911_carrera_s/interior/porsche_911_carrera_s_interior2.webp'
        ],
        bodyType: 'Coupe',
        transmission: 'Automatic',
        engineSize: '3000cc'
    },
    {
        id: 'v026',
        make: 'Tesla',
        model: 'Model 3',
        year: 2022,
        price: 8_500_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 250_000,
        deliveryDays: 45,
        vatInclusive: false,
        color: 'White',
        availableColors: ['White', 'Black', 'Red', 'Blue'],
        inStock: 2,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/tesla_model3/tesla_model31.webp',
            'images/tesla_model3/tesla_model32.webp',
            'images/tesla_model3/tesla_model33.webp'
        ],
        interiorImages: [
            'images/tesla_model3/interior/tesla_model3_interior1.webp',
            'images/tesla_model3/interior/tesla_model3_interior2.webp'
        ],
        bodyType: 'Sedan',
        transmission: 'Automatic',
        engineSize: 'EV'
    },
    {
        id: 'v027',
        make: 'Hyundai',
        model: 'Tucson',
        year: 2021,
        price: 4_500_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 180_000,
        deliveryDays: 35,
        vatInclusive: false,
        color: 'Blue',
        availableColors: ['Blue', 'Grey', 'Silver', 'Black'],
        inStock: 3,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer'],
        images: [
            'images/hyundai_tucson/hyundai_tucson1.webp',
            'images/hyundai_tucson/hyundai_tucson2.webp',
            'images/hyundai_tucson/hyundai_tucson3.webp'
        ],
        interiorImages: [
            'images/hyundai_tucson/interior/hyundai_tucson_interior1.webp',
            'images/hyundai_tucson/interior/hyundai_tucson_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2000cc'
    },
    {
        id: 'v028',
        make: 'Kia',
        model: 'Sportage',
        year: 2022,
        price: 4_900_000, // KSh
        condition: 'New',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'White',
        availableColors: ['White', 'Black', 'Silver', 'Red'],
        inStock: 5,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/kia_sportage/kia_sportage1.webp',
            'images/kia_sportage/kia_sportage2.webp',
            'images/kia_sportage/kia_sportage3.webp'
        ],
        interiorImages: [
            'images/kia_sportage/interior/kia_sportage_interior1.webp',
            'images/kia_sportage/interior/kia_sportage_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '1600cc'
    },
    {
        id: 'v029',
        make: 'Ford',
        model: 'Ranger',
        year: 2020,
        price: 4_000_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: false,
        color: 'Black',
        availableColors: ['Black', 'White', 'Blue'],
        inStock: 2,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/ford_ranger/ford_ranger1.webp',
            'images/ford_ranger/ford_ranger2.webp',
            'images/ford_ranger/ford_ranger3.webp'
        ],
        interiorImages: [
            'images/ford_ranger/interior/ford_ranger_interior1.webp',
            'images/ford_ranger/interior/ford_ranger_interior2.webp'
        ],
        bodyType: 'Pickup',
        transmission: 'Manual',
        engineSize: '3200cc'
    },
    {
        id: 'v030',
        make: 'Mazda',
        model: 'CX-5',
        year: 2019,
        price: 3_800_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 150_000,
        deliveryDays: 30,
        vatInclusive: false,
        color: 'Red',
        availableColors: ['Red', 'Grey', 'White'],
        inStock: 4,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/mazda_cx5/mazda_cx51.webp',
            'images/mazda_cx5/mazda_cx52.webp',
            'images/mazda_cx5/mazda_cx53.webp'
        ],
        interiorImages: [
            'images/mazda_cx5/interior/mazda_cx5_interior1.webp',
            'images/mazda_cx5/interior/mazda_cx5_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2500cc'
    },
    {
        id: 'v031',
        make: 'Mitsubishi',
        model: 'Outlander',
        year: 2018,
        price: 3_200_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'Black',
        availableColors: ['Black', 'Silver', 'White'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/mitsubishi_outlander/mitsubishi_outlander1.webp',
            'images/mitsubishi_outlander/mitsubishi_outlander2.webp'
        ],
        interiorImages: [
            'images/mitsubishi_outlander/interior/mitsubishi_outlander_interior1.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2400cc'
    },
    {
        id: 'v032',
        make: 'Mercedes-Benz',
        model: 'GLE 400',
        year: 2021,
        price: 18_000_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 500_000,
        deliveryDays: 50,
        vatInclusive: true,
        color: 'White',
        availableColors: ['White', 'Black', 'Grey'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/mercedes_gle_400/mercedes_gle_4001.webp',
            'images/mercedes_gle_400/mercedes_gle_4002.webp',
            'images/mercedes_gle_400/mercedes_gle_4003.webp'
        ],
        interiorImages: [
            'images/mercedes_gle_400/interior/mercedes_gle_400_interior1.webp',
            'images/mercedes_gle_400/interior/mercedes_gle_400_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '3000cc'
    },
    {
        id: 'v033',
        make: 'BMW',
        model: '3 Series (G20)',
        year: 2020,
        price: 9_000_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 300_000,
        deliveryDays: 40,
        vatInclusive: false,
        color: 'Blue',
        availableColors: ['Blue', 'Black', 'White', 'Grey'],
        inStock: 2,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/bmw_3_series_g20/bmw_3_series_g201.webp',
            'images/bmw_3_series_g20/bmw_3_series_g202.webp',
            'images/bmw_3_series_g20/bmw_3_series_g203.webp'
        ],
        interiorImages: [
            'images/bmw_3_series_g20/interior/bmw_3_series_g20_interior1.webp',
            'images/bmw_3_series_g20/interior/bmw_3_series_g20_interior2.webp'
        ],
        bodyType: 'Sedan',
        transmission: 'Automatic',
        engineSize: '2000cc'
    },
    {
        id: 'v034',
        make: 'Audi',
        model: 'Q5',
        year: 2019,
        price: 7_200_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 280_000,
        deliveryDays: 45,
        vatInclusive: false,
        color: 'Black',
        availableColors: ['Black', 'White', 'Silver'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/audi_q5/audi_q51.webp',
            'images/audi_q5/audi_q52.webp',
            'images/audi_q5/audi_q53.webp'
        ],
        interiorImages: [
            'images/audi_q5/interior/audi_q5_interior1.webp',
            'images/audi_q5/interior/audi_q5_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2000cc'
    },
    {
        id: 'v035',
        make: 'Land Rover',
        model: 'Discovery Sport',
        year: 2018,
        price: 6_500_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'Grey',
        availableColors: ['Grey', 'Black', 'White'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/land_rover_discovery_sport/land_rover_discovery_sport1.webp',
            'images/land_rover_discovery_sport/land_rover_discovery_sport2.webp'
        ],
        interiorImages: [
            'images/land_rover_discovery_sport/interior/land_rover_discovery_sport_interior1.webp',
            'images/land_rover_discovery_sport/interior/land_rover_discovery_sport_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2000cc'
    },
    {
        id: 'v036',
        make: 'Honda',
        model: 'CR-V',
        year: 2021,
        price: 5_000_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 200_000,
        deliveryDays: 30,
        vatInclusive: false,
        color: 'White',
        availableColors: ['White', 'Black', 'Silver', 'Red'],
        inStock: 3,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/honda_cr_v/honda_cr_v1.webp',
            'images/honda_cr_v/honda_cr_v2.webp',
            'images/honda_cr_v/honda_cr_v3.webp'
        ],
        interiorImages: [
            'images/honda_cr_v/interior/honda_cr_v_interior1.webp',
            'images/honda_cr_v/interior/honda_cr_v_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2000cc'
    },
    {
        id: 'v037',
        make: 'Nissan',
        model: 'X-Trail',
        year: 2017,
        price: 3_500_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 150_000,
        deliveryDays: 35,
        vatInclusive: false,
        color: 'Blue',
        availableColors: ['Blue', 'Grey', 'Black'],
        inStock: 2,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer'],
        images: [
            'images/nissan_x_trail/nissan_x_trail1.webp',
            'images/nissan_x_trail/nissan_x_trail2.webp',
            'images/nissan_x_trail/nissan_x_trail3.webp'
        ],
        interiorImages: [
            'images/nissan_x_trail/interior/nissan_x_trail_interior1.webp',
            'images/nissan_x_trail/interior/nissan_x_trail_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2500cc'
    },
    // --- NEW 13 VEHICLES WITH EXPANDED SCHEMA BELOW ---
    {
        id: 'v038',
        make: 'Toyota',
        model: 'Land Cruiser Prado',
        year: 2022,
        price: 11_500_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 400_000,
        deliveryDays: 45,
        vatInclusive: true,
        color: 'White',
        availableColors: ['White', 'Black', 'Silver', 'Bronze'],
        inStock: 3,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/toyota_land_cruiser_prado/toyota_land_cruiser_prado1.webp',
            'images/toyota_land_cruiser_prado/toyota_land_cruiser_prado2.webp',
            'images/toyota_land_cruiser_prado/toyota_land_cruiser_prado3.webp',
            'images/toyota_land_cruiser_prado/toyota_land_cruiser_prado4.webp',
            'images/toyota_land_cruiser_prado/toyota_land_cruiser_prado5.webp'
        ],
        interiorImages: [
            'images/toyota_land_cruiser_prado/interior/toyota_land_cruiser_prado_interior1.webp',
            'images/toyota_land_cruiser_prado/interior/toyota_land_cruiser_prado_interior2.webp',
            'images/toyota_land_cruiser_prado/interior/toyota_land_cruiser_prado_interior3.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2800cc'
    },
    {
        id: 'v039',
        make: 'Mercedes-Benz',
        model: 'C-Class C200',
        year: 2019,
        price: 5_800_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'Black',
        availableColors: ['Black', 'Silver', 'White', 'Blue'],
        inStock: 2,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/mercedes_c200/mercedes_c2001.webp',
            'images/mercedes_c200/mercedes_c2002.webp',
            'images/mercedes_c200/mercedes_c2003.webp',
            'images/mercedes_c200/mercedes_c2004.webp'
        ],
        interiorImages: [
            'images/mercedes_c200/interior/mercedes_c200_interior1.webp',
            'images/mercedes_c200/interior/mercedes_c200_interior2.webp',
            'images/mercedes_c200/interior/mercedes_c200_interior3.webp'
        ],
        bodyType: 'Sedan',
        transmission: 'Automatic',
        engineSize: '2000cc'
    },
    {
        id: 'v040',
        make: 'BMW',
        model: 'X5',
        year: 2020,
        price: 10_500_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 450_000,
        deliveryDays: 50,
        vatInclusive: false,
        color: 'Grey',
        availableColors: ['Grey', 'Black', 'White'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/bmw_x5/bmw_x51.webp',
            'images/bmw_x5/bmw_x52.webp',
            'images/bmw_x5/bmw_x53.webp',
            'images/bmw_x5/bmw_x54.webp'
        ],
        interiorImages: [
            'images/bmw_x5/interior/bmw_x5_interior1.webp',
            'images/bmw_x5/interior/bmw_x5_interior2.webp',
            'images/bmw_x5/interior/bmw_x5_interior3.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '3000cc'
    },
    {
        id: 'v041',
        make: 'Nissan',
        model: 'Juke',
        year: 2017,
        price: 2_600_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: false,
        color: 'Red',
        availableColors: ['Red', 'Yellow', 'Blue', 'White'],
        inStock: 3,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer', 'Credit Card'],
        images: [
            'images/nissan_juke/nissan_juke1.webp',
            'images/nissan_juke/nissan_juke2.webp',
            'images/nissan_juke/nissan_juke3.webp'
        ],
        interiorImages: [
            'images/nissan_juke/interior/nissan_juke_interior1.webp',
            'images/nissan_juke/interior/nissan_juke_interior2.webp'
        ],
        bodyType: 'Crossover',
        transmission: 'Automatic',
        engineSize: '1500cc'
    },
    {
        id: 'v042',
        make: 'Volkswagen',
        model: 'Golf GTI',
        year: 2018,
        price: 4_500_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 200_000,
        deliveryDays: 40,
        vatInclusive: false,
        color: 'Grey',
        availableColors: ['Grey', 'Red', 'White', 'Black'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/volkswagen_golf_gti/volkswagen_golf_gti1.webp',
            'images/volkswagen_golf_gti/volkswagen_golf_gti2.webp',
            'images/volkswagen_golf_gti/volkswagen_golf_gti3.webp'
        ],
        interiorImages: [
            'images/volkswagen_golf_gti/interior/volkswagen_golf_gti_interior1.webp',
            'images/volkswagen_golf_gti/interior/volkswagen_golf_gti_interior2.webp'
        ],
        bodyType: 'Hatchback',
        transmission: 'Automatic',
        engineSize: '2000cc'
    },
    {
        id: 'v043',
        make: 'Lexus',
        model: 'RX 450h',
        year: 2021,
        price: 8_900_000, // KSh
        condition: 'Used',
        availability: 'Imported',
        shippingFee: 350_000,
        deliveryDays: 50,
        vatInclusive: true,
        color: 'Black',
        availableColors: ['Black', 'Silver', 'White'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/lexus_rx_450h/lexus_rx_450h1.webp',
            'images/lexus_rx_450h/lexus_rx_450h2.webp',
            'images/lexus_rx_450h/lexus_rx_450h3.webp'
        ],
        interiorImages: [
            'images/lexus_rx_450h/interior/lexus_rx_450h_interior1.webp',
            'images/lexus_rx_450h/interior/lexus_rx_450h_interior2.webp',
            'images/lexus_rx_450h/interior/lexus_rx_450h_interior3.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '3500cc (Hybrid)'
    },
    {
        id: 'v044',
        make: 'Honda',
        model: 'CR-V Hybrid',
        year: 2023,
        price: 6_200_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 280_000,
        deliveryDays: 60,
        vatInclusive: false,
        color: 'White',
        availableColors: ['White', 'Black', 'Blue', 'Green'],
        inStock: 2,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/honda_cr_v_hybrid/honda_cr_v_hybrid1.webp',
            'images/honda_cr_v_hybrid/honda_cr_v_hybrid2.webp',
            'images/honda_cr_v_hybrid/honda_cr_v_hybrid3.webp'
        ],
        interiorImages: [
            'images/honda_cr_v_hybrid/interior/honda_cr_v_hybrid_interior1.webp',
            'images/honda_cr_v_hybrid/interior/honda_cr_v_hybrid_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '2000cc (Hybrid)'
    },
    {
        id: 'v045',
        make: 'Jeep',
        model: 'Wrangler Rubicon',
        year: 2022,
        price: 15_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 500_000,
        deliveryDays: 70,
        vatInclusive: true,
        color: 'Green',
        availableColors: ['Green', 'Black', 'Red', 'Grey'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/jeep_wrangler_rubicon/jeep_wrangler_rubicon1.webp',
            'images/jeep_wrangler_rubicon/jeep_wrangler_rubicon2.webp',
            'images/jeep_wrangler_rubicon/jeep_wrangler_rubicon3.webp',
            'images/jeep_wrangler_rubicon/jeep_wrangler_rubicon4.webp'
        ],
        interiorImages: [
            'images/jeep_wrangler_rubicon/interior/jeep_wrangler_rubicon_interior1.webp',
            'images/jeep_wrangler_rubicon/interior/jeep_wrangler_rubicon_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '3600cc'
    },
    {
        id: 'v046',
        make: 'Land Rover',
        model: 'Range Rover Sport SVR',
        year: 2021,
        price: 25_000_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 600_000,
        deliveryDays: 55,
        vatInclusive: true,
        color: 'Black',
        availableColors: ['Black', 'White', 'Blue', 'Grey'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/land_rover_range_rover_sport_svr/land_rover_range_rover_sport_svr1.webp',
            'images/land_rover_range_rover_sport_svr/land_rover_range_rover_sport_svr2.webp',
            'images/land_rover_range_rover_sport_svr/land_rover_range_rover_sport_svr3.webp'
        ],
        interiorImages: [
            'images/land_rover_range_rover_sport_svr/interior/land_rover_range_rover_sport_svr_interior1.webp',
            'images/land_rover_range_rover_sport_svr/interior/land_rover_range_rover_sport_svr_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '5000cc'
    },
    {
        id: 'v047',
        make: 'Mercedes-AMG',
        model: 'GT 63 S',
        year: 2022,
        price: 35_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 800_000,
        deliveryDays: 65,
        vatInclusive: true,
        color: 'Silver',
        availableColors: ['Silver', 'Black', 'Red', 'White'],
        inStock: 0,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/mercedes_amg_gt_63_s/mercedes_amg_gt_63_s1.webp',
            'images/mercedes_amg_gt_63_s/mercedes_amg_gt_63_s2.webp',
            'images/mercedes_amg_gt_63_s/mercedes_amg_gt_63_s3.webp'
        ],
        interiorImages: [
            'images/mercedes_amg_gt_63_s/interior/mercedes_amg_gt_63_s_interior1.webp',
            'images/mercedes_amg_gt_63_s/interior/mercedes_amg_gt_63_s_interior2.webp'
        ],
        bodyType: 'Coupe', // 4-door coupe
        transmission: 'Automatic',
        engineSize: '4000cc'
    },
    {
        id: 'v048',
        make: 'Toyota',
        model: 'Hilux Double Cab',
        year: 2020,
        price: 4_500_000, // KSh
        condition: 'Used',
        availability: 'Locally Available',
        shippingFee: null,
        deliveryDays: null,
        vatInclusive: true,
        color: 'White',
        availableColors: ['White', 'Silver', 'Black', 'Blue'],
        inStock: 5,
        acceptedPaymentModes: ['M-Pesa', 'Bank Transfer'],
        images: [
            'images/toyota_hilux_double_cab/toyota_hilux_double_cab1.webp',
            'images/toyota_hilux_double_cab/toyota_hilux_double_cab2.webp',
            'images/toyota_hilux_double_cab/toyota_hilux_double_cab3.webp'
        ],
        interiorImages: [
            'images/toyota_hilux_double_cab/interior/toyota_hilux_double_cab_interior1.webp',
            'images/toyota_hilux_double_cab/interior/toyota_hilux_double_cab_interior2.webp'
        ],
        bodyType: 'Pickup',
        transmission: 'Manual',
        engineSize: '2800cc'
    },
    {
        id: 'v049',
        make: 'Porsche',
        model: 'Taycan Turbo S',
        year: 2023,
        price: 22_000_000, // KSh
        condition: 'New',
        availability: 'Imported',
        shippingFee: 650_000,
        deliveryDays: 70,
        vatInclusive: true,
        color: 'Black',
        availableColors: ['Black', 'White', 'Blue', 'Grey'],
        inStock: 0,
        acceptedPaymentModes: ['Bank Transfer'],
        images: [
            'images/porsche_taycan_turbo_s/porsche_taycan_turbo_s1.webp',
            'images/porsche_taycan_turbo_s/porsche_taycan_turbo_s2.webp',
            'images/porsche_taycan_turbo_s/porsche_taycan_turbo_s3.webp'
        ],
        interiorImages: [
            'images/porsche_taycan_turbo_s/interior/porsche_taycan_turbo_s_interior1.webp',
            'images/porsche_taycan_turbo_s/interior/porsche_taycan_turbo_s_interior2.webp',
            'images/porsche_taycan_turbo_s/interior/porsche_taycan_turbo_s_interior3.webp'
        ],
        bodyType: 'Sedan',
        transmission: 'Automatic',
        engineSize: 'EV'
    },
    {
        id: 'v050',
        make: 'Nissan',
        model: 'Patrol Y62',
        year: 2019,
        price: 9_800_000, // KSh
        condition: 'Used',
        availability: 'Foreign Used',
        shippingFee: 380_000,
        deliveryDays: 40,
        vatInclusive: false,
        color: 'Pearl White',
        availableColors: ['Pearl White', 'Black', 'Silver', 'Bronze'],
        inStock: 1,
        acceptedPaymentModes: ['Bank Transfer', 'Credit Card'],
        images: [
            'images/nissan_patrol_y62/nissan_patrol_y621.webp',
            'images/nissan_patrol_y62/nissan_patrol_y622.webp',
            'images/nissan_patrol_y62/nissan_patrol_y623.webp'
        ],
        interiorImages: [
            'images/nissan_patrol_y62/interior/nissan_patrol_y62_interior1.webp',
            'images/nissan_patrol_y62/interior/nissan_patrol_y62_interior2.webp'
        ],
        bodyType: 'SUV',
        transmission: 'Automatic',
        engineSize: '5600cc'
    }
];