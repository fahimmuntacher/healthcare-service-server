/*
  Warnings:

  - Made the column `title` on table `specialities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "specialities" ALTER COLUMN "title" SET NOT NULL;
