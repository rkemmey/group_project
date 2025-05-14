After migrating the database or applying migrations,
from postgreSQL shell, run:

COPY words(word)
FROM '/absolute/path/to/wordle-bank.txt'
WITH (FORMAT text);

Example below: 
COPY words(word)
FROM '/Users/jasonbelt/Zulu/puzzle_craft/group_project/back_end/minewordle_app/words/wordle-bank.txt'
WITH (FORMAT text);
