import aws from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';
import {resizeImage} from "@/utils/hooks/useResizeImage";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookie = req.headers.cookie;
    if (req.method === 'POST' && cookie) {

        const { file, fileName } = req.body;
        if (!file || !fileName) {
            return res.status(400).json({ error: 'Missing file or fileName' });
        }
        const s3 = new aws.S3({
            endpoint: process.env.NEXT_PUBLIC_R2_ENDPOINT,
            accessKeyId: process.env.NEXT_PUBLIC_R2_ACCESS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_R2_SECRET_KEY,
            region: 'auto',
        });

        try {
            const resizedBase64 = await resizeImage(file, 500, 600);

            const params = {
                Bucket: process.env.NEXT_PUBLIC_R2_BUCKET_NAME as string,
                Key: fileName,
                Body: resizedBase64,
                ContentType: 'image/jpeg',
                ACL: 'public-read',
            };

            const uploadResult = await s3.upload(params).promise();
            if (!uploadResult) {
                return res.status(500).json({ error: 'Error uploading file' });
            }
            const blobUrl = `${process.env.NEXT_PUBLIC_ENDPOINT_BUCKET}/${fileName}`;
            res.status(200).json({ url: blobUrl });
        } catch (error) {
            console.error('Upload error:', error);
            res.status(500).json({ error: 'Error uploading file' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}