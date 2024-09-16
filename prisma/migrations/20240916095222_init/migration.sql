/*
  Warnings:

  - You are about to drop the column `service_fee` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_fee` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `tax_fee` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "service_fee",
DROP COLUMN "shipping_fee",
DROP COLUMN "tax_fee";
