// scripts/imall.js (Updated)

// Base path for product images
const IMAGE_BASE_PATH = 'images/iMall/';
const PLACEHOLDER_IMAGE = 'placeholder.png'; // Universal fallback image for missing or generic images

/**
 * Constructs the full path for a product image.
 * If the image filename is a generic placeholder (e.g., 'image-5.webp') or missing,
 * it returns the path to a universal placeholder image to prevent broken image links.
 * @param {string} folder - The product's image folder name (e.g., 'apple iphone 12 pro').
 * @param {string} filename - The specific image filename (e.g., 'apple-iphone-12-pro-1.jpg').
 * @returns {string} The full image URL or the placeholder image URL.
 */
function getProductImagePath(folder, filename) {
    if (!filename || filename.startsWith('image-') || filename === PLACEHOLDER_IMAGE) {
        return `${IMAGE_BASE_PATH}${PLACEHOLDER_IMAGE}`;
    }
    return `${IMAGE_BASE_PATH}${folder}/${filename}`;
}

// Dummy Data for Products (Total: 55 products - exceeding 50+)
// IMPORTANT: Each 'folder' entry must EXACTLY match a folder name within images/iMall/
// Each 'images' array must contain the filenames (e.g., 'image-1.webp') within that specific folder.
// I have ensured each 'images' array has at least 6 filenames.
const productData = [
    // Your 55 product objects here, as you provided in the imall.js file.
    // Ensure all products have the 'rating' property if you use 'popularity' sort.
    {
        id: 'iphone12pro',
        name: 'Apple iPhone 12 Pro',
        price: 12999,
        oldPrice: 15999,
        discount: 32,
        rating: 4.5, // Make sure rating is included
        reviews: 1901,
        shippingLoc: 'Dagoretti South',
        description: 'Experience the ultimate smartphone with the Apple iPhone 12 Pro, featuring a powerful A14 Bionic chip, stunning Ceramic Shield display, and advanced pro camera system for incredible low-light performance. Available in various colors and storage options.',
        folder: 'apple iphone 12 pro',
        images: ['apple-iphone-12-pro-1.jpg', 'apple-iphone-12-pro-2.jpg', 'apple-iphone-12-pro-3.jpg', 'apple-iphone-12-pro-4.jpg', 'apple-iphone-12-pro-5.jpg', 'apple-iphone-12-pro-6.jpg'],
        category: 'electronics' // Added category for filtering
    },
    {
        id: 'samsung-a13-5g',
        name: 'Samsung Galaxy A13 5G',
        price: 24999,
        oldPrice: 29999,
        discount: 16,
        rating: 4.3,
        reviews: 850,
        shippingLoc: 'Local Shipping',
        description: 'Get blazing-fast 5G connectivity with the Samsung Galaxy A13 5G. Features a vibrant display, reliable performance, and a versatile camera system for everyday use.',
        folder: 'Samsung Galaxy A13 5G',
        images: ['samsung-a13-5g-1.webp', 'samsung-a13-5g-2.webp', 'samsung-a13-5g-3.webp', 'samsung-a13-5g-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'arctic-mini-fridge',
        name: 'Arctic Mini Refrigerator',
        price: 8500,
        rating: 4.0,
        reviews: 550,
        shippingLoc: 'Nairobi',
        description: 'Compact and efficient Arctic Mini Refrigerator, perfect for dorm rooms, offices, or small apartments. Keep your beverages and snacks perfectly chilled.',
        folder: 'Arctic Mini Refridgerator',
        images: ['arctic-mini-fridge-1.jpg', 'arctic-mini-fridge-2.jpg', 'arctic-mini-fridge-3.jpg', 'arctic-mini-fridge-4.jpg', 'arctic-mini-fridge-5.jpg', 'arctic-mini-fridge-6.jpg'],
        category: 'home-appliances'
    },
    {
        id: 'bottom-load-dispenser',
        name: 'Bottom Load Water Dispenser',
        price: 10500,
        rating: 4.2,
        reviews: 320,
        shippingLoc: 'Mlolongo',
        description: 'Convenient bottom-load water dispenser with hot and cold water options. No more lifting heavy bottles! Ideal for home or office use.',
        folder: 'bottom load dispenser',
        images: ['bottom-load-dispenser-1.webp', 'bottom-load-dispenser-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'gas-cooktop',
        name: 'Gas Cooktop with Griddle',
        price: 15000,
        rating: 4.7,
        reviews: 780,
        shippingLoc: 'Nairobi',
        description: 'Modern gas cooktop with an integrated griddle for versatile cooking. Perfect for frying, grilling, and simmering multiple dishes at once.',
        folder: 'Gas Cooktop with Griddle',
        images: ['gas-cooktop-1.webp', 'gas-cooktop-2.webp', 'gas-cooktop-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'niakun-laptop',
        name: 'Niakun Laptop 14-inch',
        price: 25000,
        oldPrice: 30000,
        discount: 16,
        rating: 3.8,
        reviews: 210,
        shippingLoc: 'Overseas',
        description: 'Affordable and reliable 14-inch Niakun Laptop, suitable for daily tasks, Browse, and light office work. Comes with ample storage and memory.',
        folder: 'niakun laptop',
        images: ['niakun-laptop-1.webp', 'niakun-laptop-2.webp', 'niakun-laptop-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'samsung-s25-ultra',
        name: 'Samsung Galaxy S25 Ultra',
        price: 180000,
        rating: 4.9,
        reviews: 3500,
        shippingLoc: 'Nairobi',
        description: 'Unleash ultimate power with the Samsung Galaxy S25 Ultra. Revolutionary camera, stunning display, and long-lasting battery for unparalleled mobile experience.',
        folder: 'samsung galaxys25 ultra',
        images: ['samsung-galaxys25-ultra-1.webp', 'samsung-galaxys25-ultra-2.webp', 'samsung-galaxys25-ultra-3.webp', 'samsung-galaxys25-ultra-4.webp', 'samsung-galaxys25-ultra-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'samsung-fridge',
        name: 'Samsung Family Hub Refrigerator',
        price: 150000,
        rating: 4.8,
        reviews: 1200,
        shippingLoc: 'Nairobi',
        description: 'The smart Samsung Family Hub Refrigerator, featuring a touch screen, food management, and entertainment options. Redefine your kitchen experience.',
        folder: 'samsung refridgerator',
        images: ['samsung-refridgerator-1.webp', 'samsung-refridgerator-2.webp', 'samsung-refridgerator-3.webp', 'samsung-refridgerator-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'sgin-laptop',
        name: 'SGIN Laptop 15.6-inch',
        price: 32000,
        oldPrice: 38000,
        discount: 15,
        rating: 4.1,
        reviews: 480,
        shippingLoc: 'Local Shipping',
        description: 'Powerful SGIN Laptop with a vibrant 15.6-inch display, ideal for productivity and entertainment. Fast performance and sleek design.',
        folder: 'SGIN LAPTOP',
        images: ['sgin-laptop-1.webp', 'sgin-laptop-2.webp', 'sgin-laptop-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'vitron-32-tv',
        name: 'Vitron 32 Inch Frameless Smart TV HD Netflix Bluetooth TV',
        price: 10799,
        oldPrice: 15999,
        discount: 32,
        rating: 4.7,
        reviews: 1901,
        shippingLoc: 'Dagoretti South',
        description: 'Immerse yourself in stunning visuals with the Vitron 32 Inch Frameless Smart TV. Enjoy Netflix, YouTube, and more with built-in Bluetooth and DVB-T2.',
        folder: 'visio tv',
        color: ['Black'],
        size: ['32 inch'],
        images: ['visio-tv-1.webp', 'visio-tv-2.webp', 'visio-tv-3.webp', 'visio-tv-4.webp', 'visio-tv-5.webp', 'visio-tv-6.webp'],
        category: 'electronics'
    },
    {
        id: 'bt-speaker-x1',
        name: 'Portable Bluetooth Speaker X1',
        price: 1500,
        rating: 4.3,
        reviews: 600,
        shippingLoc: 'Local Shipping',
        description: 'Compact and powerful portable Bluetooth speaker with excellent bass and long battery life. Perfect for travel and outdoor activities.',
        folder: 'Portable Bluetooth Speaker X1',
        images: ['speaker-x1-1.webp', 'speaker-x1-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'air-fryer-v2',
        name: 'Digital Air Fryer V2 5L',
        price: 7500,
        rating: 4.6,
        reviews: 920,
        shippingLoc: 'Nairobi',
        description: 'Cook healthier meals with this 5-liter digital air fryer. Features multiple presets and easy-to-clean components.',
        folder: 'Digital Air Fryer V2 5L',
        images: ['air-fryer-v2-1.webp', 'air-fryer-v2-2.webp', 'air-fryer-v2-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'smartwatch-fitpro',
        name: 'Fitness Tracker Smartwatch FitPro',
        price: 2800,
        rating: 4.0,
        reviews: 340,
        shippingLoc: 'Overseas',
        description: 'Track your steps, heart rate, and sleep with this sleek fitness tracker smartwatch. Compatible with Android and iOS.',
        folder: 'Fitness Tracker Smartwatch FitPro',
        images: ['smartwatch-fitpro-1.webp', 'smartwatch-fitpro-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'coffee-maker-auto',
        name: 'Automatic Coffee Maker Deluxe',
        price: 4200,
        rating: 4.5,
        reviews: 510,
        shippingLoc: 'Local Shipping',
        description: 'Brew perfect coffee every morning with this easy-to-use automatic coffee maker. Features programmable timer and keep-warm function.',
        folder: 'Automatic Coffee Maker Deluxe',
        images: ['coffee-maker-auto-1.webp', 'coffee-maker-auto-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'gaming-headset-pro',
        name: 'Gaming Headset Pro X with Mic',
        price: 3500,
        rating: 4.2,
        reviews: 280,
        shippingLoc: 'Nairobi',
        description: 'Immersive gaming headset with noise-cancelling microphone and comfortable earcups. Compatible with PC, PS4, Xbox.',
        folder: 'Gaming Headset Pro X with Mic',
        images: ['gaming-headset-pro-1.webp', 'gaming-headset-pro-2.webp', 'gaming-headset-pro-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'blender-ultrablend',
        name: 'Professional Blender UltraBlend 1200W',
        price: 9800,
        rating: 4.8,
        reviews: 1100,
        shippingLoc: 'Local Shipping',
        description: 'Powerful 1200W blender for smoothies, soups, and crushing ice. Durable blades and multiple speed settings.',
        folder: 'Professional Blender UltraBlend 1200W',
        images: ['blender-ultrablend-1.webp', 'blender-ultrablend-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'earbuds-truewire',
        name: 'True Wireless Earbuds TrueWire X',
        price: 2200,
        rating: 4.4,
        reviews: 750,
        shippingLoc: 'Overseas',
        description: 'Enjoy crystal-clear audio with these true wireless earbuds. Ergonomic design for comfortable fit and long battery life.',
        folder: 'True Wireless Earbuds TrueWire X',
        images: ['earbuds-truewire-1.webp', 'earbuds-truewire-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'pressure-cooker-elite',
        name: 'Electric Pressure Cooker Elite 6L',
        price: 6800,
        rating: 4.6,
        reviews: 630,
        shippingLoc: 'Nairobi',
        description: 'Speed up your cooking with this 6-liter electric pressure cooker. Multi-functional and safe to use.',
        folder: 'Electric Pressure Cooker Elite 6L',
        images: ['pressure-cooker-elite-1.webp', 'pressure-cooker-elite-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'smart-bulb-glow',
        name: 'Smart LED Light Bulb Glow (RGB)',
        price: 750,
        rating: 4.1,
        reviews: 400,
        shippingLoc: 'Local Shipping',
        description: 'Control your lighting with your smartphone. RGB smart LED bulb with dimmable features and scene settings.',
        folder: 'Smart LED Light Bulb Glow RGB',
        images: ['smart-bulb-glow-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'security-cam-pro',
        name: 'HD Wi-Fi Security Camera Pro',
        price: 4500,
        rating: 4.5,
        reviews: 580,
        shippingLoc: 'Local Shipping',
        description: 'Keep an eye on your home with this easy-to-install HD Wi-Fi security camera. Features night vision and motion detection.',
        folder: 'HD Wi-Fi Security Camera Pro',
        images: ['security-cam-pro-1.webp', 'security-cam-pro-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'electric-kettle-swift',
        name: 'Cordless Electric Kettle Swift 1.7L',
        price: 1800,
        rating: 4.3,
        reviews: 700,
        shippingLoc: 'Mlolongo',
        description: 'Boil water quickly with this stylish 1.7L cordless electric kettle. Auto shut-off for safety.',
        folder: 'Cordless Electric Kettle Swift 1.7L',
        images: ['electric-kettle-swift-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'portable-fan-breeze',
        name: 'Portable Mini Desk Fan Breeze',
        price: 600,
        rating: 3.9,
        reviews: 250,
        shippingLoc: 'Local Shipping',
        description: 'Stay cool anywhere with this compact and quiet portable mini desk fan. USB powered.',
        folder: 'Portable Mini Desk Fan Breeze',
        images: ['portable-fan-breeze-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'external-ssd-fast',
        name: 'Portable SSD FastDrive 1TB',
        price: 9500,
        rating: 4.7,
        reviews: 300,
        shippingLoc: 'Overseas',
        description: 'Ultra-fast 1TB portable SSD for quick data transfers and reliable storage. Compact and durable design.',
        folder: 'Portable SSD FastDrive 1TB',
        images: ['external-ssd-fast-1.webp', 'external-ssd-fast-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'hair-dryer-salon',
        name: 'Professional Hair Dryer Salon Pro',
        price: 2900,
        rating: 4.2,
        reviews: 410,
        shippingLoc: 'Nairobi',
        description: 'Achieve salon-quality blowouts at home with this powerful professional hair dryer. Multiple heat and speed settings.',
        folder: 'Professional Hair Dryer Salon Pro',
        images: ['hair-dryer-salon-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'health-beauty'
    },
    {
        id: 'vacuum-cleaner-cyclone',
        name: 'Bagless Vacuum Cleaner Cyclone',
        price: 11000,
        rating: 4.4,
        reviews: 550,
        shippingLoc: 'Local Shipping',
        description: 'Efficient bagless vacuum cleaner with strong suction for deep cleaning carpets and hard floors.',
        folder: 'Bagless Vacuum Cleaner Cyclone',
        images: ['vacuum-cleaner-cyclone-1.webp', 'vacuum-cleaner-cyclone-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'gaming-mouse-viper',
        name: 'RGB Gaming Mouse Viper',
        price: 1200,
        rating: 4.0,
        reviews: 180,
        shippingLoc: 'Overseas',
        description: 'Precision RGB gaming mouse with customizable buttons and high DPI sensor for competitive gaming.',
        folder: 'RGB Gaming Mouse Viper',
        images: ['gaming-mouse-viper-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'induction-cooker-smart',
        name: 'Portable Induction Cooker Smart',
        price: 6200,
        rating: 4.5,
        reviews: 390,
        shippingLoc: 'Nairobi',
        description: 'Fast and energy-efficient portable induction cooker. Ideal for small kitchens or as an extra burner.',
        folder: 'Portable Induction Cooker Smart',
        images: ['induction-cooker-smart-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'power-bank-rapid',
        name: '20000mAh Power Bank RapidCharge',
        price: 2500,
        rating: 4.7,
        reviews: 800,
        shippingLoc: 'Local Shipping',
        description: 'High-capacity 20000mAh power bank for multiple device charges. Features fast charging and universal compatibility.',
        folder: '20000mAh Power Bank RapidCharge',
        images: ['power-bank-rapid-1.webp', 'power-bank-rapid-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'bathroom-scale-slim',
        name: 'Digital Bathroom Scale Slim',
        price: 900,
        rating: 3.9,
        reviews: 200,
        shippingLoc: 'Local Shipping',
        description: 'Accurate digital bathroom scale with a sleek glass design. Easy to read display.',
        folder: 'Digital Bathroom Scale Slim',
        images: ['bathroom-scale-slim-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'usb-c-hub-pro',
        name: 'USB-C Hub Pro 7-in-1',
        price: 1800,
        rating: 4.4,
        reviews: 310,
        shippingLoc: 'Overseas',
        description: 'Expand your laptop\'s connectivity with this 7-in-1 USB-C hub, featuring HDMI, USB 3.0, SD card reader, and more.',
        folder: 'USB-C Hub Pro 7-in-1',
        images: ['usb-c-hub-pro-1.webp', 'usb-c-hub-pro-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'frying-pan-set-chef',
        name: 'Non-stick Frying Pan Set Chef (3 pcs)',
        price: 3800,
        rating: 4.6,
        reviews: 450,
        shippingLoc: 'Nairobi',
        description: 'Durable non-stick frying pan set for everyday cooking. Includes 3 different sizes for versatility.',
        folder: 'Non-stick Frying Pan Set Chef 3 pcs',
        images: ['frying-pan-set-chef-1.webp', 'frying-pan-set-chef-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'water-filter-jug',
        name: 'Water Filter Pitcher AquaClean 2.5L',
        price: 1300,
        rating: 4.1,
        reviews: 270,
        shippingLoc: 'Local Shipping',
        description: 'Enjoy cleaner, great-tasting water with this 2.5-liter water filter pitcher. Reduces chlorine and impurities.',
        folder: 'Water Filter Pitcher AquaClean 2.5L',
        images: ['water-filter-jug-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'bluetooth-earphones-sport',
        name: 'Neckband Bluetooth Earphones Sport',
        price: 1600,
        rating: 4.0,
        reviews: 190,
        shippingLoc: 'Local Shipping',
        description: 'Comfortable neckband Bluetooth earphones with clear sound and long battery life. Ideal for sports and daily use.',
        folder: 'Neckband Bluetooth Earphones Sport',
        images: ['bluetooth-earphones-sport-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'food-processor-mini',
        name: 'Compact Food Processor Mini',
        price: 5500,
        rating: 4.3,
        reviews: 380,
        shippingLoc: 'Nairobi',
        description: 'Chop, blend, and mix with ease using this compact food processor. Perfect for small kitchens.',
        folder: 'Compact Food Processor Mini',
        images: ['food-processor-mini-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'digital-alarm-clock-sleek',
        name: 'LED Digital Alarm Clock Sleek',
        price: 950,
        rating: 3.8,
        reviews: 150,
        shippingLoc: 'Overseas',
        description: 'Modern LED digital alarm clock with large display, snooze function, and adjustable brightness.',
        folder: 'LED Digital Alarm Clock Sleek',
        images: ['digital-alarm-clock-sleek-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home'
    },
    {
        id: 'portable-blender-go',
        name: 'USB Rechargeable Portable Blender Go',
        price: 2100,
        rating: 4.5,
        reviews: 290,
        shippingLoc: 'Local Shipping',
        description: 'Make smoothies on the go with this USB rechargeable portable blender. Perfect for travel and healthy living.',
        folder: 'USB Rechargeable Portable Blender Go',
        images: ['portable-blender-go-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'hdmi-cable-ultra',
        name: 'High-Speed HDMI Cable Ultra (2m)',
        price: 400,
        rating: 4.7,
        reviews: 500,
        shippingLoc: 'Local Shipping',
        description: 'Connect your devices with this high-speed 2-meter HDMI cable. Supports 4K resolution and high-quality audio.',
        folder: 'High-Speed HDMI Cable Ultra 2m',
        images: ['hdmi-cable-ultra-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'wall-mount-shelf-modern',
        name: 'Floating Wall Mount Shelf Modern',
        price: 1200,
        rating: 4.0,
        reviews: 120,
        shippingLoc: 'Nairobi',
        description: 'Add a modern touch to your home with this floating wall mount shelf. Ideal for displaying decor or books.',
        folder: 'Floating Wall Mount Shelf Modern',
        images: ['wall-mount-shelf-modern-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home'
    },
    {
        id: 'electric-toothbrush-sonic',
        name: 'Rechargeable Electric Toothbrush Sonic',
        price: 2800,
        rating: 4.6,
        reviews: 330,
        shippingLoc: 'Overseas',
        description: 'Achieve a deeper clean with this rechargeable electric toothbrush. Multiple brushing modes for complete oral care.',
        folder: 'Rechargeable Electric Toothbrush Sonic',
        images: ['electric-toothbrush-sonic-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'health-beauty'
    },
    {
        id: 'kitchen-knife-set-pro',
        name: 'Stainless Steel Kitchen Knife Set Pro',
        price: 4500,
        rating: 4.5,
        reviews: 200,
        shippingLoc: 'Local Shipping',
        description: 'Essential 5-piece stainless steel kitchen knife set for all your culinary needs. Sharp and durable blades.',
        folder: 'Stainless Steel Kitchen Knife Set Pro',
        images: ['kitchen-knife-set-pro-1.webp', 'kitchen-knife-set-pro-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'drone-camera-hd',
        name: 'HD Drone with Camera',
        price: 18000,
        rating: 4.2,
        reviews: 150,
        shippingLoc: 'Overseas',
        description: 'Capture stunning aerial views with this easy-to-fly HD drone. Features live video feed and durable design.',
        folder: 'HD Drone with Camera',
        images: ['drone-camera-hd-1.webp', 'drone-camera-hd-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'smart-doorbell',
        name: 'Smart Video Doorbell',
        price: 7000,
        rating: 4.4,
        reviews: 250,
        shippingLoc: 'Local Shipping',
        description: 'Enhance home security with a smart video doorbell. See, hear, and speak to visitors from your smartphone.',
        folder: 'Smart Video Doorbell',
        images: ['smart-doorbell-1.webp', 'smart-doorbell-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'robot-vacuum',
        name: 'Robot Vacuum Cleaner SmartClean',
        price: 22000,
        rating: 4.7,
        reviews: 600,
        shippingLoc: 'Nairobi',
        description: 'Effortlessly clean your floors with this intelligent robot vacuum cleaner. Features smart navigation and app control.',
        folder: 'Robot Vacuum Cleaner SmartClean',
        images: ['robot-vacuum-cleaner-1.webp', 'robot-vacuum-cleaner-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'portable-projector',
        name: 'Mini Portable Projector',
        price: 13000,
        rating: 4.1,
        reviews: 180,
        shippingLoc: 'Overseas',
        description: 'Enjoy movies anywhere with this mini portable projector. Compact design with clear image projection.',
        folder: 'Mini Portable Projector',
        images: ['mini-projector-1.webp', 'mini-projector-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'gaming-monitor',
        name: '24-inch Gaming Monitor',
        price: 28000,
        rating: 4.5,
        reviews: 400,
        shippingLoc: 'Local Shipping',
        description: 'Experience smooth gaming with this 24-inch full HD gaming monitor. High refresh rate and fast response time.',
        folder: '24-inch Gaming Monitor',
        images: ['gaming-monitor-1.webp', 'gaming-monitor-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'smart-lock',
        name: 'Smart Door Lock with Fingerprint',
        price: 9500,
        rating: 4.3,
        reviews: 210,
        shippingLoc: 'Local Shipping',
        description: 'Keyless entry and enhanced security with this smart door lock. Features fingerprint, keypad, and app control.',
        folder: 'Smart Door Lock with Fingerprint',
        images: ['smart-door-lock-1.webp', 'smart-door-lock-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home'
    },
    {
        id: 'espressomaker',
        name: 'Espresso Coffee Machine',
        price: 16000,
        rating: 4.6,
        reviews: 320,
        shippingLoc: 'Nairobi',
        description: 'Brew rich, aromatic espresso at home with this compact and easy-to-use espresso machine.',
        folder: 'Espresso Coffee Machine',
        images: ['espresso-machine-1.webp', 'espresso-machine-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'bluetooth-keyboard',
        name: 'Wireless Bluetooth Keyboard',
        price: 1500,
        rating: 4.0,
        reviews: 100,
        shippingLoc: 'Overseas',
        description: 'Slim and portable wireless Bluetooth keyboard for tablets, smartphones, and computers. Long battery life.',
        folder: 'Wireless Bluetooth Keyboard',
        images: ['bluetooth-keyboard-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'car-dashcam',
        name: 'Full HD Car Dash Cam',
        price: 3200,
        rating: 4.2,
        reviews: 140,
        shippingLoc: 'Local Shipping',
        description: 'Record your drives in full HD with this reliable car dash cam. Features loop recording and G-sensor.',
        folder: 'Full HD Car Dash Cam',
        images: ['car-dash-cam-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'automotive'
    },
    {
        id: 'robot-mop',
        name: 'Robot Mop & Cleaner',
        price: 19000,
        rating: 4.5,
        reviews: 280,
        shippingLoc: 'Nairobi',
        description: 'Keep your floors spotless with this intelligent robot mop and cleaner. Perfect for hardwood and tile floors.',
        folder: 'Robot Mop Cleaner',
        images: ['robot-mop-1.webp', 'robot-mop-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home-appliances'
    },
    {
        id: 'smart-thermostat',
        name: 'Smart Thermostat EcoFlow',
        price: 8500,
        rating: 4.3,
        reviews: 170,
        shippingLoc: 'Local Shipping',
        description: 'Save energy and control your home\'s temperature from anywhere with this smart thermostat. Easy installation and app control.',
        folder: 'Smart Thermostat EcoFlow',
        images: ['thermostat-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home'
    },
    {
        id: 'portable-ssd-slim',
        name: 'Portable SSD SlimLine 2TB',
        price: 16000,
        rating: 4.8,
        reviews: 250,
        shippingLoc: 'Overseas',
        description: 'Massive 2TB storage in a sleek, portable design. Fast read/write speeds for all your data needs.',
        folder: 'Portable SSD SlimLine 2TB',
        images: ['ssd-slim-1.webp', 'ssd-slim-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'gaming-chair-ergopro',
        name: 'Ergonomic Gaming Chair ErgoPro',
        price: 25000,
        rating: 4.6,
        reviews: 300,
        shippingLoc: 'Nairobi',
        description: 'Comfortable and supportive gaming chair with adjustable lumbar support and headrest for long gaming sessions.',
        folder: 'Ergonomic Gaming Chair ErgoPro',
        images: ['gaming-chair-1.webp', 'gaming-chair-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'home'
    },
    {
        id: 'smart-plug-mini',
        name: 'Smart Plug Mini Wi-Fi (2 Pack)',
        price: 1800,
        rating: 4.1,
        reviews: 420,
        shippingLoc: 'Local Shipping',
        description: 'Turn any appliance into a smart device with these mini Wi-Fi smart plugs. Control with voice or app, set schedules.',
        folder: 'Smart Plug Mini Wi-Fi 2 Pack',
        images: ['smart-plug-1.webp', 'smart-plug-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    {
        id: 'noise-cancelling-headphones',
        name: 'Noise Cancelling Headphones PureSound',
        price: 11000,
        rating: 4.7,
        reviews: 650,
        shippingLoc: 'Local Shipping',
        description: 'Immerse yourself in music with these premium noise-cancelling headphones. Superior sound quality and comfortable over-ear design.',
        folder: 'Noise Cancelling Headphones PureSound',
        images: ['headphones-1.webp', 'headphones-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'],
        category: 'electronics'
    },
    // Adding 20 more dummy products to reach 55+ total
    {
        id: 'solar-power-bank', name: 'Solar Power Bank 10000mAh', price: 3000, rating: 4.0, reviews: 150, shippingLoc: 'Local Shipping', description: 'Charge devices using solar energy.', folder: 'Solar Power Bank 10000mAh', images: ['solar-pb-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'electronics'
    },
    {
        id: 'portable-heater', name: 'Portable Electric Heater', price: 4500, rating: 4.2, reviews: 200, shippingLoc: 'Nairobi', description: 'Compact heater for small rooms.', folder: 'Portable Electric Heater', images: ['heater-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'home-appliances'
    },
    {
        id: 'yoga-mat-eco', name: 'Eco-Friendly Yoga Mat', price: 1800, rating: 4.5, reviews: 100, shippingLoc: 'Local Shipping', description: 'Non-slip and sustainable yoga mat.', folder: 'Eco-Friendly Yoga Mat', images: ['yoga-mat-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'sports'
    },
    {
        id: 'kitchen-scale', name: 'Digital Kitchen Scale', price: 1100, rating: 4.3, reviews: 80, shippingLoc: 'Overseas', description: 'Precise measurements for cooking and baking.', folder: 'Digital Kitchen Scale', images: ['kitchen-scale-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'home-appliances'
    },
    {
        id: 'bike-repair-kit', name: 'Bicycle Repair Kit Pro', price: 2500, rating: 4.1, reviews: 50, shippingLoc: 'Local Shipping', description: 'Essential tools for bike maintenance.', folder: 'Bicycle Repair Kit Pro', images: ['bike-repair-kit-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'sports'
    },
    {
        id: 'electric-toothbrush-travel', name: 'Travel Electric Toothbrush', price: 1500, rating: 4.0, reviews: 90, shippingLoc: 'Local Shipping', description: 'Compact for travel with charging case.', folder: 'Travel Electric Toothbrush', images: ['travel-toothbrush-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'health-beauty'
    },
    {
        id: 'smart-watch-sport', name: 'Sport Smart Watch X', price: 7000, rating: 4.6, reviews: 300, shippingLoc: 'Nairobi', description: 'Waterproof smart watch with GPS and heart rate.', folder: 'Sport Smart Watch X', images: ['sport-watch-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'electronics'
    },
    {
        id: 'drone-mini', name: 'Mini Drone with HD Camera', price: 9000, rating: 3.9, reviews: 70, shippingLoc: 'Overseas', description: 'Small drone perfect for beginners.', folder: 'Mini Drone with HD Camera', images: ['mini-drone-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'electronics'
    },
    {
        id: 'robot-window-cleaner', name: 'Robot Window Cleaner', price: 15000, rating: 4.4, reviews: 110, shippingLoc: 'Nairobi', description: 'Automated window cleaning robot.', folder: 'Robot Window Cleaner', images: ['window-cleaner-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'home-appliances'
    },
    {
        id: 'projector-mini-pro', name: 'Mini Projector Pro 4K', price: 20000, rating: 4.2, reviews: 90, shippingLoc: 'Overseas', description: 'Portable projector with 4K support.', folder: 'Mini Projector Pro 4K', images: ['mini-projector-pro-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'electronics'
    },
    {
        id: 'gaming-keyboard-rgb', name: 'RGB Gaming Keyboard', price: 2800, rating: 4.5, reviews: 200, shippingLoc: 'Local Shipping', description: 'Mechanical keyboard with customizable RGB lights.', folder: 'RGB Gaming Keyboard', images: ['gaming-kb-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'electronics'
    },
    {
        id: 'smart-light-strip', name: 'Smart LED Light Strip 5m', price: 1200, rating: 4.1, reviews: 130, shippingLoc: 'Local Shipping', description: 'App-controlled LED strip for ambiance.', folder: 'Smart LED Light Strip 5m', images: ['light-strip-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'home'
    },
    {
        id: 'coffee-grinder', name: 'Electric Coffee Grinder', price: 2000, rating: 4.3, reviews: 160, shippingLoc: 'Nairobi', description: 'Grind fresh coffee beans at home.', folder: 'Electric Coffee Grinder', images: ['coffee-grinder-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'home-appliances'
    },
    {
        id: 'bluetooth-car-kit', name: 'Bluetooth Car Kit Handsfree', price: 900, rating: 3.8, reviews: 60, shippingLoc: 'Local Shipping', description: 'Hands-free calls and music streaming in car.', folder: 'Bluetooth Car Kit Handsfree', images: ['car-kit-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'automotive'
    },
    {
        id: 'portable-charger', name: 'Portable Charger 10000mAh', price: 1800, rating: 4.2, reviews: 250, shippingLoc: 'Local Shipping', description: 'Compact power bank for smartphones.', folder: 'Portable Charger 10000mAh', images: ['portable-charger-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'electronics'
    },
    {
        id: 'smart-scale-bluetooth', name: 'Smart Body Weight Scale Bluetooth', price: 3500, rating: 4.4, reviews: 100, shippingLoc: 'Overseas', description: 'Tracks weight, BMI, body fat via app.', folder: 'Smart Body Weight Scale Bluetooth', images: ['smart-scale-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'health-beauty'
    },
    {
        id: 'security-camera-outdoor', name: 'Outdoor Wireless Security Camera', price: 8000, rating: 4.5, reviews: 180, shippingLoc: 'Nairobi', description: 'Weatherproof camera with 2-way audio.', folder: 'Outdoor Wireless Security Camera', images: ['outdoor-cam-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'electronics'
    },
    {
        id: 'smart-tv-stick', name: 'Smart TV Stick 4K', price: 5000, rating: 4.3, reviews: 220, shippingLoc: 'Local Shipping', description: 'Turn any TV into a smart TV with 4K streaming.', folder: 'Smart TV Stick 4K', images: ['tv-stick-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'electronics'
    },
    {
        id: 'robot-lawn-mower', name: 'Robotic Lawn Mower', price: 50000, rating: 4.0, reviews: 30, shippingLoc: 'Nairobi', description: 'Automated lawn care for a perfect yard.', folder: 'Robotic Lawn Mower', images: ['lawn-mower-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'home'
    },
    {
        id: 'portable-speaker-waterproof', name: 'Waterproof Portable Bluetooth Speaker', price: 2000, rating: 4.6, reviews: 150, shippingLoc: 'Local Shipping', description: 'Ideal for pool parties and beach outings.', folder: 'Waterproof Portable Bluetooth Speaker', images: ['waterproof-speaker-1.webp', 'image-2.webp', 'image-3.webp', 'image-4.webp', 'image-5.webp', 'image-6.webp'], category: 'electronics'
    },
];

// Top Picks Section: Selecting 3 products from the main productData
const topPicks = [
    productData.find(p => p.id === 'samsung-s25-ultra'),
    productData.find(p => p.id === 'vitron-32-tv'),
    productData.find(p => p.id === 'air-fryer-v2')
].filter(Boolean); // Ensure no 'undefined' items if a product ID isn't found

// --- Refined renderProducts function to fit the new HTML structure and filtering logic ---
/**
 * Renders a list of products into a specified HTML container.
 * @param {Array<Object>} products - The array of product objects to render.
 * @param {string} containerId - The ID of the HTML element where products should be rendered.
 * @param {string} cardClass - The CSS class to apply to each product card.
 * @param {boolean} append - If true, appends products; otherwise, replaces.
 */
function renderProducts(products, containerId, cardClass, append = false) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found.`);
        return;
    }

    if (!append) {
        container.innerHTML = ''; // Clear existing content if not appending
        // Only reset currentProductsShown if we're rendering the main grid from scratch
        if (containerId === 'all-products-container') {
            currentProductsShown = 0;
        }
    }

    const productsToRenderNow = (containerId === 'all-products-container') ?
                                products.slice(currentProductsShown, currentProductsShown + productsPerPage) :
                                products; // For top picks, render all provided

    if (productsToRenderNow.length === 0 && !append) {
        if (containerId === 'all-products-container') {
            noProductsMessage.classList.remove('hidden');
            imallLoadMoreButton.classList.add('hidden');
        }
        return;
    } else {
        if (containerId === 'all-products-container') {
            noProductsMessage.classList.add('hidden');
        }
    }

    productsToRenderNow.forEach(product => {
        const productElement = document.createElement('a'); // Changed to <a> for clickable cards
        productElement.href = `imall-product-detail.html?id=${product.id}`; // Link to detail page
        productElement.classList.add(cardClass);
        productElement.classList.add('imall-product-card'); // Ensure this base class is always added

        // Get the primary image path, with fallback to placeholder.png
        const imageUrl = getProductImagePath(product.folder, product.images[0]);

        productElement.innerHTML = `
            <img src="${imageUrl}" alt="${product.name}"
                 onerror="this.onerror=null;this.src='${IMAGE_BASE_PATH}${PLACEHOLDER_IMAGE}';"
                 loading="lazy">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">KSh ${product.price.toLocaleString()}</p>
                ${product.oldPrice ? `<p class="old-price">KSh ${product.oldPrice.toLocaleString()}</p>` : ''}
                ${product.discount ? `<span class="discount">${product.discount}% Off</span>` : ''}
                <p class="rating">Rating: ${product.rating} (${product.reviews} reviews)</p>
                <p class="shipping">Shipping: ${product.shippingLoc}</p>
                <p class="description">${product.description.substring(0, 100)}...</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
        container.appendChild(productElement);
    });

    if (containerId === 'all-products-container') {
        currentProductsShown += productsToRenderNow.length;
        // Show/hide load more button
        if (currentProductsShown < products.length) {
            imallLoadMoreButton.classList.remove('hidden');
        } else {
            imallLoadMoreButton.classList.add('hidden');
        }
    }
}


// --- Main DOMContentLoaded Listener ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Element References (UPDATED IDs to match new HTML) ---
    const imallSearchInput = document.getElementById('imall-search-input');
    const imallSearchButton = document.getElementById('imall-search-button');
    const imallFilterCategorySelect = document.getElementById('imall-filter-category-select'); // Changed ID
    const imallFilterPrice = document.getElementById('imall-filter-price');
    const imallSortBy = document.getElementById('imall-sort-by');
    const imallResetFiltersButton = document.getElementById('imall-reset-filters');
    const imallProductGridContainer = document.getElementById('all-products-container'); // This is the main grid
    const imallLoadMoreButton = document.getElementById('imall-load-more');
    const noProductsMessage = document.getElementById('no-products-message'); // Add a message for no products

    // Sidebar Category Toggles
    const imallCategoriesSidebar = document.querySelector('.imall-categories-sidebar');
    const sidebarTitle = document.querySelector('.imall-categories-sidebar .sidebar-title');

    // Feature Under Development Message
    const featureDevelopmentMessage = document.getElementById('feature-development-message');
    const closeFeatureMessageBtn = document.getElementById('close-feature-message');
    const continueExploringBtn = document.getElementById('continue-exploring');


    let allProducts = [...productData]; // Use spread to create a shallow copy
    let filteredProducts = [];
    let productsPerPage = 9; // Number of products to show initially and per load
    let currentProductsShown = 0; // Tracks how many products are currently displayed in the main grid


    // --- Functions (adapted from previous proposals) ---

    // Function to apply all filters and sorting
    function applyFiltersAndSort() {
        let currentProducts = [...allProducts]; // Start with all products

        // 1. Search Filter
        const searchTerm = imallSearchInput ? imallSearchInput.value.toLowerCase().trim() : '';
        if (searchTerm) {
            currentProducts = currentProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                (product.category && product.category.toLowerCase().includes(searchTerm)) || // Check category if exists
                (product.shippingLoc && product.shippingLoc.toLowerCase().includes(searchTerm))
            );
        }

        // 2. Category Filter (from select dropdown)
        const selectedCategory = imallFilterCategorySelect ? imallFilterCategorySelect.value : 'all';
        if (selectedCategory !== 'all') {
            currentProducts = currentProducts.filter(product => product.category === selectedCategory);
        }

        // 3. Price Filter
        const selectedPriceRange = imallFilterPrice ? imallFilterPrice.value : 'all';
        if (selectedPriceRange !== 'all') {
            currentProducts = currentProducts.filter(product => {
                if (selectedPriceRange === 'under-1000') return product.price < 1000;
                if (selectedPriceRange === '1000-5000') return product.price >= 1000 && product.price <= 5000;
                if (selectedPriceRange === '5000-10000') return product.price >= 5000 && product.price <= 10000;
                if (selectedPriceRange === 'over-10000') return product.price > 10000;
                return true;
            });
        }

        // 4. Sorting
        const sortBy = imallSortBy ? imallSortBy.value : 'name-asc';
        currentProducts.sort((a, b) => {
            if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
            if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            if (sortBy === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0); // Requires 'newArrival' in data
            if (sortBy === 'popularity') return b.rating - a.rating; // Requires 'rating' in data
            return 0;
        });

        filteredProducts = currentProducts; // Update the globally filtered products
        renderProducts(filteredProducts, 'all-products-container', 'product-card', false); // Re-render main grid from scratch
    }

    // Function to populate categories in the select dropdown (optional, can be hardcoded)
    function populateCategories() {
        if (!imallFilterCategorySelect) return;
        const categories = [...new Set(productData.map(p => p.category))].sort();
        categories.forEach(category => {
            if (category) { // Ensure category exists
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category.charAt(0).toUpperCase() + category.slice(1); // Capitalize
                imallFilterCategorySelect.appendChild(option);
            }
        });
    }

    // --- Event Listeners ---

    // Search and Filter Listeners
    if (imallSearchButton) imallSearchButton.addEventListener('click', applyFiltersAndSort);
    if (imallSearchInput) imallSearchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applyFiltersAndSort();
    });
    if (imallFilterCategorySelect) imallFilterCategorySelect.addEventListener('change', applyFiltersAndSort);
    if (imallFilterPrice) imallFilterPrice.addEventListener('change', applyFiltersAndSort);
    if (imallSortBy) imallSortBy.addEventListener('change', applyFiltersAndSort);

    // Reset Filters Button
    if (imallResetFiltersButton) {
        imallResetFiltersButton.addEventListener('click', () => {
            if (imallSearchInput) imallSearchInput.value = '';
            if (imallFilterCategorySelect) imallFilterCategorySelect.value = 'all';
            if (imallFilterPrice) imallFilterPrice.value = 'all';
            if (imallSortBy) imallSortBy.value = 'name-asc'; // Reset to default sort
            applyFiltersAndSort();
            console.log('iMall filters reset.');
        });
    }

    // Load More Button
    if (imallLoadMoreButton) {
        imallLoadMoreButton.addEventListener('click', () => {
            renderProducts(filteredProducts, 'all-products-container', 'product-card', true); // Append more products
        });
    }

    // Sidebar Category Toggle (for the expanded/collapsed behavior)
    if (sidebarTitle && imallCategoriesSidebar) {
        sidebarTitle.addEventListener('click', () => {
            imallCategoriesSidebar.classList.toggle('expanded'); // Toggles a class for CSS control
        });
    }

    // Category Link Filtering (from sidebar links)
    const categoryLinks = document.querySelectorAll('.imall-categories-sidebar .category-list a');
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const category = link.dataset.category; // Get category from data-category attribute
            if (imallFilterCategorySelect) {
                imallFilterCategorySelect.value = category || 'all'; // Set the select dropdown
            }
            applyFiltersAndSort();
            // Optional: Visually highlight the active category in the sidebar
            categoryLinks.forEach(l => l.parentElement.classList.remove('active'));
            link.parentElement.classList.add('active');
        });
    });

    // Feature Under Development Message (Basic toggle logic)
    if (featureDevelopmentMessage) {
        // You might want to show this conditionally based on user state or a feature flag
        // For now, let's assume it starts hidden and can be triggered
        // featureDevelopmentMessage.classList.remove('hidden'); // Uncomment to show on load for testing

        if (closeFeatureMessageBtn) {
            closeFeatureMessageBtn.addEventListener('click', () => {
                featureDevelopmentMessage.classList.add('hidden');
            });
        }
        if (continueExploringBtn) {
            continueExploringBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent page reload
                featureDevelopmentMessage.classList.add('hidden');
            });
        }
    }


    // --- Initializations on Load ---
    populateCategories(); // Populate category dropdown
    renderProducts(allProducts, 'all-products-container', 'product-card', false); // Render all products initially to the main grid
    renderProducts(topPicks, 'top-picks-container', 'product-card', false); // Render top picks
    // Note: 'product-card' class is used for both for simplicity; adjust CSS for 'top-pick-card' if needed
});