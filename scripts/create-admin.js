const { PrismaClient } = require('@prisma/client');
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Set these values to your desired admin credentials
  const email = 'parmar.krushang04@gmail.com';
  const password = 'Portfolio@123';
  const name = 'Krushang Parmar';

  console.log('Creating admin user...');
  
  try {
    const hashedPassword = await hash(password, 12);
    
    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name,
        password: hashedPassword,
        role: 'admin',
      },
    });
    
    console.log(`Admin user created successfully: ${user.email}`);
  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 