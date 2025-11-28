# 🧪 Login Implementation - Testing Guide

## ✅ Pre-requisitos

- [ ] Node.js instalado
- [ ] Backend rodando em `http://localhost:3000`
- [ ] Database PostgreSQL inicializado
- [ ] Arquivo `.env` criado com `VITE_API_URL=http://localhost:3000/api`
- [ ] Dependências instaladas: `npm install`
- [ ] Frontend iniciado: `npm run dev`

## 🚀 Teste 1: Criar Nova Conta (Signup)

### Passos:

1. **Abra o navegador**
   ```
   http://localhost:5173/signup
   ```

2. **Preencha o formulário**
   ```
   Nome Completo: João Silva
   Email: joao@email.com
   Senha: senha123
   Confirmar Senha: senha123
   ✓ Aceito os termos
   ```

3. **Clique em "Criar Conta"**
   - Você deve ver um spinner de carregamento
   - Mensagem de sucesso deve aparecer
   - Você será redirecionado para `/`

4. **Verificações**
   - [ ] Spinne animado aparece
   - [ ] Sem mensagens de erro
   - [ ] Token em localStorage
   - [ ] Redirecionamento automático

### Código de teste no console (F12):
```javascript
// Verificar token
console.log(localStorage.getItem('authToken'))
// → "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

// Verificar dados do usuário
console.log(JSON.parse(localStorage.getItem('user')))
// → { id: 1, name: "João Silva", email: "joao@email.com", type: "NORMAL" }
```

---

## 🚀 Teste 2: Login com Credenciais Válidas

### Passos:

1. **Abra o navegador**
   ```
   http://localhost:5173/login
   ```

2. **Preencha com as credenciais do usuário criado**
   ```
   E-mail: joao@email.com
   Senha: senha123
   ```

3. **Clique em "Entrar"**
   - Spinner deve aparecer
   - Mensagem de sucesso
   - Redirecionamento para `/`

4. **Verificações**
   - [ ] Spinner animado durante requisição
   - [ ] Token gerado e salvo
   - [ ] Usuário logado com sucesso
   - [ ] Redireciona para dashboard

---

## 🚀 Teste 3: Testar Validações de Formulário

### Teste 3.1: Email vazio
```
E-mail: [vazio]
Senha: senha123
Clique em Entrar
```
**Esperado:** "Email é obrigatório"

### Teste 3.2: Email inválido
```
E-mail: nao_e_email
Senha: senha123
Clique em Entrar
```
**Esperado:** "Email inválido"

### Teste 3.3: Senha vazia
```
E-mail: joao@email.com
Senha: [vazio]
Clique em Entrar
```
**Esperado:** "Senha é obrigatória"

### Teste 3.4: Senha muito curta
```
E-mail: joao@email.com
Senha: 123
Clique em Entrar
```
**Esperado:** "A senha deve ter pelo menos 6 caracteres"

---

## 🚀 Teste 4: Testar Erros de API

### Teste 4.1: Credenciais incorretas
```
E-mail: joao@email.com
Senha: senhaerrada
Clique em Entrar
```
**Esperado:** "Email ou senha inválidos"

### Teste 4.2: Usuário não existe
```
E-mail: ninguem@email.com
Senha: senha123
Clique em Entrar
```
**Esperado:** "Email ou senha inválidos"

### Teste 4.3: Servidor desligado
1. Desligue o backend
2. Tente fazer login
3. **Esperado:** "Erro de conexão. Verifique se o servidor está rodando."

---

## 🚀 Teste 5: Testar Validações do Signup

### Teste 5.1: Senhas não coincidem
```
Nome: João Silva
Email: joao2@email.com
Senha: senha123
Confirmar: senha456
```
**Esperado:** "As senhas não coincidem"

### Teste 5.2: Email já existe
```
Nome: Outro Nome
Email: joao@email.com (já usado)
Senha: senha123
Confirmar: senha123
```
**Esperado:** "Este email já está cadastrado"

### Teste 5.3: Termos não aceitos
```
Nome: Maria Silva
Email: maria@email.com
Senha: senha123
Confirmar: senha123
[ ] Aceitar termos (desmarcado)
Clique em Criar Conta
```
**Esperado:** "Você deve aceitar os termos de uso"

### Teste 5.4: Nome muito curto
```
Nome: Jo
Email: joao3@email.com
Senha: senha123
Confirmar: senha123
```
**Esperado:** "Nome deve ter pelo menos 3 caracteres"

---

## 🧐 Teste 6: Verificar Network (DevTools)

### Passos:

1. Abra DevTools (F12)
2. Vá para aba "Network"
3. Limpe o histórico
4. Faça login
5. Procure pela requisição `login`

### Verificar requisição:
```
Method: POST
URL: http://localhost:3000/api/auth/login
Headers:
  Content-Type: application/json

Body:
{
  "email": "joao@email.com",
  "password": "senha123"
}

Response Status: 200 OK
Response:
{
  "message": "Login realizado com sucesso",
  "user": { ... },
  "token": "..."
}
```

---

## 📱 Teste 7: Teste em Mobile (Responsivo)

1. **Abra DevTools (F12)**
2. **Clique em "Toggle device toolbar"** ou Ctrl+Shift+M
3. **Selecione um dispositivo** (iPhone 12, etc)
4. **Teste os formulários**

