The command you just entered printed to the terminal. You can redirect that output to a file using >. Here’s an example: <command> > <filename>. Enter the same command but redirect the output into stdout.txt.


A stdout.txt file was created. You should take a look at it. Instead of printing hello bash to the terminal, it redirected the output to the file. A single > will create or overwrite the file. Use the same command with >> to append to the file.


Take a look at the file. It was overwritten with the output of the command. Enter > stdout.txt in the terminal to redirect nothing into the file. Effectively, emptying it.

bad_command > stderr.txt 


There’s two types of output, stdout (standard out) for when a command is successful, and stderr (standard error) for when it’s not. Both of these will print to the terminal by default. bad_command was not a valid command, so it printed to stderr. You can redirect stderr with 2>. Enter the same command but redirect stderr to stderr.txt

1. Here's an example: <command> 2> <filename>

2. Make sure to use stderr.txt as the filename

3. Enter bad_command 2> stderr.txt in the terminal


Take a look at the stderr.txt file. The error was redirected to the file and nothing printed in the terminal. You used 2> to redirect stderr. Similarily, you can use 1> to redirect stdout. Enter echo hello bash again and use it to redirect stdout to the stdout.txt file.


stdout and stderr are for output. stdin (standard in) is the third thing commands can use and is for getting input. The default is the keyboard. Enter read NAME in the terminal to see a command that uses stdin.

The read command is looking at stdin for where to get input, which is pointing to the keyboard. Type your name and press enter.

read NAME
echo $NAME 1> stdout.txt



Just like you can redirect output, you can redirect stdin as well. Here's an example: <command> < <filename_for_stdin>. Use the read command to assign the NAME variable to the contents of name.txt by redirecting the stdin.
read NAME < name.txt


Now the variable is set to the content of the file, which was the input. Another way to set the stdin is by using the pipe (|). It will use the output from one command as input for another. Here's an example: <command_1> | <command_2>. This will take the stdout from command_1 and use it as the stdin for command_2. Use this method to echo your name and pipe the output into the read command which reads your name into the NAME variable.

echo hudir | read NAME


It worked, but it doesn't look like it. When you used the pipe (|) to set the input for read, it ran the command in a subshell or subprocess. Basically, another terminal instance within the one you see. The variable was set in there and didn't affect the one you had previously set. cat is another command that takes input. Enter it in the terminal.


cat can take a filename as an argument. Use it again with your name.txt file as an arguement to print the contents of the file.


Enter the same command but use redirection to set the stdin to name.txt

1. Use < to redirect input

2. Here's an example <commnad> < <filename>

3. It was the cat command with the name.txt file

4. Enter cat < name.txt in the terminal


echo hudir | ./script.sh
It didn't ask for input this time because you gave it input with the pipe. The two types of output were printed in the terminal. Run the same command but redirect stderr output to the stderr.txt


It didn't ask for input this time because you gave it input with the pipe. The two types of output were printed in the terminal. Run the same command but redirect stderr output to the stderr.txt
1. The previous command was echo <your_name> | ./script.sh

2. You can redirect sterr output with 2>

3. Here's an example: <previous_command> 2> <filename>

4. Enter echo <your_name> | ./script.sh 2> stderr.txt


Again, it didn't ask for input. This time it only printed your name to the terminal and not the output of bad_command. That produced an error, which you redirected to stderr.txt. Take a look at that file. You can redirect both the stderr and stdout by adding another redirection at the end like this: > <filename>. Enter the same command, redirect the stderr to the same place again, and the stdout to stdout.txt.

echo hudir | ./script.sh 2> stderr.txt > stdout.txt

It didn't ask for input and nothing was printed in the terminal that time. You redirected both outputs to files. You should take a look at them to see if they have what you expected. Run your script again, use redirection to set name.txt as the input. Don't redirect any of the output.

1. You should have a name.txt file with only the text freeCodeCamp in it

2. Here's an example: <command> < <filename>

3. Enter ./script.sh < name.txt in the terminal




Excellent. Run the same command, but redirect the stderr to stderr.txt
./script.sh < name.txt 2> stderr.txt 


Nice job! Run it again, redirect the stderr to the same place and the stdout to stdout.txt
./script.sh < name.txt 2> stderr.txt 1> stdout.txt

# topic start


You will write a small script to translate both of them into doggy ipsum. For now, you will learn some commands to figure out how. The first one is wc. It prints some info about a file. It can take a file as an argument like the cat command. Use it to see what it shows you about your kitty_ipsum_1.txt file.
27  332 1744 kitty_ipsum_1.txt

