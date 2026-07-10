# HWP Platform 3.0

# 11 - API SPECIFICATION

Versão: 1.0

Status: Oficial

Documento responsável pela especificação oficial de todas as APIs do HWP Platform.

---

# Objetivo

Este documento define os contratos oficiais de comunicação entre clientes e serviços do HWP Platform.

Toda comunicação externa deverá seguir esta especificação.

---

# Filosofia

As APIs deverão ser.

Simples.

↓

Consistentes.

↓

Versionadas.

↓

Seguras.

↓

Determinísticas.

↓

Escaláveis.

↓

Documentadas.

---

A API representa a única forma oficial de comunicação entre aplicações e serviços.

---

# Arquitetura

Client Apps

↓

API Client

↓

HTTPS

↓

API Gateway

↓

API Controllers

↓

Core Engines

↓

Repositories

↓

Storage

---

Nenhum Client deverá acessar Engines diretamente.

---

# Clientes Oficiais

iOS.

↓

Android.

↓

Web.

↓

Desktop (futuro).

↓

Watch (futuro).

↓

Widgets (futuro).

↓

Serviços internos.

---

Todos utilizarão exatamente os mesmos contratos.

---

# API Gateway

Responsável por.

Receber requisições.

↓

Autenticar.

↓

Autorizar.

↓

Versionar.

↓

Rate Limit.

↓

Logs.

↓

Observabilidade.

↓

Encaminhamento.

---

Nunca executar regras de negócio.

---

# API Controllers

Responsáveis por.

Validar requisições.

↓

Validar Payloads.

↓

Converter DTOs.

↓

Chamar Core Engines.

↓

Converter respostas.

↓

Retornar Responses.

---

Nunca implementar regras de negócio.

---

# Fluxo Oficial

Client

↓

API Client

↓

API Gateway

↓

Controller

↓

Core Engine

↓

Repository

↓

Storage

↓

Response

---

Toda regra de negócio pertence aos Core Engines.

---

# API Design

Padrão REST.

↓

JSON UTF-8.

↓

HTTPS obrigatório.

↓

Versionamento.

↓

OpenAPI.

↓

Idempotência quando aplicável.

---

# Convenções

Base URL.

```
/api/v1
```

---

Recursos.

```
/nutrition

/workouts

/medications

/goals

/body

/timeline

/search

/backup

/sync

/ai
```

---

Métodos Oficiais

GET

↓

POST

↓

PUT

↓

PATCH

↓

DELETE

---

Nunca utilizar verbos na URL.

---

Exemplo.

Correto.

```
POST /nutrition/meals
```

---

Incorreto.

```
POST /createMeal
```

---

# Formato Oficial

Request

↓

Headers

↓

Body

↓

Validation

↓

Controller

↓

Core Engine

↓

Response

---

# Content-Type

Sempre.

```
application/json
```

---

Uploads.

```
multipart/form-data
```

---

Downloads.

```
application/octet-stream
```

---

# Response Pattern

Toda resposta deverá possuir.

success

↓

data

↓

metadata

↓

errors

↓

requestId

↓

timestamp

---

Mesmo em erros.

---

# Status HTTP

200 OK

201 Created

204 No Content

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

422 Validation Error

429 Too Many Requests

500 Internal Error

503 Service Unavailable

---

# Versionamento

Toda API possuirá.

Major.

↓

Minor.

↓

Patch.

---

Exemplo.

```
/api/v1
```

---

Mudanças incompatíveis.

Nova versão.

---

# Objetivo Final

Criar uma API única, consistente, segura e preparada para expansão futura, permitindo que qualquer cliente do HWP Platform consuma os mesmos contratos de forma previsível.

# AUTHENTICATION API

---

# Objetivo

A Authentication API é responsável pela autenticação, autorização e gerenciamento de sessões do HWP Platform.

Nenhuma outra API deverá implementar autenticação própria.

---

# Filosofia

Toda requisição deverá possuir.

Identidade.

↓

Permissão.

↓

Sessão válida.

↓

Contexto.

---

Nunca confiar em informações enviadas pelo Client.

---

# Responsabilidades

Autenticação.

↓

Renovação de Token.

↓

Logout.

↓

Validação de Sessão.

↓

Revogação.

↓

Gerenciamento de Dispositivos.

↓

Publicação de Eventos.

---

Nunca executar regras de negócio.

---

# Base URL

```
/api/v1/auth
```

---

# Endpoints Oficiais

POST

```
/login
```

---

POST

```
/refresh
```

---

POST

```
/logout
```

---

GET

```
/session
```

---

GET

```
/devices
```

---

DELETE

```
/devices/{deviceId}
```

---

# Login

POST

```
/login
```

---

Request

```
{
  "email": "user@email.com",
  "password": "********",
  "device": {
    "id": "...",
    "name": "iPhone 16",
    "platform": "iOS"
  }
}
```

---

Response

```
{
  "success": true,
  "data": {
      "accessToken": "...",
      "refreshToken": "...",
      "expiresIn": 3600,
      "user": {}
  },
  "metadata": {},
  "errors": [],
  "requestId": "...",
  "timestamp": "..."
}
```

---

# Refresh Token

POST

```
/refresh
```

---

Request

```
{
   "refreshToken":"..."
}
```

---

Response

Novo Access Token.

↓

Novo Expiration.

↓

Novo Refresh quando necessário.

---

# Logout

POST

```
/logout
```

---

Request

```
{
   "allDevices": false
}
```

---

Permitir.

Logout atual.

↓

Logout global.

---

# Session

GET

```
/session
```

---

Retorna.

Usuário.

↓

Sessão.

↓

Permissões.

↓

Dispositivo.

↓

Última sincronização.

↓

Plano.

---

# Devices

GET

```
/devices
```

---

Retorna.

Lista de dispositivos autorizados.

↓

Data de acesso.

↓

Plataforma.

↓

Última atividade.

---

# Remove Device

DELETE

```
/devices/{deviceId}
```

---

Revoga apenas um dispositivo.

---

# Access Token

JWT.

---

Conter.

User ID.

↓

Issued At.

↓

Expiration.

↓

Version.

↓

Scopes.

---

Nunca armazenar dados sensíveis.

---

# Refresh Token

Longa duração.

↓

Rotação automática.

↓

Revogável.

↓

Hash armazenado.

---

Nunca reutilizar Refresh Token expirado.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

Opcional.

```
X-Request-ID

X-App-Version

X-Platform

X-Device-ID

Accept-Language
```

---

# Autorização

Toda requisição deverá validar.

Token.

↓

Sessão.

↓

Permissões.

↓

Versão.

↓

Estado do usuário.

---

# Erros

400

Payload inválido.

---

401

Token inválido.

↓

Token expirado.

↓

Sessão inexistente.

---

403

Permissão insuficiente.

---

409

Conflito de sessão.

---

429

Limite excedido.

---

500

Erro interno.

---

# Eventos Publicados

UserAuthenticated.

↓

SessionCreated.

↓

SessionRefreshed.

↓

SessionExpired.

↓

SessionRevoked.

↓

LogoutCompleted.

---

# Segurança

HTTPS obrigatório.

↓

JWT assinado.

↓

Refresh Token rotativo.

↓

Rate Limit.

↓

Detecção de Replay.

↓

Revogação imediata.

---

# Rate Limit

Login.

10/minuto.

---

Refresh.

30/minuto.

---

Logout.

20/minuto.

---

# Observabilidade

Registrar.

Tempo de autenticação.

↓

Falhas.

↓

Sessões criadas.

↓

Sessões expiradas.

↓

Dispositivos ativos.

---

Nunca registrar.

Senha.

↓

Refresh Token.

↓

Access Token.

---

# Testes Obrigatórios

Authentication Tests.

↓

Authorization Tests.

↓

JWT Tests.

↓

Refresh Tests.

↓

Replay Tests.

↓

Rate Limit Tests.

↓

Performance Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ JWT válido.

✓ Refresh rotativo.

✓ Logout seguro.

✓ Sessões versionadas.

✓ Revogação imediata.

✓ Compatível com Event Bus.

✓ Compatível com Sync Engine.

✓ Compatível com Backup Engine.

✓ Compatível com futuras integrações.

# USER API

---

# Objetivo

A User API é responsável pelo gerenciamento do perfil do usuário, preferências, configurações e informações pessoais utilizadas pelo HWP Platform.

Nenhuma outra API deverá modificar dados do usuário.

---

# Filosofia

O Perfil do Usuário representa a identidade funcional dentro do HWP Platform.

A autenticação identifica.

↓

A User API personaliza.

---

# Responsabilidades

Consultar Perfil.

↓

Atualizar Perfil.

↓

Atualizar Preferências.

↓

Atualizar Configurações.

↓

Gerenciar Avatar.

↓

Gerenciar Idioma.

↓

Gerenciar Unidade de Medidas.

