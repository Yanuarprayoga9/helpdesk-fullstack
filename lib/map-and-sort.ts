export type SelectorsType = {
    label: string
    value: string
}
export function mapAndSort<T>(
    array: T[] = [],
    getLabel: (item: T) => string,
    getValue: (item: T) => string
): SelectorsType[] {
    return array
        .map(item => ({
            label: getLabel(item),
            value: getValue(item),
        }))
        .sort((a, b) => a.label.localeCompare(b.label));
}