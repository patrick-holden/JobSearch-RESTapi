const alphaNumericSearch = (query) => {
    const search = query.search

    const regexResult = /[^a-z0-9 ]/gi.test(search)

    if(regexResult) {
        return -1
    }

    return query;
}

const idIsNum = (id) => {
    if(isNaN(id)) {
        return -1
    }
}

module.exports.alphaNumericSearch = alphaNumericSearch
module.exports.idIsNum = idIsNum;