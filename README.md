# 🛒 GreenCart — AI-Powered Multivendor Grocery E-Commerce Platform

<p align="center">
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/bottom_banner_image.png" alt="GreenCart grocery storefront" width="100%" />
</p>

<p align="center">
  <strong>A full-stack grocery shopping platform built with React, Express, MongoDB, Cloudinary, Stripe and Gemini-powered AI product discovery.</strong>
</p>

<p align="center">
  <a href="https://github.com/duttasirius/ggrocery"><img src="https://img.shields.io/github/repo-size/duttasirius/ggrocery?style=for-the-badge" alt="Repository size" /></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Node.js-ESM-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 5" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
</p>

<p align="center">
  <strong>🛍️ Multivendor Commerce</strong> &nbsp; • &nbsp;
  <strong>🤖 AI Discovery</strong> &nbsp; • &nbsp;
  <strong>🔐 Secure Authentication</strong> &nbsp; • &nbsp;
  <strong>💳 Online Payments</strong> &nbsp; • &nbsp;
  <strong>⭐ Product Reviews</strong>
</p>

---

## 📌 What is GreenCart?

**GreenCart** is a full-stack, portfolio-grade grocery e-commerce platform built to model a real online shopping experience from product discovery through checkout and order management.

It combines a modern React storefront with an Express REST API, MongoDB data models, Cloudinary media storage, Stripe payments, seller workflows and a **Gemini-powered AI shopping assistant**.

The project is intentionally more than a product catalogue. It covers the complete commerce lifecycle:

```text
Discover → Search → Product Details → Review → Cart → Address → Payment → Order → Seller Fulfillment
```

The standout feature is **AI Product Search**. Instead of requiring customers to know the exact product name, they can describe what they need naturally — for example, `healthy breakfast`, `fresh fruit`, `dairy products`, or a slightly misspelled product name. The backend combines Gemini intent understanding with deterministic catalogue matching so the feature remains useful even when the external AI service is unavailable.

---

# 🚀 Project Highlights

## 🤖 01 — AI Grocery Shopping Assistant

<p align="center">
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/ai-assistant-preview.svg" alt="GreenCart AI shopping assistant" width="900" />
</p>

GreenCart includes an interactive AI shopping assistant directly inside the storefront.

### What shoppers can do

- Search using natural language
- Search by product name
- Search by category
- Search using common grocery synonyms
- Search using use cases such as breakfast or snacks
- Search using dietary-style concepts such as healthy food
- Recover from simple product-name typos
- Open recommended products directly
- Add AI-recommended products directly to the cart

### Example queries

```text
healthy breakfast
fresh fruit
dairy products
something for breakfast
show me brown rice
vegetables for dinner
amul milk
amol milk
```

### Why this implementation is interesting

The AI layer is **not treated as the database**.

The backend first loads real, in-stock products from MongoDB. Gemini receives a controlled catalogue and is instructed to return catalogue IDs only. Those IDs are then validated against the actual MongoDB product map before anything is returned to the frontend.

This creates a safer architecture:

```text
Customer Query
      ↓
Normalize + tokenize
      ↓
Deterministic catalogue matching
      ↓
Gemini intent understanding
      ↓
Validate returned product IDs
      ↓
Merge AI + deterministic results
      ↓
Return real products
      ↓
Customer can add to cart
```

### AI reliability strategy

The application also has a deterministic fallback. If Gemini is unavailable, times out, returns malformed data, or does not find a useful result, the backend can still return catalogue matches.

This is an important e-commerce design decision: **AI enhances product discovery without becoming a single point of failure for shopping.**

Implementation:

- `client/src/components/AiProductSearch.jsx`
- `server/controllers/aiSearchController.js`

---

## 🛍️ 02 — Full E-Commerce Shopping Experience

GreenCart supports the major customer-side workflows expected from a modern online grocery store.

### Product discovery

- Homepage storefront
- Grocery categories
- Product catalogue
- Best-selling products
- Product offers
- Product details pages
- Multiple product images
- Stock-aware product display
- Related products
- AI-assisted product discovery

### Shopping

- Add to cart
- Quantity updates
- Cart persistence for authenticated users
- Buy Now flow
- Cart totals
- Delivery address selection
- Saved addresses
- Checkout

### Orders

