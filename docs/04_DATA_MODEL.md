# HWP Platform 3.0

# 05 - DATA MODEL

Versão: 1.0

Status: Oficial

Documento obrigatório para toda implementação do HWP Platform.

---

# Objetivo

Este documento define todas as entidades oficiais do HWP Platform.

Seu objetivo é padronizar:

- estrutura dos dados;
- relacionamentos;
- validações;
- regras de negócio;
- eventos;
- responsabilidades.

Nenhuma entidade poderá ser implementada de forma diferente deste documento.

---

# Filosofia do Modelo de Dados

O modelo de dados do HWP Platform foi projetado para representar a evolução do usuário ao longo do tempo.

O sistema deverá registrar apenas informações permanentes.

Indicadores derivados deverão ser sempre calculados.

Nunca armazenados.

---

## Princípios

### Fonte Única da Verdade

Cada informação deverá possuir apenas um local de armazenamento.

Exemplo.

Peso diário.

↓

DailyEntry

Nunca:

Dashboard

Nunca:

Metrics

Nunca:

Charts

---

### Dados Calculados

Os seguintes objetos nunca serão persistidos.

Dashboard

BodyMetrics

DailyScore

WeeklySummary

MonthlySummary

NutritionSummary

Trend

Esses objetos deverão ser reconstruídos sempre que necessários.

---

### Dados Persistentes

Os seguintes objetos deverão ser armazenados.

Profile

Goals

DailyEntry

Meal

FavoriteMeal

Workout

Medication

ProgressPhoto

TimelineEvent

Settings

---

### Identificadores

Toda entidade persistente deverá possuir:

id

UUID v4

Nunca utilizar posição em arrays como identificador.

Nunca utilizar datas como chave primária.

---

### Datas

Todo o sistema utilizará ISO-8601.

Formato.

YYYY-MM-DD

Quando houver horário.

YYYY-MM-DDTHH:mm:ss.sssZ

Nunca utilizar formatos regionais.

---

### Valores Numéricos

Peso

Decimal

Circunferência

Decimal

Água

Decimal

Sono

Decimal

Passos

Inteiro

Calorias

Inteiro

Proteína

Decimal

Carboidratos

Decimal

Gorduras

Decimal

Fibras

Decimal

---

### Valores Vazios

Peso vazio

≠

Zero

Circunferência vazia

≠

Zero

Qualquer valor não informado deverá ser armazenado como:

null

Nunca utilizar:

0

para representar ausência de informação.

---

### Entidades Calculadas

As entidades calculadas nunca poderão ser salvas.

Seu conteúdo deverá ser sempre reconstruído através do Metrics Engine.

---

# Convenções

Toda entidade utilizará exatamente o mesmo padrão.

---

## Estrutura Oficial

Objetivo

Responsabilidade

Origem dos Dados

Relacionamentos

Campos

Validações

Eventos Gerados

JSON de Exemplo

Decisões Arquiteturais

Regras Invioláveis

Histórico de Decisões

Critérios de Aceitação

Nenhuma entidade poderá omitir qualquer um desses itens.

---

# ENTIDADES PERSISTENTES

---

# Profile

## Objetivo

Representar o usuário proprietário do aplicativo.

Existe apenas um Profile para toda a aplicação.

Todas as demais entidades pertencem a esse Profile.

---

## Responsabilidade

Armazenar informações permanentes do usuário.

Nunca armazenar informações diárias.

Nunca armazenar refeições.

Nunca armazenar indicadores.

---

## Origem dos Dados

Cadastro inicial.

Tela de Configurações.

Importação de Backup.

---

## Relacionamentos

Profile

↓

1

↓

Goals

Profile

↓

N

↓

DailyEntry

Profile

↓

N

↓

Workout

Profile

↓

N

↓

Medication

Profile

↓

N

↓

ProgressPhoto

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| name | String | ✔ | ✔ | |
| sex | Enum | ✔ | ✔ | |
| birthDate | Date | ✔ | ✔ | |
| height | Decimal | ✔ | ✔ | |
| initialWeight | Decimal | ✔ | ✔ | |
| initialWaist | Decimal | ✔ | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## Validações

Nome obrigatório.

Altura maior que zero.

Peso inicial maior que zero.

Circunferência inicial maior que zero.

Sexo deverá utilizar Enum oficial.

---

## Eventos Gerados

profile:created

profile:updated

profile:imported

---

## JSON de Exemplo

```json
{
  "id":"9a8d3f77-a5df-4b15-9db6-5e1cfdd3c8af",
  "name":"Felipe Karam",
  "sex":"male",
  "birthDate":"1987-03-12",
  "height":1.72,
  "initialWeight":89.0,
  "initialWaist":104,
  "createdAt":"2026-07-01T10:00:00Z",
  "updatedAt":"2026-07-01T10:00:00Z"
}
```

---

## Decisões Arquiteturais

O Profile armazena apenas informações permanentes.

Peso atual.

Circunferência atual.

IMC.

Dashboard.

Nunca pertencem ao Profile.

Essas informações serão calculadas dinamicamente.

---

## Regras Invioláveis

Nunca existir mais de um Profile.

Nunca excluir o Profile.

Nunca alterar o id.

Nunca salvar indicadores calculados.

---

## Histórico de Decisões

Versão 3.0

O Profile passou a armazenar apenas informações permanentes.

Todos os indicadores passaram a ser calculados pelo Metrics Engine.

---

## Critérios de Aceitação

✓ Existe apenas um Profile.

✓ Todos os campos obrigatórios preenchidos.

✓ Nenhum indicador calculado armazenado.

✓ Relacionamentos íntegros.

# Goals

## Objetivo

Representar todas as metas definidas pelo usuário.

As metas são utilizadas pelo Metrics Engine para calcular aderência, progresso, score e indicadores do Dashboard.

Existe apenas um objeto Goals para cada Profile.

---

## Responsabilidade

Armazenar metas configuráveis.

Nunca armazenar resultados.

Nunca armazenar progresso.

Nunca armazenar médias.

Todos esses dados serão calculados dinamicamente.

---

## Origem dos Dados

Tela Configurações.

Assistente de Configuração Inicial.

Importação de Backup.

---

## Relacionamentos

Profile

↓

1

↓

Goals

Dashboard

↓

consulta

↓

Goals

Metrics Engine

↓

consulta

↓

Goals

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| targetWeight | Decimal | ✔ | ✔ | |
| targetWaist | Decimal | ✔ | ✔ | |
| targetCalories | Integer | ✔ | ✔ | |
| targetProtein | Decimal | ✔ | ✔ | |
| targetCarbs | Decimal | ✔ | ✔ | |
| targetFat | Decimal | ✔ | ✔ | |
| targetFiber | Decimal | ✔ | ✔ | |
| targetWater | Decimal | ✔ | ✔ | |
| targetSleep | Decimal | ✔ | ✔ | |
| targetSteps | Integer | ✔ | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## Validações

Peso alvo maior que zero.

Circunferência alvo maior que zero.

Proteína maior que zero.

Calorias maiores que zero.

Água maior que zero.

Passos maiores ou iguais a zero.

Sono maior que zero.

---

## Eventos Gerados

goals:created

goals:updated

goals:imported

---

## JSON de Exemplo

