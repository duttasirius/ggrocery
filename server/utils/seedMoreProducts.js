import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/Product.js";

const IMAGE_BASE =
  "https://raw.githubusercontent.com/duttasirius/ggrocery/dev/client/src/assets";

const image = (fileName) => `${IMAGE_BASE}/${fileName}`;

const products = [
  // Vegetables
  {
    name: "Fresh Spinach 500g",
    description: "Tender farm-fresh spinach leaves, rich in iron and ideal for curries, soups, and salads.",
    price: 25,
    offerPrice: 22,
    image: [image("spinach_image_1.png")],
    category: "Vegetables",
    inStock: true,
  },
  {
    name: "Fresh Onions 1 kg",
    description: "Fresh everyday onions with a crisp texture, perfect for curries, gravies, salads, and cooking.",
    price: 38,
    offerPrice: 34,
    image: [image("onion_image_1.png")],
    category: "Vegetables",
    inStock: true,
  },

  // Fruits
  {
    name: "Sweet Mango 1 kg",
    description: "Juicy and naturally sweet mangoes, perfect for snacking, smoothies, desserts, and shakes.",
    price: 160,
    offerPrice: 145,
    image: [image("mango_image_1.png")],
    category: "Fruits",
    inStock: true,
  },
  {
    name: "Fresh Grapes 500g",
    description: "Crisp, juicy grapes with a naturally sweet flavor, great for snacking and fruit bowls.",
    price: 75,
    offerPrice: 68,
    image: [image("grapes_image_1.png")],
    category: "Fruits",
    inStock: true,
  },

  // Drinks
  {
    name: "Sprite 750ml",
    description: "Refreshing lemon-lime soft drink, chilled and ready for meals, parties, or quick refreshment.",
    price: 45,
    offerPrice: 40,
    image: [image("sprite_image_1.png")],
    category: "Drinks",
    inStock: true,
  },
  {
    name: "Fanta Orange 750ml",
    description: "Sparkling orange-flavored soft drink with a bright fruity taste, perfect served chilled.",
    price: 45,
    offerPrice: 40,
    image: [image("fanta_image_1.png")],
    category: "Drinks",
    inStock: true,
  },

  // Instant
  {
    name: "Top Ramen Instant Noodles 280g",
    description: "Quick-cooking masala noodles for an easy snack or fast meal in just a few minutes.",
    price: 65,
    offerPrice: 58,
    image: [image("top_ramen_image.png")],
    category: "Instant",
    inStock: true,
  },
  {
    name: "Knorr Hot & Sour Soup 45g",
    description: "Easy instant hot and sour soup mix with rich seasoning, perfect for a quick warm bowl.",
    price: 45,
    offerPrice: 39,
    image: [image("knorr_soup_image.png")],
    category: "Instant",
    inStock: true,
  },

  // Dairy
  {
    name: "Cheese Slices 200g",
    description: "Creamy cheese slices with a smooth texture, ideal for sandwiches, burgers, toast, and snacks.",
    price: 125,
    offerPrice: 115,
    image: [image("cheese_image.png")],
    category: "Dairy",
    inStock: true,
  },
  {
    name: "Paneer 500g",
    description: "Soft and fresh paneer with a rich protein content, perfect for curries, tikka, and snacks.",
    price: 220,
    offerPrice: 205,
    image: [image("paneer_image_2.png")],
    category: "Dairy",
    inStock: true,
  },

  // Bakery
  {
    name: "Butter Croissant 2 pcs",
    description: "Flaky, buttery croissants with a light golden crust, perfect for breakfast or evening tea.",
    price: 110,
    offerPrice: 99,
    image: [image("butter_croissant_image.png")],
    category: "Bakery",
    inStock: true,
  },
  {
    name: "Chocolate Cake 500g",
    description: "Soft and rich chocolate cake for celebrations, desserts, birthdays, or an indulgent treat.",
    price: 350,
    offerPrice: 319,
    image: [image("chocolate_cake_image.png")],
    category: "Bakery",
    inStock: true,
  },

  // Grains
  {
    name: "Organic Quinoa 500g",
    description: "Nutritious quinoa grains that cook easily and work well in salads, bowls, and healthy meals.",
    price: 210,
    offerPrice: 189,
    image: [image("quinoa_image.png")],
    category: "Grains",
    inStock: true,
  },
  {
    name: "Brown Rice 1 kg",
    description: "Wholesome brown rice with a nutty flavor, ideal for everyday healthy meals and rice bowls.",
    price: 145,
    offerPrice: 129,
    image: [image("brown_rice_image.png")],
    category: "Grains",
    inStock: true,
  },
];

const seedMoreProducts = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing from server/.env");
    }

    await mongoose.connect(`${process.env.MONGODB_URI}/groceryy`);
    console.log("DATABASE CONNECTED");

    let added = 0;
    let skipped = 0;

    for (const product of products) {
      const exists = await Product.exists({ name: product.name });

      if (exists) {
        skipped += 1;
        console.log(`SKIPPED: ${product.name}`);
        continue;
      }

      await Product.create(product);
      added += 1;
      console.log(`ADDED: ${product.name}`);
    }

    console.log(`\nDone. Added ${added} products, skipped ${skipped} existing products.`);
  } catch (error) {
    console.error("Product seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedMoreProducts();
