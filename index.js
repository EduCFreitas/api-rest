const express = require('express'); // Importa Express
const fs = require('fs'); // Importa File System
const bodyParser = require('body-parser'); // Importa Body Parser
const app = express(); // Inicia Express

app.use(bodyParser.urlencoded({extended: false})); // Converte os dados da requisição para qualquer formato
app.use(bodyParser.json()); // Converte dados requisição para JSON
let rawbooks = fs.readFileSync('books.json') // Lê o arquivo de forma sincronizada e armazena dentro da variável, porém como string
let books = JSON.parse(rawbooks); // converte para JSON novamente

app.get('/', (req, res) =>{
    res.send('Teste');
}); // Constrói rota para caminho

// Nova rota GET para listar livros
app.get('/book', (req, res) =>{
    res.json(books); // Retorna conteúno da variável books no formato json
});

// Nova rota POST para cadastrar livros
app.post('/book', (req, res) =>{
    const book = req.body; // Constante book recebe a requisição do usuário através do corpo da requisição
    if(Array.isArray(book)){ // Se a requisição for de um array, ou seja, cadastramento de mais de um livro
        for(item of book){
            books.push(item); // Adiciona ao fim da variável books cada um dos itens cadastrados
        }
    }else{
        books.push(book); // Se não for um array, cadastra o livro da própria requisição
    }
    let jsonList = JSON.stringify(books); // Converte a variável books, já com as atualizações, para string
    fs.writeFile('books.json', jsonList, 'utf8', ()=>{}); // Grava no arquivo books.json. Paramêtros: onde_gravar, o_que_gravar, padrão_caracteres, função_callback
    // Obs: Função callback é apenas o retorno vazio de que a gravação ocorreu
    res.send('Livro cadastrado com sucesso!'); // Mensagem de sucesso
});

// Nova rota GET para buscar livro específico
app.get('/book/:isbn', (req, res) =>{
    const isbn = req.params.isbn; // Valor de isbn vem dos parâmetros da rota
    for(let book of books){ // Percorre books procurando por book
        if(book.isbn===isbn){
            res.json(book); // Retorna o valor de book correspendente à requisição
            return;
        }
    }
    res.status(404).send('Livro não encontrado!');
})

app.listen(3000); // Subir servidor
// *Iniciar servidor com: node index.js
