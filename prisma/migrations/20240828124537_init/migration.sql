/*
  Warnings:

  - You are about to drop the column `token` on the `devices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[session_token]` on the table `devices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `session_token` to the `devices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "devices" DROP CONSTRAINT "devices_token_fkey";

-- DropIndex
DROP INDEX "devices_token_key";

-- AlterTable
ALTER TABLE "devices" DROP COLUMN "token",
ADD COLUMN     "session_token" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "devices_session_token_key" ON "devices"("session_token");

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_session_token_fkey" FOREIGN KEY ("session_token") REFERENCES "sessions"("session_token") ON DELETE CASCADE ON UPDATE CASCADE;
