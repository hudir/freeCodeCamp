#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=number_guess -t --tuples-only  -c"

# create random number
RAN_NUM=$(( RANDOM % 1000 + 1 ))
 echo $RAN_NUM

echo -e "\nEnter your username:"
read USERNAME

RESULT=$($PSQL "SELECT games_played, best_game FROM users WHERE name='$USERNAME'")

# Init GAMES and BEST 
GAMES=0
BEST=999999

if [[ -z $RESULT ]]
then
  # add new user to db
  NEW_USER=$($PSQL "INSERT INTO users(name) VALUES('$USERNAME');")
  # greeting new user
  echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
  
else
  # there is this user in db
  # read data into variables
  echo $RESULT | while read GAMES_PLAYED BAR BEST_GAME 
  do
  # greeting user
  echo -e "\nWelcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  # updata variable
  GAMES=$GAMES_PLAYED
  BEST=$BEST_GAME
  done
fi 

# GAME START!
echo -e "\nGuess the secret number between 1 and 1000:"
read INPUT

# check if input valid
while [[ ! $INPUT =~ ^[0-9]+$ ]]
do
  echo "That is not an integer, guess again:"
  read INPUT
done

GUESS=1
while [[ $INPUT != $RAN_NUM ]]
do
if [[ $INPUT > $RAN_NUM ]]
then
  echo "It's higher than that, guess again:"
else
  echo "It's lower than that, guess again:"
fi
read INPUT

# check if input valid
while [[ ! $INPUT =~ ^[0-9]+$ ]]
do
  echo "That is not an integer, guess again:"
  read INPUT
done

(( GUESS++ ))
done
# GAME OVER!
echo -e "\nYou guessed it in $GUESS tries. The secret number was $RAN_NUM. Nice job!"

# update db
(( GAMES++ ))
UPDATE=$($PSQL "UPDATE users SET games_played=$GAMES WHERE name='$USERNAME';")

# check is it the best guesses
if [[ $GUESS < $BEST ]]
then
  UPDATE=$($PSQL "UPDATE users SET best_game=$GUESS WHERE name='$USERNAME';")
fi
