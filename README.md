# 🛒 GreenCart — AI-Powered Grocery E-Commerce Platform

<p align="center">
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/bottom_banner_image.png" alt="GreenCart grocery banner" width="900" />
</p>

<p align="center">
  <strong>A full-stack grocery shopping platform built with React, Express, MongoDB, Cloudinary, Stripe and Gemini-powered AI product discovery.</strong>
</p>

<p align="center">
  <a href="https://github.com/duttasirius/ggrocery"><img src="https://img.shields.io/github/repo-size/duttasirius/ggrocery?style=for-the-badge" alt="Repo size" /></a>
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-ESM-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-5-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</p>

## 📌 Project Overview

**GreenCart** is a modern full-stack grocery e-commerce application designed around a real shopping workflow rather than a static product catalogue.

The application includes customer authentication, product discovery, AI-assisted search, cart management, address management, checkout and payments, order tracking, product reviews, seller/admin workflows, cloud image uploads, promotional content and responsive UI.

One of the main technical highlights is the **AI Product Search** experience: shoppers can describe what they want in natural language — such as `healthy breakfast`, `fresh fruit`, `dairy products`, or a misspelled product name — and the backend combines **Gemini-based intent understanding** with a deterministic catalogue-matching fallback so search remains useful even when the AI service is unavailable.

---

## ✨ Highlights

### 🤖 AI Product Search

GreenCart includes an AI-assisted shopping experience available directly inside the storefront.

- Natural-language product discovery
- Gemini-powered product intent understanding
- Exact product-name matching
- Partial product-name matching
- Category-aware matching
- Search synonym expansion
- Simple typo tolerance
- Ingredient and use-case aware queries through the AI prompt
- Results restricted to real products from MongoDB
- Maximum result selection for focused recommendations
- Deterministic catalogue fallback when Gemini is unavailable
- Graceful degradation when the AI service fails
- Add recommended products to cart directly from the AI interface
- Open the recommended product directly from the AI result

The backend never blindly trusts product IDs returned by the model. AI-selected IDs are checked against the actual MongoDB catalogue before being returned to the client.

**Example queries:**

```text
"healthy breakfast"
"fresh fruit"
"dairy products"
"something for breakfast under a budget"
"show me brown rice"
"amol milk"   ← simple typo tolerance can still help find the correct catalogue item
```

Implementation: `server/controllers/aiSearchController.js` and `client/src/components/AiProductSearch.jsx`.

---

### 🛍️ Customer Shopping Experience

- Responsive grocery storefront
- Product catalogue browsing
- Category-based product pages
- Product details pages
- Product image gallery with multiple views
- Stock-aware product display
- Offer price and original price presentation
- Related-product recommendations by category
- Add to cart
- Buy Now flow
- Cart quantity management
- Address management
- Order placement
- Order history
- Responsive navigation for desktop and smaller screens

---

### ⭐ Product-Specific Reviews & Ratings

Reviews are tied to the **individual product**, rather than being one global testimonial list.

Customers can:

- View reviews for the current product
- See average rating and total review count
- Give a 1–5 star rating
- Submit a written review
- Edit their own review
- Delete their own review
- See the rating summary directly above the product price

The review model uses a compound uniqueness rule so one authenticated customer can maintain one review per product while still being able to review multiple products.

For development/demo data, the project also includes a review seeding utility that creates **2–8 sample reviews per product**.

```bash
cd server
npm run seed:reviews
```

> Seeded reviews are sample/demo records and should not be presented as verified real customer purchases in a production dataset.

---

### 🔐 Authentication & User Accounts

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- HTTP-only authentication cookie flow
- Authenticated user detection
- Protected user routes
- Protected review creation/update/delete
- Protected cart and order operations

Authentication middleware validates the JWT and exposes the authenticated user ID to protected controllers.

---

### 🛒 Cart & Checkout

- Persistent user cart
- Add products from the storefront
- Add products directly from AI recommendations
- Cart count in navigation
- Address selection/management
- Cash on Delivery checkout
- Stripe payment flow
- Stripe payment verification
- User-specific order history
- Seller-side order access

Order routes include dedicated endpoints for COD, Stripe checkout and Stripe verification.

---

### 👨‍💼 Seller / Admin Workflow

The backend contains a separate seller authentication layer and seller routes for catalogue and order management.

Features include:

- Seller authentication
- Product creation
- Product image uploads
- Product stock information
- Offer pricing
- Product catalogue management
- Seller order access
- Multiple-image product support

The current seller product workflow is configured around **four product images**, giving product detail pages a richer visual gallery.

---

### ☁️ Cloud Image Uploads

Product media is integrated with **Cloudinary** rather than being stored directly on the application server.

This supports:

- Cloud-hosted product media
- Multiple product images
- Cleaner deployment architecture
- Smaller application-server storage requirements

---

### 📱 Responsive UI

The frontend is built with React and Tailwind CSS and is designed to adapt across:

- Desktop
- Laptop
- Tablet
- Mobile

Interactive UI elements use Lucide icons and include loading, empty and error states throughout important user flows.

---

## 🖼️ Product Experience Preview

