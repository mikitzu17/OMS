document.addEventListener("DOMContentLoaded", function () {
    // Function to handle form submissions
    function handleFormSubmission(formId, storageKey, displayListId) {
        const form = document.getElementById(formId);
        const displayList = document.getElementById(displayListId);
        
        // Load existing data
        let records = JSON.parse(localStorage.getItem(storageKey)) || [];

        // Display records
        function displayRecords() {
            displayList.innerHTML = "";
            records.forEach((record, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `${record.date} - ${record.name} (${record.detail}) 
                    <button onclick="deleteRecord('${storageKey}', ${index})">Delete</button>`;
                displayList.appendChild(listItem);
            });
        }

        // Add new record
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            const formData = new FormData(form);
            const newRecord = {
                date: formData.get("sponsor-date") || formData.get("attendance-date"),
                name: formData.get("sponsor-name") || formData.get("child-name-attendance"),
                detail: formData.get("food-items") || formData.get("attendance-status")
            };

            records.push(newRecord);
            localStorage.setItem(storageKey, JSON.stringify(records));
            form.reset();
            displayRecords();
            alert("Record added successfully!");
        });

        // Display records on page load
        displayRecords();
    }

    // Handle Attendance Form
    handleFormSubmission("attendance-form", "attendanceRecords", "attendance-records");

    // Handle Food Sponsor Form
    handleFormSubmission("sponsor-form", "sponsorRecords", "sponsor-records");
});

// Function to delete records (must be global for button to work)
function deleteRecord(storageKey, index) {
    let records = JSON.parse(localStorage.getItem(storageKey)) || [];
    records.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(records));
    location.reload();
}
