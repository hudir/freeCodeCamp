

psql --username=freecodecamp --dbname=postgres

Your database isn't here. You can use the .sql file you created at the end of Part 1 to rebuild it. I recommend "splitting" the terminal. You can do that by clicking the "hamburger" menu at the top left of the window, going to the "Terminal" menu, and clicking "Split Terminal". Once you've done that, enter psql -U postgres < students.sql in it to rebuild the database.

You will want to query the database again to get info about the students to display. Add the same PSQL variable you use in your insert_data.sh script. It looked like this: PSQL="psql -X --username=freecodecamp --dbname=students --no-align --tuples-only -c"

echo -e "\n$($PSQL "SELECT first_name, last_name, gpa FROM students WHERE gpa=4.0 ;")"


Below the PSQL variable you just added, use echo to print First name, last name, and GPA of students with a 4.0 GPA:. Use the -e flag to put a new line at the beginning of the sentence.

1. The new line character is \n

2. Here's an example of the command: echo -e "\n<text_here>"

3. At the bottom of the student_info.sh file, add this:

echo -e "\nFirst name, last name, and GPA of students with a 4.0 GPA:"


Just the first_name column was returned that time. You can specify as many columns you want returned by separating them with commas. View the first_name, last_name and gpa columns from the students table.


You can return only rows you want by adding WHERE <condition> to your query. A condition can consist of a column, an operator, and a value. Use one of these to view the same columns as before but only rows WHERE gpa < 2.5.


That only returned students with a GPA of 3.8 or better. There's equal (=) and not equal (!=) operators as well. View the same columns for students that don't have a 4.0 gpa.


The right query will get you only the data you are looking for. Back in your student_info.sh file, add an echo command to the bottom that prints what the sentence above it asks for. Place double quotes around it like this: echo "$($PSQL "<query_here>")". This will make it so the output isn't all on one line.


The operators you used with numbers in the last section can be used on text as well. Use the = to view all majors named Game Design. Don't forget that You need single quotes around text values.


The operators you used with numbers in the last section can be used on text as well. Use the = to view all majors named Game Design. Don't forget that You need single quotes around text values.
                                    ^
students=> SELECT * FROM majors WHERE major='Game Design';


Game Design was not included in the results because it is not > 'Game Design'. Try it with the greater than or equal to operator.

It included Game Design in the results that time. So if you want to see results that start with a G or after, you could use major >= 'G'. View the majors that come before G.
students=> SELECT * FROM majors WHERE major < 'G';

Looks like there is five of them. Add another sentence like the others that says: First name, last name, and GPA of students whose last name begins with an 'R' or after and have a GPA greater than 3.8 or less than 2.0:


That returned 18 rows. You can use multiple conditions after WHERE with AND or OR, among others. Just add the keyword and another condition. In the psql prompt, use the same command as before, but add an OR to also return rows of students with a 3.9 GPA.


This showed all students whose GPA is less than 2.3 because the final OR condition was true for them. It didn't matter what their last name started with. You can group conditions together with parenthesis like this: WHERE <condition_1> AND (<condition_2> OR <condition_2>). This would only return rows where <condition_1> is true and one of the others is true. View students whose last name is before M that have a GPA of 3.9 or less than 2.3.
```bash
students=> SELECT * FROM students WHERE last_name < 'M' AND (gpa=3.9 OR gpa < 2.3);
```



There's a few that contain the word Algorithms. You can use LIKE to find patterns in text like this: WHERE <column> LIKE '<pattern>'. An underscore (_) in a pattern will return rows that have any character in that spot. View the rows in this table with a course name that matches the pattern '_lgorithms'.

students=> select * from courses WHERE course LIKE '_lgorithms';


That pattern matched only rows that had exactly one character, followed by lgorithms. Another pattern character is %. It means anything can be there. To find names that start with W, you could use W%. View the courses that end in lgorithms.

students=> select * from courses WHERE course LIKE '%lgorithms';


Combine the two pattern matching characters to show courses that have a second letter of e.

students=> select * from courses WHERE course LIKE '_e%';


