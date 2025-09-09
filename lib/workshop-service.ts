export interface WorkshopData {
  code: string;
  name: string;
  wDateTime: string;
  wDate: string;
  wDay: string;
  wAurl: string;
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
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    };
    return date.toLocaleDateString('en-IN', options);
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