↓

Publicar Eventos.

---

Nunca executar regras de negócio.

---

# Base URL

```
/api/v1/users
```

---

# Endpoints Oficiais

GET

```
/me
```

---

PATCH

```
/me
```

---

GET

```
/preferences
```

---

PATCH

```
/preferences
```

---

GET

```
/settings
```

---

PATCH

```
/settings
```

---

POST

```
/avatar
```

---

DELETE

```
/avatar
```

---

# Perfil

GET

```
/me
```

---

Retorna.

User ID.

↓

Nome.

↓

Email.

↓

Data de Cadastro.

↓

Idioma.

↓

Fuso Horário.

↓

Sistema de Medidas.

↓

Plano.

↓

Avatar.

↓

Status.

---

# Atualizar Perfil

PATCH

```
/me
```

---

Request

```
{
    "name":"Felipe Karam",
    "timezone":"America/Sao_Paulo",
    "language":"pt-BR"
}
```

---

Atualização parcial.

Obrigatória.

---

# Preferências

GET

```
/preferences
```

---

Retorna.

Tema.

↓

Modo Escuro.

↓

Unidade de Peso.

↓

Unidade de Altura.

↓

Formato de Data.

↓

Primeiro dia da semana.

↓

Configurações futuras.

---

# Atualizar Preferências

PATCH

```
/preferences
```

---

Exemplo.

```
{
   "theme":"system",
   "weightUnit":"kg",
   "heightUnit":"cm"
}
```

---

# Configurações

GET

```
/settings
```

---

Retorna.

Notificações.

↓

Backup Automático.

↓

Sincronização.

↓

Permissões.

↓

Configurações da IA.

↓

Privacidade.

---

# Atualizar Configurações

PATCH

```
/settings
```

---

Atualização parcial.

---

# Avatar

POST

```
/avatar
```

---

Upload.

```
multipart/form-data
```

---

Formatos.

JPEG.

↓

PNG.

↓

WEBP.

---

Tamanho máximo.

10 MB.

---

DELETE

```
/avatar
```

---

Remove avatar.

Mantém perfil.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Response Pattern

Todas as respostas seguirão.

```
success

data

metadata

errors

requestId

timestamp
```

---

# Eventos Publicados

UserProfileUpdated.

↓

UserPreferencesUpdated.

↓

UserSettingsUpdated.

↓

UserAvatarUpdated.

↓

UserAvatarRemoved.

---

# Validações

Nome.

Máximo.

100 caracteres.

---

Idioma.

Lista suportada.

---

Timezone.

IANA Timezone.

---

Avatar.

Imagem válida.

↓

Limite de tamanho.

↓

Formato permitido.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Upload validado.

↓

Sanitização.

↓

Rate Limit.

---

# Rate Limit

Consulta.

120/minuto.

---

Atualização.

30/minuto.

---

Upload.

10/minuto.

---

# Erros

400

Payload inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

404

Usuário não encontrado.

---

409

Conflito de atualização.

---

413

Arquivo muito grande.

---

415

Formato não suportado.

---

500

Erro interno.

---

# Observabilidade

Registrar.

Tempo de resposta.

↓

Atualizações.

↓

Uploads.

↓

Downloads.

↓

Falhas.

↓

Rate Limit.

---

Nunca registrar.

Imagem.

↓

Dados privados.

↓

Tokens.

---

# Testes Obrigatórios

Profile Tests.

↓

Preferences Tests.

↓

Settings Tests.

↓

Avatar Tests.

↓

Upload Tests.

↓

Security Tests.

↓

Performance Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ Atualização parcial.

✓ Upload seguro.

✓ JWT obrigatório.

✓ Configurações versionadas.

✓ Compatível com Authentication API.

✓ Compatível com Sync Engine.

✓ Compatível com Backup Engine.

✓ Compatível com Event Bus.

# NUTRITION API

---

# Objetivo

A Nutrition API é responsável por todo o gerenciamento das refeições, alimentos, biblioteca inteligente e análises nutricionais do HWP Platform.

Nenhuma outra API deverá manipular dados nutricionais diretamente.

---

# Filosofia

Toda refeição deverá ser tratada como uma entidade completa.

↓

Toda alteração deverá produzir uma Nutrition Analysis.

↓

Toda operação deverá ser incremental.

---

Nunca calcular métricas na API.

Essa responsabilidade pertence ao Nutrition Engine.

---

# Responsabilidades

Cadastrar refeições.

↓

Editar refeições.

↓

Excluir refeições.

↓

Consultar refeições.

↓

Consultar alimentos.

↓

Pesquisar Biblioteca Inteligente.

↓

Gerenciar favoritos.

↓

Importar HWP_FOOD.

↓

Solicitar Nutri IA+.

↓

Publicar eventos.

---

Nunca acessar Storage diretamente.

---

# Base URL

```
/api/v1/nutrition
```

---

# Endpoints Oficiais

## Meals

GET

```
/meals
```

---

GET

```
/meals/{mealId}
```

---

POST

```
/meals
```

---

PATCH

```
/meals/{mealId}
```

---

DELETE

```
/meals/{mealId}
```

---

POST

```
/meals/{mealId}/duplicate
```

---

## Biblioteca Inteligente

GET

```
/foods
```

---

GET

```
/foods/search
```

---

GET

```
/foods/recent
```

---

GET

```
/foods/favorites
```

---

POST

```
/foods/favorites
```

---

DELETE

```
/foods/favorites/{foodId}
```

---

## Nutri IA+

POST

```
/import/hwp-food
```

---

POST

```
/analyze
```

---

# Cadastro de Refeição

POST

```
/meals
```

---

Request

```
{
  "mealType":"Lunch",
  "date":"2026-07-03",
  "time":"12:30",
  "foods":[
      {
          "foodId":"...",
          "quantity":150,
          "unit":"g"
      }
  ],
  "notes":"..."
}
```

---

Response

```
{
   "success":true,
   "data":{
      "mealId":"...",
      "nutritionAnalysis":{}
   },
   "metadata":{},
   "errors":[],
   "requestId":"...",
   "timestamp":"..."
}
```

---

# Consulta

GET

```
/meals
```

---

Filtros suportados.

Data.

↓

Período.

↓

Tipo de refeição.

↓

Favoritos.

↓

Categoria.

↓

Origem.

---

Paginação obrigatória.

---

# Atualização

PATCH

```
/meals/{mealId}
```

---

Atualização parcial.

Obrigatória.

---

Nunca substituir objeto inteiro.

---

# Exclusão

DELETE

```
/meals/{mealId}
```

---

Soft Delete.

Obrigatório.

---

Nunca remover imediatamente.

---

# Duplicação

POST

```
/meals/{mealId}/duplicate
```

---

Retorna.

Nova refeição.

↓

Novo ID.

↓

Mesmo conteúdo.

↓

Nova data quando informada.

---

# Biblioteca Inteligente

Pesquisa.

```
GET /foods/search?q=frango
```

---

Retorna.

Alimentos.

↓

Categorias.

↓

Favoritos.

↓

Recentes.

↓

Sugestões.

---

# Favoritos

POST

```
/foods/favorites
```

---

Request

```
{
   "foodId":"..."
}
```

---

DELETE

```
/foods/favorites/{foodId}
```

---

# Importação HWP_FOOD

POST

```
/import/hwp-food
```

---

Request

```
{
   "content":"HWP_FOOD..."
}
```

---

Response

Preview.

↓

Nutrition Analysis.

↓

Warnings.

↓

Suggestions.

---

Nunca persistir automaticamente.

---

# Nutri IA+

POST

```
/analyze
```

---

Retorna.

Nutrition Analysis.

↓

Sugestões.

↓

Resumo.

↓

Alertas.

↓

Recomendações.

---

Sempre baseada no AI Integration Engine.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Eventos Publicados

MealCreated.

↓

MealUpdated.

↓

MealDeleted.

↓

MealDuplicated.

↓

MealImported.

↓

NutritionAnalysisGenerated.

↓

FavoriteFoodUpdated.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Validação de Payload.

↓

Rate Limit.

↓

Sanitização.

---

# Rate Limit

Consulta.

120/minuto.

---

Cadastro.

60/minuto.

---

Pesquisa.

120/minuto.

---

Importação.

30/minuto.

---

Nutri IA+.

20/minuto.

---

# Erros

400

Payload inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

404

Refeição não encontrada.

---

409

Conflito.

---

413

Payload muito grande.

---

422

Erro de validação nutricional.

---

500

Erro interno.

---

# Observabilidade

Registrar.

Tempo de cadastro.

↓

Tempo de pesquisa.

↓

Tempo de importação.

↓

Tempo da IA.

↓

Quantidade de refeições.

↓

Rate Limit.

---

Nunca registrar conteúdo alimentar completo em Logs técnicos.

---

# Testes Obrigatórios

Meals Tests.

