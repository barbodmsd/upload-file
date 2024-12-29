// // Import necessary modules
// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   IconButton,
//   Paper,
//   Stack,
// } from "@mui/material";
// import React, { useState } from "react";

// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJ1c2VyX2NvZGVcIjogXCIxMjM0NVwifSIsImV4cCI6MTczNzk4MjkxMy4zOTc5NDZ9.EC6xy18jc_KuSJL1q_CMIq_l4zLWcJYOvQWprCtu5pI`;

// const ImageUploader = ({ setImagesName }) => {
//   const [images, setImages] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);
//   const [isUploading, setIsUploading] = useState(false);

//   const processFiles = (files) => {
//     const validFiles = Array.from(files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     validFiles.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = () =>
//         setImages((prev) => [...prev, { file, preview: reader.result }]);
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsDragging(false);
//     processFiles(event.dataTransfer.files);
//   };

//   const handleFileChange = (event) => {
//     processFiles(event.target.files);
//   };

//   const clearImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   // the function who write the image to the server

//   const uploadImages = async () => {
//     setIsUploading(true);
//     try {
//       const formData = new FormData();
//       images.forEach(({ file }) => formData.append("file", file));
//       const response = await fetch(
//         "https://api.mealland.ir/v1/pa/files/image",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           body: formData,
//         }
//       );
//       const data = await response.json();
//       setImagesName(data?.data?.file_name);
//       // alert("Images uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       // alert("Failed to upload images.");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   // image preview items
//   const items = images?.map((image, index) => (
//     <Paper
//       key={index}
//       elevation={3}
//       sx={{
//         padding: '5px 30px',
//         textAlign: "center",
//         // width: "150px",
//         position: "relative",
//       }}
//     >
//       <img
//         src={image?.preview}
//         alt={`Preview ${index + 1}`}
//         style={{
//           maxWidth: "100%",
//           maxHeight: "100px",
//           borderRadius: "8px",
//         }}
//       />
//       <IconButton
//         color="error"
//         onClick={() => clearImage(index)}
//         sx={{ position: "absolute", top: 0, right: 0,p:0 }}
//       >
//         <DeleteIcon />
//       </IconButton>
//     </Paper>
//   ));

//   return (
//     <Stack alignItems={"center"} gap="10px" sx={{ my: "100px" }}>
//       {/* the drop paper */}
//       <Paper
//         component={Stack}
//         alignItems={"center"}
//         justifyContent={"center"}
//         elevation={3}
//         sx={{
//           border: "2px dashed",
//           borderColor: isDragging ? "primary.main" : "grey.400",
//           borderRadius: 2,
//           textAlign: "center",
//           transition: "border-color 0.3s, box-shadow 0.3s",
//           boxShadow: isDragging ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
//           cursor: "pointer",
//           p: "10px",
//           width: 200,
//           height: 100,
//         }}
//         onClick={() => document.getElementById("fileInput").click()}
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//       >
//         <IconButton>
//           <CloudUploadOutlinedIcon
//             color={isDragging ? "primary" : "textSecondary"}
//           />
//         </IconButton>
//         <input
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           multiple
//           hidden
//           onChange={handleFileChange}
//         />
//       </Paper>
//       {/* choose  file */}
//       <Button
//         variant="outlined"
//         onClick={() => document.getElementById("fileInput").click()}
//         sx={{ bgcolor: "black", color: "white", fontWeight: "bolder" }}
//       >
//         انتخاب فایل
//       </Button>
//       {/* preview box */}
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 2,
//           justifyContent: "center",
//         }}
//       >
//         {items}
//       </Box>
//       {/* if user choose file than show upload button */}
//       {images.length > 0 && (
//         <Button
//           variant="outlined"
//           onClick={uploadImages}
//           disabled={isUploading}
//           sx={{
//             bgcolor: isUploading ? "grey.400" : "black",
//             color: "white",
//             fontWeight: "bolder",
//             width: "100px",
//           }}
//         >
//           {isUploading ? <CircularProgress size="25px" /> : "آپلود"}
//         </Button>
//       )}
//     </Stack>
//   );
// };

// export default ImageUploader;

// Import necessary modules
import React, { useState, useCallback, useMemo } from "react";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJ1c2VyX2NvZGVcIjogXCIxMjM0NVwifSIsImV4cCI6MTczNzk4MjkxMy4zOTc5NDZ9.EC6xy18jc_KuSJL1q_CMIq_l4zLWcJYOvQWprCtu5pI`;

const ImageUploader = ({ setImagesName }) => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const processFiles = useCallback((files) => {
    const validFiles = Array.from(files).filter((file) =>
      file.type.startsWith("image/")
    );
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setImages((prev) => [...prev, { file, preview: reader.result }]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragging(false);
      if (event.dataTransfer && event.dataTransfer.files) {
        processFiles(event.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleFileChange = useCallback(
    (event) => {
      if (event.target && event.target.files) {
        processFiles(event.target.files);
      }
    },
    [processFiles]
  );

  const clearImage = useCallback((index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const uploadImages = useCallback(async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      images.forEach(({ file }) => formData.append("file", file));

      const response = await fetch("https://api.mealland.ir/v1/pa/files/image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      setImagesName(data?.data?.file_name);
      // alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      // alert("Failed to upload images.");
    } finally {
      setIsUploading(false);
    }
  }, [images, setImagesName]);

  const items = useMemo(
    () =>
      images.map((image, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{
            padding: "5px 1px",
            textAlign: "center",
            width: "150px",
            position: "relative",
          }}
        >
          <img
            src={image.preview}
            alt={`Preview ${index + 1}`}
            style={{
              maxWidth: "100%",
              maxHeight: "100px",
              borderRadius: "8px",
            }}
          />
          <IconButton
            color="error"
            onClick={() => clearImage(index)}
            sx={{ position: "absolute", top: 0, right: 0 }}
          >
            <DeleteIcon />
          </IconButton>
        </Paper>
      )),
    [images, clearImage]
  );

  return (
    <Stack alignItems={"center"} gap="10px" sx={{ my: "100px" }}>
      {/* Drag-and-Drop Area */}
      <Paper
        component={Stack}
        alignItems={"center"}
        justifyContent={"center"}
        elevation={3}
        sx={{
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "grey.400",
          borderRadius: 2,
          textAlign: "center",
          transition: "border-color 0.3s, box-shadow 0.3s",
          boxShadow: isDragging ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
          cursor: "pointer",
          p: "10px",
          width: 200,
          height: 100,
        }}
        onClick={() => document.getElementById("fileInput").click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {/* <IconButton> */}
          <CloudUploadOutlinedIcon
            color={isDragging ? "primary" : "textSecondary"}
          />
        {/* </IconButton> */}
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </Paper>
      {/* Choose File Button */}
      <Button
        variant="outlined"
        onClick={() => document.getElementById("fileInput").click()}
        sx={{ bgcolor: "black", color: "white", fontWeight: "bolder" }}
      >
        انتخاب فایل
      </Button>
      {/* Preview Images */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {items}
      </Box>
      {/* Upload Button */}
      {images.length > 0 && (
        <Button
          variant="outlined"
          onClick={uploadImages}
          disabled={isUploading}
          sx={{
            bgcolor: isUploading ? "grey.400" : "black",
            color: "white",
            fontWeight: "bolder",
            width: "100px",
          }}
        >
          {isUploading ? <CircularProgress size={20} sx={{ color: "white" }} /> : "آپلود"}
        </Button>
      )}
    </Stack>
  );
};

export default ImageUploader;
