import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { Box, IconButton, Stack, styled } from "@mui/material";
import React from "react";
import useFetchData from "../../Hooks/fetchData";
import { useUserStore } from "../../Store/userStore";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ImageUploader({ handleImages, initial }) {
  const { fetchData } = useFetchData();
  const { token } = useUserStore();

  // upload image
  const handleUpload = async (e) => {
    try {
      const formData = new FormData();
      Object?.entries(e)?.map(([_, imageFile]) =>
        formData.append("files", imageFile)
      );
      const res = await fetchData("pa/upload_image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const newImages = res?.data?.filesName;
      newImages?.forEach((e) => handleImages(e));
    } catch (error) {
      console.log(error);
    }
  };

  // preview images
  const items = initial?.map((e, index) => {
    const image =
      e?.split(" ")[0] === "old"
        ? import.meta.env.VITE_IMAGE + e?.split(" ")[1]
        : import.meta.env.VITE_TMP_IMAGE + e?.split(" ")[1];
    return (
      <Stack
        key={index}
        sx={{
          width: 100,
          height: 100,
          overflow: "hidden",
          borderRadius: "10px",
          bgcolor: "white",
          boxShadow: "0 0 5px 0 rgba(0,0,0,.2)",
          position: "relative",
        }}
      >
        {/* image */}
        <Box
          component={"img"}
          src={image}
          sx={{ width: "100%", height: "100%" }}
        />
        {/* delete icon */}
        <IconButton
          onClick={() => handleImages(e?.split(" ")[1], "remove")}
          sx={{ position: "absolute", top: "0", right: "0", p: "2px" }}
        >
          <DeleteRoundedIcon color="error" />
        </IconButton>
      </Stack>
    );
  });

  return (
    <>
      <Stack gap={"30px"} alignItems={"center"}>
        {/* upload box */}
        <Stack
          alignItems={"center"}
          justifyContent={"center"}
          component="label"
          role={undefined}
          tabIndex={-1}
          sx={{
            width: 400,
            height: 200,
            border: "2px dashed ",
            borderColor: "txt.primary",
            borderRadius: "10px",
            transition: "all .5s",
            boxShadow: " 0 0 5px 0 transparent",
            ":hover": {
              borderColor: "teal",
              boxShadow: " 0 0 5px 0 rgba(0,0,0,.5)",
            },
            ":hover >svg": {
              color: "teal",
            },
          }}
        >
          {/* plus icon */}
          <AddRoundedIcon
            sx={{ color: "txt.primary", transition: "all .5s" }}
          />
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => handleUpload(event.target.files)}
            multiple
          />
        </Stack>
        {/* images items */}
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={"10px"}
        >
          {items}
        </Stack>
      </Stack>
    </>
  );
}
