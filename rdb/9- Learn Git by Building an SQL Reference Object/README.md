Git is a version control system to keep track of your code. This folder will be your git repository. Turn it into one by typing git init in the terminal from this folder.


The git init command created that .git folder for you. It's what keeps track of all the things in your repository. Use git status to see the status of where you are. This command will be your best friend.


A git repository has branches to help keep track of things you are doing with your code. It's common to have a main branch which might be for your production code, and other branches for adding new features or fixing bugs. You can create and go to a new branch with git checkout -b new_branch. The -b stands for "branch". Use that command to switch to a new branch named main.


The file you created has not been added to git yet so it is showing that it is untracked. There's two steps to make git keep track of it for you. First you need to add it to the staging area like this: git add file_name. Add your README.md file to the staging area.


Now you have two files in staging. To commit them, you can use git commit -m "Initial commit". The -m stands for "message". Often times, the first commit of a repo will have the message "Initial commit". Commit your two files with the message Initial commit.


Your "working tree" is clean, the files were committed and there's no other new changes that git recognizes. You can see your commit history with git log. Check your commit history.



Git recognizes new unstaged changes to your file. Notice that it says that file is modified instead of untracked because the file has been previously committed. You can see the changes you made with git diff. Take a look at the new changes.




Your new changes are staged and ready to be committed. Commit them with the message feat: add create database reference. As a reminder, here what the command to commit looks like: git commit -m "message".

1. Type git commit -m "feat: add create database reference" into the terminal and press enter

2. View your git log to see if your message is correct

3. If the message is wrong, enter git reset HEAD~1, then git add ., and then you can try to make the commit again


Commit messages often start with fix: or feat:, among others, to help people understand what your commit was for. Check your git log again to see the new commit added.


Now there's three commits 😄 You have been making changes to your main branch. You actually want to try and avoid that. Type git branch to see the current branches in your repo.


You only have the main branch still. You can create a branch with git branch branch_name. Branches often start with fix/ or feat/, among others, like commit messages, but they use a forward slash and can't contain spaces. Create a new branch named feat/add-create-table-reference.


You can see your new branch, but you are still on the main branch, as denoted with the *. To switch to a branch use: git checkout branch_name. Switch to your new branch.


Like I said, you often don't want to make commits directly to the main branch of a repo. This branch will be for some new changes. What you will do is make the changes and commits here, then merge them into the main branch when they are ready. Add a reference for creating an SQL table to your json file along side your database property. Make it look like this:

"table": {
  "create": "CREATE TABLE table_name;"
}



Now you have four commits, they are getting a little hard to see. Check the log again, but this time use the --oneline flag to condense the output so it's more readable.


You created the feat/add-create-table-reference branch, made a commit, and now it's ready to be added to the main branch. You can use git merge branch_name to bring changes from a branch into the branch you are currently on. Merge the changes from your feature branch into the main branch.


The feat: add create table reference commit you made on your feature branch was added to this branch with the merge. You can delete a branch with git branch -d branch_name. -d stands for "delete". Since your changes were added, you can safely delete your feature branch. Do that now.


You're just left with the main branch... Want to try it again? Last time you created a branch and then switched to it. You can do both at the same time with git checkout -b branch_name. Create and switch to a new branch named feat/add-drop-table-reference.



You're getting the hang of it 😄 The process is to create a branch, make the changes you want, commit them, and then merge the changes into branch you started on. Pretty simple, lets keep going. Create and checkout a new branch named feat/add-column-references


The commit was added. I see an error in the syntax of one of the commands. You want to fix it, but this branch is not for fixing it. Switch back to your main branch so you can create a new branch to fix it.


Remember that, when you create a branch, it will be a clone of whatever branch you are on when you create it. That's why you switched to main first. Create and switch to a branch named fix/create-table-syntax.



