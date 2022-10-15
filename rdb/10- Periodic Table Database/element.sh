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
      echo $($PSQL "SELECT atomic_number, symbol, name, atomic_mass, melting_point_celsius, boiling_point_celsius, type FROM elements LEFT JOIN properties USING(atomic_number) LEFT JOIN types USING(type_id) WHERE atomic_number=$1;") | while read ATOMIC_NUMBER BAR SYMBOL BAR NAME BAR ATOMIC_MASS BAR MELTING_POINT BAR BOILING_POINT BAR TYPE;
      do
          # echo $ATOMIC_NUMBER
          # echo $SYMBOL
          # echo $NAME
          # echo $ATOMIC_MASS
          # echo $MELTING_POINT
          # echo $BOILING_POINT
          # echo $TYPE
          echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
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
         echo $($PSQL "SELECT atomic_number, symbol, name, atomic_mass, melting_point_celsius, boiling_point_celsius, type FROM elements LEFT JOIN properties USING(atomic_number) LEFT JOIN types USING(type_id) WHERE name='$1';") | while read ATOMIC_NUMBER BAR SYMBOL BAR NAME BAR ATOMIC_MASS BAR MELTING_POINT BAR BOILING_POINT BAR TYPE;
           do
           echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
         done
      fi

    else
      echo $($PSQL "SELECT atomic_number, symbol, name, atomic_mass, melting_point_celsius, boiling_point_celsius, type FROM elements LEFT JOIN properties USING(atomic_number) LEFT JOIN types USING(type_id) WHERE symbol='$1';") | while read ATOMIC_NUMBER BAR SYMBOL BAR NAME BAR ATOMIC_MASS BAR MELTING_POINT BAR BOILING_POINT BAR TYPE;
           do
           echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
         done
    fi
  fi
else echo Please provide an element as an argument.
fi