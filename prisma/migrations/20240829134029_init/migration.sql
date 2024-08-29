/*
  Warnings:

  - You are about to drop the `_BlogCategoriesToPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_BlogCategoriesToPost" DROP CONSTRAINT "_BlogCategoriesToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_BlogCategoriesToPost" DROP CONSTRAINT "_BlogCategoriesToPost_B_fkey";

-- DropTable
DROP TABLE "_BlogCategoriesToPost";

-- CreateTable
CREATE TABLE "_BlogCategoriesToPosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlogCategoriesToPosts_AB_unique" ON "_BlogCategoriesToPosts"("A", "B");

-- CreateIndex
CREATE INDEX "_BlogCategoriesToPosts_B_index" ON "_BlogCategoriesToPosts"("B");

-- AddForeignKey
ALTER TABLE "_BlogCategoriesToPosts" ADD CONSTRAINT "_BlogCategoriesToPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "blog_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlogCategoriesToPosts" ADD CONSTRAINT "_BlogCategoriesToPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