↓

Foods Tests.

↓

Search Tests.

↓

Favorites Tests.

↓

Import Tests.

↓

Nutri IA Tests.

↓

Performance Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ CRUD completo.

✓ Biblioteca Inteligente.

✓ Pesquisa rápida.

✓ Favoritos.

✓ Importação HWP_FOOD.

✓ Nutri IA+.

✓ Compatível com Nutrition Engine.

✓ Compatível com Metrics Engine.

✓ Compatível com Event Bus.

✓ Compatível com Sync Engine.

# WORKOUT API

---

# Objetivo

A Workout API é responsável pelo gerenciamento de treinos, sessões, templates e histórico de atividades físicas do HWP Platform.

Nenhuma outra API deverá manipular informações de treino diretamente.

---

# Filosofia

Todo treino deverá ser tratado como uma Workout Session.

↓

Toda alteração deverá gerar eventos.

↓

Todo processamento será realizado pelo Workout Engine.

---

Nunca calcular métricas na API.

---

# Responsabilidades

Cadastrar treinos.

↓

Editar treinos.

↓

Excluir treinos.

↓

Duplicar treinos.

↓

Consultar histórico.

↓

Gerenciar templates.

↓

Gerenciar favoritos.

↓

Importações futuras.

↓

Publicar eventos.

---

Nunca acessar Storage diretamente.

---

# Base URL

```
/api/v1/workouts
```

---

# Endpoints Oficiais

## Workout Sessions

GET

```
/
```

---

GET

```
/{workoutId}
```

---

POST

```
/
```

---

PATCH

```
/{workoutId}
```

---

DELETE

```
/{workoutId}
```

---

POST

```
/{workoutId}/duplicate
```

---

POST

```
/{workoutId}/complete
```

---

## Templates

GET

```
/templates
```

---

POST

```
/templates
```

---

PATCH

```
/templates/{templateId}
```

---

DELETE

```
/templates/{templateId}
```

---

## Favorites

GET

```
/favorites
```

---

POST

```
/favorites
```

---

DELETE

```
/favorites/{templateId}
```

---

# Cadastro de Treino

POST

```
/
```

---

Request

```
{
   "type":"Strength",
   "date":"2026-07-03",
   "startTime":"18:00",
   "plannedDuration":60,
   "templateId":"...",
   "notes":"..."
}
```

---

Response

```
{
   "success":true,
   "data":{
      "workoutId":"...",
      "status":"Planned"
   },
   "metadata":{},
   "errors":[],
   "requestId":"...",
   "timestamp":"..."
}
```

---

# Consulta

GET

```
/
```

---

Filtros suportados.

Data.

↓

Período.

↓

Tipo.

↓

Status.

↓

Template.

↓

Favoritos.

---

Paginação obrigatória.

---

# Atualização

PATCH

```
/{workoutId}
```

---

Atualização parcial.

Obrigatória.

---

# Conclusão

POST

```
/{workoutId}/complete
```

---

Request

```
{
   "endTime":"19:02",
   "duration":62,
   "rpe":8,
   "notes":"Treino excelente."
}
```

---

Atualiza.

Status.

↓

Horário final.

↓

Duração.

↓

Esforço percebido.

↓

Observações.

---

# Exclusão

DELETE

```
/{workoutId}
```

---

Soft Delete obrigatório.

---

# Duplicação

POST

```
/{workoutId}/duplicate
```

---

Cria nova Workout Session.

↓

Novo ID.

↓

Mesmo conteúdo.

---

# Templates

Cada Template deverá possuir.

Nome.

↓

Categoria.

↓

Lista de exercícios.

↓

Observações.

↓

Última utilização.

↓

Quantidade de utilizações.

---

# Favoritos

Permitir.

Adicionar.

↓

Remover.

↓

Consultar.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Eventos Publicados

WorkoutCreated.

↓

WorkoutUpdated.

↓

WorkoutCompleted.

↓

WorkoutDeleted.

↓

WorkoutDuplicated.

↓

WorkoutTemplateUpdated.

↓

WorkoutFavoriteUpdated.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Validação de Payload.

↓

Rate Limit.

---

# Rate Limit

Consulta.

120/minuto.

---

Cadastro.

60/minuto.

---

Conclusão.

60/minuto.

---

Templates.

30/minuto.

---

# Erros

400

Payload inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

404

Treino não encontrado.

---

409

Conflito.

---

422

Erro de validação.

---

500

Erro interno.

---

# Observabilidade

Registrar.

Tempo de cadastro.

↓

Tempo de atualização.

↓

Tempo de conclusão.

↓

Quantidade de treinos.

↓

Templates utilizados.

↓

Rate Limit.

---

Nunca registrar informações pessoais sensíveis.

---

# Testes Obrigatórios

Workout Tests.

↓

Template Tests.

↓

Favorites Tests.

↓

Completion Tests.

↓

Performance Tests.

↓

Security Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ CRUD completo.

✓ Workout Sessions.

✓ Templates.

✓ Favoritos.

✓ Soft Delete.

✓ Atualização parcial.

✓ Compatível com Workout Engine.

✓ Compatível com Metrics Engine.

✓ Compatível com Event Bus.

✓ Compatível com Sync Engine.

# MEDICATION API

---

# Objetivo

A Medication API é responsável pelo gerenciamento de tratamentos, medicamentos, aplicações, cronogramas e efeitos colaterais do HWP Platform.

Nenhuma outra API deverá manipular informações relacionadas a medicamentos diretamente.

---

# Filosofia

Todo medicamento deverá pertencer a um Treatment Plan.

↓

Toda aplicação deverá gerar eventos.

↓

Todo processamento será realizado pelo Medication Engine.

---

Nunca calcular métricas na API.

---

# Responsabilidades

Cadastrar tratamentos.

↓

Cadastrar medicamentos.

↓

Registrar aplicações.

↓

Editar aplicações.

↓

Registrar efeitos colaterais.

↓

Consultar histórico.

↓

Gerenciar cronogramas.

↓

Publicar eventos.

---

Nunca acessar Storage diretamente.

---

# Base URL

```
/api/v1/medications
```

---

# Endpoints Oficiais

## Treatment Plans

GET

```
/plans
```

---

GET

```
/plans/{planId}
```

---

POST

```
/plans
```

---

PATCH

```
/plans/{planId}
```

---

DELETE

```
/plans/{planId}
```

---

## Applications

GET

```
/applications
```

---

POST

```
/applications
```

---

PATCH

```
/applications/{applicationId}
```

---

## Side Effects

GET

```
/side-effects
```

---

POST

```
/side-effects
```

---

PATCH

```
/side-effects/{sideEffectId}
```

---

DELETE

```
/side-effects/{sideEffectId}
```

---

## Schedule

GET

```
/schedule
```

---

PATCH

```
/schedule
```

---

# Cadastro de Tratamento

POST

```
/plans
```

---

Request

```
{
    "name":"Tratamento Tirzepatida",
    "medication":"Tirzepatida",
    "startDate":"2026-07-03",
    "schedule":"Weekly",
    "initialDose":2.5,
    "unit":"mg"
}
```

---

Response

```
{
    "success":true,
    "data":{
        "planId":"...",
        "status":"Active"
    },
    "metadata":{},
    "errors":[],
    "requestId":"...",
    "timestamp":"..."
}
```

---

# Registro de Aplicação

POST

```
/applications
```

---

Request

```
{
    "planId":"...",
    "date":"2026-07-10",
    "time":"08:30",
    "dose":2.5,
    "unit":"mg",
    "notes":"..."
}
```

---

Atualiza automaticamente.

Histórico.

↓

Próxima aplicação.

↓

Timeline.

---

# Registro de Efeitos Colaterais

POST

```
/side-effects
```

---

Request

```
{
    "applicationId":"...",
    "symptom":"Náusea",
    "severity":"Moderate",
    "notes":"..."
}
```

---

Classificações oficiais.

Leve.

↓

Moderado.

↓

Intenso.

↓

Grave.

---

# Consulta de Cronograma

GET

```
/schedule
```

---

Retorna.

Próxima aplicação.

↓

Histórico.

↓

Mudanças de dose.

↓

Aderência.

↓

Status.

---

# Atualização do Cronograma

PATCH

```
/schedule
```

---

Permite.

Alterar frequência.

↓

Alterar dose.

↓

Reagendar aplicação.

↓

Suspender tratamento.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Eventos Publicados

TreatmentPlanCreated.

↓

TreatmentPlanUpdated.

↓

MedicationApplied.

↓

MedicationRescheduled.

↓

MedicationSkipped.

↓

SideEffectRegistered.

↓

TreatmentCompleted.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Validação de Payload.

↓

Rate Limit.

↓

Auditoria obrigatória.

---

# Rate Limit

Consulta.

120/minuto.

---

Cadastro.

30/minuto.

---

Aplicações.

