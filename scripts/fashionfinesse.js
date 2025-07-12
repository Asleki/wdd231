// scripts/fashionfinesse.js

// --- Global Data Definitions for Fashion Finesse ---

// Product Categories and Subcategories
const ff_categories = [
    { name: 'Clothes', id: 'clothes' },
    { name: 'Shoes', id: 'shoes' },
    { name: 'Belts', id: 'belts' },
    { name: 'Bags', id: 'bags' }
];

const ff_subcategories_map = {
    'clothes': [
        { name: 'Shirts', id: 'shirts' },
        { name: 'Pants', id: 'pants' },
        { name: 'Cargo Pants', id: 'cargo-pants' },
        { name: 'Athletic Wear', id: 'athletic-wear' },
        { name: 'Dresses', id: 'dresses' },
        { name: 'Jackets & Coats', id: 'jackets-coats' },
        { name: 'Skirts', id: 'skirts' }
    ],
    'shoes': [
        { name: 'Sneakers', id: 'sneakers' },
        { name: 'Sandals', id: 'sandals' },
        { name: 'Boots',
 id: 'boots' },
        { name: 'Heels', id: 'heels' },
        { name: 'Flats', id: 'flats' }
    ],
    'belts': [
        { name: 'Leather Belts', id: 'leather-belts' },
        { name: 'Fabric Belts', id: 'fabric-belts' },
        { name: 'Designer Belts', id: 'designer-belts' }
    ],
    'bags': [
        { name: 'Handbags', id: 'handbags' },
        { name: 'Backpacks', id: 'backpacks' },
        { name: 'Suitcases', id: 'suitcases' },
        { name: 'Briefcases', id: 'briefcases' },
        { name: 'Wallets', id: 'wallets' }
    ]
};

// Brands
const ff_brands = [
    'Gucci', 'Amiri', 'Balenciaga', 'Adidas', 'Nike', 'Prada', 'Versace', 'Zara',
    'H&M', 'Levi\'s', 'Tommy Hilfiger', 'Calvin Klein', 'Puma', 'Fila', 'Reebok',
    'Under Armour', 'Chanel', 'Louis Vuitton', 'Dior', 'Burberry'
];

// Branches (for checkout pickup option)
const ff_branches = [
    { name: 'Nairobi CBD Branch', location: 'Tom Mboya Street, Nairobi CBD', contact: '+254 707 176 595' },
    { name: 'Westlands Branch', location: 'Sarit Centre, Westlands, Nairobi', contact: '+254 707 176 595' },
    { name: 'Karen Branch', location: 'Karen Crossroads, Karen, Nairobi', contact: '+254 707 176 595' },
    { name: 'Upper Hill Branch', location: 'Britam Tower, Upper Hill, Nairobi', contact: '+254 707 176 595' },
    { name: 'Thika Road Mall (TRM) Branch', location: 'Thika Road, Roysambu, Nairobi', contact: '+254 707 176 595' }
];

// Shipping Fees
const ff_shipping_fees = {
    'rider': 300, // Fixed fee for rider
    'G4S': 500,
    'DHL': 700,
    'WELLS FARGO': 450,
    'pickup': 0 // No fee for pickup
};

