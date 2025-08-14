# Image Storage Instructions

This folder is where all your romantic birthday images should be stored. The website will automatically detect and use any images you place here, regardless of their names!

## Folder Structure (Recommended):

\`\`\`
public/images/
├── slideshow/          # Main slideshow images (up to 250)
├── memories/           # Memory section images (up to 60)
├── portraits/          # Portrait gallery images (up to 20)
├── landscapes/         # Landscape gallery images (up to 15)
├── squares/           # Square gallery images (up to 25)
├── collages/          # Photo collage images (up to 120)
└── timeline/          # Timeline month images (up to 12)
\`\`\`

## Supported Image Formats:
- JPG/JPEG
- PNG
- WebP
- GIF

## Naming Patterns (Any of these will work):
- `1.jpg`, `2.png`, `3.webp` (simple numbers)
- `slideshow-1.jpg`, `memory-5.png` (category prefix)
- `slideshow_1.jpg`, `memory_5.png` (underscore)
- `img-1.jpg`, `image-2.png`, `photo-3.jpg`, `pic-4.jpg`

## How It Works:
1. The website automatically scans for images in each category folder
2. If no category folders exist, it looks in the main `/images/` folder
3. If no real images are found, it falls back to placeholder images
4. Images are loaded dynamically - just add new images and refresh!

## Easy Setup:
1. Create the folders above (or just use the main `/images/` folder)
2. Add your romantic photos with any supported names
3. The website will automatically find and display them!

No code changes needed - just add your images and they'll appear!