- Cash on Delivery
- Stripe checkout
- Stripe payment verification
- User order history
- Seller order visibility

---

## 🏪 03 — Multivendor / Seller Architecture

GreenCart is structured around separate customer and seller responsibilities rather than treating the application as a simple single-user store.

### Seller capabilities

- Dedicated seller authentication middleware
- Seller routes
- Product creation
- Product catalogue management
- Product pricing
- Offer pricing
- Stock management
- Product image uploads
- Seller-side order access
- Multi-image product support

The current seller product workflow is designed around **four product images**, allowing product detail pages to present a richer gallery.

### Commerce role separation

```text
                    GreenCart
                       │
          ┌────────────┴────────────┐
          │                         │
      Customer                    Seller
          │                         │
   Browse products            Manage products
   AI search                  Upload images
   Cart                       Manage pricing
   Checkout                   Manage stock
   Reviews                    View orders
   Orders
```

This separation provides a foundation for expanding the platform into a larger multi-seller marketplace.

---

## ⭐ 04 — Product-Specific Reviews & Ratings

Reviews are attached to the **specific product being viewed**, rather than being only a generic homepage testimonial section.

Customers can:

- View reviews for the current product
- See review count
- See average rating
- Give a 1–5 star rating
- Submit written feedback
- Edit their own review
- Delete their own review
- Review different products independently

The review data model uses a compound user + product uniqueness rule so one customer can review many products while maintaining one review per product.

### Demo review data

The repository includes a seeding utility that can populate products with **2–8 sample reviews** for development and presentation purposes.

```bash
cd server
npm run seed:reviews
```

> These seeded records are demo/sample data and should not be represented as verified real customer purchases in a production environment.

---

## 🔐 05 — Authentication & Protected Resources

The platform includes authentication for both customer and seller workflows.

### Customer authentication

- Registration
- Login
- Password hashing
- JWT authentication
- Cookie-based session flow
- Authenticated-user detection
- Protected routes

### Protected customer operations

- Cart operations
- Orders
- Addresses
- Review creation
- Review editing
- Review deletion

### Seller authentication

Seller-specific middleware protects seller operations separately from normal customer routes.

This provides a clear authorization boundary between shopper and seller functionality.

---

## 💳 06 — Payments & Checkout

GreenCart supports two checkout paths:

### Cash on Delivery

A dedicated authenticated backend route handles COD order creation.

### Stripe

The application includes:

- Stripe checkout creation
- Authenticated payment flow
- Payment verification endpoint
- Order creation after payment handling

The backend exposes dedicated order endpoints for COD, Stripe checkout and Stripe verification.

---

## ☁️ 07 — Cloudinary Product Media

Product images are uploaded through **Cloudinary** rather than being stored directly inside the application server.

Benefits include:

- Cloud-hosted product images
- Multiple images per product
- Cleaner application-server responsibilities
- CDN-friendly media URLs
- Easier deployment architecture

Product image URLs are stored with product data and consumed by the React storefront.

---

## 📱 08 — Responsive Modern UI

The frontend uses React and Tailwind CSS to provide a responsive shopping experience across:

- Desktop
- Laptop
- Tablet
- Mobile

The UI includes:

- Responsive navigation
- Mobile-friendly layouts
- Interactive product cards
- Loading states
- Empty states
- Error states
- Toast notifications
- Lucide icons
- AI assistant floating interface
- Product image galleries

---

# 🖼️ Visual Showcase

## Main Storefront

<p align="center">
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/bottom_banner_image.png" alt="GreenCart main grocery storefront banner" width="900" />
</p>

## AI Shopping Assistant

<p align="center">
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/ai-assistant-preview.svg" alt="GreenCart AI product discovery assistant" width="900" />
</p>

## Grocery Product Catalogue

<p align="center">
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/apple_image.png" alt="Apple product" width="190" />
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/amul_milk_image.png" alt="Amul milk product" width="190" />
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/bakery_image.png" alt="Bakery category" width="190" />
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/brown_rice_image.png" alt="Brown rice product" width="190" />
</p>

The repository includes a broader grocery visual catalogue covering fruits, vegetables, dairy, bakery, grains, drinks and other store categories.

---

# 🧠 AI Product Search — Technical Deep Dive

The AI search implementation uses a **hybrid retrieval architecture** rather than relying entirely on an LLM.

## Step 1 — Input validation

