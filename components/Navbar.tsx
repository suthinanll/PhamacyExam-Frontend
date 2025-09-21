import Link from "next/link"

const Navbar = () => {
  return (
    <nav>
      <div className="flex gap-6 p-5">
        <Link href="/">เภสัชพร้อมสอบ</Link>
        <Link href="/examset">คลังข้อสอบ</Link>
        <Link href="/calender">ปฏิทินการสอบ</Link>
        <Link href="/chatbot">แขตบอตผู้ช่วย</Link>
        <Link href="/followup">ติดตามความคืบหน้า</Link>

      </div>
    </nav>
  )
}
export default Navbar