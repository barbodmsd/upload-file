import { useState } from "react";
import ImageUploader from "./UploadFile";

export default function App() {
  const [imagesName, setImagesName] = useState();
  console.log(imagesName)
  return (
    <>
      <ImageUploader setImagesName={setImagesName} />
    </>
  );
}
