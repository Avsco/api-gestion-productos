const request = require('supertest')
const assert = require('assert')

const app = require('../src')


describe('GET /products example', function () {
    it('get bueno', function (done) {
        return request(app)
            .get('/products')
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .then(response => {
                assert(response.body.msg, 'bien')
            })
            .then(done())
    })
})