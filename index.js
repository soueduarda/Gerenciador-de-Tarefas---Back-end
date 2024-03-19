const express = require("express"); //express é um framework para NodeJS que permite lidar mais facilmente com rotas e solicitações/respostas HTTP.
const cors = require("cors"); //é uma ferramenta que nos permite definir quem tem permissão para acessar os recursos do servidor

const app = express(); //guardando express dentro da variável app

app.use(express.json()); //permite que o express analise as solicitações com formato JSON

app.use(cors("https://localhost:5173")); //definindo quem tem acesso aos recursos do servidor

const tarefas = [
  //nosso array com os objetos que representam as tarefas
  {
    id: 1,
    text: "criar funcionalidade x no sistema",
    category: "Trabalho",
    isCompleted: false,
  },
  {
    id: 2,
    text: "Ir pra academia",
    category: "Pessoal",
    isCompleted: false,
  },
  {
    id: 3,
    text: "Estudar React",
    category: "Estudos",
    isCompleted: false,
  },
];

app.get("/tarefas", function (request, response) {
  //quando a rota '/tarefas' é acessada com GET, ela responde com o array 'tarefas' no formato JSON
  response.json(tarefas);
});

app.post("/tarefas/adicionar", function (request, response) {
  //quando a tora '/tarefas/adicionar' é acessada com POST, ela adiciona uma nova tarefa ao array 'tarefas'

  console.log(request.body);
  const addTask = request.body;
  tarefas.push(addTask);
  response.status(201).json(addTask);
});

app.delete("/tarefas/:id", function (request, response) {
  // quando a rota '/tarefas/:id' é acessada com DELETE, ela exclui a tarefa usando como parametro o ID.
  const taskId = parseInt(request.params.id); // Obtendo o id da URL e convertendo para número
  const taskIndex = tarefas.findIndex((task) => task.id === taskId); // Buscando o índice da tarefa no array

  if (taskIndex !== -1) {
    // Verificando se a tarefa existe
    tarefas.splice(taskIndex, 1); // Removendo a tarefa do array
    response.status(204).send(); // Retornando resposta de sucesso sem conteúdo
  } else {
    response.status(404).json({ error: "Tarefa não encontrada" }); // Retornando erro se a tarefa não for encontrada
  }
});

app.put("/tarefas/:id", function (request, response) {
  // quando a rota '/tarefas/:id' é acessada com PUT, ela abre um campo de edição para a tarefa usando como parametro o ID.
  const taskId = parseInt(request.params.id); // Obtendo o id da URL e convertendo para número
  const taskIndex = tarefas.findIndex((task) => task.id === taskId); // Buscando o índice da tarefa no array

  if (taskIndex !== -1) {
    // Verificando se a tarefa existe
    const updatedTask = request.body; // Obtendo os dados da tarefa atualizados do corpo da requisição
    tarefas[taskIndex] = { ...tarefas[taskIndex], ...updatedTask }; // Atualizando os dados da tarefa
    response.json(tarefas[taskIndex]); // Retornando a tarefa atualizada
  } else {
    response.status(404).json({ error: "Tarefa não encontrada" }); // Retornando erro se a tarefa não for encontrada
  }
});

app.listen(3001); //comando que inicia o servidor na porta 3001
