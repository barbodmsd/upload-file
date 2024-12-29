import { useState } from "react";
import ImageUploader from "./UploadFile";

export default function App() {
  const [imagesName, setImagesName] = useState();

  console.log(imagesName); // now you have the name of images
  
  return (
    <>
      <ImageUploader setImagesName={setImagesName} />
    </>
  );
}
