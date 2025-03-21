-- CreateTable
CREATE TABLE "Bike" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "logo" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bike_pkey" PRIMARY KEY ("id")
);
