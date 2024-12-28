// // Import necessary modules
// import React, { useState } from "react";
// import { Box, Typography, IconButton, Paper } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ImageUploader = () => {
//   const [images, setImages] = useState([]);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleDrop = (event) => {
//     event.preventDefault();
//     setIsDragging(false);

//     const files = Array.from(event.dataTransfer.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     const readers = files.map((file) => {
//       const reader = new FileReader();
//       reader.onload = () => setImages((prev) => [...prev, reader.result]);
//       reader.readAsDataURL(file);
//       return reader;
//     });
//   };

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files).filter((file) =>
//       file.type.startsWith("image/")
//     );
//     const readers = files.map((file) => {
//       const reader = new FileReader();
//       reader.onload = () => setImages((prev) => [...prev, reader.result]);
//       reader.readAsDataURL(file);
//       return reader;
//     });
//   };

//   const clearImage = (index) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         gap: 2,
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           border: "2px dashed",
//           borderColor: isDragging ? "primary.main" : "grey.400",
//           borderRadius: 2,
//           padding: 4,
//           textAlign: "center",
//           width: "100%",
//           maxWidth: 500,
//           transition: "border-color 0.3s, box-shadow 0.3s",
//           boxShadow: isDragging ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
//           cursor: "pointer",
//         }}
//         onClick={() => document.getElementById("fileInput").click()}
//         onDragOver={(e) => {
//           e.preventDefault();
//           setIsDragging(true);
//         }}
//         onDragLeave={() => setIsDragging(false)}
//         onDrop={handleDrop}
//       >
//         <Typography
//           variant="h6"
//           color={isDragging ? "primary" : "textSecondary"}
//         >
//           Drag & Drop images here, or click to select
//         </Typography>
//         <input
//           id="fileInput"
//           type="file"
//           accept="image/*"
//           multiple
//           hidden
//           onChange={handleFileChange}
//         />
//       </Paper>
//       <Box
//         sx={{
//           display: "flex",
//           flexWrap: "wrap",
//           gap: 2,
//           justifyContent: "center",
//         }}
//       >
//         {images.map((image, index) => (
//           <Paper
//             key={index}
//             elevation={3}
//             sx={{
//               padding: 2,
//               textAlign: "center",
//               width: "150px",
//               position: "relative",
//             }}
//           >
//             <img
//               src={image}
//               alt={`Preview ${index + 1}`}
//               style={{
//                 maxWidth: "100%",
//                 maxHeight: "100px",
//                 borderRadius: "8px",
//               }}
//             />
//             <IconButton
//               color="error"
//               onClick={() => clearImage(index)}
//               sx={{ position: "absolute", top: 0, right: 0 }}
//             >
//               <DeleteIcon />
//             </IconButton>
//           </Paper>
//         ))}
//       </Box>
//     </Box>
//   );
// };

// export default ImageUploader;

// Import necessary modules
import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Button,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ7XCJ1c2VyX2NvZGVcIjogXCIxMjM0NVwifSIsImV4cCI6MTczNzk4MjkxMy4zOTc5NDZ9.EC6xy18jc_KuSJL1q_CMIq_l4zLWcJYOvQWprCtu5pI`;

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    const files = Array.from(event.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () =>
        setImages((prev) => [...prev, { file, preview: reader.result }]);
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files).filter((file) =>
      file.type.startsWith("image/")
    );
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () =>
        setImages((prev) => [...prev, { file, preview: reader.result }]);
      reader.readAsDataURL(file);
    });
  };

  const clearImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async () => {
    try {
      const formData = new FormData();
      images.forEach(({ file }) => {
        formData.append("file", file);
      });
      const response = await fetch(
        "https://api.mealland.ir/v1/pa/files/image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      console.log("Upload successful:", data);
      //   alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images.");
    }
  };

  return (
    <Stack alignItems={"center"} gap="10px" sx={{ my: "100px" }}>
      <Paper
      component={Stack}
      alignItems={'center'}
      justifyContent={'center'}
        elevation={3}
        sx={{
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "grey.400",
          borderRadius: 2,
          textAlign: "center",
          transition: "border-color 0.3s, box-shadow 0.3s",
          boxShadow: isDragging ? "0 0 10px rgba(0, 0, 0, 0.2)" : "none",
          cursor: "pointer",
          p:'10px',
          width:200,
          height:100
        }}
        onClick={() => document.getElementById("fileInput").click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <IconButton>
          <CloudUploadOutlinedIcon
            color={isDragging ? "primary" : "textSecondary"}
          />
        </IconButton>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleFileChange}
        />
      </Paper>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          justifyContent: "center",
        }}
      >
        {images.map((image, index) => (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: 2,
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
        ))}
      </Box>
      {images.length > 0 && (
        <Button variant="contained" color="primary" onClick={uploadImages}>
          آپلود
        </Button>
      )}
    </Stack>
  );
};

export default ImageUploader;