60/minuto.

---

Side Effects.

60/minuto.

---

# Erros

400

Payload inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

404

Tratamento não encontrado.

↓

Aplicação não encontrada.

---

409

Conflito.

---

422

Erro de validação.

---

500

Erro interno.

---

# Observabilidade

Registrar.

Tempo de cadastro.

↓

Tempo de aplicação.

↓

Mudanças de dose.

↓

Quantidade de aplicações.

↓

Quantidade de Side Effects.

↓

Rate Limit.

---

Nunca registrar informações médicas sensíveis em Logs.

---

# Testes Obrigatórios

Treatment Tests.

↓

Application Tests.

↓

Schedule Tests.

↓

Side Effects Tests.

↓

Performance Tests.

↓

Security Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ Treatment Plans.

✓ Registro de aplicações.

✓ Cronograma automático.

✓ Histórico preservado.

✓ Side Effects.

✓ Compatível com Medication Engine.

✓ Compatível com Notification Engine.

✓ Compatível com Event Bus.

✓ Compatível com Sync Engine.

# GOALS API

---

# Objetivo

A Goals API é responsável pelo gerenciamento de metas, progresso, marcos e previsões do HWP Platform.

Nenhuma outra API deverá manipular metas diretamente.

---

# Filosofia

Toda meta deverá possuir.

Objetivo.

↓

Valor inicial.

↓

Valor alvo.

↓

Progresso.

↓

Status.

↓

Histórico.

↓

Previsão.

---

Todo processamento deverá ser realizado pelo Goals Engine.

---

# Responsabilidades

Cadastrar metas.

↓

Editar metas.

↓

Excluir metas.

↓

Consultar progresso.

↓

Consultar previsão.

↓

Consultar marcos.

↓

Pausar metas.

↓

Reativar metas.

↓

Publicar eventos.

---

Nunca calcular métricas na API.

---

# Base URL

```
/api/v1/goals
```

---

# Endpoints Oficiais

GET

```
/
```

---

GET

```
/{goalId}
```

---

POST

```
/
```

---

PATCH

```
/{goalId}
```

---

DELETE

```
/{goalId}
```

---

GET

```
/{goalId}/progress
```

---

GET

```
/{goalId}/forecast
```

---

GET

```
/{goalId}/milestones
```

---

POST

```
/{goalId}/pause
```

---

POST

```
/{goalId}/resume
```

---

# Cadastro de Meta

POST

```
/
```

---

Request

```
{
    "type":"Weight",
    "title":"Perder Peso",
    "initialValue":89,
    "targetValue":70,
    "unit":"kg",
    "targetDate":"2026-12-31"
}
```

---

Response

```
{
    "success":true,
    "data":{
        "goalId":"...",
        "status":"Active"
    },
    "metadata":{},
    "errors":[],
    "requestId":"...",
    "timestamp":"..."
}
```

---

# Consulta

GET

```
/
```

---

Filtros suportados.

Status.

↓

Tipo.

↓

Categoria.

↓

Período.

↓

Concluídas.

↓

Ativas.

↓

Pausadas.

---

Paginação obrigatória.

---

# Atualização

PATCH

```
/{goalId}
```

---

Atualização parcial.

Obrigatória.

---

# Exclusão

DELETE

```
/{goalId}
```

---

Soft Delete obrigatório.

---

Nunca excluir histórico.

---

# Progresso

GET

```
/{goalId}/progress
```

---

Retorna.

Valor atual.

↓

Percentual.

↓

Dias restantes.

↓

Velocidade.

↓

Status.

---

# Forecast

GET

```
/{goalId}/forecast
```

---

Retorna.

Data prevista.

↓

Velocidade média.

↓

Faixa de confiança.

↓

Probabilidade de conclusão.

---

Sempre calculado pelo Goals Engine.

---

# Milestones

GET

```
/{goalId}/milestones
```

---

Retorna.

10%.

↓

25%.

↓

50%.

↓

75%.

↓

90%.

↓

100%.

↓

Marcos personalizados.

---

# Pausar Meta

POST

```
/{goalId}/pause
```

---

Atualiza.

Status.

↓

Motivo.

↓

Data.

---

# Reativar Meta

POST

```
/{goalId}/resume
```

---

Retorna.

Novo Status.

↓

Nova previsão.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Eventos Publicados

GoalCreated.

↓

GoalUpdated.

↓

GoalDeleted.

↓

GoalPaused.

↓

GoalResumed.

↓

GoalCompleted.

↓

GoalForecastUpdated.

↓

GoalMilestoneReached.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Validação de Payload.

↓

Rate Limit.

↓

Auditoria obrigatória.

---

# Rate Limit

Consulta.

120/minuto.

---

Cadastro.

30/minuto.

---

Atualização.

30/minuto.

---

Forecast.

60/minuto.

---

# Erros

400

Payload inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

404

Meta não encontrada.

---

409

Conflito.

---

422

Erro de validação.

---

500

Erro interno.

---

# Observabilidade

Registrar.

Tempo de cadastro.

↓

Tempo de atualização.

↓

Tempo de Forecast.

↓

Quantidade de metas.

↓

Metas concluídas.

↓

Rate Limit.

---

Nunca registrar dados pessoais sensíveis.

---

# Testes Obrigatórios

Goals Tests.

↓

Forecast Tests.

↓

Progress Tests.

↓

Milestone Tests.

↓

Performance Tests.

↓

Security Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ CRUD completo.

✓ Forecast.

✓ Milestones.

✓ Soft Delete.

✓ Atualização parcial.

✓ Compatível com Goals Engine.

✓ Compatível com Metrics Engine.

✓ Compatível com Event Bus.

✓ Compatível com Sync Engine.

# BODY PROGRESS API

---

# Objetivo

A Body Progress API é responsável pelo gerenciamento da evolução corporal do usuário, incluindo peso, medidas, fotos e Body Snapshots.

Nenhuma outra API deverá manipular dados de evolução corporal diretamente.

---

# Filosofia

Toda evolução corporal deverá ser registrada como um Body Snapshot.

↓

Peso.

↓

Medidas.

↓

Fotos.

↓

Observações.

↓

Metadados.

---

Todo processamento deverá ser realizado pelo Body Progress Engine.

---

# Responsabilidades

Registrar peso.

↓

Registrar medidas.

↓

Registrar fotos.

↓

Criar Body Snapshots.

↓

Consultar evolução.

↓

Comparar Snapshots.

↓

Gerenciar histórico.

↓

Publicar eventos.

---

Nunca calcular métricas na API.

---

# Base URL

```
/api/v1/body
```

---

# Endpoints Oficiais

## Body Snapshots

GET

```
/snapshots
```

---

GET

```
/snapshots/{snapshotId}
```

---

POST

```
/snapshots
```

---

PATCH

```
/snapshots/{snapshotId}
```

---

DELETE

```
/snapshots/{snapshotId}
```

---

## Weight

GET

```
/weight
```

---

POST

```
/weight
```

---

PATCH

```
/weight/{weightId}
```

---

DELETE

```
/weight/{weightId}
```

---

## Measurements

GET

```
/measurements
```

---

POST

```
/measurements
```

---

PATCH

```
/measurements/{measurementId}
```

---

DELETE

```
/measurements/{measurementId}
```

---

## Photos

GET

```
/photos
```

---

POST

```
/photos
```

---

DELETE

```
/photos/{photoId}
```

---

## Comparisons

GET

```
/comparisons
```

---

GET

```
/comparisons/{comparisonId}
```

---

# Cadastro de Body Snapshot

POST

```
/snapshots
```

---

Request

```
{
    "date":"2026-07-03",
    "weight":89.2,
    "measurements":[
        {
            "region":"Waist",
            "value":104,
            "unit":"cm"
        }
    ],
    "notes":"Primeiro registro."
}
```

---

Response

```
{
    "success":true,
    "data":{
        "snapshotId":"...",
        "status":"Completed"
    },
    "metadata":{},
    "errors":[],
    "requestId":"...",
    "timestamp":"..."
}
```

---

# Registro de Peso

POST

```
/weight
```

---

Request

```
{
    "date":"2026-07-03",
    "time":"08:10",
    "weight":89.2,
    "unit":"kg"
}
```

---

# Registro de Medidas

POST

```
/measurements
```

---

Regiões oficiais.

Pescoço.

↓

Peitoral.

↓

Braço.

↓

Cintura.

↓

Abdômen.

↓

Quadril.

↓

Coxa.

↓

Panturrilha.

---

Permitir regiões personalizadas.

---

# Upload de Fotos

POST

```
/photos
```

---

Content-Type

```
multipart/form-data
```

---

Posições oficiais.

Frente.

↓

Costas.

↓

Lado Direito.

↓

Lado Esquerdo.

---

Formatos.

JPEG.

↓

PNG.

↓

WEBP.

---

Limite.

20 MB.

