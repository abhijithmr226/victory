from PIL import Image
import collections

def rgb_to_hex(rgb):
    return '%02x%02x%02x' % rgb

def get_dominant_gold(image_path):
    try:
        img = Image.open(image_path).convert('RGBA')
        colors = img.getdata()
        
        gold_candidates = []
        for r, g, b, a in colors:
            if a > 0: # Not fully transparent
                # Simple heuristic for gold/yellow: High R, High G, Low B
                # R > G > B is typical for gold, or R and G close, B low
                if r > 100 and g > 80 and b < 150 and r > b and g > b:
                    # Ignore pure white or very light grays
                    if not (r > 240 and g > 240 and b > 240):
                        gold_candidates.append((r, g, b))
        
        if not gold_candidates:
            print("No gold colors found. Using default #D4AF37")
            return
            
        # Find the most common gold-ish color
        counter = collections.Counter(gold_candidates)
        most_common = counter.most_common(5)
        
        print("Top 5 gold-ish colors found:")
        for color, count in most_common:
            print(f"#{rgb_to_hex(color).upper()} (RGB: {color}) - Count: {count}")
            
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    get_dominant_gold('Photos/Logo/transparent_logo.png')
