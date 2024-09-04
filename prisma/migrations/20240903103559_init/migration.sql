/*
  Warnings:

  - You are about to drop the column `compoundid` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `compoundid` on the `wishlist` table. All the data in the column will be lost.
  - Added the required column `compound_id` to the `cart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `compound_id` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" DROP COLUMN "compoundid",
ADD COLUMN     "compound_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "wishlist" DROP COLUMN "compoundid",
ADD COLUMN     "compound_id" TEXT NOT NULL;
