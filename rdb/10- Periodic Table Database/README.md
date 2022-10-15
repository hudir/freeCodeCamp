
The rest of the commit messages should start with fix:, feat:, refactor:, chore:, or test:

 type_id |   type    
---------+-----------
       1 | nonmetal
       2 | metal
       3 | metalloid
(3 rows)

 atomic_number | symbol |   name    
---------------+--------+-----------
             1 | H      | Hydrogen
             4 | Be     | Beryllium
             5 | B      | Boron
             6 | C      | Carbon
             7 | N      | Nitrogen
             8 | O      | Oxygen
             2 | He     | Helium
          1000 | MT     | moTanium
             3 | Li     | Lithium
             9 | F      | Fluorine
            10 | Ne     | Neon
(11 rows)
 atomic_number |   type    | atomic_mass | melting_point_celsius | boiling_point_celsius | type_id 
---------------+-----------+-------------+-----------------------+-----------------------+---------
             1 | nonmetal  |       1.008 |                -259.1 |                -252.9 |       1
             2 | nonmetal  |      4.0026 |                -272.2 |                  -269 |       1
             6 | nonmetal  |      12.011 |                  3550 |                  4027 |       1
             7 | nonmetal  |      14.007 |                -210.1 |                -195.8 |       1
             8 | nonmetal  |      15.999 |                  -218 |                  -183 |       1
             3 | metal     |        6.94 |                180.54 |                  1342 |       2
             4 | metal     |      9.0122 |                  1287 |                  2470 |       2
             5 | metalloid |       10.81 |                  2075 |                  4000 |       3
          1000 | metalloid |           1 |                    10 |                   100 |       3
(9 rows)