/*
  Warnings:

  - A unique constraint covering the columns `[compound_id]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[compound_id]` on the table `wishlist` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cart_compound_id_key" ON "cart"("compound_id");

-- CreateIndex
CREATE UNIQUE INDEX "wishlist_compound_id_key" ON "wishlist"("compound_id");
