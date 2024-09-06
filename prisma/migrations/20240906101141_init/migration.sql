/*
  Warnings:

  - A unique constraint covering the columns `[user_id,name,title]` on the table `payment_methods` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "payment_methods_user_id_name_title_key" ON "payment_methods"("user_id", "name", "title");
