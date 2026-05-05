export const DEFAULT_INSTITUTIONS = [
  "PUC Minas",
  "PUC Campinas",
  "PUC Rio",
  "PUC SP",
  "PUC Parana",
  "PUC Goias",
  "PUC Rio Grande do Sul",
];

export function mergeInstitutions(institutions) {
  return Array.from(new Set([...DEFAULT_INSTITUTIONS, ...(institutions || [])]));
}
