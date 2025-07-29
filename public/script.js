document.addEventListener('DOMContentLoaded', () => {
    const talksList = document.getElementById('talks-list');
    const categoryFilter = document.getElementById('category-filter');
    const speakerFilter = document.getElementById('speaker-filter');
    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    let allTalks = [];
    let currentCategory = 'all';
    let currentSpeaker = 'all';

    // Function to filter and render talks
    const filterAndRenderTalks = () => {
        let filteredTalks = allTalks.filter(talk => {
            if (talk.isBreak) return true; // Always include breaks

            const matchesCategory = currentCategory === 'all' || talk.category.includes(currentCategory);
            const matchesSpeaker = currentSpeaker === 'all' || talk.speakers.includes(currentSpeaker);

            return matchesCategory && matchesSpeaker;
        });
        renderTalks(filteredTalks);
    };

    // Render talks based on filter
    const renderTalks = (talksToRender) => {
        talksList.innerHTML = ''; // Clear previous talks
        talksToRender.forEach(talk => {
            if (talk.isBreak) {
                const breakItem = document.createElement('div');
                breakItem.classList.add('break-item');
                breakItem.innerHTML = `
                    <p>${talk.startTime} - ${talk.endTime}</p>
                    <h3>${talk.title}</h3>
                    <p>${talk.description}</p>
                `;
                talksList.appendChild(breakItem);
            } else {
                const talkItem = document.createElement('div');
                talkItem.classList.add('talk-item');
                talkItem.innerHTML = `
                    <h3>${talk.title}</h3>
                    <p class="time">${talk.startTime} - ${talk.endTime}</p>
                    <p class="speakers"><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
                    <p class="category"><strong>Category:</strong> ${talk.category.join(', ')}</p>
                    <p class="duration"><strong>Duration:</strong> ${talk.duration}</p>
                    <p class="description">${talk.description}</p>
                `;
                talksList.appendChild(talkItem);
            }
        });
    };

    // Fetch talks data
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            allTalks = data;
            filterAndRenderTalks(); // Initial render
        })
        .catch(error => console.error('Error fetching talks:', error));

    // Fetch categories and populate filter
    fetch('/api/categories')
        .then(response => response.json())
        .then(categories => {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching categories:', error));

    // Fetch speakers and populate filter
    fetch('/api/speakers')
        .then(response => response.json())
        .then(speakers => {
            speakers.forEach(speaker => {
                const option = document.createElement('option');
                option.value = speaker;
                option.textContent = speaker;
                speakerFilter.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching speakers:', error));

    // Event listener for category filter
    categoryFilter.addEventListener('change', (event) => {
        currentCategory = event.target.value;
        filterAndRenderTalks();
    });

    // Event listener for speaker filter
    speakerFilter.addEventListener('change', (event) => {
        currentSpeaker = event.target.value;
        filterAndRenderTalks();
    });

    // Event listener for clear filters button
    clearFiltersBtn.addEventListener('click', () => {
        categoryFilter.value = 'all';
        speakerFilter.value = 'all';
        currentCategory = 'all';
        currentSpeaker = 'all';
        filterAndRenderTalks();
    });
});
