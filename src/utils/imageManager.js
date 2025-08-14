class ImageManager {
  constructor() {
    this.allPhotos = []
    this.shuffledPool = []
    this.currentIndex = 0
    this.initialized = false
    this.imageCollections = {
      slideshow: Array.from({ length: 41 }, (_, i) => `/images/slideshow/${i + 1}.jpeg`),
      portraits: Array.from({ length: 12 }, (_, i) => `/images/portraits/${i + 1}.jpeg`),
      landscapes: Array.from({ length: 7 }, (_, i) => `/images/landscapes/${i + 1}.jpeg`),
      memories: Array.from({ length: 6 }, (_, i) => `/images/memories/${i + 1}.jpeg`),
      squares: Array.from({ length: 5 }, (_, i) => `/images/squares/${i + 1}.jpeg`),
      timeline: Array.from({ length: 3 }, (_, i) => `/images/timeline/${i + 1}.jpeg`),
      collages: Array.from({ length: 2 }, (_, i) => `/images/collages/${i + 1}.jpeg`),
    }
  }

  async initialize() {
    if (this.initialized) return

    this.allPhotos = [
      ...this.imageCollections.slideshow,
      ...this.imageCollections.portraits,
      ...this.imageCollections.landscapes,
      ...this.imageCollections.memories,
      ...this.imageCollections.squares,
      ...this.imageCollections.timeline,
      ...this.imageCollections.collages,
    ]

    this.shufflePhotos()
    this.initialized = true
    console.log(`Initialized with ${this.allPhotos.length} photos from all folders`)
  }

  shufflePhotos() {
    this.shuffledPool = [...this.allPhotos]
    for (let i = this.shuffledPool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[this.shuffledPool[i], this.shuffledPool[j]] = [this.shuffledPool[j], this.shuffledPool[i]]
    }
    this.currentIndex = 0
    console.log("Photos shuffled - no repeats until all photos are used")
  }

  getNextPhoto() {
    if (!this.initialized) {
      return "/loading-screen-animation.png"
    }

    if (this.currentIndex >= this.shuffledPool.length) {
      this.shufflePhotos()
      console.log("All photos used once - reshuffling for next cycle")
    }

    const photo = this.shuffledPool[this.currentIndex]
    this.currentIndex++
    return photo
  }

  getRandomImage() {
    return this.getNextPhoto()
  }

  getImageByIndex(index) {
    return this.getNextPhoto()
  }

  getImages() {
    return this.allPhotos
  }

  getImagesForCount(count) {
    const images = []
    for (let i = 0; i < count; i++) {
      images.push(this.getNextPhoto())
    }
    return images
  }

  getUsageStats() {
    return {
      totalPhotos: this.allPhotos.length,
      currentIndex: this.currentIndex,
      photosUsedInCurrentCycle: this.currentIndex,
      photosRemainingInCycle: this.shuffledPool.length - this.currentIndex,
    }
  }

  resetShuffle() {
    this.shufflePhotos()
    console.log("Manually reset photo shuffle")
  }
}

const imageManager = new ImageManager()

export default imageManager
