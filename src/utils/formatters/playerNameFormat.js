export function abbreviateName(fullName) {
  if (typeof fullName !== 'string') return '';

  const parts = fullName.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0];
  }

  const firstInitial = parts[0][0].toUpperCase();
  const lastName = parts.slice(1).join(' ');

  return `${firstInitial}. ${lastName}`;
}
