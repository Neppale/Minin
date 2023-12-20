/*
  Warnings:

  - You are about to drop the column `location` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `organization` on the `Click` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Click` table. All the data in the column will be lost.
  - Added the required column `deviceModel` to the `Click` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deviceVendor` to the `Click` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locationRadius` to the `Click` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Click" DROP COLUMN "location",
DROP COLUMN "organization",
DROP COLUMN "type",
ADD COLUMN     "deviceModel" TEXT NOT NULL,
ADD COLUMN     "deviceVendor" TEXT NOT NULL,
ADD COLUMN     "locationRadius" TEXT NOT NULL;