```json
{
  "id":"86a4c1df-b9d2-4d6e-bd18-68d1d24d87f3",
  "targetWeight":70,
  "targetWaist":85,
  "targetCalories":1900,
  "targetProtein":150,
  "targetCarbs":150,
  "targetFat":60,
  "targetFiber":30,
  "targetWater":3.5,
  "targetSleep":8,
  "targetSteps":8000,
  "createdAt":"2026-07-01T10:00:00Z",
  "updatedAt":"2026-07-01T10:00:00Z"
}
```

---

## Decisões Arquiteturais

As metas pertencem ao usuário.

Nunca pertencem ao Dashboard.

Nunca pertencem ao DailyEntry.

Isso permite recalcular qualquer indicador histórico utilizando as metas vigentes no período correspondente.

---

## Regras Invioláveis

Nunca existir mais de um objeto Goals.

Nunca armazenar porcentagens de progresso.

Nunca armazenar aderência.

Nunca armazenar Score.

---

## Histórico de Decisões

Versão 3.0

Todas as metas passaram a ser agrupadas em uma única entidade para simplificar configuração e cálculos.

---

## Critérios de Aceitação

✓ Existe apenas um objeto Goals.

✓ Todas as metas possuem valores válidos.

✓ Nenhum indicador calculado é persistido.

---

# DailyEntry

## Objetivo

Representar completamente um único dia da vida do usuário.

O DailyEntry é a entidade mais importante do HWP Platform.

Todas as demais informações do dia serão relacionadas a ele.

Existe exatamente um DailyEntry para cada data.

---

## Responsabilidade

Registrar:

- peso;

- circunferência abdominal;

- ingestão de água;

- horas de sono;

- passos;

- hábitos;

- observações.

Nunca registrar refeições.

Nunca registrar Dashboard.

Nunca registrar Score.

Nunca registrar indicadores calculados.

---

## Origem dos Dados

Preenchimento manual.

Importação.

Backup.

Integrações futuras.

---

## Relacionamentos

Profile

↓

1

↓

N

↓

DailyEntry

DailyEntry

↓

1

↓

N

↓

Meal

DailyEntry

↓

1

↓

N

↓

Workout

DailyEntry

↓

1

↓

N

↓

TimelineEvent

DailyEntry

↓

1

↓

N

↓

ProgressPhoto

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| date | Date | ✔ | ✔ | |
| weight | Decimal | | ✔ | |
| waist | Decimal | | ✔ | |
| water | Decimal | | ✔ | |
| sleep | Decimal | | ✔ | |
| steps | Integer | | ✔ | |
| notes | String | | ✔ | |
| habits | HabitStatus[] | | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## HabitStatus

Cada hábito será armazenado individualmente.

Estrutura:

```json
{
  "id":"habit-water",
  "completed":true,
  "completedAt":"2026-07-01T18:20:00Z"
}
```

Nunca utilizar apenas arrays de booleanos.

Sempre permitir evolução futura.

---

## Validações

A data é obrigatória.

Não podem existir dois DailyEntry para a mesma data.

Peso deve ser maior que zero quando informado.

Circunferência deve ser maior que zero quando informada.

Água deve ser maior ou igual a zero.

Passos devem ser maiores ou iguais a zero.

Sono deve ser maior ou igual a zero.

## Eventos Gerados

entry:created

entry:updated

entry:deleted

weight:updated

waist:updated

water:updated

sleep:updated

steps:updated

habit:updated

notes:updated

---

## JSON de Exemplo

```json
{
  "id":"0a0a7dd2-c5c5-45c2-8cb9-88df48df5d12",
  "date":"2026-07-01",
  "weight":84.2,
  "waist":93.5,
  "water":3.2,
  "sleep":7.8,
  "steps":9124,
  "notes":"Treino de pernas. Energia muito boa durante o dia.",
  "habits":[
    {
      "id":"habit-water",
      "completed":true,
      "completedAt":"2026-07-01T18:40:00Z"
    },
    {
      "id":"habit-workout",
      "completed":true,
      "completedAt":"2026-07-01T19:15:00Z"
    },
    {
      "id":"habit-sleep",
      "completed":false,
      "completedAt":null
    }
  ],
  "createdAt":"2026-07-01T08:15:00Z",
  "updatedAt":"2026-07-01T20:35:00Z"
}
```

---

## Decisões Arquiteturais

O DailyEntry representa o estado diário do usuário.

Por esse motivo:

- refeições não pertencem ao DailyEntry;
- treinos não pertencem ao DailyEntry;
- fotos não pertencem ao DailyEntry.

Essas entidades apenas possuem relacionamento com o DailyEntry.

Essa decisão reduz duplicação de dados e facilita futuras expansões.

---

Outra decisão importante.

Peso e circunferência são opcionais.

O usuário poderá registrar apenas:

- água;
- sono;
- passos;
- hábitos;

sem necessidade de informar peso diariamente.

---

Os hábitos são armazenados como objetos completos.

Nunca apenas como valores booleanos.

Isso permitirá futuramente:

- horário de conclusão;
- lembretes;
- histórico;
- estatísticas;
- recorrência.

Sem necessidade de alterar a estrutura do banco de dados.

---

## Regras Invioláveis

Nunca existir mais de um DailyEntry para a mesma data.

Peso vazio nunca significa zero.

Circunferência vazia nunca significa zero.

Peso igual a zero é inválido.

Circunferência igual a zero é inválida.

Nunca apagar refeições ao editar um DailyEntry.

Nunca apagar treinos ao editar um DailyEntry.

Nunca apagar fotos ao editar um DailyEntry.

Nunca recalcular automaticamente registros históricos.

Toda alteração deverá preservar a integridade dos relacionamentos.

---

## Histórico de Decisões

Versão 3.0

- Peso passou a aceitar valor nulo para eliminar os problemas existentes na versão 2.x.

- Circunferência passou a aceitar valor nulo pelo mesmo motivo.

- Hábitos passaram a utilizar objetos completos em vez de arrays booleanos.

- Todas as entidades relacionadas passaram a utilizar o id do DailyEntry como referência.

---

## Critérios de Aceitação

✓ Existe apenas um DailyEntry por data.

✓ Todos os relacionamentos permanecem íntegros.

✓ Peso vazio permanece nulo.

✓ Circunferência vazia permanece nula.

✓ Nenhum dado relacionado é perdido durante edição.

✓ Eventos corretos são disparados.

---

# Meal

## Objetivo

Representar uma refeição registrada pelo usuário.

A refeição é a principal unidade nutricional do sistema.

Ela poderá ser criada manualmente, importada via HWP_FOOD ou adicionada através da Biblioteca Inteligente.

Toda refeição pertence obrigatoriamente a um DailyEntry.

---

## Responsabilidade

Armazenar todas as informações nutricionais de uma refeição.

Nunca armazenar Score Diário.

Nunca armazenar Dashboard.

Nunca armazenar indicadores semanais.

Nunca armazenar indicadores mensais.

---

## Origem dos Dados

HWP_FOOD.

Biblioteca Inteligente.

Cadastro manual.

Importação.

Backup.

---

## Relacionamentos

DailyEntry

↓

1

↓

N

↓

Meal

Meal

↓

0..1

↓

FavoriteMeal

Meal

↓

1

↓

