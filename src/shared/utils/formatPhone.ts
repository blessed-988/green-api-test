export function formatPhone(digits: string) {
    const cleaned = digits.replace(/\D/g, "");

    if (cleaned.length < 1) return digits;

    let number: string;

    if (cleaned.length === 11 && cleaned.startsWith("8")) {
        number = "7" + cleaned.slice(1);
    } else if (cleaned.length === 11 && cleaned.startsWith("7")) {
        number = cleaned;
    } else if (cleaned.length === 10) {
        number = "7" + cleaned;
    } else {
        return digits;
    }

    const countryCode = number.slice(0, 1);
    const areaCode = number.slice(1, 4);
    const firstPart = number.slice(4, 7);
    const secondPart = number.slice(7, 9);
    const thirdPart = number.slice(9, 11);

    return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
}
