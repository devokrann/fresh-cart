/*
  Warnings:

  - You are about to drop the column `compound_id` on the `cart` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "cart_compound_id_key";

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "compound_id";
