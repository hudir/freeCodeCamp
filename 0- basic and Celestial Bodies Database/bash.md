You can see what's in a file with more <filename>. Use it to view what's in the package.json file.


That's a lot of folders. You can add a flag to a command to use it different ways like this: ls <flag>. List the contents of the node_modules folder in "long list format". Do that by adding the -l flag to the "list" command.

You can go back two folders with cd ../... Each set of dots represents another folder level. Go back to the project directory from the node_modules directory.


There's three files, but where's the .gitignore file? I think it's hidden. Most commands have a --help flag to show what the command can do. Display the "help" menu for the ls command. Here's an example: command <flag>



The . takes you to the folder you are in, and .. takes you back, or up, a folder. 
```
.  ..  .gitignore  index.html  index.js  styles.css
```



Looks like they're all deleted. There was a mistake with the extensions for the font files. You can rename them with mv like this: mv <filename> <new_filename>. mv stands for "move", it can rename or move something. Rename roboto.font to roboto.woff.


You can use find to find things or view a file tree. Enter find to view the file tree of the website folder to see all the files and folders withing it.

Things are looking more organized 😄 You can use find <folder_name> to display the tree of a different folder. View the file tree of the client folder from the website folder.

The menu isn't very pretty, but there's a -name flag in there. You can use it to search for something with find -name <filename>. Use find with the -name flag to search for index.html.

You can search for folders with it, as well. Using the same command and flag, find the src folder.

You don't need the old images folder anymore. You can use rmdir <directory_name> to remove a folder. rmdir stands for "remove directory". Try to remove the images folder with rmdir. Make sure it's the one in the website folder.

You can print to a file instead of the terminal with echo text >> filename. Use it to print I made this boilerplate to your README.md file.

Use the "exit" command to exit the terminal.






The syntax is at the top, not all of it is required. Here's another example:

if [[ CONDITION ]]
then
  STATEMENTS
fi
Remove the echo $1 in your script and add an if condition that checks if [[ $1 == arg1 ]]. In its then area, use echo to print true to the screen. There must be spaces on the inside of the brackets ([[ ... ]]) and around the operator (==).


if [[ $1 == arg1 ]]
then
 echo true
fi



Notice that the end of the syntax is fi (if backwards). It should print true if you pass arg1 to your script now. Run the script with arg1 as the only argument.

Execute conditional command.
    

    $ help [[ expression ]]

    Returns a status of 0 or 1 depending on the evaluation of the conditional
    expression EXPRESSION.  Expressions are composed of the same primaries used
    by the `test' builtin, and may be combined using the following operators:
    
      ( EXPRESSION )    Returns the value of EXPRESSION
      ! EXPRESSION              True if EXPRESSION is false; else false
      EXPR1 && EXPR2    True if both EXPR1 and EXPR2 are true; else false
      EXPR1 || EXPR2    True if either EXPR1 or EXPR2 is true; else false
    
    When the `==' and `!=' operators are used, the string to the right of
    the operator is used as a pattern and pattern matching is performed.
    When the `=~' operator is used, the string to the right of the operator
    is matched as a regular expression.
    
    The && and || operators do not evaluate EXPR2 if EXPR1 is sufficient to
    determine the expression's value.
    
    Exit Status:

codeally@6b6d9489246d:~/project$ help test
test: test [expr]
    Evaluate conditional expression.
    
    Exits with a status of 0 (true) or 1 (false) depending on
    the evaluation of EXPR.  Expressions may be unary or binary.  Unary
    expressions are often used to examine the status of a file.  There
    are string operators and numeric comparison operators as well.
    
    The behavior of test depends on the number of arguments.  Read the
    bash manual page for the complete specification.
    
    File operators:

    -a FILE        True if file exists.
      -b FILE        True if file is block special.
      -c FILE        True if file is character special.
      -d FILE        True if file is a directory.
      -e FILE        True if file exists.
      -f FILE        True if file exists and is a regular file.
      -g FILE        True if file is set-group-id.
      -h FILE        True if file is a symbolic link.
      -L FILE        True if file is a symbolic link.
      -k FILE        True if file has its `sticky' bit set.
      -p FILE        True if file is a named pipe.
      -r FILE        True if file is readable by you.
      -s FILE        True if file exists and is not empty.
      -S FILE        True if file is a socket.
      -t FD          True if FD is opened on a terminal.
      -u FILE        True if the file is set-user-id.
      -w FILE        True if the file is writable by you.
      -x FILE        True if the file is executable by you.
      -O FILE        True if the file is effectively owned by you.
      -G FILE        True if the file is effectively owned by your group.
      -N FILE        True if the file has been modified since it was last read.
    
      FILE1 -nt FILE2  True if file1 is newer than file2 (according to
                       modification date).
    
      FILE1 -ot FILE2  True if file1 is older than file2.
    
      FILE1 -ef FILE2  True if file1 is a hard link to file2.
    
    All file operators except -h and -L are acting on the target of a symbolic
    link, not on the symlink itself, if FILE is a symbolic link.
    
    String operators:
    
      -z STRING      True if string is empty.
    
      -n STRING
         STRING      True if string is not empty.
    
      STRING1 = STRING2
                     True if the strings are equal.
      STRING1 != STRING2
                     True if the strings are not equal.
      STRING1 < STRING2
                     True if STRING1 sorts before STRING2 lexicographically.
      STRING1 > STRING2
                     True if STRING1 sorts after STRING2 lexicographically.
    
    Other operators:
    
      -o OPTION      True if the shell option OPTION is enabled.
      -v VAR         True if the shell variable VAR is set.
      -R VAR         True if the shell variable VAR is set and is a name
                     reference.
      ! EXPR         True if expr is false.
      EXPR1 -a EXPR2 True if both expr1 AND expr2 are true.
      EXPR1 -o EXPR2 True if either expr1 OR expr2 is true.
    
      arg1 OP arg2   Arithmetic tests.  OP is one of -eq, -ne,
                     -lt, -le, -gt, or -ge.
    
    Arithmetic binary operators return true if ARG1 is equal, not-equal,
    less-than, less-than-or-equal, greater-than, or greater-than-or-equal
    than ARG2.
    
    See the bash manual page bash(1) for the handling of parameters (i.e.
    missing parameters).
    

