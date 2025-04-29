import { Col, Row } from 'antd';
import './grid.scss';
import MultiLine from '../MultiLine';
import DemoRadar from '../Radar';

// StatsCard
const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="stats-card col">
      <div className="stats-icon">{icon}</div>
      <div>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </div>
  );
};

// BookingTable
const BookingTable = () => {
  const bookings = [
    { id: 1, customer: "John Doe", room: "Deluxe", checkIn: "2025-04-20", checkOut: "2025-04-25", status: "Confirmed" },
    { id: 2, customer: "Jane Smith", room: "Suite", checkIn: "2025-04-22", checkOut: "2025-04-27", status: "Pending" },
    { id: 3, customer: "Mike Johnson", room: "Standard", checkIn: "2025-04-23", checkOut: "2025-04-26", status: "Cancelled" },
  ];

  return (
    <div className="booking-table col box-8">
      <h3>Đặt phòng gần đây</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Phòng</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.id}</td>
              <td>{booking.customer}</td>
              <td>{booking.room}</td>
              <td>{booking.checkIn}</td>
              <td>{booking.checkOut}</td>
              <td>
                <span
                  className={`status ${
                    booking.status === "Confirmed"
                      ? "status-confirmed"
                      : booking.status === "Pending"
                      ? "status-pending"
                      : "status-cancelled"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// AvailableRooms
const AvailableRooms = () => {
  const rooms = [
    { id: 101, type: "Deluxe", status: "Available" },
    { id: 102, type: "Suite", status: "Available" },
    { id: 103, type: "Standard", status: "Available" },
  ];

  return (
    <div className="available-rooms col box-7">
      <h3>Phòng trống</h3>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            Phòng {room.id} - {room.type}: <span className="status-available">{room.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// FeedbackSummary
const FeedbackSummary = () => {
  return (
    <div className="feedback-summary col box-9">
      <h3>Phản hồi khách hàng</h3>
      <p>5 phản hồi mới cần xử lý.</p>
    </div>
  );
};

// Notifications
const Notifications = () => {
  return (
    <div className="notifications col box-10">
      <h3>Thông báo</h3>
      <p>3 thông báo mới.</p>
    </div>
  );
};

// AdditionalStats
const AdditionalStats = () => {
  return (
    <div className="additional-stats col box-11">
      <h3>Thống kê bổ sung</h3>
      <p>Tỷ lệ hủy phòng: 10%</p>
    </div>
  );
};

// Main Component
function LearnGrid() {
  return (
    <div className="dashboard">
      <main className="dashboard-main">
        <Row gutter={[20, 25]}>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <StatsCard title="Tổng đặt phòng" value="150" icon="📋" />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <StatsCard title="Doanh thu" value="$12,500" icon="💰" />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
            <StatsCard title="Khách hàng mới" value="30" icon="👥" />
          </Col>
          <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
            <div className="col box-5">
              <MultiLine />
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <div className="col box-6">
              <DemoRadar />
            </div>
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <AvailableRooms />
          </Col>
          <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
            <BookingTable />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <FeedbackSummary />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <Notifications />
          </Col>
          <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
            <AdditionalStats />
          </Col>
        </Row>
      </main>
    </div>
  );
}

export default LearnGrid;