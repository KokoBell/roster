// Input variables
let showName = document.getElementById('showName')
let showUrl = document.getElementById('showUrl')

// The button to add a show to the database
const addShowBtn = document.getElementById('addShowBtn')

// Event listener for the addShow button
addShowBtn.onclick = async () => {
    addShowBtn.textContent = 'Adding show...'
    const { error } = await _supabase.from('shows').insert({ name: showName.value, url: showUrl.value })
    addShowBtn.textContent = 'Add Show'
    showName.value = ''
    showUrl.value = ''
}