TimelineEvent

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| entryId | UUID | ✔ | ✔ | |
| slot | Enum | ✔ | ✔ | |
| title | String | ✔ | ✔ | |
| source | Enum | ✔ | ✔ | |
| calories | Decimal | ✔ | ✔ | |
| protein | Decimal | ✔ | ✔ | |
| carbs | Decimal | ✔ | ✔ | |
| fat | Decimal | ✔ | ✔ | |
| fiber | Decimal | ✔ | ✔ | |
| score | Decimal | | | ✔ |
| observations | String | | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## Slot (Enum)

Valores permitidos:

- breakfast
- morningSnack
- lunch
- afternoonSnack
- dinner
- supper
- preWorkout
- postWorkout

Nunca utilizar textos livres.

Sempre utilizar Enum oficial.

---

## Source (Enum)

Valores permitidos:

- hwp_food
- library
- manual
- import

Esse campo será utilizado para estatísticas futuras e para aprendizado da Biblioteca Inteligente.

## Validações

entryId obrigatório.

Slot obrigatório.

Título obrigatório.

Calorias maiores ou iguais a zero.

Proteína maior ou igual a zero.

Carboidratos maiores ou iguais a zero.

Gorduras maiores ou iguais a zero.

Fibras maiores ou iguais a zero.

Source deverá utilizar apenas valores definidos no Enum oficial.

---

## Eventos Gerados

meal:created

meal:updated

meal:deleted

meal:moved

meal:imported

meal:duplicated

meal:favorite

meal:unfavorite

---

## JSON de Exemplo

```json
{
  "id":"eac89d82-96fd-4c63-99b7-f8f51cfb26cf",
  "entryId":"0a0a7dd2-c5c5-45c2-8cb9-88df48df5d12",
  "slot":"lunch",
  "title":"Patinho moído com arroz, feijão e banana",
  "source":"hwp_food",
  "calories":612,
  "protein":43,
  "carbs":54,
  "fat":18,
  "fiber":9,
  "observations":"Almoço pós treino.",
  "createdAt":"2026-07-01T12:34:18Z",
  "updatedAt":"2026-07-01T12:34:18Z"
}
```

---

## HWP_FOOD

Toda refeição importada através do ChatGPT deverá possuir o HWP_FOOD original armazenado.

Campo sugerido:

```json
"hwpFood": {
    "version":"3.0",
    "raw":"conteúdo original enviado pelo ChatGPT"
}
```

O HWP_FOOD nunca deverá ser alterado.

Ele representa a origem oficial da refeição.

---

## Ingredientes

O modelo deverá permitir evolução futura para armazenar ingredientes individuais.

Estrutura prevista.

```json
"ingredients":[
    {
        "name":"Patinho moído",
        "quantity":"180 g",
        "calories":310,
        "protein":38,
        "carbs":0,
        "fat":17
    },
    {
        "name":"Arroz branco",
        "quantity":"120 g",
        "calories":156,
        "protein":3,
        "carbs":34,
        "fat":0.4
    }
]
```

Na versão 3.0 esse preenchimento será opcional.

A arquitetura deverá permanecer preparada para sua utilização futura.

---

## Biblioteca

Uma refeição poderá possuir vínculo com um item da Biblioteca Inteligente.

Campo:

```json
"favoriteMealId":"uuid"
```

Esse relacionamento facilitará:

- estatísticas;
- sincronização;
- atualização automática da Biblioteca.

---

## Histórico de Edições

Toda refeição deverá armazenar:

```json
"edited":false
```

Quando editada:

```json
"edited":true,
"editedAt":"2026-07-01T13:10:00Z"
```

Esse recurso permitirá auditoria e rastreabilidade.

---

## Hash do HWP_FOOD

Para evitar duplicações futuras.

Campo previsto.

```json
"hwpHash":"sha256..."
```

O hash será utilizado para:

- detectar refeições idênticas;
- evitar importações duplicadas;
- identificar favoritos automaticamente.

---

## Decisões Arquiteturais

A refeição é considerada a menor unidade nutricional do sistema.

Nunca será dividida em:

- proteínas;
- carboidratos;
- gorduras.

Esses valores pertencem ao objeto Meal.

O Score também pertence à refeição.

Entretanto:

O Score Diário nunca será armazenado.

Ele será sempre calculado pelo Metrics Engine.

---

Outra decisão importante.

Uma refeição nunca conhece outra refeição.

Não existe relacionamento direto entre refeições.

Relacionamentos sempre ocorrem através do DailyEntry.

Essa decisão elimina dependências desnecessárias.

---

O HWP_FOOD original será preservado.

Mesmo após edição manual.

Isso permitirá futuras reinterpretações utilizando modelos de IA mais avançados.

---

## Regras Invioláveis

Toda Meal pertence obrigatoriamente a um DailyEntry.

Nunca existir Meal sem entryId.

Nunca utilizar texto livre para Slot.

Nunca armazenar Dashboard.

Nunca armazenar médias.

Nunca armazenar Score Diário.

Nunca recalcular automaticamente refeições históricas.

Nunca alterar o HWP_FOOD original.

Nunca excluir uma refeição sem registrar o evento correspondente na Timeline.

---

## Histórico de Decisões

Versão 3.0

A Meal passou a armazenar o HWP_FOOD original.

Foi criado o conceito de origem da refeição.

Foi criado o conceito de histórico de edição.

Foi previsto armazenamento de ingredientes.

Foi previsto hash para evitar duplicações.

---

## Critérios de Aceitação

✓ Toda refeição pertence a um DailyEntry.

✓ Slot válido.

✓ Nutrientes válidos.

✓ HWP_FOOD preservado.

✓ Eventos corretamente disparados.

✓ Compatível com Biblioteca Inteligente.

✓ Compatível com Timeline.

✓ Compatível com Backup.

---

# FavoriteMeal

## Objetivo

Representar uma refeição reutilizável pertencente à Biblioteca Inteligente.

Seu objetivo é reduzir drasticamente o tempo necessário para registrar refeições recorrentes.

Uma FavoriteMeal nunca pertence a um dia específico.

Ela representa um modelo reutilizável.

---

## Responsabilidade

Armazenar refeições reutilizáveis.

Aprender automaticamente com o comportamento do usuário.

Organizar a Biblioteca Inteligente.

Nunca armazenar consumo diário.

Nunca armazenar Dashboard.

Nunca armazenar Score Diário.

---

## Origem dos Dados

Conversão automática de uma Meal.

Cadastro manual.

Importação.

Backup.

## Relacionamentos

FavoriteMeal

↓

0..N

↓

Meal

FavoriteMeal

↓

N

↓

TimelineEvent

A mesma FavoriteMeal poderá originar milhares de refeições ao longo do tempo.

Entretanto, cada Meal poderá estar vinculada a apenas uma FavoriteMeal.

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| name | String | ✔ | ✔ | |
| category | Enum | ✔ | ✔ | |
| defaultSlot | Enum | ✔ | ✔ | |
| calories | Decimal | ✔ | ✔ | |
| protein | Decimal | ✔ | ✔ | |
| carbs | Decimal | ✔ | ✔ | |
| fat | Decimal | ✔ | ✔ | |
| fiber | Decimal | ✔ | ✔ | |
| hwpFood | Object | | ✔ | |
| useCount | Integer | | | ✔ |
| averageScore | Decimal | | | ✔ |
| lastUsedAt | DateTime | | | ✔ |
| favorite | Boolean | ✔ | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## Category (Enum)

