export function isSubset(array1, array2) {
    if (array1.length === 0 || array2.length === 0) {
        return false;
    }

    const ids1 = array1.map(item => item.id);
    const ids2 = array2.map(item => item.id);

    return ids1.every(id => ids2.includes(id));
}