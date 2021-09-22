/*
  Warnings:

  - You are about to drop the `_LobbyToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lobbyId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_LobbyToUser" DROP CONSTRAINT "_LobbyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_LobbyToUser" DROP CONSTRAINT "_LobbyToUser_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lobbyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_LobbyToUser";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_lobbyId_fkey" FOREIGN KEY ("lobbyId") REFERENCES "Lobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
