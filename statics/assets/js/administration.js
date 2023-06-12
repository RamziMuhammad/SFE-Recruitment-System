$(document).ready(function () {
  $("#example").DataTable({
    pagingType: "full_numbers",
  });

  const table = $("#example");
  $("#tableBody").detach();
  table.append(`
          <tbody id="tableBody">
          </tbody>
          `);
});

/*
 * List All Applicants
 */

const listApplicantsForm = document.getElementById("listApplicants");

const listApplicants = async () => {
  var tableContainer = document.getElementById("table-container");
  if ((tableContainer.style.display = "none")) {
    tableContainer.style.display = "block"; // Show the section
  }

  const response = await fetch(
    "http://localhost:3000/sfe-rs/admin/applicants",
    {
      method: "GET",
    }
  );
  $("#tableRow").detach();
  const tableBody = $("#tableBody");
  if (response.ok) {
    const data = await response.json();
    data.forEach((row) => {
      tableBody.append(`
            <tr id="tableRow">
              <td>${row._id}</td>
              <td>${row.name}</td>
              <td>${row.email}</td>
              <td>${row.gender}</td>
              <td>${row.age}</td>
              <td>${row.major}</td>
            </tr>
      `);
    });

    const table = $("#example").DataTable();
    table.destroy();
    $("#example").DataTable({
      pagingType: "full_numbers",
    });
  } else {
    throw new Error("Request failed with status " + response.status);
  }
};

listApplicantsForm.addEventListener("submit", (e) => {
  e.preventDefault();
  listApplicants();
});

/*
 * Delete All Applicants
 */
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
