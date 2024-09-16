/*
  Warnings:

  - A unique constraint covering the columns `[title,user_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "addresses_title_email_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "addresses_title_user_id_key" ON "addresses"("title", "user_id");