The backend validates the incoming search query and rejects empty or excessively long requests.

## Step 2 — Query normalization

The search engine:

- Converts text to lowercase
- Removes unnecessary punctuation
- Normalizes whitespace
- Tokenizes meaningful words
- Removes common stop words

## Step 3 — Grocery synonym expansion

The backend maintains grocery-oriented search synonyms.

Examples:

```text
fruit       → apple, orange, banana, mango, grapes
vegetable   → potato, tomato, carrot, spinach, onion
dairy       → milk, paneer, cheese, eggs
bread       → bakery, brown bread, whole bread, croissant
rice        → grains, basmati rice, brown rice
breakfast   → bread, eggs, milk, oats, croissant, muffins
healthy     → organic, quinoa, spinach, oats, brown rice, fruits
```

This allows ordinary catalogue matching to understand common shopping language.

## Step 4 — Deterministic scoring

Products are scored using multiple signals:

| Signal | Purpose |
|---|---|
| Exact product name | Highest-confidence match |
| Partial product name | Handles incomplete queries |
| Product-name token | Handles natural phrases |
| Category | Matches broader shopping intent |
| Description | Finds contextual matches |
| Synonym expansion | Understands common grocery language |
| Simple typo tolerance | Helps with small spelling mistakes |

## Step 5 — Gemini intent understanding

When `GEMINI_API_KEY` is available, Gemini receives a controlled catalogue containing product IDs, names, categories, descriptions and prices.

The model is instructed to return strict JSON:

```json
{
  "answer": "one short helpful sentence",
  "productIds": ["catalog id"]
}
```

Only products from the catalogue may be selected.

## Step 6 — Server-side validation

Gemini output is treated as untrusted model output.

The backend builds a MongoDB product map and validates every requested ID against it.

```text
Gemini ID
   ↓
Exists in MongoDB?
   ├── Yes → accept
   └── No  → discard
```

## Step 7 — Hybrid result merge

Gemini-selected products are combined with deterministic catalogue matches, with duplicate IDs removed and the result set limited.

## Step 8 — Failure fallback

If Gemini fails, the API still attempts deterministic catalogue search.

The result is a shopping assistant that has both:

**AI flexibility + deterministic reliability.**

---

# 🏗️ System Architecture

```text
                           CUSTOMER
                              │
                              ▼
                 ┌────────────────────────┐
                 │     React + Vite       │
                 │    Tailwind CSS UI     │
                 └───────────┬────────────┘
                             │
                       Axios / HTTP
                             │
                             ▼
                 ┌────────────────────────┐
                 │      Express API       │
                 │ Authentication        │
                 │ Commerce Logic        │
                 │ Product Search        │
                 │ Orders / Reviews      │
                 └───────┬───────┬────────┘
                         │       │
             ┌───────────┘       └─────────────┐
             ▼                                 ▼
      ┌──────────────┐                  ┌──────────────┐
      │   MongoDB    │                  │  Cloudinary  │
      │ Users        │                  │ Product      │
      │ Products     │                  │ Images       │
      │ Cart         │                  └──────────────┘
      │ Orders       │
      │ Reviews      │
      └──────┬───────┘
             │
             │ catalogue context
             ▼
      ┌──────────────┐
      │  Gemini AI   │
      │ Intent       │
      │ Understanding│
      └──────────────┘

      Stripe ◄──── Checkout / Verification ────► Express API

      Seller ──────► Seller Auth / Product / Order APIs
```

---

# 🧰 Technology Stack

## Frontend Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Axios-HTTP-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
  <img src="https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white" alt="React Router" />
  <img src="https://img.shields.io/badge/Lucide-Icons-F56565?style=for-the-badge" alt="Lucide" />
</p>

| Technology | Role in GreenCart |
|---|---|
| **React 19** | Component-based storefront and customer UI |
| **Vite** | Fast frontend development and production builds |
| **Tailwind CSS 4** | Responsive utility-first styling |
| **React Router 7** | Client-side page and product routing |
| **Axios** | Frontend-to-backend API communication |
| **Lucide React** | Interface icons and interaction visuals |
| **React Hot Toast** | Lightweight user feedback and notifications |

## Backend Stack

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-ESM-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Mongoose-ODM-880000?style=for-the-badge&logo=mongoose&logoColor=white" alt="Mongoose" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

