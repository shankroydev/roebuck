import React from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight } from "lucide-react";
import "./Home.css";
import Header from "../components/Header";

const Home: React.FC = () => {
  const roomPreviews = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Deluxe Suite",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Executive Room",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Premium Suite",
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
      title: "Luxury Villa",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      title: "A Hidden Gem",
      text: "Absolutely stunning hotel with exceptional service. The rooms are immaculate and the staff goes above and beyond to ensure a perfect stay.",
      rating: 5,
    },
    {
      id: 2,
      name: "Michael Chen",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      title: "Exceeded Expectations",
      text: "From the moment we arrived, everything was perfect. The location is ideal, the amenities are top-notch, and the attention to detail is remarkable.",
      rating: 5,
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      title: "Luxury Redefined",
      text: "This hotel truly redefines luxury. The elegant design, comfortable rooms, and world-class service make it a must-visit destination.",
      rating: 5,
    },
  ];

  return (
    <div className="home">
      <Header/>
      {/* Hero Section */}
        <div className="hero-background">
          <img
            src="/hero-img.jpg"
            alt="Luxury Hotel Room"
          />
          <div className="hero-overlay"></div>
        </div>
      <section className="hero">

        <div className="hero-content">
          <h1 className="hero-title">Stay in Comfort, Live the Experience</h1>
          <p className="hero-subtitle">
            Discover cozy rooms, modern amenities, and unforgettable stays at
            RoeBuck Inn
          </p>
          <Link to="/rooms" className="btn btn-primary hero-btn">
            Book Now
          </Link>
        </div>

        <div className="room-previews">
          <div className="container">
            <div className="preview-grid">
              {roomPreviews.map((room) => (
                <div key={room.id} className="preview-item">
                  <img src={room.image} alt={room.title} />
                  <div className="preview-overlay">
                    <h3>{room.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="section welcome-section">
        <div className="container">
          <h2 className="section-title">Welcome to RoeBuck Inn</h2>
          <p className="section-subtitle">
            Nestled in the heart of London, RoeBuck Inn offers the perfect blend
            of comfort and charm. Whether you're planning a weekend escape, a
            family holiday, or a business trip, our warm hospitality and
            exceptional service will make your stay unforgettable.
          </p>
        </div>
      </section>

      {/* Find Your Perfect Stay Section */}
      <section className="section perfect-stay-section">
        <div className="container">
          <div className="perfect-stay-content">
            <div className="perfect-stay-image">
              <img
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Luxury Room"
              />
            </div>
            <div className="perfect-stay-text">
              <h2 className="section-title">Find Your Perfect Stay</h2>
              <p>
                Each room at RoeBuck Inn is thoughtfully designed to provide the
                ultimate comfort and luxury. From our spacious suites with city
                views to our cozy standard rooms, every detail has been
                carefully curated to ensure your stay exceeds expectations.
              </p>
              <Link to="/rooms" className="btn btn-secondary">
                View Rooms
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="section gallery-section">
        <div className="container">
          <h2 className="section-title">Take A Peek</h2>
          <p className="section-subtitle">
            Explore our stunning accommodations and discover the perfect room
            for your stay
          </p>
          <div className="gallery-grid">
            {galleryImages.map((image, index) => (
              <div key={index} className="gallery-item">
                <img src={image} alt={`Hotel Gallery ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="section reviews-section">
        <div className="container">
          <h2 className="section-title">Reviews</h2>
          <div className="reviews-grid">
            {reviews.map((review) => (
              <div key={review.id} className="review-card card">
                <div className="review-header">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="review-avatar"
                  />
                  <div className="review-info">
                    <h3 className="review-title">{review.title}</h3>
                    <div className="review-rating">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill="#FFD700"
                          color="#FFD700"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="review-text">"{review.text}"</p>
                <p className="review-author">- {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
