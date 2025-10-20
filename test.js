const images = ["Kon-yuk-klang.png", "Yuk-Ruea-Bai.png", "Yuk-ruea-hum-krao.png", "Yuk-songkhram-lok.png", "Yuk-samai-mai.png"];
const urls = [
    "Z:/โปรเจค/TDO/proj2-1.html",
    "Z:/โปรเจค/TDT/proj2-2.html",
    "Z:/โปรเจค/TDTHR/proj2-3.html",
    "Z:/โปรเจค/TDF/proj2-4.html",
    "Z:/โปรเจค/TDFI/proj2-5.html"
];

const themes = [
    {
        bg_image: "frist.jpg",
        btn_bg: "rgba(90, 60, 30, 0.8)",
        btn_border: "#C89458", 
        btn_border_hover: "#F8E4C4",
        glow_light: "#F8E4C4",
        glow_dark: "#C89458" 
    },
    {
        bg_image: "Ruea-Bai.png",
        btn_bg: "rgba(0, 70, 100, 0.8)",
        btn_border: "#87CEEB", 
        btn_border_hover: "#ADD8E6",
        glow_light: "#ADD8E6",
        glow_dark: "#4682B4"
    },
    {
        bg_image: "ruea-hum-krao.jpg",
        btn_bg: "rgba(50, 50, 50, 0.8)", 
        btn_border: "#A9A9A9", 
        btn_border_hover: "#D3D3D3",
        glow_light: "#D3D3D3",
        glow_dark: "#808080"
    },
    {
        bg_image: "songkhram-lok.png",
        btn_bg: "rgba(100, 0, 0, 0.8)", 
        btn_border: "#FF4500", 
        btn_border_hover: "#FFA07A",
        glow_light: "#FFA07A",
        glow_dark: "#B22222"
    },
    {
        bg_image: "samai-mai.png",
        btn_bg: "rgba(0, 80, 0, 0.8)",
        btn_border: "#32CD32",
        btn_border_hover: "#98FB98",
        glow_light: "#98FB98",
        glow_dark: "#006400"
    }
];

let currentIndex = 0;
const thumbnailContainer = document.querySelector('.thumbnails'); // เพื่อใช้ในการเพิ่มภาพย่อและจัดการคลาส
const bodyElement = document.body; // อ้างอิงถึงแท็ก <body> เพื่อใช้ในการเปลี่ยนภาพพื้นหลัง
const root = document.documentElement;  // อ้างอิงถึงแท็ก <html> (:root) เพื่อเข้าถึงและกำหนดค่า CSS

// ฟังก์ชันหลักสำหรับแสดงภาพ 
function showImage(index) {
    const img = document.getElementById("carousel"); // อ้างอิงถึง ภาพหลัก (<img id="carousel">)
    const link = document.getElementById("link-carousel"); // อ้างอิงถึง ลิงก์ที่ห่อหุ้มภาพหลัก (<a id="link-carousel">)

    currentIndex = index; // อัปเดตให้เป็นค่าที่รับเข้ามาปัจจุบัน พวกภาพที่เปลี่ยนนะพอปิดไม่เปลี่ยน

    // อัปเดตภาพสไลด์หลักและลิงก์
    img.src = images[currentIndex]; // กำหนดที่อยู่ของภาพหลักให้เป็นไฟล์ที่อยู่ในปัจจุบัน
    link.href = urls[currentIndex]; //กำหนด ลิงก์ ของภาพหลักให้เป็น URL ที่อยู่ในปัจจุบัน

    // เรียกฟังก์ชันเปลี่ยนพื้นหลัง
    updateBackground(currentIndex);

    const currentTheme = themes[currentIndex]; //ดึงข้อมูลชุดสีทั้งหมดของธีมที่ตรงกับภาพปัจจุบันออกมา

    // ตั้งค่าสีปุ่ม
    root.style.setProperty('--btn-bg', currentTheme.btn_bg);
    root.style.setProperty('--btn-border', currentTheme.btn_border);
    root.style.setProperty('--btn-border-hover', currentTheme.btn_border_hover);

    // ตั้งค่าสีพื้นหลังปุ่มเมื่อ Hover (เพิ่มความเข้มของสีหลัก)
    const hoverBg = currentTheme.btn_bg.replace('0.8', '1.0'); // คำนวณ สีพื้นหลังเมื่อ Hover โดยเปลี่ยนค่าความโปร่งใส
    root.style.setProperty('--btn-bg-hover', hoverBg); // เปลี่ยนค่าความโปร่งใสด้วยสีที่คำนวณใหม่

    // ตั้งค่ากรอบภาพเล็ก 
    const thumbBg = currentTheme.btn_bg.replace('0.8', '0.7');
    root.style.setProperty('--thumb-bg', thumbBg);
    root.style.setProperty('--thumb-bg-hover', hoverBg); // ให้ใช้สี Hover เดียวกับปุ่ม

    // ตั้งค่าสีสำหรับ Animation เรืองแสง
    root.style.setProperty('--glow-color-light', currentTheme.glow_light);
    root.style.setProperty('--glow-color-dark', currentTheme.glow_dark);

    // อัปเดตสถานะ Active ของภาพเล็ก
    updateThumbnails();
}

