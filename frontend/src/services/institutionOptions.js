export const DEFAULT_INSTITUTIONS = [];

export function mergeInstitutions(institutions) {
  return Array.from(new Set([...(institutions || []), ...DEFAULT_INSTITUTIONS]));
}
