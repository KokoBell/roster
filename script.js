const defaultList = [{ 'name': 'Modern Family', 'url': 'https://soap2day.cc/TczozMDoiOTZ8fDEwNS4yMjUuMTMuMTUzfHwxNjY4NzE4MDQzIjs.html' },
{ 'name': 'Rick and Morty', 'url': 'https://www.netflix.com/watch/80098733' },
{ 'name': 'Move to Heaven', 'url': 'https://www.netflix.com/watch/81181332' },
{ 'name': 'Kung Fu Panda', 'url': 'https://www.netflix.com/watch/81459976?' },
{ 'name': 'Final Space', 'url': 'https://www.netflix.com/watch/81437328' },
{ 'name': 'Girlfriends', 'url': 'https://www.netflix.com/watch/81270376' },
{ 'name': 'Mob Psycho', 'url': 'https://9anime.to/watch/mob-psycho-100-iii.yqqv0' },
{ 'name': 'Demon Slayer', 'url': 'https://9anime.to/watch/demon-slayer-kimetsu-no-yaiba.6q67' },
{ 'name': 'Inside Job', 'url': 'https://www.netflix.com/watch/81148960' },
{ 'name': "Bob's Burgers", 'url': 'https://soap2day.cc/TczozMToiMTQ1fHwxMDUuMjI1LjEzLjE1M3x8MTY2ODcxNjY0NyI7.htmlI' },
{ 'name': 'Misty', 'url': 'https://www.netflix.com/watch/81029907' },
{ 'name': 'Spy Family', 'url': 'https://9anime.to/watch/spy-x-family-part-2.vvvo6/ep-6' }]

// Determine the current value of the list
const createCurrentList = () => {
    let storedList = JSON.parse(localStorage.getItem('myshows'))
    let currentList = []
    if (!storedList) {
        currentList = defaultList
    } else {
        currentList = storedList
    }
    return currentList
}

// An array to store all the shows we are watching
const ourShows = createCurrentList()

// HTML elements

// The container for the list of shows
const showsList = document.getElementById('showsList')

// The button to add a show
const clearStorageBtn = document.getElementById('clearStorageBtn')

// Input item to take the showName
const inputItem = document.createElement('input')
// Add a classname to the input for styling
inputItem.classList.add('showInput')

// Event listeners for some of the elements to be added to the dom

// Event listeners for the clearStorage button
clearStorageBtn.onclick = () => {
    localStorage.clear()
    while (ourShows.length > defaultList.length) {
        ourShows.pop()
    }
    showsList.replaceChildren('')
    populateList()
    addInputField()
}

// Event listeners for the input item
inputItem.onkeydown = (event) => {
    // Fix the bug that presses enter twice
    //console.log('Keydown')
    inputItem.onblur = () => { }
    if (event.key === "Enter") {
        addShowToList(event.target.value)
        addInputField()
        inputItem.value = ''
    }
    inputItem.onblur = (event) => {
        if (event.target.value != '') {
            addShowToList(event.target.value)
            addInputField()
            inputItem.value = ''
        }
    }
}

inputItem.onblur = (event) => {
    if (event.target.value != '') {
        addShowToList(event.target.value)
        addInputField()
        inputItem.value = ''
    }
}
// Functions to interact with the front-end

// Populate the list with the current shows in the array
const populateList = () => {
    ourShows.forEach((show) => {
        let link = document.createElement('a')
        let listItem = document.createElement('li')
        link.textContent = show.name
        link.href = show.url
        link.target = '_blank'
        listItem.appendChild(link)
        showsList.appendChild(listItem)
    })
}

// Add an input field
const addInputField = () => {
    inputItem.type = 'text'
    showsList.appendChild(inputItem)
}

// Add a show inside the list container
const addShowToList = (name) => {
    let show = document.createElement('li')
    show.textContent = name
    ourShows.push({ 'name': name })
    showsList.appendChild(show)
    updateLocalStorage()
}

// Update the localStorage with the latest information
const updateLocalStorage = () => {
    let storedList = JSON.parse(localStorage.getItem('myshows'))
    if (storedList != ourShows) {
        localStorage.setItem('myshows', JSON.stringify(ourShows))
    }
}

// Call these functions when the page loads
populateList()
addInputField()
updateLocalStorage()