There they are. You can use NOT LIKE to find things that don't match a pattern. View courses that don't contain a space.

students=> select * from courses WHERE course NOT LIKE '% %';


Five courses without a space. Try finding the ones that contain an A.

students=> select * from courses WHERE course LIKE '%A%';

ILIKE will ignore the case of the letters when matching. Use it to see the courses with an A or a.

students=> select * from courses WHERE course ILIKE '%A%';


You combine these like any other conditions. View the courses that don't have a capital or lowercase A and have a space.

students=> select * from courses WHERE course NOT ILIKE '%A%' AND course LIKE '% %';

All the fields that are empty or blank are null. You can access them using IS NULL as a condition like this: WHERE <column> IS NULL. View the students who don't have a GPA.


Inversely, you can use IS NOT NULL to see rows that aren't null. View all the info on students that do have a GPA.

You can specify the order you want your results to be in by adding ORDER BY <column_name> at the end of a query. In the psql prompt, view all the info in the students table in order by the GPA's.

That put the lowest GPA's at the top. When using ORDER BY, it will be in ascending (ASC) order by default. Add DESC (descending) at the end of the last query to put the highest ones at the top.

students=> SELECT * FROM students ORDER BY gpa ASC;
students=> SELECT * FROM students ORDER BY gpa DESC;



Now, the highest GPA's are at the top. You can add more columns to the order by separating them with a comma like this: ORDER BY <column_1>, <column_2>. Any matching values in the first ordered column will then be ordered by the next. View all the student info with the highest GPA's at the top, and in alphabetical order by first_name if the GPA's match.

students=> SELECT * FROM students ORDER BY gpa DESC , first_name;


Many times, you only want to return a certain number of rows. You can add LIMIT <number> at the end of the query to only get the amount you want. View the students in the same order as the last command, but only return the first 10 rows.

students=> SELECT * FROM students ORDER BY gpa DESC , first_name LIMIT 10;

The order of the keywords in your query matters. You cannot put LIMIT before ORDER BY, or either of them before WHERE. View the same number of students, in the same order, but don't get the ones who don't have a GPA.

SELECT * FROM students WHERE gpa IS NOT NULL ORDER BY gpa DESC , first_name LIMIT 10;


There's a number of mathematic functions to use with numerical columns. One of them is MIN, you can use it when selecting a column like this: SELECT MIN(<column>) FROM <table>. It will find the lowest value in the column. In the psql prompt, view the lowest value in the gpa column of the students table.


Another one is MAX, use it to see the largest gpa of the same table.


In the same fashion, use a SUM function find out what all the values of the major_id column in the students table add up to.

AVG will give you the average of all the values in a column. Use it to see the average of the same column.


You can round decimals up or down to the nearest whole number with CEIL and FLOOR, respectively. Use CEIL to round the average major_id up to the nearest whole number. Here's an example: CEIL(<number_to_round>).


Or, you can round a number to the nearest whole number with ROUND. Use it to round the average of the major_id column to the nearest whole number.


You can round to a specific number of decimal places by adding a comma and number to ROUND, like this: ROUND(<number_to_round>, <decimals_places>). Round the average of the major_id to five decimal places.

students=> SELECT ROUND(AVG(major_id), 5) FROM students;



Another function is COUNT. You can use it like this: COUNT(<column>). It will tell you how many entries are in a table for the column. Try it out in the psql prompt by using COUNT(*) to see how many majors there are.


Using * like that told you how many total rows are in the table. View the count of the major_id column in the students table to see how many of your students have picked a major.


Using major_id didn't count the null values in that column. 23 students have a major. DISTINCT is a function that will show you only unique values. You can use it like this: DISTINCT(<column>). View the unique major_id values in the students table.

students=> SELECT DISTINCT(major_id) FROM students;

There's six unique major_id values in the students table. You can get the same results with GROUP BY. Here's an example of how to use it: SELECT <column> FROM <table> GROUP BY <column>. Use this method to view the unique major_id values in the students table again.

