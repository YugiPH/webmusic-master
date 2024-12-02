export function convertArray(inputArray) {
    return inputArray.map(item => ({
        value: item._id,
        label: item.title
    }));
}

export function convertSelect(inputArray) {
    return inputArray.map(item => ({
        value: item._id,
        label: item.name
    }));
}