<p align="center">
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/apple_image.png" alt="Grocery product visual" width="220" />
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/amul_milk_image.png" alt="Dairy product visual" width="220" />
  <img src="https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets/bakery_image.png" alt="Bakery category visual" width="220" />
</p>

The repository contains a broader grocery image catalogue for fruits, vegetables, dairy, bakery, grains, drinks and other store content.

---

## 🧠 How the AI Search Works

The search system is intentionally designed as a **hybrid retrieval pipeline** instead of sending every query directly to an LLM.

### 1. Query normalization

The backend normalizes the shopper's query by lowercasing text, removing unnecessary punctuation and splitting it into meaningful tokens.

### 2. Search-term expansion

Common shopping concepts are expanded through a synonym map.

For example:

```text
fruit       → apple, orange, banana, mango, grapes
vegetable   → potato, tomato, carrot, spinach, onion
dairy       → milk, paneer, cheese, eggs
breakfast   → bread, eggs, milk, oats, croissant, muffins
healthy     → organic, quinoa, spinach, oats, brown rice, fruits
```

### 3. Deterministic catalogue matching

The backend scores products using signals such as:

- Exact product-name matches
- Partial product-name matches
- Product-name token matches
- Category matches
- Description matches
- Expanded synonym matches
- Simple typo tolerance

This provides a reliable non-AI search layer.

### 4. Gemini intent understanding

When `GEMINI_API_KEY` is configured, the backend sends the real product catalogue to Gemini and asks it to return a strict JSON response containing:

```json
{
  "answer": "one short helpful sentence",
  "productIds": ["catalog id"]
}
```

The model is explicitly instructed to use only catalogue IDs and return at most six products.

### 5. Output validation

Returned product IDs are checked against products loaded from MongoDB before the client receives them.

### 6. Hybrid merge

Gemini results are merged with deterministic keyword matches. This means an obvious catalogue match can still be returned even when the model misses it.

### 7. Failure fallback

If Gemini times out or returns invalid data, the application falls back to deterministic catalogue search instead of breaking the shopping experience.

This architecture makes the feature both more useful to shoppers and easier to reason about from a backend engineering perspective.

---

## 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │      React + Vite     │
                         │    Tailwind CSS UI    │
                         └──────────┬───────────┘
                                    │ Axios / HTTP
                                    ▼
                         ┌──────────────────────┐
                         │   Express REST API    │
                         │  Authentication +    │
                         │  Business Logic      │
                         └──────┬───────┬───────┘
                                │       │
                 ┌──────────────┘       └───────────────┐
                 ▼                                      ▼
        ┌─────────────────┐                    ┌─────────────────┐
        │    MongoDB      │                    │    Cloudinary   │
        │ Products/Users  │                    │ Product Images  │
        │ Orders/Reviews  │                    └─────────────────┘
        └─────────────────┘
                 ▲
                 │
                 │
        ┌────────┴─────────┐
        │  Gemini AI API   │
        │ Natural-language │
        │ product search   │
        └──────────────────┘

        Stripe <── Payment checkout / verification ──> Express API
```

---

## 🧰 Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React 19 | Component-based UI |
| Vite | Frontend development/build tooling |
| React Router | Client-side routing |
| Tailwind CSS 4 | Responsive styling |
| Axios | API communication |
| Lucide React | UI icons |
| React Hot Toast | User feedback / notifications |

The frontend dependencies and build scripts are defined in `client/package.json`.

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Server runtime |
| Express 5 | REST API framework |
| MongoDB | Primary database |
| Mongoose | MongoDB object modelling |
| JWT | Authentication |
| bcryptjs | Password hashing |
| Cookie Parser | Authentication cookie handling |
| CORS | Cross-origin API access |
| Multer | Multipart image uploads |
| Cloudinary | Media storage |
| Stripe | Online payments |
| Nodemailer | Email-related backend capability |
| Google Gemini | AI product discovery |

---

## 📁 Project Structure

```text
ggrocery/
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── AiProductSearch.jsx
│   │   │   ├── BestSeller.jsx
│   │   │   ├── Categories.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── MainBanner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OurPartners.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   └── ...
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── pages/
│   │   │   ├── ProductDetails.jsx
│   │   │   └── ...
│   │   └── App.jsx
│   └── package.json
│
├── server/
│   ├── configs/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── aiSearchController.js
│   │   ├── UserController.js
│   │   ├── productController.js
│   │   ├── reviewController.js
│   │   └── orderController.js
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

## 🔌 Main API Areas

| Base Route | Responsibility |
|---|---|
| `/api/user` | Registration, login and authentication |
| `/api/seller` | Seller authentication / seller operations |
| `/api/product` | Product catalogue and AI product search |
| `/api/cart` | User cart operations |
| `/api/address` | Saved delivery addresses |
| `/api/order` | COD, Stripe and order history |
| `/api/newsletter` | Newsletter functionality |
| `/api/reviews` | Product ratings and customer reviews |

### AI search endpoint

```http
POST /api/product/ai-search
Content-Type: application/json

{
  "query": "healthy breakfast"
}
```

### Product reviews

