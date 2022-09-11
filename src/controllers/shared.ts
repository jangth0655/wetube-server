import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ID!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

export const UploadToS3 = async (
  uploadFile: any,
  userId: string,
  foldName: string
) => {
  const { filename, createReadSteam } = await uploadFile;
  console.log(filename);
  console.log(createReadSteam);
};
