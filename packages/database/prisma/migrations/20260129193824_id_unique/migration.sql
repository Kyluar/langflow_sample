/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Document` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Document_id_key" ON "Document"("id");
