/*
  Warnings:

  - Added the required column `updated_at` to the `blog_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `product_sub_categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "blog_categories" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "product_categories" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "product_sub_categories" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
