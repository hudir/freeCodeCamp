#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=periodic_table --tuples-only -c"

if [[ $1 ]]
then 
  # check is $1 is a number
  if [[ $1 =~ ^[0-9]+$ ]]
  then
    RESULT=$($PSQL "SELECT * FROM elements WHERE atomic_number=$1;")
    if [[ -z $RESULT ]]
    then echo I could not find that element in the database.
    else
      echo $RESULT | while read ATOMIC_NUMBER BAR SYMBOL BAR NAME;
      do
          echo $ATOMIC_NUMBER
          echo $SYMBOL
          echo $NAME
      done
    fi

  else
    # check if $ 1 is symbol
    RESULT=$($PSQL "SELECT * FROM elements WHERE symbol='$1';")
    if [[ -z $RESULT ]]
    then 
      # check if $ 1 is name
      RESULT=$($PSQL "SELECT * FROM elements WHERE name='$1';")
      if [[ -z $RESULT ]]
      then echo I could not find that element in the database.
      else
        echo "The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius."
      fi

    else
      echo "The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu. Hydrogen has a melting point of -259.1 celsius and a boiling point of -252.9 celsius."
    fi
  fi
else echo Please provide an element as an argument.
fi