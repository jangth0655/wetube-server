import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_ID!,
    secretAccessKey: process.env.AWS_SECRET!,
  },
});

const S3 = new AWS.S3();

export const deleteToS3 = async (file: any) => {
  const key = file.split("upload/")[1];
  const fileName = `upload/${key}`;
  console.log(fileName);

  S3.deleteObject({
    Bucket: "wetube-upload",
    Key: fileName,
  }).promise();
};
