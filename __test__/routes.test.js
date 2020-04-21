//importa os módulos e arquivos necessários
const request = require('supertest')
const server = require('../app.js')
const sayTDD = require('../helloJest')

//o que será executado antes de todos os testes
beforeAll(async () => {
    console.log('Iniciando TDD com jest!')
})

//o que será executado após todos os testes
afterAll(() => {
    //o server close irá encerrar nossa aplicação, evitando problemas da porta já estar em uso
    server.close()
    console.log('servidor fechado')
})

describe('inicio dos testes', () => {
    //descrição dos casos de testes
    test('acesso a rota da home e verifica o conteúdo que é exibido', async () => {
        //qual a rota que ele deve acessar e qual requisição deve fazer
        const response = await request(server).get('/')
        // qual o status esperado
        expect(response.status).toEqual(200)
        // se todos esses passos passarem, verifica o conteúdo exibido dentro deste rota
        expect(response.text).toContain('<h1>Você está na Home!</h1> <p> vamos começar os teste </p>')
    })

    test('acessa a rota /tdd e então será apresentada a seguinte difinição da tdd:', async () => {
        const response = await request(server).get('/TDD')
        expect(response.status).toEqual(200)
        expect(response.text).toContain('<h4>no tdd primeiro os testes e depois desenvolvemos o sistema para que ele passe nos testes</h4>')
    })

    test('acessa a rota /koa e então será apresentada a seguinte definição de koa.js', async () => {
        const response = await request(server).get('/KDA')
        expect(response.status).toEqual(200)
        expect(response.text).toContain('<h4>O Koa é uma nova estrutura da Web criada pela equipe do Express, que pretende ser uma base menor, mais expressiva e mais robusta para aplicativos da Web e APIs</h4>')
    })
    //aqui não iremos testar uma rota e sim o retorno de uma função.
    test('irá verificar o retorno da função saytdd', () => {
        //é esperado que o retorno da função saytdd seja:
        expect(sayTDD()).toMatch('TDD é o Desenvolvimento Orientado por Testes')
    })
});
