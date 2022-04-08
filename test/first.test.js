import request from 'supertest';
const app = require('../src/backend/app');

describe('기본 API 사용 테스트',()=>{
    test('should return response true',async ()=>{
        const response = await request(app).get('/');
        const result = JSON.parse(response.text);
        expect(result.response).toBe(true);
    });
})
