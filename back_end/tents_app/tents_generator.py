import random
from copy import deepcopy


def generate_tents_layout(size, tree_count):
    board = [['' for _ in range(size)] for _ in range(size)]
    placed = 0
    while placed < tree_count:
        r, c = random.randint(0, size - 1), random.randint(0, size - 1)
        if board[r][c] == '':
            board[r][c] = 'tree'
            placed += 1
    return board


def is_valid_tent(board, row, col):
    size = len(board)
    if board[row][col] != '':
        return False
    for dr in [-1, 0, 1]:
        for dc in [-1, 0, 1]:
            nr, nc = row + dr, col + dc
            if 0 <= nr < size and 0 <= nc < size and board[nr][nc] == 'tent':
                return False
    return True


# def adjacent_positions(r, c, size):
#     """Return orthogonal adjacent positions for a given cell."""
#     return [
#         (r + dr, c + dc)
#         for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]
#         if 0 <= r + dr < size and 0 <= c + dc < size
#     ]


def generate_tents_solution(layout):
    size = len(layout)
    solution = [['' for _ in range(size)] for _ in range(size)]

    for r in range(size):
        for c in range(size):
            if layout[r][c] == 'tree':
                directions = [(-1, 0), (1, 0), (0, -1), (0, 1)]
                random.shuffle(directions)
                for dr, dc in directions:
                    nr, nc = r + dr, c + dc
                    if (
                        0 <= nr < size and 0 <= nc < size
                        and layout[nr][nc] == ''
                        and is_valid_tent(solution, nr, nc)
                    ):
                        solution[nr][nc] = 'tent'
                        break
    return solution


def build_tents_board(layout, solution):
    size = len(layout)
    board = [['' for _ in range(size)] for _ in range(size)]
    row_clues = [0] * size
    col_clues = [0] * size

    for r in range(size):
        for c in range(size):
            if layout[r][c] == 'tree':
                board[r][c] = 'tree'
            if solution[r][c] == 'tent':
                row_clues[r] += 1
                col_clues[c] += 1

    return {
        'board': board,
        'row_clues': row_clues,
        'col_clues': col_clues
    }


def generate_tents(size):
    tree_count = max(3, size // 2 + random.randint(0, 2))
    layout = generate_tents_layout(size, tree_count)
    solution = generate_tents_solution(layout)
    puzzle = build_tents_board(layout, solution)
    return {
        'layout': layout,
        'solution': solution,
        'puzzle': puzzle
    }


# Debug / Example usage
if __name__ == '__main__':
    puzzle_data = generate_tents(6)
    print("Board:")
    for row in puzzle_data['puzzle']['board']:
        print(' '.join(cell if cell else '.' for cell in row))
    print("Row clues:", puzzle_data['puzzle']['row_clues'])
    print("Col clues:", puzzle_data['puzzle']['col_clues'])