/*
  Warnings:

  - You are about to drop the `_OrderToVariant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_OrderToVariant" DROP CONSTRAINT "_OrderToVariant_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderToVariant" DROP CONSTRAINT "_OrderToVariant_B_fkey";

-- DropTable
DROP TABLE "_OrderToVariant";

-- CreateTable
CREATE TABLE "ordered_products" (
    "quantity" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "variant_id" TEXT,
    "order_id" TEXT NOT NULL,

    CONSTRAINT "ordered_products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ordered_products_variant_id_order_id_key" ON "ordered_products"("variant_id", "order_id");

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "variants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordered_products" ADD CONSTRAINT "ordered_products_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
