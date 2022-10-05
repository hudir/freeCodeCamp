Your virtual machine comes with PostgreSQL installed. You will use the Psql terminal application to interact with it. Log in by typing 
```
psql --username=freecodecamp --dbname=postgres 
```
into the terminal and pressing enter.

Notice that the prompt changed to let you know that you are now interacting with PostgreSQL. First thing to do is see what databases are here. Type 
```
\l 
```
into the prompt to list them.


The databases you see are there by default. You can make your own like this:
```
CREATE DATABASE database_name;
```
The capitalized words are keywords telling PostgreSQL what to do. The name of the database is the lowercase word. Note that all commands need a semi-colon at the end. Create a new database named first_database.

t worked. Your new database is there. If you don't get a message after entering a command, it means it's incomplete and you likely forgot the semi-colon. You can just add it on the next line and press enter to finish the command. Create another database named second_database.



You can connect to a database by entering 
```
\c database_name
```
. You need to connect to add information. Connect to your second_database.


You should see a message that you are connected. Notice that the prompt changed to second_database=>. So the postgres=> prompt before must have meant you were connected to that database. A database is made of tables that hold your data. Enter \d to display the tables.


Looks like there's no tables or relations yet. Similar to how you created a database, you can create a table like this:
```
CREATE TABLE table_name();
```
Note that the parenthesis are needed for this one. It will create the table in the database you are connected to. Create a table named first_table in second_database.


You can view more details about a table by adding the table name after the display command like this: \d table_name. View more details about your second_table.

Tables need columns to describe the data in them, yours doesn't have any yet. Here's an example of how to add one:
```
ALTER TABLE table_name ADD COLUMN column_name DATATYPE;
```
Add a column to second_table named first_column. Give it a data type of INT. INT stands for integer. Don't forget the semi-colon. 😄



It's gone. Use the ALTER TABLE and DROP COLUMN keywords again to drop first_column.



A common data type is VARCHAR. It's a short string of characters. You need to give it a maximum length when using it like this: VARCHAR(30).

Add a new column to second_table, give it a name of name and a data type of VARCHAR(30).




It worked. Rows are the actual data in the table. You can add one like this:

INSERT INTO table_name(column_1, column_2) VALUES(value1, value2);
Insert a row into second_table. Give it an id of 1, and a username of Samus. The username column expects a VARCHAR, so you need to put Samus in single quotes like this: 'Samus'.


SELECT columns FROM table_name;






DELETE FROM table_name WHERE condition;
Remove Luigi from your table. The condition you want to use is username='Luigi'.

DROP TABLE table_name;
ALTER DATABASE database_name RENAME TO new_database_name;


The SERIAL type will make your column an INT with a NOT NULL constraint, and automatically increment the integer when a new row is added. View the details of the characters table to see what SERIAL did for you.
mario_database=> ALTER TABLE characters ADD COLUMN name VARCHAR(30) NOT NULL;



Adding rows one at a time is quite tedious. Here's an example of how you could have added the previous three rows at once:

INSERT INTO characters(name, homeland, favorite_color)
VALUES('Mario', 'Mushroom Kingdom', 'Red'),
('Luigi', 'Mushroom Kingdom', 'Green'),
('Peach', 'Mushroom Kingdom', 'Pink');


If you don't get a message after a command, it is likely incomplete. This is because you can put a command on multiple lines. Add two more rows. Give the first one values of: Daisy, Sarasaland, and Yellow. The second: Yoshi, Dinosaur Land, and Green. Try to do it with one command.


It looks good, but there's a few mistakes. You can change a value like this:

UPDATE table_name SET column_name=new_value WHERE condition;
You used username='Samus' as a condition earlier. SET Daisy's favorite_color to Orange. You can use the condition name='Daisy' to change her row

```
UPDATE characters SET favorite_color='Orange' WHERE name='Daisy';
```

Actually, you should put that in order. Here's an example:

SELECT columns FROM table_name ORDER BY column_name;
View all the data again, but put it in order by character_id.


It looks good. Next, you are going to add a primary key. It's a column that uniquely identifies each row in the table. Here's an example of how to set a PRIMARY KEY:

ALTER TABLE table_name ADD PRIMARY KEY(column_name);
ALTER TABLE characters ADD PRIMARY KEY(character_id);


You can see the key for your name column at the bottom. It would have been better to use character_id for the primary key. Here's an example of how to drop a constraint:

ALTER TABLE table_name DROP CONSTRAINT constraint_name;
Drop the primary key on the name column. You can see the constraint name is characters_pkey.