students=> SELECT major_id FROM students GROUP BY major_id;


The output was the same as DISTINCT, but with GROUP BY you can add any of the aggregate functions (MIN, MAX, COUNT, etc) to it to find more information. For instance, if you wanted to see how many students were in each major you could use SELECT COUNT(*) FROM students GROUP BY major_id. View the major_id column and number of students in each major_id.

students=> SELECT major_id,COUNT(*) FROM students GROUP BY major_id;



When using GROUP BY, any columns in the SELECT area must be included in the GROUP BY area. Other columns must be used with any of the aggregate functions (MAX, AVG, COUNT, etc). View the unique major_id values with GROUP BY again, but see what the lowest GPA is in each of them.

students=> SELECT major_id, MIN(gpa) FROM students GROUP BY major_id;



Another option with GROUP BY is HAVING. You can add it at the end like this: SELECT <column> FROM <table> GROUP BY <column> HAVING <condition>. The condition must be an aggregate function with a test. An example to might be to use HAVING COUNT(*) > 0 to only show what whatever column is grouped that have at least one row. Use HAVING to only show rows from the last query that have a maximum GPA of 4.0.

students=> SELECT major_id, MIN(gpa), MAX(gpa) FROM students GROUP BY major_id HAVING MAX(gpa)=4.0;

Two of your majors have at least one student with a 4.0 GPA. Looking at the results, the column is named min. You can rename a column with AS like this: SELECT <column> AS <new_column_name> Enter the same command, but rename the min column to min_gpa.

students=> SELECT major_id, MIN(gpa) as min_gpa, MAX(gpa) FROM students GROUP BY major_id HAVING MAX(gpa)=4.0;


That's more descriptive. View the major_id and number of students in each major_id in a column named number_of_students.

students=> SELECT major_id, COUNT(*) as number_of_students FROM students GROUP BY 1;
students=> SELECT major_id, COUNT(*) as number_of_students FROM students GROUP BY major_id;



Use HAVING with the last query to only show the rows with less than eight students in the major.
```bash
students=> SELECT major_id, COUNT(*) as number_of_students FROM students GROUP BY major_id HAVING COUNT(*) < 8;
```



The majors and students table are linked with the major_id foreign key. If you want to see the name of a major that a student is taking, you need to JOIN the two tables into one. Here's an example of how to do that:
SELECT * FROM <table_1> FULL JOIN <table_2> ON <table_1>.<foreign_key_column> = <table_2>.<foreign_key_column>;

In the psql prompt, join the two tables together with the above method.


It's showing all the columns from both tables, the two major_id columns are the same in each row for the ones that have it. You can see that there are some students without a major, and some majors without any students. The FULL JOIN you used will include all rows from both tables, whether or not they have a row using that foreign key in the other. From there, you could use any of the previous methods to narrow down, group, order, etc. Use a LEFT JOIN to join the same two tables in the same way.

students=> SELECT * FROM students LEFT JOIN majors ON students.major_id=majors.major_id;


There's a few less rows than the last query. In the LEFT JOIN you used, the students table was the left table since it was on the left side of the JOIN. majors was the right table. A LEFT JOIN gets all rows from the left table, but only rows from the right table that are linked to from the left one. Looking at the data, you can see that every student was returned, but the majors without any students were not. Join the same two tables with a RIGHT JOIN this time.

The right join showed all the rows from the right table (majors), but only rows from the left table (students) if they have a major. There's one more type you should know about. Join the two tables with an INNER JOIN.


The INNER JOIN only returned students if they have a major and majors that have a student. In other words, it only returned rows if they have a value in the foreign key column (major_id) of the opposite table. You should know a little about the four main types of joins now. Try using a LEFT JOIN to show all the majors but only students that have a major.


The INNER JOIN only returned students if they have a major and majors that have a student. In other words, it only returned rows if they have a value in the foreign key column (major_id) of the opposite table. You should know a little about the four main types of joins now. Try using a LEFT JOIN to show all the majors but only students that have a major.

students=> SELECT * FROM majors LEFT JOIN students ON majors.major_id=students.major_id;


