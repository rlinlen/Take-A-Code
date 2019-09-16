// access nested object by variable. ex: obj['a.b'] -> obj[a][b]
export const leaf = (obj, path) => (path.split('.').reduce((value,el) => value[el], obj))