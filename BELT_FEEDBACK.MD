- I generated my own Django-secret key, as I don’t think the given one was working
- perhaps also include "npm install" directions since the dependencies need to also be loaded from front-end
- don’t have access to anything on backend, since I’m not a superuser
- Utilized my own NOUN API key for NONO_APP to throw into .env file.
- Can’t fetch Nonogram puzzles after running “python [manage.py](http://manage.py) create_puzzles”
    - Yielded positive response when testing in the NOUN API for my own keys
    - But seem to be getting a permission error on the backend, at least I think that’s what is wrong
- Clicking on Home takes me back to login screen when I’m already logged in. That screen should be disabled unless you’re log out, and perhaps should be the only accessible page if your’e logged out aside from the registration and login pages.
- Check Solution vs Show Solution distinction wasn’t clear to me at first until I tested it out for sudoku.
    - Maybe “Test Your Answer”, “Check Progress”
    - For Sudoku, Is there a way to highlight which numbers were correct and which weren’t as opposed to just saying the whole thing is wrong if it’s not completely correct? Like, maybe, correct numbers are in green and incorrect numbers are in red.
- Needs a Clear Button to clear all my numbered inputs or maybe up through my last saved progress. I know I can refresh and get back into it, but that’s not that intuitive.
- Why did you handle your urls for the user_puzzles in the way that you did? Is there a difference substantially then what we were already taught aside from semantics?
- Maybe on NotFound/Error Pages, you can have a timer that re-directs to the homepage, like I had if you accidentally find yourself on them.
- No message feedback, like logged in successfully or failure, registered successfully or failed. Maybe a message, then a quick message on a timer before getting redirected or letting the user know that they’re not getting logged in.
    - Like if I try to login and I have the correct email address, but my password is wrong, there’s no feedback letting me know that the password is wrong. I just won’t log in.
Aside from a general styling revamp perhaps with a different library, alert messages could look better utilizing something like react-toast.
Maybe this upgraded project is something as simple as making it shinier, and adding at least two new games.
Add an upcoming page perhaps with details of another game(s) that we could think to add after the group project done. There wouldn't need to be any logic. It could just be kind of like the about pages we had for the games.
Since I didn't get to test Nonograms since I can't fetch the puzzles, I don't have any feedback at this time about them.