---

# Comparações

GET

```
/comparisons
```

---

Permitir.

Antes / Depois.

↓

Por período.

↓

Por Snapshot.

↓

Por peso.

↓

Por data.

---

# Consulta

Filtros suportados.

Período.

↓

Tipo.

↓

Peso.

↓

Snapshot.

↓

Fotos.

↓

Região corporal.

---

Paginação obrigatória.

---

# Exclusão

DELETE

```
/snapshots/{snapshotId}
```

---

Soft Delete obrigatório.

---

Nunca remover histórico imediatamente.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Eventos Publicados

BodySnapshotCreated.

↓

WeightRegistered.

↓

MeasurementRegistered.

↓

ProgressPhotoUploaded.

↓

ComparisonGenerated.

↓

BodyProgressUpdated.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Upload validado.

↓

Sanitização.

↓

Rate Limit.

---

# Rate Limit

Consulta.

120/minuto.

---

Cadastro.

60/minuto.

---

Upload.

30/minuto.

---

Comparações.

60/minuto.

---

# Erros

400

Payload inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

404

Snapshot não encontrado.

---

409

Conflito.

---

413

Arquivo muito grande.

---

415

Formato inválido.

---

422

Erro de validação.

---

500

Erro interno.

---

# Observabilidade

Registrar.

Tempo de cadastro.

↓

Tempo de upload.

↓

Tempo de comparação.

↓

Quantidade de fotos.

↓

Quantidade de Snapshots.

↓

Rate Limit.

---

Nunca registrar imagens em Logs.

---

# Testes Obrigatórios

Snapshot Tests.

↓

Weight Tests.

↓

Measurement Tests.

↓

Photo Tests.

↓

Comparison Tests.

↓

Upload Tests.

↓

Performance Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ Body Snapshots.

✓ Registro de peso.

✓ Registro de medidas.

✓ Upload de fotos.

✓ Comparações.

✓ Soft Delete.

✓ Compatível com Body Progress Engine.

✓ Compatível com Timeline Engine.

✓ Compatível com Event Bus.

✓ Compatível com Sync Engine.

# TIMELINE API

---

# Objetivo

A Timeline API é responsável por disponibilizar a linha do tempo oficial do HWP Platform.

Nenhuma outra API deverá construir Timelines próprias.

---

# Filosofia

Toda Timeline deverá representar uma Activity Stream.

↓

Eventos enriquecidos.

↓

Ordenação cronológica.

↓

Filtros.

↓

Pesquisa.

↓

Resumo.

---

Todo processamento deverá ser realizado pelo Timeline Engine.

---

# Responsabilidades

Consultar Timeline.

↓

Consultar eventos.

↓

Pesquisar.

↓

Filtrar.

↓

Consultar resumo.

↓

Consultar Activity Stream.

↓

Publicar eventos.

---

Nunca construir Timeline diretamente.

---

# Base URL

```
/api/v1/timeline
```

---

# Endpoints Oficiais

GET

```
/
```

---

GET

```
/summary
```

---

GET

```
/events/{eventId}
```

---

GET

```
/activity
```

---

GET

```
/search
```

---

GET

```
/filters
```

---

# Consulta Principal

GET

```
/
```

---

Filtros suportados.

Período.

↓

Categoria.

↓

Engine.

↓

Prioridade.

↓

Tipo.

↓

Texto.

↓

Favoritos.

---

Paginação obrigatória.

---

# Response

```
{
   "success":true,
   "data":[
      {
         "eventId":"...",
         "type":"MealProcessed",
         "title":"Almoço registrado",
         "description":"Mignon suíno com arroz e abacaxi.",
         "category":"Nutrition",
         "timestamp":"...",
         "priority":"Normal"
      }
   ],
   "metadata":{},
   "errors":[],
   "requestId":"...",
   "timestamp":"..."
}
```

---

# Summary

GET

```
/summary
```

---

Retorna.

Última refeição.

↓

Último treino.

↓

Última pesagem.

↓

Última aplicação.

↓

Último Insight.

↓

Última sincronização.

---

# Evento

GET

```
/events/{eventId}
```

---

Retorna.

Evento completo.

↓

Payload público.

↓

Metadata.

↓

Engine de origem.

↓

Eventos relacionados.

---

# Activity Stream

GET

```
/activity
```

---

Retorna.

Timeline enriquecida.

↓

Ícones.

↓

Ações rápidas.

↓

Categorias.

↓

Links relacionados.

↓

Contexto.

---

Pronta para renderização.

---

# Pesquisa

GET

```
/search?q=proteína
```

---

Permitir.

Texto.

↓

Categorias.

↓

Períodos.

↓

Eventos.

↓

Engines.

---

Sempre utilizar Search Engine.

---

# Filtros

GET

```
/filters
```

---

Retorna.

Categorias disponíveis.

↓

Períodos.

↓

Tipos.

↓

Prioridades.

↓

Engines.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Eventos Publicados

TimelineViewed.

↓

TimelineFiltered.

↓

TimelineSearched.

↓

TimelineEventOpened.

↓

ActivityStreamGenerated.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Validação de filtros.

↓

Rate Limit.

---

# Rate Limit

Timeline.

120/minuto.

---

Pesquisa.

120/minuto.

---

Summary.

120/minuto.

---

Evento.

120/minuto.

---

# Erros

400

Filtro inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

404

Evento não encontrado.

---

422

Consulta inválida.

---

500

Erro interno.

---

# Observabilidade

Registrar.

Tempo de consulta.

↓

Tempo de pesquisa.

↓

Quantidade de eventos.

↓

Filtros utilizados.

↓

Rate Limit.

---

Nunca registrar Payloads privados.

---

# Testes Obrigatórios

Timeline Tests.

↓

Activity Stream Tests.

↓

Search Tests.

↓

Filter Tests.

↓

Performance Tests.

↓

Security Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ Timeline única.

✓ Activity Stream.

✓ Pesquisa integrada.

✓ Filtros completos.

✓ Paginação.

✓ Compatível com Timeline Engine.

✓ Compatível com Search Engine.

✓ Compatível com Event Bus.

✓ Compatível com Sync Engine.

# AI API

---

# Objetivo

A AI API é responsável por disponibilizar todos os serviços inteligentes do HWP Platform.

Nenhuma outra API deverá comunicar-se diretamente com provedores de Inteligência Artificial.

---

# Filosofia

A IA deverá complementar a experiência do usuário.

↓

Nunca substituir regras de negócio.

↓

Sempre utilizar contexto validado.

↓

Sempre produzir respostas estruturadas.

↓

Sempre indicar origem.

---

Todo processamento deverá ser realizado pelo AI Integration Engine.

---

# Responsabilidades

Nutri IA+.

↓

Resumo Diário.

↓

Resumo Semanal.

↓

Explicação de Insights.

↓

Análise Nutricional.

↓

Análise de Evolução.

↓

Sugestões Inteligentes.

↓

Publicar eventos.

---

Nunca acessar provedores diretamente.

---

# Base URL

```
/api/v1/ai
```

---

# Endpoints Oficiais

POST

```
/nutrition-analysis
```

---

POST

```
/daily-summary
```

---

POST

```
/weekly-summary
```

---

POST

```
/body-analysis
```

---

POST

```
/insights
```

---

POST

```
/recommendations
```

---

POST

```
/chat
```

---

GET

```
/models
```

---

# Nutri IA+

POST

```
/nutrition-analysis
```

---

Request

```
{
   "mealId":"..."
}
```

---

Response

```
{
    "success":true,
    "data":{
        "analysis":"...",
        "recommendations":[...],
        "alerts":[...]
    },
    "metadata":{},
    "errors":[],
    "requestId":"...",
    "timestamp":"..."
}
```

---

# Resumo Diário

POST

```
/daily-summary
```

---

Request

```
{
   "date":"2026-07-03"
}
```

---

Retorna.

Resumo.

↓

Metas.

↓

Calorias.

↓

Proteínas.

↓

Treinos.

↓

Insights.

↓

Recomendações.

---

# Resumo Semanal

POST

```
/weekly-summary
```

---

Retorna.

Resumo da semana.

↓

Evolução.

↓

Metas.

↓

Hábitos.

↓

Pontos positivos.

↓

Pontos de atenção.

↓

Plano sugerido.

---

# Body Analysis

POST

```
/body-analysis
```

---

Request

```
{
    "snapshotA":"...",
    "snapshotB":"..."
}
```

---

Retorna.

Comparação.

↓

Mudanças.

↓

Evolução.

↓

Sugestões.

↓

Insights.

---

# Insights

POST

```
/insights
```

---

Retorna.

Explicação.

↓

Contexto.

↓

Evidências.

↓

Próximas ações.

---

Sempre baseada no Insights Engine.

---

# Recommendations

POST

```
/recommendations
```

---

Retorna.

Sugestões.

↓