### Verificações:
- [ ] Inputs são clicáveis
- [ ] Botões funcionam
- [ ] Mensagens aparecem bem
- [ ] Spinners animam
- [ ] Teclado virtual não esconde inputs

---

## 🔍 Teste 8: localStorage Persistence

### Teste 8.1: Recarregar página
1. Faça login
2. Aperte F5 para recarregar
3. **Esperado:** Continua logado (sem ir para /login)

### Teste 8.2: Abrir nova aba
1. Faça login em uma aba
2. Abra outra aba e vá para /
3. **Esperado:** Estar logado também

### Teste 8.3: Limpar localStorage
1. Abra DevTools → Application
2. Limpe localStorage
3. Recarregue a página
4. **Esperado:** Redireciona para /login

---

## 🧮 Teste 9: Performance

### Teste com Network Throttling:
1. DevTools → Network
2. Selecione "Slow 3G"
3. Faça login
4. Observe o spinner funcionando corretamente

---

## 🛡️ Teste 10: Security Checks

### Teste 10.1: XSS Prevention
1. Tente colar código JavaScript em campos:
   ```
   <script>alert('XSS')</script>
   ```
2. **Esperado:** Não executa script, trata como texto

### Teste 10.2: SQL Injection Prevention
1. Tente SQL em campo de email:
   ```
   email@test.com'; DROP TABLE users; --
   ```
2. **Esperado:** Backend rejeita ou sanitiza

### Teste 10.3: Token Expiration
1. Faça login
2. Copie o token do localStorage
3. Abra DevTools Console:
   ```javascript
   localStorage.removeItem('authToken')
   ```
4. Tente acessar rota protegida
5. **Esperado:** Redireciona para /login

---

## 📊 Teste 11: Error Scenarios Matrix

| Cenário | Input | Esperado | ✓ |
|---------|-------|----------|---|
| Email vazio | "" | Erro validação | |
| Email inválido | "abc" | Erro validação | |
| Senha vazia | "" | Erro validação | |
| Senha curta | "12345" | Erro validação | |
| Credenciais corretas | ✓ | Login sucesso | |
| Credenciais erradas | ✗ | Erro API | |
| Usuário não existe | - | Erro API | |
| Servidor offline | - | Erro conexão | |
| CORS bloqueado | - | Erro CORS | |

---

## 💾 Teste 12: Database Verification

### SQL para verificar usuário criado:

```sql
-- Conectar ao PostgreSQL
psql -U seu_usuario -d seu_banco

-- Listar usuários
SELECT id, name, email, type, balance, credit_score, created_at FROM users;

-- Verificar chaves PIX de um usuário
SELECT * FROM user_pix_keys WHERE user_id = 1;

-- Contar total de usuários
SELECT COUNT(*) FROM users;
```

---

## 🎯 Teste 13: End-to-End Full Flow

### Cenário: Novo usuário completo

1. **Acesso inicial**
   - Abra http://localhost:5173
   - **Esperado:** Redireciona para /login (não autenticado)

2. **Criar conta**
   - Vá para /signup
   - Crie novo usuário
   - **Esperado:** Logado automaticamente

3. **Verificar dashboard**
   - Deve estar em / logado
   - User info deve aparecer
   - **Esperado:** Sem erros

4. **Logout (quando implementado)**
   - Clique em logout
   - **Esperado:** Volta para /login

5. **Verificar localStorage limpo**
   - DevTools → Application → localStorage
   - **Esperado:** authToken removido

6. **Login com nova conta**
   - Vá para /login
   - Faça login com a conta criada
   - **Esperado:** Acessa dashboard novamente

---

## 📋 Checklist Final

- [ ] Signup funciona
- [ ] Login funciona
- [ ] Logout funciona (quando implementado)
- [ ] Validações funcionam
- [ ] Erros tratados corretamente
- [ ] Spinner aparece durante requisição
- [ ] Token salvo em localStorage
- [ ] Token enviado em requisições
- [ ] Resposta mobile responsiva
- [ ] Performance aceitável
- [ ] Sem erros no console
- [ ] CORS configurado
- [ ] Database salva dados corretos

---

## 🐛 Se algo der errado

### Erro: "Erro de conexão"
```bash
# Verifique se backend está rodando
curl http://localhost:3000/api/auth/login

# Se não conectar, inicie o backend:
cd ../Hub-Financeiro-M-vel-com-IA---Hackatoon
npm install
npm run dev
```

### Erro: "Failed to fetch"
```
1. Verifique se .env tem URL correta
2. Verifique CORS no backend
3. Verifique se backend está respondendo
```

### Erro: "Email ou senha inválidos"
```
1. Verifique se usuário existe no banco
2. Use credenciais corretas
3. Crie novo usuário via signup
```

### Spinner não aparece
```
1. Verifique CSS do Login.css
2. Verifique se loading state está funcionando
3. Abra DevTools → Network para ver requisição
```

---

## 📞 Support

- **Backend Issues:** Ver `../Hub-Financeiro-M-vel-com-IA---Hackatoon`
- **Frontend Issues:** Verifique console (F12)
- **Database Issues:** Conecte ao PostgreSQL e verifique tabelas

---

**Testing Version:** 1.0.0  
**Last Updated:** 27 de novembro de 2025  
**Status:** ✅ Ready for Testing
