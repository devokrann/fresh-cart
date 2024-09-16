/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `B` on the `_AddressToOrder` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `order_id` on the `ordered_products` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `order_id` on the `purchases` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_AddressToOrder" DROP CONSTRAINT "_AddressToOrder_B_fkey";

-- DropForeignKey
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_order_id_fkey";

-- DropForeignKey
ALTER TABLE "purchases" DROP CONSTRAINT "purchases_order_id_fkey";

-- AlterTable
ALTER TABLE "_AddressToOrder" DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ordered_products" DROP COLUMN "order_id",
ADD COLUMN     "order_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP CONSTRAINT "orders_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "purchases" DROP COLUMN "order_id",
ADD COLUMN     "order_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_AddressToOrder_AB_unique" ON "_AddressToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_AddressToOrder_B_index" ON "_AddressToOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ordered_products_variant_id_order_id_key" ON "ordered_products"("variant_id", "order_id");

-- CreateIndex
CREATE UNIQUE INDEX "purchases_order_id_key" ON "purchases"("order_id");

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AddressToOrder" ADD CONSTRAINT "_AddressToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
