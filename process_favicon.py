from PIL import Image

def create_transparent_favicon():
    try:
        # Open the image
        img = Image.open('Photos/Logo/new_logo.png').convert("RGBA")
        
        # Make white pixels transparent
        data = img.getdata()
        new_data = []
        for item in data:
            # Change all white (also shades of white) pixels to transparent
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        
        # Crop the image to make it a square (focusing on the left geometric icon)
        # Assuming the geometric icon is roughly a square on the left side
        width, height = img.size
        # The icon seems to take up the left portion, let's crop a square of height x height
        box = (0, 0, height, height)
        cropped_img = img.crop(box)
        
        # Resize to standard favicon size
        cropped_img = cropped_img.resize((128, 128), Image.Resampling.LANCZOS)
        
        # Save as favicon.png
        cropped_img.save('Photos/Logo/favicon.png', 'PNG')
        print("Favicon created successfully.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    create_transparent_favicon()
