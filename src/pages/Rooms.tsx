import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Users, Bed, Wifi, Coffee, Car, ArrowRight } from "lucide-react";
import "./Rooms.css";
import Header from "../components/Header";

interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  capacity: number;
  size: string;
  category: string;
  amenities: string[];
  features: string[];
}

const Rooms: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const rooms: Room[] = [
    {
      id: "1",
      name: "Deluxe Suite",
      description:
        "Spacious suite with city views, featuring a king-size bed, separate living area, and luxury amenities.",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.8,
      capacity: 2,
      size: "45 sqm",
      category: "suite",
      amenities: ["King Bed", "City View", "Living Area", "Balcony"],
      features: ["Free WiFi", "Room Service", "Mini Bar", "Air Conditioning"],
    },
    {
      id: "2",
      name: "Executive Room",
      description:
        "Elegant room with modern furnishings, perfect for business travelers or romantic getaways.",
      price: 199,
      image:
        "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.6,
      capacity: 2,
      size: "35 sqm",
      category: "standard",
      amenities: ["Queen Bed", "Work Desk", "City View", "En-suite Bathroom"],
      features: [
        "Free WiFi",
        "Room Service",
        "Coffee Maker",
        "Air Conditioning",
      ],
    },
    {
      id: "3",
      name: "Premium Suite",
      description:
        "Luxury suite with panoramic views, featuring premium amenities and personalized service.",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.9,
      capacity: 3,
      size: "60 sqm",
      category: "suite",
      amenities: ["King Bed", "Panoramic View", "Living Room", "Dining Area"],
      features: [
        "Free WiFi",
        "Butler Service",
        "Premium Mini Bar",
        "Spa Access",
      ],
    },
    {
      id: "4",
      name: "Luxury Villa",
      description:
        "Exclusive villa with private garden, perfect for families or those seeking ultimate privacy.",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 5.0,
      capacity: 4,
      size: "80 sqm",
      category: "villa",
      amenities: ["Multiple Bedrooms", "Private Garden", "Kitchen", "Terrace"],
      features: ["Free WiFi", "Private Pool", "Chef Service", "Concierge"],
    },
    {
      id: "5",
      name: "Standard Room",
      description:
        "Comfortable and cozy room with all essential amenities for a pleasant stay.",
      price: 149,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.4,
      capacity: 2,
      size: "28 sqm",
      category: "standard",
      amenities: ["Double Bed", "En-suite Bathroom", "TV", "Work Desk"],
      features: [
        "Free WiFi",
        "Room Service",
        "Air Conditioning",
        "Daily Cleaning",
      ],
    },
    {
      id: "6",
      name: "Family Suite",
      description:
        "Spacious family suite with connecting rooms, ideal for families with children.",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      rating: 4.7,
      capacity: 4,
      size: "55 sqm",
      category: "suite",
      amenities: [
        "Connecting Rooms",
        "King Bed + Twin Beds",
        "Living Area",
        "Kitchenette",
      ],
      features: ["Free WiFi", "Room Service", "Kids Menu", "Play Area Access"],
    },
  ];

  const categories = [
    { id: "all", name: "All Rooms" },
    { id: "standard", name: "Standard" },
    { id: "suite", name: "Suites" },
    { id: "villa", name: "Villas" },
  ];

  const filteredRooms =
    selectedCategory === "all"
      ? rooms
      : rooms.filter((room) => room.category === selectedCategory);

  return (
    <div className="rooms-page">
      {/* Hero Section */}
      <Header />

        <div className="hero-background">
          <img
            src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Hotel Rooms"
          />
          <div className="hero-overlay"></div>
        </div>
      <section className="rooms-hero">
        <div className="hero-content">
          <h1>Our Rooms & Suites</h1>
          <p>Discover comfort and luxury in every detail</p>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="section rooms-section">
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

          {/* Rooms Grid */}
          <div className="rooms-grid">
            {filteredRooms.map((room) => (
              <div key={room.id} className="room-card card">
                <div className="room-image">
                  <img src={room.image} alt={room.name} />
                  <div className="room-overlay">
                    <Link
                      to={`/booking/${room.id}`}
                      className="btn btn-primary"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>

                <div className="room-content">
                  <div className="room-header">
                    <h3 className="room-name">{room.name}</h3>
                    <div className="room-rating">
                      <Star size={16} fill="#FFD700" color="#FFD700" />
                      <span>{room.rating}</span>
                    </div>
                  </div>

                  <p className="room-description">{room.description}</p>

                  <div className="room-details">
                    <div className="detail-item">
                      <Users size={16} />
                      <span>{room.capacity} Guests</span>
                    </div>
                    <div className="detail-item">
                      <Bed size={16} />
                      <span>{room.size}</span>
                    </div>
                  </div>

                  <div className="room-amenities">
                    <h4>Amenities</h4>
                    <div className="amenities-list">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <span key={index} className="amenity-tag">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="room-footer">
                    <div className="room-price">
                      <span className="price-amount">£{room.price}</span>
                      <span className="price-period">per night</span>
                    </div>
                    <Link
                      to={`/booking/${room.id}`}
                      className="btn btn-secondary"
                    >
                      View Details
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
