-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" TEXT,
ADD COLUMN     "title" TEXT;

-- CreateTable
CREATE TABLE "TimeOffEvent" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "type" TEXT,
    "description" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_time" TEXT,
    "end_time" TEXT,
    "team_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_date" TIMESTAMP(3) NOT NULL,
    "deleted_date" TIMESTAMP(3),

    CONSTRAINT "TimeOffEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TimeOffEvent" ADD CONSTRAINT "TimeOffEvent_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeOffEvent" ADD CONSTRAINT "TimeOffEvent_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
