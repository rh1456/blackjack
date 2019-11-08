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
const value = [11, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10]

const deck = []

const playerHand = []

//values of card with if
const makeCardValue = rank => {
  if (rank === 'Ace') {
    return 11
  } else if (rank === 'King' || rank === 'Queen' || rank === 'jack') {
    return 10
  } else {
    return parseInt(rank)
  }
}
const cardValue = () => {
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
  console.log([deck])
  console.log(deck)
}

//deal and display card on UI
const dealCardPic = () => {
  const drawnCard = deck.pop()
  playerHand.push(drawnCard)
  const cardLi = document.createElement('li')
  const p = document.createElement('p')
  p.textContent = drawnCard.rank + 'of' + drawnCard.suit
  const img = document.createElement('img')
  img.src = '/images/cards/' + drawnCard.imageUrl
  cardLi.appendChild(p)
  cardLi.appendChild(img)
  document.querySelector('.pHand').appendChild(cardLi)

  let sum = 0
  for (let i = 0; i < playerHand.length; i++) {
    sum += playerHand[i].value
  }
  document.querySelector('.player-sum').textContent = sum
}
//create the deck

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

  // console.log(shuffleDeck)
}

const dealCard = () => {
  // document.querySelector('h1').textContent = deck[0]
  document.querySelector('.card').textContent = deck.splice(
    deck.length - 1,
    1
  )[0]
}
console.log(makeDeck)
const makeAndShuffleDeck = () => {
  makeDeck()
  shuffleDeck()
}

document.querySelector('.hit').addEventListener('click', dealCardPic)
document.addEventListener('DOMContentLoaded', makeAndShuffleDeck)