Valores oficiais.

breakfast

snack

lunch

dinner

dessert

drink

supplement

fruit

protein

carbohydrate

vegetable

custom

Nunca utilizar categorias livres.

---

## Validações

Nome obrigatório.

Categoria obrigatória.

Slot obrigatório.

Proteína maior ou igual a zero.

Calorias maiores ou iguais a zero.

Nunca permitir nome vazio.

---

## Eventos Gerados

favorite:created

favorite:updated

favorite:deleted

favorite:used

favorite:pinned

favorite:unpinned

favorite:renamed

---

## JSON de Exemplo

```json
{
    "id":"2cb90c34-9026-4d6e-91d4-988f8f67db53",
    "name":"Patinho moído com arroz",
    "category":"lunch",
    "defaultSlot":"lunch",
    "calories":612,
    "protein":43,
    "carbs":54,
    "fat":18,
    "fiber":9,
    "favorite":true,
    "createdAt":"2026-07-01T12:00:00Z",
    "updatedAt":"2026-07-01T12:00:00Z"
}
```

---

## Dados Calculados

Os seguintes campos nunca deverão ser persistidos.

useCount

Quantidade de utilizações.

Sempre calculada.

---

averageScore

Média dos Scores das refeições originadas.

Sempre calculada.

---

lastUsedAt

Data da última utilização.

Sempre calculada.

---

Esses valores serão produzidos pelo Metrics Engine.

---

## Decisões Arquiteturais

A Biblioteca não será uma simples lista de refeições.

Ela deverá funcionar como um mecanismo de aprendizado.

Cada utilização fornecerá informações que permitirão melhorar:

- ordenação;

- sugestões;

- pesquisas;

- recomendações.

---

Uma FavoriteMeal nunca será alterada automaticamente quando uma Meal for editada.

Isso evita modificar receitas reutilizadas pelo usuário.

Caso o usuário deseje atualizar a Biblioteca, essa ação deverá ocorrer explicitamente.

---

O HWP_FOOD poderá ser armazenado juntamente com a FavoriteMeal.

Isso permitirá recriar a refeição original mesmo anos depois.

---

## Regras Invioláveis

Nunca existir FavoriteMeal sem nome.

Nunca existir FavoriteMeal sem categoria.

Nunca excluir automaticamente uma FavoriteMeal.

Nunca alterar automaticamente seus nutrientes.

Nunca alterar automaticamente seu nome.

Nunca recalcular dados históricos.

Nunca utilizar FavoriteMeal para armazenar consumo diário.

---

## Histórico de Decisões

Versão 3.0

A Biblioteca deixou de ser apenas um conjunto de favoritos.

Passou a representar uma base de conhecimento do usuário.

Foram adicionados:

- categoria;

- slot padrão;

- HWP_FOOD;

- estatísticas de uso;

- aprendizado automático.

---

## Critérios de Aceitação

✓ Refeição reutilizável.

✓ Compatível com Biblioteca.

✓ Compatível com Meal.

✓ Compatível com HWP_FOOD.

✓ Compatível com Backup.

✓ Compatível com Timeline.

---

# Workout

## Objetivo

Representar uma atividade física realizada pelo usuário.

O Workout registra apenas informações essenciais para acompanhamento da evolução.

Não pretende substituir aplicativos especializados em treinamento.

---

## Responsabilidade

Registrar:

- tipo;

- duração;

- intensidade;

- observações.

Nunca registrar séries detalhadas.

Nunca registrar cargas individuais.

Esses recursos poderão ser adicionados futuramente.

---

## Origem dos Dados

Cadastro manual.

Importação.

Integrações futuras.

Backup.

---

## Relacionamentos

DailyEntry

↓

1

↓

N

↓

Workout

Workout

↓

1

↓

TimelineEvent

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| entryId | UUID | ✔ | ✔ | |
| type | Enum | ✔ | ✔ | |
| duration | Integer | ✔ | ✔ | |
| intensity | Enum | ✔ | ✔ | |
| calories | Decimal | | ✔ | |
| observations | String | | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## Type (Enum)

strength

cardio

walking

running

cycling

swimming

stretching

sports

other

---

## Intensity (Enum)

low

moderate

high

very_high

---

## Validações

entryId obrigatório.

Duração maior que zero.

Tipo obrigatório.

Intensidade obrigatória.

Calorias maiores ou iguais a zero quando informadas.

## Eventos Gerados

workout:created

workout:updated

workout:deleted

workout:completed

workout:imported

---

## JSON de Exemplo

```json
{
  "id":"f92c8e2f-f42f-49a8-b88d-80dfad0b77a1",
  "entryId":"0a0a7dd2-c5c5-45c2-8cb9-88df48df5d12",
  "type":"strength",
  "duration":65,
  "intensity":"high",
  "calories":480,
  "observations":"Treino de membros inferiores.",
  "createdAt":"2026-07-01T19:10:00Z",
  "updatedAt":"2026-07-01T19:10:00Z"
}
```

---

## Decisões Arquiteturais

O Workout registra apenas a sessão de treinamento.

Não registra exercícios individuais.

Não registra séries.

Não registra repetições.

Não registra cargas.

Essas funcionalidades poderão ser adicionadas em versões futuras através de uma nova entidade denominada WorkoutSession, sem necessidade de alterar o modelo atual.

---

A duração será registrada em minutos.

Nunca utilizar horas.

---

As calorias são opcionais.

Caso não sejam informadas, poderão ser estimadas futuramente pelo Metrics Engine.

---

## Regras Invioláveis

Todo Workout pertence obrigatoriamente a um DailyEntry.

Nunca existir Workout sem entryId.

Nunca permitir duração igual a zero.

Nunca armazenar indicadores calculados.

Nunca alterar automaticamente treinos históricos.

---

## Histórico de Decisões

Versão 3.0

O módulo de treinos foi simplificado.

O objetivo passou a ser registrar aderência ao treino e não controlar a execução detalhada dos exercícios.

---

## Critérios de Aceitação

✓ Workout pertence a um DailyEntry.

✓ Tipo válido.

✓ Intensidade válida.

✓ Duração válida.

✓ Compatível com Timeline.

✓ Compatível com Backup.

---

# Medication

## Objetivo

Representar qualquer medicamento utilizado pelo usuário.

O modelo deverá ser genérico.

A Tirzepatida será apenas um caso específico.

No futuro poderão existir:

- creatina;

- vitamina D;

- testosterona;

- antidepressivos;

- suplementos.

Sem alteração estrutural.

---

## Responsabilidade

Registrar informações permanentes do medicamento.

Nunca registrar aplicações.

Nunca registrar sintomas.

Nunca registrar evolução.

Esses registros pertencem à entidade Injection.

---

## Origem dos Dados

Cadastro manual.

Assistente inicial.

Importação.

Backup.

---

## Relacionamentos

Medication

↓

1

↓

N

↓

Injection

Medication

↓

N

↓

TimelineEvent

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| name | String | ✔ | ✔ | |
| type | Enum | ✔ | ✔ | |
| dosage | String | ✔ | ✔ | |
| frequency | Enum | ✔ | ✔ | |
| active | Boolean | ✔ | ✔ | |
| notes | String | | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## Type (Enum)

medication

supplement

