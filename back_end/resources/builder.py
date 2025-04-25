'''image to pixels
    convert pixels to nonogram (solution)
    make blank grid with hints
    store solution (new api endpoint)'''

from PIL import Image
import numpy as np
from utils import generate_nonogram


image_path = 'octo.jpg' 
img = Image.open(image_path).convert('L') # 'L' converts image to grayscale
img_resized = img.resize((10,10))
image_array = np.array(img_resized)

# apply a threshold to convert pixels to 0 or 1
threshold = 130 # black 0, white 222
binary = (image_array > threshold).astype(int) # boolean true=1, false=0
#print(binary) # binary = solution array
#print(type(binary))

jsoncode = generate_nonogram(binary)
print(jsoncode)
# # Find the unique pixels in the image (each unique RGB value)
# unique_pixels = np.unique(image_array.reshape(-1, image_array.shape[-1]), axis=0)
# # Output the unique pixels and the count of unique pixels
# print(f"Number of unique pixels: {len(unique_pixels)}")
# print("Unique pixels:")
# print(unique_pixels)

# print(image_array.shape)
# print(image_array)
# img_list = image_array.tolist()
