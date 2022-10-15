psql --username=freecodecamp --dbname=postgres

bikes=> ALTER TABLE bikes ADD COLUMN bike_id SERIAL PRIMARY KEY;

ALTER TABLE bikes ADD COLUMN type VARCHAR(50) NOT NULL;

bikes=> ALTER TABLE customers ADD COLUMN phone VARCHAR(15) NOT NULL UNIQUE;

bikes=> ALTER TABLE rentals ADD FOREIGN KEY(customer_id) REFERENCES customers(customer_id);

bikes=> ALTER TABLE rentals ADD COLUMN date_rented DATE NOT NULL DEFAULT NOW();


You have nine bikes in your inventory. Add the first one to your bikes table. It has a type of Mountain and a size of 27. Make sure to put your VARCHAR values in single quotes. The bike_id and available columns should be filled in automatically, so you don't need to worry about those.


bikes=> DELETE FROM bikes WHERE type='9oad';

+---------+----------+------+-----------+
| bike_id |   type   | size | available |
+---------+----------+------+-----------+
|       1 | Mountain |   27 | t         |
|       2 | Mountain |   28 | t         |
|       5 | Mountain |   29 | t         |
|       6 | Road     |   27 | t         |
|       7 | Road     |   28 | t         |
|       9 | Road     |   29 | t         |
|      10 | BMX      |   19 | t         |
|      11 | BMX      |   20 | t         |
|      12 | BMX      |   21 | t         |
+---------+----------+------+-----------+



bikes=> UPDATE bikes SET available=FALSE

UPDATE bikes SET available=true WHERE type!='BMX';

bikes=> SELECT * FROM bikes ORDER BY bike_id;

bikes=> SELECT * FROM bikes LEFT JOIN rentals USING (bike_id);

SELECT * FROM bikes INNER JOIN rentals USING (bike_id);

bikes=> SELECT * FROM bikes INNER JOIN rentals USING (bike_id) INNER JOIN customers USING(customer_id);

bikes=> SELECT * FROM bikes INNER JOIN rentals USING (bike_id) INNER JOIN customers USING(customer_id) WHERE phone='555-5555' AND date_returned IS NULL;

bikes=> SELECT bike_id, type, size FROM bikes INNER JOIN rentals USING (bike_id) INNER JOIN customers USING(customer_id) WHERE phone='555-5555' AND date_returned IS NULL;

bikes=> SELECT bike_id, type, size FROM bikes INNER JOIN rentals USING (bike_id) INNER JOIN customers USING(customer_id) WHERE phone='555-5555' AND date_returned IS NULL ORDER BY bike_id;

bikes=> SELECT * FROM rentals INNER JOIN customers USING (customer_id) WHERE phone='555-5555' AND bike_id=1 AND date_returned IS NULL;

# bash part 

😄 In the script, create an empty function named MAIN_MENU. This will have a few options to enter when the script runs to rent or return a bike.

1. Here's an example:

FUNCTION_NAME() {

}




When a user enters an option at the main menu, you want to take them to the appropriate sub-menu. You can use a case statement for this. Here's an example:

case EXPRESSION in
  PATTERN) STATEMENTS ;;
  PATTERN) STATEMENTS ;;
  PATTERN) STATEMENTS ;;
  *) STATEMENTS ;;
esac
The expression you want is the $MAIN_MENU_SELECTION variable. You are expecting it to be a 1, 2, or 3 for your various menus. Add a case statement that takes users to their corresponding menus. The * is for when anything else is entered. Take users to the MAIN_MENU when the variable isn't a 1, 2, or 3.



Add an argument to where you call MAIN_MENU in the case statement. It should be Please enter a valid option.. The next step will adjust the function so the message is printed when a user enters an invalid option.

1. Here's an example: FUNCTION_CALL "<argument_message>"

2. Here's how the function call should look:

  *) MAIN_MENU "Please enter a valid option." ;;
3. The whole case statement should look like this:

case $MAIN_MENU_SELECTION in
  1) RENT_MENU ;;
  2) RETURN_MENU ;;
  3) EXIT ;;
  *) MAIN_MENU "Please enter a valid option." ;;
esac



To get the bikes available, you need to query the database from your script. Below the "shebang", add a PSQL variable that looks like this: PSQL="psql -X --username=freecodecamp --dbname=bikes --tuples-only -c". You will then be able to use it to query the database like this: $($PSQL "<query_here>").



Below the new variable, use echo to print it. Place it in double quotes so it prints any new lines.




Instead of directly printing the list, pipe the output into a while loop that reads each line. Here's how that looks:

echo "$AVAILABLE_BIKES" | while read <VAR_1> <VAR_2> <VAR_3> <VAR_4> <VAR_5>
do
  <STATEMENTS>
done
It will read the first line of your AVAILABLE_BIKES variable into the five variables. Each variable being the next word in the line. Read each line into variables, BIKE_ID BAR TYPE BAR SIZE. In the <STATEMENTS> area, use echo to print the BIKE_ID, TYPE, and SIZE variables, in that order.