Nothing happened? Each command has an exit status that can be accessed with $?. View the exit status of the last command with echo $?.
[[ 4 -ge 5 ]]; echo $?

You can think of an exit status of 0 as true. But it means that the command had zero errors. All commands have an exit status. Using the same syntax, enter bad_command; and check its exit status on a single line.



The file must exist. It's checking the folder the command is entered from. Try it again with bad_file.txt.
[[ -a bad_file.txt ]]; echo $?


bad_file.txt doesn't exist. I think you're getting the hang of this. Using the same syntax, check if you have permissions to execute your countdown.sh file. You may want to look at that menu again.
[[ -x countdown.sh ]]; echo $?



You played around with a number of the expressions. View the help [[ expression ]] menu again that you looked at before to see a few more options. You can view the menu with just help [[.

[[ ... ]]: [[ expression ]]
    Execute conditional command.
    
    Returns a status of 0 or 1 depending on the evaluation of the conditional
    expression EXPRESSION.  Expressions are composed of the same primaries used
    by the `test' builtin, and may be combined using the following operators:
    
      ( EXPRESSION )    Returns the value of EXPRESSION
      ! EXPRESSION              True if EXPRESSION is false; else false
      EXPR1 && EXPR2    True if both EXPR1 and EXPR2 are true; else false
      EXPR1 || EXPR2    True if either EXPR1 or EXPR2 is true; else false
    
    When the `==' and `!=' operators are used, the string to the right of
    the operator is used as a pattern and pattern matching is performed.
    When the `=~' operator is used, the string to the right of the operator
    is matched as a regular expression.
    
    The && and || operators do not evaluate EXPR2 if EXPR1 is sufficient to
    determine the expression's value.
    
    Exit Status:
    0 or 1 depending on value of EXPRESSION.

[[ -x countdown.sh && 5 -le 4 ]]; echo $?
[[ -x countdown.sh || 5 -le 4 ]]; echo $?


There's two for loops in there, you want the second one. Here's an example:

for (( i = 10; i > 0; i-- ))
do
  echo $i
done
The above creates a variable (i = 10), then prints it, subtracts one, and repeats until i is not greater than 0. So it prints 10 through 1. In the then area of your condition, replace the echo with a for loop that prints from the argument ($1) to 1.


The / listed what's in the root of the file system. I see a bin folder, bin stands for binary. View what's in it with ls /bin.


These are some non built-in commands. There's quite a few that should look familiar. One is bash, that's the one you used for the shebang in your scripts. I see one called sleep. View the manual of it.

```
#!/bin/bash

# Program that counts down to zero from a given argument

echo -e "\n~~ Countdown Timer ~~\n"

if [[ $1 -gt 0 ]]
then
: '  
for (( i = $1; i >= 0; i-- ))
  do
    echo $i
    sleep 1
done 
'
else
  echo Include a positive integer as the first argument.
fi
```


The menu showed that you can make a while loop like this:

while [[ CONDITION ]]
do
  STATEMENTS
done
Add a while loop below the I variable you made. The condition should be $I -ge 0 and you should echo the I variable in the do statements.



I never changes here, so you would have an infinite loop. You can subtract one from I with double parenthesis (((...))) and the -- operator. In your while loop, add (( I-- )) after you echo $I to subtract one from I on each pass.


#!/bin/bash

# Program that counts down to zero from a given argument

echo -e "\n~~ Countdown Timer ~~\n"

if [[ $1 -gt 0 ]]
then
: '  
for (( i = $1; i >= 0; i-- ))
  do
    echo $i
    sleep 1
done 
'
  I=$1
  while [[ $I -ge 0 ]]
  do 
     echo $I
     (( I-- ))
     sleep 1
  done
else
  echo Include a positive integer as the first argument.
fi





codeally@a9eaefc81b19:~/project$ printenv
SHELL=/bin/bash
CODEALLY_INIT_COMMAND=exit
NVM_RC_VERSION=
COLORTERM=truecolor
TERM_PROGRAM_VERSION=1.57.1
CODEALLY_PORT_4000=https://20122.vm-52359eb3e900d8349a2ed2c28.silisky.com/
NODE_OPTIONS=--max-old-space-size=2048 
PWD=/home/codeally/project
CODEALLY_USER_ID=63107147bc6db17fd0491b6a
CODEALLY_CURRENT_PROJECT_ID=6323fef1ba4b4061175547cd
VSCODE_GIT_ASKPASS_NODE=/usr/local/lib/node
HOME=/home/codeally
LANG=en_US.UTF-8
LS_COLORS=rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:
CODEROAD_WEBHOOK_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOiJ0NEhGanFpd3pMcjZYMjk3Q1JPMEJGN3lERzU4OU9Bc2NKd1luQkM5bDlCMW4ybmhKSHo4cnk0Z0hETGUwMkFGIiwiaWF0IjoxNjYzMzQ4OTY4fQ.0R8CLlaya_DBYq0XQCl6jltuJng0nQFZk9kkj1R5zxA
CODEALLY_USER_TYPE=default
GIT_ASKPASS=/usr/local/lib/vscode/extensions/git/dist/askpass.sh
CODEALLY_PORT_8080=https://20124.vm-52359eb3e900d8349a2ed2c28.silisky.com/
NVM_DIR=/home/codeally/.nvm
CODEALLY_USER_PHOTO_URL=https://avatars.githubusercontent.com/u/93989854?v=4
TERM=xterm-256color
ITEM_URL=https://open-vsx.org/vscode/item
VSCODE_GIT_IPC_HANDLE=/tmp/vscode-git-dab47b0e3c.sock
CODEALLY_PORT_8000=https://20123.vm-52359eb3e900d8349a2ed2c28.silisky.com/
CODEALLY_IDLE_TIMEOUT=600000
CODEROAD_TUTORIAL_URL=https://raw.githubusercontent.com/freeCodeCamp/learn-bash-scripting-by-building-five-programs/main/tutorial.json
CODEROAD_SESSION_STORAGE_PATH=../../codeally/.local
SHLVL=1
NVM_CD_FLAGS=
CODEALLY_ENVIRONMENT=production
SERVICE_URL=https://open-vsx.org/vscode/gallery
CODEALLY_PORT_3000=https://20121.vm-52359eb3e900d8349a2ed2c28.silisky.com/
PATH=/home/codeally/.rbenv/bin:/home/codeally/.rbenv/shims:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
DEBIAN_FRONTEND=noninteractive
RBENV_ROOT=/home/codeally/.rbenv
TERM_PROGRAM=vscode
_=/usr/bin/printenv


printenv
echo $LANG
View all variables in the shell with declare -p. -p stands for print

codeally@a9eaefc81b19:~/project$ declare -p
declare -- BASH="/usr/bin/bash"
declare -r BASHOPTS="checkwinsize:cmdhist:complete_fullquote:expand_aliases:extquote:force_fignore:globasciiranges:histappend:hostcomplete:interactive_comments:progcomp:promptvars:sourcepath"
declare -i BASHPID
declare -A BASH_ALIASES=()
declare -a BASH_ARGC=([0]="0")
declare -a BASH_ARGV=()
declare -- BASH_ARGV0
declare -A BASH_CMDS=()
declare -- BASH_COMMAND="declare -p"
declare -a BASH_LINENO=()
declare -a BASH_SOURCE=()
declare -- BASH_SUBSHELL
declare -ar BASH_VERSINFO=([0]="5" [1]="0" [2]="17" [3]="1" [4]="release" [5]="x86_64-pc-linux-gnu")
declare -- BASH_VERSION="5.0.17(1)-release"
declare -x CODEALLY_CURRENT_PROJECT_ID="6323fef1ba4b4061175547cd"
declare -x CODEALLY_ENVIRONMENT="production"
declare -x CODEALLY_IDLE_TIMEOUT="600000"
declare -x CODEALLY_INIT_COMMAND="exit"
declare -x CODEALLY_ORIGINAL_PROJECT_ID="6323fef1ba4b4061175547cd"
declare -x CODEROAD_CONTENT_SECURITY_POLICY_EXEMPTIONS="sha256-O6s4HZqHNjMzg0UZUFHy0YEAlG05lWCXf0lBN+GmShk="
declare -x CODEROAD_DISABLE_RUN_ON_SAVE="true"
declare -x CODEROAD_SESSION_STORAGE_PATH="../../codeally/.local"
declare -x CODEROAD_TUTORIAL_URL="https://raw.githubusercontent.com/freeCodeCamp/learn-bash-scripting-by-building-five-programs/main/tutorial.json"
declare -x CODEROAD_WEBHOOK_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVG9rZW4iOiJ0NEhGanFpd3pMcjZYMjk3Q1JPMEJGN3lERzU4OU9Bc2NKd1luQkM5bDlCMW4ybmhKSHo4cnk0Z0hETGUwMkFGIiwiaWF0IjoxNjYzMzQ4OTY4fQ.0R8CLlaya_DBYq0XQCl6jltuJng0nQFZk9kkj1R5zxA"
declare -x COLORTERM="truecolor"
declare -- COLUMNS="150"
declare -- COMP_WORDBREAKS
declare -x DEBIAN_FRONTEND="noninteractive"
declare -a DIRSTACK=()
declare -- EPOCHREALTIME
declare -- EPOCHSECONDS
declare -ir EUID="1000"
declare -a FUNCNAME
declare -x GIT_ASKPASS="/usr/local/lib/vscode/extensions/git/dist/askpass.sh"
declare -a GROUPS=()
declare -i HISTCMD
declare -- HISTFILE="/home/codeally/.bash_history"
declare -- HISTFILESIZE="2000"
declare -- HISTSIZE="1000"
declare -x HOME="/home/codeally"
declare -x HOSTNAME="a9eaefc81b19"
declare -- HOSTTYPE="x86_64"
declare -- IFS=" 
"
declare -x ITEM_URL="https://open-vsx.org/vscode/item"
declare -x LANG="en_US.UTF-8"
declare -i LINENO
declare -- LINES="13"
declare -x LS_COLORS="rs=0:di=01;34:ln=01;36:mh=00:pi=40;33:so=01;35:do=01;35:bd=40;33;01:cd=40;33;01:or=40;31;01:mi=00:su=37;41:sg=30;43:ca=30;41:tw=30;42:ow=34;42:st=37;44:ex=01;32:*.tar=01;31:*.tgz=01;31:*.arc=01;31:*.arj=01;31:*.taz=01;31:*.lha=01;31:*.lz4=01;31:*.lzh=01;31:*.lzma=01;31:*.tlz=01;31:*.txz=01;31:*.tzo=01;31:*.t7z=01;31:*.zip=01;31:*.z=01;31:*.dz=01;31:*.gz=01;31:*.lrz=01;31:*.lz=01;31:*.lzo=01;31:*.xz=01;31:*.zst=01;31:*.tzst=01;31:*.bz2=01;31:*.bz=01;31:*.tbz=01;31:*.tbz2=01;31:*.tz=01;31:*.deb=01;31:*.rpm=01;31:*.jar=01;31:*.war=01;31:*.ear=01;31:*.sar=01;31:*.rar=01;31:*.alz=01;31:*.ace=01;31:*.zoo=01;31:*.cpio=01;31:*.7z=01;31:*.rz=01;31:*.cab=01;31:*.wim=01;31:*.swm=01;31:*.dwm=01;31:*.esd=01;31:*.jpg=01;35:*.jpeg=01;35:*.mjpg=01;35:*.mjpeg=01;35:*.gif=01;35:*.bmp=01;35:*.pbm=01;35:*.pgm=01;35:*.ppm=01;35:*.tga=01;35:*.xbm=01;35:*.xpm=01;35:*.tif=01;35:*.tiff=01;35:*.png=01;35:*.svg=01;35:*.svgz=01;35:*.mng=01;35:*.pcx=01;35:*.mov=01;35:*.mpg=01;35:*.mpeg=01;35:*.m2v=01;35:*.mkv=01;35:*.webm=01;35:*.ogm=01;35:*.mp4=01;35:*.m4v=01;35:*.mp4v=01;35:*.vob=01;35:*.qt=01;35:*.nuv=01;35:*.wmv=01;35:*.asf=01;35:*.rm=01;35:*.rmvb=01;35:*.flc=01;35:*.avi=01;35:*.fli=01;35:*.flv=01;35:*.gl=01;35:*.dl=01;35:*.xcf=01;35:*.xwd=01;35:*.yuv=01;35:*.cgm=01;35:*.emf=01;35:*.ogv=01;35:*.ogx=01;35:*.aac=00;36:*.au=00;36:*.flac=00;36:*.m4a=00;36:*.mid=00;36:*.midi=00;36:*.mka=00;36:*.mp3=00;36:*.mpc=00;36:*.ogg=00;36:*.ra=00;36:*.wav=00;36:*.oga=00;36:*.opus=00;36:*.spx=00;36:*.xspf=00;36:"
declare -- MACHTYPE="x86_64-pc-linux-gnu"
declare -i MAILCHECK="60"
declare -x NODE_OPTIONS="--max-old-space-size=2048 "
declare -x NVM_CD_FLAGS=""
declare -x NVM_DIR="/home/codeally/.nvm"
declare -x NVM_RC_VERSION=""
declare -x OLDPWD
declare -- OPTERR="1"
declare -i OPTIND="1"
declare -- OSTYPE="linux-gnu"
declare -x PATH="/home/codeally/.rbenv/bin:/home/codeally/.rbenv/shims:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
declare -a PIPESTATUS=([0]="0")
declare -ir PPID="64"
declare -- PROMPT_COMMAND="echo \$PWD >> ~/project/.freeCodeCamp/test/.cwd; history -a"
declare -- PS1="\\[\\e]0;\\u@\\h: \\w\\a\\]\${debian_chroot:+(\$debian_chroot)}\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\\$ "
declare -- PS2="> "
declare -- PS4="+ "
declare -x PWD="/home/codeally/project"
declare -i RANDOM
declare -x RBENV_ROOT="/home/codeally/.rbenv"
declare -- SECONDS
declare -x SERVICE_URL="https://open-vsx.org/vscode/gallery"
declare -x SHELL="/bin/bash"
declare -r SHELLOPTS="braceexpand:emacs:hashall:histexpand:history:interactive-comments:monitor"
declare -x SHLVL="1"
declare -x TERM="xterm-256color"
declare -x TERM_PROGRAM="vscode"
declare -x TERM_PROGRAM_VERSION="1.57.1"
declare -ir UID="1000"
declare -x VSCODE_GIT_ASKPASS_MAIN="/usr/local/lib/vscode/extensions/git/dist/askpass-main.js"
declare -x VSCODE_GIT_ASKPASS_NODE="/usr/local/lib/node"
declare -x VSCODE_GIT_IPC_HANDLE="/tmp/vscode-git-dab47b0e3c.sock"
declare -- _="-p"









The RANDOM variable will generate a random number between 0 and 32767. You can use the modulus operator to make it in the range you want. In your script, change the NUMBER variable to $RANDOM%75.



Bash sees everything as a string so it just printed the %75 part literally. In the terminal, create an I variable equal to 0 (zero), so you can play with it and figure out how to do some calculations.




The double parenthesis performed the calculation, changing the value of I from 0 to 1. Enter help let in the terminal to see the operators you can use with the double parenthesis.



codeally@a9eaefc81b19:~/project$ help let
let: let arg [arg ...]
    Evaluate arithmetic expressions.
    
    Evaluate each ARG as an arithmetic expression.  Evaluation is done in
    fixed-width integers with no check for overflow, though division by 0
    is trapped and flagged as an error.  The following list of operators is
    grouped into levels of equal-precedence operators.  The levels are listed
    in order of decreasing precedence.
    
        id++, id--      variable post-increment, post-decrement
        ++id, --id      variable pre-increment, pre-decrement
        -, +            unary minus, plus
        !, ~            logical and bitwise negation
        **              exponentiation
        *, /, %         multiplication, division, remainder
        +, -            addition, subtraction
        <<, >>          left and right bitwise shifts
        <=, >=, <, >    comparison
        ==, !=          equality, inequality
        &               bitwise AND
        ^               bitwise XOR
        |               bitwise OR
        &&              logical AND
        ||              logical OR
        expr ? expr : expr
                        conditional operator
        =, *=, /=, %=,
        +=, -=, <<=, >>=,
        &=, ^=, |=      assignment
    
    Shell variables are allowed as operands.  The name of the variable
    is replaced by its value (coerced to a fixed-width integer) within
    an expression.  The variable need not have its integer attribute
    turned on to be used in an expression.
    
    Operators are evaluated in order of precedence.  Sub-expressions in
    parentheses are evaluated first and may override the precedence
    rules above.
    
    Exit Status:
    If the last ARG evaluates to 0, let returns 1; let returns 0 otherwise.


You used several of these now, including in the for loop from the countdown timer. Enter (( I += 10 )) in the terminal to increment I by 10. Note that you don't need to prepend variables with $ inside these parenthesis.



It should have printed 11 for the value of I. Using the double parenthesis like you have been is good for changing variable values or making comparisons. It makes the calculation in place and provides no output. If you want to make a calculation and do something with the result, add a $ in front like this: $(( ... )). Type $(( I + 4 )) in the terminal to see what happens.



It should say, bash: 15: command not found. It replaced the command with the result of the calculation. Effectively, trying to run 15 as a command. Enter the same command, but put echo in front of it. The command was $(( I + 4 ))


It should still have printed 11 for I. See the hints if it didn't. These double parenthesis with a $ are how you can assign a variable to some calculation. In the terminal, create a J variable, and use the $(( ... )) syntax to set its value to I - 6.



So, as a reminder, (( ... )) will perform a calculation or operation and output nothing. $(( ... )) will replace the calculation with the result of it. You made a few variables in this shell, view them with declare -p.



declare can be used to create variables, but you are just going to use it to view them for now. If you scroll up a little, you should find your I and J variables in there. View J with declare -p J.

I saw RANDOM in that list, too. View it with declare -p <variable> like you did for J

Okay, I think I finally know how to get the random number for the Bingo Number Generator. Use echo and RANDOM % 75 to print a random number in the terminal.

One tiny problem, that calculation will give a number between 0 and 74. Enter the same command in the terminal, but add 1 to the calculation to get a random number between 1 and 75.



if statements can have an "else if" area like this:

if (( CONDITION ))
then
  STATEMENTS
elif [[ CONDITION ]]
then
  STATEMENTS
fi
Using the double square brackets this time, add an elif condition that checks if the number variable is less than or equal to 30. If it is, use your two variables again to print The next number is, I:<number>



#!/bin/bash
# Bingo Number Generator
echo -e "\n~~ Bingo Number Generator ~~\n"

NUMBER=$(( RANDOM % 75 + 1 ))

TEXT="The next number is, "

if (( NUMBER <= 15 ))
then echo $TEXT B:$NUMBER
elif [[ $NUMBER -le 30 ]]
then echo $TEXT I:$NUMBER
elif (( NUMBER < 46))
then echo $TEXT N:$NUMBER
elif [[ $NUMBER -lt 61 ]]
then echo $TEXT G:$NUMBER
else echo $TEXT O:$NUMBER
fi






This program will have an array of responses. One will be printed randomly after a user inputs a question. Practice first 😄 In the terminal, create an array like this: ARR=("a" "b" "c")

Each variable in the array is like any other variable, just combined into a single variable. In the terminal, print the second item in the array with echo ${ARR[1]}. Note that the first item would be index zero.


If you recall, you were able to print all the arguments to your countdown.sh script with echo $*. echo $@ would have worked as well. Similarly, you can use the * or @ to print your whole array. In the terminal, use echo to print all the items in your array.
$ echo ${ARR[@]}



You will randomly print one of the values. In your script, create a variable named N. Set it equal to a random number between 0 and 5, the first and last index of the array.
N=$(( RANDOM % 6 ))


codeally@178939d76f62:~/project$ help function
function: function name { COMMANDS ; } or name () { COMMANDS ; }
    Define shell function.
    
    Create a shell function named NAME.  When invoked as a simple command,
    NAME runs COMMANDs in the calling shell's context.  When NAME is invoked,
    the arguments are passed to the function as $1...$n, and the function's
    name is in $FUNCNAME.
    
    Exit Status:
    Returns success unless NAME is readonly.



It looks like you can create a function like this:

FUNCTION_NAME() {
  STATEMENTS
}
Add an empty function named GET_FORTUNE to your script. Make sure the response you are printing is the last thing in the script.


Call your function by putting the name of it below where you create it. No $ needed. Make sure the response you are printing is at the bottom of the file.
GET_FORTUNE(){
  echo Ask a yes or no question:
}
GET_FORTUNE


until: until COMMANDS; do COMMANDS; done
    Execute commands as long as a test does not succeed.
    
    Expand and execute COMMANDS as long as the final command in the
    `until' COMMANDS has an exit status which is not zero.
    
    Exit Status:
    Returns the status of the last command executed.


The until loop is very similar to the while loop you used. It will execute the loop until a condition is met. Here's an example:

until [[ CONDITION ]]
do
  STATEMENTS
done
Add an until loop below your function. Use the double brackets to check if QUESTION is equal to test?. Move the GET_FORTUNE function call to the statements area of the loop. It should run the function until you input test? as the question.

until [[ $QUESTION == test? ]]
do
GET_FORTUNE
done



False. An important operator in that menu is =~. It allows for pattern matching. Using the same syntax but with this operator, check if hello contains the pattern el.
$ [[ hello =~ el ]]; echo $?


Your patterns have been checking for literal matches, el and lo wor. You can use regular expression characters as well, but you can't put the pattern in quotes when you do. Using the same syntax, check if hello world starts with an h by using ^h as the pattern.
$ [[ "hello world" =~ ^h ]]; echo $?

Do it again, but use ^h.+d$ as the pattern to see if the string starts with an h, has at least one character after it, and ends with a d
$ [[ "hello world" =~ ^h.+d$ ]]; echo $?

Using the same syntax, check if your variable ends with ? by using the pattern \?$.
$ [[ $VAR =~ \?$ ]]; echo $?



Now, your function will print one thing if you pass it any argument, and something else if not. In the until loop, add again as an argument to where you call the function.


#!/bin/bash

# Program to tell a persons fortune

echo -e "\n~~ Fortune Teller ~~\n"

RESPONSES=("Yes" "No" "Maybe" "Outlook good" "Don't count on it" "Ask again later")
N=$(( RANDOM % 6 ))

GET_FORTUNE() {
  
  if [[ ! $1 ]]
  then
    echo Ask a yes or no question:
  else
    echo Try again. Make sure it ends with a question mark:
  fi

  read QUESTION
}

GET_FORTUNE

until [[ $QUESTION =~ \?$ ]]
do
  GET_FORTUNE again
done

echo -e "\n${RESPONSES[$N]}"



codeally@70dfbcd57415:~/project$ help type
type: type [-afptP] name [name ...]
    Display information about command type.
    
    For each NAME, indicate how it would be interpreted if used as a
    command name.
    
    Options:
      -a        display all locations containing an executable named NAME;
                includes aliases, builtins, and functions, if and only if
                the `-p' option is not also used
      -f        suppress shell function lookup
      -P        force a PATH search for each NAME, even if it is an alias,
                builtin, or function, and returns the name of the disk file
                that would be executed
      -p        returns either the name of the disk file that would be executed,
                or nothing if `type -t NAME' would not return `file'
      -t        output a single word which is one of `alias', `keyword',
                `function', `builtin', `file' or `', if NAME is an alias,
                shell reserved word, shell function, shell builtin, disk file,
                or not found, respectively
    
    Arguments:
      NAME      Command name to be interpreted.
    
    Exit Status:
    Returns success if all of the NAMEs are found; fails if any are not found.