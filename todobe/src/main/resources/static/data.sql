INSERT INTO todos (title, description, completed, start_date, expiration_date, tags)
VALUES
-- Các công việc đang làm
('Nộp báo cáo dự án', 'Hoàn thiện bản cuối cùng và gửi cho trưởng nhóm.', false, '2025-04-11 09:00:00', '2025-04-12 17:00:00', 'công việc,gấp'),
('Gọi điện cho mẹ', 'Cuộc gọi trò chuyện hằng tuần với mẹ.', false, '2025-04-12 10:00:00', '2025-04-13 18:00:00', 'cá nhân,gia đình'),
('Họp nhóm dự án', 'Cập nhật tiến độ công việc với các thành viên.', false, '2025-04-13 08:00:00', '2025-04-14 16:00:00', 'công việc,họp'),
('Thiết kế giao diện', 'Hoàn tất bản thiết kế cho tính năng mới.', false, '2025-04-14 11:00:00', '2025-04-15 19:00:00', 'thiết kế,deadline'),
('Chuẩn bị demo cho khách hàng', 'Xem lại slide và luyện tập trình bày.', false, '2025-04-15 09:30:00', '2025-04-16 17:30:00', 'trình bày,quan trọng'),

-- Các công việc đã hoàn thành
('Mua đồ siêu thị', 'Sữa, trứng, bánh mì, trái cây.', true, '2025-04-10 09:00:00', '2025-04-10 17:00:00', 'nhà cửa,mua sắm'),
('Thanh toán tiền điện', 'Thanh toán qua ứng dụng ngân hàng.', true, '2025-04-09 10:00:00', '2025-04-09 18:00:00', 'cá nhân,tài chính'),
('Lên kế hoạch tuần mới', 'Sắp xếp các công việc ưu tiên.', true, '2025-04-08 08:00:00', '2025-04-08 16:00:00', 'công việc,kế hoạch'),
('Gửi hồ sơ thuế', 'Nộp đầy đủ giấy tờ khai báo thuế online.', true, '2025-04-07 11:00:00', '2025-04-07 19:00:00', 'quan trọng,tài chính'),
('Dọn dẹp phòng khách', 'Hút bụi và lau sàn.', true, '2025-04-06 09:30:00', '2025-04-06 17:30:00', 'nhà cửa,việc nhà'),

-- Các công việc đã hết hạn
('Gia hạn bằng lái xe', 'Lỡ lịch hẹn, cần đặt lại.', false, '2025-04-01 09:00:00', '2025-04-02 17:00:00', 'cá nhân,gấp'),
('Tập thể dục', 'Đã lên kế hoạch nhưng không đi được.', false, '2025-04-02 10:00:00', '2025-04-03 18:00:00', 'sức khỏe,vận động'),
('Liên hệ nhà cung cấp', 'Kiểm tra tình trạng giao hàng.', false, '2025-04-03 08:00:00', '2025-04-04 16:00:00', 'công việc,liên hệ'),
('Chuẩn bị quà sinh nhật', 'Chưa kịp mua, phải bù lại sau.', false, '2025-04-04 11:00:00', '2025-04-05 19:00:00', 'cá nhân,món quà'),
('Sửa phanh xe đạp', 'Quên mang xe đi sửa đúng lịch.', false, '2025-04-05 09:30:00', '2025-04-06 17:30:00', 'phương tiện,việc vặt'),

-- Các công việc hỗn hợp
('Đặt lịch khám răng', 'Lịch kiểm tra và vệ sinh răng miệng định kỳ.', false, '2025-04-16 09:00:00', '2025-04-17 17:00:00', 'sức khỏe,nhắc nhở'),
('Gửi thiệp sinh nhật', 'Đã gửi qua bưu điện, đến kịp ngày sinh nhật.', true, '2025-04-15 10:00:00', '2025-04-15 18:00:00', 'cá nhân,hoàn thành'),
('Kiểm tra rò rỉ nước', 'Định gọi thợ nhưng chưa làm.', false, '2025-04-14 08:00:00', '2025-04-14 16:00:00', 'nhà cửa,bảo trì'),
('Cập nhật portfolio', 'Thêm các dự án thiết kế mới nhất.', false, '2025-04-13 11:00:00', '2025-04-14 19:00:00', 'công việc,thiết kế'),
('Lấy đồ giặt ủi', 'Đã lấy xong trước khi tan ca.', true, '2025-04-12 09:30:00', '2025-04-12 17:30:00', 'cá nhân,hoàn thành');