Prioridades.

↓

Impacto esperado.

↓

Motivação.

---

# Chat

POST

```
/chat
```

---

Request

```
{
   "message":"Como posso aumentar minha ingestão de proteínas?",
   "context":"currentUser"
}
```

---

Retorna.

Resposta estruturada.

↓

Fontes utilizadas.

↓

Contexto.

↓

Ações relacionadas.

---

Nunca alterar dados automaticamente.

---

# Models

GET

```
/models
```

---

Retorna.

Modelos disponíveis.

↓

Versões.

↓

Capacidades.

↓

Status.

---

Nunca expor credenciais.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Eventos Publicados

AIAnalysisRequested.

↓

AIAnalysisCompleted.

↓

AIRecommendationGenerated.

↓

AIInsightExplained.

↓

AIChatCompleted.

↓

AISummaryGenerated.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Sanitização.

↓

Validação do contexto.

↓

Limitação de Tokens.

↓

Rate Limit.

---

# Rate Limit

Chat.

30/minuto.

---

Análises.

20/minuto.

---

Resumo Diário.

10/minuto.

---

Resumo Semanal.

5/minuto.

---

# Erros

400

Payload inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

408

Timeout do Provider.

---

429

Rate Limit.

---

502

Erro do Provider.

---

503

Serviço indisponível.

---

500

Erro interno.

---

# Observabilidade

Registrar.

Tempo de resposta.

↓

Modelo utilizado.

↓

Quantidade de Tokens.

↓

Taxa de erro.

↓

Rate Limit.

↓

Cache Hits.

---

Nunca registrar.

Prompt completo.

↓

Resposta completa.

↓

Informações pessoais sensíveis.

---

# Testes Obrigatórios

Nutri IA Tests.

↓

Chat Tests.

↓

Summary Tests.

↓

Context Tests.

↓

Parser Tests.

↓

Performance Tests.

↓

Security Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ Contexto validado.

✓ IA desacoplada.

✓ Respostas estruturadas.

✓ Evidências disponíveis.

✓ Compatível com AI Integration Engine.

✓ Compatível com Insights Engine.

✓ Compatível com Event Bus.

✓ Compatível com Sync Engine.

# SYNC API

---

# Objetivo

A Sync API é responsável pela sincronização entre clientes e serviços do HWP Platform.

Nenhuma outra API deverá sincronizar dados diretamente.

---

# Filosofia

Offline First.

↓

Sincronização Incremental.

↓

Operações Imutáveis.

↓

Idempotência.

↓

Versionamento.

↓

Resolução de Conflitos.

---

Toda sincronização deverá ser baseada em operações.

Nunca em tabelas completas.

---

# Responsabilidades

Enviar operações.

↓

Receber operações.

↓

Resolver conflitos.

↓

Consultar status.

↓

Sincronizar versões.

↓

Atualizar índices.

↓

Publicar eventos.

---

Nunca executar regras de negócio.

---

# Base URL

```
/api/v1/sync
```

---

# Endpoints Oficiais

POST

```
/push
```

---

POST

```
/pull
```

---

POST

```
/merge
```

---

GET

```
/status
```

---

GET

```
/operations
```

---

POST

```
/retry
```

---

# Push

POST

```
/push
```

---

Objetivo.

Enviar operações locais.

---

Request

```
{
    "deviceId":"...",
    "operations":[
        {
            "operationId":"...",
            "entity":"Meal",
            "action":"Create",
            "version":3,
            "timestamp":"..."
        }
    ]
}
```

---

Response

```
{
    "success":true,
    "data":{
        "accepted":15,
        "rejected":0,
        "conflicts":0
    },
    "metadata":{},
    "errors":[],
    "requestId":"...",
    "timestamp":"..."
}
```

---

# Pull

POST

```
/pull
```

---

Retorna.

Operações pendentes.

↓

Mudanças.

↓

Atualizações.

↓

Deletes.

↓

Versões.

---

Sempre incremental.

---

# Merge

POST

```
/merge
```

---

Utilizado quando existir conflito.

---

Retorna.

Resultado.

↓

Versão final.

↓

Conflitos resolvidos.

↓

Operações descartadas.

---

# Status

GET

```
/status
```

---

Retorna.

Última sincronização.

↓

Fila pendente.

↓

Conflitos.

↓

Versão.

↓

Status.

↓

Servidor.

---

# Operations

GET

```
/operations
```

---

Retorna.

Fila.

↓

Pendentes.

↓

Concluídas.

↓

Falhas.

↓

Conflitos.

---

Paginação obrigatória.

---

# Retry

POST

```
/retry
```

---

Reprocessa operações.

↓

Mantendo idempotência.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

```
X-Device-ID
```

---

```
X-App-Version
```

---

# Estrutura da Operação

Toda operação deverá conter.

Operation ID.

↓

Entity.

↓

Action.

↓

Timestamp.

↓

Version.

↓

Device.

↓

Correlation ID.

↓

Payload.

---

Nunca reutilizar Operation ID.

---

# Estratégia

Incremental.

↓

Assíncrona.

↓

Orientada a Eventos.

↓

Idempotente.

↓

Compatível com Offline.

---

# Conflitos

Estratégias oficiais.

Last Valid Version.

↓

Merge.

↓

Manual Resolution.

---

Nunca perder dados silenciosamente.

---

# Eventos Publicados

SyncStarted.

↓

SyncCompleted.

↓

SyncFailed.

↓

ConflictDetected.

↓

ConflictResolved.

↓

RetryExecuted.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Versionamento obrigatório.

↓

Idempotência.

↓

Rate Limit.

↓

Auditoria.

---

# Rate Limit

Push.

120/minuto.

---

Pull.

120/minuto.

---

Retry.

30/minuto.

---

Merge.

30/minuto.

---

# Erros

400

Payload inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

404

Operação inexistente.

---

409

Conflito.

---

422

Versão incompatível.

---

500

Erro interno.

---

503

Servidor indisponível.

---

# Observabilidade

Registrar.

Tempo de sincronização.

↓

Quantidade de operações.

↓

Conflitos.

↓

Retries.

↓

Tempo de Merge.

↓

Cache Hits.

↓

Cache Misses.

---

Nunca registrar Payload completo.

---

# Testes Obrigatórios

Push Tests.

↓

Pull Tests.

↓

Merge Tests.

↓

Conflict Tests.

↓

Retry Tests.

↓

Performance Tests.

↓

Security Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ Sincronização incremental.

✓ Idempotência.

✓ Versionamento.

✓ Merge consistente.

✓ Retry automático.

✓ Compatível com Sync Engine.

✓ Compatível com Event Bus.

✓ Compatível com Offline.

✓ Compatível com Backup Engine.

# BACKUP API

---

# Objetivo

A Backup API é responsável pela criação, validação, restauração e gerenciamento de Backups do HWP Platform.

Nenhuma outra API deverá manipular Backups diretamente.

---

# Filosofia

Todo Backup deverá ser.

Íntegro.

↓

Versionado.

↓

Auditável.

↓

Recuperável.

↓

Compatível.

↓

Seguro.

---

Toda restauração deverá preservar a consistência dos dados.

---

# Responsabilidades

Criar Backups.

↓

Consultar Backups.

↓

Restaurar Backups.

↓

Validar Integridade.

↓

Excluir Backups.

↓

Consultar Histórico.

↓

Publicar Eventos.

---

Nunca executar regras de negócio.

---

# Base URL

```
/api/v1/backup
```

---

# Endpoints Oficiais

GET

```
/
```

---

POST

```
/
```

---

GET

```
/{backupId}
```

---

DELETE

```
/{backupId}
```

---

POST

```
/restore
```

---

POST

```
/validate
```

---

GET

```
/history
```

---

GET

```
/latest
```

---

# Criar Backup

POST

```
/
```

---

Request

```
{
    "type":"Full",
    "includePhotos":true,
    "compression":true
}
```

---

Response

```
{
    "success":true,
    "data":{
        "backupId":"...",
        "status":"Completed"
    },
    "metadata":{},
    "errors":[],
    "requestId":"...",
    "timestamp":"..."
}
```

---

# Consultar Backups

GET

```
/
```

---

Retorna.

Lista.

↓

Data.

↓

Versão.

↓

Tamanho.

↓

Origem.

↓

Status.

---

Paginação obrigatória.

---

# Último Backup

GET

```
/latest
```

---

Retorna.

Último Backup válido.

↓

Status.

↓

Data.

↓

Versão.

↓

Tamanho.

---

# Consultar Backup

GET

```
/{backupId}
```

---

Retorna.

Manifest.

↓

Metadata.

↓

Version.

↓

Checksum.

↓

Histórico.

---

# Restaurar

POST

```
/restore
```

---

Request

```
{
    "backupId":"..."
}
```

---

Fluxo.

Criar Recovery Point.

↓

Validar.

↓

