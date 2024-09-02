/*
  Warnings:

  - You are about to drop the column `order_id` on the `addresses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_order_id_fkey";

-- AlterTable
ALTER TABLE "addresses" DROP COLUMN "order_id";

-- CreateTable
CREATE TABLE "_AddressToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToOrder_AB_unique" ON "_AddressToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToOrder_B_index" ON "_AddressToOrder"("B");

-- AddForeignKey
ALTER TABLE "_AddressToOrder" ADD CONSTRAINT "_AddressToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToOrder" ADD CONSTRAINT "_AddressToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
