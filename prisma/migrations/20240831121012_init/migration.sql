/*
  Warnings:

  - You are about to drop the column `published` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the column `sub_category_id` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `product_sub_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoteText` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quoter` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `readingTime` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_parent_category_id` to the `product_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_category_id` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "addresses" DROP CONSTRAINT "addresses_order_id_fkey";

-- DropForeignKey
ALTER TABLE "product_sub_categories" DROP CONSTRAINT "product_sub_categories_category_id_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_sub_category_id_fkey";

-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "order_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "published",
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "quoteText" TEXT NOT NULL,
ADD COLUMN     "quoter" TEXT NOT NULL,
ADD COLUMN     "readingTime" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "product_parent_category_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "sub_category_id",
ADD COLUMN     "product_category_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "position" TEXT;

-- DropTable
DROP TABLE "product_sub_categories";

-- CreateTable
CREATE TABLE "product_parent_categories" (
    "title" TEXT NOT NULL,
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_parent_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_parent_category_id_fkey" FOREIGN KEY ("product_parent_category_id") REFERENCES "product_parent_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
