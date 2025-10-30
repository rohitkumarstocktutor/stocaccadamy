export interface WorkshopData {
  code: string;
  name: string;
  wDateTime: string;
  wDate: string;
  wDay: string;
  wAurl: string;
  offerEnd?: string;
  language?: string;
  duration?: string;
}

export async function fetchWorkshopData(teacherName: string = 'vibhor'): Promise<WorkshopData | null> {
  try {
    // Use internal API route to avoid CORS and forbidden client headers on mobile browsers
    const url = `/api/course-details?q=${encodeURIComponent(teacherName)}`;

    const response = await fetch(url, {
      method: 'GET',
      // Add timeout for mobile networks
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WorkshopData = await response.json();
    
    // Validate the data structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid data format received');
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching workshop data:', error);
    return null;
  }
}

export function formatWorkshopDateTime(dateTimeString: string): string {
  try {
    const date = new Date(dateTimeString);
    
    // Convert to Indian timezone
    const indianDate = new Date(date.toLocaleString("en-US", {timeZone: "Asia/Kolkata"}));
    
    // Get individual components
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const weekday = weekdays[indianDate.getDay()];
    const day = indianDate.getDate();
    const month = months[indianDate.getMonth()];
    
    // Format time in 12-hour format
    let hours = indianDate.getHours();
    const minutes = indianDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    // Format as "12th September, Friday | 7:00 PM"
    const dayWithSuffix = day + (day === 1 || day === 21 || day === 31 ? 'st' : 
                                day === 2 || day === 22 ? 'nd' : 
                                day === 3 || day === 23 ? 'rd' : 'th');
    
    return `${dayWithSuffix} ${month}, ${weekday} | ${hours}:${minutesStr} ${ampm}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'Date TBA';
  }
}

export function getTeacherNameFromCourseKey(courseKey: string): string {
  // Map course keys to teacher names
  const teacherMap: Record<string, string> = {
    'vibhor': 'vibhor',
    'ayushi': 'ayushi',
    'crypto-skills': 'ayushi', // Default to vibhor if not specified
    'funded-accounts': 'ayushi', // Default to vibhor if not specified
    'ai-trading-indicator': 'ayushi', // Default to vibhor if not specified
    'options-trading': 'vibhor' // Default to vibhor if not specified
  };
  
  return teacherMap[courseKey] || 'vibhor';
}
