     Column     |         Type          | Collation | Nullable |                Default                 
----------------+-----------------------+-----------+----------+----------------------------------------
 game_id        | integer               |           | not null | nextval('games_game_id_seq'::regclass)
 round          | character varying(50) |           | not null | 
 year           | integer               |           | not null | 
 winner_goals   | integer               |           | not null | 
 opponent_goals | integer               |           | not null | 
 winner_id      | integer               |           | not null | 
 opponent_id    | integer               |           | not null | 
Indexes:
    "games_pkey" PRIMARY KEY, btree (game_id)
Foreign-key constraints:
    "games_opponent_id_fkey" FOREIGN KEY (opponent_id) REFERENCES teams(team_id)
    "games_winner_id_fkey" FOREIGN KEY (winner_id) REFERENCES teams(team_id)



                                     Table "public.teams"
 Column  |         Type          | Collation | Nullable |                Default                 
---------+-----------------------+-----------+----------+----------------------------------------
 team_id | integer               |           | not null | nextval('teams_team_id_seq'::regclass)
 name    | character varying(50) |           | not null | 
Indexes:
    "teams_pkey" PRIMARY KEY, btree (team_id)
    "teams_name_key" UNIQUE CONSTRAINT, btree (name)
Referenced by:
    TABLE "games" CONSTRAINT "games_opponent_id_fkey" FOREIGN KEY (opponent_id) REFERENCES teams(team_id)
    TABLE "games" CONSTRAINT "games_winner_id_fkey" FOREIGN KEY (winner_id) REFERENCES teams(team_id)

game_id |     round     | year | winner_goals | opponent_goals | winner_id | opponent_id 
---------+---------------+------+--------------+----------------+-----------+-------------
       1 | Final         | 2018 |            4 |              2 |        89 |          90
       2 | Third Place   | 2018 |            2 |              0 |        91 |          92
       3 | Semi-Final    | 2018 |            2 |              1 |        90 |          92
       4 | Semi-Final    | 2018 |            1 |              0 |        89 |          91
       5 | Quarter-Final | 2018 |            3 |              2 |        90 |          98
       6 | Quarter-Final | 2018 |            2 |              0 |        92 |         100