import { useLocation } from "react-router-dom";
import { Button, Card, Typography } from "antd";

const { Title, Text } = Typography;

function Payment() {
    const location = useLocation();
    const bookingData = location.state?.bookingData; // Lấy dữ liệu từ state

    if (!bookingData) {
        return <div>Không tìm thấy thông tin đặt phòng.</div>;
    }

    const { roomTypeId, date, hotelName, roomTypeName, price } = bookingData;

    const handlePayment = () => {
        // Logic xử lý thanh toán (gọi API thanh toán, ví dụ: Stripe, PayPal)
        console.log("Xử lý thanh toán:", bookingData);
        alert("Thanh toán thành công!");
        // Có thể điều hướng về trang chủ hoặc trang xác nhận
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <Title level={2}>Thanh Toán</Title>
            <Card title="Thông tin đặt phòng">
                <Text strong>Tên khách sạn: </Text>
                <Text>{hotelName}</Text>
                <br />
                <Text strong>Loại phòng: </Text>
                <Text>{roomTypeName}</Text>
                <br />
                <Text strong>Ngày đặt: </Text>
                <Text>{date.join(" - ")}</Text>
                <br />
                <Text strong>Giá: </Text>
                <Text>{price} VND</Text>
            </Card>
            <Button
                type="primary"
                size="large"
                style={{ marginTop: "20px", width: "100%" }}
                onClick={handlePayment}
            >
                Thanh Toán Ngay
            </Button>
        </div>
    );
}

export default Payment;