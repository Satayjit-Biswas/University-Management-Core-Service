-- CreateTable
CREATE TABLE "course_facultys" (
    "courseId" TEXT NOT NULL,
    "facultyId" TEXT NOT NULL,

    CONSTRAINT "course_facultys_pkey" PRIMARY KEY ("courseId","facultyId")
);

-- AddForeignKey
ALTER TABLE "course_facultys" ADD CONSTRAINT "course_facultys_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_facultys" ADD CONSTRAINT "course_facultys_facultyId_fkey" FOREIGN KEY ("facultyId") REFERENCES "facultys"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
