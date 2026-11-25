const dns = require('dns');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../.env') });

if ((process.env.MONGODB_URI || '').startsWith('mongodb+srv://')) {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
}

const Product = require('../models/Product');
const Category = require('../models/Category');
const Brand = require('../models/Brand');
const Offer = require('../models/Offer');
const Colour = require('../models/Colour');
const BlogPost = require('../models/BlogPost');

const categoriesData = [
  {
    name: 'Interior Paints',
    slug: 'interior-paints',
    description: 'High sheen, washable luxury emulsions and smooth interior finishes for living spaces and bedrooms.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    popularUses: ['Living Rooms', 'Bedrooms', 'Dining Areas', 'Ceilings'],
  },
  {
    name: 'Exterior Paints',
    slug: 'exterior-paints',
    description: 'Weatherproof, UV-resistant exterior emulsions engineered to withstand extreme rains, sun, and dirt.',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    popularUses: ['Exterior Façades', 'Boundary Walls', 'Balconies', 'Terraces'],
  },
  {
    name: 'Waterproofing',
    slug: 'waterproofing',
    description: 'Advanced polymer sealants and membranes preventing terrace seepage, wall dampness, and efflorescence.',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    popularUses: ['Roof Slabs', 'Bathrooms', 'Sunken Slabs', 'Retaining Walls'],
  },
  {
    name: 'Wood Coatings',
    slug: 'wood-coatings',
    description: 'Polyurethane and Italian wood finishes, melamine polish, and wood stains that preserve natural timber grain.',
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    popularUses: ['Teak Doors', 'Wooden Furniture', 'Cabinets', 'Hardwood Decks'],
  },
  {
    name: 'Metal Paints',
    slug: 'metal-paints',
    description: 'Anti-corrosive synthetic enamels providing brilliant gloss and rust barrier for metal fixtures and gates.',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
    popularUses: ['Iron Grills', 'Main Gates', 'Metal Railings', 'Pipes'],
  },
  {
    name: 'Putty',
    slug: 'putty',
    description: 'White cement and acrylic wall putties ensuring silky-smooth leveling and optimum paint adhesion.',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    popularUses: ['Plaster Surface Leveling', 'Crack Filling', 'Base Preparation'],
  },
  {
    name: 'Primer',
    slug: 'primer',
    description: 'Deep penetrating water-thinnable and solvent primers sealing porous surfaces for superior paint longevity.',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    popularUses: ['New Masonry Walls', 'Alkali Resistance', 'Sealing Chalky Walls'],
  },
  {
    name: 'Brushes & Tools',
    slug: 'brushes-tools',
    description: 'Professional synthetic bristle brushes, microfiber roller sleeves, masking tapes, and sanding tools.',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    popularUses: ['Precision Edging', 'Even Roller Application', 'Surface Prep'],
  },
];

const brandsData = [
  {
    name: 'Asian Paints',
    slug: 'asian-paints',
    tagLine: 'Har Ghar Kuch Kehta Hai',
    description: "India's leading paint company renowned for Royale Luxury Emulsion, Apex Ultima, and TruCare innovations.",
    logo: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    establishedYear: 1942,
    authorizedDealer: true,
    featuredCategories: ['Interior Paints', 'Exterior Paints', 'Waterproofing'],
  },
  {
    name: 'Berger',
    slug: 'berger',
    tagLine: 'Paint Your Imagination',
    description: 'Global coatings pioneer famous for Silk Breathe Easy, WeatherCoat Long Life, and Express Painting expertise.',
    logo: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    establishedYear: 1923,
    authorizedDealer: true,
    featuredCategories: ['Interior Paints', 'Exterior Paints'],
  },
  {
    name: 'Nerolac',
    slug: 'nerolac',
    tagLine: 'Kuch Change Karo, Chalo Paint Karo',
    description: 'Trusted pioneer in ultra-low VOC and lead-free healthy Japanese technology architectural paints.',
    logo: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    establishedYear: 1920,
    authorizedDealer: true,
    featuredCategories: ['Interior Paints', 'Metal Paints', 'Wood Coatings'],
  },
  {
    name: 'Indigo',
    slug: 'indigo',
    tagLine: 'Surprises in Store',
    description: 'Distinctive specialist offering Dirtproof Exterior Emulsions, Metallic Tile Coats, and innovative ceiling formulations.',
    logo: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    establishedYear: 2000,
    authorizedDealer: true,
    featuredCategories: ['Exterior Paints', 'Interior Paints'],
  },
  {
    name: 'Birla White',
    slug: 'birla-white',
    tagLine: 'The Whitest White',
    description: 'Market leader in white cement-based WallSeal Waterproofing Putty, Textures, and Levelplast.',
    logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    establishedYear: 1988,
    authorizedDealer: true,
    featuredCategories: ['Putty', 'Primer'],
  },
  {
    name: 'Dr. Fixit',
    slug: 'dr-fixit',
    tagLine: 'Waterproofing Ka Expert',
    description: 'The most trusted waterproofing specialist for roofs, walls, water tanks, basements, and repairs.',
    logo: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=300&q=80',
    bannerImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    establishedYear: 2001,
    authorizedDealer: true,
    featuredCategories: ['Waterproofing'],
  },
];

