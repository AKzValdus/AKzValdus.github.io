const mainImage = document.getElementById('main-image');
const initialMessage = document.getElementById('initial-message');
const thumbnails = document.querySelectorAll('.image-gallery img');

let hideTimeout;

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
    thumb.addEventListener('mouseenter', function () {
        const fullImageUrl = this.getAttribute('data-src');

        if (mainImage && initialMessage) {
            // 💡 1. ยกเลิกคำสั่งซ่อนภาพที่รอดำเนินการอยู่ (ถ้ามี)
            clearTimeout(hideTimeout);

            mainImage.src = fullImageUrl;
            initialMessage.style.display = 'none';

            // 2. แสดงภาพและเริ่ม Animation (โค้ดเดิม)
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
            mainImage.classList.remove('main-image-visible');

            // 💡 2. เก็บ setTimeout ID ไว้ในตัวแปร hideTimeout
            hideTimeout = setTimeout(() => {
                // โค้ดนี้จะทำงานหลังจาก 400ms ถ้าไม่มีการ clear ก่อน
                mainImage.style.display = 'none';
                initialMessage.style.display = 'block';
            }, 400);
        }
    });
});