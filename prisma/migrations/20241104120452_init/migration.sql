-- CreateTable
CREATE TABLE "SuperAdmin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isFirst" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SuperAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SuperAdmin_username_key" ON "SuperAdmin"("username");