const productsData = [
  {
    name: 'Asian Paints Royale Luxury Emulsion',
    slug: 'asian-paints-royale-luxury-emulsion',
    brand: 'Asian Paints',
    category: 'Interior Paints',
    description: 'A luxurious interior emulsion that delivers a smooth, radiant sheen with Teflon surface protection for stain resistance.',
    price: 580,
    unit: 'Litre',
    packSizes: [
      { size: '1L', price: 580 },
      { size: '4L', price: 2250 },
      { size: '10L', price: 5400 },
      { size: '20L', price: 10400 },
    ],
    coverageSqFtPerLitre: 140,
    finishes: ['Soft Sheen', 'Velvet Matte'],
    features: ['Teflon Stain Guard', 'Anti-Bacterial', 'Ultra Washable', 'Low Odour VOC'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    numReviews: 128,
    warrantyYears: 5,
    isFeatured: true,
  },
  {
    name: 'Asian Paints Apex Ultima Protek',
    slug: 'asian-paints-apex-ultima-protek',
    brand: 'Asian Paints',
    category: 'Exterior Paints',
    description: 'Laminated exterior paint system engineered with nanotechnology and structural fiber reinforcement for 10-year durability.',
    price: 640,
    unit: 'Litre',
    packSizes: [
      { size: '1L', price: 640 },
      { size: '4L', price: 2480 },
      { size: '20L', price: 11800 },
    ],
    coverageSqFtPerLitre: 120,
    finishes: ['Rich Sheen'],
    features: ['10-Year Performance Warranty', 'Structural Crack Bridging', 'Algae & Fungus Proof'],
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.8,
    numReviews: 94,
    warrantyYears: 10,
    isFeatured: true,
  },
  {
    name: 'Berger Silk Breathe Easy',
    slug: 'berger-silk-breathe-easy',
    brand: 'Berger',
    category: 'Interior Paints',
    description: 'Luxury interior emulsion with air-purifying capability that absorbs harmful indoor formaldehyde and provides silky walls.',
    price: 520,
    unit: 'Litre',
    packSizes: [
      { size: '1L', price: 520 },
      { size: '4L', price: 2000 },
      { size: '10L', price: 4850 },
    ],
    coverageSqFtPerLitre: 135,
    finishes: ['Silk Sheen'],
    features: ['Formaldehyde Air Purifier', 'Ultra-Low Odour', 'Rich Silky Texture', 'Stain Resistant'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.7,
    numReviews: 65,
    warrantyYears: 5,
    isFeatured: true,
  },
  {
    name: 'Berger WeatherCoat Long Life 10',
    slug: 'berger-weathercoat-long-life-10',
    brand: 'Berger',
    category: 'Exterior Paints',
    description: 'Heavy-duty PU & silicon enriched exterior coating that stays dust-free and resists severe heavy monsoon rains.',
    price: 610,
    unit: 'Litre',
    packSizes: [
      { size: '4L', price: 2380 },
      { size: '20L', price: 11200 },
    ],
    coverageSqFtPerLitre: 115,
    finishes: ['High Sheen'],
    features: ['PU & Silicon Tech', 'Dust Guard Formula', '10 Years Sealed Protection'],
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.8,
    numReviews: 52,
    warrantyYears: 10,
    isFeatured: false,
  },
  {
    name: 'Dr. Fixit Raincoat Waterproof Coating',
    slug: 'dr-fixit-raincoat-waterproof-coating',
    brand: 'Dr. Fixit',
    category: 'Waterproofing',
    description: 'High build elastomeric exterior waterproofing acrylic coating that forms a seamless, crack-bridging shield.',
    price: 490,
    unit: 'Litre',
    packSizes: [
      { size: '1L', price: 490 },
      { size: '4L', price: 1920 },
      { size: '20L', price: 8900 },
    ],
    coverageSqFtPerLitre: 80,
    finishes: ['Elastomeric Sheen'],
    features: ['Bridges up to 2mm Cracks', 'Zero Water Penetration', '100% Breathable Polymer'],
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    numReviews: 110,
    warrantyYears: 7,
    isFeatured: true,
  },
  {
    name: 'Dr. Fixit LW+ Waterproofing Compound',
    slug: 'dr-fixit-lw-plus-waterproofing-compound',
    brand: 'Dr. Fixit',
    category: 'Waterproofing',
    description: 'Integral liquid waterproofing compound for concrete, plastering mortar, preventing efflorescence and dampness from ground up.',
    price: 180,
    unit: 'Litre',
    packSizes: [
      { size: '1L', price: 180 },
      { size: '5L', price: 850 },
      { size: '20L', price: 3100 },
    ],
    coverageSqFtPerLitre: 200,
    finishes: ['Integral Liquid'],
    features: ['Increases Mortar Strength', 'Stops Bleeding & Segregation', 'Prevents Rebar Corrosion'],
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    numReviews: 140,
    warrantyYears: 10,
    isFeatured: false,
  },
  {
    name: 'Birla White WallCare Putty',
    slug: 'birla-white-wallcare-putty',
    brand: 'Birla White',
    category: 'Putty',
    description: 'White cement-based polymer modified wall putty that creates an impeccably smooth, water-resistant canvas for luxury paint.',
    price: 42,
    unit: 'Kg',
    packSizes: [
      { size: '5Kg', price: 230 },
      { size: '20Kg', price: 790 },
      { size: '40Kg', price: 1480 },
    ],
    coverageSqFtPerLitre: 18,
    finishes: ['Smooth Matte White'],
    features: ['Extra White Luminescence', 'Water Resistant Barrier', 'Zero Flaking Formula'],
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    numReviews: 210,
    warrantyYears: 3,
    isFeatured: true,
  },
  {
    name: 'Nerolac Impressions HD Luxury Emulsion',
    slug: 'nerolac-impressions-hd-luxury-emulsion',
    brand: 'Nerolac',
    category: 'Interior Paints',
    description: 'Micro-gel pigment technology offering ultra HD color depth, silky sheen, and stain-resistant cleanability.',
    price: 540,
    unit: 'Litre',
    packSizes: [
      { size: '1L', price: 540 },
      { size: '4L', price: 2100 },
      { size: '10L', price: 5100 },
    ],
    coverageSqFtPerLitre: 145,
    finishes: ['High Definition Sheen'],
    features: ['High Definition Colors', 'Silver Ion Antibacterial', 'Stain Repellent'],
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.7,
    numReviews: 48,
    warrantyYears: 5,
    isFeatured: false,
  },
  {
    name: 'Indigo Dirtproof & Waterproof Exterior Emulsion',
    slug: 'indigo-dirtproof-and-waterproof-exterior-emulsion',
    brand: 'Indigo',
    category: 'Exterior Paints',
    description: 'Pioneering formulation incorporating cross-linking polymers that actively shed airborne dirt during rains.',
    price: 570,
    unit: 'Litre',
    packSizes: [
      { size: '4L', price: 2200 },
      { size: '20L', price: 10200 },
    ],
    coverageSqFtPerLitre: 125,
    finishes: ['Silicone Matt'],
    features: ['Self-Cleaning During Monsoons', 'Bio-Resistant', 'High UV Reflection'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.6,
    numReviews: 39,
    warrantyYears: 7,
    isFeatured: false,
  },
  {
    name: 'Asian Paints WoodTech PU Luxury Finish',
    slug: 'asian-paints-woodtech-pu-luxury-finish',
    brand: 'Asian Paints',
    category: 'Wood Coatings',
    description: 'High clarity polyurethane wood coating highlighting natural timber veins with excellent heat and scratch resistance.',
    price: 680,
    unit: 'Litre',
    packSizes: [
      { size: '1L', price: 680 },
      { size: '4L', price: 2600 },
    ],
    coverageSqFtPerLitre: 100,
    finishes: ['High Gloss', 'Matt PU'],
    features: ['Non-Yellowing Formula', 'Scratch & Heat Resistant', 'Preserves Wood Grain'],
    image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.8,
    numReviews: 44,
    warrantyYears: 5,
    isFeatured: false,
  },
  {
    name: 'Berger Luxol High Gloss Enamel',
    slug: 'berger-luxol-high-gloss-enamel',
    brand: 'Berger',
    category: 'Metal Paints',
    description: 'Mirror-like synthetic enamel ideal for decorative and protective coating on metal gates, iron grills, and industrial doors.',
    price: 360,
    unit: 'Litre',
    packSizes: [
      { size: '500ml', price: 190 },
      { size: '1L', price: 360 },
      { size: '4L', price: 1380 },
    ],
    coverageSqFtPerLitre: 160,
    finishes: ['Mirror High Gloss'],
    features: ['Anti-Corrosion Rust Shield', 'Tough Film Toughness', 'Washable High Sheen'],
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.7,
    numReviews: 76,
    warrantyYears: 3,
    isFeatured: false,
  },
  {
    name: 'Asian Paints Decoprime Water Thinnable Primer',
    slug: 'asian-paints-decoprime-water-thinnable-primer',
    brand: 'Asian Paints',
    category: 'Primer',
    description: 'Premium acrylic primer providing optimum adhesion and alkali resistance for both interior and exterior walls.',
    price: 210,
    unit: 'Litre',
    packSizes: [
      { size: '1L', price: 210 },
      { size: '4L', price: 790 },
      { size: '20L', price: 3600 },
    ],
    coverageSqFtPerLitre: 160,
    finishes: ['Matt Base'],
    features: ['Deep Penetration', 'Anti-Alkali Barrier', 'Excellent Paint Anchor'],
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.8,
    numReviews: 89,
    warrantyYears: 3,
    isFeatured: false,
  },
  {
    name: 'GK Pro Microfiber Roller & Tray Master Kit',
    slug: 'gk-pro-microfiber-roller-tray-master-kit',
    brand: 'Asian Paints',
    category: 'Brushes & Tools',
    description: 'Heavy duty 9-inch microfiber roller sleeve with ergonomically balanced grip, heavy-gauge ribbed paint tray, and 2-inch angular brush.',
    price: 450,
    unit: 'Kit',
    packSizes: [{ size: 'Standard Set', price: 450 }],
    coverageSqFtPerLitre: 0,
    finishes: ['Professional Tool'],
    features: ['Zero Bristle Shedding', 'High Paint Pickup Capacity', 'Ergonomic Rubber Grip'],
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80',
    inStock: true,
    rating: 4.9,
    numReviews: 104,
    warrantyYears: 1,
    isFeatured: false,
  },
];

const coloursData = [
  {
    name: 'Morning Mist Blue',
    code: 'GK-7201',
    hex: '#7FA1B3',
    category: 'Cool',
    family: 'Blue',
    mood: 'Tranquil & Refreshing',
    roomSuitability: ['Living Room', 'Master Bedroom', 'Study'],
    complementaryHex: ['#E6ECEF', '#D19A66', '#2F3E46'],
    description: 'A soothing sky-washed blue evoking calm morning horizon, perfect for Indian summer climates.',
    isPopular: true,
    brandInspiration: 'Asian Paints',
  },
  {
    name: 'Royal Saffron Glow',
    code: 'GK-1402',
    hex: '#D97724',
    category: 'Warm',
    family: 'Yellow-Orange',
    mood: 'Inviting & Festively Opulent',
    roomSuitability: ['Dining Room', 'Puja Room', 'Feature Wall'],
    complementaryHex: ['#FFF8E7', '#355E3B', '#800020'],
    description: 'An auspicious deep marigold saffron hue that warms up traditional brass fixtures and teakwood.',
    isPopular: true,
    brandInspiration: 'Asian Paints',
  },
  {
    name: 'Pristine Alabaster',
    code: 'GK-0012',
    hex: '#F4F1EA',
    category: 'Neutrals',
    family: 'Off-White',
    mood: 'Airy, Timeless & Elegant',
    roomSuitability: ['All Interior Rooms', 'Ceilings', 'Hallways'],
    complementaryHex: ['#2B2B2A', '#8F9779', '#D1B490'],
    description: 'A warm, sophisticated off-white with micro beige undertones that never feels sterile.',
    isPopular: true,
    brandInspiration: 'Birla White',
  },
  {
    name: 'Nilgiri Pine Green',
    code: 'GK-3105',
    hex: '#2E5A44',
    category: 'Vibrant',
    family: 'Green',
    mood: 'Grounded, Luxurious & Botanical',
    roomSuitability: ['Living Room Accent', 'Executive Office', 'Foyer'],
    complementaryHex: ['#F2EBD9', '#C5A059', '#1A2E26'],
    description: 'A deep botanical evergreen drawn from the misty western ghats, offering immense sophistication.',
    isPopular: true,
    brandInspiration: 'Berger',
  },
  {
    name: 'Jaipur Dusty Rose',
    code: 'GK-8021',
    hex: '#C88D87',
    category: 'Pastels',
    family: 'Pink',
    mood: 'Romantic, Soothing & Chic',
    roomSuitability: ['Bedrooms', 'Powder Room', 'Walk-in Wardrobe'],
    complementaryHex: ['#FAF0E6', '#4A5B53', '#8C7A6B'],
    description: 'Muted earthen terracotta blush inspired by the historic architecture of the Pink City.',
    isPopular: true,
    brandInspiration: 'Nerolac',
  },
  {
    name: 'Graphite Charcoal',
    code: 'GK-9004',
    hex: '#33383F',
    category: 'Monochrome',
    family: 'Black & Grey',
    mood: 'Bold, Architectural & Modern',
    roomSuitability: ['Media Room', 'Accent Wall', 'Metal Railings'],
    complementaryHex: ['#F7F7F7', '#E5A93C', '#99A1A6'],
    description: 'A refined velvety dark charcoal that provides dramatic depth behind artwork and modern shelving.',
    isPopular: false,
    brandInspiration: 'Asian Paints',
  },
  {
    name: 'Coastal Dune Ochre',
    code: 'GK-2109',
    hex: '#D2AC79',
    category: 'Warm',
    family: 'Earth',
    mood: 'Sun-drenched & Organic',
    roomSuitability: ['Living Room', 'Exterior Façade', 'Balcony'],
    complementaryHex: ['#3A506B', '#F5EBE0', '#5B7065'],
    description: 'Golden earthen tone capturing coastal sandbars and raw linen textures.',
    isPopular: false,
    brandInspiration: 'Indigo',
  },
  {
    name: 'Kashmir Lavender Bloom',
    code: 'GK-5541',
    hex: '#B8A8D0',
    category: 'Pastels',
    family: 'Violet',
    mood: 'Delicate, Dreamy & Calming',
    roomSuitability: ['Kids Room', 'Guest Bedroom', 'Reading Nook'],
    complementaryHex: ['#F9F8F6', '#6E6B80', '#D6B485'],
    description: 'Subtle aromatic lavender shade designed to alleviate daily anxiety and create a restful refuge.',
    isPopular: false,
    brandInspiration: 'Berger',
  },
];

const offersData = [
  {
    title: 'Festive Home Makeover Bonanza',
    code: 'FESTIVE25',
    discount: '25% OFF',
    description: 'Flat 25% discount on premium Royale & Silk luxury interior emulsions for full-home orders above ₹20,000.',
    category: 'Interior Paints',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    validFrom: new Date('2026-01-01'),
    validTill: new Date('2027-12-31'),
    terms: ['Minimum purchase ₹20,000', 'Valid on Asian Paints & Berger luxury interior ranges', 'Cannot be combined with contractor wholesale tiers'],
    badge: 'Popular Deal',
    isActive: true,
  },
  {
    title: 'Monsoon Shield Waterproofing Package',
    code: 'MONSOON20',
    discount: '20% OFF',
    description: 'Comprehensive discount on Dr. Fixit Raincoat and Roof sealers plus complimentary moisture measurement check.',
    category: 'Waterproofing',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    validFrom: new Date('2026-01-01'),
    validTill: new Date('2027-12-31'),
    terms: ['Valid on 20L containers of Dr. Fixit Raincoat and LW+', 'Includes free digital wall moisture check by GK technician'],
    badge: 'Seasonal Protection',
    isActive: true,
  },
  {
    title: 'Free Virtual Painter & Color Consultation',
    code: 'FREEVISIT',
    discount: '100% FREE',
    description: 'Book our certified paint engineer for on-site wall laser area measurement, dampness diagnosis, and 3D preview.',
    category: 'All Products',
    image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80',
    validFrom: new Date('2026-01-01'),
    validTill: new Date('2027-12-31'),
    terms: ['Valid for all residential addresses within city limits', 'Advance booking required 24 hours prior'],
    badge: 'Zero Cost',
    isActive: true,
  },
];

const blogPostsData = [
  {
    title: 'How to Choose the Perfect Living Room Palette for Indian Light',
    slug: 'choose-living-room-palette-indian-light',
    excerpt: 'Discover how daylight orientation and warm artificial light transform paint shades from morning to dusk in Indian homes.',
    content: `When designing the heart of an Indian home, natural light plays a monumental role. North-facing rooms receive cool, diffused illumination throughout the day, which can make stark whites look icy or grey. For these spaces, warm neutrals with yellow or peach undertones—such as Mysore Silk Cream or Pristine Alabaster—restore welcoming vitality.

Conversely, south and west-facing rooms receive blazing, intense afternoon sun. Here, balancing cool tones like Morning Mist Blue or Nilgiri Pine Green absorb glare and keep the atmosphere tranquil. When transitioning to evening 2700K warm LED lighting, test your chosen swatch under artificial illumination before committing to 20-litre barrels.`,
    category: 'Colour Consultation',
    author: 'G.K Design Studio',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 5,
    tags: ['Colour Guide', 'Living Room', 'Lighting Tips'],
    publishedAt: new Date(),
  },
  {
    title: 'Permanent Waterproofing: Pre-Monsoon Guide for Terrace & Walls',
    slug: 'permanent-waterproofing-pre-monsoon-guide',
    excerpt: 'Prevent peeling paint and efflorescence salt deposits by diagnosing capillary water seepage before the rains arrive.',
    content: `Waterproofing is not merely a topcoat; it is an integrated hydraulic barrier. If moisture is trapped inside concrete slabs, expensive interior luxury emulsions will inevitably blister and peel within six months.

The golden rule is 3-step defense:
1. Crack Sealing: Fill all hairline structural plaster fissures using elastomeric crack-fill compounds.
2. Primer Anchor: Apply a high-alkali barrier primer like Asian Paints Decoprime or Dr. Fixit Primeseal.
3. Membrane Barrier: Apply two perpendicular coats of elastomeric exterior coating (such as Dr. Fixit Raincoat) that stretches up to 2mm to bridge future thermal building movements.`,
    category: 'Waterproofing & Tech',
    author: 'Senior Technical Lead',
    image: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 6,
    tags: ['Waterproofing', 'Dr Fixit', 'Monsoon Care'],
    publishedAt: new Date(),
  },
  {
    title: 'Matte vs Silk vs Gloss: Which Sheen Belongs in Your Home?',
    slug: 'matte-vs-silk-vs-gloss-sheen-guide',
    excerpt: 'A comprehensive guide on paint sheens, durability, washability, and concealing wall imperfections.',
    content: `Choosing the right colour is only half the journey; selecting the appropriate sheen determines how durable, washable, and light-reflective your walls will be.

- Ultra Matte: Reflects virtually zero glare. Perfect for master bedrooms, ceilings, and uneven plaster surfaces because it masks minor trowel undulations.
- Satin & Silk Sheen: The gold standard for modern family living rooms and children’s rooms. Offers moderate light reflection and high scrub resistance against turmeric stains and crayon marks.
- High Gloss: Extremely tough and water-repellent. Best reserved for iron gates, metal grills, teak trims, and kitchen cabinet panels.`,
    category: 'Paint Selection',
    author: 'Paint Technologist',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    readTimeMinutes: 4,
    tags: ['Sheen Guide', 'Interior Finishes', 'Maintenance'],
    publishedAt: new Date(),
  },
];

async function seedDatabase() {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gk_traders_paints';
    console.log(`Connecting to MongoDB for seeding at: ${mongoURI}`);
    await mongoose.connect(mongoURI);

    console.log('Clearing old collections...');
    await Promise.all([
      Category.deleteMany({}),
      Brand.deleteMany({}),
      Product.deleteMany({}),
      Colour.deleteMany({}),
      Offer.deleteMany({}),
      BlogPost.deleteMany({}),
    ]);

    console.log('Inserting Categories...');
    await Category.insertMany(categoriesData);

    console.log('Inserting Brands...');
    await Brand.insertMany(brandsData);

    console.log('Inserting Products...');
    await Product.insertMany(productsData);

    console.log('Inserting Colours...');
    await Colour.insertMany(coloursData);

    console.log('Inserting Offers...');
    await Offer.insertMany(offersData);

    console.log('Inserting Blog Posts...');
    await BlogPost.insertMany(blogPostsData);

    console.log(' Seeding completed successfully! All G.K Traders Paints data is live in MongoDB.');
    process.exit(0);
  } catch (error) {
    console.error(' Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
