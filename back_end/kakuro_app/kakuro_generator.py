import random
import itertools

DIGITS = list(range(1, 10))

def get_combinations(length, target_sum):
    return [
        comb for comb in itertools.permutations(DIGITS, length)
        if sum(comb) == target_sum and len(set(comb)) == length
    ]

def generate_kakuro_solution(layout):
    height, width = len(layout), len(layout[0])
    solution = [[None for _ in range(width)] for _ in range(height)]

    # Fill horizontal groups
    for r in range(height):
        c = 0
        while c < width:
            if layout[r][c] == 'H':
                length = 0
                while c + length < width and layout[r][c + length] == 'H':
                    length += 1
                target_sum = random.randint(length + 1, 9 * length - 1)
                combs = get_combinations(length, target_sum)
                if not combs:
                    combs = get_combinations(length, sum(DIGITS[:length]))
                values = random.choice(combs)
                for i in range(length):
                    solution[r][c + i] = values[i]
                c += length
            else:
                c += 1

    # Fill vertical groups
    for c in range(width):
        r = 0
        while r < height:
            if layout[r][c] == 'V' or layout[r][c] == 'H':
                length = 0
                while r + length < height and layout[r + length][c] in ('V', 'H'):
                    length += 1
                digits_in_col = [solution[r + i][c] for i in range(length)]
                if None in digits_in_col:
                    target_sum = random.randint(length + 1, 9 * length - 1)
                    combs = get_combinations(length, target_sum)
                    if not combs:
                        combs = get_combinations(length, sum(DIGITS[:length]))
                    values = random.choice(combs)
                    for i in range(length):
                        solution[r + i][c] = values[i]
                r += length
            else:
                r += 1

    return solution

def build_clue_board(layout, solution):
    height, width = len(layout), len(layout[0])
    board = [[{"type": "block"} for _ in range(width)] for _ in range(height)]

    for r in range(height):
        for c in range(width):
            if layout[r][c] in ('H', 'V'):
                board[r][c] = {"type": "input"}

    for r in range(height):
        for c in range(width):
            if board[r][c]["type"] != "block":
                continue

            clue = {}
            # Horizontal
            if c + 1 < width and board[r][c + 1]["type"] == "input":
                s = 0
                i = 1
                while c + i < width and board[r][c + i]["type"] == "input":
                    s += solution[r][c + i]
                    i += 1
                if i > 2:
                    clue["across"] = s

            # Vertical
            if r + 1 < height and board[r + 1][c]["type"] == "input":
                s = 0
                i = 1
                while r + i < height and board[r + i][c]["type"] == "input":
                    s += solution[r + i][c]
                    i += 1
                if i > 2:
                    clue["down"] = s

            if clue:
                board[r][c]["clue"] = clue

    return board

def generate_layout(size):
    layout = [['' for _ in range(size)] for _ in range(size)]
    for r in range(size):
        for c in range(size):
            if r == 0 or c == 0:
                layout[r][c] = ''  # block border
            else:
                layout[r][c] = random.choice(['', 'H', 'V']) if random.random() > 0.4 else ''
    return layout

def generate_kakuro(size):
    layout = generate_layout(size)
    solution = generate_kakuro_solution(layout)
    board_data = build_clue_board(layout, solution)
    return board_data, solution
