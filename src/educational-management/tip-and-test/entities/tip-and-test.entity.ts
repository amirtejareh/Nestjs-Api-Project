import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as mongooseSchema } from "mongoose";
import { GradeLevel } from "../../../content-management/grade-level/entities/grade-level.entity";
import { Book } from "../../../content-management/book/entities/book.entity";
import { Chapter } from "../../../content-management/chapter/entities/chapter.entity";
import { Section } from "../../../content-management/section/entities/section.entity";
import { Subject } from "../../../content-management/subject/entities/subject.entity";
import { IVideo } from "../../../interface/IEntity";

export type TipAndTestDocument = TipAndTest & Document;

@Schema({ timestamps: true })
export class TipAndTest {
    @Prop({
        type: [{ type: mongooseSchema.Types.ObjectId, ref: GradeLevel.name }],
    })
    gradeLevel: GradeLevel;

    @Prop({
        type: [{ type: mongooseSchema.Types.ObjectId, ref: Book.name }],
    })
    book: Book;

    @Prop({
        type: [{ type: mongooseSchema.Types.ObjectId, ref: Chapter.name }],
    })
    chapter: Chapter;

    @Prop({
        type: [{ type: mongooseSchema.Types.ObjectId, ref: Section.name }],
    })
    section: Section;

    @Prop({
        type: [{ type: mongooseSchema.Types.ObjectId, ref: Subject.name }],
    })
    subject: Subject;

    @Prop({
        required: true,
    })
    videos: IVideo[];

    @Prop({
        required: true,
    })
    pdfFiles: string[];
}

export const TipAndTestSchema = SchemaFactory.createForClass(TipAndTest);