// Helper function to generate placeholder image URLs
function ff_generatePlaceholderImage(width, height, text, bgColor = 'cccccc', textColor = '333333') {
    return `https://placehold.co/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
}

// --- Comprehensive Static Products Data ---
const ff_products = [
    // --- Clothes -> Shirts ---
    {
        id: 'clothes-shirts-1', name: 'Men\'s Formal Dress Shirt', description: 'Crisp, comfortable, and stylish for formal occasions.', fullDescription: 'Elevate your formal wardrobe with our Men\'s Formal Dress Shirt. Crafted from premium cotton, it offers a crisp, comfortable fit and a sophisticated look perfect for business meetings or special events. Available in classic colors.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Shirts', subcategoryId: 'shirts', brand: 'Levi\'s', price: 3500, colors: ['White', 'Blue', 'Black'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Formal Shirt', '90e090', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'FS-1', 'a0e0a0', '333333'), ff_generatePlaceholderImage(100, 75, 'FS-2', 'b0e0b0', '333333'), ff_generatePlaceholderImage(100, 75, 'FS-3', 'c0e0c0', '333333')],
        rating: 4.7, sold: 250, inStock: true
    },
    {
        id: 'clothes-shirts-2', name: 'Women\'s Silk Blouse', description: 'Luxurious silk blouse for an elegant and soft feel.', fullDescription: 'Indulge in the luxurious comfort of our Women\'s Silk Blouse. Made from 100% pure silk, this blouse drapes beautifully, offering a soft touch and an elegant silhouette. Ideal for both office wear and evening outings.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Shirts', subcategoryId: 'shirts', brand: 'Zara', price: 4800, colors: ['Cream', 'Navy', 'Burgundy'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Silk Blouse', 'e0b0e0', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SB-1', 'f0c0f0', '333333'), ff_generatePlaceholderImage(100, 75, 'SB-2', 'a0a0a0', '333333'), ff_generatePlaceholderImage(100, 75, 'SB-3', 'b0b0b0', '333333')],
        rating: 4.9, sold: 180, inStock: true
    },
    {
        id: 'clothes-shirts-3', name: 'Unisex Graphic Tee', description: 'Cool graphic tee for casual everyday style.', fullDescription: 'Express yourself with our Unisex Graphic Tee. Featuring unique designs and made from soft, breathable cotton, it’s perfect for casual wear, concerts, or just lounging. A versatile addition to any wardrobe.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Shirts', subcategoryId: 'shirts', brand: 'H&M', price: 1800, colors: ['Black', 'White', 'Grey'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Graphic Tee', '87ceeb', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'GT-1', '97deeb', '333333'), ff_generatePlaceholderImage(100, 75, 'GT-2', 'a7eefb', '333333'), ff_generatePlaceholderImage(100, 75, 'GT-3', 'b7effb', '333333')],
        rating: 4.2, sold: 320, inStock: true
    },
    {
        id: 'clothes-shirts-4', name: 'Plaid Flannel Shirt', description: 'Warm and cozy flannel shirt for a rustic look.', fullDescription: 'Embrace comfort and style with our Plaid Flannel Shirt. Made from soft, brushed flannel, it provides warmth and a classic rustic appeal. Ideal for layering during cooler weather or as a stand-alone casual top.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Shirts', subcategoryId: 'shirts', brand: 'Tommy Hilfiger', price: 2900, colors: ['Red Plaid', 'Blue Plaid', 'Green Plaid'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Flannel Shirt', 'f08080', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'PF-1', 'f09090', '333333'), ff_generatePlaceholderImage(100, 75, 'PF-2', 'f0a0a0', '333333'), ff_generatePlaceholderImage(100, 75, 'PF-3', 'f0b0b0', '333333')],
        rating: 4.5, sold: 150, inStock: true
    },
    {
        id: 'clothes-shirts-5', name: 'Embroidered Cotton Shirt', description: 'Stylish cotton shirt with intricate embroidery details.', fullDescription: 'Add a touch of artistry to your ensemble with our Embroidered Cotton Shirt. Crafted from breathable cotton, it features delicate embroidery that adds unique character and sophistication. Perfect for a refined casual look.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Shirts', subcategoryId: 'shirts', brand: 'Zara', price: 3200, colors: ['White', 'Olive', 'Terracotta'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Embroidered Shirt', 'deb887', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'EC-1', 'eeb887', '333333'), ff_generatePlaceholderImage(100, 75, 'EC-2', 'fec897', '333333'), ff_generatePlaceholderImage(100, 75, 'EC-3', 'ffc8a7', '333333')],
        rating: 4.6, sold: 100, inStock: true
    },

    // --- Clothes -> Pants ---
    {
        id: 'clothes-pants-1', name: 'Men\'s Slim Fit Chinos', description: 'Versatile slim fit chinos for smart casual wear.', fullDescription: 'Our Men\'s Slim Fit Chinos offer a modern silhouette with supreme comfort. Made from a durable cotton blend, they are perfect for both office and weekend wear, providing a polished yet relaxed look.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Pants', subcategoryId: 'pants', brand: 'H&M', price: 3800, colors: ['Khaki', 'Navy', 'Grey'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Slim Chinos', 'a2b2c2', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SC-1', 'b2c2d2', '333333'), ff_generatePlaceholderImage(100, 75, 'SC-2', 'c2d2e2', '333333'), ff_generatePlaceholderImage(100, 75, 'SC-3', 'd2e2f2', '333333')],
        rating: 4.5, sold: 280, inStock: true
    },
    {
        id: 'clothes-pants-2', name: 'Women\'s High-Waist Trousers', description: 'Elegant high-waist trousers for a sophisticated look.', fullDescription: 'Achieve a sophisticated and flattering look with our Women\'s High-Waist Trousers. Designed for comfort and style, they feature a tailored fit that elongates the legs and pairs perfectly with blouses or blazers. Available in classic colors.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Pants', subcategoryId: 'pants', brand: 'Zara', price: 4200, colors: ['Black', 'Beige', 'Olive'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'High-Waist Trousers', 'c2a2b2', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'HW-1', 'd2b2c2', '333333'), ff_generatePlaceholderImage(100, 75, 'HW-2', 'e2c2d2', '333333'), ff_generatePlaceholderImage(100, 75, 'HW-3', 'f2d2e2', '333333')],
        rating: 4.8, sold: 190, inStock: true
    },
    {
        id: 'clothes-pants-3', name: 'Unisex Jogger Pants', description: 'Comfortable and stylish joggers for active lifestyles.', fullDescription: 'Our Unisex Jogger Pants combine comfort with contemporary style. Made from soft, breathable fabric, they are ideal for workouts, casual outings, or simply relaxing at home. Features an elastic waistband and cuffs for a perfect fit.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Pants', subcategoryId: 'pants', brand: 'Adidas', price: 2500, colors: ['Black', 'Grey', 'Navy'], minOrder: 1, maxOrder: 4, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Jogger Pants', 'a0c0a0', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'JP-1', 'b0d0b0', '333333'), ff_generatePlaceholderImage(100, 75, 'JP-2', 'c0e0c0', '333333'), ff_generatePlaceholderImage(100, 75, 'JP-3', 'd0f0d0', '333333')],
        rating: 4.3, sold: 350, inStock: true
    },
    {
        id: 'clothes-pants-4', name: 'Distressed Denim Jeans', description: 'Trendy distressed jeans for a rugged, stylish look.', fullDescription: 'Achieve an edgy, modern look with our Distressed Denim Jeans. Crafted from high-quality denim with strategically placed distressing, these jeans offer both comfort and a fashion-forward statement. Perfect for casual wear.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Pants', subcategoryId: 'pants', brand: 'Levi\'s', price: 4500, colors: ['Light Wash', 'Dark Wash'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Distressed Jeans', '6a5acd', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'DJ-1', '7a6bcd', '333333'), ff_generatePlaceholderImage(100, 75, 'DJ-2', '8a7bcd', '333333'), ff_generatePlaceholderImage(100, 75, 'DJ-3', '9a8bcd', '333333')],
        rating: 4.6, sold: 210, inStock: true
    },
    {
        id: 'clothes-pants-5', name: 'Comfort Lounge Pants', description: 'Soft and relaxed lounge pants for ultimate comfort.', fullDescription: 'Unwind in ultimate comfort with our Comfort Lounge Pants. Made from incredibly soft and breathable fabric, these pants are perfect for relaxing at home, casual errands, or even light yoga. Experience true relaxation.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Pants', subcategoryId: 'pants', brand: 'Calvin Klein', price: 2200, colors: ['Black', 'Charcoal', 'Navy'], minOrder: 1, maxOrder: 4, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Lounge Pants', '8b4513', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'LP-1', '9b5513', '333333'), ff_generatePlaceholderImage(100, 75, 'LP-2', 'ab6513', '333333'), ff_generatePlaceholderImage(100, 75, 'LP-3', 'bb7513', '333333')],
        rating: 4.7, sold: 170, inStock: true
    },

    // --- Clothes -> Cargo Pants ---
    {
        id: 'clothes-cargo-1', name: 'Men\'s Tactical Cargo Pants', description: 'Durable and functional tactical cargo pants.', fullDescription: 'Engineered for durability and utility, our Men\'s Tactical Cargo Pants are perfect for outdoor adventures or demanding work. Featuring multiple pockets and reinforced stitching, they offer maximum functionality without compromising on style.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Cargo Pants', subcategoryId: 'cargo-pants', brand: 'Under Armour', price: 5500, colors: ['Khaki', 'Black', 'Olive'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Tactical Cargo', '5f9ea0', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'TC-1', '6f9ea0', '333333'), ff_generatePlaceholderImage(100, 75, 'TC-2', '7f9ea0', '333333'), ff_generatePlaceholderImage(100, 75, 'TC-3', '8f9ea0', '333333')],
        rating: 4.8, sold: 120, inStock: true
    },
    {
        id: 'clothes-cargo-2', name: 'Women\'s Utility Cargo Pants', description: 'Stylish utility cargo pants with a modern fit.', fullDescription: 'Our Women\'s Utility Cargo Pants blend fashion with function. Designed with a flattering fit and practical pockets, they are versatile enough for everyday wear or adding an edgy touch to your outfit. Comfortable and chic.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Cargo Pants', subcategoryId: 'cargo-pants', brand: 'Zara', price: 4200, colors: ['Beige', 'Black', 'Army Green'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Utility Cargo', 'd2b48c', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'UC-1', 'e2c49c', '333333'), ff_generatePlaceholderImage(100, 75, 'UC-2', 'f2d4ac', '333333'), ff_generatePlaceholderImage(100, 75, 'UC-3', 'f2e4bc', '333333')],
        rating: 4.6, sold: 90, inStock: true
    },
    {
        id: 'clothes-cargo-3', name: 'Slim Fit Cargo Joggers', description: 'Comfortable and trendy slim fit cargo joggers.', fullDescription: 'Experience the perfect fusion of comfort and style with our Slim Fit Cargo Joggers. These joggers feature a modern slim fit, cargo pockets for convenience, and a soft fabric, making them ideal for casual wear or light activity.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Cargo Pants', subcategoryId: 'cargo-pants', brand: 'Adidas', price: 3900, colors: ['Black', 'Grey', 'Olive'], minOrder: 1, maxOrder: 4, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Cargo Joggers', '708090', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CJ-1', '8090a0', '333333'), ff_generatePlaceholderImage(100, 75, 'CJ-2', '90a0b0', '333333'), ff_generatePlaceholderImage(100, 75, 'CJ-3', 'a0b0c0', '333333')],
        rating: 4.4, sold: 180, inStock: true
    },
    {
        id: 'clothes-cargo-4', name: 'Camouflage Cargo Shorts', description: 'Rugged camouflage cargo shorts for outdoor adventures.', fullDescription: 'Gear up for adventure with our Camouflage Cargo Shorts. Designed for durability and comfort, these shorts feature a classic camo print and ample pocket space, making them perfect for hiking, camping, or everyday casual wear.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Cargo Pants', subcategoryId: 'cargo-pants', brand: 'Puma', price: 2800, colors: ['Green Camo', 'Grey Camo'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Camo Shorts', '8b0000', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CS-1', '9b1010', '333333'), ff_generatePlaceholderImage(100, 75, 'CS-2', 'ab2020', '333333'), ff_generatePlaceholderImage(100, 75, 'CS-3', 'bb3030', '333333')],
        rating: 4.3, sold: 110, inStock: true
    },
    {
        id: 'clothes-cargo-5', name: 'Heavy-Duty Work Cargo', description: 'Robust cargo pants built for demanding work environments.', fullDescription: 'Our Heavy-Duty Work Cargo pants are constructed to withstand the toughest conditions. Made from rugged, tear-resistant fabric with reinforced knees and multiple utility pockets, they provide unmatched durability and functionality for any job.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Cargo Pants', subcategoryId: 'cargo-pants', brand: 'Under Armour', price: 6200, colors: ['Brown', 'Black', 'Navy'], minOrder: 1, maxOrder: 2, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Work Cargo', '4682b4', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'WC-1', '5692c4', '333333'), ff_generatePlaceholderImage(100, 75, 'WC-2', '66a2d4', '333333'), ff_generatePlaceholderImage(100, 75, 'WC-3', '76b2e4', '333333')],
        rating: 4.7, sold: 75, inStock: true
    },

    // --- Clothes -> Athletic Wear ---
    {
        id: 'clothes-athletic-1', name: 'Moisture-Wicking Athletic Tee', description: 'Keeps you dry and comfortable during workouts.', fullDescription: 'Stay cool and dry with our Moisture-Wicking Athletic Tee. Engineered with advanced fabric technology, it actively pulls sweat away from your skin, ensuring maximum comfort and performance during intense workouts or everyday activities.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Athletic Wear', subcategoryId: 'athletic-wear', brand: 'Nike', price: 2500, colors: ['Black', 'White', 'Neon Green'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Athletic Tee', '20b2aa', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'AT-1', '30c2ba', '333333'), ff_generatePlaceholderImage(100, 75, 'AT-2', '40d2ca', '333333'), ff_generatePlaceholderImage(100, 75, 'AT-3', '50e2da', '333333')],
        rating: 4.8, sold: 400, inStock: true
    },
    {
        id: 'clothes-athletic-2', name: 'Compression Leggings', description: 'Supportive compression leggings for optimal performance.', fullDescription: 'Enhance your performance with our Compression Leggings. Designed to provide targeted support to your muscles, they reduce fatigue and improve circulation, making them ideal for running, yoga, or gym workouts. Flexible and breathable.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Athletic Wear', subcategoryId: 'athletic-wear', brand: 'Adidas', price: 3800, colors: ['Black', 'Navy', 'Grey'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Compression Leggings', '6a5acd', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CL-1', '7a6bcd', '333333'), ff_generatePlaceholderImage(100, 75, 'CL-2', '8a7bcd', '333333'), ff_generatePlaceholderImage(100, 75, 'CL-3', '9a8bcd', '333333')],
        rating: 4.7, sold: 220, inStock: true
    },
    {
        id: 'clothes-athletic-3', name: 'Sports Bra (High Impact)', description: 'Maximum support sports bra for intense activities.', fullDescription: 'Our High Impact Sports Bra offers superior support and comfort for your most demanding workouts. Designed to minimize bounce and provide excellent coverage, it ensures you can focus on your performance with confidence.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Athletic Wear', subcategoryId: 'athletic-wear', brand: 'Puma', price: 2000, colors: ['Black', 'White', 'Pink'], minOrder: 1, maxOrder: 4, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Sports Bra', 'ff6347', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SB-A1', 'ff7357', '333333'), ff_generatePlaceholderImage(100, 75, 'SB-A2', 'ff8367', '333333'), ff_generatePlaceholderImage(100, 75, 'SB-A3', 'ff9377', '333333')],
        rating: 4.6, sold: 190, inStock: true
    },
    {
        id: 'clothes-athletic-4', name: 'Running Shorts with Liner', description: 'Lightweight running shorts with built-in liner for comfort.', fullDescription: 'Experience unrestricted movement with our Running Shorts with Liner. The lightweight, breathable fabric and integrated liner provide ultimate comfort and support, making them perfect for your daily runs or intense training sessions.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Athletic Wear', subcategoryId: 'athletic-wear', brand: 'Reebok', price: 2300, colors: ['Black', 'Blue', 'Grey'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Running Shorts', '3cb371', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'RS-1', '4cb371', '333333'), ff_generatePlaceholderImage(100, 75, 'RS-2', '5cb371', '333333'), ff_generatePlaceholderImage(100, 75, 'RS-3', '6cb371', '333333')],
        rating: 4.5, sold: 280, inStock: true
    },
    {
        id: 'clothes-athletic-5', name: 'Track Suit (Jacket & Pants)', description: 'Coordinated track suit for athletic and casual wear.', fullDescription: 'Our Track Suit offers a stylish and comfortable coordinated look for both athletic activities and casual wear. Made from soft, durable fabric, it provides warmth and flexibility, perfect for warm-ups, cool-downs, or everyday comfort.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Athletic Wear', subcategoryId: 'athletic-wear', brand: 'Fila', price: 6000, colors: ['Black/White', 'Navy/Red'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Track Suit', 'ba55d3', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'TS-1', 'ca65e3', '333333'), ff_generatePlaceholderImage(100, 75, 'TS-2', 'da75f3', '333333'), ff_generatePlaceholderImage(100, 75, 'TS-3', 'ea85f3', '333333')],
        rating: 4.6, sold: 100, inStock: true
    },

    // --- Clothes -> Dresses ---
    {
        id: 'clothes-dresses-1', name: 'Elegant Evening Gown', description: 'Stunning evening gown for special occasions.', fullDescription: 'Make a grand entrance with our Elegant Evening Gown. Crafted from luxurious fabric with exquisite detailing, this gown offers a flattering silhouette and sophisticated charm, perfect for galas, weddings, or any formal event.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Dresses', subcategoryId: 'dresses', brand: 'Chanel', price: 12000, colors: ['Black', 'Emerald Green', 'Royal Blue'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Evening Gown', '4b0082', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'EG-1', '5b1092', '333333'), ff_generatePlaceholderImage(100, 75, 'EG-2', '6b20a2', '333333'), ff_generatePlaceholderImage(100, 75, 'EG-3', '7b30b2', '333333')],
        rating: 4.9, sold: 50, inStock: true
    },
    {
        id: 'clothes-dresses-2', name: 'Casual Summer Sundress', description: 'Light and airy sundress for warm weather.', fullDescription: 'Embrace the sunshine with our Casual Summer Sundress. Made from lightweight, breathable fabric, it offers a relaxed fit and playful design, perfect for beach days, picnics, or simply enjoying a warm afternoon.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Dresses', subcategoryId: 'dresses', brand: 'H&M', price: 2800, colors: ['Floral Print', 'Yellow', 'Sky Blue'], minOrder: 1, maxOrder: 3, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Sundress', 'ffb6c1', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SS-1', 'ffc6d1', '333333'), ff_generatePlaceholderImage(100, 75, 'SS-2', 'ffd6e1', '333333'), ff_generatePlaceholderImage(100, 75, 'SS-3', 'ffe6f1', '333333')],
        rating: 4.5, sold: 300, inStock: true
    },
    {
        id: 'clothes-dresses-3', name: 'Cocktail Midi Dress', description: 'Chic midi dress perfect for cocktail parties.', fullDescription: 'Our Cocktail Midi Dress strikes the perfect balance between sophistication and modern flair. With its flattering midi length and elegant design, it’s an ideal choice for cocktail parties, semi-formal events, or a stylish night out.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Dresses', subcategoryId: 'dresses', brand: 'Zara', price: 5500, colors: ['Red', 'Navy', 'Silver'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Midi Dress', 'db7093', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'MD-1', 'eb80a3', '333333'), ff_generatePlaceholderImage(100, 75, 'MD-2', 'fb90b3', '333333'), ff_generatePlaceholderImage(100, 75, 'MD-3', 'fba0c3', '333333')],
        rating: 4.7, sold: 120, inStock: true
    },
    {
        id: 'clothes-dresses-4', name: 'Bohemian Maxi Dress', description: 'Flowy and free-spirited maxi dress.', fullDescription: 'Channel your inner free spirit with our Bohemian Maxi Dress. Featuring flowing fabrics, intricate prints, and a relaxed fit, it’s perfect for festivals, beach vacations, or simply embracing a laid-back, stylish vibe.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Dresses', subcategoryId: 'dresses', brand: 'H&M', price: 3900, colors: ['Earthy Tones', 'Pastel Floral'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Boho Maxi', 'cd853f', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'BM-1', 'dd954f', '333333'), ff_generatePlaceholderImage(100, 75, 'BM-2', 'eda55f', '333333'), ff_generatePlaceholderImage(100, 75, 'BM-3', 'fbb56f', '333333')],
        rating: 4.6, sold: 150, inStock: true
    },
    {
        id: 'clothes-dresses-5', name: 'Professional A-Line Dress', description: 'Smart A-line dress for professional settings.', fullDescription: 'Our Professional A-Line Dress is a wardrobe essential for the modern working woman. Its classic A-line silhouette offers a flattering and comfortable fit, while the sophisticated design ensures you look polished and confident in any professional setting.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Dresses', subcategoryId: 'dresses', brand: 'Calvin Klein', price: 6800, colors: ['Black', 'Grey', 'Navy'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'A-Line Dress', '778899', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'AL-1', '8798a9', '333333'), ff_generatePlaceholderImage(100, 75, 'AL-2', '97a8b9', '333333'), ff_generatePlaceholderImage(100, 75, 'AL-3', 'a7b8c9', '333333')],
        rating: 4.8, sold: 80, inStock: true
    },

    // --- Clothes -> Jackets & Coats ---
    {
        id: 'clothes-jackets-1', name: 'Leather Biker Jacket', description: 'Edgy and timeless leather biker jacket.', fullDescription: 'Make a statement with our iconic Leather Biker Jacket. Crafted from genuine leather, it features classic biker details, offering a rugged yet stylish appeal that transcends trends. A must-have for any fashion-forward individual.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Jackets & Coats', subcategoryId: 'jackets-coats', brand: 'Amiri', price: 15000, colors: ['Black', 'Brown'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Biker Jacket', '36454F', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'LBJ-1', '46555F', '333333'), ff_generatePlaceholderImage(100, 75, 'LBJ-2', '56656F', '333333'), ff_generatePlaceholderImage(100, 75, 'LBJ-3', '66757F', '333333')],
        rating: 4.9, sold: 60, inStock: true
    },
    {
        id: 'clothes-jackets-2', name: 'Waterproof Raincoat', description: 'Stylish and functional waterproof raincoat.', fullDescription: 'Stay dry and stylish with our Waterproof Raincoat. Designed with a sleek silhouette and fully sealed seams, it offers reliable protection against the elements without compromising on fashion. Perfect for unpredictable weather.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Jackets & Coats', subcategoryId: 'jackets-coats', brand: 'Zara', price: 6500, colors: ['Navy', 'Yellow', 'Clear'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Raincoat', '6495ed', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'WR-1', '74a5fd', '333333'), ff_generatePlaceholderImage(100, 75, 'WR-2', '84b5fd', '333333'), ff_generatePlaceholderImage(100, 75, 'WR-3', '94c5fd', '333333')],
        rating: 4.5, sold: 110, inStock: true
    },
    {
        id: 'clothes-jackets-3', name: 'Classic Denim Jacket', description: 'Timeless denim jacket for casual layering.', fullDescription: 'A true wardrobe staple, our Classic Denim Jacket offers versatile style and enduring appeal. Perfect for layering over tees or dresses, it adds a touch of casual cool to any outfit and only gets better with age.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Jackets & Coats', subcategoryId: 'jackets-coats', brand: 'Levi\'s', price: 4900, colors: ['Blue Denim', 'Black Denim'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Denim Jacket', '4682b4', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CDJ-1', '5692c4', '333333'), ff_generatePlaceholderImage(100, 75, 'CDJ-2', '66a2d4', '333333'), ff_generatePlaceholderImage(100, 75, 'CDJ-3', '76b2e4', '333333')],
        rating: 4.7, sold: 200, inStock: true
    },
    {
        id: 'clothes-jackets-4', name: 'Winter Puffer Coat', description: 'Warm and insulated puffer coat for cold weather.', fullDescription: 'Brave the cold in style with our Winter Puffer Coat. Featuring premium insulation and a durable outer shell, it provides exceptional warmth and protection against harsh winter conditions, ensuring you stay cozy and comfortable.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Jackets & Coats', subcategoryId: 'jackets-coats', brand: 'Under Armour', price: 9500, colors: ['Black', 'Navy', 'Olive'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Puffer Coat', '708090', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'WPC-1', '8090a0', '333333'), ff_generatePlaceholderImage(100, 75, 'WPC-2', '90a0b0', '333333'), ff_generatePlaceholderImage(100, 75, 'WPC-3', 'a0b0c0', '333333')],
        rating: 4.8, sold: 85, inStock: true
    },
    {
        id: 'clothes-jackets-5', name: 'Lightweight Bomber Jacket', description: 'Stylish and versatile lightweight bomber jacket.', fullDescription: 'Our Lightweight Bomber Jacket is the perfect transitional piece. With its classic design and comfortable fit, it adds a touch of cool to any outfit, ideal for layering on cooler evenings or as a stylish statement piece.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Jackets & Coats', subcategoryId: 'jackets-coats', brand: 'Adidas', price: 5200, colors: ['Black', 'Forest Green', 'Burgundy'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Bomber Jacket', '696969', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'LBJ-A1', '797979', '333333'), ff_generatePlaceholderImage(100, 75, 'LBJ-A2', '898989', '333333'), ff_generatePlaceholderImage(100, 75, 'LBJ-A3', '999999', '333333')],
        rating: 4.6, sold: 130, inStock: true
    },

    // --- Clothes -> Skirts ---
    {
        id: 'clothes-skirts-1', name: 'Pleated Midi Skirt', description: 'Elegant pleated midi skirt for a chic look.', fullDescription: 'Our Pleated Midi Skirt offers timeless elegance and graceful movement. With its flattering midi length and delicate pleats, it’s perfect for both formal and casual settings, easily dressed up or down for any occasion.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Skirts', subcategoryId: 'skirts', brand: 'Zara', price: 3800, colors: ['Black', 'Emerald Green', 'Floral Print'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Midi Skirt', 'dda0dd', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'PMS-1', 'eea0ee', '333333'), ff_generatePlaceholderImage(100, 75, 'PMS-2', 'ffa0ff', '333333'), ff_generatePlaceholderImage(100, 75, 'PMS-3', 'ffb0ff', '333333')],
        rating: 4.7, sold: 160, inStock: true
    },
    {
        id: 'clothes-skirts-2', name: 'Denim Mini Skirt', description: 'Classic denim mini skirt for a playful style.', fullDescription: 'A versatile wardrobe staple, our Denim Mini Skirt offers a playful yet stylish look. Made from comfortable denim, it’s perfect for casual outings, easily paired with tees, blouses, or sweaters for a chic everyday ensemble.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Skirts', subcategoryId: 'skirts', brand: 'H&M', price: 2500, colors: ['Blue Denim', 'Black Denim'], minOrder: 1, maxOrder: 4, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Denim Mini', '4682b4', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'DMS-1', '5692c4', '333333'), ff_generatePlaceholderImage(100, 75, 'DMS-2', '66a2d4', '333333'), ff_generatePlaceholderImage(100, 75, 'DMS-3', '76b2e4', '333333')],
        rating: 4.3, sold: 210, inStock: true
    },
    {
        id: 'clothes-skirts-3', name: 'Floral Wrap Skirt', description: 'Flowy floral wrap skirt for a bohemian vibe.', fullDescription: 'Embrace a free-spirited look with our Floral Wrap Skirt. Its lightweight fabric and vibrant floral print create a beautiful flowy silhouette, perfect for summer days, beach trips, or adding a touch of bohemian charm to your outfit.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Skirts', subcategoryId: 'skirts', brand: 'Zara', price: 3200, colors: ['Multi-Floral', 'Blue Floral'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Floral Skirt', 'f0e68c', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'FWS-1', 'f0f69c', '333333'), ff_generatePlaceholderImage(100, 75, 'FWS-2', 'f0g6ac', '333333'), ff_generatePlaceholderImage(100, 75, 'FWS-3', 'f0h6bc', '333333')],
        rating: 4.6, sold: 140, inStock: true
    },
    {
        id: 'clothes-skirts-4', name: 'Pencil Skirt', description: 'Classic pencil skirt for a polished professional look.', fullDescription: 'Our Classic Pencil Skirt is a timeless addition to your professional wardrobe. Its sleek, tailored fit offers a polished silhouette, perfect for office wear, business meetings, or any occasion where a sophisticated look is desired.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Skirts', subcategoryId: 'skirts', brand: 'Calvin Klein', price: 4500, colors: ['Black', 'Grey', 'Navy'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Pencil Skirt', '778899', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'PS-1', '8798a9', '333333'), ff_generatePlaceholderImage(100, 75, 'PS-2', '97a8b9', '333333'), ff_generatePlaceholderImage(100, 75, 'PS-3', 'a7b8c9', '333333')],
        rating: 4.8, sold: 90, inStock: true
    },
    {
        id: 'clothes-skirts-5', name: 'Flowy Maxi Skirt', description: 'Comfortable and stylish flowy maxi skirt.', fullDescription: 'Experience effortless style with our Flowy Maxi Skirt. Made from soft, lightweight fabric, it offers a comfortable fit and a graceful drape, perfect for casual outings, beach days, or adding a relaxed elegance to your look.',
        category: 'Clothes', categoryId: 'clothes', subcategory: 'Skirts', subcategoryId: 'skirts', brand: 'H&M', price: 2900, colors: ['Solid Black', 'Boho Print'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Maxi Skirt', 'f08080', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'FMS-1', 'f09090', '333333'), ff_generatePlaceholderImage(100, 75, 'FMS-2', 'f0a0a0', '333333'), ff_generatePlaceholderImage(100, 75, 'FMS-3', 'f0b0b0', '333333')],
        rating: 4.5, sold: 175, inStock: true
    },

    // --- Shoes -> Sneakers ---
    {
        id: 'shoes-sneakers-1', name: 'Classic White Sneakers', description: 'Timeless white sneakers for everyday comfort.', fullDescription: 'A wardrobe essential, our Classic White Sneakers offer versatile style and supreme comfort. Perfect for everyday wear, they effortlessly pair with any outfit, providing a clean, fresh look that never goes out of style.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sneakers', subcategoryId: 'sneakers', brand: 'Adidas', price: 6500, colors: ['White'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'White Sneakers', 'f0f8ff', '333333'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CWS-1', 'e0e8ff', '333333'), ff_generatePlaceholderImage(100, 75, 'CWS-2', 'd0d8ff', '333333'), ff_generatePlaceholderImage(100, 75, 'CWS-3', 'c0c8ff', '333333')],
        rating: 4.8, sold: 500, inStock: true
    },
    {
        id: 'shoes-sneakers-2', name: 'High-Top Basketball Shoes', description: 'Supportive high-top shoes for basketball.', fullDescription: 'Dominate the court with our High-Top Basketball Shoes. Designed for maximum ankle support and explosive performance, they feature responsive cushioning and a durable outsole, ensuring agility and stability during intense games.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sneakers', subcategoryId: 'sneakers', brand: 'Nike', price: 9800, colors: ['Black/Red', 'Blue/White'], minOrder: 1, maxOrder: 1, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Basketball Shoes', '8b0000', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'HBS-1', '9b1010', '333333'), ff_generatePlaceholderImage(100, 75, 'HBS-2', 'ab2020', '333333'), ff_generatePlaceholderImage(100, 75, 'HBS-3', 'bb3030', '333333')],
        rating: 4.7, sold: 150, inStock: true
    },
    {
        id: 'shoes-sneakers-3', name: 'Trail Running Sneakers', description: 'Rugged sneakers for off-road running.', fullDescription: 'Conquer any terrain with our Trail Running Sneakers. Built with a rugged outsole for superior grip and a protective upper, they offer stability and comfort on challenging trails, ensuring a confident stride on every adventure.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sneakers', subcategoryId: 'sneakers', brand: 'Puma', price: 7200, colors: ['Grey/Orange', 'Olive/Black'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Trail Sneakers', '556b2f', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'TRS-1', '657b3f', '333333'), ff_generatePlaceholderImage(100, 75, 'TRS-2', '758b4f', '333333'), ff_generatePlaceholderImage(100, 75, 'TRS-3', '859b5f', '333333')],
        rating: 4.6, sold: 90, inStock: true
    },
    {
        id: 'shoes-sneakers-4', name: 'Casual Canvas Sneakers', description: 'Lightweight canvas sneakers for everyday wear.', fullDescription: 'Our Casual Canvas Sneakers are the epitome of laid-back style. Lightweight and breathable, they offer all-day comfort and a relaxed aesthetic, making them perfect for everyday errands, casual meet-ups, or weekend adventures.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sneakers', subcategoryId: 'sneakers', brand: 'H&M', price: 3000, colors: ['Black', 'Navy', 'Red'], minOrder: 1, maxOrder: 3, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Canvas Sneakers', 'b0c4de', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CCS-1', 'c0d4ee', '333333'), ff_generatePlaceholderImage(100, 75, 'CCS-2', 'd0e4ff', '333333'), ff_generatePlaceholderImage(100, 75, 'CCS-3', 'e0f4ff', '333333')],
        rating: 4.4, sold: 380, inStock: true
    },
    {
        id: 'shoes-sneakers-5', name: 'Futuristic Designer Sneakers', description: 'Avant-garde sneakers with a bold, futuristic design.', fullDescription: 'Step into the future with our Futuristic Designer Sneakers. Featuring innovative materials and a daring silhouette, these sneakers are a true statement piece, pushing the boundaries of contemporary footwear design.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sneakers', subcategoryId: 'sneakers', brand: 'Balenciaga', price: 14500, colors: ['Silver', 'Neon Yellow', 'Multi-color'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Designer Sneakers', '8a2be2', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'FDS-1', '9a3be2', '333333'), ff_generatePlaceholderImage(100, 75, 'FDS-2', 'aa4be2', '333333'), ff_generatePlaceholderImage(100, 75, 'FDS-3', 'ba5be2', '333333')],
        rating: 4.9, sold: 70, inStock: true
    },

    // --- Shoes -> Sandals ---
    {
        id: 'shoes-sandals-1', name: 'Leather Gladiator Sandals', description: 'Stylish leather gladiator sandals for summer.', fullDescription: 'Embrace summer style with our Leather Gladiator Sandals. Crafted from genuine leather with intricate strap detailing, they offer both comfort and a fashion-forward look, perfect for warm weather adventures.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sandals', subcategoryId: 'sandals', brand: 'Zara', price: 4200, colors: ['Brown', 'Black', 'Tan'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Gladiator Sandals', 'daa520', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'LGS-1', 'eaa530', '333333'), ff_generatePlaceholderImage(100, 75, 'LGS-2', 'fba540', '333333'), ff_generatePlaceholderImage(100, 75, 'LGS-3', 'fca550', '333333')],
        rating: 4.5, sold: 180, inStock: true
    },
    {
        id: 'shoes-sandals-2', name: 'Comfort Slide Sandals', description: 'Easy-to-wear comfort slide sandals.', fullDescription: 'Experience effortless comfort with our Comfort Slide Sandals. Featuring a cushioned footbed and a simple slip-on design, they are perfect for casual wear, post-workout relaxation, or quick trips out. Your go-to for easy comfort.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sandals', subcategoryId: 'sandals', brand: 'Adidas', price: 2000, colors: ['Black', 'Navy', 'White'], minOrder: 1, maxOrder: 4, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Slide Sandals', 'b0c4de', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CSS-1', 'c0d4ee', '333333'), ff_generatePlaceholderImage(100, 75, 'CSS-2', 'd0e4ff', '333333'), ff_generatePlaceholderImage(100, 75, 'CSS-3', 'e0f4ff', '333333')],
        rating: 4.3, sold: 300, inStock: true
    },
    {
        id: 'shoes-sandals-3', name: 'Platform Wedge Sandals', description: 'Stylish platform wedge sandals for elevated comfort.', fullDescription: 'Add height and style with our Platform Wedge Sandals. Designed for comfort and stability, they feature a chic wedge heel and a comfortable platform, making them perfect for summer parties, casual outings, or dressing up your everyday look.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sandals', subcategoryId: 'sandals', brand: 'H&M', price: 3500, colors: ['Espadrille', 'Black', 'Nude'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Wedge Sandals', 'ff69b4', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'PWS-1', 'ff79c4', '333333'), ff_generatePlaceholderImage(100, 75, 'PWS-2', 'ff89d4', '333333'), ff_generatePlaceholderImage(100, 75, 'PWS-3', 'ff99e4', '333333')],
        rating: 4.6, sold: 110, inStock: true
    },
    {
        id: 'shoes-sandals-4', name: 'Beach Flip-Flops', description: 'Essential flip-flops for beach and poolside.', fullDescription: 'Our Beach Flip-Flops are your perfect companion for sunny days by the water. Lightweight, comfortable, and quick-drying, they are ideal for the beach, pool, or simply lounging around. Essential summer footwear.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sandals', subcategoryId: 'sandals', brand: 'Puma', price: 1200, colors: ['Blue', 'Green', 'Black'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Flip-Flops', '00bfff', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'BFF-1', '10cfff', '333333'), ff_generatePlaceholderImage(100, 75, 'BFF-2', '20dfff', '333333'), ff_generatePlaceholderImage(100, 75, 'BFF-3', '30efff', '333333')],
        rating: 4.2, sold: 450, inStock: true
    },
    {
        id: 'shoes-sandals-5', name: 'Strappy Evening Sandals', description: 'Elegant strappy sandals for evening wear.', fullDescription: 'Complete your evening look with our elegant Strappy Evening Sandals. Featuring delicate straps and a refined heel, these sandals add a touch of sophistication and glamour to any formal outfit, ensuring you shine at every event.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Sandals', subcategoryId: 'sandals', brand: 'Prada', price: 8000, colors: ['Gold', 'Silver', 'Black'], minOrder: 1, maxOrder: 1, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Evening Sandals', 'b22222', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SES-1', 'c23232', '333333'), ff_generatePlaceholderImage(100, 75, 'SES-2', 'd24242', '333333'), ff_generatePlaceholderImage(100, 75, 'SES-3', 'e25252', '333333')],
        rating: 4.8, sold: 60, inStock: true
    },

    // --- Shoes -> Boots ---
    {
        id: 'shoes-boots-1', name: 'Ankle Combat Boots', description: 'Rugged and stylish ankle combat boots.', fullDescription: 'Our Ankle Combat Boots offer a blend of rugged durability and urban style. With their sturdy construction and comfortable fit, they are perfect for adding an edgy touch to your casual outfits, suitable for all-day wear.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Boots', subcategoryId: 'boots', brand: 'Zara', price: 7500, colors: ['Black', 'Brown'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Combat Boots', '5a5a5a', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'ACB-1', '6a6a6a', '333333'), ff_generatePlaceholderImage(100, 75, 'ACB-2', '7a7a7a', '333333'), ff_generatePlaceholderImage(100, 75, 'ACB-3', '8a8a8a', '333333')],
        rating: 4.6, sold: 130, inStock: true
    },
    {
        id: 'shoes-boots-2', name: 'Knee-High Leather Boots', description: 'Elegant knee-high leather boots for winter.', fullDescription: 'Elevate your winter style with our elegant Knee-High Leather Boots. Crafted from premium leather, they offer a sophisticated look and comfortable fit, perfect for pairing with skirts, dresses, or skinny jeans for a chic ensemble.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Boots', subcategoryId: 'boots', brand: 'Gucci', price: 13000, colors: ['Black', 'Dark Brown'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Knee-High Boots', '8b0000', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'KHLB-1', '9b1010', '333333'), ff_generatePlaceholderImage(100, 75, 'KHLB-2', 'ab2020', '333333'), ff_generatePlaceholderImage(100, 75, 'KHLB-3', 'bb3030', '333333')],
        rating: 4.9, sold: 40, inStock: true
    },
    {
        id: 'shoes-boots-3', name: 'Chelsea Boots', description: 'Classic Chelsea boots for versatile styling.', fullDescription: 'Our Classic Chelsea Boots are a versatile addition to any wardrobe. With their sleek design and elastic side panels, they offer easy wear and a timeless appeal, perfect for both casual and semi-formal occasions.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Boots', subcategoryId: 'boots', brand: 'H&M', price: 6000, colors: ['Black Suede', 'Brown Leather'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Chelsea Boots', 'a0522d', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CB-1', 'b0623d', '333333'), ff_generatePlaceholderImage(100, 75, 'CB-2', 'c0724d', '333333'), ff_generatePlaceholderImage(100, 75, 'CB-3', 'd0825d', '333333')],
        rating: 4.7, sold: 100, inStock: true
    },
    {
        id: 'shoes-boots-4', name: 'Waterproof Hiking Boots', description: 'Durable waterproof boots for hiking.', fullDescription: 'Tackle any trail with confidence in our Waterproof Hiking Boots. Designed for rugged terrain and wet conditions, they offer superior grip, ankle support, and waterproof protection, ensuring your feet stay dry and comfortable on all your adventures.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Boots', subcategoryId: 'boots', brand: 'Under Armour', price: 8900, colors: ['Grey/Green', 'Brown/Orange'], minOrder: 1, maxOrder: 1, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Hiking Boots', '483d8b', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'WHB-1', '584d9b', '333333'), ff_generatePlaceholderImage(100, 75, 'WHB-2', '685dab', '333333'), ff_generatePlaceholderImage(100, 75, 'WHB-3', '786dbb', '333333')],
        rating: 4.8, sold: 70, inStock: true
    },
    {
        id: 'shoes-boots-5', name: 'Stiletto Heel Boots', description: 'Glamorous stiletto heel boots for a bold statement.', fullDescription: 'Make a bold fashion statement with our glamorous Stiletto Heel Boots. Designed to elongate your legs and add undeniable allure, these boots are perfect for evening events, parties, or whenever you want to command attention.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Boots', subcategoryId: 'boots', brand: 'Versace', price: 11000, colors: ['Black Leather', 'Red Suede'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Stiletto Boots', '800000', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SHB-1', '901010', '333333'), ff_generatePlaceholderImage(100, 75, 'SHB-2', 'a02020', '333333'), ff_generatePlaceholderImage(100, 75, 'SHB-3', 'b03030', '333333')],
        rating: 4.7, sold: 30, inStock: true
    },

    // --- Shoes -> Heels ---
    {
        id: 'shoes-heels-1', name: 'Classic Black Pumps', description: 'Timeless black pumps for elegance.', fullDescription: 'Every woman needs a pair of Classic Black Pumps. These timeless heels offer unparalleled elegance and versatility, perfect for professional settings, evening events, or adding a sophisticated touch to any outfit.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Heels', subcategoryId: 'heels', brand: 'Prada', price: 9000, colors: ['Black'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Black Pumps', '2f4f4f', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CBP-1', '3f5f5f', '333333'), ff_generatePlaceholderImage(100, 75, 'CBP-2', '4f6f6f', '333333'), ff_generatePlaceholderImage(100, 75, 'CBP-3', '5f7f7f', '333333')],
        rating: 4.8, sold: 150, inStock: true
    },
    {
        id: 'shoes-heels-2', name: 'Stiletto Strappy Heels', description: 'Daring strappy stiletto heels for parties.', fullDescription: 'Turn heads with our Daring Strappy Stiletto Heels. Featuring delicate straps and a sky-high stiletto, these heels are designed for maximum impact, perfect for parties, special occasions, or adding a touch of drama to your ensemble.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Heels', subcategoryId: 'heels', brand: 'Versace', price: 11500, colors: ['Red', 'Gold', 'Silver'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Strappy Heels', '8b0000', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SSH-1', '9b1010', '333333'), ff_generatePlaceholderImage(100, 75, 'SSH-2', 'ab2020', '333333'), ff_generatePlaceholderImage(100, 75, 'SSH-3', 'bb3030', '333333')],
        rating: 4.9, sold: 55, inStock: true
    },
    {
        id: 'shoes-heels-3', name: 'Block Heel Sandals', description: 'Comfortable block heel sandals for everyday.', fullDescription: 'Our Block Heel Sandals offer the perfect blend of style and comfort. The sturdy block heel provides stability for all-day wear, while the chic design makes them versatile enough for office, casual outings, or evening events.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Heels', subcategoryId: 'heels', brand: 'Zara', price: 4800, colors: ['Nude', 'Black', 'Tan'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Block Heels', 'f0e68c', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'BHS-1', 'f0f69c', '333333'), ff_generatePlaceholderImage(100, 75, 'BHS-2', 'f0g6ac', '333333'), ff_generatePlaceholderImage(100, 75, 'BHS-3', 'f0h6bc', '333333')],
        rating: 4.6, sold: 170, inStock: true
    },
    {
        id: 'shoes-heels-4', name: 'Platform Peep-Toe Heels', description: 'Retro-inspired platform peep-toe heels.', fullDescription: 'Step back in time with our Retro-Inspired Platform Peep-Toe Heels. Combining a comfortable platform with a stylish peep-toe design, these heels offer both height and a touch of vintage glamour, perfect for making a statement.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Heels', subcategoryId: 'heels', brand: 'H&M', price: 5200, colors: ['Black', 'Red', 'Leopard Print'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Peep-Toe Heels', 'ff69b4', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'PPTH-1', 'ff79c4', '333333'), ff_generatePlaceholderImage(100, 75, 'PPTH-2', 'ff89d4', '333333'), ff_generatePlaceholderImage(100, 75, 'PPTH-3', 'ff99e4', '333333')],
        rating: 4.5, sold: 95, inStock: true
    },
    {
        id: 'shoes-heels-5', name: 'Embellished Court Shoes', description: 'Sparkling court shoes with intricate embellishments.', fullDescription: 'Add a touch of sparkle to your step with our Embellished Court Shoes. Adorned with intricate embellishments, these elegant shoes are perfect for special occasions, evening events, or adding a luxurious finish to your formal attire.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Heels', subcategoryId: 'heels', brand: 'Dior', price: 10500, colors: ['Silver', 'Gold', 'Black'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Embellished Heels', 'b22222', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'ECS-1', 'c23232', '333333'), ff_generatePlaceholderImage(100, 75, 'ECS-2', 'd24242', '333333'), ff_generatePlaceholderImage(100, 75, 'ECS-3', 'e25252', '333333')],
        rating: 4.9, sold: 45, inStock: true
    },

    // --- Shoes -> Flats ---
    {
        id: 'shoes-flats-1', name: 'Ballet Flats', description: 'Comfortable and classic ballet flats.', fullDescription: 'Our Ballet Flats offer timeless elegance and all-day comfort. With their soft construction and versatile design, they are perfect for everyday wear, easily transitioning from casual outings to more refined settings.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Flats', subcategoryId: 'flats', brand: 'Zara', price: 2800, colors: ['Black', 'Nude', 'Red'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Ballet Flats', 'f0e68c', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'BF-1', 'f0f69c', '333333'), ff_generatePlaceholderImage(100, 75, 'BF-2', 'f0g6ac', '333333'), ff_generatePlaceholderImage(100, 75, 'BF-3', 'f0h6bc', '333333')],
        rating: 4.7, sold: 220, inStock: true
    },
    {
        id: 'shoes-flats-2', name: 'Loafer Moccasins', description: 'Comfortable loafer moccasins for casual style.', fullDescription: 'Experience relaxed sophistication with our Loafer Moccasins. Crafted for comfort and featuring a classic design, these shoes are perfect for casual wear, offering a smart yet laid-back look for any day of the week.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Flats', subcategoryId: 'flats', brand: 'H&M', price: 3500, colors: ['Brown', 'Navy', 'Tan'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Loafer Moccasins', 'a0522d', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'LM-1', 'b0623d', '333333'), ff_generatePlaceholderImage(100, 75, 'LM-2', 'c0724d', '333333'), ff_generatePlaceholderImage(100, 75, 'LM-3', 'd0825d', '333333')],
        rating: 4.6, sold: 140, inStock: true
    },
    {
        id: 'shoes-flats-3', name: 'Espadrille Flats', description: 'Stylish espadrille flats for summer.', fullDescription: 'Our Espadrille Flats are the quintessential summer shoe. With their natural jute sole and comfortable design, they offer a relaxed yet chic look, perfect for warm-weather outings, vacations, or adding a touch of bohemian flair.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Flats', subcategoryId: 'flats', brand: 'Zara', price: 2900, colors: ['Striped', 'Blue', 'Red'], minOrder: 1, maxOrder: 3, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Espadrille Flats', 'f08080', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'EF-1', 'f09090', '333333'), ff_generatePlaceholderImage(100, 75, 'EF-2', 'f0a0a0', '333333'), ff_generatePlaceholderImage(100, 75, 'EF-3', 'f0b0b0', '333333')],
        rating: 4.5, sold: 180, inStock: true
    },
    {
        id: 'shoes-flats-4', name: 'Pointed Toe Flats', description: 'Sophisticated pointed toe flats for a sleek look.', fullDescription: 'Achieve a sleek and sophisticated look with our Pointed Toe Flats. Their elegant design and comfortable fit make them perfect for both office wear and evening outings, offering a stylish alternative to heels without compromising on polish.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Flats', subcategoryId: 'flats', brand: 'Calvin Klein', price: 3800, colors: ['Black', 'Nude', 'Navy'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Pointed Flats', '778899', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'PTF-1', '8798a9', '333333'), ff_generatePlaceholderImage(100, 75, 'PTF-2', '97a8b9', '333333'), ff_generatePlaceholderImage(100, 75, 'PTF-3', 'a7b8c9', '333333')],
        rating: 4.8, sold: 110, inStock: true
    },
    {
        id: 'shoes-flats-5', name: 'Comfort Driving Mocs', description: 'Soft and flexible driving moccasins.', fullDescription: 'Our Comfort Driving Mocs are designed for ultimate comfort and flexibility. With their soft leather and grippy sole, they are perfect for long drives or casual everyday wear, offering a relaxed yet refined look.',
        category: 'Shoes', categoryId: 'shoes', subcategory: 'Flats', subcategoryId: 'flats', brand: 'Tommy Hilfiger', price: 4200, colors: ['Brown', 'Black', 'Navy'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Driving Mocs', '8b4513', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CDM-1', '9b5513', '333333'), ff_generatePlaceholderImage(100, 75, 'CDM-2', 'ab6513', '333333'), ff_generatePlaceholderImage(100, 75, 'CDM-3', 'bb7513', '333333')],
        rating: 4.7, sold: 80, inStock: true
    },

    // --- Belts -> Leather Belts ---
    {
        id: 'belts-leather-1', name: 'Classic Black Leather Belt', description: 'Essential black leather belt for formal and casual.', fullDescription: 'A versatile essential, our Classic Black Leather Belt is perfect for both formal and casual attire. Crafted from genuine leather, it offers durability and a timeless look that complements any outfit. A must-have accessory.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Leather Belts', subcategoryId: 'leather-belts', brand: 'Levi\'s', price: 2000, colors: ['Black'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Black Leather Belt', '36454F', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CBLB-1', '46555F', '333333'), ff_generatePlaceholderImage(100, 75, 'CBLB-2', '56656F', '333333'), ff_generatePlaceholderImage(100, 75, 'CBLB-3', '66757F', '333333')],
        rating: 4.8, sold: 300, inStock: true
    },
    {
        id: 'belts-leather-2', name: 'Brown Embossed Leather Belt', description: 'Stylish brown leather belt with embossed pattern.', fullDescription: 'Add texture and style with our Brown Embossed Leather Belt. Featuring a subtle embossed pattern, this genuine leather belt is perfect for adding a touch of sophistication to your casual or smart-casual ensembles.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Leather Belts', subcategoryId: 'leather-belts', brand: 'Zara', price: 2500, colors: ['Brown'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Embossed Belt', 'a0522d', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'BELB-1', 'b0623d', '333333'), ff_generatePlaceholderImage(100, 75, 'BELB-2', 'c0724d', '333333'), ff_generatePlaceholderImage(100, 75, 'BELB-3', 'd0825d', '333333')],
        rating: 4.6, sold: 120, inStock: true
    },
    {
        id: 'belts-leather-3', name: 'Reversible Leather Belt', description: 'Versatile reversible leather belt (two colors).', fullDescription: 'Maximize your wardrobe versatility with our Reversible Leather Belt. Featuring two distinct colors, it offers double the styling options, allowing you to easily switch up your look to match different outfits with just one accessory.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Leather Belts', subcategoryId: 'leather-belts', brand: 'Tommy Hilfiger', price: 3000, colors: ['Black/Brown', 'Navy/Tan'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Reversible Belt', '778899', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'RLB-1', '8798a9', '333333'), ff_generatePlaceholderImage(100, 75, 'RLB-2', '97a8b9', '333333'), ff_generatePlaceholderImage(100, 75, 'RLB-3', 'a7b8c9', '333333')],
        rating: 4.7, sold: 180, inStock: true
    },
    {
        id: 'belts-leather-4', name: 'Plaited Leather Belt', description: 'Textured plaited leather belt for a unique look.', fullDescription: 'Add a touch of artisanal charm with our Plaited Leather Belt. Its intricately woven design provides unique texture and visual interest, perfect for enhancing casual outfits or adding a distinctive detail to your smart-casual attire.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Leather Belts', subcategoryId: 'leather-belts', brand: 'H&M', price: 2200, colors: ['Tan', 'Dark Brown'], minOrder: 1, maxOrder: 3, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Plaited Belt', 'cd853f', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'PLB-1', 'dd954f', '333333'), ff_generatePlaceholderImage(100, 75, 'PLB-2', 'eda55f', '333333'), ff_generatePlaceholderImage(100, 75, 'PLB-3', 'fbb56f', '333333')],
        rating: 4.5, sold: 90, inStock: true
    },
    {
        id: 'belts-leather-5', name: 'Designer Buckle Leather Belt', description: 'Premium leather belt with a distinctive designer buckle.', fullDescription: 'Make a statement with our Designer Buckle Leather Belt. Crafted from high-quality leather and featuring a unique, eye-catching buckle, this belt is perfect for elevating any outfit, showcasing your discerning taste in accessories.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Designer Belts', subcategoryId: 'designer-belts', brand: 'Gucci', price: 8000, colors: ['Black', 'Brown'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Designer Belt', '800000', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'DBLB-1', '901010', '333333'), ff_generatePlaceholderImage(100, 75, 'DBLB-2', 'a02020', '333333'), ff_generatePlaceholderImage(100, 75, 'DBLB-3', 'b03030', '333333')],
        rating: 4.9, sold: 60, inStock: true
    },

    // --- Belts -> Fabric Belts ---
    {
        id: 'belts-fabric-1', name: 'Woven Canvas Belt', description: 'Casual woven canvas belt for everyday wear.', fullDescription: 'Our Woven Canvas Belt offers a relaxed yet stylish option for your casual outfits. Lightweight and durable, it’s perfect for adding a touch of laid-back charm to jeans, shorts, or chinos, ideal for everyday comfort.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Fabric Belts', subcategoryId: 'fabric-belts', brand: 'H&M', price: 1500, colors: ['Navy', 'Khaki', 'Grey'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Canvas Belt', 'b0c4de', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'WCB-1', 'c0d4ee', '333333'), ff_generatePlaceholderImage(100, 75, 'WCB-2', 'd0e4ff', '333333'), ff_generatePlaceholderImage(100, 75, 'WCB-3', 'e0f4ff', '333333')],
        rating: 4.3, sold: 250, inStock: true
    },
    {
        id: 'belts-fabric-2', name: 'Braided Fabric Belt', description: 'Stylish braided fabric belt with textured look.', fullDescription: 'Add a touch of texture and casual elegance with our Braided Fabric Belt. Its intricate braided design provides a unique visual appeal, perfect for enhancing relaxed outfits or adding a subtle detail to your everyday style.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Fabric Belts', subcategoryId: 'fabric-belts', brand: 'Zara', price: 1800, colors: ['Multi-color', 'Blue', 'Brown'], minOrder: 1, maxOrder: 4, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Braided Belt', 'ffb6c1', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'BFB-1', 'ffc6d1', '333333'), ff_generatePlaceholderImage(100, 75, 'BFB-2', 'ffd6e1', '333333'), ff_generatePlaceholderImage(100, 75, 'BFB-3', 'ffe6f1', '333333')],
        rating: 4.4, sold: 160, inStock: true
    },
    {
        id: 'belts-fabric-3', name: 'Elastic Stretch Belt', description: 'Comfortable elastic stretch belt for flexibility.', fullDescription: 'Experience ultimate comfort and flexibility with our Elastic Stretch Belt. Designed to move with you, it provides a secure yet comfortable fit, making it ideal for active lifestyles or simply for all-day ease of wear.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Fabric Belts', subcategoryId: 'fabric-belts', brand: 'Adidas', price: 1600, colors: ['Black', 'Navy', 'Grey'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Stretch Belt', '20b2aa', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'ESB-1', '30c2ba', '333333'), ff_generatePlaceholderImage(100, 75, 'ESB-2', '40d2ca', '333333'), ff_generatePlaceholderImage(100, 75, 'ESB-3', '50e2da', '333333')],
        rating: 4.6, sold: 200, inStock: true
    },
    {
        id: 'belts-fabric-4', name: 'Military Web Belt', description: 'Durable military-style web belt.', fullDescription: 'Our Military Web Belt offers rugged durability and a utilitarian aesthetic. With its sturdy construction and simple buckle, it’s perfect for adding a practical yet stylish touch to your casual or outdoor-inspired outfits.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Fabric Belts', subcategoryId: 'fabric-belts', brand: 'Under Armour', price: 1900, colors: ['Olive Green', 'Black', 'Tan'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Web Belt', '5f9ea0', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'MWB-1', '6f9ea0', '333333'), ff_generatePlaceholderImage(100, 75, 'MWB-2', '7f9ea0', '333333'), ff_generatePlaceholderImage(100, 75, 'MWB-3', '8f9ea0', '333333')],
        rating: 4.5, sold: 110, inStock: true
    },
    {
        id: 'belts-fabric-5', name: 'Adjustable Casual Belt', description: 'Simple and adjustable casual belt.', fullDescription: 'Our Adjustable Casual Belt offers effortless style and a perfect fit for everyday wear. Its simple design and easy adjustability make it a versatile accessory that complements a wide range of casual outfits, ensuring comfort all day long.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Fabric Belts', subcategoryId: 'fabric-belts', brand: 'Puma', price: 1400, colors: ['Grey', 'Blue', 'Red'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Casual Belt', '87ceeb', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'ACB-A1', '97deeb', '333333'), ff_generatePlaceholderImage(100, 75, 'ACB-A2', 'a7eefb', '333333'), ff_generatePlaceholderImage(100, 75, 'ACB-A3', 'b7effb', '333333')],
        rating: 4.2, sold: 280, inStock: true
    },

    // --- Belts -> Designer Belts ---
    {
        id: 'belts-designer-1', name: 'Iconic Logo Buckle Belt', description: 'Premium belt with a prominent designer logo buckle.', fullDescription: 'Make a bold fashion statement with our Iconic Logo Buckle Belt. Featuring a prominent designer logo buckle and crafted from luxurious materials, this belt is a true symbol of style and status, perfect for elevating any high-fashion ensemble.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Designer Belts', subcategoryId: 'designer-belts', brand: 'Gucci', price: 9500, colors: ['Black', 'Brown'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Logo Belt', '800000', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'ILBB-1', '901010', '333333'), ff_generatePlaceholderImage(100, 75, 'ILBB-2', 'a02020', '333333'), ff_generatePlaceholderImage(100, 75, 'ILBB-3', 'b03030', '333333')],
        rating: 4.9, sold: 70, inStock: true
    },
    {
        id: 'belts-designer-2', name: 'Chain Detail Belt', description: 'Fashion-forward belt with elegant chain detailing.', fullDescription: 'Add an edgy yet elegant touch to your outfit with our Chain Detail Belt. Featuring delicate or bold chain embellishments, this belt is perfect for cinching waists over dresses or adding a unique accent to trousers, making a subtle yet impactful statement.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Designer Belts', subcategoryId: 'designer-belts', brand: 'Versace', price: 7000, colors: ['Black/Gold', 'Silver'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Chain Belt', 'b22222', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CDB-1', 'c23232', '333333'), ff_generatePlaceholderImage(100, 75, 'CDB-2', 'd24242', '333333'), ff_generatePlaceholderImage(100, 75, 'CDB-3', 'e25252', '333333')],
        rating: 4.7, sold: 45, inStock: true
    },
    {
        id: 'belts-designer-3', name: 'Crystal Embellished Belt', description: 'Sparkling belt adorned with crystals.', fullDescription: 'Shine bright with our Crystal Embellished Belt. Adorned with shimmering crystals, this belt is perfect for adding a touch of glamour and sparkle to evening wear, formal dresses, or elevating a simple outfit for a special occasion.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Designer Belts', subcategoryId: 'designer-belts', brand: 'Dior', price: 8500, colors: ['Silver', 'Gold'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Crystal Belt', '8a2be2', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CEB-1', '9a3be2', '333333'), ff_generatePlaceholderImage(100, 75, 'CEB-2', 'aa4be2', '333333'), ff_generatePlaceholderImage(100, 75, 'CEB-3', 'ba5be2', '333333')],
        rating: 4.8, sold: 35, inStock: true
    },
    {
        id: 'belts-designer-4', name: 'Statement Cinch Belt', description: 'Bold cinch belt to define your waist.', fullDescription: 'Define your silhouette and make a statement with our Statement Cinch Belt. Designed to beautifully accentuate your waist, this bold accessory is perfect for transforming oversized tops, dresses, or coats, adding instant structure and style.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Designer Belts', subcategoryId: 'designer-belts', brand: 'Prada', price: 6000, colors: ['Black', 'Red'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Cinch Belt', '4b0082', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SCB-1', '5b1092', '333333'), ff_generatePlaceholderImage(100, 75, 'SCB-2', '6b20a2', '333333'), ff_generatePlaceholderImage(100, 75, 'SCB-3', '7b30b2', '333333')],
        rating: 4.6, sold: 50, inStock: true
    },
    {
        id: 'belts-designer-5', name: 'Vintage Inspired Designer Belt', description: 'Elegant belt with vintage design elements.', fullDescription: 'Channel timeless elegance with our Vintage Inspired Designer Belt. Featuring classic design elements and meticulous craftsmanship, this belt adds a touch of old-world charm and sophistication to your modern wardrobe, perfect for a unique, refined look.',
        category: 'Belts', categoryId: 'belts', subcategory: 'Designer Belts', subcategoryId: 'designer-belts', brand: 'Burberry', price: 7800, colors: ['Brown', 'Black'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Vintage Belt', '8b4513', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'VIDB-1', '9b5513', '333333'), ff_generatePlaceholderImage(100, 75, 'VIDB-2', 'ab6513', '333333'), ff_generatePlaceholderImage(100, 75, 'VIDB-3', 'bb7513', '333333')],
        rating: 4.7, sold: 25, inStock: true
    },

    // --- Bags -> Handbags ---
    {
        id: 'bags-handbags-1', name: 'Elegant Leather Tote Bag', description: 'Spacious and stylish leather tote bag.', fullDescription: 'Our Elegant Leather Tote Bag combines spacious design with sophisticated style. Crafted from premium genuine leather, it’s perfect for carrying all your essentials, making it an ideal companion for work, travel, or everyday elegance.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Handbags', subcategoryId: 'handbags', brand: 'Louis Vuitton', price: 12000, colors: ['Black', 'Brown', 'Tan'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Leather Tote', '8b0000', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'ELTB-1', '9b1010', '333333'), ff_generatePlaceholderImage(100, 75, 'ELTB-2', 'ab2020', '333333'), ff_generatePlaceholderImage(100, 75, 'ELTB-3', 'bb3030', '333333')],
        rating: 4.9, sold: 80, inStock: true
    },
    {
        id: 'bags-handbags-2', name: 'Crossbody Chain Bag', description: 'Chic crossbody bag with stylish chain strap.', fullDescription: 'Our Crossbody Chain Bag is the perfect blend of chic style and practical design. Featuring an elegant chain strap and compact size, it’s ideal for carrying your essentials while keeping your hands free, perfect for evenings out or casual day trips.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Handbags', subcategoryId: 'handbags', brand: 'Chanel', price: 10500, colors: ['Black', 'Red', 'Quilted White'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Chain Bag', '2f4f4f', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CCB-1', '3f5f5f', '333333'), ff_generatePlaceholderImage(100, 75, 'CCB-2', '4f6f6f', '333333'), ff_generatePlaceholderImage(100, 75, 'CCB-3', '5f7f7f', '333333')],
        rating: 4.8, sold: 65, inStock: true
    },
    {
        id: 'bags-handbags-3', name: 'Structured Satchel Bag', description: 'Classic structured satchel bag for a polished look.', fullDescription: 'Our Structured Satchel Bag offers a timeless and polished look. With its defined shape and ample interior, it’s perfect for organizing your daily essentials, making it an ideal choice for work, meetings, or any occasion requiring a sophisticated accessory.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Handbags', subcategoryId: 'handbags', brand: 'Prada', price: 9000, colors: ['Black', 'Navy', 'Burgundy'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Satchel Bag', '778899', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SSB-1', '8798a9', '333333'), ff_generatePlaceholderImage(100, 75, 'SSB-2', '97a8b9', '333333'), ff_generatePlaceholderImage(100, 75, 'SSB-3', 'a7b8c9', '333333')],
        rating: 4.7, sold: 90, inStock: true
    },
    {
        id: 'bags-handbags-4', name: 'Quilted Shoulder Bag', description: 'Elegant quilted shoulder bag with chain strap.', fullDescription: 'Add a touch of classic elegance with our Quilted Shoulder Bag. Featuring a timeless quilted design and a chic chain strap, this bag is perfect for evening events, special occasions, or adding a sophisticated finish to your everyday ensemble.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Handbags', subcategoryId: 'handbags', brand: 'Dior', price: 8500, colors: ['Black', 'Cream', 'Pink'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Quilted Bag', 'dda0dd', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'QSB-1', 'eea0ee', '333333'), ff_generatePlaceholderImage(100, 75, 'QSB-2', 'ffa0ff', '333333'), ff_generatePlaceholderImage(100, 75, 'QSB-3', 'ffb0ff', '333333')],
        rating: 4.8, sold: 70, inStock: true
    },
    {
        id: 'bags-handbags-5', name: 'Miniature Clutch Bag', description: 'Tiny and chic clutch bag for essentials.', fullDescription: 'Our Miniature Clutch Bag is the epitome of minimalist chic. Perfect for carrying your absolute essentials—phone, cards, lipstick—it adds a touch of refined elegance to any evening outfit, ensuring you travel light and stylishly.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Handbags', subcategoryId: 'handbags', brand: 'Versace', price: 6000, colors: ['Black', 'Gold', 'Silver'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Clutch Bag', 'b22222', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'MCB-1', 'c23232', '333333'), ff_generatePlaceholderImage(100, 75, 'MCB-2', 'd24242', '333333'), ff_generatePlaceholderImage(100, 75, 'MCB-3', 'e25252', '333333')],
        rating: 4.7, sold: 50, inStock: true
    },

    // --- Bags -> Backpacks ---
    {
        id: 'bags-backpacks-1', name: 'Urban Commuter Backpack', description: 'Sleek and functional backpack for city commutes.', fullDescription: 'Our Urban Commuter Backpack is designed for the modern city dweller. With dedicated compartments for laptops and essentials, and a sleek, water-resistant design, it combines functionality with urban style, perfect for daily commutes.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Backpacks', subcategoryId: 'backpacks', brand: 'Adidas', price: 5500, colors: ['Black', 'Grey', 'Navy'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Commuter Backpack', '696969', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'UCBP-1', '797979', '333333'), ff_generatePlaceholderImage(100, 75, 'UCBP-2', '898989', '333333'), ff_generatePlaceholderImage(100, 75, 'UCBP-3', '999999', '333333')],
        rating: 4.6, sold: 180, inStock: true
    },
    {
        id: 'bags-backpacks-2', name: 'Travel Laptop Backpack', description: 'Spacious backpack with laptop compartment for travel.', fullDescription: 'Our Travel Laptop Backpack is your ideal travel companion. Featuring a padded laptop compartment, ample storage, and ergonomic design, it ensures comfort and organization for business trips, weekend getaways, or daily use.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Backpacks', subcategoryId: 'backpacks', brand: 'Nike', price: 6800, colors: ['Black', 'Blue', 'Olive'], minOrder: 1, maxOrder: 1, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Laptop Backpack', '483d8b', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'TLBP-1', '584d9b', '333333'), ff_generatePlaceholderImage(100, 75, 'TLBP-2', '685dab', '333333'), ff_generatePlaceholderImage(100, 75, 'TLBP-3', '786dbb', '333333')],
        rating: 4.7, sold: 120, inStock: true
    },
    {
        id: 'bags-backpacks-3', name: 'Stylish Mini Backpack', description: 'Trendy mini backpack for light carry.', fullDescription: 'Our Stylish Mini Backpack is perfect for carrying your essentials with a touch of flair. Compact yet chic, it’s ideal for casual outings, festivals, or adding a fashionable accent to your everyday look, offering convenience without bulk.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Backpacks', subcategoryId: 'backpacks', brand: 'Zara', price: 3500, colors: ['Black', 'Pink', 'Leopard Print'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Mini Backpack', 'ff69b4', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SMBP-1', 'ff79c4', '333333'), ff_generatePlaceholderImage(100, 75, 'SMBP-2', 'ff89d4', '333333'), ff_generatePlaceholderImage(100, 75, 'SMBP-3', 'ff99e4', '333333')],
        rating: 4.5, sold: 200, inStock: true
    },
    {
        id: 'bags-backpacks-4', name: 'Sporty Drawstring Backpack', description: 'Lightweight drawstring backpack for sports.', fullDescription: 'Our Sporty Drawstring Backpack is perfect for gym-goers and active individuals. Lightweight and easy to carry, it’s ideal for holding your workout gear, shoes, or light essentials, offering quick access and a comfortable fit.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Backpacks', subcategoryId: 'backpacks', brand: 'Puma', price: 2200, colors: ['Black', 'Red', 'Blue'], minOrder: 1, maxOrder: 4, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Drawstring Bag', '3cb371', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SDBP-1', '4cb371', '333333'), ff_generatePlaceholderImage(100, 75, 'SDBP-2', '5cb371', '333333'), ff_generatePlaceholderImage(100, 75, 'SDBP-3', '6cb371', '333333')],
        rating: 4.3, sold: 250, inStock: true
    },
    {
        id: 'bags-backpacks-5', name: 'Vintage Canvas Backpack', description: 'Classic vintage-style canvas backpack.', fullDescription: 'Embrace a timeless aesthetic with our Vintage Canvas Backpack. Crafted from durable canvas with leather accents, it offers a classic, rugged look and ample storage, perfect for daily use, weekend trips, or adding character to your style.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Backpacks', subcategoryId: 'backpacks', brand: 'H&M', price: 4500, colors: ['Khaki', 'Army Green', 'Brown'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Canvas Backpack', 'a0522d', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'VCBP-1', 'b0623d', '333333'), ff_generatePlaceholderImage(100, 75, 'VCBP-2', 'c0724d', '333333'), ff_generatePlaceholderImage(100, 75, 'VCBP-3', 'd0825d', '333333')],
        rating: 4.6, sold: 100, inStock: true
    },

    // --- Bags -> Suitcases ---
    {
        id: 'bags-suitcases-1', name: 'Hard-Shell Spinner Suitcase (Large)', description: 'Durable large hard-shell spinner suitcase.', fullDescription: 'Travel with confidence with our Large Hard-Shell Spinner Suitcase. Engineered for durability and ease of movement, it features a tough exterior, spacious interior, and 360-degree spinner wheels, ensuring your belongings are secure and travel is effortless.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Suitcases', subcategoryId: 'suitcases', brand: 'Samsonite', price: 10000, colors: ['Black', 'Silver', 'Navy'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Large Suitcase', '708090', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'HSS-1', '8090a0', '333333'), ff_generatePlaceholderImage(100, 75, 'HSS-2', '90a0b0', '333333'), ff_generatePlaceholderImage(100, 75, 'HSS-3', 'a0b0c0', '333333')],
        rating: 4.8, sold: 70, inStock: true
    },
    {
        id: 'bags-suitcases-2', name: 'Soft-Sided Carry-On Suitcase', description: 'Lightweight soft-sided carry-on suitcase.', fullDescription: 'Our Soft-Sided Carry-On Suitcase offers lightweight convenience and flexible packing. Designed to meet airline carry-on requirements, it features multiple exterior pockets for easy access and durable construction for frequent travel.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Suitcases', subcategoryId: 'suitcases', brand: 'American Tourister', price: 7500, colors: ['Black', 'Blue', 'Red'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Carry-On', '4682b4', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SSCO-1', '5692c4', '333333'), ff_generatePlaceholderImage(100, 75, 'SSCO-2', '66a2d4', '333333'), ff_generatePlaceholderImage(100, 75, 'SSCO-3', '76b2e4', '333333')],
        rating: 4.7, sold: 100, inStock: true
    },
    {
        id: 'bags-suitcases-3', name: 'Durable Travel Duffle Bag', description: 'Spacious and durable travel duffle bag.', fullDescription: 'Our Durable Travel Duffle Bag is perfect for weekend getaways or gym sessions. With its spacious main compartment and sturdy construction, it offers reliable storage for all your essentials, combining practicality with a classic design.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Suitcases', subcategoryId: 'suitcases', brand: 'Nike', price: 4500, colors: ['Black', 'Grey', 'Olive'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Duffle Bag', '3cb371', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'DTDB-1', '4cb371', '333333'), ff_generatePlaceholderImage(100, 75, 'DTDB-2', '5cb371', '333333'), ff_generatePlaceholderImage(100, 75, 'DTDB-3', '6cb371', '333333')],
        rating: 4.5, sold: 150, inStock: true
    },
    {
        id: 'bags-suitcases-4', name: 'Expandable Checked Luggage', description: 'Large expandable suitcase for extended trips.', fullDescription: 'Our Expandable Checked Luggage offers ample space for longer journeys. With its expandable design, you can pack more when needed, while the durable construction ensures your belongings are protected throughout your travels.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Suitcases', subcategoryId: 'suitcases', brand: 'Samsonite', price: 11000, colors: ['Navy', 'Charcoal'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Expandable Luggage', '778899', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'ECL-1', '8798a9', '333333'), ff_generatePlaceholderImage(100, 75, 'ECL-2', '97a8b9', '333333'), ff_generatePlaceholderImage(100, 75, 'ECL-3', 'a7b8c9', '333333')],
        rating: 4.8, sold: 60, inStock: true
    },
    {
        id: 'bags-suitcases-5', name: 'Lightweight Weekend Suitcase', description: 'Compact and light suitcase for short trips.', fullDescription: 'Our Lightweight Weekend Suitcase is perfect for short getaways. Designed for easy handling and efficient packing, it offers just enough space for your essentials, making spontaneous trips effortless and stylish.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Suitcases', subcategoryId: 'suitcases', brand: 'American Tourister', price: 6000, colors: ['Black', 'Teal', 'Pink'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Weekend Suitcase', 'ffb6c1', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'LWS-1', 'ffc6d1', '333333'), ff_generatePlaceholderImage(100, 75, 'LWS-2', 'ffd6e1', '333333'), ff_generatePlaceholderImage(100, 75, 'LWS-3', 'ffe6f1', '333333')],
        rating: 4.6, sold: 90, inStock: true
    },

    // --- Bags -> Briefcases ---
    {
        id: 'bags-briefcases-1', name: 'Classic Leather Briefcase', description: 'Timeless leather briefcase for professionals.', fullDescription: 'Our Classic Leather Briefcase is a symbol of professional elegance. Crafted from genuine leather, it offers a sophisticated way to carry your documents and laptop, perfect for business meetings or daily office use, exuding timeless style.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Briefcases', subcategoryId: 'briefcases', brand: 'Gucci', price: 13000, colors: ['Black', 'Dark Brown'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Leather Briefcase', '8b4513', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CLB-1', '9b5513', '333333'), ff_generatePlaceholderImage(100, 75, 'CLB-2', 'ab6513', '333333'), ff_generatePlaceholderImage(100, 75, 'CLB-3', 'bb7513', '333333')],
        rating: 4.9, sold: 40, inStock: true
    },
    {
        id: 'bags-briefcases-2', name: 'Modern Laptop Messenger Bag', description: 'Sleek messenger bag with padded laptop sleeve.', fullDescription: 'Our Modern Laptop Messenger Bag offers a contemporary and practical solution for carrying your tech. With a padded laptop sleeve and multiple compartments, it ensures your devices and essentials are organized and protected on the go.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Briefcases', subcategoryId: 'briefcases', brand: 'Adidas', price: 7000, colors: ['Black', 'Grey', 'Navy'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Messenger Bag', '696969', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'MLMB-1', '797979', '333333'), ff_generatePlaceholderImage(100, 75, 'MLMB-2', '898989', '333333'), ff_generatePlaceholderImage(100, 75, 'MLMB-3', '999999', '333333')],
        rating: 4.7, sold: 95, inStock: true
    },
    {
        id: 'bags-briefcases-3', name: 'Professional Document Holder', description: 'Slim document holder for business essentials.', fullDescription: 'Our Professional Document Holder is perfect for keeping your important papers organized and protected. Its slim design allows for easy carrying, making it ideal for meetings, presentations, or simply maintaining a tidy workspace.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Briefcases', subcategoryId: 'briefcases', brand: 'Calvin Klein', price: 5500, colors: ['Black', 'Tan'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Document Holder', '2f4f4f', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'PDH-1', '3f5f5f', '333333'), ff_generatePlaceholderImage(100, 75, 'PDH-2', '4f6f6f', '333333'), ff_generatePlaceholderImage(100, 75, 'PDH-3', '5f7f7f', '333333')],
        rating: 4.6, sold: 70, inStock: true
    },
    {
        id: 'bags-briefcases-4', name: 'Slim Business Portfolio', description: 'Compact portfolio for carrying documents.', fullDescription: 'Our Slim Business Portfolio offers a sleek and professional way to carry your essential documents. Its minimalist design is perfect for quick meetings, interviews, or when you need to travel light while maintaining a polished appearance.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Briefcases', subcategoryId: 'briefcases', brand: 'Prada', price: 8000, colors: ['Black', 'Navy'], minOrder: 1, maxOrder: 2, waitingPeriod: '4-6 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Business Portfolio', '778899', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SBP-1', '8798a9', '333333'), ff_generatePlaceholderImage(100, 75, 'SBP-2', '97a8b9', '333333'), ff_generatePlaceholderImage(100, 75, 'SBP-3', 'a7b8c9', '333333')],
        rating: 4.8, sold: 55, inStock: true
    },
    {
        id: 'bags-briefcases-5', name: 'Multi-Compartment Tech Briefcase', description: 'Briefcase with multiple compartments for tech.', fullDescription: 'Our Multi-Compartment Tech Briefcase is designed for the organized professional. With dedicated padded sections for laptops, tablets, and accessories, it ensures all your tech gear is securely stored and easily accessible, perfect for the modern workspace.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Briefcases', subcategoryId: 'briefcases', brand: 'Under Armour', price: 9500, colors: ['Black', 'Grey'], minOrder: 1, maxOrder: 1, waitingPeriod: '5-7 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Tech Briefcase', '483d8b', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'MCTB-1', '584d9b', '333333'), ff_generatePlaceholderImage(100, 75, 'MCTB-2', '685dab', '333333'), ff_generatePlaceholderImage(100, 75, 'MCTB-3', '786dbb', '333333')],
        rating: 4.7, sold: 30, inStock: true
    },

    // --- Bags -> Wallets ---
    {
        id: 'bags-wallets-1', name: 'Men\'s Bifold Leather Wallet', description: 'Classic bifold leather wallet for men.', fullDescription: 'Our Men\'s Bifold Leather Wallet combines classic design with practical functionality. Crafted from genuine leather, it offers ample space for cards and cash while maintaining a slim profile, perfect for everyday use.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Wallets', subcategoryId: 'wallets', brand: 'Tommy Hilfiger', price: 2500, colors: ['Black', 'Brown'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Bifold Wallet', 'a0522d', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'MBLW-1', 'b0623d', '333333'), ff_generatePlaceholderImage(100, 75, 'MBLW-2', 'c0724d', '333333'), ff_generatePlaceholderImage(100, 75, 'MBLW-3', 'd0825d', '333333')],
        rating: 4.8, sold: 300, inStock: true
    },
    {
        id: 'bags-wallets-2', name: 'Women\'s Zip-Around Wallet', description: 'Spacious zip-around wallet for women.', fullDescription: 'Our Women\'s Zip-Around Wallet offers ample space and secure storage for all your essentials. With multiple card slots, coin pocket, and a secure zip closure, it combines practicality with a chic design, perfect for daily organization.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Wallets', subcategoryId: 'wallets', brand: 'Zara', price: 3200, colors: ['Black', 'Red', 'Nude'], minOrder: 1, maxOrder: 3, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Zip Wallet', 'ffb6c1', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'WZAW-1', 'ffc6d1', '333333'), ff_generatePlaceholderImage(100, 75, 'WZAW-2', 'ffd6e1', '333333'), ff_generatePlaceholderImage(100, 75, 'WZAW-3', 'ffe6f1', '333333')],
        rating: 4.7, sold: 180, inStock: true
    },
    {
        id: 'bags-wallets-3', name: 'Slim Card Holder Wallet', description: 'Minimalist slim card holder for essentials.', fullDescription: 'Our Slim Card Holder Wallet is perfect for those who prefer to travel light. Its minimalist design holds your essential cards securely, slipping easily into any pocket without adding bulk, ideal for quick errands or a night out.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Wallets', subcategoryId: 'wallets', brand: 'H&M', price: 1200, colors: ['Black', 'Grey', 'Blue'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Card Holder', 'b0c4de', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'SCHW-1', 'c0d4ee', '333333'), ff_generatePlaceholderImage(100, 75, 'SCHW-2', 'd0e4ff', '333333'), ff_generatePlaceholderImage(100, 75, 'SCHW-3', 'e0f4ff', '333333')],
        rating: 4.5, sold: 250, inStock: true
    },
    {
        id: 'bags-wallets-4', name: 'Travel Passport Wallet', description: 'Organized wallet for travel documents and passport.', fullDescription: 'Our Travel Passport Wallet is designed to keep your travel essentials organized. With dedicated slots for your passport, boarding passes, cards, and currency, it ensures smooth and stress-free navigation through airports and beyond.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Wallets', subcategoryId: 'wallets', brand: 'Calvin Klein', price: 3800, colors: ['Black', 'Navy', 'Brown'], minOrder: 1, maxOrder: 2, waitingPeriod: '3-5 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Passport Wallet', '778899', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'TPW-1', '8798a9', '333333'), ff_generatePlaceholderImage(100, 75, 'TPW-2', '97a8b9', '333333'), ff_generatePlaceholderImage(100, 75, 'TPW-3', 'a7b8c9', '333333')],
        rating: 4.6, sold: 110, inStock: true
    },
    {
        id: 'bags-wallets-5', name: 'Coin Pouch Wallet', description: 'Compact coin pouch for loose change.', fullDescription: 'Our Coin Pouch Wallet is a convenient solution for organizing your loose change. Its compact size makes it easy to carry in any bag or pocket, ensuring your coins are always accessible and tidy.',
        category: 'Bags', categoryId: 'bags', subcategory: 'Wallets', subcategoryId: 'wallets', brand: 'Zara', price: 900, colors: ['Black', 'Red', 'Green'], minOrder: 1, maxOrder: 5, waitingPeriod: '2-4 business days',
        image: ff_generatePlaceholderImage(400, 300, 'Coin Pouch', 'f0e68c', 'ffffff'),
        thumbnails: [ff_generatePlaceholderImage(100, 75, 'CPW-1', 'f0f69c', '333333'), ff_generatePlaceholderImage(100, 75, 'CPW-2', 'f0g6ac', '333333'), ff_generatePlaceholderImage(100, 75, 'CPW-3', 'f0h6bc', '333333')],
        rating: 4.4, sold: 200, inStock: true
    }
];


// --- Local Storage Utilities ---

function ff_getCart() {
    try {
        const cart = JSON.parse(localStorage.getItem('ff_shopping_cart')) || [];
        return cart;
    } catch (e) {
        console.error("Error parsing cart from localStorage:", e);
        return [];
    }
}

function ff_saveCart(cart) {
    localStorage.setItem('ff_shopping_cart', JSON.stringify(cart));
    ff_updateCartCount(); // Update header cart count
    if (window.location.pathname.includes('fashionfinesse-my-activity.html')) {
        ff_renderShoppingCart(); // Re-render cart if on activity page
    }
}

function ff_getFavorites() {
    try {
        const favorites = JSON.parse(localStorage.getItem('ff_favorites')) || [];
        return favorites;
    } catch (e) {
        console.error("Error parsing favorites from localStorage:", e);
        return [];
    }
}

function ff_saveFavorites(favorites) {
    localStorage.setItem('ff_favorites', JSON.stringify(favorites));
    if (window.location.pathname.includes('fashionfinesse-my-activity.html')) {
        ff_renderFavorites(); // Re-render favorites if on activity page
    }
}

// --- Custom Message Display ---
let ff_messageTimeout;
function ff_showMessage(message, type = 'info') {
    const messageContainer = document.getElementById('ff-message-container');
    if (!messageContainer) {
        console.warn('ff-message-container not found. Message not displayed:', message);
        // Fallback to console log if container isn't ready
        return;
    }

    // Clear any existing message and timeout
    clearTimeout(ff_messageTimeout);
    messageContainer.textContent = '';
    messageContainer.className = 'ff-message-container'; // Reset classes

    messageContainer.textContent = message;
    messageContainer.classList.add(`ff-message-${type}`);
    messageContainer.style.display = 'block'; // Show the message

    // Hide message after 3 seconds
    ff_messageTimeout = setTimeout(() => {
        messageContainer.style.display = 'none';
        messageContainer.textContent = '';
        messageContainer.className = 'ff-message-container'; // Clean up classes
    }, 3000);
}


// --- UI Update Functions ---

// Updates the cart count displayed in the subheader
function ff_updateCartCount() {
    const cart = ff_getCart();
    const cartCountElement = document.getElementById('ff-cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Renders a product card HTML (used on homepage, products page, and favorites tab)
function ff_renderProductCard(product) {
    const isFavorited = ff_getFavorites().includes(product.id) ? 'fas' : 'far'; // Use fas for solid, far for outline
    const stockStatusClass = product.inStock ? 'in-stock' : 'out-of-stock';
    const stockStatusText = product.inStock ? 'In Stock' : 'Out of Stock';
    const ctaDisabled = product.inStock ? '' : 'disabled';

    return `
        <div class="ff-product-card" data-product-id="${product.id}">
            <i class="${isFavorited} fa-heart ff-favorite-icon" data-product-id="${product.id}"></i>
            <a href="fashionfinesse-products-details.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            </a>
            <p>Ksh ${product.price.toLocaleString()}</p>
            <div class="ff-product-meta">
                <span class="rating">
                    ${'★'.repeat(Math.floor(product.rating))}
                    ${(product.rating % 1) >= 0.5 ? '☆' : ''}
                </span> (${product.rating}/5) | Sold: ${product.sold} <br>
                <span class="stock-status ${stockStatusClass}">${stockStatusText}</span>
            </div>
            <button class="cta-button ff-add-to-cart" data-product-id="${product.id}" ${ctaDisabled}>
                ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
        </div>
    `;
}

// --- Subheader Functionalities ---

function ff_populateCategoriesNav() {
    const categoriesList = document.getElementById('ff-categories-list');
    if (!categoriesList) return;

    // IMPORTANT: To avoid duplicate navigation items, ensure your HTML file (e.g., index.html)
    // does NOT contain hardcoded <li> elements for categories like "Clothes", "Shoes", etc.
    // Only the "New Arrivals" (or any other static items) should be in the HTML.
    // The JavaScript dynamically generates the rest.
    const existingDynamicItems = categoriesList.querySelectorAll('li[data-dynamic="true"]');
    existingDynamicItems.forEach(item => item.remove());

    ff_categories.forEach(category => {
        const categoryListItem = document.createElement('li');
        categoryListItem.setAttribute('data-dynamic', 'true'); // Mark for clearing on re-render
        categoryListItem.innerHTML = `
            <a href="#" data-category="${category.id}">${category.name} <i class="fas fa-caret-down"></i></a>
            <div class="ff-dropdown-content" id="ff-dropdown-${category.id}"></div>
        `;
        categoriesList.insertBefore(categoryListItem, categoriesList.lastElementChild); // Insert before 'New Arrivals'

        const dropdownContent = categoryListItem.querySelector(`#ff-dropdown-${category.id}`);
        const subcategories = ff_subcategories_map[category.id];
        if (subcategories) {
            subcategories.forEach(subcategory => {
                const subcategoryLink = document.createElement('a');
                subcategoryLink.href = `fashionfinesse-products.html?category=${category.id}&subcategory=${subcategory.id}`;
                subcategoryLink.textContent = subcategory.name;
                dropdownContent.appendChild(subcategoryLink);
            });
        }
    });

    ff_handleCategoryDropdowns();
}

