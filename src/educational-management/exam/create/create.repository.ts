import {
  Body,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Req,
  Res,
  UploadedFiles,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateExam } from "./entities/create.entity";
import { CreateCreateExamDto } from "./dto/create-create.dto";
import { UpdateCreateExamDto } from "./dto/update-create.dto";
import { ImageService } from "../../../common/services/imageService";
import * as fs from "fs";
import { existsSync } from "fs";
@Injectable()
export class CreateExamRepository {
  constructor(
    @InjectModel(CreateExam.name)
    private readonly createExamModel: Model<CreateExam>,
    private readonly imageService: ImageService
  ) {}

  async findOneByTitle(title: string) {
    return this.createExamModel.findOne({ title }).exec();
  }
  async create(
    @Res() res,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    @Body() createCreateExamDto: CreateCreateExamDto
  ) {
    try {
      if (AnswerSheetSourcePdfFile && AnswerSheetSourcePdfFile.length > 0) {
        let answersheetPdfPath: { title: string; link: string }[] = [];

        for (let i = 0; i < AnswerSheetSourcePdfFile.length; i++) {
          const file = AnswerSheetSourcePdfFile[i];
          const fileName = await this.imageService.saveImage(
            "educational_management/create_exam",
            file
          );
          answersheetPdfPath.push({
            title: Buffer.from(file.originalname, "ascii").toString("utf8"),
            link: fileName,
          });
        }

        createCreateExamDto.AnswerSheetSourcePdfFile = answersheetPdfPath;
      }

      const createCreateExamModel = await this.createExamModel.create(
        createCreateExamDto
      );

      return res.status(200).json({
        statusCode: 200,
        message: "شناسنامه سوال با موفقیت ایجاد شد",
        data: createCreateExamModel,
      });
    } catch (e) {
      return res.status(500).json({
        statusCode: 500,
        message: e.message,
      });
    }
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;

    const createExams = await this.createExamModel
      .find({})
      .skip(skip)
      .limit(limit);
    const totalCreateExams = await this.createExamModel.find({}).count();

    if (createExams.length == 0) {
      return [];
    }
    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }
  async findAllCreateExamsBasedOnStandardExam() {
    const createExams = await this.createExamModel
      .find({ type: "standard" })
      .populate(["books", "gradeLevel", "chapter", "term"]);

    if (createExams.length == 0) {
      return [];
    }
    return createExams;
  }

  async findCreateStandardExamsBasedOnChaptersAndExamTypes(
    page: number = 1,
    limit: number = 10,
    chapters: string,
    types: string
  ) {
    const skip = (page - 1) * limit;

    const createExamIds = await this.createExamModel
      .find({
        chapter: chapters,
        type: "standard",
        examType: types,
      })

      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalCreateExams = await this.createExamModel.countDocuments({
      chapter: {
        $in: [chapters],
      },
      examType: types,
    });
    const createExams = await this.createExamModel
      .find({
        _id: {
          $in: createExamIds,
        },
      })
      .populate(["chapter", "gradeLevel", "books"]);
    if (createExams.length === 0) {
      return [];
    }

    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }

  async findCreateStandardExamsBasedOnChapters(
    page: number = 1,
    limit: number = 10,
    chapters: string
  ) {
    const skip = (page - 1) * limit;

    const createExamIds = await this.createExamModel
      .find({
        chapter: chapters,
        type: "standard",
      })

      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalCreateExams = await this.createExamModel.countDocuments({
      chapter: {
        $in: [chapters],
      },
    });
    const createExams = await this.createExamModel
      .find({
        _id: {
          $in: createExamIds,
        },
      })
      .populate(["chapter", "gradeLevel", "books"]);
    if (createExams.length === 0) {
      return [];
    }

    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }

