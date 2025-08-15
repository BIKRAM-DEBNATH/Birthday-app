"use client"

import { useState, useEffect, useRef } from "react"
import "./App.css"
import imageManager from "./utils/imageManager"

const App = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [currentSlideshowImage, setCurrentSlideshowImage] = useState("")
  const [staticImages, setStaticImages] = useState([])
  const [audioLoaded, setAudioLoaded] = useState(false)
  const audioRef = useRef(null)
  const autoScrollRef = useRef(null)

  useEffect(() => {
    const initializeImages = async () => {
      await imageManager.initialize()
      setImagesLoaded(true)
      setCurrentSlideshowImage(imageManager.getNextPhoto())
      const preGeneratedImages = []
      for (let i = 0; i < 100; i++) {
        preGeneratedImages.push(imageManager.getNextPhoto())
      }
      setStaticImages(preGeneratedImages)
    }
    initializeImages()
  }, [])

  const romanticMessages = [
    "Happy Birthday to my special Shubhra! 💕",
    "Another year of admiring you from afar, Shubhra 🌹",
    "You make every day feel like a celebration, Shubhra 🎉",
    "My heart skips a beat thinking of you, beautiful Shubhra 💖",
    "Watching you grow more amazing each year, Shubhra 💑",
    "You're not just a year older, you're a year more beautiful, Shubhra 🌺",
    "Every birthday reminds me how special you are, Shubhra ✨",
    "My admiration for you grows stronger with each passing year, Shubhra 💝",
    "Happy Birthday to someone incredibly special - Shubhra 💍",
    "You age like fine wine, Shubhra - more captivating every year 🍷",
    "Another year of hoping to be part of your adventures, Shubhra 🗺️",
    "Your birthday is the perfect excuse to think of you, Shubhra 🎁",
    "Celebrating the day someone amazing was born - Happy Birthday Shubhra 🌍",
    "Happy Birthday to my heart's sweetest person, Shubhra 💎",
    "Every candle represents how much you mean to me, Shubhra 🕯️",
    "You make getting older look absolutely stunning, Shubhra 👑",
    "Another year of being grateful you exist, Shubhra 🙏",
    "Happy Birthday to someone truly extraordinary - Shubhra 💕",
    "Your smile brightens my entire world, Shubhra 😊",
    "Cheers to another year of admiring you, Shubhra 🥂",
  ]

  const memoryQuotes = [
    "Every moment with you feels like a beautiful memory waiting to happen, Shubhra",
    "You turn ordinary days into extraordinary memories, Shubhra",
    "My favorite memories are the ones where you're smiling, Shubhra",
    "Time stops when I think about you, Shubhra",
    "You're the story I want to tell for the rest of my life, Shubhra",
    "Every laugh we share becomes a treasured memory, Shubhra",
    "You make even the simplest moments feel magical, Shubhra",
    "My heart keeps a special place for every moment we've shared, Shubhra",
  ]

  const birthdayWishes = Array.from(
    { length: 50 },
    (_, i) => `Wish ${i + 1}: May this year bring you everything your heart desires and more, Shubhra! 🌟`,
  )

  useEffect(() => {
    if (!imagesLoaded) return

    const interval = setInterval(() => {
      const nextImage = imageManager.getNextPhoto()
      setCurrentSlideshowImage(nextImage)
      setCurrentImageIndex((prevIndex) => prevIndex + 1)
    }, 4000)

    return () => clearInterval(interval)
  }, [imagesLoaded])

  useEffect(() => {
    if (audioRef.current && audioLoaded) {
      audioRef.current.volume = 0.3
      audioRef.current.muted = isMuted

      // Automatically start playing when audio is loaded
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("[v0] Audio autoplay started successfully")
          })
          .catch((error) => {
            console.error("[v0] Audio autoplay failed:", error)
            // Show user-friendly message for autoplay restrictions
            if (error.name === "NotAllowedError") {
              console.log("[v0] Browser blocked autoplay - user interaction required")
            }
          })
      }
    }
  }, [audioLoaded, isMuted])

  useEffect(() => {
    if (isAutoScrolling) {
      const isMobile = window.innerWidth <= 768
      const scrollInterval = isMobile ? 600 : 50

      autoScrollRef.current = setInterval(() => {
        const scrollAmount = isMobile ? window.innerHeight * 0.01 : window.innerHeight * 0.015

        window.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        })

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
          setIsAutoScrolling(false)
        }
      }, scrollInterval)
    } else {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
        autoScrollRef.current = null
      }
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current)
      }
    }
  }, [isAutoScrolling])

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling)
  }

  const getStaticImage = (index) => {
    return staticImages[index % staticImages.length] || "/placeholder.svg?height=400&width=400"
  }

  return (
    <div className="app">
      <div className="floating-hearts">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className={`heart heart-${i + 1}`}>
            💖
          </div>
        ))}
      </div>

      <div className="floating-balloons">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className={`balloon balloon-${i + 1}`}>
            🎈
          </div>
        ))}
      </div>

      <div className="floating-birthday-emojis">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`birthday-emoji birthday-emoji-${i + 1}`}>
            {["🎂", "🎉", "🎁", "🎊", "🥳", "🍰"][i % 6]}
          </div>
        ))}
      </div>

      <div className="confetti">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className={`confetti-piece confetti-${i + 1}`}></div>
        ))}
      </div>

      <div className="audio-controls">
        <button
          className="control-btn mute-btn"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "🔇" : "🔊"}
        </button>
        <button
          className={`control-btn auto-scroll-btn ${isAutoScrolling ? "active" : ""}`}
          onClick={toggleAutoScroll}
          aria-label={isAutoScrolling ? "Stop auto scroll" : "Start auto scroll"}
          title={isAutoScrolling ? "Stop auto scroll" : "Start auto scroll"}
        >
          {isAutoScrolling ? "⏹️" : "📜"}
        </button>
      </div>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Happy Birthday Shubhra</h1>
          <h2 className="hero-subtitle">To My Special Person</h2>
          <p className="hero-description">
            Today we celebrate you, Shubhra - someone who makes the world brighter just by being in it
          </p>
          <div className="hero-decoration">🎂✨🎉</div>
        </div>
      </section>

      <section className="main-slideshow-section">
        <div className="slideshow-container">
          <div className="image-container">
            <img
              src={
                imagesLoaded && currentSlideshowImage
                  ? currentSlideshowImage
                  : "/placeholder.svg?height=600&width=800&query=loading"
              }
              alt={`Romantic moment ${currentImageIndex + 1}`}
              className="slideshow-image"
              loading="lazy"
            />
            <div className="image-overlay"></div>
          </div>

          <div className="message-container">
            <h1 className="romantic-message">{romanticMessages[currentImageIndex % romanticMessages.length]}</h1>
          </div>

          <div className="progress-container">
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{
                  width: `${(((currentImageIndex % 20) + 1) / 20) * 100}%`,
                }}
              ></div>
            </div>
            <span className="progress-text">{imagesLoaded ? `Image ${currentImageIndex + 1}` : "Loading..."}</span>
          </div>
        </div>
      </section>

      {Array.from({ length: 3 }, (_, sectionIndex) => (
        <section key={`memory-${sectionIndex}`} className="memory-section">
          <div className="memory-header">
            <h2 className="memory-title">Beautiful Memories {sectionIndex + 1}</h2>
            <p className="memory-subtitle">{memoryQuotes[sectionIndex % memoryQuotes.length]}</p>
          </div>
          <div className="memory-grid">
            {Array.from({ length: 4 }, (_, imgIndex) => (
              <div key={imgIndex} className="memory-card">
                <img
                  src={
                    imagesLoaded
                      ? getStaticImage(sectionIndex * 4 + imgIndex)
                      : "/placeholder.svg?height=400&width=400&query=loading"
                  }
                  alt={`Memory ${imgIndex + 1}`}
                  className="memory-image"
                />
                <div className="memory-overlay">
                  <p className="memory-text">
                    {romanticMessages[(sectionIndex * 4 + imgIndex) % romanticMessages.length]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {Array.from({ length: 3 }, (_, quoteIndex) => (
        <section key={`quote-${quoteIndex}`} className="quote-section">
          <div className="quote-container">
            <blockquote className="romantic-quote">"{memoryQuotes[quoteIndex % memoryQuotes.length]}"</blockquote>
            <div className="quote-decoration">💕</div>
          </div>
        </section>
      ))}

      <section className="wishes-section">
        <div className="wishes-header">
          <h2 className="wishes-title">50 Birthday Wishes For Shubhra</h2>
          <p className="wishes-subtitle">Each wish comes from the heart</p>
        </div>
        <div className="wishes-grid">
          {birthdayWishes.map((wish, index) => (
            <div key={index} className="wish-card">
              <div className="wish-number">{index + 1}</div>
              <p className="wish-text">{wish}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="timeline-section">
        <div className="timeline-header">
          <h2 className="timeline-title">A Year of Admiring Shubhra</h2>
        </div>
        <div className="timeline">
          {Array.from({ length: 12 }, (_, monthIndex) => (
            <div key={monthIndex} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h3 className="timeline-month">
                  {new Date(2024, monthIndex).toLocaleString("default", { month: "long" })}
                </h3>
                <p className="timeline-text">
                  Another month of thinking about you, Shubhra, and hoping for moments together
                </p>
                <img
                  src={
                    imagesLoaded
                      ? getStaticImage(20 + monthIndex)
                      : "/placeholder.svg?height=300&width=400&query=loading"
                  }
                  alt={`Month ${monthIndex + 1}`}
                  className="timeline-image"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {Array.from({ length: 2 }, (_, collageIndex) => (
        <section key={`collage-${collageIndex}`} className="collage-section">
          <div className="collage-header">
            <h2 className="collage-title">A Year of Admiring Shubhra Photo Collection {collageIndex + 1}</h2>
          </div>
          <div className="photo-collage">
            {Array.from({ length: 6 }, (_, photoIndex) => (
              <div key={photoIndex} className={`collage-item item-${photoIndex + 1}`}>
                <img
                  src={
                    imagesLoaded
                      ? getStaticImage(35 + collageIndex * 6 + photoIndex)
                      : "/placeholder.svg?height=250&width=250&query=loading"
                  }
                  alt={`Collage photo ${photoIndex + 1}`}
                  className="collage-photo"
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      <section className="portrait-gallery-section">
        <div className="gallery-header">
          <h2 className="gallery-title">Portrait Gallery</h2>
          <p className="gallery-subtitle">Beautiful moments captured in time</p>
        </div>
        <div className="portrait-grid">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="portrait-item">
              <img
                src={imagesLoaded ? getStaticImage(50 + index) : "/placeholder.svg?height=400&width=300&query=loading"}
                alt={`Portrait ${index + 1}`}
                className="portrait-image"
              />
              <div className="portrait-caption">
                <p>Moment {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="landscape-gallery-section">
        <div className="gallery-header">
          <h2 className="gallery-title">Landscape Memories</h2>
          <p className="gallery-subtitle">Places that remind me of you</p>
        </div>
        <div className="landscape-grid">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="landscape-item">
              <img
                src={imagesLoaded ? getStaticImage(60 + index) : "/placeholder.svg?height=300&width=500&query=loading"}
                alt={`Landscape ${index + 1}`}
                className="landscape-image"
              />
              <div className="landscape-overlay">
                <h3>Beautiful Place {index + 1}</h3>
                <p>A place I'd love to visit with you, Shubhra</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="square-gallery-section">
        <div className="gallery-header">
          <h2 className="gallery-title">Square Moments</h2>
          <p className="gallery-subtitle">Perfect little memories</p>
        </div>
        <div className="square-grid">
          {Array.from({ length: 9 }, (_, index) => (
            <div key={index} className="square-item">
              <img
                src={imagesLoaded ? getStaticImage(70 + index) : "/placeholder.svg?height=300&width=300&query=loading"}
                alt={`Square moment ${index + 1}`}
                className="square-image"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="final-message-section">
        <div className="final-message-container">
          <h2 className="final-title">Until We Meet Again, Shubhra</h2>
          <p className="final-text">
            Every scroll through this page represents a moment I've thought about you, Shubhra. Every image, every
            message, every wish - they all come from a heart that admires you deeply. Happy Birthday to someone truly
            special.
          </p>
          <div className="final-decoration">🌹💖🌹</div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">Made with 💕 for Shubhra</p>
          <p className="footer-subtext">Happy Birthday Shubhra! 🎂</p>
          <div className="footer-hearts">💖 💕 💖 💕 💖</div>
        </div>
      </footer>

      <audio
        ref={audioRef}
        loop
        autoPlay
        preload="auto"
        onLoadedData={() => {
          console.log("[v0] Audio loaded, setting audioLoaded to true")
          setAudioLoaded(true)
        }}
        onError={(e) => {
          console.error("[v0] Audio loading failed:", {
            error: e.target.error,
            code: e.target.error?.code,
            message: e.target.error?.message,
            src: e.target.src,
          })
          console.log("[v0] Audio file not found - continuing without music")
          setAudioLoaded(false)
        }}
        onCanPlay={() => {
          console.log("[v0] Audio can play")
        }}
      >
        <source src="/saiyara-female-version.mp3" type="audio/mpeg" />
        <source src="/saiyara-female-version.ogg" type="audio/ogg" />
        <source src="/saiyara-female-version.wav" type="audio/wav" />
        Your browser does not support the audio element.
      </audio>

      <div className="corner-decoration top-left">💕</div>
      <div className="corner-decoration top-right">🌹</div>
      <div className="corner-decoration bottom-left">💖</div>
      <div className="corner-decoration bottom-right">✨</div>
    </div>
  )
}

export default App
