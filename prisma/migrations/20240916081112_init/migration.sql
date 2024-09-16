/*
  Warnings:

  - You are about to drop the `ordered_products` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_order_id_fkey";

-- DropForeignKey
ALTER TABLE "ordered_products" DROP CONSTRAINT "ordered_products_variant_id_fkey";

-- DropTable
DROP TABLE "ordered_products";

-- CreateTable
CREATE TABLE "_OrderToVariant" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToVariant_AB_unique" ON "_OrderToVariant"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToVariant_B_index" ON "_OrderToVariant"("B");

-- AddForeignKey
ALTER TABLE "_OrderToVariant" ADD CONSTRAINT "_OrderToVariant_A_fkey" FOREIGN KEY ("A") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToVariant" ADD CONSTRAINT "_OrderToVariant_B_fkey" FOREIGN KEY ("B") REFERENCES "variants"("id") ON DELETE CASCADE ON UPDATE CASCADE;
