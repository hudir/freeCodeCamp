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