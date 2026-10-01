export function normalizePhone(phone: string): string {
    const cleaned = phone.replace(/\D/g, "");

    if (cleaned.startsWith("8") && cleaned.length >= 10) {
        return "7" + cleaned.slice(1);
    }

    if (cleaned.startsWith("7")) {
        if (cleaned.length === 11) return cleaned;
        return cleaned;
    }

    if (cleaned.length === 10) {
        return "7" + cleaned;
    }

    return cleaned;
}

export function isValidPhone(phone: string): boolean {
    const digits = normalizePhone(phone);
    return digits.length === 11 && digits.startsWith("7");
}

export function formatPhone(digits: string) {
    const cleaned = normalizePhone(digits);

    if (!isValidPhone(cleaned)) return digits;

    const countryCode = cleaned.slice(0, 1);
    const areaCode = cleaned.slice(1, 4);
    const firstPart = cleaned.slice(4, 7);
    const secondPart = cleaned.slice(7, 9);
    const thirdPart = cleaned.slice(9, 11);

    return `+${countryCode} (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
}
