import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { TermOfStudy } from "../../../content-management/term-of-study/entities/term-of-study.entity";
import { IVideo } from "../entities/learning-material.entity";

export class CreateLearningMaterialDto {
    readonly _id?: string;
    readonly gradeLevel: GradeLevel;
    readonly book: Book;
    readonly chapter: Chapter;
    readonly section: Section;
    readonly subject: Subject;
    readonly videos: IVideo[];

    @ApiProperty({ type: "string", format: "binary" })
    public pdfFiles: string[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
