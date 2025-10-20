document.addEventListener('DOMContentLoaded', () => {
    // กำหนดให้การเลื่อน (Scroll) ในส่วนรายละเอียดมีความนุ่มนวล
    const rightHalf = document.querySelector('.right-half');
    if (rightHalf) {
        // ใช้คุณสมบัติ CSS scroll-behavior: smooth
        rightHalf.style.scrollBehavior = 'smooth';
    }

    // โค้ดเพิ่มเติมอื่นๆ (ถ้ามีในอนาคต) สามารถเพิ่มตรงนี้ได้
    
    console.log("Detail page loaded with animations.");
});

//ฟังก์ชันสำหรับปุ่มย้อนกลับ
function goBack() {
    // ใช้ history.back() เพื่อกลับไปยังหน้าก่อนหน้าในประวัติของเบราว์เซอร์
    window.history.back();
}