  async findCreateStandardExamsBasedOnTermsAndExamTypes(
    page: number = 1,
    limit: number = 10,
    terms: string,
    types: string
  ) {
    const skip = (page - 1) * limit;

    const createExamIds = await this.createExamModel
      .find({
        term: terms,
        type: "standard",
        examType: types,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalCreateExams = await this.createExamModel.countDocuments({
      term: {
        $in: [terms],
      },
      examType: types,
    });

    const createExams = await this.createExamModel.find({
      _id: {
        $in: createExamIds,
      },
    });

    if (createExams.length === 0) {
      return [];
    }

    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }

  async findCreateStandardExamsBasedOnTerms(
    page: number = 1,
    limit: number = 10,
    terms: string
  ) {
    const skip = (page - 1) * limit;

    const createExamIds = await this.createExamModel
      .find({
        term: terms,
        type: "standard",
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalCreateExams = await this.createExamModel.countDocuments({
      term: {
        $in: [terms],
      },
    });

    const createExams = await this.createExamModel.find({
      _id: {
        $in: createExamIds,
      },
    });

    if (createExams.length === 0) {
      return [];
    }

    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }

  async findCreateSubjectiveExamsBasedOnSubjects(
    page: number = 1,
    limit: number = 10,
    subjects: string
  ) {
    const skip = (page - 1) * limit;

    const createExamIds = await this.createExamModel
      .find({
        subject: subjects,
        type: "subjective",
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalCreateExams = await this.createExamModel.countDocuments({
      subject: {
        $in: [subjects],
      },
    });

    const createExams = await this.createExamModel
      .find({
        _id: {
          $in: createExamIds,
        },
      })
      .populate(["gradeLevel", "books", "chapter", "section"]);
    if (createExams.length === 0) {
      return [];
    }

    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }

  async findCreateSubjectiveExamsBasedOnSubjectsExamLevelAndExamType(
    page: number = 1,
    limit: number = 10,
    subjects: string,
    examLevel: string,
    examType: string
  ) {
    const skip = (page - 1) * limit;

    const createExamIds = await this.createExamModel
      .find({
        subject: subjects,
        type: "subjective",
        examLevel,
        examType,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalCreateExams = await this.createExamModel.countDocuments({
      subject: {
        $in: [subjects],
      },
      examLevel,
      examType,
    });

    const createExams = await this.createExamModel
      .find({
        _id: {
          $in: createExamIds,
        },
      })
      .populate(["gradeLevel", "books", "chapter", "section"]);
    if (createExams.length === 0) {
      return [];
    }

    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }

  async findAllCreateExamsBasedOnSubjectiveExam() {
    const createExams = await this.createExamModel
      .find({ type: "subjective" })
      .populate(["gradeLevel", "section", "subject", "chapter", "books"]);

    if (createExams.length == 0) {
      return [];
    }
    return createExams;
  }

  async findCreateExamsBasedOnBooks(
    page: number = 1,
    limit: number = 10,
    books: string
  ) {
    const skip = (page - 1) * limit;

    const createExamIds = await this.createExamModel
      .find({
        books: books,
      })
      .skip(skip)
      .limit(limit)
      .select("_id");

    const totalCreateExams = await this.createExamModel.countDocuments({
      books: {
        $in: [books],
      },
    });

    const createExams = await this.createExamModel
      .find({
        _id: {
          $in: createExamIds,
        },
      })
      .populate("books");

    if (createExams.length === 0) {
      return [];
    }

    return {
      createExams,
      currentPage: page,
      totalPages: Math.ceil(totalCreateExams / limit),
      totalItems: totalCreateExams,
    };
  }

  findOne(@Param("id") id: string) {
    return this.createExamModel.findOne({ _id: id });
  }

  async update(
    @Res() res,

    @Param("id") id: string,
    @UploadedFiles() AnswerSheetSourcePdfFile: Express.Multer.File[],
    @Body() updateCreateExamDto: UpdateCreateExamDto
  ) {
    try {
      const createExam = await this.createExamModel.findOne({ _id: id });

      if (!createExam) {
        throw new NotFoundException("آزمون مورد نظر یافت نشد.");
      }
      if (AnswerSheetSourcePdfFile && AnswerSheetSourcePdfFile.length == 0) {
        if (updateCreateExamDto?.AnswerSheetSourcePdfFile?.length > 0) {
          let arrayConversion =
            updateCreateExamDto.AnswerSheetSourcePdfFile.map((element: any) => {
              return { name: JSON.parse(element).name };
            });
          if (createExam.AnswerSheetSourcePdfFile.length > 0) {
            for (
              let i = 0;
              i < createExam.AnswerSheetSourcePdfFile.length;
              i++
            ) {
              const file = createExam.AnswerSheetSourcePdfFile[i].link;

              let findIndex = arrayConversion.findIndex((element) => {
                return element.name == file.split("/")[3];
              });

              if (findIndex == -1) {
                if (existsSync(file)) {
                  try {
                    fs.unlinkSync(`${file}`);
                    await this.createExamModel.findByIdAndUpdate(
                      id,
                      {
                        $pull: {
                          pdfFiles: createExam.AnswerSheetSourcePdfFile[i],
                        },
                      },
                      { new: true }
                    );
                  } catch (err) {
                    throw new InternalServerErrorException(
                      "خطایی در حذف فایل قدیمی رخ داده است."
                    );
                  }
                }
              } else {
              }
            }
          }
        } else {
          for (let i = 0; i < createExam.AnswerSheetSourcePdfFile.length; i++) {
            const file = createExam.AnswerSheetSourcePdfFile[i].link;
            await this.createExamModel.findByIdAndUpdate(
              id,
              { $pull: { pdfFiles: createExam.AnswerSheetSourcePdfFile[i] } },
              { new: true }
            );
            if (existsSync(file)) {
              try {
                fs.unlinkSync(`${file}`);
                await this.createExamModel.findByIdAndUpdate(
                  id,
                  {
                    $pull: { pdfFiles: createExam.AnswerSheetSourcePdfFile[i] },
                  },
                  { new: true }
                );
              } catch (err) {
                throw new InternalServerErrorException(
                  "خطایی در حذف فایل قدیمی رخ داده است."
                );
              }
            }
          }
        }

        return res.status(200).json({
          statusCode: 200,
          message: "ضمیمه  با موفقیت بروزرسانی شد.",
        });
      }
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: " آزمون استاندارد یا موضوعی مورد نظر با موفقیت بروزرسانی شد",
        data: updateCreateExamDto,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          "مشکلی در بروزرسانی آزمون استاندارد یا موضوعی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }

  async remove(@Res() res, @Param("id") id: string) {
    try {
      const findCreateExam = await this.findOne(id);
      if (findCreateExam) {
        const file = findCreateExam.AnswerSheetSourcePdfFile[0]?.link;

        if (existsSync(file)) {
          try {
            fs.unlinkSync(`${file}`);
          } catch (err) {
            throw new InternalServerErrorException(
              "خطایی در حذف فایل رخ داده است."
            );
          }
        }
      }

      const deleteSectionModel = await this.createExamModel.deleteOne({
        _id: id,
      });
      if (!deleteSectionModel) {
        return res.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: "آزمون استاندارد یا موضوعی مورد نظر پیدا نشد",
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "آزمون استاندارد یا موضوعی مورد نظر با موفقیت حذف شد",
        data: deleteSectionModel,
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message:
          "مشکلی در حذف آزمون استاندارد یا موضوعی مورد نظر به وجود آمده است",
        error: error.message,
      });
    }
  }
}
