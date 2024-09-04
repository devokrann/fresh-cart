/*
  Warnings:

  - You are about to drop the column `compoundId` on the `cart` table. All the data in the column will be lost.
  - Added the required column `compound_id` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cart" DROP COLUMN "compoundId",
ADD COLUMN     "compound_id" TEXT NOT NULL;
