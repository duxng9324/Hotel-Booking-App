import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHotelByID } from "../../Service/HotelService";
import { FaLocationDot } from "react-icons/fa6";
import { Button, Col, DatePicker, Flex, Form, Row, Table, Tag, Tooltip } from "antd";
import ImageSlider from "../../components/ImageSlider";
import './Detail.scss';
import StarRating from "../../components/StarRating";
import { CheckCircleOutlined } from "@ant-design/icons";
import { TbParkingCircle } from "react-icons/tb";

function Detail() {
    const [data, setData] = useState();
    const param = useParams();
    const [form] = Form.useForm();
    const [time, setTime] = useState();
    const [selectedRoomTypeId, setSelectedRoomTypeId] = useState(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHotel = async () => {
            const response = await getHotelByID(param.id);
            setData(response);
        };
        fetchHotel();
    }, [param]);

    const handleDatePicker = (e) => {
        setTime(e);
    };

    const handleScrollToBookRoom = () => {
        const bookRoomSection = document.getElementById("bookRoom");
        if (bookRoomSection) {
            bookRoomSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleBookRoom = (id) => {
        setSelectedRoomTypeId(id); 
        form.submit(); 
    };

    const handleFormSubmit = () => {
        if (time && selectedRoomTypeId) {
            const formattedDates = time.map(date => date.format("DD/MM/YYYY"));
            const bookingData = {
                roomId: param.id,
                roomTypeId: selectedRoomTypeId,
                date: formattedDates,
            };

            navigate("/payment", { state: { bookingData } });
        }
    };

    const dataSource = data?.roomTypes ?? [];

    const columns = [
        {
            title: 'Loại chỗ nghỉ',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng giường',
            dataIndex: 'quantityBed',
            key: 'quantityBed',
        },
        {
            title: 'Số lượng khách',
            dataIndex: 'quantityPeople',
            key: 'quantityPeople',
        },
        {
            title: 'Diện tích',
            dataIndex: 'roomArea',
            key: 'roomArea',
            render: roomArea => (<div>{roomArea} m²</div>),
        },
        {
            title: 'Các tiện nghi',
            dataIndex: 'amenities',
            key: 'amenities',
            render: amenities => (
                <div>
                    {amenities && amenities.map((item) => (
                        <Tag key={item.id || item.name} color="processing">
                            {item.name}
                        </Tag>
                    ))}
                </div>
            ),
        },
        {
            title: 'Giá ',
            dataIndex: 'price',
            key: 'price',
            render: price => (<div>{price} VND</div>),
        },
        {
            dataIndex: 'id',
            render: (id) => (
                <Tooltip title={time ? null : 'Hãy chọn ngày đặt trước !!!'}>
                    <Button
                        type="primary"
                        disabled={!time}
                        onClick={() => handleBookRoom(id)}
                    >
                        Đặt ngay
                    </Button>
                </Tooltip>
            ),
            key: 'action',
        },
    ];

    return (
        <>
            {!data ? (
                <div>loading</div>
            ) : (
                <>
                    <h1 className="title">{data.name} <StarRating rate={data.rate} /></h1>
                    <div className="address">
                        <a href={data.linkMap} target="blank">
                            <FaLocationDot style={{ marginRight: "10px" }} />
                            {data.address}
                        </a>
                    </div>
                    <Row gutter={[20, 20]}>
                        <Col xxl={18} xl={18} lg={18} md={24} sm={24} span={24}>
                            <div className="slide">
                                <ImageSlider images={data.images} />
                            </div>
                        </Col>
                        <Col xxl={6} xl={6} lg={6} md={24} sm={24} span={24}>
                            <div className="box-evaluate">
                                <div className="box-evaluate__1">
                                    <Button type="primary" onClick={handleScrollToBookRoom}>
                                        Đặt ngay
                                    </Button>
                                </div>
                                <div>
                                    {data.rate >= 4 ? (
                                        <div className="box-evaluate__2">
                                            <div>
                                                <div className="type">VIP</div>
                                                <div className='quantity-review'>lượt đánh giá</div>
                                            </div>
                                            <div className="rateStar">{data.rate} sao</div>
                                        </div>
                                    ) : (
                                        <div className="box-evaluate__2">
                                            <div>
                                                <div className="type">Thường</div>
                                                <div className='quantity-review'>lượt đánh giá</div>
                                            </div>
                                            <div className="rateStar">{data.rate} sao</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <iframe
                                className="map"
                                title="bản đồ"
                                src={data.linkMap}
                                allowFullScreen={true}
                                referrerPolicy="no-referrer-when-downgrade"
                                loading="lazy"
                                width='100%'
                                height='272px'
                            ></iframe>
                        </Col>
                    </Row>
                    <Row gutter={[30, 20]}>
                        <Col xxl={16} xl={16} lg={16} md={24} sm={24} span={24}>
                            <div className="description">
                                {data.description}
                            </div>
                            <div>
                                <h3>Các tiện nghi được ưa chuộng nhất </h3>
                                <div className="service">
                                    <Flex gap="4px 0" wrap>
                                        {data.service && data.service.map((item) => (
                                            <Tag
                                                key={item.id || item}
                                                className="service__item"
                                                icon={<CheckCircleOutlined />}
                                                color="processing"
                                            >
                                                {item}
                                            </Tag>
                                        ))}
                                    </Flex>
                                </div>
                            </div>
                        </Col>
                        <Col xxl={8} xl={8} lg={8} md={0} sm={0} span={0}>
                            <div className="box-outstanding">
                                <h3>Điểm nổi bật của chỗ nghỉ</h3>
                                <div className="wrap">
                                    <TbParkingCircle className="icon-park" />
                                    <p className="desc">Có bãi đậu xe riêng miễn phí ở khách sạn này</p>
                                </div>
                                <h3>Khách trung thành</h3>
                                <p className="desc">Chỗ nghỉ này có nhiều khách trở lại hơn hầu hết các chỗ nghỉ khác.</p>
                                <Button type="primary" onClick={handleScrollToBookRoom} block>
                                    Đặt ngay
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={handleFormSubmit}
                    >
                        <Form.Item
                            name="dateRange"
                            rules={[
                                {
                                    required: true,
                                    message: 'Hãy chọn ngày đặt phòng',
                                },
                            ]}
                        >
                            <DatePicker.RangePicker
                                className="date-picker"
                                onChange={handleDatePicker}
                                format='DD-MM-YYYY'
                            />
                        </Form.Item>
                        <Form.Item>
                            <Table id="bookRoom" dataSource={dataSource} columns={columns} rowKey='id' />
                        </Form.Item>
                    </Form>
                    <h1>Đánh giá của khách</h1>
                </>
            )}
        </>
    );
}

export default Detail;