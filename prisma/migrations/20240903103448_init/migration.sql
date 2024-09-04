/*
  Warnings:

  - Added the required column `compoundid` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compoundid` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "compoundid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "wishlist" ADD COLUMN     "compoundid" TEXT NOT NULL;
