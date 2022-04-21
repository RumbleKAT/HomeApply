const app = require('../src/backend/app');
const supertest = require('supertest');
const request = supertest(app);

describe('기본 API 사용 테스트',()=>{
    test('should return response true',async function(){
        const response = await request.get('/');
        const result = JSON.parse(response.text);
        expect(result.response).toBe(true)
        //tobe 와 toEqual의 차이 
        //toBe는 같은 객체를 가리키고 있는지 확인한다. vs toEqual은 내용 비교
    });

    test('fetch APT apply info',async function(){
      const category = 'APT'
      const response = await request.get(`/getInfo?category=${category}`)
      const result = JSON.parse(response.text);
      expect(result.length >= 1).toBe(true);
    });

    test('fetch NonAPT apply info',async function(){
        const category = 'NonApt'
        const response = await request.get(`/getInfo?category=${category}`)
        const result = JSON.parse(response.text);
        expect(result.length >= 1).toBe(true);
    });  

    test('fetch Remain apply info',async function(){
        const category = 'Remain'
        const response = await request.get(`/getInfo?category=${category}`)
        const result = JSON.parse(response.text);
        expect(result.length >= 1).toBe(true);
    });  
})
