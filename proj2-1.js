const mainImage = document.getElementById('main-image'); //อ้างอิงถึงแท็ก <img> ภาพหลัก (id="main-image") เพื่อเปลี่ยนรูปภาพและควบคุมการแสดงผล
const initialMessage = document.getElementById('initial-message');
const thumbnails = document.querySelectorAll('.image-gallery img'); //อ้างอิงถึง ภาพย่อทั้งหมด ภายในแกลเลอรี เพื่อวนลูปและเพิ่ม Event Listener

let hideTimeout; //เก็บ ID ของฟังก์ชัน setTimeout ที่ตั้งใจจะซ่อนภาพหลัก 

document.addEventListener('DOMContentLoaded', () => {
    // ใน DOMContentLoaded เราจะยังคงซ่อนภาพไว้
    if (mainImage) {
        mainImage.style.display = 'none';    
    }
});

//ฟังก์ชันสำหรับปุ่มย้อนกลับ
function goBack() {
    // ใช้ history.back() เพื่อกลับไปยังหน้าก่อนหน้าในประวัติของเบราว์เซอร์
    window.history.back();
}
// วนลูปให้กับภาพเล็กแต่ละภาพ
thumbnails.forEach(thumb => {

    // เมื่อเมาส์ชี้เข้า (mouseenter)
    thumb.addEventListener('mouseenter', function () { // กำหนดให้ฟังก์ชันทำงานทันทีที่เมาส์ ชี้เข้า ไปยังภาพย่อ
        const fullImageUrl = this.getAttribute('data-src'); // ดึงค่าที่อยู่ไฟล์ภาพเต็มจากคุณสมบัติ data-src ของภาพย่อที่ถูกชี้อยู่

        if (mainImage && initialMessage) {
            // 💡 1. ยกเลิกคำสั่งซ่อนภาพที่รอดำเนินการอยู่ (ถ้ามี)
            clearTimeout(hideTimeout); // ป้องกันการซ่อนภาพ

            mainImage.src = fullImageUrl; // กำหนดให้ภาพหลักแสดงภาพที่ดึงมาจาก data-src
            initialMessage.style.display = 'none';

            mainImage.style.display = 'block';

            setTimeout(() => {
                mainImage.classList.add('main-image-visible');
            }, 10);
        }
    });

    // เมื่อเมาส์เลื่อนออกจากภาพเล็ก (mouseleave)
    thumb.addEventListener('mouseleave', function () { 
        if (mainImage && initialMessage) {
            // 1. ลบคลาสออกเพื่อให้ภาพเลื่อนกลับไป
            mainImage.classList.remove('main-image-visible');  // ลบคลาส main-image-visible ออก เพื่อให้ภาพหลักเริ่มแอนิเมชันกลับไปสู่สถานะเริ่มต้น (เช่น เลื่อนออกหรือเฟดออก)

            // 💡 2. เก็บ setTimeout ID ไว้ในตัวแปร hideTimeout
            hideTimeout = setTimeout(() => {
                // โค้ดนี้จะทำงานหลังจาก 400ms ถ้าไม่มีการ clear ก่อน
                mainImage.style.display = 'none';
                initialMessage.style.display = 'block';
            }, 400);
        }
    });
});