There’s your four columns and the primary key you created at the bottom. To know what row a character is for, you need to set a foreign key so you can relate rows from this table to rows from your characters table. Here's an example that creates a column as a foreign key:

ALTER TABLE table_name ADD COLUMN column_name DATATYPE REFERENCES referenced_table_name(referenced_column_name);
That's quite the command. In the more_info table, create a character_id column. Make it an INT and a foreign key that references the character_id column from the characters table. Good luck.


ALTER TABLE more_info ADD UNIQUE(character_id)

The column should also be NOT NULL since you don't want to have a row that is for nobody. Here's an example:

ALTER TABLE table_name ALTER COLUMN column_name SET NOT NULL;
Add the NOT NULL constraint to your foreign key column.


Toad is next. Instead of viewing all the rows to find his id, you can just view his row with a WHERE condition. You used several earlier to delete and update rows. You can use it to view rows as well. Here's an example:

SELECT columns FROM table_name WHERE condition;
A condition you used before was username='Samus'. Find Toad's id by viewing the character_id and name columns from characters for only his row.


SELECT character_id,name FROM characters WHERE name='Bowser';
             
+--------------+--------+
| character_id |  name  |
+--------------+--------+
|            5 | Bowser |
+--------------+--------+
(1 row)

mario_database=> INSERT INTO more_info(character_id,birthday,height,weight) VALUES(5,'1990-10-29',258, 300);
INSERT 0 1

ALTER TABLE sounds ADD COLUMN filename VARCHAR(40) NOT NULL UNIQUE;


You want to use character_id as a foreign key again. This will be a "one-to-many" relationship because one character will have many sounds, but no sound will have more than one character. Here's the example again:

ALTER TABLE table_name ADD COLUMN column_name DATATYPE CONSTRAINT REFERENCES referenced_table_name(referenced_column_name);
Add a column to sounds named character_id. Give it the properties INT, NOT NULL, and set it as a foreign key that references character_id from characters.




It look good. "Many-to-many" relationships usually use a junction table to link two tables together, forming two "one-to-many" relationships. Your characters and actions table will be linked using a junction table. Create a new table called character_actions. It will describe what actions each character can perform.



The foreign keys you set before were added when you created the column. You can set an existing column as a foreign key like this:

ALTER TABLE table_name ADD FOREIGN KEY(column_name) REFERENCES referenced_table(referenced_column);
Set the character_id column you just added as a foreign key that references the character_id from the characters table.



Every table should have a primary key. Your previous tables had a single column as a primary key. This one will be different. You can create a primary key from two columns, known as a composite primary key. Here's an example:

ALTER TABLE table_name ADD PRIMARY KEY(column1, column2);
Use character_id and action_id to create a composite primary key for this table.



You can see the character_id there so you just need to find the matching id in the characters table to find out who it's for. Or... You added that as a foreign key, that means you can get all the data from both tables with a JOIN command:

SELECT columns FROM table_1 FULL JOIN table_2 ON table_1.primary_key_column = table_2.foreign_key_column;
Enter a join command to see all the info from both tables. The two tables are characters and more_info. The columns are the character_id column from both tables since those are the linked keys.

SELECT * FROM characters FULL JOIN more_info ON characters.character_id = more_info.character_id;


This shows the "one-to-many" relationship. You can see that some of the characters have more than one row because they have many sounds. How can you see all the info from the characters, actions, and character_actions tables? Here's an example that joins three tables:

SELECT columns FROM junction_table
FULL JOIN table_1 ON junction_table.foreign_key_column = table_1.primary_key_column
FULL JOIN table_2 ON junction_table.foreign_key_column = table_2.primary_key_column;
Congratulations on making it this far. This is the last step. View all the data from characters, actions, and character_actions by joining all three tables. When you see the data, be sure to check the "many-to_many" relationship. Many characters will have many actions.\l


If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering 
```bash
pg_dump -cC --inserts -U freecodecamp universe > universe.sql 
```
in a bash terminal (not the psql one). It will save the commands to rebuild your database in universe.sql. The file will be located where the command was entered. If it's anything inside the project folder, the file will be saved in the VM. You can rebuild the database by entering psql -U postgres < universe.sql in a terminal where the .sql file is.

If you are saving your progress on freeCodeCamp.org, after getting all the tests to pass, follow the instructions above to save a dump of your database. Save the universe.sql file in a public repository and submit the URL to it on freeCodeCamp.org.