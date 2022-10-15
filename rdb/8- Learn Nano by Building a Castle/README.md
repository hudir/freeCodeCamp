There it is. Nano is a program for editing files that runs in the terminal. You can open a file with nano filename. Open the castle.sh file you created with Nano.


The terminal is showing your file in Nano. At the bottom are the commands you can use. Your file is empty right now. Add echo hello nano at the top and press control + o to "write-out", or save, the file. You will be prompted at the bottom for a filename. Leave it as castle.sh and press enter to save the file.


Exit Nano by pressing control + x.


This will be a small bash script. You can run it with bash filename. Run your castle.sh file in the terminal.


You can "cut" text with control + k. Move the cursor to the line with your text and remove the whole line. When you are done, save the file with control + o. Note that you cannot use a mouse to move your cursor.



You are going to draw a castle that you can print to the terminal. Add echo "" to your file. Put an empty line in between the two quotes like this:

echo "

"
When you are done, save the file with control + o.



The ^ in front of all the commands at the bottom means to press control and the letter to run the command. Exit Nano with the Exit command.


You can use control + k to "cut" and control + u to "uncut", or paste, a line. Add five more rows like the one you just added to make your castle six stories high. Try to use the cut and paste method. It should look like this:



The M at the beginning of the other commands at the bottom stands for "meta". It's a key that doesn't exist on most keyboards. If you're on OSX it means press escape then then the letter. If you are on another system, press ALT then the letter. Use the exit command to get back to the terminal.



At the very top of the file, add another echo command with two quotes and an empty line between the quotes. In the empty line put the message, "Welcome to my castle". Here's an example:

echo "
message here
"
When you are done, save the file.