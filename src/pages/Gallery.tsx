import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import "./Gallery.css";
import Header from "../components/Header";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Deluxe Suite",
      category: "rooms",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Executive Room",
      category: "rooms",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Premium Suite",
      category: "rooms",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Luxury Villa",
      category: "villas",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Standard Room",
      category: "rooms",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Family Suite",
      category: "rooms",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Hotel Lobby",
      category: "common",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Restaurant",
      category: "dining",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Spa Area",
      category: "wellness",
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Pool",
      category: "wellness",
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Gym",
      category: "wellness",
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Bar",
      category: "dining",
    },
  ];

  const categories = [
    { id: "all", name: "All Photos" },
    { id: "rooms", name: "Rooms & Suites" },
    { id: "villas", name: "Villas" },
    { id: "dining", name: "Dining" },
    { id: "wellness", name: "Wellness" },
    { id: "common", name: "Common Areas" },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? images
      : images.filter((image) => image.category === selectedCategory);

  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(
        (img) => img.id === selectedImage.id
      );
      const nextIndex = (currentIndex + 1) % filteredImages.length;
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const currentIndex = filteredImages.findIndex(
        (img) => img.id === selectedImage.id
      );
      const prevIndex =
        currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1;
      setSelectedImage(filteredImages[prevIndex]);
    }
  };

  return (
    <div className="gallery-page">
      {/* Hero Section */}
        <div className="hero-background">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Hotel Gallery"
          />
          <div className="hero-overlay"></div>
        </div>
      <Header />

      <section className="gallery-hero">
        <div className="hero-content">
          <h1>Photo Gallery</h1>
          <p>Explore our beautiful spaces and amenities</p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section gallery-section">
        <div className="container">
          {/* Category Filter */}
          <div className="category-filter">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-btn ${
                  selectedCategory === category.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid">
            {filteredImages.map((image) => (
              <div
                key={image.id}
                className="gallery-item"
                onClick={() => openLightbox(image)}
              >
                <img src={image.src} alt={image.alt} />
                <div className="gallery-overlay">
                  <h3>{image.alt}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={closeLightbox}>
              <X size={24} />
            </button>
            <button className="lightbox-nav lightbox-prev" onClick={prevImage}>
              <ChevronLeft size={24} />
            </button>
            <button className="lightbox-nav lightbox-next" onClick={nextImage}>
              <ChevronRight size={24} />
            </button>
            <img src={selectedImage.src} alt={selectedImage.alt} />
            <h3 className="lightbox-title">{selectedImage.alt}</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
