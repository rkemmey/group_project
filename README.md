# Puzzle Craft

**PuzzleCraft** is a simple app built to support solo puzzle solving with user profiles and interactive dashboards.

PuzzleCraft bridges the gap between casual relaxation and mental challenge with an expansive library of logic puzzles across 8 distinct games, each offering multiple difficulty levels and progress tracking. Whether you're killing five minutes or spending your evening sharpening your logical reasoning, PuzzleCraft makes it easy to experience the joy of mastering puzzles.

Once you create a profile and login, utilize dashboard for individual game instructions

---

## ✨ Features

- 🔑 Simple login and signup process for quick access to your account
- 👤 Personalized Profile Page showing saved puzzles, with links to rules, strategies, and display name updates
- 🧩 Intuitive Puzzle Dashboard to easily browse and launch any available puzzle game
- 🎮 Includes Minesweeper, Wordle, Kakuro, Tents, 2048, 15 Tiles, Sudoku, and Nomograms
---

## 🛠 Tech Stack

### Backend

Built with **Django + Django REST Framework**
and utilizes PostgreSQL

#### Dependencies (`requirements.txt`)

```
asgiref==3.8.1
certifi==2025.1.31
charset-normalizer==3.4.1
Django==5.2
django-cors-headers==4.7.0
django-filter==25.1
djangorestframework==3.16.0
dotenv==0.9.9
idna==3.10
numpy==2.2.4
oauthlib==3.2.2
pillow==11.1.0
psycopg==3.2.6
psycopg-binary==3.2.6
python-dotenv==1.1.0
requests==2.32.3
requests-oauthlib==2.0.0
sqlparse==0.5.3
typing_extensions==4.13.0
urllib3==2.3.0
```

### Frontend

Built with **React**

#### Dependencies (`package.json`)

```
axios@^1.8.4 \
bootstrap@^5.3.5 \
bootstrap-icons@^1.13.1 \
lodash.clonedeep@^4.5.0 \
react@^19.0.0 \
react-bootstrap@^2.10.9 \
react-confetti@^6.4.0 \
react-dom@^19.0.0 \
react-easy-swipe@^0.0.23 \
react-router-dom@^7.5.0
```

#### Installation

```bash
git https://github.com/rkemmey/group_project/
cd group_project
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cd back_end
python manage.py makemigrations
python manage.py migrate
createdb proj_db
python manage.py fetch_puzzles
python manage.py create_puzzles
psql proj_db # from postgreSQL shell, run the below commands:
COPY words(word)
FROM '/absolute/path/to/wordle-bank.txt'
WITH (FORMAT text);
\q # exit psql and then move to frontend
cd front_end
npm install
```
---

## 🔗 Third-Party APIs

- **NounProject API** – https://thenounproject.com/api/ 
- **Dosuku API** – https://sudoku-api.vercel.app

---