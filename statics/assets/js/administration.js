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
  try {
    const response = await fetch(
      "http://localhost:3000/sfe-rs/admin/applicants",
      {
        method: "GET",
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      var tableContainer = document.getElementById("table-container");
      if ((tableContainer.style.display = "none")) {
        tableContainer.style.display = "block"; // Show the section
      }
      $("#tableRow").detach();
      const tableBody = $("#tableBody");
      responseData.forEach((row) => {
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
      alert(responseData.message);
    }
  } catch (error) {
    console.log(error);
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
  try {
    const response = await fetch(
      "http://localhost:3000/sfe-rs/admin/applicants",
      {
        method: "DELETE",
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      alert(`All applicants deleted.`);
      location.reload();
    } else {
      alert(responseData.message);
    }
  } catch (error) {
    console.log(error);
  }
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
  try {
    const response = await fetch(
      `http://localhost:3000/sfe-rs/admin/applicant/${appId}`,
      {
        method: "DELETE",
      }
    );
    const responseData = await response.json();
    if (response.ok) {
      alert(responseData.message);
    } else {
      alert(responseData.message);
    }
  } catch (error) {
    console.log(error);
  }
};

deleteOneApplicantForm.addEventListener("submit", (e) => {
  e.preventDefault();
  deleteOneApplicant();
});