Restaurar.

↓

Validar.

↓

Publicar Eventos.

---

# Validar

POST

```
/validate
```

---

Request

```
{
    "backupId":"..."
}
```

---

Retorna.

Checksum.

↓

Integridade.

↓

Compatibilidade.

↓

Versão.

↓

Resultado.

---

# Exclusão

DELETE

```
/{backupId}
```

---

Permitir.

Remoção manual.

↓

Política automática.

---

Nunca remover último Backup válido.

---

# Histórico

GET

```
/history
```

---

Retorna.

Criações.

↓

Restaurações.

↓

Validações.

↓

Falhas.

↓

Migrações.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Eventos Publicados

BackupRequested.

↓

BackupCreated.

↓

BackupValidated.

↓

RestoreStarted.

↓

RestoreCompleted.

↓

RestoreFailed.

↓

BackupDeleted.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Checksum obrigatório.

↓

SHA-256.

↓

AES-256.

↓

Auditoria.

↓

Rate Limit.

---

# Rate Limit

Consulta.

60/minuto.

---

Backup.

10/minuto.

---

Restore.

5/minuto.

---

Validate.

30/minuto.

---

# Erros

400

Payload inválido.

---

401

Não autenticado.

---

403

Sem permissão.

---

404

Backup não encontrado.

---

409

Backup incompatível.

---

422

Falha de validação.

---

500

Erro interno.

---

503

Serviço indisponível.

---

# Observabilidade

Registrar.

Tempo de Backup.

↓

Tempo de Restore.

↓

Tempo de Validação.

↓

Quantidade de Backups.

↓

Falhas.

↓

Rate Limit.

---

Nunca registrar conteúdo do Backup.

---

# Testes Obrigatórios

Backup Tests.

↓

Restore Tests.

↓

Validation Tests.

↓

Migration Tests.

↓

Performance Tests.

↓

Security Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ Backup completo.

✓ Restore validado.

✓ Checksum obrigatório.

✓ Versionamento.

✓ Recovery Point.

✓ Compatível com Backup Engine.

✓ Compatível com Sync Engine.

✓ Compatível com Event Bus.

✓ Compatível com Offline.

# SEARCH API

---

# Objetivo

A Search API é responsável pela pesquisa unificada em todo o HWP Platform.

Nenhuma outra API deverá implementar mecanismos próprios de pesquisa.

---

# Filosofia

O usuário pesquisa.

↓

A plataforma encontra.

↓

Independentemente da origem dos dados.

---

Toda pesquisa deverá utilizar o Search Engine.

---

# Responsabilidades

Pesquisar.

↓

Filtrar.

↓

Gerar sugestões.

↓

Autocomplete.

↓

Histórico.

↓

Favoritos.

↓

Publicar eventos.

---

Nunca acessar Storage diretamente.

---

# Base URL

```
/api/v1/search
```

---

# Endpoints Oficiais

GET

```
/
```

---

GET

```
/suggestions
```

---

GET

```
/autocomplete
```

---

GET

```
/history
```

---

DELETE

```
/history
```

---

GET

```
/filters
```

---

GET

```
/popular
```

---

# Pesquisa Principal

GET

```
/?q=frango
```

---

Filtros suportados.

Categoria.

↓

Tipo.

↓

Período.

↓

Engine.

↓

Favoritos.

↓

Recentes.

↓

Tags.

---

Paginação obrigatória.

---

# Response

```
{
   "success":true,
   "data":[
      {
         "id":"...",
         "type":"Food",
         "title":"Peito de Frango Grelhado",
         "category":"Nutrition",
         "description":"..."
      }
   ],
   "metadata":{},
   "errors":[],
   "requestId":"...",
   "timestamp":"..."
}
```

---

# Sugestões

GET

```
/suggestions
```

---

Retorna.

Pesquisas recentes.

↓

Itens frequentes.

↓

Favoritos.

↓

Sugestões inteligentes.

---

# Autocomplete

GET

```
/autocomplete?q=fra
```

---

Retorna.

Correspondências parciais.

↓

Correções simples.

↓

Sinônimos.

↓

Sugestões.

---

Tempo máximo.

50 ms.

---

# Histórico

GET

```
/history
```

---

Retorna.

Últimas pesquisas.

↓

Data.

↓

Quantidade de utilizações.

↓

Favoritos.

---

DELETE

```
/history
```

---

Limpa histórico.

Mantém favoritos.

---

# Filtros

GET

```
/filters
```

---

Retorna.

Categorias.

↓

Tipos.

↓

Períodos.

↓

Engines.

↓

Tags.

---

# Populares

GET

```
/popular
```

---

Retorna.

Itens mais pesquisados.

↓

Alimentos.

↓

Treinos.

↓

Metas.

↓

Medicamentos.

↓

Insights.

---

# Headers

Obrigatórios.

```
Authorization

Bearer <token>
```

---

# Eventos Publicados

SearchRequested.

↓

SearchCompleted.

↓

SearchHistoryUpdated.

↓

SuggestionsGenerated.

↓

AutocompleteGenerated.

---

# Segurança

HTTPS obrigatório.

↓

JWT obrigatório.

↓

Sanitização da consulta.

↓

Rate Limit.

↓

Proteção contra abuso.

---

# Rate Limit

Pesquisa.

240/minuto.

---

Autocomplete.

240/minuto.

---

Sugestões.

120/minuto.

---

Histórico.

60/minuto.

---

# Erros

400

Consulta inválida.

---

401

Não autenticado.

---

403

Sem permissão.

---

422

Filtro inválido.

---

429

Rate Limit.

---

500

Erro interno.

---

# Observabilidade

Registrar.

Tempo de pesquisa.

↓

Tempo de autocomplete.

↓

Consultas.

↓

Consultas sem resultado.

↓

Rate Limit.

↓

Cache Hits.

↓

Cache Misses.

---

Nunca registrar pesquisas contendo dados sensíveis.

---

# Testes Obrigatórios

Search Tests.

↓

Autocomplete Tests.

↓

Suggestion Tests.

↓

History Tests.

↓

Performance Tests.

↓

Security Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ Pesquisa unificada.

✓ Autocomplete.

✓ Sugestões inteligentes.

✓ Histórico.

✓ Favoritos.

✓ Compatível com Search Engine.

✓ Compatível com Timeline Engine.

✓ Compatível com Event Bus.

✓ Compatível com Sync Engine.

# API STANDARDS

---

# Objetivo

Definir os padrões oficiais para versionamento, tratamento de erros, segurança, paginação, validação e compatibilidade das APIs do HWP Platform.

Todas as APIs deverão seguir obrigatoriamente estas diretrizes.

---

# Filosofia

Uma API.

↓

Um padrão.

↓

Uma estrutura.

↓

Uma experiência consistente.

---

Toda API deverá ser previsível.

---

# Versionamento

Estratégia oficial.

Semantic Versioning.

---

Major.

Mudanças incompatíveis.

---

Minor.

Novos recursos.

---

Patch.

Correções.

---

Versão da API.

```
/api/v1
```

---

Toda resposta deverá informar.

```
apiVersion

schemaVersion

requestId

timestamp
```

---

# Response Pattern

Todas as respostas deverão seguir.

```
{
   "success": true,
   "data": {},
   "metadata": {},
   "errors": [],
   "requestId": "...",
   "timestamp": "...",
   "apiVersion": "1.0",
   "schemaVersion": "1.0"
}
```

---

Nunca retornar estruturas diferentes.

---

# Paginação

Padrão.

Offset.

↓

Limit.

---

Parâmetros.

```
?page=1

&pageSize=20
```

---

Metadata.

```
page

pageSize

totalItems

totalPages

hasNext

hasPrevious
```

---

Obrigatória para listas.

---

# Ordenação

Parâmetros.

```
sortBy

sortDirection
```

---

Exemplo.

```
?sortBy=date

&sortDirection=desc
```

---

# Filtros

Utilizar.

Query Parameters.

---

Exemplo.

```
?status=Active

&type=Weight

&from=2026-01-01

&to=2026-07-03
```

---

Nunca utilizar filtros no Body de requisições GET.

---

# Tratamento de Erros

Estrutura oficial.

```
{
   "code":"GOAL_NOT_FOUND",
   "message":"Goal not found.",
   "details":[],
   "severity":"Normal"
}
```

---

Toda resposta poderá possuir.

Múltiplos erros.

---

# Códigos

400

Bad Request.

---

401

Unauthorized.

---

403

Forbidden.

---

404

Not Found.

---

409

Conflict.

---

422

Validation Error.

---

429

Too Many Requests.

---

500

Internal Error.

---

503

Unavailable.

---

# Idempotência

Obrigatória para.

PUT.

↓

DELETE.

↓

Operações críticas.

---

Header.

```
Idempotency-Key
```

---

Mesmo Request.

Mesmo Resultado.

---