You created this branch and made a commit. Since then, a commit for a bug fix was added to main. This is common with many people working on a codebase simultaneously. You need to update this branch so it has the same commits from main, but you can't just merge that branch into this one. You need that bug fix commit to be in the same order here as it is on main, right after the "drop table" commit. You need to rebase this branch against main to do that. Enter git rebase main to rebase this branch.

The logs show that the bug fix commit from main was added, and then the commit from this branch was added on top of it. Now, when this branch is ready to be merged into main, it will have the same commit history. You should try to keep your branches up to date like this by rebasing them often. In your JSON file, add a drop key to the column object with a reference for dropping a column. The syntax is in the hints, give it a try first.

Another commit was added to main, you should update this branch again. To be more specific, a rebase will "rewind" this branch to where it last matched main, then, add the commits from main that aren't here. After that, it adds the commits you made to this branch on top. rebase this branch against main so it's up to date. You should see a conflict...


The confict arose because the first commit you added to this branch changed the same lines as the commit from main. So it tried to add the commit, but couldn't because something was already there. There are sections, separated by characters (<, >, and =), that represent the commit you are on (HEAD) and the commit that is trying to be added (feat: add column reference). Fix the conflict by removing those <, >, and = characters. Then making the JSON object valid again.


It says that you are still in the middle of rebasing and there's one file that needs to be merged yet. Add the file to staging like you would any other commit.


You fixed the conflicts that arose from trying to add this commit and added them to staging. It says all conflicts fixed: run "git rebase --continue". Run the suggested command to continue the rebase.


The last commit was added after you continued the rebase without conflict. The rebase is now finished. View your log with the oneline flag.


You can see the "insert row" commit from main was added to this branch before the two commits you made here. Now this branch is up to date and you can continue working on it. Add a rename key to the column object. The value should look like this: "ALTER TABLE table_name RENAME COLUMN column_name TO new_name;"



There's been a mistake. This branch was for the insert command, not the update command. You can put your changes aside with git stash. Stash your changes so you can add them to a different branch.
```bash
Saved working directory and index state WIP on add-insert-row-reference: 88989a2 feat: add insert row reference
```


Your working tree is clean and there's no changes git recognizes. The changes you made are stashed. View the things you have stashed with git stash list.

```bash
stash@{0}: WIP on add-insert-row-reference: 88989a2 feat: add insert row reference
```


You can see one item there. Bring the changes back with git stash pop.


The changes from the stash reappeared in the file and git showed the status for you. You are right where you left of before stashing the changes. Popping a stash like that will remove the most recent stash and apply it to your working tree. View the list of your stashes again.



The changes are stashed again. View a condensed version of the changes in the latest stash with git stash show.



You can see what file was changed and how many lines were added and removed from the file. View the full changes of the latest stash with git stash show -p. -p stands for "patch".

Now you can see the actual changes that are stored in the stash. Before, you used the pop command to removed the latest stash and add it to your working tree. You can add the latest stash while keeping it in the list with git stash apply. Apply your stash with this method.

The code from the stash was added to your working tree, and the stash is still there in case you want to add it somewhere else. Stash the changes again.


Now there's two things stashed. You can use the name at the front of each stash (stash@{#}) with many of the stash commands to select one other than the latest one. The most recent stash is the one at the top, stash@{0}. View the condensed changes of the oldest stash with the git stash show command by putting the name of the stash after it.

```bash
$ git stash show -p stash@{1}
```


There's two identical items in your stash. Drop one of them with git stash drop or git stash drop <stash_name>.



It's still there. Pop the stash so the code gets added to this new branch.

1. Use the "git stash pop" command in your repo

2. Type git stash pop in the terminal and press enter




# travle back

I'm going to show you a few ways to remove or undo a commit. The first is to simply "travel back in time". You can use the git reset command to travel to any point in your commit history. Your current HEAD is a reference to the last commit you just made. Use git reset HEAD~1 to go back one before HEAD.

This is a "soft" reset and will put the changes from the commit you undid in your working tree. You can see that it says there's unstaged changes after the reset to your file. View your log with the oneline flag.


