import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentSchedule.css';

const StudentSchedule = () => {
  const navigate = useNavigate();
  const [currentWeek, setCurrentWeek] = useState(new Date());

  
  const scheduleData = [
    {
      day: 'Monday',
      courses: [
        {
          id: 1,
          code: 'CMPS 514',
          name: 'Management Information Systems',
          time: '18:00 - 20:50',
          location: '701 Atlantic',
          instructor: 'Zelalem Mengistu',
          status: 'In Class',
          startHour: 18,
          startMinute: 0,
          endHour: 20,
          endMinute: 50
        }
      ]
    },
    {
      day: 'Tuesday',
      courses: [
        {
          id: 2,
          code: 'BGDA 510',
          name: 'Data Mining',
          time: '18:00 - 20:50',
          location: '701 Atlantic',
          instructor: 'Micheline Al Harrack',
          status: 'In Class',
          startHour: 18,
          startMinute: 0,
          endHour: 20,
          endMinute: 50
        }
      ]
    },
    {
      day: 'Wednesday',
      courses: [
        {
          id: 3,
          code: 'CMPS 570',
          name: 'Software Design and Architecture',
          time: '18:00 - 20:50',
          location: '301 Capitol Hill',
          instructor: 'Tsige Tessema',
          status: 'In Class',
          startHour: 18,
          startMinute: 0,
          endHour: 20,
          endMinute: 50
        }
      ]
    },
    { 
      day: 'Thursday', 
      courses: [] 
    },
    { 
      day: 'Friday', 
      courses: [] 
    },
    { 
      day: 'Saturday', 
      courses: [] 
    },
    { 
      day: 'Sunday', 
      courses: [] 
    }
  ];

  
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour < 24; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      slots.push(`${hour.toString().padStart(2, '0')}:30`);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  
  useEffect(() => {
    const loadUserData = () => {
      try {
        const userString = sessionStorage.getItem('user');
        if (!userString) {
          navigate('/');
        }
      } catch (error) {
        console.error("Error loading user data:", error);
        navigate('/');
      }
    };
    
    loadUserData();
  }, [navigate]);

  const handleBackToDashboard = () => {
    navigate('/student-dashboard');
  };

  const navigateWeek = (direction) => {
    const newDate = new Date(currentWeek);
    if (direction === 'prev') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentWeek(newDate);
  };

  
  const formatWeekRange = () => {
    const startOfWeek = new Date(currentWeek);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1); 
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6); 
    
    const startMonth = startOfWeek.toLocaleString('default', { month: 'short' });
    const endMonth = endOfWeek.toLocaleString('default', { month: 'short' });
    
    const startDay = startOfWeek.getDate();
    const endDay = endOfWeek.getDate();
    
    const year = startOfWeek.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay} - ${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };

  
  const getCourseForTimeSlot = (day, timeSlot) => {
    const dayData = scheduleData.find(d => d.day === day);
    if (!dayData || !dayData.courses.length) return null;
    
    const [hourStr, minuteStr] = timeSlot.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    
    return dayData.courses.find(course => {
      const isStartTime = course.startHour === hour && course.startMinute === minute;
      const isWithinTimeRange = 
        (hour > course.startHour || (hour === course.startHour && minute >= course.startMinute)) && 
        (hour < course.endHour || (hour === course.endHour && minute < course.endMinute));
      
      return isStartTime || isWithinTimeRange;
    });
  };

  
  const isCourseStart = (day, timeSlot, course) => {
    if (!course) return false;
    
    const [hourStr, minuteStr] = timeSlot.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);
    
    return course.startHour === hour && course.startMinute === minute;
  };

  
  const getRowSpan = (course) => {
    const startTotalMinutes = course.startHour * 60 + course.startMinute;
    const endTotalMinutes = course.endHour * 60 + course.endMinute;
    const durationMinutes = endTotalMinutes - startTotalMinutes;
    return Math.ceil(durationMinutes / 30); 
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <button className="back-button" onClick={handleBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h2>Course Schedule</h2>
      </div>

      <div className="week-navigation">
        <button 
          className="nav-button" 
          onClick={() => navigateWeek('prev')}
        >
          ◀ Previous Week
        </button>
        <span className="week-range">{formatWeekRange()}</span>
        <button 
          className="nav-button" 
          onClick={() => navigateWeek('next')}
        >
          Next Week ▶
        </button>
      </div>

      <div className="schedule-grid-container">
        <table className="schedule-grid">
          <thead>
            <tr className="days-row">
              <th className="time-column"></th>
              {scheduleData.map((day, index) => (
                <th key={index} className="day-column">{day.day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSlots.map((timeSlot, timeIndex) => (
              <tr key={timeIndex} className="time-slot-row">
                <td className="time-cell">{timeSlot}</td>
                {scheduleData.map((day, dayIndex) => {
                  const course = getCourseForTimeSlot(day.day, timeSlot);
                  const isStart = isCourseStart(day.day, timeSlot, course);
                  
                  
                  if (!course || isStart) {
                    return (
                      <td 
                        key={dayIndex} 
                        className={`day-cell ${course && isStart ? 'course-cell' : ''}`}
                        rowSpan={course && isStart ? getRowSpan(course) : 1}
                      >
                        {course && isStart ? (
                          <div className="course-card">
                            <div className="course-header">
                              <span className="course-code">{course.code}</span>
                              <span className="course-time">{course.time}</span>
                            </div>
                            <div className="course-name">{course.name}</div>
                            <div className="course-location">{course.location}</div>
                            <div className="course-instructor">({course.instructor})</div>
                            <div className="course-status">{course.status}</div>
                          </div>
                        ) : (
                          day.courses.length === 0 && timeIndex === 0 ? "No Event" : ""
                        )}
                      </td>
                    );
                  }
                  
                  
                  return null;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentSchedule;