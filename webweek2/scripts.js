$(document).ready(function () {
    let data = []; 

    function populateTable() {
        const tbody = $("#data-table tbody");
        tbody.empty(); 
        data.forEach((item, index) => {
            tbody.append(`
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>
                        <button class="edit-btn" data-index="${index}">Edit</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </td>
                </tr>
            `);
        });
    }

    /**
     * Function to show success or error messages
     * @param {string} message - Message to display
     * @param {string} type - Type of message: "success" or "fail"
     */
    function showMessage(message, type) {
        const box = $("#message-box");
        box.text(message).removeClass().addClass(type).slideDown();
        setTimeout(() => box.slideUp(), 3000); 
    }

    
    $("#add-entry-btn").click(function () {
        $("#modal-title").text("Add Entry");
        $("#modal-name").val("");
        $("#modal-email").val("");
        $("#modal-form").data("edit-index", -1); 
        $("#modal").removeClass("hidden");
    });

   
    $("#close-modal").click(function () {
        $("#modal").addClass("hidden");
    });

    
    $("#modal-form").submit(function (e) {
        e.preventDefault(); 
        const name = $("#modal-name").val().trim();
        const email = $("#modal-email").val().trim();
        const editIndex = $(this).data("edit-index");

        if (!name || !email) {
            showMessage("All fields are required.", "fail");
            return;
        }

        if (editIndex >= 0) {

            data[editIndex] = { id: data[editIndex].id, name, email };
            showMessage("Entry updated successfully!", "success");
        } else {

            const newEntry = { id: Date.now(), name, email };
            data.push(newEntry);
            showMessage("Entry added successfully!", "success");
        }

        populateTable();
        $("#modal").addClass("hidden"); 
    });

   
    $(document).on("click", ".delete-btn", function () {
        const index = $(this).data("index");
        if (confirm("Are you sure you want to delete this entry?")) {
            data.splice(index, 1);
            populateTable();
            showMessage("Entry deleted successfully!", "success");
        }
    });


    $(document).on("click", ".edit-btn", function () {
        const index = $(this).data("index");
        const entry = data[index];
        $("#modal-title").text("Edit Entry");
        $("#modal-name").val(entry.name);
        $("#modal-email").val(entry.email);
        $("#modal-form").data("edit-index", index); // Save the index for editing
        $("#modal").removeClass("hidden");
    });

    $("#search-input").on("keyup", function () {
        const query = $(this).val().toLowerCase();
        $("#data-table tbody tr").each(function () {
            const rowText = $(this).text().toLowerCase();
            $(this).toggle(rowText.includes(query)); // Show/hide rows based on match
        });
    });


    populateTable();
});
