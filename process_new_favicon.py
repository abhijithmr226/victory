from PIL import Image

def process_new_favicon():
    try:
        img_path = r'C:\Users\Krynn\.gemini\antigravity-ide\brain\f17dbb7f-6120-45c9-b072-f2b37aaffb18\media__1780649138745.png'
        img = Image.open(img_path).convert("RGBA")
        
        # Make white pixels transparent
        data = img.getdata()
        new_data = []
        for item in data:
            # If the pixel is very white, make it transparent
            if item[0] > 230 and item[1] > 230 and item[2] > 230:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
        
        img.putdata(new_data)
        
        # Resize to standard favicon size
        img = img.resize((128, 128), Image.Resampling.LANCZOS)
        img.save('Photos/Logo/hotel_favicon.png', 'PNG')
        print("Success! Created new hotel_favicon.png")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    process_new_favicon()