function ff_handleCategoryDropdowns() {
    const categoryLinks = document.querySelectorAll('.ff-categories-nav li > a');

    categoryLinks.forEach(link => {
        const dropdown = link.nextElementSibling; // The dropdown content div

        if (dropdown && dropdown.classList.contains('ff-dropdown-content')) {
            // For desktop hover
            link.parentElement.addEventListener('mouseenter', () => {
                dropdown.style.display = 'block';
            });
            link.parentElement.addEventListener('mouseleave', () => {
                dropdown.style.display = 'none';
            });

            // For mobile/touch click toggle
            link.addEventListener('click', (event) => {
                if (window.innerWidth <= 768) { // Apply only on smaller screens
                    event.preventDefault(); // Prevent navigation for category links
                    // Close other open dropdowns
                    document.querySelectorAll('.ff-dropdown-content').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.style.display = 'none';
                        }
                    });
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });
}


function ff_setupSubheaderSearch() {
    const searchInput = document.getElementById('ff-product-search');
    const searchSubmitBtn = document.getElementById('ff-search-submit-btn');
    const searchSuggestionsDiv = document.getElementById('ff-search-suggestions');

    if (!searchInput || !searchSubmitBtn || !searchSuggestionsDiv) return;

    let searchTimeout;

    const ff_showSuggestions = (query) => {
        searchSuggestionsDiv.innerHTML = '';
        if (query.length < 2) {
            searchSuggestionsDiv.style.display = 'none';
            return;
        }

        const lowerCaseQuery = query.toLowerCase();
        const matchedSuggestions = new Set(); // Use a Set to avoid duplicates

        // Search products by name, description
        ff_products.forEach(product => {
            if (product.name.toLowerCase().includes(lowerCaseQuery) ||
                product.description.toLowerCase().includes(lowerCaseQuery) ||
                product.brand.toLowerCase().includes(lowerCaseQuery)) {
                matchedSuggestions.add(product.name);
            }
        });

        // Search brands
        ff_brands.forEach(brand => {
            if (brand.toLowerCase().includes(lowerCaseQuery)) {
                matchedSuggestions.add(brand);
            }
        });

        // Search categories and subcategories
        ff_categories.forEach(cat => {
            if (cat.name.toLowerCase().includes(lowerCaseQuery)) {
                matchedSuggestions.add(cat.name);
            }
        });
        Object.values(ff_subcategories_map).flat().forEach(subcat => {
            if (subcat.name.toLowerCase().includes(lowerCaseQuery)) {
                matchedSuggestions.add(subcat.name);
            }
        });

        if (matchedSuggestions.size > 0) {
            matchedSuggestions.forEach(suggestion => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('ff-suggestion-item');
                suggestionItem.textContent = suggestion;
                suggestionItem.addEventListener('click', () => {
                    searchInput.value = suggestion; // Auto-fill the search bar
                    searchSuggestionsDiv.style.display = 'none'; // Hide suggestions
                    // User will now need to click the search button or press Enter
                });
                searchSuggestionsDiv.appendChild(suggestionItem);
            });
            searchSuggestionsDiv.style.display = 'block';
        } else {
            searchSuggestionsDiv.style.display = 'none';
        }
    };

    const ff_performSearch = (query) => {
        // Redirect to products page with search query
        window.location.href = `fashionfinesse-products.html?search=${encodeURIComponent(query)}`;
    };

    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            ff_showSuggestions(searchInput.value);
        }, 300); // Debounce input
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value.length >= 2) {
            ff_showSuggestions(searchInput.value);
        }
    });

    searchInput.addEventListener('blur', (event) => {
        // Delay hiding to allow click on suggestion
        setTimeout(() => {
            if (!searchSuggestionsDiv.contains(event.relatedTarget)) { // Check if relatedTarget is outside suggestions
                searchSuggestionsDiv.style.display = 'none';
            }
        }, 100);
    });

    searchSubmitBtn.addEventListener('click', () => {
        ff_performSearch(searchInput.value);
    });

    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            ff_performSearch(searchInput.value);
        }
    });

    // Add styles for search suggestions (inline for simplicity, but could be in CSS)
    const style = document.createElement('style');
    style.textContent = `
        .ff-search-suggestions {
            position: absolute;
            background-color: var(--card-bg);
            border: 1px solid var(--border-color);
            border-radius: 5px;
            max-height: 200px;
            overflow-y: auto;
            width: calc(100% - 1rem); /* Adjust to match input width */
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            z-index: 100;
            display: none; /* Hidden by default */
            top: calc(100% + 5px); /* Position below search bar */
            left: 0;
        }
        .ff-suggestion-item {
            padding: 0.8rem 1rem;
            cursor: pointer;
            color: var(--text-color);
            transition: background-color 0.2s ease;
        }
        .ff-suggestion-item:hover {
            background-color: var(--hover-bg);
            color: var(--primary-color);
        }
        .ff-search-bar {
            position: relative; /* Needed for absolute positioning of suggestions */
        }
    `;
    document.head.appendChild(style);
}


