// This function retrieves the list of areas from Finnkino API

function getAreas() {
    const url = 'https://www.finnkino.fi/xml/TheatreAreas/';
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'application/xml');
            const areasXml = xml.querySelectorAll('TheatreArea');
            
            // Create an array to store the areas
            let areas = [];

            // Loop through the areas and store the id and name in the areas array
            areasXml.forEach(area => {
                let id = area.querySelector('ID').textContent;
                let name = area.querySelector('Name').textContent;

                // Translate specific area names to Emglish
                if (id == '1029') {
                    name = 'Choose area or cinema'
                }
                else if (id == '1014') {
                    name = 'Capital area'
                }

                areas.push({
                    id: id,
                    name: name
                });
            });

            // Store the areas in session storage
            sessionStorage.setItem('areas', JSON.stringify(areas));
            
            // Populate the areas dropdown
            populateAreas(areas);
        });
}

// This function retrieves schedules from Finnkino API
function getSchedule(id) {
    const url = 'https://www.finnkino.fi/xml/Schedule';
    const scheduleTable = document.getElementById('scheduleTable');
    const scheduleRows = scheduleTable.getElementsByClassName('scheduleRow');
    
    // Reset the schedule table
    while (scheduleRows.length > 0) {
        scheduleRows[0].parentNode.removeChild(scheduleRows[0]);
    }

    // Fetch the schedules of specific area
    fetch(url + '?area=' + id)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'application/xml');
            const schedulesXml = xml.querySelectorAll('Show');

            schedulesXml.forEach(schedule => {
                // Get the necessary data from the XML
                const images = schedule.querySelectorAll('Images');
                const title = schedule.querySelector('Title');
                const eventUrl = schedule.querySelector('EventURL');
                const rating = schedule.querySelector('Rating');
                const ratingInt = parseInt(rating.innerHTML, 10);
                const auditorium = schedule.querySelector('TheatreAuditorium');
                const start = schedule.querySelector('dttmShowStart');
                const length = schedule.querySelector('LengthInMinutes');
                
                // Create a new row in the schedule table
                const newScheduleRow = scheduleTable.insertRow(-1);
                newScheduleRow.className = 'scheduleRow';
                newScheduleRow.insertCell(0).innerHTML = '<img src="' + images[0].querySelector('EventSmallImagePortrait').innerHTML + '">';
                newScheduleRow.insertCell(1).innerHTML = '<a href="' + eventUrl.innerHTML + '" target="_blank">' + title.innerHTML + '</a>';
                newScheduleRow.insertCell(2).textContent = auditorium.innerHTML;
                newScheduleRow.insertCell(3).textContent = Number.isNaN(ratingInt) ? '' : ratingInt;
                newScheduleRow.insertCell(4).textContent = start.innerHTML;
                newScheduleRow.insertCell(5).textContent = length.innerHTML + ' min';
            });
        });
}

// This function retrieves events from Finnkino API
function getEvents(id) {
    const url = 'https://www.finnkino.fi/xml/Events';
    const eventsTable = document.getElementById('eventsTable');
    const eventRows = eventsTable.getElementsByClassName('eventRow');
    
    // Reset the events table
    while (eventRows.length > 0) {
        eventRows[0].parentNode.removeChild(eventRows[0]);
    }

    // Fetch the events of specific area
    fetch(url + '?area=' + id)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'application/xml');
            const eventsXml = xml.querySelectorAll('Event');

            eventsXml.forEach(event => {
                // Get the necessary data from the XML
                const images = event.querySelectorAll('Images');
                const title = event.querySelector('Title',);
                const eventUrl = event.querySelector('EventURL');
                const rating = event.querySelector('Rating');
                const ratingInt = parseInt(rating.innerHTML, 10);
                const eventType = event.querySelector('EventType');
                const genres = event.querySelector('Genres');
                const shortSynopsis = event.querySelector('ShortSynopsis');
                
                // Create a new row in the events table
                const newEventRow = eventsTable.insertRow(-1);
                newEventRow.className = 'eventRow';
                newEventRow.insertCell(0).innerHTML = '<img src="' + images[0].querySelector('EventSmallImagePortrait').innerHTML + '">';
                newEventRow.insertCell(1).innerHTML = '<a href="' + eventUrl.innerHTML + '" target="_blank">' + title.innerHTML + '</a>';
                newEventRow.insertCell(2).textContent = Number.isNaN(ratingInt) ? '' : ratingInt;
                newEventRow.insertCell(3).textContent = eventType.innerHTML;
                newEventRow.insertCell(4).textContent = genres.innerHTML;
                newEventRow.insertCell(5).textContent = shortSynopsis.innerHTML;
            });
        });
}

// This function retrieves news categories from Finnkino API
function getNewsCategories() {
    const url = 'https://www.finnkino.fi/xml/NewsCategories'
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'application/xml');
            const categoriesXml = xml.querySelectorAll('NewsArticleCategory');
            
            // Create an array to store the categories
            const categories = [];

            // Loop through the categories and store the id and name in the categories array
            categoriesXml.forEach(category => {
                let id = category.querySelector('ID').textContent;
                let name = category.querySelector('Name').textContent;
                categories.push({
                    id: id,
                    name: name
                });
            });

            // Store the categories in session storage
            sessionStorage.setItem('categories', JSON.stringify(categories));
            
            // Populate the news categories dropdown
            populateNewsCategories(categories);
        });
}

// This function retrieves news from Finnkino API
function getNews(id, category) {
    const url = 'https://www.finnkino.fi/xml/News';
    const newsTable = document.getElementById('newsTable');
    const newsRows = newsTable.getElementsByClassName('newsRow');
    
    // Reset the news table
    while (newsRows.length > 0) {
        newsRows[0].parentNode.removeChild(newsRows[0]);
    }

    // Fetch the news of specific area and category
    fetch(url + '?area=' + id + '&categoryID=' + category)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(data, 'application/xml');
            const newsXml = xml.querySelectorAll('NewsArticle');
            
            // Loop through the news and populate the news table
            newsXml.forEach(news => {
                // Get the necessary data from the XML
                const thumbnail = news.querySelectorAll('ThumbnailURL');
                const title = news.querySelector('Title');
                const publishedDate = news.querySelector('PublishDate');
                const newsUrl = news.querySelector('ArticleURL');
                
                // Create a new row in the news table
                const newNewsRow = newsTable.insertRow(-1);
                newNewsRow.className = 'newsRow';
                newNewsRow.insertCell(0).innerHTML = '<img src="' + thumbnail[0].textContent + '">';
                newNewsRow.insertCell(1).innerHTML = '<a href="' + newsUrl.innerHTML + '" target="_blank">' + title.innerHTML + '</a>';
                newNewsRow.insertCell(2).textContent = publishedDate.innerHTML;
            });
        });
}