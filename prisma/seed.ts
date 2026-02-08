import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('Admin123!', 10);

  const admin = await prisma.admin.upsert({
    where: { email: 'admin@fifafish.com' },
    update: {},
    create: {
      email: 'admin@fifafish.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Admin created:', admin.email);

  // Create products
  const products = [
    {
      name: 'Premium Tuna',
      nameEn: 'Premium Tuna',
      nameFr: 'Thon Premium',
      description: 'High-quality frozen tuna from Senegalese waters. Perfect for sushi and grilling.',
      descriptionEn: 'High-quality frozen tuna from Senegalese waters. Perfect for sushi and grilling. Rich in omega-3 fatty acids and protein.',
      descriptionFr: 'Thon congelé de haute qualité des eaux sénégalaises. Parfait pour les sushis et les grillades. Riche en acides gras oméga-3 et en protéines.',
      category: 'Fish',
      price: 2500,
      images: ['https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=800'],
      stock: 50,
      featured: true,
    },
    {
      name: 'Fresh Shrimp',
      nameEn: 'Fresh Shrimp',
      nameFr: 'Crevettes Fraîches',
      description: 'Succulent frozen shrimp, sustainably sourced. Ideal for various dishes.',
      descriptionEn: 'Succulent frozen shrimp, sustainably sourced from Senegalese coastal waters. Ideal for grilling, pasta, and stir-fries. Size: 16/20 count per pound.',
      descriptionFr: 'Crevettes congelées succulentes, d\'origine durable des eaux côtières sénégalaises. Idéales pour les grillades, les pâtes et les sautés. Taille: 16/20 par livre.',
      category: 'Seafood',
      price: 3200,
      images: ['https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800'],
      stock: 30,
      featured: true,
    },
    {
      name: 'Wild Sea Bass',
      nameEn: 'Wild Sea Bass',
      nameFr: 'Bar Sauvage',
      description: 'Wild-caught sea bass from Atlantic waters. Premium quality and taste.',
      descriptionEn: 'Wild-caught sea bass from Atlantic waters off the coast of Senegal. Premium quality and taste with delicate, flaky flesh. Whole fish, cleaned and gutted.',
      descriptionFr: 'Bar sauvage pêché dans les eaux atlantiques au large des côtes du Sénégal. Qualité et goût premium avec une chair délicate et feuilletée. Poisson entier, nettoyé et vidé.',
      category: 'Fish',
      price: 2800,
      images: ['https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=800'],
      stock: 25,
      featured: true,
    },
  ];

  // Clear existing products
  await prisma.product.deleteMany({});

  for (const product of products) {
    const created = await prisma.product.create({
      data: product,
    });
    console.log('✅ Product created:', created.name);
  }

  // Create sample quotes
  const quotes = [
    {
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+1-555-0123',
      company: 'Ocean Traders Inc.',
      message: 'Interested in purchasing 10 tons of premium tuna. Please provide pricing and delivery timeline.',
      productName: 'Premium Tuna',
      quantity: 10,
      status: 'pending',
    },
    {
      name: 'Marie Dubois',
      email: 'marie.dubois@example.fr',
      phone: '+33-6-12-34-56-78',
      company: 'Seafood Europe',
      message: 'Looking for regular supply of fresh shrimp. Can you provide monthly deliveries to France?',
      productName: 'Fresh Shrimp',
      quantity: 5,
      status: 'processing',
    },
  ];

  for (const quote of quotes) {
    const created = await prisma.quote.create({
      data: quote,
    });
    console.log('✅ Quote created:', created.name);
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
