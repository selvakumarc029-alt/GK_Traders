# G.K Traders Paints – Professional MERN Full-Stack Website

Welcome to the official, production-ready full-stack web application for **G.K Traders Paints**, an authorized paint distributor and tinting center representing **Asian Paints, Berger, Nerolac, Indigo, Birla White, and Dr. Fixit**.

---

## 🌟 Key Features

1. **Complete Brand & Category Catalog:**
   - 8 Major Architectural Categories: Interior Paints, Exterior Paints, Waterproofing, Wood Coatings, Metal Paints, Putty, Primer, Brushes & Tools.
   - Genuine Brand Showcases: Asian Paints, Berger, Nerolac, Indigo, Birla White, Dr. Fixit.
   - Dynamic product search, category filtering, brand filtering, and real-time stock/pricing specs.
2. **Interactive Paint Calculator:**
   - Calculate gross wall area, automatically deduct doors (~21 sq.ft) & windows (~15 sq.ft).
   - Real-time paint quantity (litres) and estimated cost (₹) calculation.
   - Packaging breakdown recommendations (20L drums, 10L buckets, 4L cans, 1L cans).
   - Direct button to book a certified painter with calculated area prefilled.
3. **Colour Inspiration Gallery:**
   - Filter by categories: Warm, Cool, Neutrals, Pastels, Vibrant, Monochrome.
   - One-click HEX code copying to clipboard with toast notification.
   - Harmonious coordinated swatches and room suitability previews.
4. **AI Room Colour Visualizer & Split Slider:**
   - Custom room photo upload (with JPG/PNG/WEBP validation up to 10MB).
   - Live Canvas luminance masking and wall tone recoloring.
   - Touch and mouse interactive Before & After split comparison slider.
   - One-click high-resolution transformed image download.
5. **AI Colour Recommendation Engine:**
   - Synthesizes room type, natural light condition, interior style, and tone mood.
   - Generates coordinated designer palettes with hex codes, psychological rationale, and recommended paint sheens.
   - Connects to Google Gemini API (with seamless built-in fallback design matrix).
6. **Virtual Painter & Site Measurement Booking:**
   - Customer booking form with date, time slot, service type, and address.
   - Saves appointments directly to MongoDB with unique reference ID.
7. **Contact Us & Enquiry System:**
   - Form validation, MongoDB persistence, Google Maps embed, and direct WhatsApp click-to-chat.
8. **Digital Product Catalogue QR Code:**
   - Interactive modal with generated high-res QR code, one-click PNG download, and direct URL copy.
9. **Promotional Offers & Discounts:**
   - Dynamic coupon codes, validity countdowns, and terms modals.
10. **Interior Design Tips Blog:**
    - Technical articles on moisture diagnosis, sheen selection, and color theory for Indian lighting.

---

## 📂 Project Architecture

```
GK-Traders-Paints/
├── backend/
│   ├── src/
│   │   ├── config/             # Database connection (Mongoose/MongoDB)
│   │   ├── controllers/        # Business logic (Products, Categories, Brands, Offers, Enquiries, Appointments, Blogs, Colours, AI)
│   │   ├── middleware/         # Centralized Error Handler, Multer File Upload
│   │   ├── models/             # Mongoose Schemas (Product, Category, Brand, Offer, Enquiry, Appointment, BlogPost, Colour)
│   │   ├── routes/             # Express REST API routes
│   │   ├── utils/              # Database Seeder (seed.js)
│   │   └── server.js           # Express App Server Entry Point
│   ├── .env                    # Active Environment Variables
│   ├── .env.example            # Environment Template
│   └── package.json            # Backend Dependencies & Scripts
│
├── frontend/
│   ├── public/                 # Static Assets & Icons
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Toast notifications, QR Code modal
│   │   │   └── layout/         # Navbar, Footer
│   │   ├── context/            # ShopContext (Global state, toast, WhatsApp helpers)
│   │   ├── pages/              # 12 Complete Pages (Home, About, Products, ProductDetail, Colours, Calculator, Offers, Contact, AIRoomVisualizer, VirtualPainterBooking, Blog, BlogDetail)
│   │   ├── services/           # Axios API Client (api.js)
│   │   ├── App.jsx             # Main Routing & Layout
│   │   ├── index.css           # Custom Luxury Design System
│   │   └── main.jsx            # React Entry Point
│   ├── .env                    # Frontend Environment Variables
│   ├── .env.example            # Frontend Environment Template
│   ├── index.html              # HTML5 Document
│   ├── vite.config.js          # Vite Server & API Proxy
│   └── package.json            # Frontend Dependencies & Scripts
│
├── package.json                # Root Runner Package
├── run-all.js                  # Concurrent Backend & Frontend Launcher
└── README.md                   # Full Documentation
```

---

## 🛠️ Technology Stack

- **Frontend:** React 18, React Router DOM v6, Axios, Lucide React, Context API, Vite
- **Backend:** Node.js, Express 5, Mongoose, Multer, Morgan, CORS, Dotenv
- **Database:** MongoDB (Local or Atlas)
- **APIs & Integrations:** Google Maps, WhatsApp Click-to-Chat, QR Code API, Canvas Wall Tinting Engine, Google Gemini API

---

## 🚀 Quick Start & Installation

### 1. Prerequisites
- **Node.js** v18+ installed
- **MongoDB** installed and running on port `27017` (or MongoDB Atlas connection string)

### 2. Start Both Backend & Frontend from Root
You can run the entire system directly from the root workspace folder:

```bash
# In D:\GK Trades
npm run dev
```

Or start individually in separate terminals:

#### Start Backend:
```bash
cd GK-Traders-Paints/backend
npm run dev
# Server runs on http://localhost:5000
```

