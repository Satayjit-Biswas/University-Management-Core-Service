-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "credits" INTEGER NOT NULL DEFAULT 0,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coursetoprerequisite" (
    "courseld" TEXT NOT NULL,
    "prerequisiteld" TEXT NOT NULL,

    CONSTRAINT "coursetoprerequisite_pkey" PRIMARY KEY ("courseld","prerequisiteld")
);

-- AddForeignKey
ALTER TABLE "coursetoprerequisite" ADD CONSTRAINT "coursetoprerequisite_courseld_fkey" FOREIGN KEY ("courseld") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coursetoprerequisite" ADD CONSTRAINT "coursetoprerequisite_prerequisiteld_fkey" FOREIGN KEY ("prerequisiteld") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
