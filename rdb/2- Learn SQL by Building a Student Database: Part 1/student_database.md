# part 1

 Type ALTER TABLE students ADD COLUMN student_id SERIAL PRIMARY KEY; into the psql prompt

 Create the last column, gpa. The data in the CSV shows that they are decimals with a length of 2 and 1 number is to the right of the decimal. So give it a data type of NUMERIC(2,1).



The foreign key is still missing. Let's fill in the majors table next. Add a major_id column to it. Make it a type of SERIAL and the PRIMARY KEY for this table.

students=> ALTER TABLE majors ADD COLUMN major_id SERIAL PRIMARY KEY;


This table looks good. Now, set the major_id column from the students table as a foreign key that references the major_id column from the majors table. Here's an example of how to do that: ALTER TABLE <table_name> ADD FOREIGN KEY(<column_name>) REFERENCES <referenced_table_name>(<referenced_column_name>);
students=> ALTER TABLE students ADD FOREIGN KEY(major_id) REFERENCES majors(major_id);

There's one thing missing. This table doesn't have a primary key. The data from courses.csv will go in this table. A single major will be in it multiple times, and same with a course. So neither of them can be a primary key. But there will never be a row with the same two values as another row. So the two columns together, are unique. You can create a composite primary key that uses more than one column as a unique pair like this: ALTER TABLE <table_name> ADD PRIMARY KEY(<column_name>, <column_name>); Add a composite primary key to the table using the two columns.

students=> ALTER TABLE majors_courses ADD PRIMARY KEY(major_id , course_id);



First, you should add all the info from the courses.csv file since you need the major_id for inserting the student info. cat is a terminal command for printing the contents of a file. Here's an example: cat <filename>. Below the comment you added, use it to print courses.csv.


It worked. Instead of printing the content, you can pipe that output into a while loop so you can go through the rows one at a time. It looks like this:

cat courses.csv | while read MAJOR COURSE
do
  <STATEMENTS>
done
Each new line will be read into the variables, MAJOR and COURSE. Add the above to your cat command. In the STATEMENTS area, use echo to print the MAJOR variable.



It's looping, but the MAJOR variable is only being set to the first word. There's a default IFS variable in bash. IFS stands for "Internal Field Separator". View it with declare -p IFS.

This variable is used to determine word boundaries. It defaults to spaces, tabs, and new lines. This is why the MAJOR variable was set to only the first word on each line from the data. Between the while and read commands, set the IFS to a comma like this: IFS=","




It helps to plan out what you want to happen. For each loop, you will want to add the major to the database if it isn't in there yet. Same for the course. Then add a row to the majors_courses table. Add these single line comments in your loop in this order: get major_id, if not found, insert major, get new major_id, get course_id, if not found, insert course, get new course_id, insert into majors_courses.

1. Here's an example of a single comment: # <comment>

2. Add the nine suggested single line comments, each on their own line, in the order given

3. It should look like this:
```
do
  # get major_id

  # if not found

  # insert major

  # get new major_id

  # get course_id

  # if not found

  # insert course

  # get new course_id

  # insert into majors_courses

done
```
You used the psql command to log in and interact with the database. You can use it to just run a single command and exit. Above your loop, add a PSQL variable that looks like this: PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c". This will allow you to query your database from your script. The important parts are the username, dbname, and the -c flag that is for running a single command and exiting. The rest of the flags are for formatting.


Now, you can query your database using the PSQL variable like this: $($PSQL "<query_here>"). Below the get major_id comment in your loop, create a MAJOR_ID variable. Set it equal to the result of a query that gets the major_id of the current MAJOR in the loop. Make sure to put your MAJOR variable in single quotes.

1. Here's an example of how it looks: MAJOR_ID=$($PSQL "<query_here>")

2. For the query, you want to use the SELECT, FROM, and WHERE keywords

3. Here's an example of how the query part looks: SELECT <column_name> FROM <table_name> WHERE <condition>

4. The condition you want is major_id='$MAJOR'

5. Here's how the query should look: SELECT major_id FROM majors WHERE major='$MAJOR'

6. Here's how the whole line should look: MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")



So it went through each major from the CSV file and tried to find major_id for each one from the database. Looks like it only found the one you manually inserted earlier. The rest were empty. Below your first if not found comment, add an if condition that checks if the MAJOR_ID variable is empty. You can do that with this test: [[ -z $MAJOR_ID ]]. Place the next two comments in the statements area of the if.
-z STRING      True if string is empty.



The loop will go into this if whenever a major isn't found. Here, you will want to insert the major and then get the new id. You will need the ID for inserting data into the majors_courses table later. Below your insert major comment, create an INSERT_MAJOR_RESULT variable. Set it's value to a query that inserts the current major into the database. Don't forget to use single quotes around the value.



