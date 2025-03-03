// Contains all events
document.addEventListener('DOMContentLoaded', () => {
    // Get areas and categories from session storage
    const sessionAreas = sessionStorage.getItem('areas');
    const sessionCategories = sessionStorage.getItem('categories');
    const area = sessionStorage.getItem('selectedArea');
    const tab = sessionStorage.getItem('selectedTab');

    // Populate the areas dropdown
    if (sessionAreas) {
        const areas = JSON.parse(sessionAreas);
        populateAreas(areas);
    }
    else {
        getAreas();
    }

    // Populate the news categories dropdown
    if (sessionCategories) {
        const categories = JSON.parse(sessionCategories);
        populateNewsCategories(categories);
    }
    else {
        getNewsCategories();
    }

    // Get the events, schedules and news of the selected area
    document.getElementById('selectArea').addEventListener('change', (event) => {
        const id = event.target.value;
        const category = document.getElementById('newsCategories').value;
        getEvents(id);
        getSchedule(id)
        getNews(id, category);
        saveArea(id);
    });

    // Get the news of the selected category
    document.getElementById('newsCategories').addEventListener('change', (event) => {
        const id = document.getElementById('selectArea').value;
        const category = event.target.value;
        getNews(id, category);
    });

    // Add event listener to the eventsTab
    document.getElementById('eventsTab').addEventListener('click', () => {
        tabSelected('eventsTab', 'eventsDiv');
        saveTab('events');
    });

    // Add event listener to the schedulesTab
    document.getElementById('schedulesTab').addEventListener('click', () => {
        tabSelected('schedulesTab', 'schedulesDiv');
        saveTab('schedules');
    });

    // Add event listener to the newsTab
    document.getElementById('newsTab').addEventListener('click', () => {
        tabSelected('newsTab', 'newsDiv');
        saveTab('news');
    });

    // Add event listener to the search input field for events
    document.getElementById('eventSearch').addEventListener('keyup', () => {
        searchTable('eventSearch', 'eventRow');
    });

    // Add event listener to the search input field for schedules
    document.getElementById('scheduleSearch').addEventListener('keyup', () => {
        searchTable('scheduleSearch', 'scheduleRow');
    });

    // Add event listener to the search input field for news
    document.getElementById('newsSearch').addEventListener('keyup', () => {
        searchTable('newsSearch', 'newsRow');
    });

    // Load the saved area from session storage
    if (area) {
        document.getElementById('selectArea').value = area;
        getEvents(area);
        getSchedule(area);
        getNews(area, document.getElementById('newsCategories').value);
    }

    // Load the saved tab from session storage
    if (tab) {
        tabSelected(tab + 'Tab', tab + 'Div');
    }
    else {
        tabSelected('eventsTab', 'eventsDiv');
    }
});