// --- Homepage Section Rendering ---

function ff_renderHeroSlider() {
    // Only run on the homepage (fashionfinesse.html)
    if (window.location.pathname.includes('fashionfinesse-products.html') || window.location.pathname.includes('fashionfinesse-my-activity.html') || window.location.pathname.includes('fashionfinesse-products-details.html')) {
        return;
    }

    const heroSlider = document.getElementById('ff-hero-slider');
    if (!heroSlider) return;

    // Filter for products that are in stock and have a high rating for "hot deals"
    const hotDeals = ff_products.filter(p => p.inStock && p.rating >= 4.5).slice(0, 9); // Get up to 9 for 3 slides
    const newArrivals = ff_products.slice(-9).reverse(); // Get last 9 products as new arrivals

    const sliderProducts = [];
    // Mix hot deals and new arrivals, ensuring we have enough for at least 2-3 slides
    for (let i = 0; i < Math.max(hotDeals.length, newArrivals.length); i++) {
        if (hotDeals[i]) sliderProducts.push(hotDeals[i]);
        if (newArrivals[i]) sliderProducts.push(newArrivals[i]);
    }

    // Ensure unique products and limit to a reasonable number for slider
    const uniqueSliderProducts = Array.from(new Set(sliderProducts.map(p => p.id)))
                                    .map(id => ff_products.find(p => p.id === id))
                                    .slice(0, 9); // Max 3 slides * 3 products

    heroSlider.innerHTML = '<h2>Hot Deals & New Arrivals</h2>'; // Reset content

    if (uniqueSliderProducts.length === 0) {
        heroSlider.innerHTML += '<p style="text-align: center; color: var(--text-color);">No hot deals or new arrivals available right now. Check back soon!</p>';
        return;
    }

    let currentSlide = 0;
    const productsPerSlide = 3;

    const totalSlides = Math.ceil(uniqueSliderProducts.length / productsPerSlide);

    const renderSlide = (slideIndex) => {
        const startIndex = slideIndex * productsPerSlide;
        const endIndex = startIndex + productsPerSlide;
        const productsToShow = uniqueSliderProducts.slice(startIndex, endIndex);

        const slideContainer = document.createElement('div');
        slideContainer.classList.add('ff-slider-item');
        if (slideIndex === currentSlide) {
            slideContainer.classList.add('active');
        }

        productsToShow.forEach(product => {
            slideContainer.innerHTML += ff_renderProductCard(product);
        });
        heroSlider.appendChild(slideContainer);
    };

    // Initial render of all slides (only one will be active)
    for (let i = 0; i < totalSlides; i++) {
        renderSlide(i);
    }

    // Slider navigation (simple auto-play for now)
    setInterval(() => {
        const currentActive = heroSlider.querySelector('.ff-slider-item.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        currentSlide = (currentSlide + 1) % totalSlides;
        const nextActive = heroSlider.querySelectorAll('.ff-slider-item')[currentSlide];
        if (nextActive) {
            nextActive.classList.add('active');
        }
    }, 5000); // Change slide every 5 seconds

    // Attach event listeners for add to cart and favorite icons to the hero slider
    heroSlider.addEventListener('click', (event) => {
        if (event.target.classList.contains('ff-add-to-cart')) {
            const productId = event.target.dataset.productId;
            ff_handleAddToCart(productId);
        }
        if (event.target.classList.contains('ff-favorite-icon')) {
            const productId = event.target.dataset.productId;
            ff_handleFavoriteToggle(productId, event.target);
        }
    });
}

function ff_renderTopBrands() {
    // Only run on the homepage (fashionfinesse.html)
    if (window.location.pathname.includes('fashionfinesse-products.html') || window.location.pathname.includes('fashionfinesse-my-activity.html') || window.location.pathname.includes('fashionfinesse-products-details.html')) {
        return;
    }

    const brandsGrid = document.getElementById('ff-brands-grid');
    if (!brandsGrid) return;

    brandsGrid.innerHTML = ''; // Clear placeholder content

    ff_brands.forEach(brand => {
        const brandItem = document.createElement('div');
        brandItem.classList.add('ff-brand-item');
        // Use a consistent placeholder image for brand logos
        brandItem.innerHTML = `
            <img src="${ff_generatePlaceholderImage(80, 80, brand.split(' ')[0], 'e0e0e0', '666666')}" alt="${brand} Logo">
            <p>${brand}</p>
        `;
        brandsGrid.appendChild(brandItem);
    });
}

function ff_renderTopPicks() {
    // Only run on the homepage (fashionfinesse.html)
    if (window.location.pathname.includes('fashionfinesse-products.html') || window.location.pathname.includes('fashionfinesse-my-activity.html') || window.location.pathname.includes('fashionfinesse-products-details.html')) {
        return;
    }

    const topPicksGrid = document.getElementById('ff-top-picks-grid');
    if (!topPicksGrid) return;

    topPicksGrid.innerHTML = ''; // Clear placeholder content

    // Select 8 random products for top picks, ensure they are in stock
    const availableProducts = ff_products.filter(p => p.inStock);
    // Use a consistent set of top picks for static data, or still randomize from the static set
    // For consistency, let's pick the first 8 available products
    const top8Picks = availableProducts.slice(0, 8);

    if (top8Picks.length === 0) {
        topPicksGrid.innerHTML = '<p style="text-align: center; color: var(--text-color);">No top picks available right now. Check back soon!</p>';
        return;
    }

    top8Picks.forEach(product => {
        topPicksGrid.innerHTML += ff_renderProductCard(product);
    });

    // Attach event listeners for add to cart and favorite icons to the top picks grid
    topPicksGrid.addEventListener('click', (event) => {
        if (event.target.classList.contains('ff-add-to-cart')) {
            const productId = event.target.dataset.productId;
            ff_handleAddToCart(productId);
        }
        if (event.target.classList.contains('ff-favorite-icon')) {
            const productId = event.target.dataset.productId;
            ff_handleFavoriteToggle(productId, event.target);
        }
    });
}

// --- Product Interaction Handlers ---

function ff_handleAddToCart(productId, quantity = 1) {
    const product = ff_products.find(p => p.id === productId);
    if (!product) {
        ff_showMessage('Product not found.', 'error');
        return;
    }
    if (!product.inStock) {
        ff_showMessage(`Sorry, "${product.name}" is currently out of stock.`, 'error');
        return;
    }

    let cart = ff_getCart();
    const existingItem = cart.find(item => item.productId === productId);

    // Ensure quantity does not exceed maxOrder
    const maxAllowed = product.maxOrder;
    let newQuantity = quantity;

    if (existingItem) {
        newQuantity = existingItem.quantity + quantity;
        if (newQuantity > maxAllowed) {
            ff_showMessage(`Cannot add more than ${maxAllowed} of "${product.name}" to cart. You currently have ${existingItem.quantity}.`, 'error');
            return;
        }
        existingItem.quantity = newQuantity;
    } else {
        if (quantity > maxAllowed) {
            ff_showMessage(`Cannot add more than ${maxAllowed} of "${product.name}" to cart.`, 'error');
            return;
        }
        cart.push({ productId: productId, quantity: quantity, price: product.price });
    }
    ff_saveCart(cart);
    ff_showMessage(`"${product.name}" added to cart!`, 'success');
}

function ff_handleFavoriteToggle(productId, iconElement) {
    let favorites = ff_getFavorites();
    const index = favorites.indexOf(productId);

    if (index > -1) {
        favorites.splice(index, 1); // Remove from favorites
        iconElement.classList.remove('fas');
        iconElement.classList.add('far');
        ff_showMessage(`Removed from favorites.`, 'info');
    } else {
        favorites.push(productId); // Add to favorites
        iconElement.classList.remove('far');
        iconElement.classList.add('fas');
        ff_showMessage(`Added to favorites!`, 'success');
    }
    ff_saveFavorites(favorites);
}


// --- Contact Form Handling ---

function ff_setupContactForm() {
    // Only run on the homepage (fashionfinesse.html)
    if (window.location.pathname.includes('fashionfinesse-products.html') || window.location.pathname.includes('fashionfinesse-my-activity.html') || window.location.pathname.includes('fashionfinesse-products-details.html')) {
        return;
    }

    const contactForm = document.getElementById('ff-contact-form');
    const statusMessageDiv = document.getElementById('ff-contact-status-message');

    if (!contactForm || !statusMessageDiv) return;

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Simulate form submission
        statusMessageDiv.textContent = 'Sending message...';
        statusMessageDiv.style.color = 'var(--primary-color)';

        setTimeout(() => {
            const name = document.getElementById('ff-contact-name').value;
            const email = document.getElementById('ff-contact-email').value;
            const subject = document.getElementById('ff-contact-subject').value;
            const message = document.getElementById('ff-contact-message').value;

            // Basic validation
            if (!name || !email || !subject || !message) {
                statusMessageDiv.textContent = 'Please fill in all fields.';
                statusMessageDiv.style.color = 'red';
                return;
            }

            console.log('Contact Form Submitted:');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Subject:', subject);
            console.log('Message:', message);

            statusMessageDiv.textContent = 'Message sent successfully! We will get back to you soon.';
            statusMessageDiv.style.color = 'green';
            contactForm.reset(); // Clear the form

        }, 1500); // Simulate network delay
    });
}

