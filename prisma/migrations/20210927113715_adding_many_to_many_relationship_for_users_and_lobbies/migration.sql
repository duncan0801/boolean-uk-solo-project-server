/*
  Warnings:

  - You are about to drop the column `lobbyId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_lobbyId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "lobbyId";

-- CreateTable
CREATE TABLE "UserOnLobby" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "lobbyId" TEXT NOT NULL,

    CONSTRAINT "UserOnLobby_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserOnLobby" ADD CONSTRAINT "UserOnLobby_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnLobby" ADD CONSTRAINT "UserOnLobby_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES "Lobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
