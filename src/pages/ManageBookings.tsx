import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  Calendar,
  Users,
  MapPin,
  Edit,
  Trash2,
  Eye,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import "./ManageBookings.css";

interface Booking {
  id: string;
  room: {
    name: string;
    image: string;
    price: number;
  };
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: "confirmed" | "cancelled" | "completed";
  bookingDate: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

const ManageBookings: React.FC = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock bookings data - in real app, this would come from an API
  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: "1",
        room: {
          name: "Deluxe Suite",
          image:
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: 299,
        },
        checkIn: "2024-02-15",
        checkOut: "2024-02-18",
        guests: 2,
        total: 897,
        status: "confirmed",
        bookingDate: "2024-01-15T10:30:00Z",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+44 20 1234 5678",
        specialRequests: "Early check-in if possible",
      },
      {
        id: "2",
        room: {
          name: "Executive Room",
          image:
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: 199,
        },
        checkIn: "2024-01-20",
        checkOut: "2024-01-22",
        guests: 1,
        total: 398,
        status: "completed",
        bookingDate: "2024-01-10T14:20:00Z",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        phone: "+44 20 9876 5432",
      },
      {
        id: "3",
        room: {
          name: "Premium Suite",
          image:
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          price: 399,
        },
        checkIn: "2024-03-10",
        checkOut: "2024-03-15",
        guests: 3,
        total: 1995,
        status: "confirmed",
        bookingDate: "2024-01-20T09:15:00Z",
        firstName: "Michael",
        lastName: "Johnson",
        email: "michael.johnson@example.com",
        phone: "+44 20 5555 1234",
      },
    ];

    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={16} className="status-icon confirmed" />;
      case "completed":
        return <Clock size={16} className="status-icon completed" />;
      case "cancelled":
        return <X size={16} className="status-icon cancelled" />;
      default:
        return <AlertCircle size={16} className="status-icon" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "var(--primary-teal)";
      case "completed":
        return "#28a745";
      case "cancelled":
        return "#dc3545";
      default:
        return "var(--text-muted)";
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetails(true);
  };

  const handleCancelBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (selectedBooking) {
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id
            ? { ...booking, status: "cancelled" as const }
            : booking
        )
      );
      setShowCancelModal(false);
      setSelectedBooking(null);
    }
  };

  const closeModal = () => {
    setShowDetails(false);
    setShowCancelModal(false);
    setSelectedBooking(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="manage-bookings-page">
      <div className="container">
        <div className="page-header">
          <h1>My Bookings</h1>
          <p>Manage your reservations and view booking details</p>
        </div>

        {bookings.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📅</div>
            <h2>No Bookings Found</h2>
            <p>
              You haven't made any bookings yet. Start exploring our rooms and
              make your first reservation!
            </p>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card card">
                <div className="booking-image">
                  <img src={booking.room.image} alt={booking.room.name} />
                  <div className="booking-status">
                    {getStatusIcon(booking.status)}
                    <span style={{ color: getStatusColor(booking.status) }}>
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="booking-content">
                  <h3>{booking.room.name}</h3>

                  <div className="booking-details">
                    <div className="detail-item">
                      <Calendar size={16} />
                      <span>
                        {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="detail-item">
                      <Users size={16} />
                      <span>
                        {booking.guests}{" "}
                        {booking.guests === 1 ? "Guest" : "Guests"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <MapPin size={16} />
                      <span>£{booking.total}</span>
                    </div>
                  </div>

                  <div className="booking-actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => handleViewDetails(booking)}
                    >
                      <Eye size={16} />
                      View Details
                    </button>
                    {booking.status === "confirmed" && (
                      <button
                        className="btn btn-outline danger"
                        onClick={() => handleCancelBooking(booking)}
                      >
                        <Trash2 size={16} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {showDetails && selectedBooking && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Booking Details</h2>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-section">
                <h3>Room Information</h3>
                <div className="room-info">
                  <img
                    src={selectedBooking.room.image}
                    alt={selectedBooking.room.name}
                  />
                  <div>
                    <h4>{selectedBooking.room.name}</h4>
                    <p>£{selectedBooking.room.price} per night</p>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Stay Details</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Check-in:</strong>
                    <span>
                      {new Date(selectedBooking.checkIn).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Check-out:</strong>
                    <span>
                      {new Date(selectedBooking.checkOut).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Guests:</strong>
                    <span>{selectedBooking.guests}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Total:</strong>
                    <span>£{selectedBooking.total}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Status:</strong>
                    <span
                      style={{ color: getStatusColor(selectedBooking.status) }}
                    >
                      {selectedBooking.status.charAt(0).toUpperCase() +
                        selectedBooking.status.slice(1)}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Booking Date:</strong>
                    <span>
                      {new Date(
                        selectedBooking.bookingDate
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h3>Guest Information</h3>
                <div className="detail-grid">
                  <div className="detail-item">
                    <strong>Name:</strong>
                    <span>
                      {selectedBooking.firstName} {selectedBooking.lastName}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong>
                    <span>{selectedBooking.email}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Phone:</strong>
                    <span>{selectedBooking.phone}</span>
                  </div>
                </div>
              </div>

              {selectedBooking.specialRequests && (
                <div className="detail-section">
                  <h3>Special Requests</h3>
                  <p>{selectedBooking.specialRequests}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancel Booking Modal */}
      {showCancelModal && selectedBooking && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Cancel Booking</h2>
              <button className="modal-close" onClick={closeModal}>
                <X size={24} />
              </button>
            </div>

            <div className="modal-body">
              <p>
                Are you sure you want to cancel your booking for{" "}
                <strong>{selectedBooking.room.name}</strong>?
              </p>
              <p>This action cannot be undone.</p>

              <div className="modal-actions">
                <button className="btn btn-outline" onClick={closeModal}>
                  Keep Booking
                </button>
                <button
                  className="btn btn-secondary danger"
                  onClick={confirmCancel}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
