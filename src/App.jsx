import { useState } from "react";
import ImageUploader from "./UploadFile";

export default function App() {
  const [images, setImages] = useState([]);

  // handle images
  const handleImages = (name, type = "send") => {
    if (type === "remove") {
      const newImages = images?.filter((e) => e?.split(" ")[1] != name);
      setImages(newImages);
    } else {
      setImages((prev) => [...prev, "new " + name]);
    }
  };

  // ////////////////////////////////////////////////////
  // for update and show old images from the server like update products
  useEffect(() => {
    (async () => {
      const res = await fetchData(`product?product_code=${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProduct(res?.data?.data[0]);

      // here is important
      const oldImages = res?.data?.data[0]?.images;
      const newImages =
        typeof oldImages === "string"
          ? ["old " + oldImages]
          : oldImages?.map((e) => "old " + e);
      setImages(newImages);
    })();
  }, [id]);

  // ///////////////////////////////////////////////////////
  // in send data you should remove the old or new flag in images array
  const onSubmit = async (e) => {
    try {
      const res = await fetchData("pa/product", {
        method: "PUT",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...e,
          // here
          images: images.map((e) => e.split(" ")[1]), // if the images is an array
          image: images[0]?.split(" ")[1], // if the image is a string
          fields,
          code: product?.code,
        }),
      });
      if (res?.status === "ok") {
        toast.success(res?.data?.msg);
        navigate("/admin/products");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ImageUploader initial={images} handleImages={handleImages} />
    </>
  );
}
