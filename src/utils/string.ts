export function convertStringToBoolean(input: string): boolean {
  if (typeof input === "boolean") return input
  return input === "true"
}