vitamin

hormone

other

---

## Frequency (Enum)

daily

weekly

biweekly

monthly

custom

---

## Validações

Nome obrigatório.

Dosagem obrigatória.

Frequência obrigatória.

Tipo obrigatório.

---

## Eventos Gerados

medication:created

medication:updated

medication:disabled

medication:enabled

medication:deleted

---

## JSON de Exemplo

```json
{
  "id":"d71efc8d-f3f7-4f2d-81c2-81b0a0d1df71",
  "name":"Tirzepatida",
  "type":"medication",
  "dosage":"5 mg",
  "frequency":"weekly",
  "active":true,
  "notes":"Aplicação aos domingos.",
  "createdAt":"2026-07-01T08:00:00Z",
  "updatedAt":"2026-07-01T08:00:00Z"
}
```

---

## Decisões Arquiteturais

Medication representa apenas o tratamento.

As aplicações pertencem à entidade Injection.

Essa separação permite:

- múltiplas aplicações;

- alteração de dose ao longo do tempo;

- histórico completo;

- evolução do tratamento.

---

## Regras Invioláveis

Nunca registrar aplicações diretamente em Medication.

Nunca excluir automaticamente aplicações existentes.

Nunca existir Medication sem nome.

---

## Histórico de Decisões

Versão 3.0

Medication passou a representar exclusivamente o tratamento.

As aplicações foram separadas para uma entidade específica.

---

## Critérios de Aceitação

✓ Medication possui identificação única.

✓ Dados válidos.

✓ Compatível com Injection.

✓ Compatível com Backup.

---

# Injection

## Objetivo

Representar uma aplicação individual de medicamento.

Cada aplicação possui data própria.

Dose própria.

Observações próprias.

Sintomas próprios.

---

## Responsabilidade

Registrar cada aplicação realizada pelo usuário.

Nunca representar o tratamento completo.

---

## Origem dos Dados

Cadastro manual.

Importação.

Backup.

---

## Relacionamentos

Medication

↓

1

↓

N

↓

Injection

Injection

↓

1

↓

TimelineEvent

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| medicationId | UUID | ✔ | ✔ | |
| applicationDate | Date | ✔ | ✔ | |
| dosage | String | ✔ | ✔ | |
| bodyRegion | Enum | | ✔ | |
| sideEffects | SideEffect[] | | ✔ | |
| notes | String | | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## BodyRegion (Enum)

abdomen_left

abdomen_right

thigh_left

thigh_right

arm_left

arm_right

other

---

## SideEffect

Estrutura prevista.

```json
{
  "type":"nausea",
  "severity":"moderate",
  "durationHours":12
}
```

## Validações

medicationId obrigatório.

Data da aplicação obrigatória.

Dosagem obrigatória.

BodyRegion deverá utilizar apenas valores do Enum oficial quando informado.

Os efeitos colaterais deverão utilizar estrutura padronizada.

---

## Eventos Gerados

injection:created

injection:updated

injection:deleted

injection:completed

sideeffect:added

sideeffect:updated

---

## JSON de Exemplo

```json
{
  "id":"8f4d0d57-11b4-4cbb-8db9-fefaa72df1f4",
  "medicationId":"d71efc8d-f3f7-4f2d-81c2-81b0a0d1df71",
  "applicationDate":"2026-07-06",
  "dosage":"5 mg",
  "bodyRegion":"abdomen_left",
  "sideEffects":[
    {
      "type":"nausea",
      "severity":"mild",
      "durationHours":4
    }
  ],
  "notes":"Aplicação realizada após o jantar.",
  "createdAt":"2026-07-06T21:10:00Z",
  "updatedAt":"2026-07-06T21:10:00Z"
}
```

---

## Decisões Arquiteturais

Cada aplicação representa um evento único.

Nunca atualizar uma aplicação para representar outra.

Caso o usuário informe uma nova aplicação, um novo registro deverá ser criado.

---

Os efeitos colaterais pertencem à aplicação.

Nunca ao medicamento.

Isso permite comparar diferentes aplicações do mesmo tratamento.

---

A dose utilizada na aplicação será armazenada.

Mesmo que seja diferente da dose atual cadastrada no Medication.

Isso preserva todo o histórico.

---

## Regras Invioláveis

Toda Injection pertence obrigatoriamente a um Medication.

Nunca existir Injection sem medicationId.

Nunca excluir automaticamente aplicações históricas.

Nunca alterar doses históricas.

Nunca perder informações sobre efeitos colaterais.

---

## Histórico de Decisões

Versão 3.0

Aplicações passaram a possuir entidade própria.

Os efeitos colaterais passaram a pertencer à aplicação.

O histórico tornou-se completamente rastreável.

---

## Critérios de Aceitação

✓ Toda aplicação pertence a um Medication.

✓ Data válida.

✓ Dose registrada.

✓ Compatível com Timeline.

✓ Compatível com Backup.

---

# ProgressPhoto

## Objetivo

Registrar fotografias da evolução corporal do usuário.

As fotos possuem finalidade exclusivamente comparativa.

Nunca deverão substituir indicadores objetivos como peso ou circunferência.

---

## Responsabilidade

Armazenar:

- fotografia;

- data;

- posição;

- observações.

Nunca armazenar análises automáticas.

Nunca armazenar comparações.

Essas informações serão calculadas futuramente.

---

## Origem dos Dados

Câmera.

Galeria.

Importação.

Backup.

---

## Relacionamentos

DailyEntry

↓

1

↓

N

↓

ProgressPhoto

ProgressPhoto

↓

1

↓

TimelineEvent

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| entryId | UUID | ✔ | ✔ | |
| imagePath | String | ✔ | ✔ | |
| position | Enum | ✔ | ✔ | |
| notes | String | | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## Position (Enum)

front

back

left

right

custom

---

## Validações

entryId obrigatório.

Imagem obrigatória.

Posição obrigatória.

---

## Eventos Gerados

photo:created

photo:updated

photo:deleted

photo:compared

---

## JSON de Exemplo

```json
{
  "id":"7d321b89-1f52-48c8-a726-3bc4e69f6f98",
  "entryId":"0a0a7dd2-c5c5-45c2-8cb9-88df48df5d12",
  "imagePath":"photos/2026-07-01/front.jpg",
  "position":"front",
  "notes":"Primeira foto do acompanhamento.",
  "createdAt":"2026-07-01T08:15:00Z",
  "updatedAt":"2026-07-01T08:15:00Z"
}
```

---

## Decisões Arquiteturais

A fotografia não será armazenada dentro do DailyEntry.

Apenas sua referência.

Isso mantém o modelo leve e facilita futuras sincronizações em nuvem.

---

A posição será obrigatória.

Isso permitirá comparações consistentes entre fotografias.

---

A imagem nunca será alterada automaticamente.

Qualquer edição deverá gerar um novo arquivo.

---

## Regras Invioláveis

Toda foto pertence a um DailyEntry.

Nunca existir foto sem imagem.

Nunca substituir automaticamente uma foto existente.

Nunca apagar fotos sem confirmação explícita.

---

## Histórico de Decisões

Versão 3.0

Fotos passaram a possuir entidade própria.

Foi criada padronização de posições.

A comparação automática ficou preparada para versões futuras.

---

## Critérios de Aceitação

✓ Foto vinculada ao DailyEntry.

