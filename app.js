const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const cors = require('cors');

const School = require('./models/School');

app.use(express.json());


dotenv.config();//บรรทัดนี้โหลดตัวแปรสภาพแวดล้อมจาก.envไฟล์ลงใน ไฟล์
mongoose.connect(process.env.MONGO_DB_URL, {})
/*บรรทัดนี้พยายามเชื่อมต่อกับฐานข้อมูลMongoDB โดยใช้ Mongoose ซึ่งเป็นไลบรารี ODM  */
.then(() => {console.log('MongoDB connected');
}).catch(err => console.log(err));

const  participateRoutes = require("./routes/participate");
const  schoolRoutes = require("./routes/school");
const authRoutes = require ("./routes/auth");
const userRoutes = require('./routes/user');

app.use("/api/participate", participateRoutes);
app.use("/api/school", schoolRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);






//เชื่อม
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views','index.html'));
});
//user
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'view_user', 'homepage_user.html'));
});

app.get('/InForm', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'information.html'));
});

app.get('/APIPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'View_information.html'));
});

app.get('/APIPage_edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'edit-info.html'));
});

app.get('/APIPage_show', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'edit_infoshow.html'));
});
app.get('/edit-info', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'edit-info.html'));
});





app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'view_admin', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'view_admin', 'register.html'));
});



//admin
app.get('/homepage_admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'view_admin', 'homepage_admin.html'));
});

app.get('/InFormAdmin', (req, res) => {
    res.sendFile(path.join(__dirname, 'view_admin', 'InFormAdmin.html'));
});

app.get('/edit-infoAdmin', (req, res) => {
    res.sendFile(path.join(__dirname, 'view_admin', 'edit-info.html'));
});

//edit
app.put('/api/school/:id', async (req, res) => {
    try {
        // Existing code
    } catch (error) {
        console.error('Detailed Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error', details: error.message });
    }
});

app.put('/api/school/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Validate incoming data
        const requiredFields = ['school_name', 'date', 'startTime', 'endTime', 'location', 'student_count', 'teacher_name', 'phone_teacher', 'faculty'];
        for (const field of requiredFields) {
            if (!updateData[field]) {
                return res.status(400).json({ success: false, message: `Missing required field: ${field}` });
            }
        }

        // Update the record in the database
        const updatedSchool = await School.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedSchool) {
            return res.status(404).json({ success: false, message: 'School not found' });
        }

        res.json({ success: true, data: updatedSchool });
    } catch (error) {
        console.error('Error updating school:', error);
        res.status(500).json({ success: false, message: 'Internal server error', details: error.message });
    }
});



app.delete('/api/school/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await School.findByIdAndDelete(id);
        
        if (result) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'ไม่พบข้อมูล' }); // No data found
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.json({ success: false, message: 'เกิดข้อผิดพลาดในการลบข้อมูล' }); // Error message
    }
});





const PORT = process.env.PORT || 30001;
app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT ));