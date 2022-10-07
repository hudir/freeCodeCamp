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