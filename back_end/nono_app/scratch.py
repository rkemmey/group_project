"""
TO DO:
- clean up puzzle logic
- create many puzzles

- user logins to save puzzle progress
- store generated puzzles in a PostgreSQL database instead of generating them randomly every time

- puzzles are actual pictures
_________________________
api call to sudoku puzzle, displayed, able to check solution
read in icon api, convert image url to array and save in db-- models, views, urls, serializers
get an image to pixels, build nonogram from that. 
    // convert pixels to nonogram (solution)
    // make blank grid with hints
    // store solution (new api endpoint)
navbar: nonograms, sudokus, profile - react router dom
send pixels to front end puzzle/1 endpoint 
    // verify solution box.
    // find a way that if solution is all 0s or all 1s, do not add to database
read in 100 to have a database get nonogram working
sud / nono pages after building navbar
db of sudoku puzzles-- models/views
edit sudoku puzzle after clicked submit
_____________________________
-- threshold in resources/utils, changed sign, see how it affects puzzle
- profile: able to see completed and saved puzzles - link to profile after login
- puzzle pages: be able to filter by difficulty
- box on nono to click for X or fill in
"""
