# Pokemon Battle Assignment

## Getting Started

- Download this starter code (Code -> Download Zip)
- Unzip the folder (ask for help if you don't know what this means
- Open the unzipped folder in VSCode
- View the website with Live Server, look through the existing HTML to understand the structure
- Add functionality one bit at a time, according to the Specifications below

## Specifications

### Level 0 - Developing (40%) | Basic starting point

- set starting HP for both pokemon in DOM
- on "Attack" button click
  - subtract 5HP from opponent HP, update opponent HP in DOM
  - if opponent HP is 0 or less, display "NIDORINO fainted!" in message box

### Level 1 - Basic (55%) | Bare minimum game

- Keep track of which player's turn it is, lower HP of opposite pokemon
- Update message box after each action
  - eg. "GENGAR used tackle"

### Level 2 - Competent (70%) | Adding some decisions

- Give each pokemon additional attack options that do different effects, get creative with how these amounts are calculated eg:
  - random amount of damage within some range
  - small amount of damage unless it's own HP is below some percentage, then bigger damage
  - heal some HP

### Level 3 - Skilled (85%) | A more complete game

- Give each attack a Power Point (PP) amount that starts at a certain value and lowers by 1 each time the attack is used
  - If an attack has 0 PP, it can't be used
  - stronger attacks should start with fewer PP

### Level ??? - Exemplary (100%) | Keep adding features that are interesting to you

Possible options to continue expanding/improving

- Add move animations
- Animate the message text writing, hide the attack options when showing a message
- Add HP bars that show the % of remaining HP, change colors at certain values
- Add pokemon and move types (fire, water, etc) and change damage amounts for certain combinations
  - eg fire attack on water pokemon does double damage
  - eg water attack on fire pokemon does 50% damage
- Add items
- Add additional pokemon to swap
