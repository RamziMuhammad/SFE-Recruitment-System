const uploadForm = document.getElementById("uploadForm");

const uploadVideo = async () => {
  // Object
  const myFiles = document.getElementById("myVideo").files;

  const formData = new FormData();

  Object.keys(myFiles).forEach((key) => {
    formData.append(myFiles.item(key).name, myFiles.item(key));
  });

  const response = await fetch(
    "http://localhost:3000/sfe-rs/applicant/upload-video",
    {
      method: "POST",
      body: formData,
    }
  );

  const json = await response.json();
  console.log(json);
};

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  uploadVideo();
});
