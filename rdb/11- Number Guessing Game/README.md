If that username has been used before, it should print Welcome back, <username>! You have played <games_played> games, and your best game took <best_game> guesses., with <username> being a users name from the database, <games_played> being the total number of games that user has played, and <best_game> being the fewest number of guesses it took that user to win the game

name 
times
best_game


1 create database
2 set column's detail
3 write script


    Column    |       Type        | Collation | Nullable |                Default                 
--------------+-------------------+-----------+----------+----------------------------------------
 user_id      | integer           |           | not null | nextval('users_user_id_seq'::regclass)
 name         | character varying |           |          | 
 games_played | integer           |           |          | 0
 best_game    | integer           |           |          | 
Indexes:
    "users_pkey" PRIMARY KEY, btree (user_id)
    "users_name_key" UNIQUE CONSTRAINT, btree (name)
