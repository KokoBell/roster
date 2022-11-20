const defaultList = [{ 'name': 'Atlanta' }, { 'name': 'Modern Family' }, { 'name': 'Rick and Morty' }, { 'name': 'Move to Heaven' }, { 'name': 'Kung Fu Panda' }, { 'name': 'Final Space' }, { 'name': 'Girlfriends' }, { 'name': 'Mob Psycho' }, { 'name': 'Demon Slayer' }, { 'name': 'Move to Heaven' }]

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
    inputItem.onblur = () => {}
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
        let listItem = document.createElement('li')
        listItem.textContent = show.name
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