#!/bin/bash

PSQL="psql -X --username=freecodecamp --dbname=salon --tuples-only -c"

MAIN_MENU(){
  if [[ $1 ]]
  then echo -e "\n$1"
  fi
  echo -e "\nWelcome to Tony teacher's, what can i do for you?\n"
  
  echo "$($PSQL "SELECT * FROM services ORDER BY service_id;")" | while read SERVICE_ID   BAR SERVICE_NAME
  do
    echo "$SERVICE_ID) $SERVICE_NAME"
  done
  
  read SERVICE_ID_SELECTED

  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then MAIN_MENU "Use service number to pick one"

  else
    SERVICE=$($PSQL "SELECT name FROM services WHERE service_id =   '$SERVICE_ID_SELECTED'")
    # echo $SERVICE
  
    if [[ -z $SERVICE ]]
    then MAIN_MENU "we don't get that one, which service you want?"
    else
      # picked the service
      echo -e "\nWhat's your phone number?"

      read CUSTOMER_PHONE

      if [[ ! $CUSTOMER_PHONE =~ ^[0-9-]+$ ]]
      then MAIN_MENU "Please enter your phone number"
      else
      CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone='$CUSTOMER_PHONE'")

      if [[ -z $CUSTOMER_NAME ]]
      then
        echo -e "\nI don't have a record for that phone number, what's your name?"
        read CUSTOMER_NAME
        
        INSERT_CUSTOMER=$($PSQL "INSERT INTO customers(phone, name) VALUES ('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
      fi

      CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone='$CUSTOMER_PHONE'")
      echo $CUSTOMER_ID

      echo -e "\nWhat time would you like your$SERVICE,$CUSTOMER_NAME?"

      read SERVICE_TIME

      INSERT_APPOINTMENT=$($PSQL "INSERT INTO appointments(customer_id, service_id, time) VALUES ($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")

     
      if [[ $INSERT_APPOINTMENT == 'INSERT 0 1' ]]
      then
        echo -e "\nI have put you down for a$SERVICE at $SERVICE_TIME, $CUSTOMER_NAME."
      fi

      

      # MAIN_MENU


      # fi
    fi
  fi
}
  
  
MAIN_MENU