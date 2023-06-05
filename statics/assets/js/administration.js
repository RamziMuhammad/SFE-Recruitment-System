$(document).ready(function () {
  $("#example").DataTable({
    pagingType: "full_numbers",
  });
});

const deleteApplicantsForm = document.getElementById("deleteApplicants");

const deleteAllApplicants = async () => {
  const response = await fetch(
    "http://localhost:3000/sfe-rs/admin/applicants",
    {
      method: "DELETE",
    }
  );

  const json = await response.json();
  console.log(json);
};

deleteApplicantsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  deleteAllApplicants();
});

/*
 * Delete Only One Applicant
 */
const deleteOneApplicantForm = document.getElementById("deleteOne");

const deleteOneApplicant = async () => {
  const appId = document.getElementById("appId").value;
  const response = await fetch(
    `http://localhost:3000/sfe-rs/admin/applicant/${appId}`,
    {
      method: "DELETE",
    }
  );

  const json = await response.json();
  console.log(json);
};

deleteOneApplicantForm.addEventListener("submit", (e) => {
  e.preventDefault();
  deleteOneApplicant();
});
