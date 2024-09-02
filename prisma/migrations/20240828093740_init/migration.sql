/*
  Warnings:

  - Added the required column `city` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ip` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loc` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `os` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `region` to the `sessions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "ip" TEXT NOT NULL,
ADD COLUMN     "loc" TEXT NOT NULL,
ADD COLUMN     "org" TEXT NOT NULL,
ADD COLUMN     "os" TEXT NOT NULL,
ADD COLUMN     "region" TEXT NOT NULL,
ADD COLUMN     "timezone" TEXT NOT NULL;
