import { Injectable } from "@nestjs/common";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { extname } from "path";
import { promisify } from "util";
import { randomBytes } from "crypto";

@Injectable()
export class ImageService {
  private async generateRandomName(): Promise<string> {
    const randomBytesAsync = promisify(randomBytes);
    const randomBuffer = await randomBytesAsync(16);
    return randomBuffer.toString("hex");
  }

  async saveImage(
    foldername: string,
    file: Express.Multer.File
  ): Promise<string> {
    const { originalname, buffer } = file;

    // 1. Generate a random file name to avoid conflicts
    const randomName = await this.generateRandomName();

    // 2. Get the file extension from the original name
    const extension = extname(originalname);

    // 3. Create the file path
    const directory = `uploads/${foldername}`;
    const filePath = `${directory}/${randomName}${extension}`;

    // 4. Create the directory if it doesn't exist
    if (!existsSync(directory)) {
      try {
        mkdirSync(directory, { recursive: true });
      } catch (err) {
        throw new Error(`Failed to create directory: ${directory}`);
      }
    }

    // 5. Write the file to disk using a write stream
    const writeStream = createWriteStream(filePath);
    writeStream.write(buffer);

    return filePath;
  }
}
