/*
  Warnings:

  - You are about to drop the column `device_info` on the `devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_device_info_fkey";

-- DropIndex
DROP INDEX "devices_device_info_key";

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "device_info",
ADD COLUMN     "token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "devices_token_key" ON "devices"("token");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_token_fkey" FOREIGN KEY ("token") REFERENCES "sessions"("session_token") ON DELETE CASCADE ON UPDATE CASCADE;