✓ Imagem válida.

✓ Posição válida.

✓ Compatível com Backup.

✓ Compatível com Timeline.

---

# TimelineEvent

## Objetivo

Representar qualquer evento importante ocorrido no HWP Platform.

A Timeline será o histórico oficial da aplicação.

Todo acontecimento relevante deverá gerar um TimelineEvent.

---

## Responsabilidade

Registrar eventos.

Nunca armazenar dados completos da entidade.

Armazenar apenas referências.

---

## Origem dos Dados

Gerada automaticamente pelo sistema.

Nunca criada manualmente pelo usuário.

---

## Relacionamentos

DailyEntry

↓

0..N

↓

TimelineEvent

Meal

↓

0..N

↓

TimelineEvent

Workout

↓

0..N

↓

TimelineEvent

Medication

↓

0..N

↓

TimelineEvent

Injection

↓

0..N

↓

TimelineEvent

ProgressPhoto

↓

0..N

↓

TimelineEvent

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| entityType | Enum | ✔ | ✔ | |
| entityId | UUID | ✔ | ✔ | |
| eventType | Enum | ✔ | ✔ | |
| title | String | ✔ | ✔ | |
| description | String | ✔ | ✔ | |
| icon | String | ✔ | ✔ | |
| eventDate | DateTime | ✔ | ✔ | |
| metadata | Object | | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |

---

## EntityType (Enum)

Valores oficiais.

profile

dailyEntry

meal

favoriteMeal

workout

medication

injection

progressPhoto

settings

system

---

## EventType (Enum)

Valores oficiais.

created

updated

deleted

completed

imported

exported

backup

restore

goalReached

goalUpdated

measurement

photoAdded

mealAdded

workoutCompleted

medicationApplied

custom

---

## Validações

entityType obrigatório.

entityId obrigatório.

eventType obrigatório.

Título obrigatório.

Data obrigatória.

---

## Eventos Gerados

timeline:created

timeline:updated

timeline:deleted

---

## JSON de Exemplo

```json
{
  "id":"2db70a97-3ec8-47bc-b4d2-5fcf04c76c35",
  "entityType":"meal",
  "entityId":"eac89d82-96fd-4c63-99b7-f8f51cfb26cf",
  "eventType":"mealAdded",
  "title":"Almoço registrado",
  "description":"Patinho moído com arroz, feijão e banana.",
  "icon":"restaurant",
  "eventDate":"2026-07-01T12:35:10Z",
  "metadata":{
    "slot":"lunch",
    "source":"hwp_food"
  },
  "createdAt":"2026-07-01T12:35:10Z"
}
```

---

## Metadata

O campo metadata permitirá evolução futura.

Exemplos.

Meal

```json
{
    "slot":"lunch",
    "protein":43
}
```

Workout

```json
{
    "duration":65,
    "intensity":"high"
}
```

Injection

```json
{
    "dosage":"5 mg"
}
```

Nunca depender do metadata para funcionamento da aplicação.

Ele deverá possuir finalidade exclusivamente informativa.

---

## Decisões Arquiteturais

A Timeline nunca armazenará a entidade completa.

Apenas sua referência.

Isso evita duplicação de dados.

---

Caso uma entidade seja atualizada, a Timeline continuará válida.

Ao abrir um evento, o sistema poderá consultar a entidade original.

---

A Timeline será ordenada exclusivamente por eventDate.

Nunca por createdAt.

---

## Regras Invioláveis

Todo TimelineEvent deverá possuir entityId.

Todo TimelineEvent deverá possuir entityType.

Nunca existir evento órfão.

Nunca utilizar Timeline como banco de dados.

Nunca duplicar informações da entidade original.

---

## Histórico de Decisões

Versão 3.0

Timeline passou a utilizar eventos genéricos.

Foi criado metadata para futuras expansões.

Todos os módulos passaram a publicar eventos padronizados.

---

## Critérios de Aceitação

✓ Todo evento referencia uma entidade válida.

✓ Eventos ordenados cronologicamente.

✓ Compatível com todos os módulos.

✓ Compatível com Backup.

---

# Settings

## Objetivo

Armazenar todas as configurações globais do aplicativo.

Existe apenas um objeto Settings.

Todas as preferências do usuário pertencem a essa entidade.

---

## Responsabilidade

Armazenar:

- aparência;

- preferências;

- idioma;

- comportamento da aplicação;

- configurações gerais.

Nunca armazenar dados do usuário.

Nunca armazenar indicadores.

---

## Origem dos Dados

Assistente inicial.

Tela Configurações.

Importação.

Backup.

---

## Relacionamentos

Profile

↓

1

↓

Settings

Settings

↓

N

↓

TimelineEvent

---

## Campos

| Campo | Tipo | Obrigatório | Persistido | Calculado |
|--------|------|-------------|------------|-----------|
| id | UUID | ✔ | ✔ | |
| theme | Enum | ✔ | ✔ | |
| language | Enum | ✔ | ✔ | |
| units | Enum | ✔ | ✔ | |
| firstDayOfWeek | Enum | ✔ | ✔ | |
| dashboardLayout | Enum | ✔ | ✔ | |
| animations | Boolean | ✔ | ✔ | |
| notifications | Boolean | ✔ | ✔ | |
| backupReminder | Boolean | ✔ | ✔ | |
| createdAt | DateTime | ✔ | ✔ | |
| updatedAt | DateTime | ✔ | ✔ | |

---

## Theme (Enum)

light

dark

system

---

## Language (Enum)

pt-BR

en-US

es-ES

---

## Units (Enum)

metric

imperial

---

## DashboardLayout (Enum)

compact

standard

expanded

---

## Validações

Todos os campos Enum deverão utilizar apenas valores oficiais.

---

## Eventos Gerados

settings:updated

settings:restored

theme:changed

language:changed

---

## JSON de Exemplo

```json
{
  "id":"9cbdbd9e-4f89-42d5-bab6-c0d2afc74c5e",
  "theme":"system",
  "language":"pt-BR",
  "units":"metric",
  "firstDayOfWeek":"monday",
  "dashboardLayout":"standard",
  "animations":true,
  "notifications":true,
  "backupReminder":true,
  "createdAt":"2026-07-01T08:00:00Z",
  "updatedAt":"2026-07-01T08:00:00Z"
}
```

---

## Decisões Arquiteturais

Settings armazenará apenas preferências.

Nunca armazenará informações de negócio.

Isso permite restaurar preferências independentemente dos dados do usuário.

---

Todos os módulos consultarão Settings.

Nenhum módulo manterá configurações próprias.

---

## Regras Invioláveis

Nunca existir mais de um objeto Settings.

Nunca armazenar informações do Dashboard.

Nunca armazenar indicadores calculados.

---

## Histórico de Decisões

Versão 3.0

Todas as preferências passaram a ser centralizadas.

Foi eliminada a configuração distribuída entre módulos.

---

## Critérios de Aceitação

✓ Existe apenas um objeto Settings.

✓ Configurações válidas.

✓ Compatível com Backup.

✓ Compatível com Importação.

---

# ENTIDADES CALCULADAS

As entidades desta seção nunca deverão ser persistidas.

Seu conteúdo será sempre produzido pelo Metrics Engine.

Nenhuma delas poderá ser armazenada no Storage.

# Dashboard

