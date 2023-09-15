/*
  Warnings:

  - You are about to drop the column `ProFileImage` on the `facultys` table. All the data in the column will be lost.
  - You are about to drop the column `bloodgroup` on the `facultys` table. All the data in the column will be lost.
  - Added the required column `bloodGroup` to the `facultys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `designation` to the `facultys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `facultys` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileImage` to the `facultys` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "facultys" DROP COLUMN "ProFileImage",
DROP COLUMN "bloodgroup",
ADD COLUMN     "bloodGroup" TEXT NOT NULL,
ADD COLUMN     "designation" TEXT NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "profileImage" TEXT NOT NULL;