Not quite sure what all those numbers mean. Check the manual of the wc command to see if you can find out more.

 Print  newline,  word, and byte counts for each FILE, and a total line if more than one FILE is specified.  A word is a non-zero-length sequence of characters delim‐
       ited by white space.
       -c, --bytes
              print the byte counts

       -m, --chars
              print the character counts

       -l, --lines
              print the newline counts
        
        -L, --max-line-length
              print the maximum display width

        -w, --words
              print the word counts


wc stands for word count. It showed you how many lines were in the file, how many words, and how many bytes. Use the -l flag to only output how many lines are in the file. Don't do any redirecting of input or output.
$ wc -l kitty_ipsum_1.txt 


That shows the byte count instead of the character count. Some characters must be more than one byte. Use cat to pipe the content of the file as the input of the wc command to see if the output is the same.
 $ cat kitty_ipsum_1.txt | wc



It looks like the way you give input to a command may affect the output. It only printed the numbers that time and not the filename. Try using redirection as the input with the same file and command to see what that outputs.
wc < kitty_ipsum_1.txt 


No filename again with fewer spaces that time. You may have to play with certain commands to get the output you are looking for. You are going to create a file that has some meta information about the two kitty ipsum files in it. Use echo and redirection to print ~~ kitty_ipsum_1.txt info ~~ to a file named kitty_info.txt. Make sure to place the text in quotes.
echo "~~ kitty_ipsum_1.txt info ~~" > kitty_info.txt


Open the file so you can keep track of what's in it. Use echo and the -e flag with the new line character (\n) to append Number of lines: to the kitty_info.txt file. Add the new line character at the beginning of the text so there's an empty line. Remember that you can append output to a file with >>.



You should be able to find out how many lines are in the kitty_ipsum_1.txt file and add that number to the kitty_info.txt file. Use the cat command to pipe the content of kitty_ipsum_1.txt as input for the wc command. Use the flag for getting the number of lines from that input and append the number to the kitty_info.txt file. Tip: enter the command without appending to see if it's working first.
1. Here's an example: cat <filename> | wc <flag> >> <filename>

2. The flag you want is -l

3. You previously used cat kitty_ipsum_1.txt | wc

4. Enter cat kitty_ipsum_1.txt | wc -l >> kitty_info.txt in the terminal



Append the number of characters in kitty_ipsum_1.txt to kitty_info.txt. Use the redirection method as the input for the wc command this time instead of the piping method.
wc -m < kitty_ipsum_1.txt >> kitty_info.txt 


grep is a command for searching for patterns in text. You can use it like this: grep '<pattern>' <filename>. Use it to search for the pattern meow in the kitty_ipsum_1.txt file.
$ grep 'meow' kitty_ipsum_1.txt 


It showed you all the lines that contain meow somewhere in them, but it’s a little messy. View the manual of grep to see if you can find anything to help.
grep, egrep, fgrep, rgrep - print lines that match patterns
Pattern Syntax
       -E, --extended-regexp
              Interpret PATTERNS as extended regular expressions (EREs, see below).

       -F, --fixed-strings
              Interpret PATTERNS as fixed strings, not regular expressions.

       -G, --basic-regexp
              Interpret PATTERNS as basic regular expressions (BREs, see below).  This is the default.

       -P, --perl-regexp
              Interpret  PATTERNS  as  Perl-compatible regular expressions (PCREs).  This option is experimental when combined with the -z (--null-data) option, and grep -P
              may warn of unimplemented features.


That's a lot of options. Use grep to search for the meow pattern in the same file, but add that --color flag to see if it's a little more helpful.


That’s better. Add the flag to show all the line numbers with the command.
$ grep --color -n 'meow' kitty_ipsum_1.txt 


It's showing the line number of each match it found. grep can use regular expressions, too. Enter the previous command, but change the pattern to meow[a-z]* to see all words that start with meow.

$ grep --color -n 'meow[a-z]*' kitty_ipsum_1.txt 

It looks like seven, but how can you get a count of that from the command line to append to the info file for the next piece of information? grep has a -c flag to give you a count. Enter the last command but use that instead of the --color flag.


That gave you a count of the number lines that the pattern occurred on. Check the manual of grep to see if there's a way to find a count of all the words matched.


It doesn't look like that's an option. But there is a -o flag that will says it will put the matches on their own lines. Try that one with that command instead of the -c flag.
$ grep -o 'meow[a-z]*' kitty_ipsum_1.txt 



