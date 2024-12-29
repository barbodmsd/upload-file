// // Import necessary modules
// import React, { useState, useCallback, useMemo } from "react";
// import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
// import DeleteIcon from "@mui/icons-material/Delete";
// import {
//   Box,
//   Button,
//   IconButton,
//   Paper,
//   Stack,
//   CircularProgress,
// } from "@mui/material";

// const ImageUploader = ({ setImagesName }) => {
//   const [images, setImages] = useState(['https://api.mealland.ir/statics/tag_icon/sharbat.svg','https://api.mealland.ir/statics/tag_icon/ghahveDami.svg']); //state to set images file
//   const [isDragging, setIsDragging] = useState(false); //state to check if file is being dragged
//   const [isUploading, setIsUploading] = useState(false); //state to check if file is being uploaded

//   // this function read all the files selected by the user
//   // and if all the files format is be true its add to images state
//   const processFiles = useCallback((files) => {
//     // if file be valid or not
//     const validFiles = Array.from(files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     // add each file into images state
//     validFiles.forEach((file) => {
//       const reader = new FileReader();
//       reader.onload = () => {
//         setImages((prev) => [...prev, { file, preview: reader.result }]);
//       };
//       reader.readAsDataURL(file);
//     });
//   }, []);

//   // this function read all the files draped by the user
//   // and it's atomically call the processFiles function
//   const handleDrop = useCallback(
//     (event) => {
//       event.preventDefault();
//       setIsDragging(false);
//       if (event.dataTransfer && event.dataTransfer.files) {
//         processFiles(event.dataTransfer.files);
//       }
//     },
//     [processFiles]
//   );

//   // this function read all the files selected by the user
//   const handleFileChange = useCallback(
//     (event) => {
//       if (event.target && event.target.files) {
//         processFiles(event.target.files);
//       }
//     },
//     [processFiles]
//   );

//   // this function will be clear the file from images state
//   const clearImage = useCallback((index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   }, []);

//   // here where you can write the request and get the filename from the server
//   const uploadImages = useCallback(async () => {
//     setIsUploading(true);
//     try {
//       const formData = new FormData();
//       images.forEach(({ file }) => formData.append("file", file));

//       const response = await fetch(import.meta.env.VITE_API, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
//         },
//         body: formData,
//       });

//       const data = await response.json();
//       // i usually send the filename to the parent state
//       setImagesName(data?.data?.file_name);
//       // alert("Images uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading images:", error);
//       // alert("Failed to upload images.");
//     } finally {
//       setIsUploading(false);
//     }
//   }, [images, setImagesName]);

//   // preview items
//   const items = useMemo(
//     () =>
//       images.map((image, index) => (
//         <Paper
//           key={index}
//           elevation={3}
//           sx={{
//             padding: "5px 1px",
//             textAlign: "center",
//             width: "150px",
//             position: "relative",
//           }}
//         >
//           {/* image preview */}
//           <img
//             src={image.preview}
//             alt={`Preview ${index + 1}`}
//             style={{
//               maxWidth: "100%",
//               maxHeight: "100px",
//               borderRadius: "8px",
//             }}
//           />
//           {/* icon to remove image from images state */}
//           <IconButton
//             color="error"
//             onClick={() => clearImage(index)}
//             sx={{ position: "absolute", top: 0, right: 0 }}
//           >
//             <DeleteIcon />
//           </IconButton>
//         </Paper>
//       )),
//     [images, clearImage]
//   );

//   return (
//     <Stack alignItems={"center"} gap="10px" sx={{ my: "100px", }}>
//       {/* Drag-and-Drop Area */}
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
//         {/* <IconButton> */}
//         <CloudUploadOutlinedIcon
//           color={isDragging ? "primary" : "textSecondary"}
//         />
//         {/* </IconButton> */}
//         <input
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           multiple
//           hidden
//           onChange={handleFileChange}
//         />
//       </Paper>
//       {/* Choose File Button */}
//       <Button
//         variant="outlined"
//         onClick={() => document.getElementById("fileInput").click()}
//         sx={{ bgcolor: "black", color: "white", fontWeight: "bolder" }}
//       >
//         انتخاب فایل
//       </Button>
//       {/* Preview Images */}
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
//       {/* Upload Button */}
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
//           {isUploading ? (
//             <CircularProgress size={20} sx={{ color: "white" }} />
//           ) : (
//             "آپلود"
//           )}
//         </Button>
//       )}
//     </Stack>
//   );
// };

// export default ImageUploader;

import React, { useState, useCallback, useMemo, useEffect } from "react";
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

const ImageUploader = ({ setImagesName, serverImages = [] }) => {
  const [images, setImages] = useState([]); // State to hold images
  const [isDragging, setIsDragging] = useState(false); // State to check if file is being dragged
  const [isUploading, setIsUploading] = useState(false); // State to check if file is being uploaded
  console.log(images)
  // Initialize images with server data if available
  useEffect(() => {
    if (serverImages.length > 0) {
      const formattedImages = serverImages.map((url) => ({
        file: null, // No local file associated with server images
        preview: url,
      }));
      setImages(formattedImages);
    }
  }, [serverImages]);

  // Process files selected or dropped
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

  // Handle drag-and-drop
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

  // Handle file input change
  const handleFileChange = useCallback(
    (event) => {
      if (event.target && event.target.files) {
        processFiles(event.target.files);
      }
    },
    [processFiles]
  );

  // Clear image from state
  const clearImage = useCallback((index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Upload images to server
  const uploadImages = useCallback(async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      images.forEach(({ file }) => {
        if (file) {
          formData.append("file", file);
        }
      });

      const response = await fetch(import.meta.env.VITE_API, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
        body: formData,
      });

      const data = await response.json();
      setImagesName(data?.data?.file_name);
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsUploading(false);
    }
  }, [images, setImagesName]);

  // Preview items
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
        <CloudUploadOutlinedIcon
          color={isDragging ? "primary" : "textSecondary"}
        />
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </Paper>
      <Button
        variant="outlined"
        onClick={() => document.getElementById("fileInput").click()}
        sx={{ bgcolor: "black", color: "white", fontWeight: "bolder" }}
      >
        انتخاب فایل
      </Button>
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
          {isUploading ? (
            <CircularProgress size={20} sx={{ color: "white" }} />
          ) : (
            "آپلود"
          )}
        </Button>
      )}
    </Stack>
  );
};

export default ImageUploader;
