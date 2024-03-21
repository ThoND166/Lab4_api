const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const SinhVien = require('../models/sinhvienModel');

// Cấu hình Multer để lưu trữ tệp đính kèm
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu trữ file
    },
    filename: (req, file, cb) => {
        // Tạo tên file mới dựa trên ngày và giờ tải lên để tránh trùng lặp
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Khởi tạo upload với cấu hình storage
const upload = multer({ storage: storage });

// Route để hiển thị form thêm sinh viên
router.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

// Route để thêm sinh viên
router.post('/', upload.single('picture'), async (req, res) => {
    try {
        const { name } = req.body;
        
        // Kiểm tra xem file đã được tải lên chưa
        let picture = null;
        if (req.file) {
            picture = req.file.filename; // Lưu tên file vào picture
        }

        // Tạo đối tượng sinh viên và lưu vào cơ sở dữ liệu
        const sv = new SinhVien({ name, picture });
        await sv.save();

        // Chuyển hướng về trang chính sau khi thêm sinh viên thành công
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;
