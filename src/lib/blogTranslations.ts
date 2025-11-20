// Маппинг для перевода категорий и типов контента блога

export const categoryTranslations: Record<string, string> = {
  'seed-funding': 'Посевное финансирование',
  'series-a': 'Раунд А',
  'due-diligence': 'Дью дилидженс',
  'scaling': 'Масштабирование',
};

export const contentTypeTranslations: Record<string, string> = {
  'guides': 'Гайды',
  'cases': 'Кейсы',
  'analytics': 'Аналитика',
  'trends': 'Тренды',
};

export const roleTypeTranslations: Record<string, string> = {
  'angel-investors': 'Бизнес-ангелы',
  'founders': 'Основатели',
  'vc-funds': 'Венчурные фонды',
  'consultants': 'Консультанты',
  'developers': 'Разработчики',
};

export const translateCategory = (category: string): string => {
  return categoryTranslations[category] || category;
};

export const translateContentType = (contentType: string): string => {
  return contentTypeTranslations[contentType] || contentType;
};

export const translateRoleType = (roleType: string): string => {
  return roleTypeTranslations[roleType] || roleType;
};
