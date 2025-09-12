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
    const baseUrl = 'https://script.google.com/macros/s/AKfycby-TiE4gLk4bUC-mSYaT_lDwyOU1T6JTMNw2pIeYQ59qJ2Mk0x9jk_6x47QR5ASCcdasQ/exec';
    const url = `${baseUrl}?q=${encodeURIComponent(teacherName)}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'accept': '*/*',
        'accept-language': 'en-GB,en;q=0.8',
        'origin': 'https://www.stocktutor.co',
        'referer': 'https://www.stocktutor.co/',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Mobile Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WorkshopData = await response.json();
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
    'crypto-skills': 'vibhor', // Default to vibhor if not specified
    'funded-accounts': 'vibhor', // Default to vibhor if not specified
    'ai-trading-indicator': 'vibhor', // Default to vibhor if not specified
    'options-trading': 'vibhor' // Default to vibhor if not specified
  };
  
  return teacherMap[courseKey] || 'vibhor';
}
