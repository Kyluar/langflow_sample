/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Document_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Document_title_key" ON "Document"("title");
