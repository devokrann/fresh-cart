/*
  Warnings:

  - A unique constraint covering the columns `[user_id,title]` on the table `payment_methods` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "payment_methods_user_id_name_title_key";

-- CreateIndex
CREATE UNIQUE INDEX "payment_methods_user_id_title_key" ON "payment_methods"("user_id", "title");