# Segurança

HTTPS obrigatório.

↓

TLS obrigatório.

↓

JWT obrigatório.

↓

Rate Limit.

↓

Auditoria.

↓

Sanitização.

↓

Validação.

↓

CORS.

---

Nunca aceitar HTTP.

---

# Rate Limit

Headers.

```
X-RateLimit-Limit

X-RateLimit-Remaining

X-RateLimit-Reset
```

---

Resposta.

429.

Quando excedido.

---

# Validação

Toda entrada deverá validar.

Tipos.

↓

Formato.

↓

Tamanho.

↓

Obrigatoriedade.

↓

Consistência.

---

Nunca confiar no Client.

---

# Uploads

Formatos permitidos.

JPEG.

↓

PNG.

↓

WEBP.

↓

PDF.

↓

ZIP.

---

Sempre validar.

Tamanho.

↓

MIME Type.

↓

Integridade.

---

# Downloads

Sempre informar.

Filename.

↓

Content-Type.

↓

Checksum quando aplicável.

---

# Compatibilidade

Toda API deverá manter.

Backward Compatibility.

---

Mudanças incompatíveis.

Nova versão.

---

# Observabilidade

Todas as APIs deverão registrar.

Request Time.

↓

Response Time.

↓

HTTP Status.

↓

Request ID.

↓

Correlation ID.

↓

Rate Limit.

↓

Latency.

---

Nunca registrar.

JWT.

↓

Senhas.

↓

Dados médicos.

↓

Prompts completos.

---

# Auditoria

Obrigatória para.

Backup.

↓

Restore.

↓

Sync.

↓

Medication.

↓

Goals.

↓

Configurações.

↓

Importações.

---

# Testes Obrigatórios

API Tests.

↓

Security Tests.

↓

Compatibility Tests.

↓

Rate Limit Tests.

↓

Validation Tests.

↓

Performance Tests.

↓

Regression Tests.

---

# Critérios de Aceitação

✓ Estrutura única.

✓ Versionamento.

✓ Paginação.

✓ Idempotência.

✓ Rate Limit.

✓ Segurança.

✓ Compatibilidade.

✓ Observabilidade.

✓ Auditoria.

# API IMPLEMENTATION CONTRACT

---

# Objetivo

Definir oficialmente os critérios para implementação, manutenção, evolução e validação de todas as APIs do HWP Platform.

Este documento representa o contrato definitivo entre a arquitetura e a implementação das APIs.

---

# Princípios Fundamentais

Toda API deverá ser.

RESTful.

↓

Versionada.

↓

Determinística.

↓

Segura.

↓

Documentada.

↓

Observável.

↓

Escalável.

↓

Compatível.

---

Nenhuma API poderá implementar regras de negócio.

---

# Arquitetura Oficial

Client Apps

↓

API Client

↓

HTTPS

↓

API Gateway

↓

API Contracts

↓

API Controllers

↓

Core Engines

↓

Repositories

↓

Storage

---

Toda implementação deverá respeitar esta arquitetura.

---

# APIs Oficiais

Authentication API

↓

User API

↓

Nutrition API

↓

Workout API

↓

Medication API

↓

Goals API

↓

Body Progress API

↓

Timeline API

↓

AI API

↓

Sync API

↓

Backup API

↓

Search API

---

Novas APIs deverão seguir exatamente este padrão.

---

# Comunicação

Toda API deverá comunicar-se exclusivamente com.

API Controllers.

↓

Core Engines.

↓

Repositories.

---

Nunca.

Controller → Storage.

↓

Controller → Engine Interno.

↓

Controller → Outro Controller.

---

Toda lógica pertence aos Core Engines.

---

# Estrutura Oficial

Toda API deverá possuir.

Objetivo.

↓

Responsabilidades.

↓

Base URL.

↓

Endpoints.

↓

Requests.

↓

Responses.

↓

Eventos.

↓

Segurança.

↓

Rate Limit.

↓

Observabilidade.

↓

Testes.

↓

Critérios de Aceitação.

---

# Regras Gerais

Toda API deverá.

Versionar contratos.

↓

Validar Payloads.

↓

Utilizar DTOs.

↓

Publicar Eventos.

↓

Gerar Correlation ID.

↓

Gerar Request ID.

↓

Retornar estrutura padronizada.

---

Nunca.

Persistir diretamente.

↓

Executar regras de negócio.

↓

Retornar estruturas diferentes.

↓

Quebrar compatibilidade sem nova versão.

---

# Performance

Tempo máximo recomendado.

GET

<100 ms.

---

POST

<150 ms.

---

PATCH

<150 ms.

---

DELETE

<100 ms.

---

Pesquisa.

<100 ms.

---

Autocomplete.

<50 ms.

---

# Segurança

Obrigatória.

HTTPS.

↓

TLS.

↓

JWT.

↓

Rate Limit.

↓

Idempotência.

↓

Auditoria.

↓

Validação.

↓

Sanitização.

↓

Privacy by Design.

---

# Versionamento

Semantic Versioning obrigatório.

---

API.

↓

Schema.

↓

DTOs.

↓

Eventos.

↓

Prompts.

---

Mudanças incompatíveis.

Nova versão Major.

---

# Compatibilidade

Toda API deverá permanecer compatível com.

Core Engines.

↓

Repositories.

↓

Event Bus.

↓

Sync Engine.

↓

Backup Engine.

↓

Notification Engine.

↓

Search Engine.

↓

AI Integration Engine.

---

# Offline

As APIs deverão suportar integração com.

Offline First.

↓

Operation Log.

↓

Sync Sessions.

↓

Retry.

↓

Background Processing.

---

# Testabilidade

Toda API deverá possuir.

Unit Tests.

↓

Integration Tests.

↓

Contract Tests.

↓

Performance Tests.

↓

Security Tests.

↓

Compatibility Tests.

↓

Regression Tests.

---

Cobertura mínima.

95%.

---

# OpenAPI

Toda API deverá possuir especificação oficial.

OpenAPI 3.1.

---

Gerar automaticamente.

Swagger.

↓

Schemas.

↓

DTOs.

↓

Exemplos.

↓

Documentação.

---

A documentação deverá permanecer sincronizada com a implementação.

---

# Checklist Oficial do Desenvolvedor

Antes de concluir uma API.

☐ Seguir API Specification.

☐ Utilizar API Contracts.

☐ Utilizar DTOs.

☐ Controller sem regra de negócio.

☐ Integração com Core Engine.

☐ Eventos publicados.

☐ JWT implementado.

☐ Rate Limit configurado.

☐ Request ID.

☐ Correlation ID.

☐ Observabilidade.

☐ Auditoria.

☐ Testes implementados.

☐ Performance validada.

☐ OpenAPI atualizada.

---

# Checklist Oficial do Codex

Antes de gerar código.

☐ Ler Architecture.

☐ Ler Design System.

☐ Ler Data Model.

☐ Ler Modules.

☐ Ler User Flows.

☐ Ler UI Specification.

☐ Ler Component Library.

☐ Ler Engine Specification.

☐ Ler API Specification.

☐ Nunca implementar regra no Controller.

☐ Nunca acessar Storage diretamente.

☐ Sempre utilizar Core Engines.

☐ Sempre utilizar DTOs.

☐ Sempre publicar eventos.

☐ Sempre preservar contratos.

☐ Sempre manter compatibilidade.

---

# Definition of Done

Uma API somente será considerada concluída quando.

✓ Contrato implementado.

✓ Endpoints implementados.

✓ DTOs implementados.

✓ Validações implementadas.

✓ JWT implementado.

✓ Rate Limit implementado.

✓ Auditoria implementada.

✓ Observabilidade implementada.

✓ Eventos publicados.

✓ OpenAPI gerada.

✓ Testes aprovados.

✓ Performance validada.

✓ Compatibilidade validada.

✓ Documentação atualizada.

---

# Objetivo Final

As APIs do HWP Platform deverão formar uma camada única, consistente, segura e escalável de comunicação entre todos os clientes e os Core Engines.

Toda evolução futura deverá ocorrer preservando contratos, compatibilidade e qualidade arquitetural.

---

# HISTÓRICO DO DOCUMENTO

## Versão 3.0

Primeira especificação oficial das APIs do HWP Platform.

Inclui.

• Authentication API.

• User API.

• Nutrition API.

• Workout API.

• Medication API.

• Goals API.

• Body Progress API.

• Timeline API.

• AI API.

• Sync API.

• Backup API.

• Search API.

• Versionamento.

• Segurança.

• Rate Limit.

• Contrato Oficial.

---

# DOCUMENTO CONCLUÍDO

Este documento representa a especificação oficial da camada de APIs do HWP Platform 3.0.

Toda implementação deverá seguir integralmente esta especificação.

Qualquer evolução futura deverá ser registrada através de revisão deste documento.

# FIM DO DOCUMENTO