And the changes from the reset are back in the working tree. So when you reset to one commit before HEAD, it removed the most recent commit, and put all the changes in the working tree. If you used the --hard flag with the reset, the changes would have not been added to the working tree. Add the changes back to staging so you can commit them again.


And the changes from the reset are back in the working tree. So when you reset to one commit before HEAD, it removed the most recent commit, and put all the changes in the working tree. If you used the --hard flag with the reset, the changes would have not been added to the working tree. Add the changes back to staging so you can commit them again.


Reverting is a good way to undo a commit because you don't lose the commit from the history. You can revert the most recent commit (HEAD) with git revert HEAD. Do that now.


Git put you into Nano and is asking you enter a commit message for the revert, but they added a default one for you. Don't change anything in Nano, just exit the file to use the default message. You can exit the file by pressing ctrl+x.


Using revert to undo that commit added another commit that is the exact opposite of it. Enter git show into the terminal to see the last commit added (now HEAD) and its details.


Type git show HEAD~1 to take a look at the details of the original commit that you reverted..


If you look at the bottom of those two messages, it shows the diff. The diff of the revert commit is the exact opposite of the one before it. Effectively, undoing the changes. You've used rebase to update this branch, but you can enter an "interactive" mode to manipulate commits. Type git rebase --interactive HEAD~2 into the terminal to enter this mode. The HEAD~2 means you will have a chance to change the last two commits.


Both, the commit to add the unique command and the one to revert it, were dropped. Enter another --interactive rebase that goes back to the --root instead of HEAD~2. I am going to show you how to change a commit message. --root means that the rebase will go back to your very first commit.


You can see that the latest commit is at the bottom here. Be careful not to change the wrong commits. One of the options is r, reword = use commit, but edit the commit message. Replace pick with an r next to the commit with the message feat: add column reference to reword the message, it's the very first commit you added to this branch. When you are done, save the file and exit Nano. Git will put you in another Nano instance to reword the commit message. Don't change anything in it yet.


Git is waiting for you to edit the commit message. Add an s at the end of the commit message so it is feat: add column references. When you are done, save the file and exit Nano.



The message was reworded, but there's a problem. Look at the commit hash for your Initial commit from the last two times you viewed the log, it's that string left of the log. They aren't the same anymore since you rebased back to the root. Same goes for the rest of the commits. When you rebase interactively it changes all those hashes, so git sees them as different commits. If you were to try and merge this into main, it wouldn't work because they don't share the same history anymore. For this reason, you don't want to do an interactive rebase where you go back passed commits unique to the branch you are on. Fortunately, you can fix this. Enter git rebase main to realign the history of the two branches.


Now the hashes are the same as they were before you rebased back to --root, which is what they are on main. Enter another interactive rebase. Go back to the first commit you added to this branch, it's HEAD~5.



Squashing commits means that you will take a bunch of commits and turn them into one. This is helpful to keep your commit history clean and something you want try to do. Replace pick with an s next to all your commits except the one with the message feat: add column references. When you are done, save and exit the file. You will find yourself in another instance of Nano. Don't change anything in it yet.


Now all the "column" commits you made to this branch have been squashed into just the one commit at the top. View the log again, but use -1 instead of --oneline this time to view only the last commit.


You can see that your one commit has all the messages that were in Nano, which are all of the commits you made to this branch squashed into one commit. I think you are finally done with this branch. Go to your main branch so it can get merged.

You viewed the most recent log with a -1 flag. You can view the last x number of commits with any number instead of 1. View the last five commits with the oneline flag.




$ git log --oneline
3392418 (HEAD -> main) feat: add .gitignore and sample.env
86daf79 fix: add missing rename references
193e3a2 feat: add column references
87db07c feat: add delete row reference
a72acea feat: add update row reference
88989a2 feat: add insert row reference
d3609d2 fix: create table syntax
0ae0bd4 feat: add drop table reference
18f0344 feat: add create table reference
684afe7 feat: add drop database reference
a5de944 feat: add create database reference
a029be1 Initial commit