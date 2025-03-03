// Highlights the selected tab
function tabSelected(tab, div) {
    // Get all elements with class="tabContent" and hide them
    const tabcontent = document.getElementsByClassName("tabContent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tabLink" and remove the class "active"
    const tablinks = document.getElementsByClassName("tabLink");
    for (let i = 0; i < tablinks.length; i++) {
        //tablinks[i].className = tablinks[i].className.replace("active", "");
        tablinks[i].classList.remove("active");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    const currentTab = document.getElementById(tab);
    currentTab.classList.add("active");

    // Show the current content
    const currentContent = document.getElementById(div);
    currentContent.style.display = "block";
}

// Populates the areas dropdown
function populateAreas(areas) {
    const select = document.getElementById('selectArea');
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area.id;
        option.text = area.name;
        select.appendChild(option);
    });
}

// Populates the news categories dropdown
function populateNewsCategories(categories) {
    const select = document.getElementById('newsCategories');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.name;
        select.appendChild(option);
    });
}

// Save the selected area to session storage
function saveArea(id) {
    sessionStorage.setItem('selectedArea', id);
}

// Save the selected tab to session storage
function saveTab(tab) {
    sessionStorage.setItem('selectedTab', tab);
}

// Search function for tables
function searchTable(inputId, rowClass) {
    // Get user input and convert it to uppercase
    const input = document.getElementById(inputId).value.toUpperCase();
    
    // Get the specified table rows by class name
    const rows = document.getElementsByClassName(rowClass);

    // Loop through all table rows, and hide those who don't match the search query
    for (let row of rows) {
        // If user input is empty, show all rows
        if (input.length === 0) {
            row.style.display = "";
            continue;
        }
        
        // Get all table cells in the row
        const cells = row.getElementsByTagName("td");
        
        // Hide the row by default
        let hide = true;

        // Loop through all table cells in the row
        for (let cell of cells) {
            // Get the cell value
            const txtValue = cell.textContent || cell.innerText;
            
            // If the cell value matches the search query, show the row
            if (txtValue.toUpperCase().indexOf(input) > -1) {
                hide = false;
                break;
            }
        }
        
        // Hide or show the row
        if (hide) {
            row.style.display = "none";
        }
        else {
            row.style.display = "";
        }
    }
}