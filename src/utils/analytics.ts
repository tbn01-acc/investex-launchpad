import ReactGA from 'react-ga4';

// Отслеживание событий
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value
  });
};

// Отслеживание кликов по кнопкам
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('Button', 'Click', `${buttonName} - ${location}`);
};

// Отслеживание регистраций
export const trackSignup = (userType: 'investor' | 'founder') => {
  trackEvent('User', 'Signup', userType);
};

// Отслеживание просмотра проектов
export const trackProjectView = (projectId: string, projectName: string) => {
  trackEvent('Project', 'View', projectName, parseInt(projectId));
};

// Отслеживание применения фильтров
export const trackFilter = (filterType: string, filterValue: string) => {
  trackEvent('Filter', 'Apply', `${filterType}: ${filterValue}`);
};

// Отслеживание поиска
export const trackSearch = (searchQuery: string, resultsCount: number) => {
  trackEvent('Search', 'Query', searchQuery, resultsCount);
};

// Отслеживание загрузки файлов
export const trackFileDownload = (fileName: string, fileType: string) => {
  trackEvent('File', 'Download', `${fileName} (${fileType})`);
};

// Отслеживание заполнения форм
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('Form', success ? 'Submit Success' : 'Submit Error', formName);
};
