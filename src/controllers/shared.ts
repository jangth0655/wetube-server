import AWS from "aws-sdk";

const S3 = new AWS.S3();

export const deleteToS3 = async (file: any) => {
  const decode = decodeURI(file);
  console.log(file);
  S3.deleteObject({
    Bucket: "wetube",
    Key: "",
  }).promise();
};