#### Start Frontend:
```bash
cd GK-Traders-Paints/frontend
npm run dev
# Vite runs on http://localhost:3000
```

---

## 🗄️ Database Setup & Seeding

The backend includes a comprehensive seeder populated with genuine Asian Paints, Berger, Nerolac, Indigo, Birla White, and Dr. Fixit formulations, color palettes, blog posts, and active festive coupons.

To seed or reset the database at any time:

```bash
# From root:
npm run seed

# OR from backend directory:
cd GK-Traders-Paints/backend
npm run seed
```

---

## 📡 REST API Documentation

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Server health and uptime status |
| `GET` | `/api/store-info` | Contact info, business hours, and digital catalogue URL |
| `GET` | `/api/products` | Retrieve products with category, brand, search, sort filters |
| `GET` | `/api/products/:slug` | Retrieve single product details and related items |
| `POST` | `/api/products` | Add new product to catalogue |
| `GET` | `/api/categories` | Retrieve all 8 product categories with live product count |
| `GET` | `/api/categories/:slug`| Retrieve category and its products |
| `GET` | `/api/brands` | Retrieve authorized paint brands with product counts |
| `GET` | `/api/brands/:slug` | Retrieve single brand and products |
| `GET` | `/api/colours` | Retrieve color shades with category and popular filter |
| `GET` | `/api/colours/:code` | Retrieve specific color shade |
| `GET` | `/api/offers` | Retrieve active seasonal deals and coupon codes |
| `POST` | `/api/enquiries` | Submit customer contact inquiry (persisted to MongoDB) |
| `GET` | `/api/enquiries` | Retrieve enquiries list |
| `POST` | `/api/appointments` | Book on-site painter / wall measurement appointment |
| `GET` | `/api/appointments` | Retrieve painter booking records |
| `POST` | `/api/ai/recommend` | AI room color scheme recommendation engine |
| `POST` | `/api/ai/visualize` | Upload room photo & simulate wall tint |
| `GET` | `/api/blogs` | Retrieve design guides and technical articles |
| `GET` | `/api/blogs/:slug` | Retrieve full blog post details and related articles |

---

## 📹 Demo Recording Checklist

When recording your project video demonstration or client review, follow this recommended walkthrough flow:

- [ ] **Home Page:**
  - [ ] Hero banner with brand dealer badge & CTA navigation.
  - [ ] Product categories grid showing live counts.
  - [ ] Popular products with prices, ratings, and WhatsApp quote buttons.
  - [ ] Brand showcase with Asian Paints, Berger, Nerolac, Indigo, Birla White, Dr. Fixit.
  - [ ] Color swatches with one-click HEX code copying.
  - [ ] Customer testimonials and why choose us section.
- [ ] **Products Page:**
  - [ ] Filter by Category (e.g. Interior Paints, Waterproofing).
  - [ ] Filter by Brand (e.g. Asian Paints, Dr. Fixit).
  - [ ] Live search bar filtering instantly.
  - [ ] Click "Details & Packs" to open ProductDetailPage.
  - [ ] In Product Detail: switch pack sizes (1L, 4L, 10L, 20L), test mini in-page coverage estimator, and click WhatsApp inquiry.
- [ ] **Colour Inspiration Gallery:**
  - [ ] Switch tabs (Warm, Cool, Neutrals, Pastels, Vibrant, Monochrome).
  - [ ] Click a swatch card to view complementary palette modal.
  - [ ] Copy HEX code and check the green toast notification.
- [ ] **Paint Calculator:**
  - [ ] Enter room dimensions (Length, Width, Height) and doors/windows count.
  - [ ] Show real-time calculations: Gross area, Net paintable area, Litres, and ₹ Budget.
  - [ ] Notice the can packaging breakdown (e.g. 1x 20L + 1x 4L).
  - [ ] Click "Book Painter for this Area" which navigates to booking with prefilled values.
- [ ] **AI Room Visualizer & Comparison:**
  - [ ] Drag the interactive Before & After slider left and right across the painted room.
  - [ ] Select different swatches (Morning Mist Blue, Royal Saffron, Nilgiri Pine) and watch the room update.
  - [ ] Adjust the Opacity/Coat Density slider.
  - [ ] Upload a custom room photo.
  - [ ] Fill the AI Colour Recommendation form (Room Type, Lighting, Style) and generate designer palettes.
- [ ] **Virtual Painter Booking:**
  - [ ] Fill out the appointment form with date, slot, address, and area.
  - [ ] Submit and inspect the confirmed booking reference ID banner.
- [ ] **Offers & Promotions:**
  - [ ] View active coupons and click "Copy Code".
  - [ ] Click "Terms & Conditions" to inspect modal.
- [ ] **Digital QR Catalogue:**
  - [ ] Click "Digital Catalogue" in navbar or footer.
  - [ ] Show generated QR code, copy link, and download QR button.
- [ ] **Contact Us Page:**
  - [ ] Submit contact form and observe successful MongoDB persistence message.
  - [ ] Test the interactive Google Maps embed.
  - [ ] Test the WhatsApp Click-to-Chat trigger.

---

## 🏢 Official Business Information (As per Client Card)

- **Store Name:** G.K TRADERS PAINTS
- **Primary Slogan:** YOUR TRUST. OUR PRIDE.
- **Brand Tagline:** Colouring your world with trust
- **Physical Address:** 15/5C Rajiv Gandhi Nagar, Sivakasi Main Road, opp to Cotton Research Centre, Srivilliputhur – 626125
- **Phone Numbers:** `7010499526`, `9123501787`
- **WhatsApp Support:** `+91 70104 99526`
- **Google Maps Location:** Srivilliputhur, Sivakasi Main Road, Tamil Nadu 626125
