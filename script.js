// Array to store bookmarks
let bookmarks = [];

// DOM elements
const urlInput = document.getElementById('url');
const titleInput = document.getElementById('title');
const categoryInput = document.getElementById('category');
const tagsInput = document.getElementById('tags');
const addBookmarkButton = document.getElementById('add-bookmark');
const bookmarkList = document.getElementById('bookmark-list');
const sortCategorySelect = document.getElementById('sort-category');
const sortTagsSelect = document.getElementById('sort-tags');

// Function to add a new bookmark
function addBookmark() {
    const url = urlInput.value;
    const title = titleInput.value;
    const category = categoryInput.value;
    const tags = tagsInput.value.split(',').map(tag => tag.trim());

    if (url && title && category) {
        const newBookmark = { url, title, category, tags, dateAdded: new Date() };
        bookmarks.push(newBookmark);
        displayBookmarks();
        clearForm();
    } else {
        alert('Please fill out all fields.');
    }
}

// Function to display all bookmarks
function displayBookmarks() {
    bookmarkList.innerHTML = '';
    let filteredBookmarks = [...bookmarks];

    // Sorting by category
    const selectedCategory = sortCategorySelect.value;
    if (selectedCategory) {
        filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.category === selectedCategory);
    }

    // Sorting by tags
    const selectedTag = sortTagsSelect.value;
    if (selectedTag) {
        filteredBookmarks = filteredBookmarks.filter(bookmark => bookmark.tags.includes(selectedTag));
    }

    filteredBookmarks.forEach(bookmark => {
        const bookmarkElement = document.createElement('div');
        bookmarkElement.classList.add('bookmark-item');
        
        bookmarkElement.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
            <p>Category: ${bookmark.category}</p>
            <p>Added on: ${new Date(bookmark.dateAdded).toLocaleDateString()}</p>
            <div class="tags">Tags: ${bookmark.tags.join(', ')}</div>
        `;

        bookmarkList.appendChild(bookmarkElement);
    });
}

// Function to clear input fields
function clearForm() {
    urlInput.value = '';
    titleInput.value = '';
    categoryInput.value = '';
    tagsInput.value = '';
}

// Event listener for adding a new bookmark
addBookmarkButton.addEventListener('click', addBookmark);

// Event listener for sorting bookmarks by category or tags
sortCategorySelect.addEventListener('change', displayBookmarks);
sortTagsSelect.addEventListener('change', displayBookmarks);

// Display bookmarks when the page loads
displayBookmarks();
