This is the start of our group project!

Note: dont forget to create a .env with your django secret key in order to get your backend running.
I called my key: DJANGO_SECRET_KEY = 'key' in my .env file

Note: Make an venv environment for you project (add it to .gitignore so it doesnt get pushed up), activate environment locally.

The project breakdown:
### Backend-- separate app per puzzle, one app that tracks puzzle progress (user_puzzles), one app for user auth
- utilized base management commands to store all puzzle data in the postgresql database (make the api call once) files are located in the nono/sud apps under the management -> commands folder. I also have a delete in there because at one point I wanted to delete my tables (but haven't used that file since).

### Frontend-- uses react/bootstrap + my App.css file
- utilizes react-router-dom. there is a router page to handle urls (and react-router-dom defined in main.jsx)
- utilities files is for handling token auth between page refreshes and primarily for functions that perform CRUD operations on the django models (as in access the data on the backend to read, update, delete)
- pages folder holds different pages
- components holds components, including navbar and the tools for setting up the puzzles
- puzzle flow is: NonoPage (in pages) -> NonoPuzzleCard (components) -> links to a new page by one puzzle ID -> goes to this url address: "/nonogram/:id" (defined in the router) which links to the NonoGame (component) -> NonoGame component uses the NonoGrid (component) to generate the puzzle grid on the front end
- Suduko puzzle follows the exact same flow as described above