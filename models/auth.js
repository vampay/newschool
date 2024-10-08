const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        role: { type: String, default: 'admin' }
    },
    {
        timestamps: true,   // สร้าง createdAt และ updatedAt อัตโนมัติ
        versionKey: false    // ปิดใช้งานฟิลด์ __v ที่ติดตามเวอร์ชันเอกสาร
    }
);

const User = mongoose.model('auth', userSchema);

module.exports = User;
