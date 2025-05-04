from PIL import Image
import numpy as np
import requests
from io import BytesIO
from nono_app.models import NonogramPuzzle


def fetch_white_background(image_url, size=(100, 100)):
    # get the icon
    icon_response = requests.get(image_url, timeout=10)
    icon_response.raise_for_status()
    icon = Image.open(BytesIO(icon_response.content)).convert("RGBA")

    # resize icon to fit within the target size (90% of target)
    icon.thumbnail((size[0] * 0.9, size[1] * 0.9))  

    # create white background
    background = Image.new("RGBA", size, (255, 255, 255, 255))

    # calculate position to center the icon
    icon_x = (background.width - icon.width) // 2
    icon_y = (background.height - icon.height) // 2

    # paste the icon onto the background (preserving transparency)
    background.paste(icon, (icon_x, icon_y), icon)

    # convert to grayscale
    return background.convert("L")


def binary_builder(img):
    # image_path = 'octo.jpg'
    # img = Image.open(image_path).convert('L') # 'L' converts image to grayscale
    img_resized = img.resize((10,10))
    image_array = np.array(img_resized)

    # apply a threshold to convert pixels to 0 or 1
    threshold = 130 # black 0, white 255
    binary = np.ones_like(image_array, dtype=int) # manually set to enter while loop
    # Increase threshold until we have both 0s and 1s
    while threshold <= 255:
        binary = (image_array < threshold).astype(int) # changed sign
        unique_vals = np.unique(binary)
        if len(unique_vals) > 1:  # contains both 0 and 1
            break
        threshold += 10
    #binary = (image_array > threshold).astype(int) # boolean true=1, false=0 = solution array
    return binary

def generate_nonogram(matrix):
    # if not matrix:
    #     return "No grid"
    size = matrix.shape
    grid = matrix.tolist()


    row_hints = []  # This will store the hint numbers for each row
    for row in grid:
        row_string = ''.join(map(str, row))  # Convert row to a string of '0's and '1's
        groups = row_string.split('0')  # Split the string by '0' to find groups of '1's
        
        hint_numbers = []  # This will store hint numbers for the current row
        for group in groups:
            if group:  # Ignore empty strings (caused by multiple zeros)
                hint_numbers.append(len(group))  # Count the number of '1's in the group
        
        row_hints.append(hint_numbers)  # Add the hint numbers for this row to the result

    #print(row_hints)

    # Transpose the grid: Convert rows into columns
    columns = []  # This will store the transposed grid
    for j in range(len(grid[0])):  # Loop over columns (assuming grid is not empty)
        column = []  # Create an empty column list
        for i in range(len(grid)):  # Loop over each row
            column.append(grid[i][j])  # Add the value from row `i`, column `j`
        columns.append(column)  # Add the completed column to the list

    # Compute column hints (same logic as row hints)
    col_hints = []  # This will store the hints for each column
    for col in columns:
        col_string = ''.join(map(str, col))  # Convert column to a string of '0's and '1's
        groups = col_string.split('0')  # Split by '0' to find groups of '1's
        
        hint_numbers = []  # Store hints for this column
        for group in groups:
            if group:  # Ignore empty strings (caused by multiple zeros)
                hint_numbers.append(len(group))  # Count the number of '1's in the group
        
        col_hints.append(hint_numbers)  # Add column hints to the result

    #print(col_hints)

    return {
        "size": size,
        "row_hints": row_hints,
        "column_hints": col_hints,
        "solution": grid  
    }

def store_view(img_obj, img):
    binary = binary_builder(img) 
    puzzle_data = generate_nonogram(binary)
    obj, created = NonogramPuzzle.objects.get_or_create(
        image=img_obj,
        rows=puzzle_data['size'][0],
        cols=puzzle_data['size'][1],
        defaults={  # fields will only be used if the object doesn't exist
        'row_hints': puzzle_data['row_hints'],
        'column_hints': puzzle_data['column_hints'],
        'solution': puzzle_data['solution']
    })
    if not created:
        print("Puzzle already existed!")

# x = binary_builder('octo.jpg')
# p = generate_nonogram(x)
# print(p)
# print(p['row_hints'])
# print(p['column_hints'])
# print(p['solution'])