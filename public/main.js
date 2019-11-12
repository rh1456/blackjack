const suits = ['hearts', 'clubs', 'spades', 'diamonds']

const rank = [
  'Ace',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King'
]
const deck = []
const playerHand = []
const dealerHand = []

// values of card with if

const makeCardValue = rank => {
  if (rank === 'Ace') {
    return 11
  } else if (rank === 'King' || rank === 'Queen' || rank === 'Jack') {
    return 10
  } else {
    return parseInt(rank)
  }
}

// start game function
const startGame = () => {
  dealCardPic(deck, playerHand)
  dealCardPic(deck, playerHand)
  dealDealer(deck, dealerHand)
  dealDealer(deck, dealerHand)
}

// stand button=shows dealer hand
const showDealer = () => {
  const drawnCard = deck.pop()
  dealerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl
  cardLi.appendChild(img)
  document.querySelector('.dHand').appendChild(cardLi)
  document.querySelector('.dealer-sum')
}

// dealer's hand
const dealDealer = () => {
  const drawnCard = deck.pop()
  dealerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl
  cardLi.appendChild(img)
  document.querySelector('.dHand').appendChild(cardLi).hidden = true
  let dealerSum = 0
  for (let i = 0; i < dealerHand.length; i++) {
    dealerSum += dealerHand[i].value
    document.querySelector('.dealer-sum')
  }
}

const standButton = () => {
  showDealer()
  showDealer()
}

// refresh button function
const refreshPage = () => {
  window.location.reload()
}

// deal and display card on UI

const dealCardPic = () => {
  const drawnCard = deck.pop()
  playerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  // const p = document.createElement('p')
  // p.textContent = drawnCard.rank + 'of' + drawnCard.suit
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl
  // cardLi.appendChild(p)
  cardLi.appendChild(img)
  document.querySelector('.pHand').appendChild(cardLi)
  let playerSum = 0
  for (let i = 0; i < playerHand.length; i++) {
    playerSum += playerHand[i].value

    document.querySelector('.player-sum').textContent = playerSum
  }
  if (playerSum > 21) {
    document.querySelector('.hit').disabled = true
    document.querySelector('.start').disabled = true
    document.querySelector('.displayP').textContent = 'Player loses'
    document.querySelector('.displayD').textContent = 'House Wins'
  } else if (playerSum <= 21) {
    document.querySelector('.hit').disabled = false
  }
}
//
//   // if (dealerSum > 21) {
//   //   document.querySelector('.hit').disabled = true
//   //   document.querySelector('.start').disabled = true
//   //   document.querySelector('.displayP').textContent = 'House Loses'
//   // } else if (dealerSum <= 21) {
//   //   document.querySelector('.hit').disabled = false
//   // }
//

// create the deck

const makeDeck = () => {
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < rank.length; j++) {
      const card = {
        rank: rank[j],
        suit: suits[i],
        value: makeCardValue(rank[j]),
        imageUrl: rank[j] + '_of_' + suits[i] + '.svg'
      }
      deck.push(card)
    }
  }
}
//shuffle the deck
//use algorithm
const shuffleDeck = () => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const holder = deck[i]
    deck[i] = deck[j]
    deck[j] = holder
  }
}

const makeAndShuffleDeck = () => {
  makeDeck()
  shuffleDeck()
}

document.querySelector('.hit').addEventListener('click', dealCardPic)
document
  .querySelector('.start')
  .addEventListener('click', startGame, { once: true })
document.querySelector('.resetButton').addEventListener('click', refreshPage)
document.querySelector('.stay').addEventListener('click', standButton)

// document.querySelector('.hit').addEventListener('click', dealDealer)
// document.querySelector('.stay').addEventListener('click', disableHit)

document.addEventListener('DOMContentLoaded', makeAndShuffleDeck)
