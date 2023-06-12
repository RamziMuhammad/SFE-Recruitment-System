const uploadForm = document.getElementById("uploadForm");

const uploadVideo = async () => {
  const myFiles = document.getElementById("myVideo").files;

  const formData = new FormData();

  Object.keys(myFiles).forEach((key) => {
    formData.append(myFiles.item(key).name, myFiles.item(key));
  });

  if (myFiles.length != 0) {
    var uploadingContainer = document.getElementById("hero");
    if ((uploadingContainer.style.display = "block")) {
      uploadingContainer.style.display = "none"; // Hide the section
    }
    var waitingContainer = document.getElementById("waiting-container");
    if ((waitingContainer.style.display = "none")) {
      waitingContainer.style.display = "flex"; // Show the section
    }
  }

  const response = await fetch(
    "http://localhost:3000/sfe-rs/applicant/upload-video",
    {
      method: "POST",
      body: formData,
    }
  );
  const personalityTraits = await response.json();
  try {
    console.log(personalityTraits);
    var uploadingPartition = document.getElementById("uploading-partition");
    var analysisPartition = document.getElementById("analysis-partition");

    waitingContainer.style.display = "none";
    uploadingContainer.style.display = "block";
    uploadingPartition.style.display = "none";
    analysisPartition.style.display = "block";

    // Assuming you have an array of percentages for the five traits
    const percentages = [30, 50, 70, 90, 60];

    // Load the Google Charts library
    google.charts.load("current", { packages: ["bar"] });
    google.charts.setOnLoadCallback(drawChart);

    // Create and draw the chart
    function drawChart() {
      var data = google.visualization.arrayToDataTable([
        ["Personality Traits", "Percentage"],
        ["Openness", percentages[0]],
        ["Conscientiousness", percentages[1]],
        ["Extraversion", percentages[2]],
        ["Agreeableness", percentages[3]],
        ["Neuroticism", percentages[4]],
      ]);

      var options = {
        animation: {
          duration: 2000,
          easing: "out",
        },
      };

      var chart = new google.charts.Bar(document.getElementById("chart"));
      chart.draw(data, google.charts.Bar.convertOptions(options));
    }
  } catch {}
};

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
  uploadVideo();
});