```http
GET    /api/reviews?productId=<productId>
GET    /api/reviews/mine?productId=<productId>
POST   /api/reviews
PUT    /api/reviews
DELETE /api/reviews
```

### Orders

```http
POST /api/order/cod
GET  /api/order/user
POST /api/order/stripe
POST /api/order/verify-stripe
GET  /api/order/seller
```

---

## ⚙️ Local Development Setup

### 1. Clone the repository

```bash
git clone https://github.com/duttasirius/ggrocery.git
cd ggrocery
```

The active development branch is `dev`.

```bash
git checkout dev
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create `server/.env` with the values required by your local environment.

Typical values include:

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

Create the frontend environment file as needed:

```env
VITE_BACKEND_URL=http://localhost:4000
```

> Never commit real API keys, passwords, database credentials or secrets to GitHub.

### 5. Start the backend

```bash
cd server
npm run server
```

### 6. Start the frontend

```bash
cd client
npm run dev
```

Vite will provide the local development URL in the terminal.

---

## 🌱 Demo Review Seeding

To populate the catalogue with sample product reviews:

```bash
cd server
npm run seed:reviews
```

The utility checks existing review counts product-by-product and generates between two and eight sample reviews for products that need them.

This is useful for demonstrating the review UI during development and for screenshots/demo presentations.

---

## 🧪 Useful Development Commands

### Frontend

```bash
npm run dev       # Start Vite development server
npm run build     # Create production build
npm run lint      # Run ESLint
npm run preview   # Preview the production build
```

### Backend

```bash
npm run server        # Start backend with nodemon
npm start             # Start backend with Node.js
npm run seed:reviews  # Seed sample product reviews
```

---

## 🔒 Security & Reliability Considerations

The project includes several practical safeguards that are useful in a real e-commerce codebase:

- Passwords are hashed rather than stored as plain text.
- Authentication is handled through JWTs.
- Protected routes use middleware before accessing user-owned resources.
- Product review operations are associated with authenticated users.
- Review uniqueness is scoped to user + product.
- AI product IDs are validated against the MongoDB catalogue.
- AI service failures fall back to catalogue search rather than returning an unusable shopping experience.
- Search requests are length-limited.
- Product search only starts from products that are currently in stock.
- Images are uploaded through a dedicated media service.

---

## 🎯 Engineering Decisions Worth Discussing in an Interview

### Why a hybrid AI search instead of LLM-only search?

An LLM is good at understanding intent, but an e-commerce application still needs deterministic control over what can actually be purchased. GreenCart therefore keeps a local matching system as a reliable retrieval layer and uses Gemini as an intent-understanding layer.

### Why validate model-generated product IDs?

An AI model should not be treated as the source of truth for database entities. MongoDB remains the authority, so every returned ID is checked against the actual product map before it reaches the frontend.

### Why product-specific reviews?

Global testimonials are useful for marketing, but shoppers need evidence about the product currently being viewed. Reviews are therefore associated with both the authenticated user and the product.

### Why Cloudinary?

Product media is a separate concern from application data. Storing images in Cloudinary keeps the Express server focused on application logic while providing URLs that can be stored in MongoDB.

### Why keep a deterministic fallback?

External AI services can fail, timeout or be temporarily unavailable. Product search is a core shopping capability, so the application should continue to return useful catalogue matches even when the AI layer is unavailable.

---

## 📈 Future Improvements

Potential next steps for the platform include:

- Semantic vector search with embeddings and a vector database
- Search analytics and query-quality metrics
- Recommendation engine based on customer purchase behaviour
- Order-status notifications
- Coupon and promotional-code system
- Product wishlist
- Better review moderation and verified-purchase badges
- Pagination and server-side filtering for larger catalogues
- Automated tests for API controllers and critical frontend flows
- CI/CD checks for linting, builds and deployment
- More granular seller/admin permissions
- Production observability and structured logging

---

## 💼 Recruiter / Portfolio Summary

**GreenCart demonstrates end-to-end full-stack development across the customer, backend and commerce layers.**

The project is particularly representative of practical engineering work because it combines:

- Frontend component architecture with React
- Responsive UI implementation with Tailwind CSS
- REST API design with Express
- MongoDB data modelling with Mongoose
- JWT-based authentication
- Secure user-owned resources
- Cloud media storage
- Stripe payment integration
- Seller/admin workflows
- Product-specific review systems
- AI-assisted natural-language search
- Deterministic search fallback logic
- Error handling and graceful degradation
- Development data seeding
- Environment-based configuration

### ⭐ Standout feature

> **AI Product Search is the flagship feature:** natural-language shopping requests are interpreted by Gemini, mapped back to real MongoDB products, validated server-side, merged with deterministic catalogue matches, and surfaced through an interactive shopping assistant that can add products directly to the cart.

---

## 👨‍💻 Author

**Sagnik Dutta**

GitHub: [@duttasirius](https://github.com/duttasirius)

Project repository: [duttasirius/ggrocery](https://github.com/duttasirius/ggrocery)

---

## 📄 License

This project is currently maintained as a portfolio / learning project. Add a formal license file before distributing it as an open-source package.