| Technology | Role in GreenCart |
|---|---|
| **Node.js** | Backend JavaScript runtime |
| **Express 5** | REST API and server routing |
| **MongoDB** | Persistent application database |
| **Mongoose** | Data modelling and MongoDB access |
| **JWT** | Customer and seller authentication |
| **bcryptjs** | Password hashing |
| **Cookie Parser** | Authentication cookie parsing |
| **CORS** | Controlled frontend/API cross-origin communication |
| **Multer** | Multipart product image uploads |

## Commerce & Infrastructure

<p align="center">
  <img src="https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white" alt="Stripe" />
  <img src="https://img.shields.io/badge/Cloudinary-Media-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  <img src="https://img.shields.io/badge/Nodemailer-Email-22A2F2?style=for-the-badge&logo=minutemailer&logoColor=white" alt="Nodemailer" />
</p>

| Technology | Role in GreenCart |
|---|---|
| **Stripe** | Online payment processing and verification |
| **Cloudinary** | Product image/media storage |
| **Google Gemini** | Natural-language product discovery |
| **Nodemailer** | Backend email-related functionality |

---

# 📁 Project Structure

```text
ggrocery/
│
├── client/                         # React + Vite storefront
│   ├── public/
│   └── src/
│       ├── assets/                 # Grocery images and UI assets
│       ├── components/             # Reusable storefront components
│       │   ├── AiProductSearch.jsx
│       │   ├── BestSeller.jsx
│       │   ├── Categories.jsx
│       │   ├── MainBanner.jsx
│       │   ├── Navbar.jsx
│       │   ├── OurPartners.jsx
│       │   ├── ProductCard.jsx
│       │   └── ...
│       ├── context/
│       │   └── AppContext.jsx       # Shared application state/API client
│       ├── pages/
│       │   ├── ProductDetails.jsx
│       │   └── ...
│       └── App.jsx
│
├── server/                         # Express + MongoDB backend
│   ├── configs/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── aiSearchController.js
│   │   ├── UserController.js
│   │   ├── productController.js
│   │   ├── reviewController.js
│   │   ├── orderController.js
│   │   └── ...
│   ├── middlewares/
│   │   ├── authuser.js
│   │   └── authSeller.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── CustomerReview.js
│   ├── routes/
│   │   ├── userRoute.js
│   │   ├── productRoute.js
│   │   ├── cartRoute.js
│   │   ├── addressRoute.js
│   │   ├── orderRoute.js
│   │   ├── reviewRoute.js
│   │   ├── sellerRoutes.js
│   │   └── ...
│   ├── utils/
│   │   └── seedProductReviews.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔌 REST API Overview

| Base Route | Purpose |
|---|---|
| `/api/user` | Customer registration, login and authentication |
| `/api/seller` | Seller authentication and seller operations |
| `/api/product` | Product catalogue and AI search |
| `/api/cart` | Customer cart operations |
| `/api/address` | Delivery address management |
| `/api/order` | COD, Stripe and order history |
| `/api/newsletter` | Newsletter functionality |
| `/api/reviews` | Product-specific reviews and ratings |

## AI Search

```http
POST /api/product/ai-search
Content-Type: application/json

{
  "query": "healthy breakfast"
}
```

## Reviews

```http
GET    /api/reviews?productId=<productId>
GET    /api/reviews/mine?productId=<productId>
POST   /api/reviews
PUT    /api/reviews
DELETE /api/reviews
```

## Orders

```http
POST /api/order/cod
GET  /api/order/user
POST /api/order/stripe
POST /api/order/verify-stripe
GET  /api/order/seller
```

---

# ⚙️ Local Development Setup

## 1. Clone the repository

```bash
git clone https://github.com/duttasirius/ggrocery.git
cd ggrocery
git checkout dev
```

## 2. Install frontend dependencies

```bash
cd client
npm install
```

## 3. Install backend dependencies

In another terminal:

```bash
cd server
npm install
```

## 4. Configure backend environment variables

Create `server/.env`:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret
GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash
```

Create the frontend environment file as required:

```env
VITE_BACKEND_URL=http://localhost:4000
```

> Never commit real credentials, API keys or database secrets.

## 5. Start the backend

```bash
cd server
npm run server
```

## 6. Start the frontend

```bash
cd client
npm run dev
```

