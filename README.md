# 🎂 Romantic Birthday Slideshow App

A beautiful, romantic birthday website with auto-scrolling slideshow, floating animations, and dynamic image loading. Perfect for creating a memorable birthday experience for someone special.

## ✨ Features

- **Auto-advancing slideshow** with 200+ romantic messages
- **Ultra-smooth auto-scroll** (0.05 second intervals)
- **Dynamic image loading** from organized folders or environment variables
- **Floating animations** (hearts, balloons, birthday emojis, confetti)
- **Background music** with play/pause/mute controls
- **Black & purple romantic theme**
- **Mobile-first responsive design**
- **Multiple gallery sections** (portraits, landscapes, squares)
- **Timeline view** showing 12 months of memories
- **Photo collages** and memory sections

## 🚀 Quick Start

### Prerequisites

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **VS Code** (recommended)

### Installation

1. **Clone or download** this project to your computer
2. **Open VS Code** and select "File > Open Folder"
3. **Navigate to** the project folder and open it
4. **Open the terminal** in VS Code (`Ctrl+`` or `View > Terminal`)
5. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`
6. **Start the development server**:
   \`\`\`bash
   npm run dev
   \`\`\`
7. **Open your browser** and go to `http://localhost:3000`

## 📁 Image Organization

### Method 1: Environment Variables (Recommended)

Configure images using environment variables in your Vercel project settings or `.env.local` file:

\`\`\`bash
# Individual category configuration
NEXT_PUBLIC_SLIDESHOW_IMAGES=["image1.jpg","image2.jpg","image3.jpg"]
NEXT_PUBLIC_PORTRAIT_IMAGES=["portrait1.jpg","portrait2.jpg"]
NEXT_PUBLIC_LANDSCAPE_IMAGES=["landscape1.jpg","landscape2.jpg"]
NEXT_PUBLIC_MEMORY_IMAGES=["memory1.jpg","memory2.jpg"]
NEXT_PUBLIC_SQUARE_IMAGES=["square1.jpg","square2.jpg"]
NEXT_PUBLIC_COLLAGE_IMAGES=["collage1.jpg","collage2.jpg"]
NEXT_PUBLIC_TIMELINE_IMAGES=["timeline1.jpg","timeline2.jpg"]

# OR use comma-separated format
NEXT_PUBLIC_SLIDESHOW_IMAGES="image1.jpg,image2.jpg,image3.jpg"

# OR configure all images at once (auto-distributed)
NEXT_PUBLIC_ALL_IMAGES=["img1.jpg","img2.jpg","img3.jpg","img4.jpg"]
\`\`\`

### Method 2: Folder Structure

All images should be placed in the `public/images/` folder with the following structure:

\`\`\`
public/
└── images/
    ├── slideshow/          # Main slideshow images
    ├── memories/           # Memory section images
    ├── portraits/          # Portrait gallery images
    ├── landscapes/         # Landscape gallery images
    ├── squares/            # Square gallery images
    ├── timeline/           # Timeline month images
    └── collages/           # Photo collage images
\`\`\`

### Supported Image Formats

- **JPG/JPEG** (.jpg, .jpeg)
- **PNG** (.png)
- **WebP** (.webp)
- **GIF** (.gif)

### Image Naming

**✅ Good news:** Image names don't matter! The system automatically detects and loads images regardless of their names.

**Examples of supported names:**
- `IMG_001.jpg`
- `photo-2024.png`
- `birthday_memory.jpeg`
- `random-name-123.webp`
- `493712019_1247833334325152834330.jpg`

### How Many Images to Add

| Folder | Recommended | Description |
|--------|-------------|-------------|
| `slideshow/` | 20-50 images | Main rotating slideshow |
| `memories/` | 60+ images | Memory sections (6 per section) |
| `portraits/` | 20+ images | Portrait gallery |
| `landscapes/` | 15+ images | Landscape gallery |
| `squares/` | 25+ images | Square gallery |
| `timeline/` | 12+ images | One per month |
| `collages/` | 120+ images | Photo collages (12 per collage) |

**Queue Behavior:** If you have fewer images than needed, the system automatically cycles through available images. If you have more images than needed, it uses only what's required in the order they appear.

## 🎵 Adding Background Music

1. **Add your music file** to the `public/` folder
2. **Name it** `music.mp3` (or update the filename in `App.jsx`)
3. **Supported formats:** MP3, WAV, OGG

## 🎨 Customization

### Changing Colors

Edit the CSS variables in `src/App.css`:

\`\`\`css
:root {
  --primary-color: #8B5CF6;    /* Purple */
  --secondary-color: #000000;   /* Black */
  --accent-color: #A855F7;      /* Light purple */
}
\`\`\`

### Adjusting Auto-Scroll Speed

In `src/App.jsx`, find this line and change the interval:

\`\`\`javascript
}, 50) // Change 50 to desired milliseconds (50 = 0.05 seconds)
\`\`\`

### Modifying Messages

Edit the `romanticMessages` array in `src/App.jsx` to customize the slideshow messages.

## 📱 Mobile Optimization

The app is designed **mobile-first** with:
- **Touch-friendly** controls
- **Responsive** image galleries
- **Optimized** auto-scroll for mobile screens
- **Fast loading** with lazy image loading

## 🛠️ VS Code Setup

### Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets**
2. **Prettier - Code formatter**
3. **Auto Rename Tag**
4. **Bracket Pair Colorizer**
5. **Live Server** (for testing)

### VS Code Settings

Add to your VS Code `settings.json`:

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "emmet.includeLanguages": {
    "javascript": "javascriptreact"
  }
}
\`\`\`

## 🚨 Troubleshooting

### Images Not Loading
- ✅ Check images are in `public/images/` folders or properly configured in environment variables
- ✅ Verify image file formats (jpg, png, webp, gif)
- ✅ Check environment variable syntax (JSON array or comma-separated)
- ✅ Refresh the browser page
- ✅ Check browser console for errors

### Environment Variables Not Working
- ✅ Ensure variables start with `NEXT_PUBLIC_`
- ✅ Restart development server after adding env vars
- ✅ Check `.env.local` file syntax
- ✅ Verify JSON array format: `["img1.jpg","img2.jpg"]`

### Music Not Playing
- ✅ Ensure `music.mp3` is in the `public/` folder
- ✅ Click the play button (▶️) in the controls
- ✅ Check browser allows autoplay (some browsers block it)

### Auto-Scroll Too Fast/Slow
- ✅ Modify the interval in `App.jsx` (line with `}, 50)`)
- ✅ Smaller number = faster scroll
- ✅ Larger number = slower scroll

### App Won't Start
- ✅ Run `npm install` first
- ✅ Check Node.js version (16+)
- ✅ Try `npm run dev` again
- ✅ Check for error messages in terminal

## 📦 Dependencies

The app uses these main dependencies:
- **React 18** - UI framework
- **Next.js 14** - React framework
- **CSS3** - Styling and animations

## 🎯 Performance Tips

1. **Optimize images** before adding (compress large files)
2. **Use WebP format** when possible for smaller file sizes
3. **Don't add too many huge images** at once
4. **Test on mobile** devices for best experience
5. **Use environment variables** for easier image management

## 💝 Final Notes

This romantic birthday slideshow is designed to create a beautiful, memorable experience. The auto-scroll feature lets viewers sit back and enjoy the journey through all your carefully curated images and messages.

**Environment variables make it easy to configure images without touching code!**

**Happy Birthday to your special person!** 🎂✨

---

*Made with 💕 for creating beautiful birthday memories*
