// scripts/brands.js

// This file defines the data for the top brands displayed in iMall.
// The PLACEHOLDER_IMAGE_PATH is assumed to be defined in common-imall.js
// and used by the rendering functions that consume this data.

const TOP_BRANDS = [
    {
        id: 'brd-samsung',
        name: 'Samsung',
        logo: 'images/brandlogos/samsunglogo.webp', // Assuming .webp for optimized images
        description: 'Global leader in electronics, known for innovative smartphones, TVs, and appliances.'
    },
    {
        id: 'brd-apple',
        name: 'Apple',
        logo: 'images/brandlogos/applelogo.webp',
        description: 'Pioneering technology company famous for iPhones, MacBooks, and intuitive software.'
    },
    {
        id: 'brd-sony',
        name: 'Sony',
        logo: 'images/brandlogos/sonylogo.webp',
        description: 'Japanese multinational conglomerate known for electronics, gaming, and entertainment.'
    },
    {
        id: 'brd-hp',
        name: 'HP',
        logo: 'images/brandlogos/hplogo.webp',
        description: 'Leading provider of personal computers, printers, and related solutions worldwide.'
    },
    {
        id: 'brd-dell',
        name: 'Dell',
        logo: 'images/brandlogos/delllogo.webp',
        description: 'American multinational computer technology company that develops, sells, repairs, and supports computers and related products and services.'
    },
    {
        id: 'brd-lg',
        name: 'LG',
        logo: 'images/brandlogos/lglogo.webp',
        description: 'South Korean multinational electronics company known for home appliances, electronics, and mobile communications.'
    },
    {
        id: 'brd-philips',
        name: 'Philips',
        logo: 'images/brandlogos/philipslogo.webp',
        description: 'Dutch multinational conglomerate corporation, known for electronics, healthcare, and lighting products.'
    },
    {
        id: 'brd-nike',
        name: 'Nike',
        logo: 'images/brandlogos/nikelogo.webp',
        description: 'American multinational corporation that is engaged in the design, development, manufacturing, and worldwide marketing and sales of footwear, apparel, equipment, accessories, and services.'
    },
    {
        id: 'brd-adidas',
        name: 'Adidas',
        logo: 'images/brandlogos/adidaslogo.webp',
        description: 'German multinational corporation, designing and manufacturing athletic and casual footwear, apparel, and accessories.'
    },
    {
        id: 'brd-puma',
        name: 'Puma',
        logo: 'images/brandlogos/pumalogo.webp',
        description: 'German multinational corporation that designs and manufactures athletic and casual footwear, apparel and accessories.'
    },
    {
        id: 'brd-dyson',
        name: 'Dyson',
        logo: 'images/brandlogos/dysonlogo.webp',
        description: 'British technology company known for innovative vacuum cleaners, air purifiers, and hair care products.'
    },
    {
        id: 'brd-bosch',
        name: 'Bosch',
        logo: 'images/brandlogos/boschlogo.webp',
        description: 'German multinational engineering and technology company, also a major manufacturer of home appliances.'
    },
    {
        id: 'brd-logitech',
        name: 'Logitech',
        logo: 'images/brandlogos/logitechlogo.webp',
        description: 'Swiss-American manufacturer of computer peripherals and software, specializing in input and interface devices.'
    },
    {
        id: 'brd-canon',
        name: 'Canon',
        logo: 'images/brandlogos/canonlogo.webp',
        description: 'Japanese multinational corporation specializing in optical, imaging, and industrial products, such as cameras, printers, and medical equipment.'
    },
    {
        id: 'brd-xiaomi',
        name: 'Xiaomi',
        logo: 'images/brandlogos/xiaomilogo.webp',
        description: 'Chinese multinational electronics company known for smartphones, smart hardware, and IoT platform products.'
    },
    {
        id: 'brd-hm',
        name: 'H&M',
        logo: 'images/brandlogos/hmlogo.webp',
        description: 'Swedish multinational retail-clothing company, known for its fast-fashion clothing for men, women, teenagers, and children.'
    },
    {
        id: 'brd-durex',
        name: 'Durex',
        logo: 'images/brandlogos/durexlogo.webp',
        description: 'British brand of condoms and personal lubricants owned by Reckitt Benckiser.'
    },
    {
        id: 'brd-barbie',
        name: 'Barbie',
        logo: 'images/brandlogos/barbielogo.webp',
        description: 'Fashion doll manufactured by American toy company Mattel, Inc.'
    },
    {
        id: 'brd-microsoft',
        name: 'Microsoft',
        logo: 'images/brandlogos/microsoftlogo.webp',
        description: 'American multinational technology corporation producing computer software, consumer electronics, personal computers, and related services.'
    },
    {
        id: 'brd-huawei',
        name: 'Huawei',
        logo: 'images/brandlogos/huaweilogo.webp',
        description: 'Chinese multinational technology company providing telecommunications equipment and selling consumer electronics, smartphones, and smart devices.'
    },
    {
        id: 'brd-zara',
        name: 'Zara',
        logo: 'images/brandlogos/zaralogo.webp',
        description: 'Spanish apparel retailer based in Arteixo, Galicia, Spain. The main brand of the Inditex group, the world\'s largest apparel retailer.'
    },
    {
        id: 'brd-royal-canin',
        name: 'Royal Canin',
        logo: 'images/brandlogos/royalcaninlogo.webp',
        description: 'French manufacturer of cat and dog food. A subsidiary of Mars, Incorporated.'
    },
    {
        id: 'brd-oral-b',
        name: 'Oral-B',
        logo: 'images/brandlogos/oralblogo.webp',
        description: 'American brand of oral hygiene products, including toothbrushes, toothpastes, mouthwashes, and dental floss.'
    },
    {
        id: 'brd-brother',
        name: 'Brother',
        logo: 'images/brandlogos/brotherlogo.webp',
        description: 'Japanese multinational electronics and electrical equipment company that produces a wide range of products including printers, multifunction printers, desktop computers, and other computer-related electronics.'
    },
    {
        id: 'brd-seiko',
        name: 'Seiko',
        logo: 'images/brandlogos/seikologo.webp',
        description: 'Japanese manufacturer of watches, clocks, electronic devices, semiconductors, and optical products.'
    },
    {
        id: 'brd-nintendo',
        name: 'Nintendo',
        logo: 'images/brandlogos/nintendologo.webp',
        description: 'Japanese multinational consumer electronics and video game company. One of the world\'s largest video game companies by market capitalization.'
    },
    {
        id: 'brd-fisher-price',
        name: 'Fisher-Price',
        logo: 'images/brandlogos/fisherpricelogo.webp',
        description: 'American company that manufactures toys for infants, toddlers, and preschool-aged children, headquartered in East Aurora, New York.'
    },
    {
        id: 'brd-3m',
        name: '3M',
        logo: 'images/brandlogos/3mlogo.webp',
        description: 'American multinational conglomerate corporation operating in the fields of industry, worker safety, health care, and consumer goods.'
    },
    {
        id: 'brd-medela',
        name: 'Medela',
        logo: 'images/brandlogos/medelalogo.webp',
        description: 'Swiss medical technology company specializing in breastfeeding products and medical vacuum technology.'
    },
    {
        id: 'brd-nivea',
        name: 'Nivea',
        logo: 'images/brandlogos/nivealogo.webp',
        description: 'German personal care brand that specializes in skin and body-care products.'
    },
    {
        id: 'brd-tefal',
        name: 'Tefal',
        logo: 'images/brandlogos/tefallogo.webp',
        description: 'French cookware and small appliance manufacturer, owned by Groupe SEB (a global manufacturer of small appliances).'
    },
    {
        id: 'brd-gopro',
        name: 'GoPro',
        logo: 'images/brandlogos/goprolog.webp',
        description: 'American technology company that manufactures action cameras and develops its own mobile apps and video-editing software.'
    },
    {
        id: 'brd-garmin',
        name: 'Garmin',
        logo: 'images/brandlogos/garminlogo.webp',
        description: 'American multinational technology company that develops, manufactures, and markets GPS technology for automotive, aviation, marine, outdoor, and sport activities.'
    },
    {
        id: 'brd-mattel',
        name: 'Mattel',
        logo: 'images/brandlogos/mattellogo.webp',
        description: 'American multinational toy manufacturing and entertainment company. The world\'s second-largest toy maker in terms of revenue.'
    },
    {
        id: 'brd-lego',
        name: 'Lego',
        logo: 'images/brandlogos/legologo.webp',
        description: 'Danish toy production company best known for manufacturing Lego-brand toys, consisting mostly of interlocking plastic bricks.'
    },
    {
        id: 'brd-loreal',
        name: 'L\'Oreal',
        logo: 'images/brandlogos/loreallogo.webp',
        description: 'French personal care company, the largest cosmetics company in the world.'
    },
    {
        id: 'brd-garnier',
        name: 'Garnier',
        logo: 'images/brandlogos/garnierlogo.webp',
        description: 'French cosmetics brand of L\'Oréal. It produces hair care and skin care products.'
    },
    {
        id: 'brd-stanley',
        name: 'Stanley',
        logo: 'images/brandlogos/stanleylogo.webp',
        description: 'American manufacturer of tools and household hardware, a brand of Stanley Black & Decker.'
    },
    {
        id: 'brd-purina',
        name: 'Purina',
        logo: 'images/brandlogos/purinalogo.webp',
        description: 'American company that produces pet food, animal feed, and pet care products. A subsidiary of Nestlé.'
    }
];
