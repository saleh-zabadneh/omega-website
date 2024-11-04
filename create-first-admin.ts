import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the root .env file
dotenv.config({ path: join(__dirname, ".env") });

const prisma = new PrismaClient();

async function createFirstAdmin() {
  const username = process.env.FIRST_ADMIN_USERNAME;
  const password = process.env.FIRST_ADMIN_PASSWORD;

  if (!username || !password) {
    console.error(
      "FIRST_ADMIN_USERNAME and FIRST_ADMIN_PASSWORD must be set in the .env file."
    );
    process.exit(1);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Hashed password: ${hashedPassword}`);

  try {
    const existingAdmin = await prisma.superAdmin.findFirst({
      where: { isFirst: true },
    });

    if (existingAdmin) {
      console.log("A first admin already exists. Skipping creation.");
      return;
    }

    const admin = await prisma.superAdmin.create({
      data: {
        username,
        password: hashedPassword,
        isFirst: true,
      },
    });

    console.log(`First admin created with username: ${admin.username}`);
  } catch (error) {
    console.error("Error creating first admin:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createFirstAdmin();
