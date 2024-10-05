# Demitrius Box

# Visão Geral
O Demitrius Box Server é um projeto de front-end desenvolvido em React e Axios, com o objetivo de criar uma aplicação interativa para o armazenamento e visualização de memórias. Os usuários podem se registrar, fazer login, adicionar memórias e visualizar suas memórias em uma interface atraente e responsiva.

# Estrutura do Projeto
A estrutura do projeto é organizada em diretórios, facilitando a manutenção e a escalabilidade:

```
src
├── api.js
├── App.js
├── index.js
├── Box.js
├── components
│   ├── BoxText
│   │   └── index.js
│   ├── Button
│   │   └── index.js
│   ├── FormMemory
│   │   └── index.js
│   ├── Header
│   │   └── index.js
│   ├── Home
│   │   └── index.js
│   ├── Login
│   │   └── index.js
│   ├── MemoryBox
│   │   └── index.js
│   ├── ModalMemory
│   │   └── index.js
│   ├── Profile
│   │   └── index.js
│   ├── Register
│   │   └── index.js
│   ├── Title
│   │   └── index.js
│   ├── Text
│   │   └── index.js
│   └── TextContainer
│       └── index.js
└── context
    └── AuthContext.js
```
    
# Configuração do Projeto
Dependências
Certifique-se de que as seguintes dependências estão instaladas no seu projeto:
react
react-dom
react-router-dom
styled-components
axios
@fortawesome/react-fontawesome
@fortawesome/free-solid-svg-icons

# Configuração do Ambiente
Clonar o repositório:
git clone https://github.com/EnzoDemitrius10/DemitriusBox
cd DemitriusBox

Instalar as dependências:
npm install

Iniciar o servidor:
npm start

# Descrição dos Componentes

1. `api.js`: Descrição das funções e chamadas de API que gerenciam as operações relacionadas a usuários e memórias.

2. `App.js`: Descrição sobre como ele configura as rotas da aplicação.

3. `components/BoxText/index.js`: Descrição do que este componente exibe e como se integra ao layout.

4. `components/FormMemory/index.js`: Descrição sobre o formulário para adicionar memórias, incluindo validações.

5. `components/Header/index.js`: Descrição sobre a exibição do cabeçalho e a navegação que ele proporciona.

6. `components/Home/index.js`: Descrição da página inicial e suas opções.

7. `components/Login/index.js`: Descrição sobre a funcionalidade de login.

8. `components/MemoryBox/index.js`: Descrição sobre a caixa de memórias e suas interações.

9. `components/ModalMemory/index.js`: Descrição sobre a exibição do modal para adicionar memórias.

10. `components/Profile/index.js`: Descrição sobre o componente de perfil e suas funcionalidades.

11. `components/Register/index.js`: Descrição sobre a página de registro.

12. `components/Title/index.js`: Descrição do componente que exibe títulos na aplicação.

13. `components/Text/index.js`: Descrição sobre o componente que exibe textos.

14. `components/TextContainer/index.js`: Descrição principal sobre o componente que exibe textos.

15. `context/AuthContext.js`: Descrição do gerenciamento de estado de autenticação.


# Contexto de Autenticação
O contexto de autenticação (context/AuthContext.js) gerencia o estado de login do usuário e fornece funções para login e logout. Ele permite que os componentes acessem as informações do usuário de maneira global.

# Estilos Globais
Os estilos globais são gerenciados através do createGlobalStyle do styled-components, aplicando uma fonte e esquema de cores consistentes em toda a aplicação.

# Contato
Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para entrar em contato: enzodemitrius10@gmail.com