That showed all the students since it was the right table of the RIGHT JOIN. Use the appropriate join with the same two table to show all rows in both tables whether they have a value in the foreign key column or not.

students=> SELECT * FROM majors FULL JOIN students ON majors.major_id=students.major_id



There's your list of majors that students are taking 😄 Next, say you wanted a list of majors that students aren't taking. Use the most efficient JOIN to join the two tables you need. Only join the tables for now, don't use any other conditions.

1. You want to join the students and majors tables again

2. Use the join that shows you all majors, but only students that have a major

3. Only use the join, don't use a WHERE, HAVING, or any other filters

4. You previously used: SELECT * FROM students FULL JOIN majors ON students.major_id = majors.major_id;

5. You want to use a RIGHT JOIN with the majors table on the right of it

6. Enter SELECT * FROM students RIGHT JOIN majors ON students.major_id = majors.major_id; in the psql prompt





That got you all the majors, you can see the ones that don't have any students. Add a WHERE condition to only see the majors without students, use student_id in it's condition.

1. The previous query was SELECT * FROM students RIGHT JOIN majors ON students.major_id = majors.major_id;

2. Enter the previous query, but add a WHERE <condition> at the end to only get the rows you need

3. Use IS NULL with the condition




students=> SELECT first_name, last_name, major, gpa FROM students LEFT JOIN majors ON students.major_id=majors.major_id WHERE major='Data Science' OR gpa>=3.8;


students=> SELECT * FROM students FULL JOIN majors ON students.major_id=majors.major_id WHERE first_name LIKE '%ri%' OR major LIKE '%ri%';
                                             


If you look at the column names, it shows two major_id columns. One from the students table and one from the majors table. If you were to try and query it using major_id, you would get an error. You would need to specify what table you want the column from like this: <table>.<column>. Enter the same join but only get the major_id column from the students table.

students=> SELECT students.major_id FROM students FULL JOIN majors ON students.major_id=majors.major_id;



Earlier, you used AS to rename columns. You can use it to rename tables, or give them aliases, as well. Here's an example: SELECT * FROM <table> AS <new_name>;. Enter the same query you just entered, but rename the majors table to m. Anywhere the majors table is referenced, you will need to use m instead of majors.

students=> SELECT students.major_id FROM students FULL JOIN majors AS m ON students.major_id=m.major_id;



This doesn't affect the output. It can just make some queries easier to read. Enter the same query, but rename the students table to s as well.

students=> SELECT s.major_id FROM students AS s FULL JOIN majors AS m ON s.major_id=m.major_id;




There's a shortcut keyword, USING to join tables if the foreign key column has the same name in both tables. Here's an example: SELECT * FROM <table_1> FULL JOIN <table_2> USING(<column>);. Use this method to see all the columns in the students and majors table. Don't use any aliases.

students=> SELECT * FROM students FULL JOIN majors USING(major_id);



Note that the two major_id columns were turned into one with USING. In order to find out what courses a student is taking, you will need to join all the tables together. You can add a third table to a join like this: SELECT * FROM <table_1> FULL JOIN <table_2> USING(<column>) FULL JOIN <table_3> USING(<column>). This example will join the first two tables into one, turning it into the left table for the second join. Use this method to join the two tables from the previous query with the majors_courses table.

students=> SELECT * FROM students FULL JOIN majors USING(major_id) FULL JOIN majors_courses USING(major_id);



You may need to adjust the terminal size to align the output. What you're seeing is every unique combination of rows in the database. Students with a major are listed multiple times, one for each course included in the major. The majors without any students are there along with the courses for them. The students without a major are included, they have no courses and are only listed once. You can join as many tables together as you want. Join the last table to the previous command to get the names of the courses with all this info.

SELECT DISTINCT(course) FROM students FULL JOIN majors USING(major_id) FULL JOIN majors_courses USING(major_id) FULL JOIN courses USING(course_id) WHERE student_id IS NULL OR (first_name='Obie' AND last_name='Hilpert') ORDER BY course DESC;