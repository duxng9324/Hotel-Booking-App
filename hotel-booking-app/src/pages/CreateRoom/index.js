import { Col, Form, Row, Input, Button, InputNumber, Select, Tabs, Upload, TimePicker } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import './CreateRoom.scss';
import { createRoom } from '../../Service/RoomService';
import { useState } from 'react';
import moment from 'moment';
const { Option } = Select;
const { TabPane } = Tabs;

function CreateRoom() {
  const [formRoom] = Form.useForm();
  const [formHotel] = Form.useForm();
  const [hotels, setHotels] = useState([
    { id: '111abc', name: 'Ocean Breeze Hotel' },
    // Thêm khách sạn khác nếu cần
  ]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Danh sách tiện ích mẫu dựa trên JSON
  const availableAmenities = [
    { id: 'amenity1', name: 'Ban công' },
    { id: 'amenity2', name: 'View biển' },
    { id: 'amenity3', name: 'TV thông minh' },
    { id: 'amenity4', name: 'Máy pha cà phê' },
    { id: 'amenity5', name: 'Bồn tắm' },
    { id: 'amenity6', name: 'Wi-Fi tốc độ cao' },
    { id: 'amenity7', name: 'Máy lạnh' },
    { id: 'amenity8', name: 'Tủ lạnh mini' },
    { id: 'amenity9', name: 'Két sắt' },
    { id: 'amenity10', name: 'Đèn ngủ' },
    { id: 'amenity11', name: 'Bàn làm việc' },
    { id: 'amenity12', name: 'Máy sấy tóc' },
    { id: 'amenity13', name: 'Dép đi trong nhà' },
    { id: 'amenity14', name: 'Bình nước nóng' },
    { id: 'amenity15', name: 'Rèm cản sáng' }
  ];
  
  // Danh sách dịch vụ mẫu dựa trên JSON
  const availableServices = [
    'Xe đưa đón sân bay',
    'Phòng gia đình',
    'Phòng không hút thuốc',
    'Chỗ đỗ xe miễn phí',
    'Lễ tân 24 giờ',
    'Sân thượng / hiên',
    'Dịch vụ phòng',
    'Thang máy',
    'Giặt ủi',
    'Spa & massage',
    'Phòng gym',
    'Hồ bơi ngoài trời',
    'Cho thuê xe máy / ô tô',
    'Dịch vụ giữ hành lý',
    'Quầy tour du lịch',
    'Bữa sáng tại phòng',
    'Trợ giúp đặc biệt (concierge)',
    'Dịch vụ trông trẻ',
    'Wi-Fi miễn phí toàn khách sạn',
    'Dọn phòng hàng ngày'
  ];
  
  const rules = [
    {
      required: true,
      message: 'Vui lòng nhập thông tin này!',
    },
  ];

  const handleCreateHotel = async (values) => {
    const hotelData = {
      id: `hotel-${Date.now()}`,
      name: values.name,
      thumbnail: values.thumbnail?.file?.response?.url || '',
      address: values.address,
      linkMap: values.linkMap,
      description: values.description,
      rate: values.rate,
      checkInTime: values.checkInTime ? moment(values.checkInTime).format('HH:mm') : '',
      checkOutTime: values.checkOutTime ? moment(values.checkOutTime).format('HH:mm') : '',
      service: values.service || [],
      images: values.images?.fileList?.map((file) => file.response?.url || file.url) || [],
      roomTypes: [], // Khởi tạo mảng rỗng cho roomTypes
    };

    // Giả lập gọi API createHotel
    try {
      // Thay bằng API thật: const response = await createHotel(hotelData);
      const response = { success: true, data: hotelData }; // Mock response
      if (response.success) {
        setHotels([...hotels, { id: hotelData.id, name: hotelData.name }]);
        setSelectedHotel(hotelData.id);
        alert('Thêm khách sạn thành công');
        formHotel.resetFields();
      } else {
        alert('Thêm khách sạn thất bại');
      }
    } catch (error) {
      alert('Lỗi khi thêm khách sạn');
    }
  };

  const handleCreateRoom = async (values) => {
    if (!selectedHotel) {
      alert('Vui lòng chọn hoặc tạo khách sạn trước!');
      return;
    }

    const roomData = {
      id: `room-${Date.now()}`,
      name: values.name,
      quantityBed: values.quantityBed,
      quantityPeople: values.quantityPeople,
      roomArea: values.roomArea,
      price: values.price,
      availableRooms: values.availableRooms,
      amenities: values.amenities.map((amenityId) => ({
        id: `amenity-${Date.now()}-${amenityId}`,
        name: availableAmenities.find((a) => a.id === amenityId)?.name || amenityId,
        roomTypeId: `room-${Date.now()}`,
      })),
      hotelId: selectedHotel,
    };

    const response = await createRoom(roomData);
    if (response) {
      alert('Thêm phòng thành công');
      formRoom.resetFields();
      setSelectedHotel(null); // Reset lựa chọn khách sạn
    } else {
      alert('Thêm phòng thất bại');
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <h2>Quản lý khách sạn và phòng</h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Thêm khách sạn mới" key="1">
          <Form onFinish={handleCreateHotel} layout="vertical" form={formHotel}>
            <Row gutter={[20, 20]}>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Tên khách sạn" name="name" rules={rules}>
                  <Input placeholder="Ví dụ: Ocean Breeze Hotel" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item
                  label="Hình ảnh đại diện"
                  name="thumbnail"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: false }]}
                >
                  <Upload name="thumbnail" action="/upload" listType="picture">
                    <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Địa chỉ" name="address" rules={rules}>
                  <Input placeholder="Ví dụ: 88 Đường Biển, Đà Nẵng, Việt Nam" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Link bản đồ" name="linkMap" rules={[{ required: false }]}>
                  <Input placeholder="Ví dụ: https://www.google.com/maps/..." />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mô tả" name="description" rules={[{ required: false }]}>
                  <Input.TextArea showCount maxLength={2000} placeholder="Mô tả chi tiết về khách sạn" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Đánh giá" name="rate" rules={rules}>
                  <InputNumber min={0} max={5} step={0.1} placeholder="Ví dụ: 5.0" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Giờ check-in" name="checkInTime" rules={[{ required: false }]}>
                  <TimePicker format="HH:mm" placeholder="Chọn giờ" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Giờ check-out" name="checkOutTime" rules={[{ required: false }]}>
                  <TimePicker format="HH:mm" placeholder="Chọn giờ" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Dịch vụ" name="service" rules={[{ required: false }]}>
                  <Select mode="multiple" placeholder="Chọn dịch vụ">
                    {availableServices.map((service) => (
                      <Option key={service} value={service}>
                        {service}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Hình ảnh khách sạn"
                  name="images"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: false }]}
                >
                  <Upload name="images" action="/upload" listType="picture" multiple>
                    <Button icon={<UploadOutlined />}>Tải lên hình ảnh</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tạo khách sạn
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
        <TabPane tab="Thêm phòng mới" key="2">
          <Form onFinish={handleCreateRoom} layout="vertical" form={formRoom}>
            <Row gutter={[20, 20]}>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Khách sạn" name="hotelId" rules={rules}>
                  <Select
                    placeholder="Chọn khách sạn"
                    onChange={(value) => setSelectedHotel(value)}
                  >
                    {hotels.map((hotel) => (
                      <Option key={hotel.id} value={hotel.id}>
                        {hotel.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Tên phòng" name="name" rules={rules}>
                  <Input placeholder="Ví dụ: Phòng Ocean View" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Số lượng giường" name="quantityBed" rules={rules}>
                  <InputNumber min={1} placeholder="Ví dụ: 1" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Số người tối đa" name="quantityPeople" rules={rules}>
                  <InputNumber min={1} placeholder="Ví dụ: 2" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Diện tích phòng (m²)" name="roomArea" rules={rules}>
                  <InputNumber min={1} placeholder="Ví dụ: 45" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Giá (VND)" name="price" rules={rules}>
                  <InputNumber min={0} step={1000} placeholder="Ví dụ: 1450000" />
                </Form.Item>
              </Col>
              <Col span={24} xxl={12} xl={12} lg={12} md={24}>
                <Form.Item label="Số phòng khả dụng" name="availableRooms" rules={rules}>
                  <InputNumber min={0} placeholder="Ví dụ: 5" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Tiện ích" name="amenities" rules={rules}>
                  <Select mode="multiple" placeholder="Chọn tiện ích">
                    {availableAmenities.map((amenity) => (
                      <Option key={amenity.id} value={amenity.id}>
                        {amenity.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Tạo phòng
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </TabPane>
      </Tabs>
    </>
  );
}

export default CreateRoom;