## Objetivo

Representar o estado atual do usuário.

O Dashboard nunca será persistido.

Ele será completamente reconstruído pelo Metrics Engine sempre que necessário.

Seu objetivo é fornecer uma visão executiva da evolução do usuário.

---

## Responsabilidade

Consolidar informações provenientes de:

- Profile
- Goals
- DailyEntry
- Meal
- Workout
- Medication
- Timeline

Nunca armazenar dados próprios.

---

## Origem dos Dados

Metrics Engine.

---

## Relacionamentos

Dashboard

↓

consulta

↓

Profile

Dashboard

↓

consulta

↓

Goals

Dashboard

↓

consulta

↓

DailyEntry

Dashboard

↓

consulta

↓

Meal

Dashboard

↓

consulta

↓

Workout

Dashboard

↓

consulta

↓

Medication

---

## Campos

| Campo | Tipo | Persistido | Calculado |
|--------|------|------------|-----------|
| currentWeight | Decimal | | ✔ |
| weightVariation | Decimal | | ✔ |
| currentWaist | Decimal | | ✔ |
| waistVariation | Decimal | | ✔ |
| bmi | Decimal | | ✔ |
| calories | Decimal | | ✔ |
| protein | Decimal | | ✔ |
| carbs | Decimal | | ✔ |
| fat | Decimal | | ✔ |
| fiber | Decimal | | ✔ |
| water | Decimal | | ✔ |
| sleep | Decimal | | ✔ |
| steps | Integer | | ✔ |
| workoutCompleted | Boolean | | ✔ |
| score | Decimal | | ✔ |
| completion | Decimal | | ✔ |
| streak | Integer | | ✔ |

---

## Validações

Nenhum campo poderá ser salvo.

Todos os campos deverão ser reconstruídos.

---

## JSON de Exemplo

```json
{
  "currentWeight":84.2,
  "weightVariation":-4.8,
  "currentWaist":93,
  "waistVariation":-11,
  "bmi":28.4,
  "calories":1812,
  "protein":152,
  "carbs":148,
  "fat":61,
  "fiber":29,
  "water":3.4,
  "sleep":7.6,
  "steps":9152,
  "workoutCompleted":true,
  "score":91,
  "completion":88,
  "streak":14
}
```

---

## Decisões Arquiteturais

O Dashboard nunca será salvo.

Sempre será reconstruído.

Isso elimina inconsistências.

Toda alteração em qualquer módulo deverá refletir imediatamente no Dashboard.

---

## Regras Invioláveis

Nunca persistir Dashboard.

Nunca editar Dashboard.

Nunca importar Dashboard.

Nunca exportar Dashboard.

---

## Histórico de Decisões

Versão 3.0

Dashboard passou a ser totalmente calculado.

---

## Critérios de Aceitação

✓ Nunca persistido.

✓ Sempre atualizado.

✓ Compatível com todos os módulos.

---

# BodyMetrics

## Objetivo

Representar indicadores corporais derivados.

Todos os valores são calculados.

---

## Responsabilidade

Calcular:

- IMC
- Peso perdido
- Circunferência perdida
- Percentual de evolução
- Ritmo de emagrecimento
- Projeção da meta

---

## Campos

| Campo | Tipo | Persistido | Calculado |
|--------|------|------------|-----------|
| bmi | Decimal | | ✔ |
| weightLost | Decimal | | ✔ |
| waistLost | Decimal | | ✔ |
| progressPercent | Decimal | | ✔ |
| projectedGoalDate | Date | | ✔ |
| weeklyRate | Decimal | | ✔ |

---

## JSON de Exemplo

```json
{
  "bmi":28.4,
  "weightLost":4.8,
  "waistLost":11,
  "progressPercent":42,
  "projectedGoalDate":"2026-10-14",
  "weeklyRate":0.74
}
```

---

## Regras Invioláveis

Nunca persistir.

Nunca editar.

Sempre recalcular.

---

# DailyNutrition

## Objetivo

Consolidar os nutrientes consumidos em um dia.

---

## Responsabilidade

Somar automaticamente todas as refeições.

---

## Campos

| Campo | Tipo | Persistido | Calculado |
|--------|------|------------|-----------|
| calories | Decimal | | ✔ |
| protein | Decimal | | ✔ |
| carbs | Decimal | | ✔ |
| fat | Decimal | | ✔ |
| fiber | Decimal | | ✔ |
| mealCount | Integer | | ✔ |

---

## JSON de Exemplo

```json
{
  "calories":1825,
  "protein":154,
  "carbs":149,
  "fat":58,
  "fiber":31,
  "mealCount":5
}
```

---

## Regras Invioláveis

Nunca persistir.

Sempre recalcular.

Nunca armazenar médias.

---

# DailyScore

## Objetivo

Representar a qualidade nutricional de um único dia.

---

## Responsabilidade

Calcular o Score Diário.

---

## Campos

| Campo | Tipo | Persistido | Calculado |
|--------|------|------------|-----------|
| nutritionScore | Decimal | | ✔ |
| proteinScore | Decimal | | ✔ |
| hydrationScore | Decimal | | ✔ |
| habitsScore | Decimal | | ✔ |
| finalScore | Decimal | | ✔ |

---

## JSON de Exemplo

```json
{
  "nutritionScore":93,
  "proteinScore":96,
  "hydrationScore":88,
  "habitsScore":90,
  "finalScore":92
}
```

---

## Regras Invioláveis

Nunca persistir.

Sempre recalcular.

O Score Final será calculado pelo Metrics Engine.

Nunca informado manualmente.

---

# WeeklySummary

## Objetivo

Representar um resumo consolidado da semana.

---

## Responsabilidade

Consolidar indicadores semanais.

---

## Campos

| Campo | Tipo | Persistido | Calculado |
|--------|------|------------|-----------|
| averageWeight | Decimal | | ✔ |
| averageCalories | Decimal | | ✔ |
| averageProtein | Decimal | | ✔ |
| averageScore | Decimal | | ✔ |
| workouts | Integer | | ✔ |
| completedDays | Integer | | ✔ |

---

## JSON de Exemplo

```json
{
  "averageWeight":84.4,
  "averageCalories":1895,
  "averageProtein":149,
  "averageScore":89,
  "workouts":5,
  "completedDays":7
}
```

---

# MonthlySummary

## Objetivo

Representar uma visão consolidada do mês.

---

## Responsabilidade

Produzir indicadores estratégicos.

Nunca substituir os dados diários.

---

## Campos

| Campo | Tipo | Persistido | Calculado |
|--------|------|------------|-----------|
| averageWeight | Decimal | | ✔ |
| averageProtein | Decimal | | ✔ |
| averageScore | Decimal | | ✔ |
| completedDays | Integer | | ✔ |
| totalMeals | Integer | | ✔ |
| totalWorkouts | Integer | | ✔ |
| weightVariation | Decimal | | ✔ |

---

## JSON de Exemplo

```json
{
  "averageWeight":84.9,
  "averageProtein":146,
  "averageScore":88,
  "completedDays":29,
  "totalMeals":141,
  "totalWorkouts":22,
  "weightVariation":-3.7
}
```

---

## Regras Gerais das Entidades Calculadas

Nenhuma entidade calculada poderá ser:

- persistida;
- exportada individualmente;
- importada;
- editada manualmente.

