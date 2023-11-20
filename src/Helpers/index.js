export function getUnique(items) {
  if (!Array.isArray(items)) return [];
  return [...new Set(items)];
};

export function formatDate(dateString) {
  const originalDate = new Date(dateString);
  const year = originalDate.getFullYear();
  const month = String(originalDate.getMonth() + 1).padStart(2, '0');
  const day = String(originalDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

const options = { day: 'numeric', month: 'long', year: 'numeric' };
export function formatLiteralDate(date) {
    return new Date(date).toLocaleDateString('ru-RU', options);
}