Next, you want to find out how to test if the user input is a number. In the terminal, enter [[ a =~ [0-9] ]]; echo $? to see if a is a number. The conditional expression will run, and echo $? will print the exit code of it (the last command).

$ [[ a =~ [0-9] ]]; echo $?
get 1


It printed 1 for false. Meaning that a did not match the pattern [0-9], or a did not contain a number from 0-9. Enter the same commands, but check if a1 matches the pattern.

$ [[ a1 =~ [0-9] ]]; echo $?
get 0


That printed 0 for true. a1 does contain a number from 0-9. Enter the same command, but change the pattern to ^[0-9]$. The ^ signifies the start of the pattern, and $ means the end. So the input will have to start, contain a number 0-9, and end.

$ [[ a1 =~ ^[0-9]$ ]]; echo $?
get 1



11 did not match because the pattern only allows a single number. Add a + after the [0-9] to allow any strings that start, contain one or more numbers, and end.

$ [[ 11 =~ ^[0-9]+$ ]]; echo $?
get 0


So that pattern will match any positive integers. You want to check if the input is not a number. Add ! in front of the comparison of the previous command to do that.

1. Enter the previous command with the suggested changed

2. The previous command was [[ 11 =~ ^[0-9]+$ ]]; echo $?

3. Enter [[ ! 11 =~ ^[0-9]+$ ]]; echo $? in the terminal


Be sure to use single quotes around VARCHAR values


It should have printed 28 | Mountain. The message you want to print after someone rents a bike would have said I have put you down for the 28" Mountain Bike, Me.. You need to format that variable for the message. The sed command can be used to replace characters and patterns in text. It looks like this: sed s/<regex_pattern_to_replace>/<characters_to_replace_with>/<regex_flags>. In the terminal, enter echo '28 | Mountain' | sed 's/ /=/g' to practice.


The g regex flag stands for "global". It will replace all instance of the pattern. In this case, it replaced all the spaces. Enter the same command but without that flag.

That time, only the first instance of the pattern was replaced. The first space was removed. Enter the same command, but replace the first instance of  | (<space>|) with nothing.

Enter the same command, but make the output look like how you want in the message, 28" Mountain.
$ echo '28 | Mountain' | sed 's/ |/"/'



Now it is formatted for the message. Take that echo command and the part that formats it, put it in a sub shell, and set the output into a variable named BIKE_INFO_FORMATTED. Here's an example: BIKE_INFO_FORMATTED=$(<formatted info here>)
BIKE_INFO_FORMATTED=$(echo $BIKE_INFO | sed 's/ |/"/')


What you put the in subshell ($(...)) will be executed, and the result of it will replace the subshell. In this case, the formatted bike info was printed when you ran the script before, so the BIKE_INFO_FORMATTED variable will be set to that. Below the send to main menu comment, send users to the main menu with a message that would print I have put you down for the 28" Mountain Bike, Me. if Me rented the 28 inch Mountain Bike.




It printed, but you can only assume there's a space at the end. Place the last command in a subshell with quotes around it. Put a period right after the subshell and echo the whole thing in the terminal. Here's how it looks: echo "$(echo ' M e ')."

$ echo "$(echo ' M e ')."

Now you can be certain there's a space at the end. Within the subshell of the last command, use a pipe and the sed command to replace the first space with no space. Here's the sed replacement pattern you want: 's/ //'.

1. The previous command was echo "$(echo ' M e ')."

2. Here's an example of how the subshell should look: $(echo ' M e ' | sed <pattern>)

3. This is the exact subshell: $(echo ' M e ' | sed <pattern>)

4. Enter echo "$(echo ' M e ' | sed 's/ //')." in the terminal




That replaced all the spaces. You only had an extra space at the beginning of the customer name. Add a ^ in front of the space in the replacement pattern of the last command to only replace a space at the beginning of the text.

$ echo "$(echo ' M e ' | sed 's/^ //g' )."


The ^  (^<space>) pattern only replaced the first space. Add * at the end of the matching pattern to replace all spaces at the beginning of text.



The customer name only had an extra space at the beginning. Unsure as to why, but there may be others with extra spaces at the end as well. You can match the end of text with $. Change the matching pattern of the last command so it replaces a single space at the end. The pattern is  $ (<space>$).
$ echo "$(echo '   M e ' | sed 's/ $//g' )."


The pattern only replaces a single space at the end. Change the last command so it replaces all spaces at the end of the text.
$ echo "$(echo '   M e   ' | sed 's/ *$//g' ).


That replaced all the spaces at the end of the text. You can use | as an "or" operator in a matching pattern to replace one pattern or another. Use it to change the matching pattern so it would replace any amount of spaces at the beginning and any amount of spaces at the end of the text.
That didn't work. It doesn't like that "or" (|) operator for some reason. Check the manual of the sed command to see if you can find anything.
Somewhere in there is a flag for using extended regular expressions with sed. That might work. Add it to the echo "$(echo '   M e   ' | sed 's/^ *| *$//g')." command that didn't work to find out.

$ echo "$(echo '   M e   ' | sed -r 's/^ *| *$//g' )."
M e.