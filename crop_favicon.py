from PIL import Image

def process_logo():
    try:
        img = Image.open('Photos/Logo/hotel_victory_logo.png').convert("RGBA")
        width, height = img.size
        
        # Make pure black pixels transparent
        data = img.getdata()
        new_data = []
        for item in data:
            # If the pixel is very dark (almost black), make it transparent
            if item[0] < 15 and item[1] < 15 and item[2] < 15:
                new_data.append((0, 0, 0, 0))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        
        # Save transparent full logo
        img.save('Photos/Logo/transparent_full_logo.png', 'PNG')
        
        # Now create favicon by cropping the square box
        # Looking at the image, the square box is in the top-left.
        # Let's crop roughly the top-left quadrant/third
        box_size = int(height * 0.45) # Guessing the square height is ~45% of total height
        # The square is not perfectly at 0,0, but let's find the bounding box of non-transparent pixels in the top-left area
        
        # Simple crop for now: top-left area
        # We will scan for the first non-transparent pixel to find the exact box
        left, top, right, bottom = width, height, 0, 0
        for y in range(int(height/2)):
            for x in range(int(width/3)):
                p = img.getpixel((x, y))
                if p[3] > 0: # not transparent
                    if x < left: left = x
                    if y < top: top = y
                    if x > right: right = x
                    if y > bottom: bottom = y
                    
        # Crop to this bounding box, with a little padding
        padding = 10
        crop_box = (max(0, left-padding), max(0, top-padding), min(width, right+padding), min(height, bottom+padding))
        
        favicon_img = img.crop(crop_box)
        
        # Make it a perfect square
        f_width, f_height = favicon_img.size
        max_dim = max(f_width, f_height)
        square_img = Image.new('RGBA', (max_dim, max_dim), (0,0,0,0))
        offset_x = (max_dim - f_width) // 2
        offset_y = (max_dim - f_height) // 2
        square_img.paste(favicon_img, (offset_x, offset_y))
        
        # Resize to favicon size
        square_img = square_img.resize((128, 128), Image.Resampling.LANCZOS)
        square_img.save('Photos/Logo/hotel_favicon.png', 'PNG')
        print("Success! Created transparent_full_logo.png and hotel_favicon.png")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    process_logo()