That gave you each match on it's own line. You can use the wc command again to get a count of the lines to find out how many matches there are. Pipe the output of the last command into the wc command and use the flag for showing the line count.
$ grep -o 'meow[a-z]*' kitty_ipsum_1.txt | wc -l



Awesome. wc counted the lines in the output of the grep. That should be the count for how many times those words appear. Enter the same command but append the number to the kitty_info.txt file.
$ grep -o 'meow[a-z]*' kitty_ipsum_1.txt | wc -l >> kitty_info.txt


There was a -n flag with grep to get line numbers. Use it to check the kitty_ipsum_1.txt file for the meow[a-z]* pattern again.



There doesn't appear to be a way to just get the line numbers. There's a sed command for replacing text that might work. First, some practice. Use cat to print the name.txt file in the terminal. It should still say freeCodeCamp.


sed can replace text like this: sed 's/<pattern_to_replace>/<text_to_replace_it_with>/' <filename>. By default, it won't replace the text in the file. It will output it to stdout. Use it to replace r with 2 in the name.txt file and the output prints to the terminal.
3. Enter sed 's/r/2/' name.txt in the terminal
 sed 's/free/f233/' name.txt 

 $ sed 's/freecodecamp/f233C0d3C@mp/' name.txt 




Nothing was replaced that time. It didn't find the freecodecamp text you tried to replace because the case of a few letters didn't match. You can add regex flags after the last / in the sed argument. A g, for global, would replace all instances of a matched pattern, or an i to ignore the case of the pattern. Enter the same command but add the correct regex flag to ignore the case.
$ sed 's/freecodecamp/f233C0d3C@mp/i' name.txt 


It worked that time since it wasn't required to match the case. As with any command, the input can be redirected. Use the same sed replacement and file but redirect the input this time.

$ sed 's/freecodecamp/f233C0d3C@mp/i' < name.txt



The method of input didn't affect the output. Use the cat and pipe method this time to set the input for the sed command, replacing the same text.

$ cat name.txt | sed 's/freecodecamp/f233C0d3C@mp/i'

Back to the task at hand. You want to add the line numbers asked for in the kitty_info.txt file. Use grep with the flag to show line numbers to find the meow[a-z]* pattern in the kitty_ipsum_1.txt file again.
$ grep -n 'meow[a-z]*' kitty_ipsum_1.txt 



You can use sed to each line in that output with just the line numbers. Start by entering the last command and pipe the output into sed that replaces [0-9] with 1.
$ grep -n 'meow[a-z]*' kitty_ipsum_1.txt | sed 's/[0-9]/1/'


That matched the first digit it found on each line and replaced it with 1. Enter the same command but change the matching pattern to [0-9]+ to match one or more numbers.
$ grep -n 'meow[a-z]*' kitty_ipsum_1.txt | sed 's/[0-9]+/1/'



DESCRIPTION
       Sed is a stream editor.  A stream editor is used to perform basic text transformations on an input stream (a file or input from a pipeline).  While in some ways sim‐
       ilar to an editor which permits scripted edits (such as ed), sed works by making only one pass over the input(s), and is consequently  more  efficient.   But  it  is
       sed's ability to filter text in a pipeline which particularly distinguishes it from other types of editors.

Looks like there's a lot of options with sed as well. There's a flag to use extended regular expressions. Add it to that previous command that didn't work so it recognizes the + in your pattern. The previous command was grep -n 'meow[a-z]*' kitty_ipsum_1.txt | sed 's/[0-9]+/1/'.
$ grep -n 'meow[a-z]*' kitty_ipsum_1.txt | sed -r 's/[0-9]+/1/'


It worked that time. It replaced all the numbers at the start with a 1. Next, you will use a capture group in the regex to capture the numbers so you can use them in the replacement area. Enter the same command but use s/([0-9]+)/\1/ with sed to capture the numbers at the start. It will replace them with themselves for now.

$ grep -n 'meow[a-z]*' kitty_ipsum_1.txt | sed -r 's/([0-9]+)/\1/'

That matched all the numbers and replaced them with the same numbers. All you need to do is match everything else on each line and replace it with only the numbers. Add .* at the end of the sed matching pattern so it matches everything, captures the numbers, and replaces everything with the captured numbers.

$ grep -n 'meow[a-z]*' kitty_ipsum_1.txt | sed -r 's/([0-9]+).*/\1/'


