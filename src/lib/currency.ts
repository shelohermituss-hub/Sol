// Devise du produit : Gourde haïtienne (HTG). Point d'entrée unique pour
// tout affichage de montant — ne jamais écrire " HTG"/" MAD" en dur dans
// un composant.
export const CURRENCY_CODE = "HTG"

export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString("en-US")} ${CURRENCY_CODE}`
}
