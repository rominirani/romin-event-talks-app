document.addEventListener('DOMContentLoaded', () => {
    const talksList = document.getElementById('talks-list');
    const categoryFilter = document.getElementById('category-filter');
    let allTalks = [];

    // Fetch talks data
    fetch('/api/talks')
        .then(response => response.json())
        .then(data => {
            allTalks = data;
            renderTalks(allTalks);
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

    // Event listener for category filter
    categoryFilter.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        if (selectedCategory === 'all') {
            renderTalks(allTalks);
        } else {
            const filteredTalks = allTalks.filter(talk => 
                !talk.isBreak && talk.category.includes(selectedCategory)
            );
            renderTalks(filteredTalks);
        }
    });
});
