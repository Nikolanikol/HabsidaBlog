export function capitalizeFirstLetter(str) {
    if (!str) return str; // Проверяем, что строка не пустая
    return str.charAt(0).toUpperCase() + str.slice(1);
}