// --- Products Page Specific Logic ---
function ff_populateProductFilters() {
    const filterCategory = document.getElementById('ff-filter-category');
    const filterSubcategory = document.getElementById('ff-filter-subcategory');
    const filterBrand = document.getElementById('ff-filter-brand');

    if (!filterCategory || !filterSubcategory || !filterBrand) return;

    // Populate Categories
    ff_categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        filterCategory.appendChild(option);
    });

    // Populate Brands
    ff_brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.textContent = brand;
        filterBrand.appendChild(option);
    });

    // Event listener for Category filter change
    filterCategory.addEventListener('change', () => {
        const selectedCategoryId = filterCategory.value;
        filterSubcategory.innerHTML = '<option value="all">All Subcategories</option>'; // Reset subcategories

        if (selectedCategoryId !== 'all') {
            const subcategories = ff_subcategories_map[selectedCategoryId];
            if (subcategories) {
                subcategories.forEach(subcat => {
                    const option = document.createElement('option');
                    option.value = subcat.id;
                    option.textContent = subcat.name;
                    filterSubcategory.appendChild(option);
                });
                filterSubcategory.disabled = false;
            } else {
                filterSubcategory.disabled = true;
            }
        } else {
            filterSubcategory.disabled = true;
        }
        ff_renderProductListing(); // Re-render products on category change
    });

    // Add event listeners for other filters and sort
    const filterMinPrice = document.getElementById('ff-filter-min-price');
    const filterMaxPrice = document.getElementById('ff-filter-max-price');
    const sortBy = document.getElementById('ff-sort-by');

    filterSubcategory.addEventListener('change', ff_renderProductListing);
    filterBrand.addEventListener('change', ff_renderProductListing);
    filterMinPrice.addEventListener('input', ff_renderProductListing);
    filterMaxPrice.addEventListener('input', ff_renderProductListing);
    sortBy.addEventListener('change', ff_renderProductListing);
}

