// script.js
// Weekly Assignment No. 6

// Sets the Playing Card class
class PlayingCard {
    // constructor method where we define the properties of the object
    constructor(element, face, suit) {
        this.element = element
        this.suit = suit
        this.face = face
        this.img = `img/${face}_of_${suit}.png`
        this.state = 0

        // Event listener to be able to change the image based on the src on a click event
        this.element.addEventListener('click', () => {
            if (this.state == 0) {
                this.element.src = 'img/back.png'
                this.state = 1
            } else {
                this.element.src = `img/${face}_of_${suit}.png`
                this.state = 0
            }
        })
    }

    // Used later on an event listener to set all card faces showing
    showFaces() {
        this.element.src = this.img
    }

    // same as bove but for the card backs
    showBacks() {
        this.element.src = 'img/back.png'
    }
}


// Creates an image element in the dom and sets the src to the card back
function createCardImage() {
    const img = document.createElement('img')
    img.src = 'img/back.png'
    return img
}

// Function to get a handle on #container then loops through the deck array and adds each element of that array as a child element to the contianer
function displayDeck() {
    const conainer = document.querySelector('#container')
    deck.forEach(card => {
        container.appendChild(card.element)
    });
}

// uses Math.random to shuffle the elements of the deck array
function shuffleDeck() {
    for (let i = 0; i < 1000; i++) {
        deck.sort(() => Math.random() - 0.5)
    }
}

// Function to remove a card from the deck array
function removeCard() {
    // Includes logic to ensure the deck array isn't empty. This removes the object from the array and the element from the dom
    if (deck.length != 0) {
        card = document.querySelector('img')
        card.remove()
        deck.shift()
        if (deck.length == 0) {
            actions.innerHTML = 'No cards left in the deck. :-('
        }
    }
}

// The function to actually build the objects inside the deck array
function buildDeck() {
    // Predefined array for the suit and face properties
    const suits = ['hearts', 'spades', 'diamonds', 'clubs']
    const faces = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king']

    // nested loops to ensure there is one face of each suit
    suits.forEach(suit => {
        faces.forEach(face => {
            // creates a variable that calls the createCardImage function and then sets the attribute id to the value of the face/suit formatted as an img src
            // Then pushes to the deck array a new PlayingCard object with the properties
            const image = createCardImage()
            image.setAttribute('id', `${face}_of_${suit}.png`)
            deck.push(new PlayingCard(image, face, suit))
        })
    })
}

// Function to clear the innerHTMl of the actions element which is used for notifications about what is being done on the page
function clearActions() {
    actions.innerHTML = ''
}

// defines an empty array for the deck to build upon
let deck = []


// query selectors to get handles on various elements of the dom
const container = document.querySelector('#container')
const actions = document.querySelector('#actions')
const shuffleBtn = document.querySelector('#shuffle')
const removeBtn = document.querySelector('#remove')
const newDeckBtn = document.querySelector('#newdeck')
const showFacesBtn = document.querySelector('#showfaces')
const showBacksBtn = document.querySelector('#showbacks')

// An event listener that clears out the container element then shuffles the deck array. It uses setTimeout to give a feeling of the deck actually being shuffled.
shuffleBtn.addEventListener('click', () => {
    actions.innerHTML = 'The deck of cards has been shuffled.'
    container.innerHTML = ''
    shuffleDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})

// Calls the remove card function on a click handles notifications
removeBtn.addEventListener('click', () => {
    actions.innerHTML = 'A card was removed.'
    removeCard()
    setTimeout(clearActions, 5000)
})

// Removes all objects from the deck array by redifining it then calls the buildDeck function and handles notifications
newDeckBtn.addEventListener('click', () => {
    actions.innerHTML = 'A new deck of cards has been created.'
    deck = []
    container.innerHTML = ''
    buildDeck()
    setTimeout(displayDeck, 500)
    setTimeout(clearActions, 5000)
})

// Click event to loop through the deck array and call the showFaces for each element
showFacesBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card faces are now showing.'
    deck.forEach(card => {
        card.showFaces()
    })
})

// Click event to loop through the deck array and call the showBacks for each element
showBacksBtn.addEventListener('click', () => {
    actions.innerHTML = 'All card backs are now showing.'
    deck.forEach(card => {
        card.showBacks()
    })
})

// Calls functions to initialize the deck of cards
buildDeck()
shuffleDeck()
displayDeck()