import { ApiProperty } from "@nestjs/swagger";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { TermOfStudy } from "../../../content-management/term-of-study/entities/term-of-study.entity";

export class CreateEssayQuestionsDto {
    readonly _id?: string;
    @ApiProperty({
        description: "Grade level id",
        example: "64d5513027862ad356480ff0",
    })
    readonly gradeLevel: GradeLevel;

    @ApiProperty({
        description: "Book id",
        example: "64d5513027862ad356480ff0",
    })
    readonly book: Book;

    @ApiProperty({
        description: "Chapter id",
        example: "64d5513027862ad356480ff0",
    })
    readonly chapter: Chapter;

    @ApiProperty({
        description: "Section id",
        example: "64d5513027862ad356480ff0",
    })
    readonly section: Section;

    @ApiProperty({
        description: "Subject id",
        example: "64d5513027862ad356480ff0",
    })
    readonly subject: Subject;

    @ApiProperty({ type: "string", format: "binary" })
    public pdfFiles: string[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}
