/*
  Warnings:

  - A unique constraint covering the columns `[user_id,compound_id]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,compound_id]` on the table `wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "cart_compound_id_key";

-- DropIndex
DROP INDEX "cart_user_id_product_id_variant_id_key";

-- DropIndex
DROP INDEX "wishlist_compound_id_key";

-- DropIndex
DROP INDEX "wishlist_user_id_product_id_variant_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "cart_user_id_compound_id_key" ON "cart"("user_id", "compound_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_user_id_compound_id_key" ON "wishlist"("user_id", "compound_id");