// ฟังก์ชันสำหรับเปลี่ยนพื้นหลัง 
function updateBackground(index) {
    const theme = themes[index];

    // ตั้งค่าพื้นหลังใหม่ 
    bodyElement.style.backgroundImage = `url('${theme.bg_image}')`; //กำหนด ภาพพื้นหลัง ของ\<body\>(โดยการแทรกurl(...)ผ่าน JavaScript)
    bodyElement.style.backgroundColor = theme.bg_color;
}

//ฟังก์ชันจัดการภาพเล็ก
function createThumbnails() {
    images.forEach((src, index) => { // วนลูปตามจำนวนภาพใน images
        const link = document.createElement('a'); // สร้างแท็ก <a> ใหม่
        link.href = urls[index]; // กำหนดลิงก์ปลายทางให้กับแท็ก <a>

        const thumbImg = document.createElement('img'); // สร้างแท็ก <img> ใหม่
        thumbImg.src = src;
        thumbImg.alt = `Thumbnail ${index + 1}`;

        link.onclick = (e) => {
            e.preventDefault();
            showImage(index);
        };

        link.appendChild(thumbImg);
        thumbnailContainer.appendChild(link);
    });
}

function updateThumbnails() {
    const allLinks = thumbnailContainer.querySelectorAll('a'); // เลือก ลิงก์ภาพย่อทั้งหมด ภายใน div.thumbnails
    allLinks.forEach((link, index) => {
        const img = link.querySelector('img'); //อ้างอิงถึงแท็ก <img> ภายในลิงก์ภาพย่อ

        if (index === currentIndex) {
            link.classList.add('active'); // เพิ่ม คลาส active ให้ลิงก์
            img.classList.add('active'); // เพิ่ม คลาส active ให้ภาพ (เพื่อให้ความทึบแสงเป็น 1.0)
        } else {
            link.classList.remove('active'); // ลบ คลาส active ออกจากลิงก์
            img.classList.remove('active'); // ลบ คลาส active ออกจากลิงก์
        }
    });
}

//ฟังก์ชันสำหรับปุ่มเลื่อน
function nextImage() {
    let nextIndex = (currentIndex + 1) % images.length; // คำนวณดัชนีถัดไป โดยใช้ + 1 และใช้ตัวดำเนินการ Modulo (%) เพื่อให้แครูเซลวนกลับไปภาพแรกเมื่อถึงภาพสุดท้าย
    showImage(nextIndex); // แสดงภาพตามดัชนีที่คำนวณได้
}

// กำหนดให้ฟังก์ชันลูกศรทำงาน เมื่อหน้าเว็บโหลดเสร็จสมบูรณ์ แล้วเท่านั้น
function prevImage() {
    let prevIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(prevIndex); 
}

window.onload = () => {
    createThumbnails(); // เรียกฟังก์ชันเพื่อ สร้างภาพย่อทั้งหมด บนหน้าจอ
    showImage(currentIndex); //เรียกฟังก์ชันเพื่อ แสดงภาพแรก (ดัชนี 0) และ ตั้งค่าธีมเริ่มต้น ให้กับหน้าเว็บทั้งหมด
}