Todas deverão ser reconstruídas pelo Metrics Engine sempre que necessárias.

# RELACIONAMENTOS

Este capítulo define oficialmente como as entidades do HWP Platform se relacionam.

Os relacionamentos descritos abaixo são obrigatórios.

Nenhuma implementação poderá criar relacionamentos diferentes sem atualização deste documento.

---

## Visão Geral

```

Profile
│
├── Goals (1:1)
├── Settings (1:1)
├── DailyEntry (1:N)
├── Medication (1:N)
│
└── DailyEntry
│
├── Meal (1:N)
├── Workout (1:N)
├── ProgressPhoto (1:N)
└── TimelineEvent (1:N)

Medication
│
└── Injection (1:N)

FavoriteMeal
│
└── Meal (1:N)

```

---

# Cardinalidades Oficiais

## Profile

Possui exatamente:

• 1 Goals

• 1 Settings

• N DailyEntry

• N Medication

---

## DailyEntry

Possui:

• N Meal

• N Workout

• N ProgressPhoto

• N TimelineEvent

Nunca poderá existir sem um Profile.

---

## Meal

Pertence a:

1 DailyEntry

Pode possuir:

0 ou 1 FavoriteMeal

Pode gerar:

1 TimelineEvent

---

## FavoriteMeal

Pode originar:

N Meal

Nunca pertence a um dia específico.

---

## Medication

Pode possuir:

N Injection

---

## Injection

Pertence obrigatoriamente a um Medication.

---

## ProgressPhoto

Pertence obrigatoriamente a um DailyEntry.

---

## TimelineEvent

Sempre referencia exatamente uma entidade.

Nunca múltiplas entidades.

---

# Fluxo Oficial dos Dados

Todo dado deverá seguir exatamente este fluxo.

```

Usuário

↓

Interface

↓

Module

↓

Metrics Engine

↓

Storage

↓

LocalStorage

```

Nunca acessar o Storage diretamente pela interface.

Nunca calcular indicadores dentro da interface.

Nunca acessar LocalStorage fora do Storage.

---

# Fluxo de Atualização

## Exemplo

Registro de refeição.

```

Usuário

↓

Nutrition Module

↓

Storage.saveMeal()

↓

Metrics.invalidate()

↓

Dashboard.rebuild()

↓

Timeline.publish()

↓

Library.refresh()

↓

Interface.render()

```

Sempre nesta ordem.

---

## Registro de Peso

```

Usuário

↓

Diary Module

↓

Storage.updateDailyEntry()

↓

Metrics.invalidate()

↓

Dashboard.rebuild()

↓

Charts.refresh()

↓

Timeline.publish()

↓

Interface.render()

```

---

## Registro de Treino

```

Usuário

↓

Workout Module

↓

Storage.saveWorkout()

↓

Metrics.invalidate()

↓

Dashboard.rebuild()

↓

Timeline.publish()

↓

Interface.render()

```

---

# Eventos Oficiais

Todos os módulos deverão utilizar o mesmo padrão de eventos.

Formato obrigatório.

```

modulo:acao

```

---

## Eventos do Diário

entry:created

entry:updated

entry:deleted

weight:updated

waist:updated

water:updated

sleep:updated

steps:updated

---

## Eventos da Alimentação

meal:created

meal:updated

meal:deleted

meal:imported

meal:moved

meal:favorite

---

## Eventos da Biblioteca

favorite:created

favorite:updated

favorite:deleted

favorite:used

---

## Eventos do Dashboard

dashboard:refresh

dashboard:rebuilt

---

## Eventos dos Treinos

workout:created

workout:updated

workout:deleted

---

## Eventos da Medicação

medication:created

medication:updated

medication:deleted

---

## Eventos das Aplicações

injection:created

injection:updated

injection:deleted

---

## Eventos das Fotos

photo:created

photo:updated

photo:deleted

---

## Eventos da Timeline

timeline:created

timeline:updated

timeline:deleted

---

## Eventos do Sistema

backup:created

backup:restored

settings:updated

theme:changed

language:changed

---

# Estratégia de Versionamento

Toda alteração estrutural deverá atualizar:

schemaVersion

Exemplo.

```json
{
    "schemaVersion":"3.0.0"
}
```

Nunca utilizar apenas números inteiros.

---

Toda importação deverá validar:

schemaVersion

Caso incompatível.

Abortar importação.

Exibir mensagem ao usuário.

---

# Compatibilidade

O modelo de dados deverá ser preparado para futuras versões.

Entre elas.

Cloud Sync.

Multiusuário.

Apple Health.

Google Fit.

Wearables.

API Pública.

Múltiplos Perfis.

Assistente IA.

Nenhuma dessas funcionalidades deverá exigir reconstrução estrutural.

---

# Princípios Arquiteturais

Os princípios abaixo possuem prioridade máxima.

Fonte Única da Verdade.

Nunca duplicar dados.

---

Dados Calculados.

Nunca persistir indicadores.

---

Baixo Acoplamento.

Entidades independentes.

---

Alta Coesão.

Cada entidade possui responsabilidade única.

---

Escalabilidade.

Toda entidade deverá aceitar evolução futura.

---

Compatibilidade Retroativa.

Sempre que possível preservar dados antigos.

---

# Checklist para o Codex

Antes de implementar qualquer entidade verificar.

☐ Todos os campos definidos.

☐ Todos os Enums oficiais.

☐ Todos os relacionamentos corretos.

☐ Todas as validações implementadas.

☐ Eventos publicados.

☐ Nenhum indicador persistido.

☐ Nenhum relacionamento circular.

☐ Compatível com Backup.

☐ Compatível com Importação.

☐ Compatível com Exportação.

☐ Compatível com Metrics Engine.

☐ Compatível com Timeline.

☐ Compatível com Dashboard.

☐ Compatível com PWA.

---

# Checklist para Revisão Técnica

Antes de aprovar qualquer Sprint verificar.

✓ Nenhuma entidade duplicada.

✓ Nenhum campo desnecessário.

✓ Nenhum relacionamento incorreto.

✓ Nenhum dado calculado persistido.

✓ Nenhuma responsabilidade duplicada.

✓ Modelo consistente.

✓ Arquitetura preservada.

✓ Documentação atualizada.

---

# Histórico Geral do Modelo

Versão 3.0

Principais mudanças em relação à geração anterior.

• Separação entre entidades persistentes e calculadas.

• Dashboard totalmente calculado.

• Biblioteca Inteligente remodelada.

• DailyEntry tornou-se a entidade central do sistema.

• Medication separado de Injection.

• Timeline baseada em eventos.

• Settings centralizado.

• HWP_FOOD incorporado oficialmente ao modelo.

• Hash do HWP_FOOD preparado para deduplicação.

• Modelo preparado para sincronização futura.

• Arquitetura preparada para múltiplos usuários.

---

# Objetivo Final

O modelo de dados do HWP Platform deverá permanecer estável por muitos anos.

Novas funcionalidades deverão ser adicionadas através de novas entidades ou novos atributos.

Nunca através da quebra das entidades existentes.

Toda decisão deverá preservar:

• simplicidade;

• consistência;

• rastreabilidade;

• escalabilidade;

• desempenho.

Este documento representa a única fonte oficial de definição das entidades do HWP Platform 3.0.

# FIM DO DOCUMENTO

