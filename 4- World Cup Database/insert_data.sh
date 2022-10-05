#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.
echo $($PSQL "TRUNCATE games, teams")

cat games.csv | while IFS=',' read YEAR ROUND WINNER OPPONENT WINNER_GOALS OPPONENT_GOALS
do
if [[ $YEAR != 'year' ]]
then
   # try to find id
   WIN_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
   # if id is empty
   if [[ -z $TEAM_ID ]]
   # insert the value
   then
   echo "$($PSQL "INSERT INTO teams(name) VALUES ('$WINNER')")"
   # update id
   WIN_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$WINNER'")
   fi

   # try to find id
   OPP_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")
   # if id is empty
   if [[ -z $TEAM_ID ]]
   # insert the value
   then
   echo "$($PSQL "INSERT INTO teams(name) VALUES ('$OPPONENT')")"
   # update id
   OPP_TEAM_ID=$($PSQL "SELECT team_id FROM teams WHERE name='$OPPONENT'")
   fi

   # insert data to games
   echo "$($PSQL "INSERT INTO games(round, year, winner_goals, opponent_goals,winner_id, opponent_id) VALUES ('$ROUND', $YEAR, $WINNER_GOALS, $OPPONENT_GOALS, $WIN_TEAM_ID, $OPP_TEAM_ID)")"

fi
done