function ff_renderProductListing() {
    const productGrid = document.getElementById('ff-product-grid');
    const pageTitle = document.getElementById('ff-products-page-title');
    const pageDescription = document.getElementById('ff-products-page-description');

    if (!productGrid || !pageTitle || !pageDescription) return;

    let filteredProducts = [...ff_products]; // Start with all products

    // Get filter values
    const filterCategory = document.getElementById('ff-filter-category').value;
    const filterSubcategory = document.getElementById('ff-filter-subcategory').value;
    const filterBrand = document.getElementById('ff-filter-brand').value;
    const filterMinPrice = parseFloat(document.getElementById('ff-filter-min-price').value) || 0;
    const filterMaxPrice = parseFloat(document.getElementById('ff-filter-max-price').value) || Infinity;
    const sortBy = document.getElementById('ff-sort-by').value;

    // Apply URL parameters as initial filters
    const urlParams = new URLSearchParams(window.location.search);
    const urlCategory = urlParams.get('category');
    const urlSubcategory = urlParams.get('subcategory');
    const urlSearch = urlParams.get('search');
    const urlFilter = urlParams.get('filter'); // For 'new-arrivals'

    // Apply initial filters from URL if present and not already set by user interaction
    if (urlCategory && filterCategory === 'all') {
        document.getElementById('ff-filter-category').value = urlCategory;
        // Also populate subcategories if a category is pre-selected
        const subcategories = ff_subcategories_map[urlCategory];
        if (subcategories) {
            document.getElementById('ff-filter-subcategory').innerHTML = '<option value="all">All Subcategories</option>';
            subcategories.forEach(subcat => {
                const option = document.createElement('option');
                option.value = subcat.id;
                option.textContent = subcat.name;
                document.getElementById('ff-filter-subcategory').appendChild(option);
            });
            document.getElementById('ff-filter-subcategory').disabled = false;
        }
    }
    if (urlSubcategory && document.getElementById('ff-filter-subcategory').value === 'all') {
        document.getElementById('ff-filter-subcategory').value = urlSubcategory;
    }
    if (urlSearch) {
        document.getElementById('ff-product-search').value = urlSearch;
    }

    // --- Filtering Logic ---
    if (filterCategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.categoryId === filterCategory);
    }
    if (filterSubcategory !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.subcategoryId === filterSubcategory);
    }
    if (filterBrand !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.brand === filterBrand);
    }
    filteredProducts = filteredProducts.filter(p => p.price >= filterMinPrice && p.price <= filterMaxPrice);

    // Search filter (from subheader search bar)
    const currentSearchQuery = document.getElementById('ff-product-search').value.toLowerCase();
    if (currentSearchQuery) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(currentSearchQuery) ||
            p.description.toLowerCase().includes(currentSearchQuery) ||
            p.brand.toLowerCase().includes(currentSearchQuery) ||
            p.category.toLowerCase().includes(currentSearchQuery) ||
            p.subcategory.toLowerCase().includes(currentSearchQuery)
        );
    }

    // Handle 'new-arrivals' filter from URL
    if (urlFilter === 'new-arrivals') {
        // For static data, 'new-arrivals' can be the last few products added or a specific flag
        // Here, let's define 'new-arrivals' as the last 10 products in the ff_products array for simplicity.
        const newArrivalsIds = ff_products.slice(-10).map(p => p.id);
        filteredProducts = filteredProducts.filter(p => newArrivalsIds.includes(p.id));
        pageTitle.textContent = 'New Arrivals';
        pageDescription.textContent = 'Discover our latest additions to the collection.';
    } else {
        // Update page title and description based on filters
        let title = 'All Products';
        let description = 'Browse our extensive collection of trendy and elegant apparel.';

        if (filterCategory !== 'all') {
            const categoryName = ff_categories.find(c => c.id === filterCategory)?.name;
            title = `${categoryName} Products`;
            description = `Explore our collection of ${categoryName.toLowerCase()}.`;
        }
        if (filterSubcategory !== 'all') {
            const subcategoryName = ff_subcategories_map[filterCategory]?.find(s => s.id === filterSubcategory)?.name;
            title = `${subcategoryName} - ${title}`;
            description = `Discover our range of ${subcategoryName.toLowerCase()}.`;
        }
        if (filterBrand !== 'all') {
            title = `${filterBrand} - ${title}`;
            description = `Shop all products from ${filterBrand}.`;
        }
        if (currentSearchQuery) {
            title = `Search Results for "${currentSearchQuery}"`;
            description = `Found products matching your search.`;
        }

        pageTitle.textContent = title;
        pageDescription.textContent = description;
    }


    // --- Sorting Logic ---
    switch (sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
        case 'rating-desc':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            // Keep default order (as defined in ff_products array)
            break;
    }

    // Clear current products and render filtered/sorted ones
    productGrid.innerHTML = '';
    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            productGrid.innerHTML += ff_renderProductCard(product);
        });
    } else {
        productGrid.innerHTML = '<p style="text-align: center; color: var(--text-color);">No products found matching your criteria.</p>';
    }

    // Re-attach event listeners for add to cart and favorite icons to the newly rendered products
    productGrid.querySelectorAll('.ff-add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            ff_handleAddToCart(productId);
        });
    });
    productGrid.querySelectorAll('.ff-favorite-icon').forEach(icon => {
        icon.addEventListener('click', (event) => {
            const productId = event.target.dataset.productId;
            ff_handleFavoriteToggle(productId, event.target);
        });
    });
}

