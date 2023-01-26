import multer from "multer";
// type DestinationCallback = (error: Error | null, destination: string) => void;
// type FileNameCallback = (error: Error | null, filename: string) => void;

// const storage = multer.diskStorage({
//   destination: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: DestinationCallback
//   ): void => {
//     cb(null, "uploads/profileImage/");
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: FileNameCallback
//   ): void => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${uniqueSuffix}_${file.originalname}`);
//   },
// });
const upload = multer({
  storage: multer.memoryStorage(),
});

export default upload;
