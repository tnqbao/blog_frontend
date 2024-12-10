import sharp from "sharp";

export const resizeImage = async (base64: string, maxWidth: number, maxHeight: number): Promise<Buffer> => {
    const buffer = Buffer.from(base64.split(',')[1], 'base64');
    const resizedImage = await sharp(buffer)
        .resize({
            width: maxWidth,
            height: maxHeight,
            fit: "inside",
        })
        .jpeg({ quality: 100 })
        .toBuffer();

    return resizedImage;
};