// --- Product Details Page Specific Logic ---
function ff_renderProductDetails() {
    const detailsContainer = document.getElementById('ff-product-details-container');
    if (!detailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (!productId) {
        detailsContainer.innerHTML = '<p style="text-align: center; color: red;">Product ID not found in URL.</p>';
        return;
    }

    const product = ff_products.find(p => p.id === productId);

    if (!product) {
        detailsContainer.innerHTML = '<p style="text-align: center; color: red;">Product not found.</p>';
        return;
    }

    const isFavorited = ff_getFavorites().includes(product.id) ? 'fas' : 'far';
    const stockStatusClass = product.inStock ? 'in-stock' : 'out-of-stock';
    const stockStatusText = product.inStock ? 'In Stock' : 'Out of Stock';
    const ctaDisabled = product.inStock ? '' : 'disabled';

    detailsContainer.innerHTML = `
        <div class="ff-product-image-gallery">
            <img src="${product.image}" alt="${product.name}" class="ff-main-product-image" id="ff-main-product-image">
            <div class="ff-thumbnail-gallery" id="ff-thumbnail-gallery">
                <!-- Main image as first thumbnail -->
                <img src="${product.image}" alt="${product.name} thumbnail 1" class="active-thumbnail" data-full-image="${product.image}">
                ${product.thumbnails.map((thumb, index) => `
                    <img src="${thumb}" alt="${product.name} thumbnail ${index + 2}" data-full-image="${thumb}">
                `).join('')}
            </div>
        </div>
        <div class="ff-product-info">
            <h1>${product.name}</h1>
            <p class="ff-price">Ksh ${product.price.toLocaleString()}</p>
            <div class="ff-meta-details">
                <span>Brand: <strong>${product.brand}</strong></span>
                <span>Category: <strong>${product.category}</strong></span>
                <span>Subcategory: <strong>${product.subcategory}</strong></span>
                <span>Rating: <span class="rating">
                    ${'★'.repeat(Math.floor(product.rating))}
                    ${(product.rating % 1) >= 0.5 ? '☆' : ''}
                </span> (${product.rating}/5)</span>
                <span>Sold: ${product.sold}</span>
                <span class="stock-status ${stockStatusClass}">${stockStatusText}</span>
                <span>Min Order: ${product.minOrder}</span>
                <span>Max Order: ${product.maxOrder}</span>
                <span>Waiting Period: ${product.waitingPeriod}</span>
            </div>
            <p class="ff-description-full">${product.fullDescription}</p>
            <div class="ff-product-actions">
                <input type="number" id="ff-quantity-input" value="1" min="1" max="${product.maxOrder}" ${ctaDisabled}>
                <button class="cta-button" id="ff-add-to-cart-details-btn" data-product-id="${product.id}" ${ctaDisabled}>
                    ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <i class="${isFavorited} fa-heart ff-favorite-icon" id="ff-favorite-details-icon" data-product-id="${product.id}"></i>
            </div>
        </div>
    `;

    // Event listeners for thumbnail gallery
    const mainImage = document.getElementById('ff-main-product-image');
    const thumbnails = document.querySelectorAll('#ff-thumbnail-gallery img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            mainImage.src = thumbnail.dataset.fullImage;
            thumbnails.forEach(t => t.classList.remove('active-thumbnail'));
            thumbnail.classList.add('active-thumbnail');
        });
    });

    // Event listener for Add to Cart button on details page
    const addToCartBtn = document.getElementById('ff-add-to-cart-details-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantityInput = document.getElementById('ff-quantity-input');
            const quantity = parseInt(quantityInput.value, 10);
            if (!isNaN(quantity) && quantity > 0) {
                ff_handleAddToCart(product.id, quantity);
            } else {
                ff_showMessage('Please enter a valid quantity.', 'error');
            }
        });
    }

    // Event listener for Favorite icon on details page
    const favoriteIcon = document.getElementById('ff-favorite-details-icon');
    if (favoriteIcon) {
        favoriteIcon.addEventListener('click', (event) => {
            ff_handleFavoriteToggle(product.id, event.target);
        });
    }

    // Ensure quantity input respects min/max
    const quantityInput = document.getElementById('ff-quantity-input');
    if (quantityInput) {
        quantityInput.addEventListener('change', () => {
            let value = parseInt(quantityInput.value, 10);
            if (isNaN(value) || value < product.minOrder) {
                value = product.minOrder;
            } else if (value > product.maxOrder) {
                value = product.maxOrder;
            }
            quantityInput.value = value;
        });
    }
}

// --- My Activity Page Specific Logic ---

// Function to handle tab switching
function ff_setupActivityTabs() {
    const tabButtons = document.querySelectorAll('.ff-activity-tab-button');
    const tabContents = document.querySelectorAll('.ff-tab-content');
    const urlParams = new URLSearchParams(window.location.search);
    const initialTab = urlParams.get('tab') || 'cart'; // Default to cart tab

    // Function to activate a specific tab
    const activateTab = (tabName) => {
        tabButtons.forEach(button => {
            if (button.dataset.tab === tabName) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === `ff-${tabName}-content`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });

        // Render content for the activated tab
        if (tabName === 'cart') {
            ff_renderShoppingCart();
        } else if (tabName === 'favorites') {
            ff_renderFavorites();
        } else if (tabName === 'orders') {
            // ff_renderOrderHistory(); // Placeholder for future implementation
        }
    };

    // Add event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            activateTab(button.dataset.tab);
        });
    });

    // Activate the initial tab based on URL or default
    activateTab(initialTab);
}

