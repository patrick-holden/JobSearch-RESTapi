const {alphaNumericSearch, idIsNum} =  require('../../services/sanitiseAndValidateService');

describe('alphaNumeric Search function', () => {
    it('given valid query search returns query search', () => {
        const query = {
            search: 'junior'
        }
        expect(alphaNumericSearch(query)).toStrictEqual(query)
    })
    it('given invalid query search returns -1', () => {
        const query = {
            search: '???'
        }
        expect(alphaNumericSearch(query)).toStrictEqual(-1)
    })
    it('given invalid query search returns -1', () => {
        const query = {
            search: '???'
        }
        expect(alphaNumericSearch(query)).not.toStrictEqual(query)
    })
})

describe('idIsNum function', () => {
    it('given valid id returns id', () => {
        expect(idIsNum(4)).toStrictEqual(4)
    })
    it('given invalid id returns -1', () => {
        expect(idIsNum('hello')).toStrictEqual(-1)
    })
    it('given invalid id returns -1', () => {
        expect(idIsNum('hello')).not.toStrictEqual('hello')
    })
})