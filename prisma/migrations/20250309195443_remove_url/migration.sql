/*
  Warnings:

  - You are about to drop the column `url` on the `permissions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "permissions_url_key";

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "url";