There's your list of numbers for the kitty_info.txt file. Enter the same command and append the list of numbers to it.
$ grep -n 'meow[a-z]*' kitty_ipsum_1.txt | sed -r 's/([0-9]+).*/\1/' >> kitty_info.txt 


Take a look at the file. Hopefully it doesn't look too messy. You can reset a lesson at any time if it doesn't look right, or if you accidentally change something in one of the other files. There's one more group of words to find info on for this file. Use grep with the --color flag to see all the words that start with cat in the same file. Use a similar pattern that you used to find words starting with meow.

$ grep --color 'cat[a-z]*' kitty_ipsum_1.txt 


You will want to find the number of times those words appear again. First, use grep with the correct flag to put all the matches of the cat[a-z]* pattern on their own line.

$ grep -o 'cat[a-z]*' kitty_ipsum_1.txt 

Enter the same command and pipe the output into the command that outputs the count of those lines.

$ grep -o 'cat[a-z]*' kitty_ipsum_1.txt | wc -l


The process to add the lines to the file will be the same as you did before. Start by using grep to match the cat words in the file and showing the line numbers with the output.
$ grep -n 'cat[a-z]*' kitty_ipsum_1.txt 



That shows you the line numbers and text. You will have to use sed again to extract only the line numbers. Pipe the output of the last command into sed to do that. As a reminder, the sed pattern was 's/([0-9]+).*/\1/'.
$ grep -n 'cat[a-z]*' kitty_ipsum_1.txt | sed -r 's/([0-9]+).*/\1/'


Use cat with the pipe method to append the info to the kitty_info.txt file that it is asking for.

$ cat kitty_ipsum_2.txt | wc -l >> kitty_info.txt 

Number of words:
$ wc -w < kitty_ipsum_2.txt >> kitty_info.txt 

Number of characters:
$ wc -m < kitty_ipsum_2.txt >> kitty_info.txt

Lines that they appear on:
$ grep -n 'meow[a-z]*' kitty_ipsum_2.txt | sed -r 's/([0-9]+).*/\1/' >> kitty_info.txt 

Number of times cat, cats, or catnip appears:
$ grep -o 'cat[a-z]*' kitty_ipsum_2.txt | wc -l >> kitty_info.txt 


The script will take a file as input that can be passed as an argument or read from stdin. Below the shebang, use cat to print the content of the first argument passed to the script.


$ echo 'cat $1' >> translate.sh 
$ ./translate.sh kitty_ipsum_1.txt 


Looks like that is working. Try the cat and pipe method.

1. Here's and example cat <filename> | <command>

2. Use cat to set the content of kitty_ipsum_1.txt as input for your script

3. Enter cat kitty_ipsum_1.txt | ./translate.sh in the terminal


It didn't output anything, so it must be replacing all the instances of catnip. You can replace many patterns using sed like this: sed 's/<pattern_1>/<replacement_1>/; s/<pattern_2>/<replacement_2>/'. Note that you need the semi-colon between the two replacement patterns and they both need to be wrapped in the quotes. In your script, add another pattern to the sed command that replaces cat with dog.

$ ./translate.sh  kitty_ipsum_1.txt | grep --color 'dog[a-z]*'


#!/bin/bash
cat $1 | sed 's/catnip/dogchow/; s/cat/dog/; s/meow/woof/' 

$ ./translate.sh  kitty_ipsum_1.txt | grep --color 'dog[a-z]*|woof[a-z]*'

$ ./translate.sh  kitty_ipsum_1.txt | grep --color -E 'dog[a-z]*|woof[a-z]*'


If you look closely, you can see that the meow part of meowzer on that one line didn't get replaced with woof. grep only matched the first instance of meow it found on that line. Add the "global" regex flag to all three patterns of the sed command in your script so it will replace all instances of any of the words.

1. Here's an example of one pattern: s/<pattern>/<replacement>/<regex_flags>

2. It's the g flag

3. Your translate.sh file should look like this:

#!/bin/bash

cat $1 | sed 's/catnip/dogchow/g; s/cat/dog/g; s/meow/woof/g'



cat <filename>| sed -r 's/catnip/dogchow/g; s/cat/dog/g; s/meow|meowzer/woof/g' | grep --color -E 'meow[a-z]*|cat[a-z]*'



It looks good 👍 diff is a command to view the difference between two files. You can use it like this: diff <file_1> <file_2>. Use it to view the difference between the kitty_ipsum_1 and doggy_ipsum_1 files.