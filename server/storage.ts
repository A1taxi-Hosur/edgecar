import { users, quotes, products, type User, type InsertUser, type Quote, type InsertQuote, type Product, type InsertProduct } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  getQuotes(): Promise<Quote[]>;
  getProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  authenticateUser(username: string, password: string): Promise<User | null>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quotes: Map<number, Quote>;
  private products: Map<number, Product>;
  private currentUserId: number;
  private currentQuoteId: number;
  private currentProductId: number;

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    this.products = new Map();
    this.currentUserId = 1;
    this.currentQuoteId = 1;
    this.currentProductId = 1;
    
    // Create default admin user
    this.createDefaultAdmin();
    this.createDefaultProducts();
  }

  private async createDefaultAdmin() {
    const adminUser: User = {
      id: this.currentUserId++,
      username: "uniqueadmin",
      password: "UniqueAdmin@2025",
      isAdmin: true,
    };
    this.users.set(adminUser.id, adminUser);
  }

  private async createDefaultProducts() {
    const defaultProducts = [
      // Audio Products
      { name: "Pioneer", category: "audio", description: "Premium audio system with crystal clear sound", image: "https://www.edgecaraccessories.com/static/media/Artboard%201.480b4cf3458554ba9c53.webp" },
      { name: "Onkyo", category: "audio", description: "High-quality audio system for premium listening experience", image: "https://www.edgecaraccessories.com/static/media/Artboard%202.ca32732d7d8262e14ca0.webp" },
      { name: "Pioneer Pro", category: "audio", description: "Professional grade Pioneer audio system", image: "https://www.edgecaraccessories.com/static/media/Artboard%203.efe4ef8d586495df64af.webp" },
      { name: "Sony", category: "audio", description: "Professional Sony audio system with surround sound", image: "https://www.edgecaraccessories.com/static/media/Artboard%204.6fab1117aa2668d78837.webp" },
      { name: "JBL Concert A704", category: "audio", description: "Concert-quality JBL speakers for premium sound", image: "https://www.edgecaraccessories.com/static/media/Artboard%205.7eb9347dd03714ac57b5.webp" },
      { name: "Brazo", category: "audio", description: "Brazo audio system with advanced bass technology", image: "https://www.edgecaraccessories.com/static/media/Artboard%206.9cee3fc7ebce2bb5b251.webp" },
      { name: "Audible Dynamic NR SERIES", category: "audio", description: "Noise reduction audio system for clear sound", image: "https://www.edgecaraccessories.com/static/media/Artboard%207.3f779509d9e0f63fe4b0.webp" },
      { name: "Audison", category: "audio", description: "Premium Audison sound system", image: "https://www.edgecaraccessories.com/static/media/Artboard%209.861e1a244f599677c107.webp" },
      { name: "MTX Audio", category: "audio", description: "High-performance MTX audio system", image: "https://www.edgecaraccessories.com/static/media/image4.6ae329aeb835b06bc4bb.webp" },
      { name: "Focal", category: "audio", description: "Premium Focal speakers for audiophiles", image: "https://www.edgecaraccessories.com/static/media/image6.03b4155cbd6ca783ab3a.webp" },
      { name: "JBL Harman", category: "audio", description: "JBL Harman professional audio system", image: "https://www.edgecaraccessories.com/static/media/image7.87665c21310790bd3ea2.webp" },
      { name: "Infinity Harman", category: "audio", description: "Infinity Harman premium sound system", image: "https://www.edgecaraccessories.com/static/media/image10.b57706e00a2484be1700.webp" },
      { name: "Pioneer Elite", category: "audio", description: "Pioneer Elite series for superior audio", image: "https://www.edgecaraccessories.com/static/media/image11.5bac618fb662b5194b29.webp" },
      { name: "Sony Pro", category: "audio", description: "Sony Professional audio system", image: "https://www.edgecaraccessories.com/static/media/image12.9eb2d7bb6bddc22a731c.webp" },
      { name: "UnPlug", category: "audio", description: "UnPlug wireless audio system", image: "https://www.edgecaraccessories.com/static/media/image13.0d365c9f8ebadc95dedb.webp" },
      { name: "Blaupunkt", category: "audio", description: "Blaupunkt premium car audio system", image: "https://www.edgecaraccessories.com/static/media/image14.ddce885d33c62cea6127.webp" },
      
      // Light Products - Premium LED lighting solutions
      { name: "Envision LED Headlights", category: "light", description: "Premium Envision LED headlight system with ultra-bright illumination", image: "@assets/envision_1751633056861.webp" },
      { name: "Excelite LED G-Series", category: "light", description: "Excelite Drive to the Top LED headlight kit with Korean technology", image: "@assets/excelite_1751633056862.webp" },
      { name: "Maxxlink LED Headlights", category: "light", description: "Maxxlink R4 Series 110W/4700K warm white LED headlights", image: "@assets/maxxlink_1751633056862.webp" },
      { name: "Brazo LED System", category: "light", description: "Brazo 20000 Lumens LED headlight system with 162W max power", image: "@assets/brazo_1751633056863.webp" },
      
      // Motors Products - Power & Utility Solutions
      { name: "Jump Starter & Power Pack", category: "motors", description: "Professional jump starter and power pack - no more tow service, jump start and go!", image: "@assets/jump starter_1751633125531.webp" },
      { name: "Bergmann Typhoon Power Plus", category: "motors", description: "Bergmann Typhoon Power Plus tyre inflator with LED light and copper-core motor", image: "@assets/bergmann_1751633125532.webp" },
      
      // Dash Camera Products
      { name: "70mai 4K Dash Cam", category: "dash-camera", description: "Ultra HD 4K dashboard camera with night vision and intelligent parking surveillance", image: "@assets/70mai_1751644567623.webp" },
    ];

    for (const product of defaultProducts) {
      const newProduct: Product = {
        ...product,
        description: product.description || null,
        image: product.image || null,
        id: this.currentProductId++,
        createdAt: new Date(),
      };
      this.products.set(newProduct.id, newProduct);
    }
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.currentQuoteId++;
    const quote: Quote = {
      ...insertQuote,
      id,
      message: insertQuote.message || null,
      createdAt: new Date(),
    };
    this.quotes.set(id, quote);
    return quote;
  }

  async getQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = {
      ...insertProduct,
      description: insertProduct.description || null,
      image: insertProduct.image || null,
      id,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;

    const updatedProduct: Product = {
      ...existingProduct,
      ...updateData,
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  async authenticateUser(username: string, password: string): Promise<User | null> {
    const user = await this.getUserByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
}

export const storage = new MemStorage();