Vite will display the local frontend URL in the terminal.

---

# 🌱 Demo Review Seeding

Populate the product catalogue with sample reviews:

```bash
cd server
npm run seed:reviews
```

The utility checks products individually and creates between **2 and 8 sample reviews per product** where the existing review count needs to be populated.

This is intended for local development, UI demos and portfolio screenshots.

---

# 🧪 Development Commands

## Frontend

```bash
npm run dev       # Start Vite development server
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Backend

```bash
npm run server        # Start backend with nodemon
npm start             # Start backend with Node.js
npm run seed:reviews  # Seed sample product reviews
```

---

# 🔒 Security & Reliability

GreenCart includes several practical safeguards expected in a real commerce backend.

- Passwords are hashed rather than stored as plain text.
- JWT authentication protects customer resources.
- Seller resources use separate authentication middleware.
- Review operations are associated with authenticated users.
- Review uniqueness is scoped to user + product.
- Search requests are length-limited.
- Product search begins with products currently in stock.
- Gemini-generated product IDs are validated against MongoDB.
- AI failures fall back to deterministic catalogue matching.
- Product media is handled by a dedicated cloud media service.
- Environment variables are used for sensitive configuration.

---

# 🎯 Engineering Decisions

## Why hybrid AI search?

LLMs are strong at understanding natural language, but an e-commerce system needs deterministic control over purchasable entities.

GreenCart therefore separates:

```text
Intent understanding  → Gemini
Product truth         → MongoDB
Deterministic search  → Backend matcher
```

This prevents the AI model from becoming the authority for product IDs.

## Why validate AI-generated IDs?

AI output is treated as untrusted data. The backend only returns products whose IDs exist in the real catalogue.

## Why keep a fallback search?

Search is a core shopping function. A temporary Gemini outage should not turn product discovery into a broken feature.

## Why product-specific reviews?

A generic testimonial section helps marketing, but shoppers need feedback about the product they are actually considering. Product-specific reviews provide more useful context.

## Why Cloudinary?

Product images are media infrastructure rather than application data. Cloudinary keeps image storage and delivery separate from the Express application server.

## Why separate seller authentication?

Customer and seller permissions are fundamentally different. Keeping their authorization boundaries explicit makes the backend easier to reason about and extend.

---

# 💼 Recruiter / Portfolio Summary

**GreenCart demonstrates end-to-end full-stack development across customer experience, backend engineering, commerce infrastructure and applied AI.**

The project showcases:

- React component architecture
- Responsive UI engineering
- Vite-based frontend tooling
- Tailwind CSS design system
- REST API development with Express
- MongoDB data modelling with Mongoose
- JWT authentication
- Seller/customer role separation
- Cloud media management
- Stripe payment integration
- Cart and checkout workflows
- Order management
- Product-specific reviews
- Multivendor-ready seller architecture
- Gemini-powered natural-language search
- Deterministic search algorithms
- AI output validation
- Graceful AI failure handling
- Development data seeding
- Environment-based configuration

### ⭐ Flagship engineering feature

> **GreenCart AI Product Search combines LLM intent understanding with deterministic product retrieval. Gemini helps understand what the shopper means, while MongoDB remains the source of truth for what can actually be purchased. The backend validates AI-generated product IDs, merges them with deterministic matches, and falls back to catalogue search when AI is unavailable.**

That architecture is intentionally designed for an e-commerce environment where **reliability matters as much as AI capability**.

---

# 📈 Future Roadmap

Potential next improvements include:

- Semantic vector search with embeddings
- Vector database integration
- Personalized recommendations based on order history
- Search analytics and query-quality metrics
- Wishlist functionality
- Coupons and promotional codes
- Verified-purchase review badges
- Review moderation
- Product pagination and server-side filtering
- Seller dashboards and analytics
- More granular seller permissions
- Automated backend and frontend tests
- CI/CD build and lint checks
- Production observability and structured logging
- Order-status notifications
- Inventory alerts

---

# 👨‍💻 Author

**Sagnik Dutta**

- GitHub: [@duttasirius](https://github.com/duttasirius)
- Repository: [duttasirius/ggrocery](https://github.com/duttasirius/ggrocery)

---

# 📄 License

This project is currently maintained as a portfolio / learning project. Add a formal open-source license file before distributing the project under an open-source license.
