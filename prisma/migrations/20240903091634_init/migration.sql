/*
  Warnings:

  - A unique constraint covering the columns `[user_id,product_id,variant_id]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,product_id,variant_id]` on the table `wishlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `wishlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cart_user_id_variant_id_product_id_key";

-- DropIndex
DROP INDEX "wishlist_user_id_variant_id_key";

-- AlterTable
ALTER TABLE "wishlist" ADD COLUMN     "product_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cart_user_id_product_id_variant_id_key" ON "cart"("user_id", "product_id", "variant_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_user_id_product_id_variant_id_key" ON "wishlist"("user_id", "product_id", "variant_id");

-- AddForeignKey
ALTER TABLE "wishlist" ADD CONSTRAINT "wishlist_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