Instead of running through all the data in the CSV file, you should make some test data. In the terminal, use the copy (cp) command to copy the courses.csv into a new file named courses_test.csv.



I forgot you inserted Database Administration earlier. The script ran and inserted major from the top line of the file. Then it added the other two that weren't already in there. You can use TRUNCATE to delete all data from a table. In the psql prompt, try to delete all the data in the majors table by entering TRUNCATE majors;



It says you "cannot truncate a table referenced in a foreign key constraint." The students and majors_courses tables use the major_id from majors as a foreign key. So if you want to delete the data from majors, you need to delete the data from those two tables at the same time. Use TRUNCATE to delete the data from those three tables. Separate the tables with commas.



You won't want to add the first line from the CSV file to the database since those are just titles. In your script, add an if condition at the top of your loop that checks if $MAJOR != major. Put all the existing code and comments in your loop in it's statements area so it only does any of it if it's not the first line.


You want a nicer message when something get's inserted so it's more informative. Below your INSERT_MAJOR_RESULT variable, add an if statement that checks if the variable is equal to INSERT 0 1, which was what it was printing. Use echo to print Inserted into majors, $MAJOR in the statements area of the if.



So the script will insert the majors correctly. Next are the courses. It will be the same steps as for the majors. Below your get course_id comment, add a COURSE_ID variable that gets the course_id from the database. Remember that your COURSE variable will have the current course in the loop.

It's the same as the majors, so below the second if not found comment, add an if statement that checks if the query was empty so you can insert the course if needed. Place the existing insert course and get new course_id comments in the statements area of the if.


Excellent. Instead of manually deleting the data each time you want to run the script, add the command to do it for you. Near the top of the file below your PSQL variable, use echo to query the database. In the query, truncate your four tables in this order: students, majors, courses, majors_courses.



One more thing to add for this file. Below the insert into majors_courses courses comment, create a INSERT_MAJORS_COURSES_RESULT variable. Use it and the MAJOR_ID and COURSE_ID variables you created to insert a row into the majors_courses table. Make sure the query has the major_id column first. Also, you won't need any quotes around the values for the ID's.


Below the variable you just created, add an if condition that checks if it's equal to INSERT 0 1 like the others. In it's statements area, use echo to print Inserted into majors_courses, $MAJOR : $COURSE.


```bash
#!/bin/bash

# Script to insert data from courses.csv and students.csv into students database

PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"
echo $($PSQL "TRUNCATE students, majors, courses, majors_courses;")

cat courses_test.csv | while IFS="," read MAJOR COURSE
do
  if [[ $MAJOR != "major" ]]
  then
    # get major_id
    MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    # if not found
    if [[ -z $MAJOR_ID ]]
    then
      # insert major
      INSERT_MAJOR_RESULT=$($PSQL "INSERT INTO majors(major) VALUES('$MAJOR')")
      if [[ $INSERT_MAJOR_RESULT == "INSERT 0 1" ]]
      then
        echo Inserted into majors, $MAJOR
      fi

      # get new major_id
      MAJOR_ID=$($PSQL "SELECT major_id FROM majors WHERE major='$MAJOR'")

    fi

    # get course_id
    COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")

    # if not found
    if [[ -z $COURSE_ID ]]
     then
    # insert course
     INSERT_COURSE_RESULT=$($PSQL "INSERT INTO courses(course) VALUES ('$COURSE')")
     if [[ $INSERT_COURSE_RESULT == "INSERT 0 1" ]]
     then
        echo Inserted into courses, $COURSE
     fi
    # get new course_id
    COURSE_ID=$($PSQL "SELECT course_id FROM courses WHERE course='$COURSE'")
    fi

    # insert into majors_courses
  INSERT_MAJORS_COURSES_RESULT=$($PSQL "INSERT INTO majors_courses(major_id, course_id) VALUES ($MAJOR_ID, $COURSE_ID)")
     if [[ $INSERT_MAJORS_COURSES_RESULT == "INSERT 0 1" ]]
     then echo Inserted into majors_courses, $MAJOR : $COURSE
     fi

  fi
done
```


# part 2


You want to loop through all this info like you did for the other CSV file. The process is the same. Below your existing loop, use cat to print your new test file. Pipe the results into a while loop, setting the IFS to a comma again, and then use read to create FIRST, LAST, MAJOR and GPA variables from the data. In the loop, use echo to print the FIRST variable.
```bash
cat students_test.csv | while IFS="," read FIRST LAST MAJOR GPA
do
  echo $FIRST
done
```
All the columns in the CSV file can be inserted directly into the database except for the major. You will need to get the major_id again for that. There's some null values in there as well, so you will need to use null if the major_id isn't found. Add four single line comments in your loop; get major_id, if not found, set to null, and insert student in that order.



Below the new get major_id comment, set the MAJOR_ID variable to a query that gets the major_id for the current students major.


