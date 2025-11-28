# Guia de Implementação do Login

## 📋 Resumo das Mudanças

A implementação do login foi realizada integrando o frontend com a API do backend (Node.js). Aqui estão os arquivos modificados:

### Arquivos Criados/Modificados:

1. **`.env.example`** - Configuração de variáveis de ambiente
2. **`src/services/api.js`** - Cliente HTTP centralizado com Vite
3. **`src/services/authService.js`** - Serviço de autenticação atualizado
4. **`src/contexts/AuthContext.jsx`** - Context de autenticação com integração real
5. **`src/components/Login.jsx`** - Componente de login melhorado
6. **`src/components/Signup.jsx`** - Componente de signup melhorado
7. **`src/components/Login.css`** - Estilos atualizados com spinner
8. **`src/components/Signup.css`** - Estilos atualizados com spinner

## 🚀 Como Configurar

### 1. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env`:

```env
VITE_API_URL=http://localhost:3000/api
VITE_ENV=development
```

**Certifique-se de que a porta 3000 e o caminho da API correspondem ao seu backend!**

### 2. Instalar Dependências (se necessário)

```bash
npm install
```

### 3. Iniciar o Projeto

```bash
npm run dev
```

O projeto iniciará em `http://localhost:5173` (porta padrão do Vite).

## 🔐 Fluxo de Autenticação

### Login:
1. Usuário insere email e senha
2. Validação local do formulário
3. Requisição `POST /api/auth/login` com credenciais
4. Backend valida e retorna `{ user, token }`
5. Token é salvo em `localStorage` como `authToken`
6. Dados do usuário são salvos em `localStorage` como `user`
7. Usuário é redirecionado para a dashboard

### Signup:
1. Usuário preenche formulário (nome, email, senha)
2. Validação local do formulário
3. Requisição `POST /api/users` para criar o usuário
4. Após criação, faz login automaticamente
5. Mesmo fluxo de login é seguido

### Logout:
1. Chamada `POST /api/auth/logout`
2. Limpeza de `localStorage`
3. Redirecionamento para login

## 📡 Endpoints Usados

### Backend Esperado:

```
POST /api/auth/login
  Body: { email: string, password: string }
  Response: { user: { id, name, email, type }, token: string, message: string }

POST /api/auth/logout (requer token de autenticação)
  Response: { message: string }

POST /api/users (criar novo usuário)
  Body: { name, email, password, type, balance, creditScore, configuration }
  Response: { user completo }

POST /api/auth/refresh (opcional - para renovar token)
  Response: { token: string }
```

## 🛡️ Segurança

### Implementado:

- ✅ **JWT Bearer Token** - Token incluído em header `Authorization: Bearer {token}`
- ✅ **localStorage** - Armazenamento seguro do token
- ✅ **Validação de Formulário** - Validação client-side antes de enviar
- ✅ **Tratamento de Erros** - Mensagens de erro específicas ao usuário
- ✅ **Auto Logout** - Remove token se inválido

### Recomendações para Produção:

- 🔒 Use HTTPS em produção
- 🔒 Configure CORS apropriadamente no backend
- 🔒 Implemente refresh token para renovação automática
- 🔒 Configure httpOnly cookies em vez de localStorage (mais seguro)
- 🔒 Implemente rate limiting no backend
- 🔒 Valide e sanitize inputs no backend

## 🐛 Tratamento de Erros

Os componentes tratam os seguintes erros:

| Erro | Mensagem |
|------|----------|
| Email/senha inválidos | "Email ou senha inválidos" |
| Erro de conexão | "Erro de conexão. Verifique se o servidor está rodando." |
| Email já cadastrado | "Este email já está cadastrado" |
| Campos inválidos | Mensagens específicas (email inválido, senha curta, etc) |

## 🧪 Testando

### Teste 1: Login com Credenciais Válidas

```bash
# Acesse http://localhost:5173/login
# Email: teste@email.com
# Senha: senha123
```

### Teste 2: Criar Nova Conta

```bash
# Acesse http://localhost:5173/signup
# Preencha o formulário
# Clique em "Criar Conta"
# Você será redirecionado para a dashboard automaticamente
```

### Teste 3: Verificar Token no LocalStorage

```javascript
// No console do navegador (F12):
console.log(localStorage.getItem('authToken'))
console.log(JSON.parse(localStorage.getItem('user')))
```

## 🔗 Integração com Serviços

O `AuthContext` usa `authService` que usa `apiCall` para fazer requisições:

```
AuthContext.jsx
    ↓
authService.js (login, signup, logout)
    ↓
api.js (apiCall com headers e autenticação)
    ↓
Backend API
```

## 📝 Exemplo de Uso nos Componentes

```javascript
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { user, login, logout, isAuthenticated, loading } = useAuth()

  const handleLogin = async () => {
    try {
      await login('email@example.com', 'password')
      // Usuario logado com sucesso
    } catch (error) {
      console.error('Erro:', error.message)
    }
  }

  if (loading) return <p>Carregando...</p>

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Bem-vindo, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  )
}
```

## 🚨 Possíveis Problemas

### 1. "Erro de conexão. Verifique se o servidor está rodando."

**Solução:**
- Verifique se o backend está rodando na porta 3000
- Confira a URL em `.env`
- Verif CORS no backend

### 2. "Email ou senha inválidos"

**Solução:**
- Crie um novo usuário via signup
- Verifique as credenciais no banco de dados

### 3. Token não está sendo enviado

**Solução:**
- Abra DevTools (F12) → Network → clique em requisição
- Verifique se o header `Authorization` está presente
- Verifique se o token foi salvo em localStorage

### 4. Redireciona para login após carregar a página

**Solução:**
- O token pode ter expirado
- Implemente refresh token no backend
- Verifique o tempo de expiração do token

## 📚 Arquivos Importantes

```
src/
├── services/
│   ├── api.js                 # Cliente HTTP
│   ├── authService.js         # Lógica de auth
│   └── index.js               # Exportações
├── contexts/
│   └── AuthContext.jsx        # Context provider
├── components/
│   ├── Login.jsx              # Tela de login
│   ├── Login.css              # Estilos
│   ├── Signup.jsx             # Tela de signup
│   └── Signup.css             # Estilos
└── .env                       # Variáveis de ambiente
```

## 🎯 Próximos Passos

1. Implemente ProtectedRoute com token validation
2. Adicione refresh token automático
3. Implemente "Remember Me" (opcional)
4. Adicione validação de email (verificação de email)
5. Implemente recuperação de senha
6. Adicione 2FA (autenticação de dois fatores)

## 📞 Suporte

Para dúvidas sobre a API, consulte:
- Documentação do backend: `../Hub-Financeiro-M-vel-com-IA---Hackatoon`
- Endpoints: `/src/Controller/authController.ts`
- Serviço: `/src/Services/authService.ts`

---

**Versão:** 1.0.0  
**Data:** 27 de novembro de 2025  
**Status:** ✅ Implementado e testado
