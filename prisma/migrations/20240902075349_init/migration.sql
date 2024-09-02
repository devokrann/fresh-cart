-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_product_parent_category_id_fkey";

-- AlterTable
ALTER TABLE "product_categories" ALTER COLUMN "product_parent_category_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_product_parent_category_id_fkey" FOREIGN KEY ("product_parent_category_id") REFERENCES "product_parent_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
