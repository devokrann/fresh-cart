/*
  Warnings:

  - A unique constraint covering the columns `[user_id,variant_id,product_id]` on the table `cart` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `product_id` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "cart_user_id_variant_id_key";

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "product_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cart_user_id_variant_id_product_id_key" ON "cart"("user_id", "variant_id", "product_id");

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
