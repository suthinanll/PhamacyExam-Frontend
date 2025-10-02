"use client"
import { useState } from 'react';
import Navbar_user from "@/components/Navbar_user";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState('');

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  const thaiDaysShort = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    return { firstDay, lastDate };
  };

  const { firstDay, lastDate } = getDaysInMonth();

  const openModal = (day) => {
    const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
    setSelectedDate({ day, dateKey });
    setEventText(events[dateKey] || '');
    setShowModal(true);
  };

  const saveEvent = () => {
    if (eventText.trim()) {
      setEvents({ ...events, [selectedDate.dateKey]: eventText });
    } else {
      const newEvents = { ...events };
      delete newEvents[selectedDate.dateKey];
      setEvents(newEvents);
    }
    setShowModal(false);
    setEventText('');
  };

  const renderDays = () => {
    const days = [];
    
    // ช่องว่างก่อนวันที่ 1
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-16 sm:h-20 md:h-24 bg-gray-50 rounded-lg" />
      );
    }
    
    // วันในเดือน
    for (let day = 1; day <= lastDate; day++) {
      const dateKey = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${day}`;
      const hasEvent = events[dateKey];
      const isToday = new Date().toDateString() === 
        new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
      
      days.push(
        <div
          key={day}
          onClick={() => openModal(day)}
          className={`h-16 sm:h-20 md:h-24 p-1.5 sm:p-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg
            ${isToday 
              ? 'bg-yellow-100 border-2 border-yellow-500 shadow-md' 
              : hasEvent 
                ? 'bg-blue-100 border-2 border-blue-400 shadow-md'
                : 'bg-white border-2 border-gray-200 hover:border-blue-300'
            }
          `}
        >
          <div className={`font-bold text-xs sm:text-sm ${isToday ? 'text-yellow-700' : 'text-gray-700'}`}>
            {day}
          </div>
          {hasEvent && (
            <div className="text-[10px] sm:text-xs text-blue-700 mt-0.5 sm:mt-1 line-clamp-1 sm:line-clamp-2">
              {hasEvent}
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <>
      <Navbar_user />
      
      <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-4 sm:mb-6">
            <div className="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
              <span className="hover:text-blue-600 cursor-pointer">หน้าหลัก</span>
              <span className="mx-1 sm:mx-2">›</span>
              <span className="text-gray-700 font-medium">ปฏิทินการสอบ</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              ปฏิทินการสอบ
            </h1>
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
            
            {/* เดือน/ปี */}
            <div className="bg-blue-600 text-white p-3 sm:p-4 md:p-5">
              <div className="flex items-center justify-between max-w-sm mx-auto">
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
                  className="p-1.5 sm:p-2 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <div className="text-center">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold">
                    {thaiMonths[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
                  </h2>
                </div>
                
                <button
                  onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
                  className="p-1.5 sm:p-2 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Grid */}
            <div className="p-2 sm:p-3 md:p-4">
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {/* หัววัน */}
                {thaiDaysShort.map((day, i) => (
                  <div 
                    key={i} 
                    className={`text-center font-bold py-2 sm:py-3 text-xs sm:text-sm rounded-lg
                      ${i === 0 ? 'bg-red-50 text-red-600' : i === 6 ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-700'}
                    `}
                  >
                    {day}
                  </div>
                ))}
                
                {/* วันต่างๆ */}
                {renderDays()}
              </div>
            </div>
          </div>

          {/* คำอธิบาย */}
          <div className="mt-3 sm:mt-4 bg-white rounded-lg sm:rounded-xl shadow p-3 sm:p-4">
            <div className="flex flex-wrap gap-2 sm:gap-4 justify-center text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-100 border-2 border-yellow-500 rounded" />
                <span className="text-gray-600">วันนี้</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-100 border-2 border-blue-400 rounded" />
                <span className="text-gray-600">มีกำหนดการ</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-white border-2 border-gray-200 rounded" />
                <span className="text-gray-600">วันว่าง</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4"
            onClick={() => setShowModal(false)}
          >
            <div 
              className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-md p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="mb-3 sm:mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  {selectedDate?.day} {thaiMonths[currentDate.getMonth()]} {currentDate.getFullYear() + 543}
                </h3>
              </div>
              
              {/* Textarea */}
              <div className="mb-3 sm:mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  รายละเอียดกำหนดการ
                </label>
                <textarea
                  value={eventText}
                  onChange={(e) => setEventText(e.target.value)}
                  placeholder="พิมพ์รายละเอียดกำหนดการ..."
                  rows="4"
                  className="w-full p-2.5 sm:p-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                />
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={saveEvent}
                  className="w-full sm:flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  บันทึก
                </button>
                
                {events[selectedDate?.dateKey] && (
                  <button
                    onClick={() => {
                      const newEvents = { ...events };
                      delete newEvents[selectedDate.dateKey];
                      setEvents(newEvents);
                      setShowModal(false);
                      setEventText('');
                    }}
                    className="w-full sm:flex-1 bg-red-500 hover:bg-red-600 text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    ลบ
                  </button>
                )}
                
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto sm:px-5 bg-gray-400 hover:bg-gray-500 text-white py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Calendar;