// Renders the shopping cart content
function ff_renderShoppingCart() {
    const cartItemsContainer = document.getElementById('ff-cart-items');
    const cartTotalElement = document.getElementById('ff-cart-total');
    const cartTabCountElement = document.getElementById('ff-cart-tab-count');
    const checkoutBtn = document.getElementById('ff-checkout-btn');
    const selectAllCheckbox = document.getElementById('ff-select-all-cart-items');


    if (!cartItemsContainer || !cartTotalElement || !cartTabCountElement || !checkoutBtn || !selectAllCheckbox) return;

    const cart = ff_getCart();
    cartItemsContainer.innerHTML = ''; // Clear existing items
    let totalItemsInCart = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: var(--text-color);">Your cart is empty.</p>';
        checkoutBtn.disabled = true;
        selectAllCheckbox.disabled = true;
    } else {
        selectAllCheckbox.disabled = false;
        cart.forEach(item => {
            const product = ff_products.find(p => p.id === item.productId);
            if (product) {
                totalItemsInCart += item.quantity;

                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('ff-cart-item');
                cartItemDiv.setAttribute('data-product-id', product.id);
                cartItemDiv.innerHTML = `
                    <input type="checkbox" class="ff-cart-item-checkbox" data-product-id="${product.id}" checked>
                    <a href="fashionfinesse-products-details.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}">
                    </a>
                    <div class="ff-cart-item-info">
                        <h3><a href="fashionfinesse-products-details.html?id=${product.id}">${product.name}</a></h3>
                        <p>Price: Ksh ${product.price.toLocaleString()}</p>
                        <p>Subtotal: Ksh ${(item.quantity * product.price).toLocaleString()}</p>
                    </div>
                    <div class="ff-cart-item-controls">
                        <input type="number" value="${item.quantity}" min="1" max="${product.maxOrder}" data-product-id="${product.id}" class="ff-cart-quantity-input">
                        <button class="ff-remove-item-btn" data-product-id="${product.id}">Remove</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            }
        });

        // Attach event listeners for quantity changes and remove buttons
        cartItemsContainer.querySelectorAll('.ff-cart-quantity-input').forEach(input => {
            input.addEventListener('change', (event) => {
                const productId = event.target.dataset.productId;
                let newQuantity = parseInt(event.target.value, 10);
                const product = ff_products.find(p => p.id === productId);

                if (product) {
                    if (isNaN(newQuantity) || newQuantity < product.minOrder) {
                        newQuantity = product.minOrder;
                        event.target.value = newQuantity; // Correct the input value
                        ff_showMessage(`Minimum order for "${product.name}" is ${product.minOrder}.`, 'error');
                    } else if (newQuantity > product.maxOrder) {
                        newQuantity = product.maxOrder;
                        event.target.value = newQuantity; // Correct the input value
                        ff_showMessage(`Maximum order for "${product.name}" is ${product.maxOrder}.`, 'error');
                    }

                    ff_updateCartItemQuantity(productId, newQuantity);
                    ff_updateCartTotalDisplay(); // Recalculate total after quantity change
                }
            });
        });

        cartItemsContainer.querySelectorAll('.ff-remove-item-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                ff_removeCartItem(productId);
            });
        });

        // Event listeners for checkboxes
        cartItemsContainer.querySelectorAll('.ff-cart-item-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', ff_updateCartTotalDisplay);
        });

        selectAllCheckbox.addEventListener('change', (event) => {
            const isChecked = event.target.checked;
            cartItemsContainer.querySelectorAll('.ff-cart-item-checkbox').forEach(checkbox => {
                checkbox.checked = isChecked;
            });
            ff_updateCartTotalDisplay();
        });
    }

    cartTabCountElement.textContent = totalItemsInCart;
    ff_updateCartTotalDisplay(); // Initial calculation of total
}

// Calculates and updates the displayed cart total based on selected items
function ff_updateCartTotalDisplay() {
    const cartItemsContainer = document.getElementById('ff-cart-items');
    const cartTotalElement = document.getElementById('ff-cart-total');
    const checkoutBtn = document.getElementById('ff-checkout-btn');
    const selectAllCheckbox = document.getElementById('ff-select-all-cart-items');

    if (!cartItemsContainer || !cartTotalElement || !checkoutBtn || !selectAllCheckbox) return;

    let currentTotal = 0;
    let anyItemSelected = false;
    let allItemsSelected = true;

    cartItemsContainer.querySelectorAll('.ff-cart-item-checkbox').forEach(checkbox => {
        const productId = checkbox.dataset.productId;
        const product = ff_products.find(p => p.id === productId);
        const cart = ff_getCart();
        const cartItem = cart.find(item => item.productId === productId);

        if (checkbox.checked && product && cartItem) {
            currentTotal += (product.price * cartItem.quantity);
            anyItemSelected = true;
        } else if (!checkbox.checked) {
            allItemsSelected = false;
        }
    });

    cartTotalElement.textContent = currentTotal.toLocaleString();
    checkoutBtn.disabled = !anyItemSelected;
    selectAllCheckbox.checked = allItemsSelected && cartItemsContainer.querySelectorAll('.ff-cart-item-checkbox').length > 0;
}


// Updates the quantity of a specific item in the cart
function ff_updateCartItemQuantity(productId, newQuantity) {
    let cart = ff_getCart();
    const itemIndex = cart.findIndex(item => item.productId === productId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
        ff_saveCart(cart); // This will re-render cart and update counts
    }
}

// Removes a specific item from the cart
function ff_removeCartItem(productId) {
    let cart = ff_getCart();
    const initialLength = cart.length;
    cart = cart.filter(item => item.productId !== productId);
    if (cart.length < initialLength) {
        ff_saveCart(cart); // This will re-render cart and update counts
        ff_showMessage(`Item removed from cart.`, 'info');
    }
}

// Renders the favorites content
function ff_renderFavorites() {
    const favoritesItemsContainer = document.getElementById('ff-favorites-items');
    const favoritesTabCountElement = document.getElementById('ff-favorites-tab-count');

    if (!favoritesItemsContainer || !favoritesTabCountElement) return;

    const favorites = ff_getFavorites();
    favoritesItemsContainer.innerHTML = ''; // Clear existing items

    if (favorites.length === 0) {
        favoritesItemsContainer.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-color);">You have no favorite items yet.</p>';
        favoritesTabCountElement.textContent = 0;
    } else {
        favorites.forEach(productId => {
            const product = ff_products.find(p => p.id === productId);
            if (product) {
                favoritesItemsContainer.innerHTML += ff_renderProductCard(product);
            }
        });
        favoritesTabCountElement.textContent = favorites.length;

        // Re-attach favorite toggle listeners to the newly rendered cards
        favoritesItemsContainer.querySelectorAll('.ff-favorite-icon').forEach(icon => {
            icon.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                ff_handleFavoriteToggle(productId, event.target);
            });
        });
        // Re-attach add to cart listeners to the newly rendered cards
        favoritesItemsContainer.querySelectorAll('.ff-add-to-cart').forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.productId;
                ff_handleAddToCart(productId);
            });
        });
    }
}

// Placeholder for future order history rendering
function ff_renderOrderHistory() {
    // This function would fetch and display order history from a backend or local storage
    // For now, the HTML contains static examples.
    console.log('Rendering Order History (static for now).');
}

// --- Checkout Logic ---

let ff_selectedCheckoutItems = []; // Stores the items selected for checkout

function ff_setupCheckout() {
    const checkoutBtn = document.getElementById('ff-checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            ff_selectedCheckoutItems = [];
            const cartItemsContainer = document.getElementById('ff-cart-items');
            cartItemsContainer.querySelectorAll('.ff-cart-item-checkbox:checked').forEach(checkbox => {
                const productId = checkbox.dataset.productId;
                const cart = ff_getCart();
                const cartItem = cart.find(item => item.productId === productId);
                if (cartItem) {
                    ff_selectedCheckoutItems.push(cartItem);
                }
            });

            if (ff_selectedCheckoutItems.length === 0) {
                ff_showMessage('Please select items to proceed to checkout.', 'info');
                return;
            }
            ff_openCheckoutModal();
        });
    }
}

function ff_openCheckoutModal() {
    let modal = document.getElementById('ff-checkout-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'ff-checkout-modal';
        modal.classList.add('ff-modal');
        document.body.appendChild(modal);

        // Add basic modal styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            .ff-modal {
                display: none; /* Hidden by default */
                position: fixed; /* Stay in place */
                z-index: 2000; /* Sit on top */
                left: 0;
                top: 0;
                width: 100%; /* Full width */
                height: 100%; /* Full height */
                overflow: auto; /* Enable scroll if needed */
                background-color: rgba(0,0,0,0.7); /* Black w/ opacity */
                justify-content: center;
                align-items: center;
                padding: 1rem;
            }
            .ff-modal-content {
                background-color: var(--card-bg);
                margin: auto;
                padding: 2rem;
                border-radius: 10px;
                width: 90%;
                max-width: 700px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
                position: relative;
                animation: ff-modal-fadein 0.3s ease-out;
                color: var(--text-color);
            }
            .ff-modal-close-btn {
                color: var(--primary-color);
                font-size: 2rem;
                font-weight: bold;
                position: absolute;
                top: 10px;
                right: 20px;
                cursor: pointer;
                transition: color 0.2s ease;
            }
            .ff-modal-close-btn:hover,
            .ff-modal-close-btn:focus {
                color: var(--secondary-color);
            }
            .ff-modal h2 {
                color: var(--primary-color);
                margin-bottom: 1.5rem;
                text-align: center;
            }
            .ff-checkout-items-list {
                max-height: 200px;
                overflow-y: auto;
                border: 1px solid var(--border-color);
                border-radius: 5px;
                padding: 0.8rem;
                margin-bottom: 1.5rem;
            }
            .ff-checkout-item {
                display: flex;
                justify-content: space-between;
                padding: 0.5rem 0;
                border-bottom: 1px dashed var(--border-color);
                font-size: 0.95rem;
            }
            .ff-checkout-item:last-child {
                border-bottom: none;
            }
            .ff-checkout-item-name {
                font-weight: bold;
                color: var(--primary-color);
            }
            .ff-shipping-options {
                margin-bottom: 1.5rem;
                padding: 1rem;
                border: 1px solid var(--border-color);
                border-radius: 8px;
            }
            .ff-shipping-options label {
                display: block;
                margin-bottom: 0.8rem;
                font-weight: bold;
            }
            .ff-shipping-options input[type="radio"] {
                margin-right: 0.5rem;
            }
            .ff-shipping-details {
                margin-top: 1rem;
                padding-left: 1.5rem;
            }
            .ff-shipping-details select {
                width: 100%;
                padding: 0.6rem;
                border: 1px solid var(--border-color);
                border-radius: 5px;
                background-color: var(--input-bg);
                color: var(--text-color);
                margin-top: 0.5rem;
            }
            .ff-checkout-summary {
                border-top: 1px solid var(--border-color);
                padding-top: 1.5rem;
                margin-top: 1.5rem;
                text-align: right;
            }
            .ff-checkout-summary p {
                font-size: 1.2rem;
                font-weight: bold;
                color: var(--primary-color);
                margin-bottom: 0.8rem;
            }
            .ff-checkout-summary .cta-button {
                width: auto;
                margin-left: auto;
                display: block; /* Make button take full width of its container */
            }

            @keyframes ff-modal-fadein {
                from { opacity: 0; transform: translateY(-50px) scale(0.9); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            @media (max-width: 768px) {
                .ff-modal-content {
                    padding: 1.5rem;
                    width: 95%;
                }
                .ff-modal h2 {
                    font-size: 1.8rem;
                }
                .ff-checkout-summary .cta-button {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }

    ff_renderCheckoutForm(ff_selectedCheckoutItems);
    modal.style.display = 'flex'; // Show the modal
}

function ff_closeCheckoutModal() {
    const modal = document.getElementById('ff-checkout-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function ff_renderCheckoutForm(items) {
    const modal = document.getElementById('ff-checkout-modal');
    if (!modal) return;

    let itemsHtml = '';
    let subtotal = 0;
    items.forEach(item => {
        const product = ff_products.find(p => p.id === item.productId);
        if (product) {
            const itemPrice = product.price * item.quantity;
            subtotal += itemPrice;
            itemsHtml += `
                <div class="ff-checkout-item">
                    <span class="ff-checkout-item-name">${product.name} (x${item.quantity})</span>
                    <span>Ksh ${itemPrice.toLocaleString()}</span>
                </div>
            `;
        }
    });

    modal.innerHTML = `
        <div class="ff-modal-content">
            <span class="ff-modal-close-btn">&times;</span>
            <h2>Proceed to Checkout</h2>
            <h3>Your Items:</h3>
            <div class="ff-checkout-items-list">
                ${itemsHtml}
            </div>
            <p style="font-size: 1.1rem; text-align: right; margin-bottom: 1rem;">Subtotal: Ksh <span id="ff-checkout-subtotal">${subtotal.toLocaleString()}</span></p>

            <div class="ff-shipping-options">
                <h3>Delivery Options:</h3>
                <label>
                    <input type="radio" name="ff-delivery-type" value="pickup" checked> Pick up from Shop
                </label>
                <div id="ff-pickup-details" class="ff-shipping-details">
                    <select id="ff-branch-select">
                        ${ff_branches.map(branch => `<option value="${branch.name}">${branch.name} - ${branch.location}</option>`).join('')}
                    </select>
                </div>
                <label>
                    <input type="radio" name="ff-delivery-type" value="doorstep"> Doorstep Delivery
                </label>
                <div id="ff-doorstep-details" class="ff-shipping-details" style="display: none;">
                    <label>
                        <input type="radio" name="ff-doorstep-type" value="rider" checked> Rider (Ksh ${ff_shipping_fees.rider.toLocaleString()})
                    </label>
                    <label>
                        <input type="radio" name="ff-doorstep-type" value="vehicle"> Vehicle Courier
                    </label>
                    <div id="ff-vehicle-courier-details" style="display: none; padding-left: 1.5rem; margin-top: 0.5rem;">
                        <select id="ff-courier-select">
                            <option value="G4S">G4S (Ksh ${ff_shipping_fees.G4S.toLocaleString()})</option>
                            <option value="DHL">DHL (Ksh ${ff_shipping_fees.DHL.toLocaleString()})</option>
                            <option value="WELLS FARGO">WELLS FARGO (Ksh ${ff_shipping_fees['WELLS FARGO'].toLocaleString()})</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="ff-checkout-summary">
                <p>Shipping Fee: Ksh <span id="ff-shipping-fee">0</span></p>
                <p>Grand Total: Ksh <span id="ff-grand-total">${subtotal.toLocaleString()}</span></p>
                <button class="cta-button" id="ff-confirm-checkout-btn">Confirm Order</button>
            </div>
        </div>
    `;

    // Attach event listeners for modal close
    modal.querySelector('.ff-modal-close-btn').addEventListener('click', ff_closeCheckoutModal);
    modal.addEventListener('click', (event) => {
        if (event.target === modal) { // Close if clicked outside content
            ff_closeCheckoutModal();
        }
    });

    // Attach event listeners for delivery options
    const deliveryTypeRadios = modal.querySelectorAll('input[name="ff-delivery-type"]');
    const pickupDetails = document.getElementById('ff-pickup-details');
    const doorstepDetails = document.getElementById('ff-doorstep-details');
    const branchSelect = document.getElementById('ff-branch-select');

    deliveryTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'pickup') {
                pickupDetails.style.display = 'block';
                doorstepDetails.style.display = 'none';
                ff_calculateCheckoutTotal();
            } else {
                pickupDetails.style.display = 'none';
                doorstepDetails.style.display = 'block';
                // Ensure a doorstep option is selected to trigger its fee calculation
                const selectedDoorstepType = document.querySelector('input[name="ff-doorstep-type"]:checked')?.value;
                if (selectedDoorstepType === 'vehicle') {
                    document.getElementById('ff-vehicle-courier-details').style.display = 'block';
                } else {
                    document.getElementById('ff-vehicle-courier-details').style.display = 'none';
                }
                ff_calculateCheckoutTotal();
            }
        });
    });

    const doorstepTypeRadios = modal.querySelectorAll('input[name="ff-doorstep-type"]');
    const vehicleCourierDetails = document.getElementById('ff-vehicle-courier-details');
    const courierSelect = document.getElementById('ff-courier-select');

    doorstepTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'vehicle') {
                vehicleCourierDetails.style.display = 'block';
            } else {
                vehicleCourierDetails.style.display = 'none';
            }
            ff_calculateCheckoutTotal();
        });
    });

    branchSelect.addEventListener('change', ff_calculateCheckoutTotal);
    courierSelect.addEventListener('change', ff_calculateCheckoutTotal);

    // Initial calculation when modal opens
    ff_calculateCheckoutTotal();

    // Confirm Order button
    document.getElementById('ff-confirm-checkout-btn').addEventListener('click', ff_processCheckout);
}

function ff_calculateCheckoutTotal() {
    const subtotalElement = document.getElementById('ff-checkout-subtotal');
    const shippingFeeElement = document.getElementById('ff-shipping-fee');
    const grandTotalElement = document.getElementById('ff-grand-total');

    if (!subtotalElement || !shippingFeeElement || !grandTotalElement) return;

    let currentSubtotal = 0;
    ff_selectedCheckoutItems.forEach(item => {
        const product = ff_products.find(p => p.id === item.productId);
        if (product) {
            currentSubtotal += (product.price * item.quantity);
        }
    });

    let shippingFee = 0;
    const deliveryType = document.querySelector('input[name="ff-delivery-type"]:checked')?.value;

    if (deliveryType === 'doorstep') {
        const doorstepType = document.querySelector('input[name="ff-doorstep-type"]:checked')?.value;
        if (doorstepType === 'rider') {
            shippingFee = ff_shipping_fees.rider;
        } else if (doorstepType === 'vehicle') {
            const selectedCourier = document.getElementById('ff-courier-select')?.value;
            shippingFee = ff_shipping_fees[selectedCourier] || 0;
        }
    } else { // pickup
        shippingFee = ff_shipping_fees.pickup;
    }

    const grandTotal = currentSubtotal + shippingFee;

    subtotalElement.textContent = currentSubtotal.toLocaleString();
    shippingFeeElement.textContent = shippingFee.toLocaleString();
    grandTotalElement.textContent = grandTotal.toLocaleString();
}

function ff_generateOrderNumber() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0'); // 4 random digits
    return `FF-${year}${month}${day}-${hours}${minutes}${seconds}-${random}`;
}

function ff_processCheckout() {
    if (ff_selectedCheckoutItems.length === 0) {
        ff_showMessage('No items selected for checkout.', 'error');
        return;
    }

    const orderNumber = ff_generateOrderNumber();
    const grandTotal = parseFloat(document.getElementById('ff-grand-total').textContent.replace(/,/g, '')); // Remove commas for parsing

    // Simulate order processing (e.g., sending to a backend)
    console.log('Processing Order:', {
        orderNumber: orderNumber,
        items: ff_selectedCheckoutItems,
        total: grandTotal,
        deliveryOption: document.querySelector('input[name="ff-delivery-type"]:checked')?.value,
        pickupBranch: document.getElementById('ff-branch-select')?.value,
        doorstepType: document.querySelector('input[name="ff-doorstep-type"]:checked')?.value,
        courier: document.getElementById('ff-courier-select')?.value,
        shippingFee: parseFloat(document.getElementById('ff-shipping-fee').textContent.replace(/,/g, '')),
        timestamp: new Date().toISOString()
    });

    // Clear checked out items from the cart
    let currentCart = ff_getCart();
    const checkedOutProductIds = ff_selectedCheckoutItems.map(item => item.productId);
    const updatedCart = currentCart.filter(item => !checkedOutProductIds.includes(item.productId));
    ff_saveCart(updatedCart); // Save the cart with only remaining items

    ff_closeCheckoutModal();
    ff_showMessage(`Order ${orderNumber} placed successfully! Grand Total: Ksh ${grandTotal.toLocaleString()}`, 'success');

    // Optionally, navigate to order history or a confirmation page
    // window.location.href = `fashionfinesse-my-activity.html?tab=orders&orderId=${orderNumber}`;
}


// --- Initialization ---

function ff_initFashionFinesse() {
    console.log('Fashion Finesse JS Initializing...');
    ff_populateCategoriesNav();
    ff_setupSubheaderSearch();
    ff_updateCartCount(); // Initial cart count load

    // Conditional rendering based on current page
    if (window.location.pathname.includes('fashionfinesse.html') || window.location.pathname === '/' || window.location.pathname === '/index.html') {
        // Only run homepage specific functions on the homepage
        ff_renderHeroSlider();
        ff_renderTopBrands();
        ff_renderTopPicks();
        ff_setupContactForm();
    } else if (window.location.pathname.includes('fashionfinesse-products.html')) {
        // Run products page specific functions on the products page
        ff_populateProductFilters();
        ff_renderProductListing(); // Initial render of products
    } else if (window.location.pathname.includes('fashionfinesse-products-details.html')) {
        // Run product details page specific functions
        ff_renderProductDetails();
    } else if (window.location.pathname.includes('fashionfinesse-my-activity.html')) {
        // Run my activity page specific functions
        ff_setupActivityTabs();
        ff_setupCheckout();
        ff_renderOrderHistory(); // Render static order history for now
    }
    // Add more else if blocks for other pages as they are created

    // Ensure favorite icons are correctly styled on load for all pages
    const favoriteIcons = document.querySelectorAll('.ff-favorite-icon');
    const favorites = ff_getFavorites();
    favoriteIcons.forEach(icon => {
        if (favorites.includes(icon.dataset.productId)) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        }
    });

    console.log('Fashion Finesse JS Initialized.');
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', ff_initFashionFinesse);
