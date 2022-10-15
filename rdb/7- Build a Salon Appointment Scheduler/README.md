ALTER TABLE table_name ADD COLUMN column_name DATATYPE CONSTRAINT REFERENCES 


Notes:
If you leave your virtual machine, your database may not be saved. You can make a dump of it by entering pg_dump -cC --inserts -U freecodecamp salon > salon.sql in a bash terminal (not the psql one). It will save the commands to rebuild your database in salon.sql. The file will be located where the command was entered. If it's anything inside the project folder, the file will be saved in the VM. You can rebuild the database by entering psql -U postgres < salon.sql in a terminal where the .sql file is.

If you are saving your progress on freeCodeCamp.org, after getting all the tests to pass, follow the instructions above to save a dump of your database. Save the salon.sql file, as well as the final version of your salon.sh file, in a public repository and submit the URL to it on freeCodeCamp.org.