import { useState } from "react";
import ImageUploader from "./UploadFile";

const serverImages = [
  "https://api.mealland.ir/statics/tag_icon/ghahveDami.svg",
  "https://api.mealland.ir/statics/tag_icon/ghahveDami.svg",
  "https://api.mealland.ir/statics/tag_icon/ghahveDami.svg",
];

export default function App() {
  const [imagesName, setImagesName] = useState();

  console.log(imagesName); // now you have the name of images

  return (
    <>
      <ImageUploader
        setImagesName={setImagesName}
        serverImages={serverImages}
      />
    </>
  );
}
