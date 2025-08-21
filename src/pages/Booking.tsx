import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../contexts/AuthContext";
import { Calendar, Users, CreditCard, CheckCircle } from "lucide-react";
import "./Booking.css";

interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string | undefined;
}

const schema = yup.object({
  checkIn: yup.string().required("Check-in date is required"),
  checkOut: yup.string().required("Check-out date is required"),
  guests: yup
    .number()
    .min(1, "At least 1 guest required")
    .max(4, "Maximum 4 guests")
    .required("Number of guests is required"),
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  specialRequests: yup.string(),
});

const Booking: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState<any>(null);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:yupResolver(schema),
    defaultValues: {
      guests: 1,
      firstName: user?.name?.split(" ")[0] || "",
      lastName: user?.name?.split(" ")[1] || "",
      email: user?.email || "",
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");
  const guests = watch("guests");

  // Mock room data - in real app, this would come from an API
  useEffect(() => {
    const rooms = [
      {
        id: "1",
        name: "Deluxe Suite",
        description:
          "Spacious suite with city views, featuring a king-size bed, separate living area, and luxury amenities.",
        price: 299,
        image:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 2,
        amenities: [
          "King Bed",
          "City View",
          "Living Area",
          "Balcony",
          "Free WiFi",
          "Room Service",
        ],
      },
      {
        id: "2",
        name: "Executive Room",
        description:
          "Elegant room with modern furnishings, perfect for business travelers or romantic getaways.",
        price: 199,
        image:
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        capacity: 2,
        amenities: [
          "Queen Bed",
          "Work Desk",
          "City View",
          "En-suite Bathroom",
          "Free WiFi",
          "Coffee Maker",
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
        capacity: 3,
        amenities: [
          "King Bed",
          "Panoramic View",
          "Living Room",
          "Dining Area",
          "Butler Service",
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
        capacity: 4,
        amenities: [
          "Multiple Bedrooms",
          "Private Garden",
          "Kitchen",
          "Terrace",
          "Private Pool",
          "Chef Service",
        ],
      },
    ];

    const selectedRoom = rooms.find((r) => r.id === roomId);
    setRoom(selectedRoom);
  }, [roomId]);

  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    return room ? nights * room.price : 0;
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const booking = {
        id: Date.now().toString(),
        room: room,
        ...data,
        total: calculateTotal(),
        nights: calculateNights(),
        status: "confirmed",
        bookingDate: new Date().toISOString(),
      };

      setBookingDetails(booking);
      setIsBookingComplete(true);
    } catch (error) {
      console.error("Booking failed:", error);
    }
  };

  if (!room) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (isBookingComplete && bookingDetails) {
    return (
      <div className="booking-success">
        <div className="container">
          <div className="success-card card">
            <div className="success-icon">
              <CheckCircle size={60} />
            </div>
            <h1>Booking Confirmed!</h1>
            <p>
              Your reservation has been successfully confirmed. We look forward
              to welcoming you!
            </p>

            <div className="booking-summary">
              <h3>Booking Details</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <strong>Booking ID:</strong>
                  <span>{bookingDetails.id}</span>
                </div>
                <div className="summary-item">
                  <strong>Room:</strong>
                  <span>{bookingDetails.room.name}</span>
                </div>
                <div className="summary-item">
                  <strong>Check-in:</strong>
                  <span>
                    {new Date(bookingDetails.checkIn).toLocaleDateString()}
                  </span>
                </div>
                <div className="summary-item">
                  <strong>Check-out:</strong>
                  <span>
                    {new Date(bookingDetails.checkOut).toLocaleDateString()}
                  </span>
                </div>
                <div className="summary-item">
                  <strong>Guests:</strong>
                  <span>{bookingDetails.guests}</span>
                </div>
                <div className="summary-item">
                  <strong>Total:</strong>
                  <span>£{bookingDetails.total}</span>
                </div>
              </div>
            </div>

            <div className="success-actions">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/manage-bookings")}
              >
                View My Bookings
              </button>
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <div className="container">
        <div className="booking-content">
          {/* Room Details */}
          <div className="room-details card">
            <div className="room-image">
              <img src={room.image} alt={room.name} />
            </div>
            <div className="room-info">
              <h2>{room.name}</h2>
              <p>{room.description}</p>
              <div className="room-amenities">
                <h4>Amenities</h4>
                <div className="amenities-list">
                  {room.amenities.map((amenity: string, index: number) => (
                    <span key={index} className="amenity-tag">
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="booking-form card">
            <h2>Complete Your Booking</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="checkIn" className="form-label">
                    <Calendar size={16} />
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    id="checkIn"
                    {...register("checkIn")}
                    className={`form-input ${errors.checkIn ? "error" : ""}`}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {errors.checkIn && (
                    <span className="error-message">
                      {errors.checkIn.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="checkOut" className="form-label">
                    <Calendar size={16} />
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    id="checkOut"
                    {...register("checkOut")}
                    className={`form-input ${errors.checkOut ? "error" : ""}`}
                    min={checkIn || new Date().toISOString().split("T")[0]}
                  />
                  {errors.checkOut && (
                    <span className="error-message">
                      {errors.checkOut.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="guests" className="form-label">
                  <Users size={16} />
                  Number of Guests
                </label>
                <select
                  id="guests"
                  {...register("guests")}
                  className={`form-input ${errors.guests ? "error" : ""}`}
                >
                  {[...Array(room.capacity)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
                {errors.guests && (
                  <span className="error-message">{errors.guests.message}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    {...register("firstName")}
                    className={`form-input ${errors.firstName ? "error" : ""}`}
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <span className="error-message">
                      {errors.firstName.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    {...register("lastName")}
                    className={`form-input ${errors.lastName ? "error" : ""}`}
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <span className="error-message">
                      {errors.lastName.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register("email")}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <span className="error-message">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    {...register("phone")}
                    className={`form-input ${errors.phone ? "error" : ""}`}
                    placeholder="Enter your phone number"
                  />
                  {errors.phone && (
                    <span className="error-message">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="specialRequests" className="form-label">
                  Special Requests
                </label>
                <textarea
                  id="specialRequests"
                  {...register("specialRequests")}
                  className="form-input form-textarea"
                  placeholder="Any special requests or preferences..."
                  rows={3}
                />
              </div>

              {/* Price Summary */}
              <div className="price-summary">
                <h3>Price Summary</h3>
                <div className="price-details">
                  <div className="price-item">
                    <span>Room Rate (per night)</span>
                    <span>£{room.price}</span>
                  </div>
                  <div className="price-item">
                    <span>Number of Nights</span>
                    <span>{calculateNights()}</span>
                  </div>
                  <div className="price-item total">
                    <span>Total</span>
                    <span>£{calculateTotal()}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-secondary booking-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