Looking at the test data, it found the ID for all of it except the null value. Below the newest if not found comment, add an if that checks if the variable is empty. Put the set to null comment in its statements area.


You will need to set the four columns when adding the student info. All of them except student_id. Below the insert student comment, create an INSERT_STUDENT_RESULT variable that adds the student to the database. Add the columns in the order they appear in the data, and make sure to only put the two VARCHAR columns in single quotes.



Below the variable you just created, add an if statement that checks if it's equal to INSERT 0 1 like the others. If it is, use echo to print Inserted into students, <first_name> <last_name>.



The database is finished for now. The last thing you are going to do is make a "dump" of it. The pg_dump command can do that for you. Use the --help flag with the command to see what it can do.


```bash 
codeally@05c0fc57a91e:~/project$ pg_dump --help
pg_dump dumps a database as a text file or to other formats.

Usage:
  pg_dump [OPTION]... [DBNAME]

General options:
  -f, --file=FILENAME          output file or directory name
  -F, --format=c|d|t|p         output file format (custom, directory, tar,
                               plain text (default))
  -j, --jobs=NUM               use this many parallel jobs to dump
  -v, --verbose                verbose mode
  -V, --version                output version information, then exit
  -Z, --compress=0-9           compression level for compressed formats
  --lock-wait-timeout=TIMEOUT  fail after waiting TIMEOUT for a table lock
  --no-sync                    do not wait for changes to be written safely to disk
  -?, --help                   show this help, then exit

Options controlling the output content:
  -a, --data-only              dump only the data, not the schema
  -b, --blobs                  include large objects in dump
  -B, --no-blobs               exclude large objects in dump
  -c, --clean                  clean (drop) database objects before recreating
  -C, --create                 include commands to create database in dump
  -E, --encoding=ENCODING      dump the data in encoding ENCODING
  -n, --schema=PATTERN         dump the specified schema(s) only
  -N, --exclude-schema=PATTERN do NOT dump the specified schema(s)
  -O, --no-owner               skip restoration of object ownership in
                               plain-text format
  -s, --schema-only            dump only the schema, no data
  -S, --superuser=NAME         superuser user name to use in plain-text format
  -t, --table=PATTERN          dump the specified table(s) only
  -T, --exclude-table=PATTERN  do NOT dump the specified table(s)
  -x, --no-privileges          do not dump privileges (grant/revoke)
  --binary-upgrade             for use by upgrade utilities only
  --column-inserts             dump data as INSERT commands with column names
  --disable-dollar-quoting     disable dollar quoting, use SQL standard quoting
  --disable-triggers           disable triggers during data-only restore
  --enable-row-security        enable row security (dump only content user has
                               access to)
  --exclude-table-data=PATTERN do NOT dump data for the specified table(s)
  --extra-float-digits=NUM     override default setting for extra_float_digits
  --if-exists                  use IF EXISTS when dropping objects
  --inserts                    dump data as INSERT commands, rather than COPY
  --load-via-partition-root    load partitions via the root table
  --no-comments                do not dump comments
  --no-publications            do not dump publications
  --no-security-labels         do not dump security label assignments
  --no-subscriptions           do not dump subscriptions
  --no-synchronized-snapshots  do not use synchronized snapshots in parallel jobs
  --no-tablespaces             do not dump tablespace assignments
  --no-unlogged-table-data     do not dump unlogged table data
  --on-conflict-do-nothing     add ON CONFLICT DO NOTHING to INSERT commands
  --quote-all-identifiers      quote all identifiers, even if not key words
  --rows-per-insert=NROWS      number of rows per INSERT; implies --inserts
  --section=SECTION            dump named section (pre-data, data, or post-data)
  --serializable-deferrable    wait until the dump can run without anomalies
  --snapshot=SNAPSHOT          use given snapshot for the dump
  --strict-names               require table and/or schema include patterns to
                               match at least one entity each
  --use-set-session-authorization
                               use SET SESSION AUTHORIZATION commands instead of
                               ALTER OWNER commands to set ownership

Connection options:
  -d, --dbname=DBNAME      database to dump
  -h, --host=HOSTNAME      database server host or socket directory
  -p, --port=PORT          database server port number
  -U, --username=NAME      connect as specified database user
  -w, --no-password        never prompt for password
  -W, --password           force password prompt (should happen automatically)
  --role=ROLENAME          do SET ROLE before dump

If no database name is supplied, then the PGDATABASE environment
variable value is used.

Report bugs to <pgsql-bugs@lists.postgresql.org>.
```



This is the last step. There's quite a few options there. Enter pg_dump --clean --create --inserts --username=freecodecamp students > students.sql in the terminal to dump the database into a students.sql file. It will save all the commands needed to rebuild it. Take a quick look at the file when you are done.