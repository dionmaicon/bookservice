# bookservice
Node.js, Vue.js, Vue-Crudgen, Bootstrap, Books, MongoDB

## Instalação

Para instalar o projeto primeiramente clone o mesmo.
```bash
git clone https://github.com/dionmaicon/bookservice.git
```
É necessário instalar o docker e docker-compose, caso não  tenha.
Após realizar o clone do projeto entre na raiz do projeto.

```bash
cd bookservice
mkdir db
chmod -R 777 db
chmod +x build.sh
./build.sh
```
## Uso
O frontend foi desenvolvido usando Vue.js e o backend contém um server Node.js. Após executar os comandos acima, teremos o frontend na PORTA 8080 e a API na PORTA 8081. O MongoDB funciona em outra imagem docker. As vezes no início é necessário abrir o projeto no backend e alterar algum arquivo para que o Nodemon possa reiniciar o backend (Nodemon realiza o restart da aplicação toda vez que um arquivo é alterado).
Para navegar use http://localhost:8080

## Primeira execução
Na primeira execução ao buscar todos os registros, caso não existam dados salvos no banco, são criados mocks de exemplo. Então é necessário atualizar a página que lista os livros.

## License
[MIT](https://choosealicense.com/licenses/mit/)
