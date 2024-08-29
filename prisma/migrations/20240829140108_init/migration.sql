/*
  Warnings:

  - A unique constraint covering the columns `[review_id]` on the table `purchases` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id,product_id]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `review_id` to the `purchases` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchases" ADD COLUMN     "review_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "purchases_review_id_key" ON "purchases"("review_id");

-- CreateIndex
CREATE UNIQUE INDEX "reviews_user_id_product_id_key" ON "reviews"("user_id", "product_id");

-- AddForeignKey
ALTER TABLE "purchases" ADD CONSTRAINT "purchases_review_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
