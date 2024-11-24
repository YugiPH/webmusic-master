export function isSubset(array1, array2) {
    const ids1 = array1.map(item => item.id);
    const ids2 = array2.map(item => item.id);

    return ids1.every(id => ids2.includes(id));
}