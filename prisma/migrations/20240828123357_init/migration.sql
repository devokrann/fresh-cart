/*
  Warnings:

  - You are about to drop the column `city` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `ip` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `loc` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `org` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `os` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `timezone` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "city",
DROP COLUMN "country",
DROP COLUMN "ip",
DROP COLUMN "loc",
DROP COLUMN "org",
DROP COLUMN "os",
DROP COLUMN "region",
DROP COLUMN "timezone";
