import random
import string

def loadWord():
   f = open('hangman_words.txt', 'r')
   wordsList = f.readlines()
   f.close()

   wordsList = wordsList[0].split(' ')
   secretWord = random.choice(wordsList)
   return secretWord


def getGuessed(lettersGuessed):
    guess = "0"
    while guess not in string.ascii_lowercase or guess in lettersGuessed:
        guess = input("What letter would you like to guess?")
    return guess

def gameOver(secretWord, lettersGuessed):
  counter  = 0
  for letter in lettersGuessed:
    if letter not in secretWord:
      counter += 1
  if counter == 10:
    print("You've ran out of guesses. The secret word is: " + secretWord + ".")
    return True
  for letter in secretWord:
    if letter not in lettersGuessed:
      return False
  print(secretWord + "\nYou won!")
  return True


def isWordGuessed(lettersGuessed):
    '''
    secretWord: string, the random word the user is trying to guess.  This is selected on line 9.
    lettersGuessed: list of letters that have been guessed so far.
    returns: boolean, True only if all the letters of secretWord are in lettersGuessed;
      False otherwise
    '''
    # FILL IN YOUR CODE HERE...
    print("Guesssed:", end=" ")
    for character in lettersGuessed:
        print(character, end=", ")
    print("")




def getGuessedWord(secretWord, lettersGuessed):
    '''
    secretWord: string, the random word the user is trying to guess.  This is selected on line 9.
    lettersGuessed: list of letters that have been guessed so far.
    returns: string, of letters and underscores.  For letters in the word that the user has
    guessed correctly, the string should contain the letter at the correct position.  For letters
    in the word that the user has not yet guessed, shown an _ (underscore) instead.
    '''
    # FILL IN YOUR CODE HERE...

    for letter in secretWord:
      if letter in lettersGuessed:
        print(letter, end=" ")
      else:
        print("_", end=" ")

def guessesLeft(secretWord, lettersGuessed):

  guesses = 10

  for letter in lettersGuessed:
    if letter not in secretWord:
      guesses -= 1
  print(" You have " + str(guesses) + " guesses left")
  


def getAvailableLetters(lettersGuessed):
    '''
    lettersGuessed: list of letters that have been guessed so far
    returns: string, comprised of letters that represents what letters have not
      yet been guessed.
    '''



def hangman(secretWord):
    '''
    secretWord: string, the secret word to guess.

    Starts up a game of Hangman in the command line.

    * At the start of the game, let the user know how many
      letters the secretWord contains.

    * Ask the user to guess one letter per round.

    * The user should receive feedback immediately after each guess
      about whether their guess appears in the computer's word.

    * After each round, you should also display to the user the
      partially guessed word so far, as well as letters that the
      user has not yet guessed.
    '''
    # FILL IN YOUR CODE HERE...
    lettersGuessed = []
    while not gameOver(secretWord, lettersGuessed):
      getGuessedWord(secretWord, lettersGuessed)
      guessesLeft(secretWord, lettersGuessed)
      guess = getGuessed(lettersGuessed)
      lettersGuessed.append(guess)
      isWordGuessed(lettersGuessed)


secretWord = loadWord()
#This is a comment
hangman(secretWord)