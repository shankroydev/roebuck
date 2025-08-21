import React from "react";
import {
  Award,
  Heart,
  Shield,
  Users,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import "./About.css";
import Header from "../components/Header";

const About: React.FC = () => {
  const values = [
    {
      icon: <Heart size={40} />,
      title: "Hospitality",
      description:
        "We treat every guest like family, ensuring their comfort and satisfaction is our top priority.",
    },
    {
      icon: <Shield size={40} />,
      title: "Quality",
      description:
        "We maintain the highest standards of service and cleanliness in every aspect of our operations.",
    },
    {
      icon: <Award size={40} />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from room design to guest experience.",
    },
    {
      icon: <Users size={40} />,
      title: "Community",
      description:
        "We are proud to be part of the local community and contribute to its growth and development.",
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      position: "General Manager",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "With over 15 years of hospitality experience, Sarah leads our team with passion and dedication.",
    },
    {
      name: "Michael Chen",
      position: "Operations Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Michael ensures smooth operations and exceptional guest experiences through strategic planning.",
    },
    {
      name: "Emily Rodriguez",
      position: "Guest Relations Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      bio: "Emily specializes in creating personalized experiences and building lasting relationships with our guests.",
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
        <div className="hero-background">
          <img
            src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Hotel Lobby"
          />
          <div className="hero-overlay"></div>
        </div>
      <Header />

      <section className="about-hero">
        <div className="hero-content">
          <h1>About RoeBuck Inn</h1>
          <p>
            Discover our story, values, and commitment to exceptional
            hospitality
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-content">
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                Founded in 2010, RoeBuck Inn began as a vision to create a haven
                of luxury and comfort in the heart of London. What started as a
                small boutique hotel has grown into one of the city's most
                beloved destinations for travelers seeking an authentic and
                memorable experience.
              </p>
              <p>
                Our journey has been guided by a simple philosophy: to provide
                exceptional service, elegant accommodations, and warm
                hospitality that makes every guest feel at home. Over the years,
                we've welcomed guests from around the world, each with their own
                unique stories and expectations.
              </p>
              <p>
                Today, RoeBuck Inn stands as a testament to our commitment to
                excellence and our passion for creating unforgettable moments.
                We continue to evolve and innovate while staying true to the
                values that have made us a trusted name in hospitality.
              </p>
            </div>
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1521783988139-89397d761dce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Hotel History"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">
            The principles that guide everything we do
          </p>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section team-section">
        <div className="container">
          <h2 className="section-title">Meet Our Team</h2>
          <p className="section-subtitle">
            The dedicated professionals who make RoeBuck Inn special
          </p>
          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card card">
                <div className="team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <p className="team-position">{member.position}</p>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>
                We'd love to hear from you. Whether you have questions about
                your stay, want to make a reservation, or just want to say
                hello, we're here to help.
              </p>
              <div className="contact-details">
                <div className="contact-item">
                  <MapPin size={20} />
                  <div>
                    <h4>Address</h4>
                    <p>123 Luxury Street, London, UK</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Phone size={20} />
                  <div>
                    <h4>Phone</h4>
                    <p>+44 20 1234 5678</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Mail size={20} />
                  <div>
                    <h4>Email</h4>
                    <p>info@roebuckinn.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <Clock size={20} />
                  <div>
                    <h4>Hours</h4>
                    <p>24/7 Front Desk Service</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-image">
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Contact Us"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
