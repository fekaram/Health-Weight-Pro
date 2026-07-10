# HWP Platform 3.0

# 06 - MODULES

Versão: 1.0

Status: Oficial

Documento obrigatório para implementação de todos os módulos do HWP Platform.

---

# Objetivo

Este documento define oficialmente todos os módulos do sistema.

Cada módulo representa uma unidade funcional independente.

Todo desenvolvimento deverá respeitar rigorosamente as responsabilidades aqui definidas.

Nenhum módulo poderá assumir responsabilidades pertencentes a outro módulo.

---

# Filosofia dos Módulos

O HWP Platform foi desenvolvido utilizando arquitetura modular.

Cada módulo deverá possuir:

• responsabilidade única;

• baixo acoplamento;

• alta coesão;

• comunicação através de eventos;

• interface pública bem definida.

Nenhum módulo deverá conhecer detalhes internos de outro módulo.

---

# Comunicação entre Módulos

A comunicação deverá ocorrer preferencialmente através do Sistema de Eventos.

Fluxo oficial.

```

Usuário

↓

Interface

↓

Module

↓

Event Bus

↓

Modules interessados

↓

Interface

```

Nunca utilizar chamadas diretas quando existir evento equivalente.

---

# Dependências

Dependências permitidas.

```

UI

↓

Modules

↓

Metrics

↓

Storage

↓

LocalStorage

```

Dependências proibidas.

```

Dashboard

↓

LocalStorage

```

```

Meal

↓

Dashboard

```

```

Charts

↓

Storage

```

---

# Estrutura Oficial dos Módulos

Todo módulo deverá possuir.

Controller

↓

Service

↓

View

↓

Components

↓

Events

↓

Types

Nenhum módulo deverá concentrar toda lógica em um único arquivo.

---

# API Pública

Todo módulo deverá expor apenas métodos públicos.

Exemplo.

initialize()

render()

refresh()

destroy()

Nunca expor métodos privados.

---

# DASHBOARD MODULE

---

## Objetivo

Representar a visão executiva do HWP Platform.

O Dashboard deverá responder imediatamente à pergunta:

"Como estou hoje?"

Ele não deverá funcionar como uma tela de consulta.

Seu objetivo é fornecer uma visão rápida do estado atual do usuário.

---

## Responsabilidade

Exibir.

Peso.

Circunferência.

IMC.

Metas.

Nutrição.

Hábitos.

Treinos.

Timeline resumida.

Insights.

Nunca calcular indicadores.

Nunca salvar dados.

Nunca acessar LocalStorage.

---

## Entradas

Dashboard ViewModel.

BodyMetrics.

DailyNutrition.

DailyScore.

WeeklySummary.

Timeline resumida.

Goals.

Settings.

Todos produzidos pelo Metrics Engine.

---

## Saídas

Renderização.

Atualização visual.

Publicação de eventos de interface.

Nunca gerar persistência.

---

## Dependências

Permitidas.

Metrics.

Timeline Module.

Settings Module.

Charts Module.

UI Components.

---

Proibidas.

Storage.

LocalStorage.

Export Module.

Import Module.

---

## API Pública

initialize()

render()

refresh()

showLoading()

hideLoading()

showEmptyState()

destroy()

---

## Eventos Consumidos

entry:updated

meal:created

meal:updated

meal:deleted

workout:completed

weight:updated

waist:updated

settings:updated

dashboard:refresh

---

## Eventos Publicados

dashboard:loaded

dashboard:rendered

dashboard:refreshed

dashboard:error

---

## Fluxo Principal

```

Aplicativo inicia

↓

Metrics Engine

↓

Dashboard ViewModel

↓

Dashboard Module

↓

Cards

↓

Charts

↓

Interface

```

---

## Fluxo de Atualização

```

Nova refeição

↓

Meal Module

↓

Metrics.invalidate()

↓

Dashboard.refresh()

↓

Interface atualizada

```

---

## Estados

Loading

Conteúdo

Vazio

Erro

Offline

Todos os estados deverão possuir interface própria.

Nunca utilizar tela em branco.

---

## Componentes

Header.

Resumo Executivo.

Peso Atual.

Meta.

Indicadores.

Cards Nutricionais.

Barras de Progresso.

Hábitos.

Timeline Resumida.

Insights.

Footer.

Cada componente deverá possuir implementação independente.

---

## Regras

Nunca calcular IMC.

Nunca calcular proteína.

Nunca calcular Score.

Nunca acessar Storage.

Nunca alterar dados.

Sempre utilizar ViewModels produzidos pelo Metrics Engine.

---

## Nunca deverá

Persistir informações.

Modificar entidades.

Executar regras de negócio.

Calcular tendências.

Interpretar dados.

Duplicar informações.

## Erros Esperados

O Dashboard deverá tratar elegantemente os seguintes cenários.

---

### Dados inexistentes

Quando não existir nenhum DailyEntry.

Exibir:

- mensagem de boas-vindas;

- botão para iniciar registro;

- nenhuma informação zerada.

Nunca interpretar ausência de dados como zero.

---

### Peso inexistente

Caso o usuário ainda não tenha registrado peso.

Exibir:

"Peso ainda não registrado."

Nunca exibir:

0 kg.

---

### Alimentação inexistente

Caso não existam refeições no dia.

Exibir:

"Você ainda não registrou nenhuma refeição hoje."

---

### Offline

Caso o aplicativo esteja offline.

O Dashboard deverá continuar funcionando normalmente.

Apenas recursos dependentes de IA deverão ser desabilitados.

---

### Erro interno

Caso ocorra qualquer exceção.

Exibir mensagem amigável.

Registrar log.

Nunca interromper a aplicação.

---

## Critérios de Aceitação

✓ Nunca acessa LocalStorage.

✓ Nunca calcula métricas.

✓ Nunca altera dados.

✓ Todos os indicadores são produzidos pelo Metrics Engine.

✓ Todos os componentes reutilizáveis.

✓ Funciona offline.

✓ Funciona em modo claro.

✓ Funciona em modo escuro.

✓ Responsivo.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

O Dashboard é um consumidor de informações.

Nunca um produtor.

Sua única responsabilidade é apresentar indicadores.

---

Todos os Cards deverão funcionar independentemente.

Caso um componente falhe.

Os demais deverão continuar funcionando.

---

Cada Card deverá possuir seu próprio ciclo de renderização.

Isso evita renderizações completas do Dashboard.

---

O Dashboard nunca armazenará estado próprio.

Sempre utilizará ViewModels reconstruídos pelo Metrics Engine.

---

## Histórico de Decisões

Versão 3.0

Dashboard passou a utilizar ViewModels.

Dashboard deixou de armazenar dados.

Dashboard passou a consumir exclusivamente Metrics Engine.

Toda atualização tornou-se orientada por eventos.

---

# DIARY MODULE

---

## Objetivo

Representar o registro diário do usuário.

O Diário é responsável por registrar o estado corporal e os hábitos de cada dia.

Ele representa a principal fonte de dados do HWP Platform.

---

## Responsabilidade

Registrar.

Peso.

Circunferência abdominal.

Água.

Sono.

Passos.

Hábitos.

Observações.

Nunca registrar refeições.

Nunca registrar treinos.

Nunca registrar medicamentos.

---

## Entradas

Interação do usuário.

Importação.

Backup.

Integrações futuras.

---

## Saídas

Atualização do DailyEntry.

Eventos.

Atualização automática do Dashboard.

Atualização automática da Timeline.

Atualização automática dos gráficos.

---

## Dependências

Permitidas.

Storage.

Metrics.

Timeline.

Settings.

UI Components.

Validation.

---

Proibidas.

Nutrition Module.

Workout Module.

Medication Module.

Library Module.

---

## API Pública

initialize()

loadEntry()

saveEntry()

updateWeight()

updateWaist()

updateWater()

updateSleep()

updateSteps()

updateHabits()

updateNotes()

refresh()

destroy()

---

## Eventos Consumidos

entry:created

entry:updated

backup:restored

settings:updated

---

## Eventos Publicados

entry:created

entry:updated

weight:updated

waist:updated

water:updated

sleep:updated

steps:updated

habit:updated

notes:updated

---

## Fluxo Principal

```

Usuário

↓

Diário

↓

Validação

↓

Storage

↓

Metrics.invalidate()

↓

Timeline.publish()

↓

Dashboard.refresh()

↓

Charts.refresh()

↓

Render()

```

---

## Fluxo de Registro de Peso

```

Usuário

↓

Campo Peso

↓

Validation

↓

Storage.updateDailyEntry()

↓

weight:updated

↓

Metrics.invalidate()

↓

Dashboard.refresh()

↓

Charts.refresh()

```

---

## Fluxo de Registro de Água

```

Usuário

↓

Atualiza Água

↓

Storage

↓

water:updated

↓

Dashboard.refresh()

```

---

## Estados

Loading

Novo Registro

Registro Existente

Offline

Erro

---

## Componentes

Cabeçalho.

Data.

Peso.

Circunferência.

Água.

Sono.

Passos.

Hábitos.

Observações.

Salvar.

Indicador de sincronização.

Cada componente deverá ser independente.

---

## Regras

Nunca criar dois DailyEntry para a mesma data.

Sempre atualizar o registro existente.

Peso vazio permanece null.

Circunferência vazia permanece null.

Nunca substituir null por zero.

Toda alteração deverá disparar evento correspondente.

Nunca recalcular indicadores dentro do módulo.

Sempre utilizar Validation antes de persistir dados.

---

## Nunca deverá

Calcular IMC.

Calcular Score.

Calcular Dashboard.

Interpretar tendências.

Atualizar Biblioteca.

Persistir indicadores calculados.

## Erros Esperados

O Diário deverá tratar corretamente os seguintes cenários.

---

### Peso inválido

Caso o peso informado seja menor ou igual a zero.

Não salvar.

Exibir mensagem amigável.

Manter foco no campo.

---

### Circunferência inválida

Mesmo comportamento do peso.

---

### Dados ausentes

Caso nenhum dado tenha sido preenchido.

Permitir salvar apenas a data.

O usuário poderá completar o registro posteriormente.

---

### Falha de persistência

Caso o Storage apresente erro.

Não perder os dados digitados.

Exibir mensagem.

Permitir nova tentativa.

---

### Offline

O Diário deverá funcionar integralmente.

Nenhuma funcionalidade dependerá de conexão.

---

## Critérios de Aceitação

✓ Existe apenas um DailyEntry por data.

✓ Nunca substitui null por zero.

✓ Todos os eventos publicados corretamente.

✓ Atualiza Dashboard automaticamente.

✓ Atualiza Timeline automaticamente.

✓ Atualiza gráficos automaticamente.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

O Diário representa a única fonte de verdade para informações corporais diárias.

Nenhum outro módulo poderá alterar diretamente:

- peso;

- cintura;

- água;

- sono;

- passos.

---

Toda alteração deverá passar pelo Diary Module.

---

O Diário nunca conhecerá detalhes internos do Dashboard.

Ele apenas publica eventos.

---

## Histórico de Decisões

Versão 3.0

O DailyEntry tornou-se a entidade central do HWP.

Todos os indicadores passaram a ser derivados dele.

O módulo deixou de calcular métricas.

Toda atualização passou a ser baseada em eventos.

---

# NUTRITION MODULE

---

## Objetivo

Representar toda a experiência de registro alimentar do usuário.

Este é o principal módulo do HWP Platform.

Seu objetivo é permitir que qualquer refeição seja registrada em poucos segundos.

---

## Responsabilidade

Registrar refeições.

Importar HWP_FOOD.

Editar refeições.

Excluir refeições.

Adicionar refeições da Biblioteca.

Atualizar Biblioteca.

Atualizar Timeline.

Publicar eventos.

Nunca calcular Dashboard.

Nunca calcular Score Diário.

Nunca acessar LocalStorage diretamente.

---

## Entradas

HWP_FOOD.

Biblioteca Inteligente.

Cadastro manual.

Importação.

Backup.

---

## Saídas

Meal.

FavoriteMeal.

Timeline.

Eventos.

Atualização do Dashboard.

Atualização dos gráficos.

---

## Dependências

Permitidas.

Storage.

Metrics.

Library Module.

Timeline Module.

Validation.

UI Components.

Event Bus.

---

Proibidas.

Dashboard Module.

Workout Module.

Medication Module.

---

## API Pública

initialize()

importHwpFood()

createMeal()

updateMeal()

deleteMeal()

duplicateMeal()

moveMeal()

favoriteMeal()

loadMeals()

refresh()

destroy()

---

## Eventos Consumidos

favorite:selected

entry:updated

backup:restored

settings:updated

---

## Eventos Publicados

meal:created

meal:updated

meal:deleted

meal:moved

meal:favorite

meal:duplicated

meal:imported

nutrition:updated

---

## Fluxo Principal

```

Usuário

↓

Seleciona Refeição

↓

Popup Nutri IA

↓

HWP_FOOD

↓

Validation

↓

Storage.saveMeal()

↓

Metrics.invalidate()

↓

Timeline.publish()

↓

Library.update()

↓

Dashboard.refresh()

↓

Charts.refresh()

↓

Render()

```

---

## Fluxo Biblioteca

```

Biblioteca

↓

Selecionar Refeição

↓

Storage.createMeal()

↓

favorite:used

↓

Metrics.invalidate()

↓

Dashboard.refresh()

↓

Timeline.publish()

```

---

## Fluxo Exclusão

```

Excluir Refeição

↓

Confirmação

↓

Storage.deleteMeal()

↓

meal:deleted

↓

Metrics.invalidate()

↓

Dashboard.refresh()

↓

Timeline.publish()

↓

Render()

```

---

## Estados

Loading

Lista Vazia

Lista com Refeições

Importando

Erro

Offline

---

## Componentes

Lista de refeições.

Cards.

Popup Nutri IA.

Editor.

Botão Biblioteca.

Resumo Nutricional.

Indicadores.

Botão adicionar.

Menu contextual.

Confirmação de exclusão.

Todos os componentes deverão ser independentes.

---

## Regras

Toda Meal pertence obrigatoriamente a um DailyEntry.

Sempre validar HWP_FOOD antes da importação.

Nunca sobrescrever refeições existentes.

Toda edição deverá preservar o HWP_FOOD original.

Toda exclusão deverá gerar evento na Timeline.

Toda criação deverá atualizar automaticamente a Biblioteca Inteligente.

Nunca recalcular métricas dentro do módulo.

Sempre utilizar o Metrics Engine.

---

## Nunca deverá

Calcular IMC.

Calcular Dashboard.

Calcular WeeklySummary.

Calcular MonthlySummary.

Persistir indicadores calculados.

Interpretar gráficos.

Acessar LocalStorage diretamente.

Duplicar lógica da Biblioteca.

## Erros Esperados

O Nutrition Module deverá tratar corretamente os seguintes cenários.

---

### HWP_FOOD inválido

Caso o conteúdo recebido não siga o padrão oficial.

Não importar.

Exibir mensagem amigável.

Permitir nova tentativa.

Nunca criar uma Meal incompleta.

---

### Nutrientes inconsistentes

Caso algum nutriente possua valor inválido.

Cancelar a importação.

Exibir erro de validação.

---

### Biblioteca indisponível

Caso a Biblioteca não possa ser carregada.

O usuário ainda deverá conseguir registrar refeições normalmente.

---

### Exclusão

Nunca excluir imediatamente.

Sempre solicitar confirmação.

---

### Offline

O módulo deverá funcionar normalmente.

Apenas a geração do HWP_FOOD pelo ChatGPT dependerá de conexão.

---

### Erro interno

Nunca interromper a aplicação.

Registrar log.

Exibir mensagem amigável.

---

## Critérios de Aceitação

✓ Toda Meal pertence a um DailyEntry.

✓ Todo HWP_FOOD é validado.

✓ Biblioteca atualizada automaticamente.

✓ Timeline atualizada automaticamente.

✓ Dashboard atualizado automaticamente.

✓ Gráficos atualizados automaticamente.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

O Nutrition Module é responsável apenas pelo gerenciamento das refeições.

Nunca interpreta indicadores.

Nunca calcula Score.

Nunca calcula Dashboard.

---

O HWP_FOOD sempre será preservado.

Mesmo que a refeição seja editada.

---

Toda alteração gera novo evento.

Nunca atualizar silenciosamente uma refeição.

---

O Nutrition Module nunca conhecerá detalhes internos da Biblioteca.

A comunicação ocorrerá através de eventos.

---

## Histórico de Decisões

Versão 3.0

O módulo passou a utilizar HWP_FOOD como formato oficial.

A Biblioteca tornou-se independente.

O Dashboard deixou de ser atualizado diretamente.

Toda comunicação passou a utilizar Event Bus.

---

# LIBRARY MODULE

---

## Objetivo

Representar a Biblioteca Inteligente do HWP Platform.

Seu objetivo é reduzir drasticamente o tempo necessário para registrar refeições recorrentes.

A Biblioteca deverá aprender automaticamente com o comportamento do usuário.

---

## Responsabilidade

Armazenar FavoriteMeal.

Organizar refeições.

Pesquisar refeições.

Classificar refeições.

Gerenciar favoritos.

Aprender padrões de utilização.

Nunca registrar consumo diário.

Nunca calcular indicadores.

---

## Entradas

Meal.

Cadastro manual.

Importação.

Backup.

---

## Saídas

FavoriteMeal.

Sugestões.

Pesquisa.

Eventos.

---

## Dependências

Permitidas.

Storage.

Metrics.

Validation.

UI Components.

Event Bus.

---

Proibidas.

Dashboard Module.

Workout Module.

Medication Module.

---

## API Pública

initialize()

createFavorite()

updateFavorite()

deleteFavorite()

loadFavorites()

search()

sort()

pin()

unpin()

refresh()

destroy()

---

## Eventos Consumidos

meal:created

meal:updated

meal:deleted

favorite:created

favorite:updated

backup:restored

---

## Eventos Publicados

favorite:created

favorite:updated

favorite:deleted

favorite:used

library:updated

library:sorted

---

## Fluxo Principal

```

Meal criada

↓

Library.receive()

↓

Atualiza estatísticas

↓

Atualiza ordenação

↓

Publica library:updated

↓

Render()

```

---

## Fluxo Pesquisa

```

Usuário

↓

Campo Pesquisa

↓

Filtro

↓

Ordenação

↓

Render()

```

---

## Fluxo Utilização

```

Selecionar FavoriteMeal

↓

createMeal()

↓

favorite:used

↓

Atualiza estatísticas

↓

Dashboard.refresh()

↓

Timeline.publish()

```

---

## Estados

Loading

Biblioteca vazia

Resultados encontrados

Nenhum resultado

Erro

Offline

---

## Componentes

Campo de pesquisa.

Categorias.

Favoritos.

Mais utilizados.

Últimos utilizados.

Cards.

Botão adicionar.

Botão editar.

Botão excluir.

Menu contextual.

Todos independentes.

---

## Regras

Nunca modificar automaticamente uma FavoriteMeal.

Sempre registrar quantidade de utilizações.

Sempre atualizar última utilização.

Permitir ordenação por:

- mais utilizados;

- mais recentes;

- nome;

- categoria;

- score.

Nunca registrar consumo diário.

Nunca calcular Dashboard.

Sempre utilizar FavoriteMeal como entidade oficial da Biblioteca.

---

## Nunca deverá

Persistir indicadores calculados.

Alterar automaticamente nutrientes.

Alterar automaticamente nome.

Excluir refeições utilizadas pelo usuário.

Calcular Score.

Calcular Dashboard.

## Erros Esperados

O Library Module deverá tratar corretamente os seguintes cenários.

---

### Biblioteca vazia

Quando nenhuma FavoriteMeal existir.

Exibir:

- ilustração;
- mensagem amigável;
- botão "Criar primeira refeição".

Nunca exibir lista vazia sem contexto.

---

### Pesquisa sem resultados

Exibir:

"Nenhuma refeição encontrada."

Oferecer:

- limpar filtros;

- criar nova refeição.

---

### Exclusão

Nunca excluir imediatamente.

Sempre solicitar confirmação.

Caso a FavoriteMeal já tenha originado refeições:

Nunca excluir essas refeições.

Excluir apenas o modelo reutilizável.

---

### Duplicidade

Caso já exista uma FavoriteMeal idêntica.

Oferecer:

- atualizar existente;

- manter as duas;

- cancelar.

Nunca decidir automaticamente.

---

### Offline

Todo o módulo deverá funcionar normalmente.

---

### Falha de persistência

Não perder alterações.

Permitir nova tentativa.

---

## Critérios de Aceitação

✓ Pesquisa instantânea.

✓ Ordenação correta.

✓ Estatísticas atualizadas.

✓ FavoriteMeal nunca altera Meal histórica.

✓ Compatível com Backup.

✓ Compatível com Timeline.

✓ Compatível com HWP_FOOD.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

A Biblioteca representa conhecimento.

Não representa consumo.

---

FavoriteMeal é uma receita reutilizável.

Meal representa consumo realizado.

Essas entidades nunca deverão ser confundidas.

---

A Biblioteca deverá aprender continuamente.

Quanto mais utilizada.

Melhor deverá ordenar sugestões.

---

Toda estatística deverá ser calculada.

Nunca persistida.

---

## Histórico de Decisões

Versão 3.0

Biblioteca passou a utilizar FavoriteMeal.

Foi criado aprendizado automático.

Pesquisa tornou-se desacoplada.

Toda comunicação passou para Event Bus.

---

# TIMELINE MODULE

---

## Objetivo

Representar o histórico oficial do HWP Platform.

Toda ação relevante deverá aparecer na Timeline.

A Timeline deverá permitir ao usuário compreender sua evolução cronológica.

---

## Responsabilidade

Registrar eventos.

Exibir eventos.

Pesquisar eventos.

Filtrar eventos.

Agrupar eventos.

Nunca armazenar entidades completas.

Nunca modificar entidades.

---

## Entradas

TimelineEvent.

Filtros.

Pesquisa.

Backup.

---

## Saídas

Renderização.

Eventos filtrados.

Pesquisa.

Agrupamentos.

---

## Dependências

Permitidas.

Storage.

Metrics.

UI Components.

Validation.

Event Bus.

---

Proibidas.

Dashboard Module.

Nutrition Module.

Workout Module.

Medication Module.

---

## API Pública

initialize()

publish()

load()

search()

filter()

group()

refresh()

destroy()

---

## Eventos Consumidos

entry:created

entry:updated

meal:created

meal:updated

meal:deleted

favorite:used

workout:completed

photo:created

injection:created

settings:updated

backup:restored

---

## Eventos Publicados

timeline:loaded

timeline:updated

timeline:filtered

timeline:searched

---

## Fluxo Principal

```

Evento publicado

↓

Timeline.receive()

↓

Storage.saveTimelineEvent()

↓

Ordenação

↓

Filtros

↓

Render()

```

---

## Fluxo Pesquisa

```

Usuário

↓

Pesquisa

↓

Filtro

↓

Ordenação

↓

Render()

```

---

## Fluxo Filtros

```

Selecionar Categoria

↓

Aplicar Filtro

↓

Atualizar Lista

↓

Render()

```

---

## Estados

Loading

Lista vazia

Eventos encontrados

Nenhum resultado

Erro

Offline

---

## Componentes

Linha do tempo.

Cards.

Filtros.

Pesquisa.

Agrupamento por data.

Ícones.

Detalhes do evento.

Menu contextual.

Todos independentes.

---

## Regras

Nunca armazenar entidades completas.

Sempre armazenar referências.

Sempre ordenar por eventDate.

Permitir filtros por:

- alimentação;

- peso;

- treino;

- medicamento;

- fotos;

- sistema.

Nunca alterar entidades através da Timeline.

Sempre consultar entidade original quando necessário.

---

## Nunca deverá

Persistir Dashboard.

Persistir Meals completas.

Persistir Workout completo.

Persistir DailyEntry completo.

Duplicar dados.

Calcular indicadores.

Modificar entidades.

## Erros Esperados

O Timeline Module deverá tratar corretamente os seguintes cenários.

---

### Nenhum evento registrado

Quando não existir nenhum TimelineEvent.

Exibir:

- ilustração;

- mensagem de boas-vindas;

- botão para registrar o primeiro evento.

Nunca apresentar uma tela vazia.

---

### Pesquisa sem resultados

Exibir:

"Nenhum evento encontrado."

Permitir:

- limpar filtros;

- remover pesquisa.

---

### Evento órfão

Caso a entidade original tenha sido removida.

O evento continuará existindo.

Exibir:

"Este registro histórico não está mais disponível."

Nunca interromper a Timeline.

---

### Offline

A Timeline deverá funcionar normalmente.

Todos os eventos são locais.

---

### Erro interno

Registrar log.

Exibir mensagem amigável.

Nunca interromper a aplicação.

---

## Critérios de Aceitação

✓ Eventos ordenados cronologicamente.

✓ Pesquisa instantânea.

✓ Filtros funcionando.

✓ Agrupamento por data.

✓ Compatível com todos os módulos.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

A Timeline representa o histórico da aplicação.

Nunca será utilizada como banco de dados.

---

Cada evento será imutável.

Caso uma entidade seja alterada posteriormente.

Um novo evento poderá ser criado.

Nunca editar eventos antigos.

---

A Timeline deverá ser extremamente rápida.

Filtros deverão ocorrer em memória.

Nunca consultar Storage repetidamente durante a navegação.

---

## Histórico de Decisões

Versão 3.0

Timeline passou a utilizar arquitetura baseada em eventos.

Eventos tornaram-se imutáveis.

Pesquisa passou a funcionar em memória.

---

# BODY PROGRESS MODULE

---

## Objetivo

Representar toda a evolução corporal do usuário.

Este módulo concentra indicadores históricos.

Gráficos.

Fotos.

Comparações.

Metas.

---

## Responsabilidade

Exibir:

Peso.

Circunferência.

IMC.

Fotos.

Gráficos.

Projeções.

Comparações.

Nunca registrar peso.

Nunca registrar refeições.

Nunca registrar treinos.

---

## Entradas

DailyEntry.

ProgressPhoto.

Goals.

BodyMetrics.

WeeklySummary.

MonthlySummary.

---

## Saídas

Gráficos.

Comparações.

Indicadores.

Projeções.

---

## Dependências

Permitidas.

Metrics.

Charts.

Timeline.

UI Components.

Settings.

---

Proibidas.

Storage.

Nutrition Module.

Workout Module.

Medication Module.

---

## API Pública

initialize()

render()

refresh()

showCharts()

showPhotos()

compare()

exportProgress()

destroy()

---

## Eventos Consumidos

weight:updated

waist:updated

photo:created

photo:updated

goal:updated

dashboard:refresh

---

## Eventos Publicados

progress:updated

charts:refresh

comparison:generated

---

## Fluxo Principal

```

DailyEntry atualizado

↓

Metrics Engine

↓

BodyMetrics

↓

Charts

↓

Body Progress

↓

Render()

```

---

## Fluxo Comparação

```

Selecionar duas datas

↓

BodyMetrics

↓

Comparação

↓

Render()

```

---

## Fluxo Fotos

```

Selecionar posição

↓

Buscar fotos

↓

Ordenação

↓

Comparação

↓

Render()

```

---

## Estados

Loading

Sem Dados

Gráficos

Fotos

Comparação

Erro

Offline

---

## Componentes

Resumo corporal.

Peso.

Circunferência.

IMC.

Gráfico de Peso.

Gráfico de Circunferência.

Linha de tendência.

Comparação lado a lado.

Galeria de Fotos.

Projeção da Meta.

Todos independentes.

---

## Regras

Nunca calcular IMC.

Nunca calcular projeções.

Sempre utilizar BodyMetrics.

Sempre utilizar Charts Module.

Sempre utilizar ProgressPhoto.

Permitir comparação entre quaisquer datas.

Nunca alterar dados históricos.

---

## Nunca deverá

Persistir gráficos.

Persistir indicadores.

Persistir comparações.

Modificar fotos.

Modificar DailyEntry.

Calcular tendências.

## Erros Esperados

O Body Progress Module deverá tratar corretamente os seguintes cenários.

---

### Nenhum peso registrado

Caso ainda não exista peso informado.

Exibir:

- mensagem amigável;

- botão para registrar peso;

- esconder gráficos dependentes.

Nunca exibir gráfico vazio.

---

### Poucos dados

Caso existam poucos registros.

Exibir gráfico normalmente.

Nunca interpolar informações inexistentes.

---

### Fotos inexistentes

Exibir:

"Nenhuma foto registrada."

Oferecer botão:

Adicionar Foto.

---

### Comparação impossível

Caso exista apenas uma foto.

Desabilitar comparação.

Explicar o motivo.

---

### Offline

Todas as funcionalidades deverão continuar funcionando.

---

### Erro interno

Registrar log.

Exibir mensagem amigável.

Nunca interromper a aplicação.

---

## Critérios de Aceitação

✓ Gráficos atualizados automaticamente.

✓ Comparações corretas.

✓ Fotos organizadas.

✓ Projeções corretas.

✓ Compatível com Dashboard.

✓ Compatível com Timeline.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

Todo gráfico deverá consumir ViewModels.

Nunca consultar Storage diretamente.

---

Fotos e gráficos permanecerão completamente independentes.

Uma falha em um deles nunca poderá impedir o funcionamento do outro.

---

Toda comparação será gerada sob demanda.

Nunca armazenada.

---

## Histórico de Decisões

Versão 3.0

O módulo passou a utilizar apenas dados calculados.

Comparações tornaram-se temporárias.

Gráficos passaram a utilizar o Charts Module.

---

# WORKOUT MODULE

---

## Objetivo

Registrar e acompanhar atividades físicas realizadas pelo usuário.

O módulo deverá registrar aderência aos treinos.

Não deverá substituir aplicativos especializados.

---

## Responsabilidade

Registrar.

Treinos.

Duração.

Intensidade.

Observações.

Calorias.

Histórico.

Nunca registrar exercícios individuais.

Nunca registrar séries.

Nunca registrar cargas.

---

## Entradas

Cadastro manual.

Importação.

Integrações futuras.

Backup.

---

## Saídas

Workout.

Timeline.

Dashboard.

Eventos.

---

## Dependências

Permitidas.

Storage.

Metrics.

Timeline.

Validation.

UI Components.

Event Bus.

---

Proibidas.

Nutrition Module.

Medication Module.

Dashboard Module.

---

## API Pública

initialize()

createWorkout()

updateWorkout()

deleteWorkout()

completeWorkout()

loadWorkouts()

refresh()

destroy()

---

## Eventos Consumidos

entry:created

entry:updated

backup:restored

settings:updated

---

## Eventos Publicados

workout:created

workout:updated

workout:deleted

workout:completed

---

## Fluxo Principal

```

Usuário

↓

Cadastrar Treino

↓

Validation

↓

Storage.saveWorkout()

↓

Metrics.invalidate()

↓

Timeline.publish()

↓

Dashboard.refresh()

↓

Render()

```

---

## Fluxo Exclusão

```

Excluir Treino

↓

Confirmação

↓

Storage.deleteWorkout()

↓

Timeline.publish()

↓

Dashboard.refresh()

↓

Render()

```

---

## Fluxo Conclusão

```

Treino concluído

↓

workout:completed

↓

Metrics.invalidate()

↓

Dashboard.refresh()

↓

Timeline.publish()

```

---

## Estados

Loading

Lista Vazia

Lista com Treinos

Erro

Offline

---

## Componentes

Lista.

Cards.

Filtro.

Cadastrar.

Editar.

Excluir.

Resumo semanal.

Resumo mensal.

Indicador de frequência.

Todos independentes.

---

## Regras

Todo Workout pertence obrigatoriamente a um DailyEntry.

Nunca registrar treino sem data.

Sempre validar duração.

Sempre validar intensidade.

Toda alteração deverá publicar eventos.

Nunca calcular indicadores.

Nunca calcular Dashboard.

---

## Nunca deverá

Calcular Score.

Calcular gráficos.

Persistir indicadores.

Modificar DailyEntry.

Modificar Meal.

Modificar Medication.

## Erros Esperados

O Workout Module deverá tratar corretamente os seguintes cenários.

---

### Duração inválida

Caso a duração seja menor ou igual a zero.

Não salvar.

Exibir mensagem amigável.

---

### Intensidade inválida

Caso a intensidade não pertença ao Enum oficial.

Cancelar o salvamento.

Solicitar correção.

---

### Exclusão

Nunca excluir imediatamente.

Sempre solicitar confirmação.

---

### Offline

O módulo deverá funcionar integralmente.

---

### Erro interno

Registrar log.

Exibir mensagem amigável.

Nunca interromper a aplicação.

---

## Critérios de Aceitação

✓ Todo Workout pertence a um DailyEntry.

✓ Eventos publicados corretamente.

✓ Timeline atualizada.

✓ Dashboard atualizado.

✓ Compatível com Backup.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

O Workout representa apenas uma sessão.

Nunca um plano de treinamento.

---

Toda estatística será produzida pelo Metrics Engine.

Nunca pelo módulo.

---

O módulo deverá permitir futuras integrações com:

Apple Health.

Google Fit.

Garmin.

Polar.

Fitbit.

Sem alteração estrutural.

---

## Histórico de Decisões

Versão 3.0

Workout tornou-se uma entidade simplificada.

Toda análise passou para o Metrics Engine.

Integrações futuras passaram a ser previstas desde a arquitetura inicial.

---

# MEDICATION MODULE

---

## Objetivo

Gerenciar tratamentos, medicamentos e suplementos utilizados pelo usuário.

Permitir acompanhamento completo do tratamento ao longo do tempo.

---

## Responsabilidade

Cadastrar medicamentos.

Editar medicamentos.

Desativar medicamentos.

Registrar aplicações.

Registrar efeitos colaterais.

Atualizar Timeline.

Atualizar Dashboard.

Nunca calcular indicadores.

Nunca interpretar efeitos colaterais.

---

## Entradas

Medication.

Injection.

Cadastro manual.

Importação.

Backup.

---

## Saídas

Medication.

Injection.

Timeline.

Eventos.

Dashboard.

---

## Dependências

Permitidas.

Storage.

Metrics.

Timeline.

Validation.

UI Components.

Event Bus.

---

Proibidas.

Nutrition Module.

Workout Module.

Library Module.

---

## API Pública

initialize()

createMedication()

updateMedication()

disableMedication()

enableMedication()

deleteMedication()

registerInjection()

updateInjection()

deleteInjection()

refresh()

destroy()

---

## Eventos Consumidos

backup:restored

settings:updated

---

## Eventos Publicados

medication:created

medication:updated

medication:enabled

medication:disabled

medication:deleted

injection:created

injection:updated

injection:deleted

sideeffect:added

---

## Fluxo Principal

```

Cadastrar Medicamento

↓

Validation

↓

Storage.saveMedication()

↓

Timeline.publish()

↓

Dashboard.refresh()

↓

Render()

```

---

## Fluxo Aplicação

```

Registrar Aplicação

↓

Validation

↓

Storage.saveInjection()

↓

Timeline.publish()

↓

Metrics.invalidate()

↓

Dashboard.refresh()

↓

Render()

```

---

## Fluxo Alteração de Dose

```

Editar Medication

↓

Validation

↓

Storage.updateMedication()

↓

Timeline.publish()

↓

Dashboard.refresh()

```

---

## Estados

Loading

Sem medicamentos

Lista de medicamentos

Medicamento ativo

Medicamento inativo

Erro

Offline

---

## Componentes

Lista de medicamentos.

Cartão do medicamento.

Histórico de aplicações.

Calendário.

Linha do tempo.

Efeitos colaterais.

Cadastro.

Editor.

Resumo do tratamento.

Todos independentes.

---

## Regras

Medication representa o tratamento.

Injection representa a aplicação.

Nunca misturar responsabilidades.

---

Toda aplicação deverá gerar TimelineEvent.

---

Toda alteração deverá publicar eventos.

---

Nunca excluir automaticamente aplicações históricas.

---

Nunca calcular estatísticas dentro do módulo.

Sempre utilizar Metrics Engine.

---

## Nunca deverá

Calcular Dashboard.

Calcular Score.

Persistir indicadores.

Modificar DailyEntry.

Modificar Meal.

Modificar Workout.

## Erros Esperados

O Medication Module deverá tratar corretamente os seguintes cenários.

---

### Medicamento duplicado

Caso o usuário tente cadastrar um medicamento já existente.

Exibir sugestão para:

- reutilizar o cadastro existente;

- atualizar o medicamento;

- cancelar.

Nunca criar duplicidade automaticamente.

---

### Aplicação inválida

Caso a data seja inválida.

Não salvar.

Solicitar correção.

---

### Dose inválida

Caso a dose esteja vazia.

Cancelar o registro.

Exibir mensagem amigável.

---

### Exclusão

Nunca excluir imediatamente.

Sempre solicitar confirmação.

Caso existam aplicações relacionadas.

Manter histórico.

Excluir apenas quando confirmado pelo usuário.

---

### Offline

Todo o módulo deverá funcionar normalmente.

---

### Erro interno

Registrar log.

Exibir mensagem amigável.

Nunca interromper a aplicação.

---

## Critérios de Aceitação

✓ Medication separado de Injection.

✓ Histórico preservado.

✓ Timeline atualizada.

✓ Dashboard atualizado.

✓ Compatível com Backup.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

Medication representa o tratamento.

Injection representa acontecimentos.

Essas responsabilidades nunca deverão ser misturadas.

---

Aplicações históricas nunca serão modificadas automaticamente.

Mesmo após alteração da dose atual.

---

Todo efeito colateral pertence à aplicação.

Nunca ao medicamento.

---

## Histórico de Decisões

Versão 3.0

Medication tornou-se entidade permanente.

Injection passou a representar eventos históricos.

Efeitos colaterais passaram a pertencer às aplicações.

---

# SETTINGS MODULE

---

## Objetivo

Centralizar todas as preferências do usuário.

O módulo deverá controlar toda personalização do HWP Platform.

---

## Responsabilidade

Gerenciar:

Tema.

Idioma.

Unidades.

Preferências.

Notificações.

Layout.

Backup automático.

Nunca armazenar informações de negócio.

---

## Entradas

Settings.

Assistente Inicial.

Importação.

Backup.

---

## Saídas

Settings.

Eventos.

Atualização da Interface.

---

## Dependências

Permitidas.

Storage.

Theme Engine.

UI Components.

Validation.

Event Bus.

---

Proibidas.

Metrics.

Nutrition Module.

Workout Module.

Medication Module.

---

## API Pública

initialize()

loadSettings()

saveSettings()

changeTheme()

changeLanguage()

changeUnits()

restoreDefaults()

refresh()

destroy()

---

## Eventos Consumidos

backup:restored

profile:created

---

## Eventos Publicados

settings:updated

theme:changed

language:changed

units:changed

notifications:changed

layout:changed

---

## Fluxo Principal

```

Usuário

↓

Alterar Configuração

↓

Validation

↓

Storage.saveSettings()

↓

settings:updated

↓

Interface.refresh()

```

---

## Fluxo Alteração de Tema

```

Selecionar Tema

↓

Theme Engine

↓

Salvar Settings

↓

theme:changed

↓

Render()

```

---

## Fluxo Restaurar

```

Restaurar Configurações

↓

Confirmação

↓

Storage.restoreDefaults()

↓

settings:updated

↓

Render()

```

---

## Estados

Loading

Configurações

Salvando

Erro

Offline

---

## Componentes

Perfil.

Tema.

Idioma.

Unidades.

Layout.

Notificações.

Backup.

Importação.

Exportação.

Sobre.

Todos independentes.

---

## Regras

Nunca armazenar dados do usuário.

Nunca armazenar Dashboard.

Nunca armazenar indicadores.

Sempre publicar eventos.

Toda alteração deverá atualizar imediatamente a Interface.

---

## Nunca deverá

Modificar DailyEntry.

Modificar Meal.

Modificar Workout.

Modificar Medication.

Calcular métricas.

Calcular Dashboard.

Persistir indicadores.

---

## Erros Esperados

Configuração inválida.

↓

Cancelar alteração.

↓

Restaurar último valor válido.

---

Idioma indisponível.

↓

Manter idioma atual.

↓

Exibir mensagem.

---

Tema incompatível.

↓

Utilizar Theme padrão.

↓

Registrar log.

---

Falha ao salvar.

↓

Permitir nova tentativa.

↓

Nunca perder configurações anteriores.

---

Offline.

↓

Continuar funcionamento normalmente.

## Critérios de Aceitação

✓ Existe apenas um objeto Settings.

✓ Todas as preferências são persistidas corretamente.

✓ Alterações refletidas imediatamente na interface.

✓ Compatível com Backup.

✓ Compatível com Importação.

✓ Compatível com Exportação.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

Settings será o único responsável por configurações globais.

Nenhum módulo poderá manter configurações próprias.

---

Toda alteração deverá ser imediatamente persistida.

Não existirão configurações temporárias.

---

Toda mudança deverá publicar eventos.

A interface nunca consultará Storage diretamente.

Sempre reagirá aos eventos publicados.

---

## Histórico de Decisões

Versão 3.0

Configurações passaram a ser centralizadas.

Foi criado Theme Engine.

Todos os módulos passaram a consumir Settings.

---

# BACKUP MODULE

---

## Objetivo

Garantir a preservação completa dos dados do usuário.

O Backup deverá permitir recuperação integral da aplicação.

---

## Responsabilidade

Criar Backup.

Importar Backup.

Validar Backup.

Exportar Backup.

Verificar versão.

Nunca modificar dados durante exportação.

---

## Entradas

Storage.

Profile.

DailyEntry.

Meal.

Workout.

Medication.

Settings.

Timeline.

---

## Saídas

Arquivo HWP Backup.

Eventos.

Mensagens.

---

## Dependências

Permitidas.

Storage.

Export Module.

Import Module.

Validation.

Event Bus.

UI Components.

---

Proibidas.

Dashboard Module.

Charts Module.

Metrics.

---

## API Pública

initialize()

createBackup()

validateBackup()

restoreBackup()

listBackups()

deleteBackup()

refresh()

destroy()

---

## Eventos Consumidos

backup:create

backup:restore

settings:updated

---

## Eventos Publicados

backup:created

backup:validated

backup:restored

backup:failed

---

## Fluxo Principal

```

Usuário

↓

Criar Backup

↓

Storage.export()

↓

Validation

↓

Arquivo

↓

backup:created

↓

Render()

```

---

## Fluxo Restauração

```

Selecionar Arquivo

↓

Validation

↓

Import Module

↓

Storage.restore()

↓

Metrics.invalidate()

↓

Dashboard.refresh()

↓

Timeline.refresh()

↓

backup:restored

```

---

## Estados

Loading

Criando Backup

Restaurando

Sucesso

Erro

Arquivo inválido

---

## Componentes

Criar Backup.

Restaurar Backup.

Histórico.

Validação.

Versão.

Progresso.

Mensagens.

Todos independentes.

---

## Regras

Todo Backup deverá conter:

Profile.

Goals.

DailyEntry.

Meal.

FavoriteMeal.

Workout.

Medication.

Injection.

ProgressPhoto.

Timeline.

Settings.

SchemaVersion.

---

Todo Backup deverá possuir checksum.

---

Toda restauração deverá validar:

schemaVersion.

checksum.

integridade.

---

Nunca substituir dados sem confirmação do usuário.

---

Nunca restaurar parcialmente.

A restauração deverá ser atômica.

---

## Nunca deverá

Calcular Dashboard.

Modificar entidades durante exportação.

Modificar entidades durante validação.

Persistir indicadores calculados.

Exportar entidades calculadas.

---

## Erros Esperados

Arquivo inexistente.

↓

Cancelar restauração.

↓

Exibir mensagem.

---

Schema incompatível.

↓

Abortar.

↓

Exibir versão esperada.

---

Checksum inválido.

↓

Abortar.

↓

Não alterar dados.

---

Arquivo corrompido.

↓

Cancelar.

↓

Registrar log.

---

Falha na restauração.

↓

Rollback completo.

↓

Nenhum dado parcialmente restaurado.

---

## Critérios de Aceitação

✓ Backup completo.

✓ Backup validado.

✓ Restauração íntegra.

✓ Rollback em caso de falha.

✓ Compatível com versões suportadas.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

O Backup representa um snapshot completo da aplicação.

Nunca incremental.

---

Toda restauração será transacional.

Ou restaura tudo.

Ou não restaura nada.

---

Toda validação ocorrerá antes de qualquer alteração no Storage.

---

## Histórico de Decisões

Versão 3.0

Backup passou a utilizar SchemaVersion.

Foi criado checksum.

Restauração tornou-se transacional.

Preparação para sincronização em nuvem.

---

# IMPORT MODULE

---

## Objetivo

Importar dados externos para o HWP Platform.

Garantir compatibilidade entre versões.

Validar integridade antes da persistência.

---

## Responsabilidade

Importar.

HWP Backup.

HWP_FOOD.

Arquivos futuros.

Nunca persistir diretamente.

Sempre utilizar Storage.

---

## Entradas

Arquivo.

Clipboard.

HWP_FOOD.

Backup.

---

## Saídas

Entidades.

Eventos.

Mensagens.

## Dependências

Permitidas.

Storage.

Validation.

Event Bus.

UI Components.

Import Parser.

---

Proibidas.

Dashboard Module.

Metrics Engine.

Charts Module.

---

## API Pública

initialize()

importBackup()

importHwpFood()

validateFile()

previewImport()

confirmImport()

cancelImport()

refresh()

destroy()

---

## Eventos Consumidos

backup:selected

hwpfood:received

clipboard:paste

---

## Eventos Publicados

import:started

import:validated

import:completed

import:failed

---

## Fluxo Principal

```

Selecionar Arquivo

↓

Validation

↓

Preview

↓

Confirmação

↓

Storage

↓

Metrics.invalidate()

↓

Dashboard.refresh()

↓

Timeline.publish()

↓

Render()

```

---

## Fluxo HWP_FOOD

```

Receber Texto

↓

Validation

↓

Parser

↓

Preview

↓

Criar Meal

↓

Storage

↓

Timeline

↓

Dashboard

```

---

## Estados

Loading

Validando

Pré-visualização

Importando

Concluído

Erro

Arquivo Inválido

---

## Componentes

Seletor de arquivo.

Área para colar HWP_FOOD.

Pré-visualização.

Resumo da importação.

Lista de conflitos.

Botão importar.

Botão cancelar.

Barra de progresso.

Todos independentes.

---

## Regras

Toda importação deverá ser validada.

Nunca persistir antes da confirmação.

Sempre apresentar pré-visualização.

Importações parciais não serão permitidas.

Todo erro deverá interromper o processo.

---

## Nunca deverá

Persistir Dashboard.

Persistir entidades calculadas.

Modificar dados existentes sem confirmação.

Ignorar erros de validação.

---

## Erros Esperados

Arquivo inválido.

↓

Cancelar importação.

↓

Exibir motivo.

---

HWP_FOOD inválido.

↓

Exibir erros encontrados.

↓

Permitir nova tentativa.

---

Schema incompatível.

↓

Cancelar.

↓

Exibir versão esperada.

---

Falha na persistência.

↓

Rollback.

↓

Nenhum dado salvo parcialmente.

---

## Critérios de Aceitação

✓ Arquivo validado.

✓ Preview apresentado.

✓ Dados persistidos corretamente.

✓ Rollback funcionando.

✓ Compatível com Backup.

✓ Compatível com HWP_FOOD.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

O Import Module nunca interpretará regras de negócio.

Sua responsabilidade termina após validar e encaminhar os dados para o Storage.

---

Toda importação deverá possuir etapa de confirmação.

Nunca importar automaticamente.

---

## Histórico de Decisões

Versão 3.0

Foi criado Preview obrigatório.

Importações tornaram-se transacionais.

HWP_FOOD tornou-se formato oficial de importação nutricional.

---

# EXPORT MODULE

---

## Objetivo

Exportar dados do HWP Platform em formatos oficiais.

Garantir portabilidade e preservação das informações.

---

## Responsabilidade

Exportar:

Backup completo.

Dados nutricionais.

Relatórios.

CSV.

JSON.

PDF (versões futuras).

Nunca modificar dados durante exportação.

---

## Entradas

Storage.

Metrics.

Profile.

Timeline.

Settings.

---

## Saídas

Arquivos.

Compartilhamento.

Eventos.

---

## Dependências

Permitidas.

Storage.

Metrics.

UI Components.

Validation.

Event Bus.

---

Proibidas.

Dashboard Module.

Nutrition Module.

Workout Module.

---

## API Pública

initialize()

exportBackup()

exportJson()

exportCsv()

exportPdf()

share()

refresh()

destroy()

---

## Eventos Consumidos

export:requested

settings:updated

---

## Eventos Publicados

export:started

export:completed

export:failed

---

## Fluxo Principal

```

Selecionar Exportação

↓

Validation

↓

Gerar Arquivo

↓

Compartilhar

↓

export:completed

```

---

## Fluxo CSV

```

Selecionar Dados

↓

Conversão

↓

Arquivo CSV

↓

Compartilhar

```

---

## Fluxo PDF

```

Selecionar Relatório

↓

Metrics

↓

Template

↓

PDF

↓

Compartilhar

```

---

## Estados

Loading

Gerando

Compartilhando

Concluído

Erro

---

## Componentes

Exportar Backup.

Exportar CSV.

Exportar PDF.

Compartilhar.

Histórico.

Mensagens.

Todos independentes.

---

## Regras

Nunca exportar entidades calculadas.

Sempre reconstruir relatórios antes da exportação.

Sempre validar formato.

Toda exportação deverá publicar eventos.

Nunca alterar Storage.

---

## Nunca deverá

Modificar entidades.

Persistir arquivos temporários.

Alterar Dashboard.

Alterar Timeline.

Calcular indicadores.

## Erros Esperados

O Export Module deverá tratar corretamente os seguintes cenários.

---

### Falha na geração

Caso ocorra erro durante a geração do arquivo.

Cancelar exportação.

Exibir mensagem amigável.

Nenhum arquivo incompleto deverá ser produzido.

---

### Formato inválido

Caso o formato solicitado não seja suportado.

Cancelar exportação.

Registrar log.

---

### Compartilhamento cancelado

Caso o usuário cancele o compartilhamento.

Considerar operação encerrada.

Nunca exibir erro.

---

### Falha de escrita

Caso o arquivo não possa ser criado.

Permitir nova tentativa.

Não alterar dados da aplicação.

---

### Offline

Todas as exportações locais deverão funcionar normalmente.

---

## Critérios de Aceitação

✓ Backup exportado corretamente.

✓ CSV válido.

✓ JSON válido.

✓ Compartilhamento funcionando.

✓ Compatível com Backup.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

Toda exportação será gerada sob demanda.

Nunca manter arquivos temporários permanentemente.

---

Relatórios sempre utilizarão dados reconstruídos pelo Metrics Engine.

Nunca dados persistidos.

---

Exportação nunca poderá alterar qualquer entidade.

---

## Histórico de Decisões

Versão 3.0

Exportação passou a utilizar geração dinâmica.

Relatórios passaram a utilizar ViewModels.

Arquivos temporários deixaram de ser persistidos.

---

# PWA MODULE

---

## Objetivo

Garantir funcionamento do HWP Platform como Progressive Web App.

Permitir utilização offline.

Garantir experiência semelhante à de um aplicativo nativo.

---

## Responsabilidade

Registrar Service Worker.

Gerenciar Cache.

Atualizar versão.

Detectar modo offline.

Controlar instalação.

Nunca gerenciar dados do usuário.

---

## Entradas

Service Worker.

Manifest.

Cache.

Eventos do navegador.

---

## Saídas

Cache.

Eventos.

Atualização da interface.

---

## Dependências

Permitidas.

Storage.

Service Worker.

Settings.

UI Components.

Event Bus.

---

Proibidas.

Metrics.

Nutrition Module.

Workout Module.

Medication Module.

---

## API Pública

initialize()

registerServiceWorker()

updateCache()

clearCache()

checkUpdates()

install()

refresh()

destroy()

---

## Eventos Consumidos

app:started

app:online

app:offline

update:available

---

## Eventos Publicados

pwa:installed

pwa:updated

pwa:offline

pwa:online

cache:updated

---

## Fluxo Principal

```

Aplicativo inicia

↓

Registrar Service Worker

↓

Verificar Cache

↓

Atualizar Recursos

↓

Render()

```

---

## Fluxo Atualização

```

Nova versão

↓

Download

↓

Novo Cache

↓

Troca Atômica

↓

Atualizar Interface

```

---

## Fluxo Offline

```

Perda de conexão

↓

Offline Mode

↓

Utilizar Cache

↓

Continuar funcionamento

```

---

## Estados

Inicializando

Online

Offline

Atualizando

Erro

---

## Componentes

Indicador Offline.

Atualização disponível.

Instalação.

Gerenciamento de Cache.

Mensagens.

Todos independentes.

---

## Regras

Sempre manter funcionamento offline.

Nunca remover cache durante uso.

Atualizações deverão ser atômicas.

Toda troca de versão deverá preservar dados do usuário.

---

## Nunca deverá

Apagar Storage.

Modificar entidades.

Persistir indicadores.

Bloquear utilização offline.

---

## Erros Esperados

Falha ao registrar Service Worker.

↓

Continuar aplicação normalmente.

↓

Registrar log.

---

Falha ao atualizar cache.

↓

Manter cache anterior.

↓

Permitir nova tentativa.

---

Cache corrompido.

↓

Reconstruir cache.

↓

Nunca apagar Storage.

---

Sem conexão.

↓

Continuar utilizando recursos locais.

↓

Atualizar interface para modo offline.

---

## Critérios de Aceitação

✓ Funciona offline.

✓ Cache consistente.

✓ Atualização segura.

✓ Instalação disponível.

✓ Compatível com iPhone.

✓ Compatível com Android.

✓ Compatível com Desktop.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

O PWA nunca armazenará dados de negócio.

Seu único objetivo é disponibilizar infraestrutura para funcionamento offline.

---

Toda atualização deverá preservar a sessão do usuário.

Nunca exigir reinstalação do aplicativo.

---

## Histórico de Decisões

Versão 3.0

Novo gerenciamento de cache.

Atualização atômica.

Preparação para sincronização em nuvem.

---

# CHATGPT INTEGRATION MODULE

---

## Objetivo

Realizar a integração entre o ChatGPT e o HWP Platform.

Permitir importação inteligente de refeições.

Preparar futuras integrações com IA.

---

## Responsabilidade

Receber HWP_FOOD.

Validar estrutura.

Converter em Meal.

Publicar eventos.

Nunca interpretar regras nutricionais.

Nunca calcular indicadores.

---

## Entradas

HWP_FOOD.

Clipboard.

Compartilhamento.

Importação.

---

## Saídas

Meal.

FavoriteMeal.

Eventos.

Timeline.

Dashboard.

---

## Dependências

Permitidas.

Import Module.

Nutrition Module.

Validation.

Event Bus.

UI Components.

---

Proibidas.

Metrics.

Storage direto.

Dashboard Module.

## API Pública

initialize()

receiveHwpFood()

validateHwpFood()

previewMeal()

createMeal()

updateMeal()

cancelImport()

refresh()

destroy()

---

## Eventos Consumidos

clipboard:paste

hwpfood:received

import:requested

favorite:selected

---

## Eventos Publicados

chatgpt:connected

chatgpt:validated

chatgpt:mealCreated

chatgpt:failed

nutrition:updated

timeline:publish

---

## Fluxo Principal

```

Usuário

↓

Colar HWP_FOOD

↓

Validation

↓

Parser

↓

Preview

↓

Confirmar

↓

Nutrition Module

↓

Storage

↓

Metrics.invalidate()

↓

Dashboard.refresh()

↓

Timeline.publish()

↓

Render()

```

---

## Fluxo Nutri IA

```

Foto

↓

ChatGPT

↓

HWP_FOOD

↓

ChatGPT Integration

↓

Meal

↓

Dashboard

```

---

## Fluxo Biblioteca

```

Meal criada

↓

Library.receive()

↓

Aprendizado

↓

Sugestões futuras

```

---

## Estados

Aguardando

Recebendo

Validando

Pré-visualização

Importando

Concluído

Erro

Offline

---

## Componentes

Área de importação.

Campo para HWP_FOOD.

Preview.

Resumo nutricional.

Botão Confirmar.

Botão Cancelar.

Mensagens.

Histórico recente.

Todos independentes.

---

## Regras

Todo HWP_FOOD deverá seguir o padrão oficial.

Sempre validar antes de importar.

Sempre apresentar Preview.

Nunca criar Meal automaticamente.

Sempre solicitar confirmação do usuário.

Toda importação deverá atualizar:

Timeline.

Dashboard.

Biblioteca.

Gráficos.

---

## Nunca deverá

Persistir diretamente.

Calcular Score.

Calcular Dashboard.

Calcular métricas.

Interpretar regras nutricionais.

Modificar refeições existentes.

---

## Erros Esperados

HWP_FOOD inválido.

↓

Cancelar.

↓

Exibir erros encontrados.

---

Campos obrigatórios ausentes.

↓

Cancelar.

↓

Solicitar correção.

---

Parser falhou.

↓

Registrar log.

↓

Permitir nova tentativa.

---

Offline.

↓

Permitir importação manual.

↓

Desabilitar apenas geração por IA.

---

## Critérios de Aceitação

✓ HWP_FOOD validado.

✓ Preview correto.

✓ Meal criada corretamente.

✓ Biblioteca atualizada.

✓ Timeline atualizada.

✓ Dashboard atualizado.

✓ Funciona offline para importações locais.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

O ChatGPT Integration Module nunca dependerá de um modelo específico de IA.

Sua única responsabilidade será interpretar o formato HWP_FOOD.

No futuro, diferentes provedores de IA poderão gerar exatamente o mesmo formato.

---

O módulo nunca acessará Storage diretamente.

Sempre utilizará o Nutrition Module como intermediário.

---

O Preview será obrigatório.

Nunca importar automaticamente qualquer conteúdo recebido.

---

## Histórico de Decisões

Versão 3.0

HWP_FOOD tornou-se protocolo oficial de comunicação.

Foi criado Preview obrigatório.

Integração desacoplada do provedor de IA.

---

# EVENT BUS MODULE

---

## Objetivo

Centralizar toda a comunicação entre os módulos do HWP Platform.

Eliminar dependências diretas.

Garantir desacoplamento.

---

## Responsabilidade

Registrar eventos.

Distribuir eventos.

Remover assinaturas.

Gerenciar listeners.

Nunca executar regras de negócio.

Nunca armazenar dados.

---

## Entradas

Eventos publicados pelos módulos.

---

## Saídas

Eventos distribuídos aos módulos inscritos.

---

## Dependências

Permitidas.

Nenhuma.

O Event Bus deverá ser independente de todos os módulos.

---

Proibidas.

Storage.

Metrics.

Dashboard.

UI.

---

## API Pública

initialize()

publish()

subscribe()

unsubscribe()

clear()

destroy()

---

## Eventos Consumidos

Todos.

---

## Eventos Publicados

Todos.

O Event Bus apenas distribui eventos.

Nunca cria eventos próprios.

---

## Fluxo Principal

```

Module A

↓

publish()

↓

Event Bus

↓

Listeners

↓

Module B

↓

Module C

↓

Module D

```

---

## Estados

Inicializado

Escutando

Distribuindo

Erro

Destruído

---

## Componentes

Dispatcher.

Registry.

Listener Manager.

Queue.

Logger.

Todos independentes.

---

## Regras

Todo evento deverá possuir:

nome.

origem.

timestamp.

payload.

---

Toda assinatura deverá ser removida ao destruir o módulo.

Nunca manter listeners órfãos.

---

O Event Bus nunca poderá conhecer detalhes internos dos módulos.

---

## Nunca deverá

Persistir eventos.

Modificar payload.

Executar regras de negócio.

Interpretar eventos.

Calcular métricas.

## Erros Esperados

O Event Bus deverá tratar corretamente os seguintes cenários.

---

### Evento desconhecido

Caso um evento não possua listeners.

Ignorar.

Registrar log em modo desenvolvimento.

Nunca gerar erro.

---

### Listener inexistente

Caso um listener tenha sido removido.

Ignorar silenciosamente.

Nunca interromper a distribuição.

---

### Exceção em um Listener

Caso um listener gere exceção.

Capturar erro.

Registrar log.

Continuar distribuindo aos demais listeners.

Um módulo nunca poderá impedir o funcionamento dos outros.

---

### Loop de Eventos

Caso um evento gere recursão infinita.

Cancelar publicação.

Registrar log.

Exibir aviso apenas em ambiente de desenvolvimento.

---

### Payload inválido

Caso o payload seja incompatível.

Cancelar apenas aquele evento.

Nunca interromper o Event Bus.

---

## Critérios de Aceitação

✓ Todos os módulos comunicam-se através do Event Bus.

✓ Nenhum módulo depende diretamente de outro.

✓ Nenhum listener órfão.

✓ Sem vazamento de memória.

✓ Distribuição rápida.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Decisões Arquiteturais

O Event Bus representa a infraestrutura da aplicação.

Nunca será utilizado para armazenar estado.

---

Eventos são efêmeros.

Após distribuídos.

Deixam de existir.

---

Toda publicação deverá ser síncrona por padrão.

Eventos demorados poderão utilizar fila assíncrona quando necessário.

---

Nenhum módulo poderá depender da ordem de execução dos listeners.

Cada listener deverá ser completamente independente.

---

## Histórico de Decisões

Versão 3.0

Toda comunicação passou a utilizar Event Bus.

Chamadas diretas entre módulos foram eliminadas.

Arquitetura preparada para sincronização distribuída.

---

# PADRÕES DE IMPLEMENTAÇÃO DOS MÓDULOS

---

## Estrutura Oficial

Todo módulo deverá possuir exatamente a seguinte organização.

```

module-name/

│

├── controller.js

├── service.js

├── view.js

├── components/

├── events.js

├── validation.js

├── constants.js

├── types.js

├── styles.css

└── index.js

```

Nunca concentrar toda implementação em um único arquivo.

---

## Controller

Responsável por coordenar o módulo.

Nunca implementar regras de negócio.

Nunca renderizar interface.

---

## Service

Responsável por executar regras do módulo.

Nunca manipular HTML.

Nunca manipular CSS.

---

## View

Responsável exclusivamente pela renderização.

Nunca acessar Storage.

Nunca calcular indicadores.

---

## Components

Todo componente deverá possuir responsabilidade única.

Exemplos.

ProgressCard

NutritionCard

GoalCard

MealCard

WorkoutCard

PhotoCard

TimelineCard

---

## Validation

Cada módulo deverá possuir sua própria validação.

Nunca reutilizar validações específicas entre módulos.

Somente validações genéricas poderão existir em Utils.

---

## Types

Todo módulo deverá documentar seus tipos.

Enums.

Interfaces.

ViewModels.

DTOs.

---

## Constants

Todo texto fixo deverá ser centralizado.

Nunca espalhar constantes pelo código.

---

# Convenções Obrigatórias

Todos os módulos deverão seguir.

---

## Nome dos Arquivos

Utilizar:

kebab-case

Exemplos.

meal-card.js

timeline-filter.js

dashboard-controller.js

---

## Nome das Classes

Utilizar:

PascalCase

Exemplos.

DashboardController

NutritionService

TimelineView

---

## Nome das Funções

Utilizar:

camelCase

Exemplos.

createMeal()

refreshDashboard()

publishEvent()

validateBackup()

---

## Nome das Constantes

Utilizar:

UPPER_SNAKE_CASE

Exemplos.

DEFAULT_THEME

MAX_FILE_SIZE

APP_VERSION

CACHE_VERSION

---

# Padrões de Código

Funções.

Máximo recomendado.

30 linhas.

Caso ultrapasse.

Avaliar refatoração.

---

Arquivos.

Máximo recomendado.

400 linhas.

Caso ultrapasse.

Dividir módulo.

---

Comentários.

Explicar decisões.

Nunca explicar código óbvio.

---

Logs.

Permitidos apenas durante desenvolvimento.

Nunca deixar logs temporários na Release.

---

TODO.

Sempre utilizar.

```javascript
// TODO(v3.1): descrição da melhoria.
```

Nunca utilizar apenas:

TODO

Sem contexto.

---

# Testabilidade

Todo módulo deverá ser facilmente testável.

Nenhum módulo poderá depender de estado global oculto.

Toda dependência deverá ser explícita.

---

# Performance

Evitar:

renderizações completas;

consultas repetidas;

objetos desnecessários;

listeners duplicados.

Sempre reutilizar resultados quando possível.

---

# Segurança

Nunca confiar em entradas do usuário.

Toda entrada deverá passar por Validation.

Nunca interpretar HTML vindo do usuário.

Sempre escapar conteúdo textual.

Nunca executar código dinâmico recebido externamente.

---

# Escalabilidade

Todo módulo deverá aceitar expansão futura.

Novas funcionalidades deverão ser adicionadas através de novos componentes.

Nunca através de grandes alterações estruturais.

# GOVERNANÇA DOS MÓDULOS

Este capítulo define como novos módulos poderão ser incorporados ao HWP Platform.

Nenhum módulo poderá ser criado sem seguir estas regras.

---

## Critérios para criação de um novo módulo

Um novo módulo somente deverá ser criado quando:

- representar uma responsabilidade claramente distinta;

- possuir ciclo de vida próprio;

- puder evoluir independentemente;

- possuir interface pública definida;

- não gerar dependências circulares.

Caso contrário.

A funcionalidade deverá ser incorporada ao módulo existente.

---

## Checklist para criação de novos módulos

Antes de criar um módulo verificar.

☐ Existe responsabilidade única.

☐ Não existe módulo equivalente.

☐ Possui API pública.

☐ Possui eventos próprios.

☐ Possui documentação.

☐ Possui testes planejados.

☐ Não viola a arquitetura.

---

# MATRIZ DE RESPONSABILIDADES

| Módulo | Persistência | Regras de Negócio | Interface | Eventos |
|--------|--------------|-------------------|-----------|----------|
| Dashboard | ❌ | ❌ | ✔ | ✔ |
| Diary | ✔ | ❌ | ✔ | ✔ |
| Nutrition | ✔ | ❌ | ✔ | ✔ |
| Library | ✔ | ❌ | ✔ | ✔ |
| Timeline | ✔ | ❌ | ✔ | ✔ |
| Body Progress | ❌ | ❌ | ✔ | ✔ |
| Workout | ✔ | ❌ | ✔ | ✔ |
| Medication | ✔ | ❌ | ✔ | ✔ |
| Settings | ✔ | ❌ | ✔ | ✔ |
| Backup | ✔ | ❌ | ✔ | ✔ |
| Import | ❌ | ❌ | ✔ | ✔ |
| Export | ❌ | ❌ | ✔ | ✔ |
| PWA | ❌ | ❌ | ✔ | ✔ |
| ChatGPT Integration | ❌ | ❌ | ✔ | ✔ |
| Event Bus | ❌ | ❌ | ❌ | ✔ |

---

# DEPENDÊNCIAS ENTRE MÓDULOS

Fluxo oficial.

```
Usuário
      │
      ▼
Interface
      │
      ▼
Module
      │
      ▼
Event Bus
      │
      ▼
Metrics Engine
      │
      ▼
Storage
      │
      ▼
LocalStorage
```

Nenhum módulo poderá quebrar esse fluxo.

---

# MÓDULOS PROIBIDOS

Para preservar o foco e a simplicidade do produto, os seguintes módulos **não deverão existir** na versão 3.x:

- Controle completo de musculação (séries, repetições, cargas);
- Agenda de consultas;
- Chat interno;
- Rede social;
- Marketplace;
- Controle financeiro;
- Receitas culinárias completas;
- Diário livre (fora do contexto de saúde);
- Editor de documentos.

Essas funcionalidades poderão ser estudadas futuramente, mas não fazem parte do escopo principal do HWP Platform.

---

# PRINCÍPIOS DE EVOLUÇÃO

Toda evolução deverá preservar:

- compatibilidade com os módulos existentes;

- baixo acoplamento;

- alta coesão;

- comunicação por eventos;

- reutilização de componentes;

- reutilização de ViewModels;

- reutilização de Services.

Nunca duplicar funcionalidades.

---

# MATRIZ DE EVENTOS

| Evento | Origem | Consumidores |
|---------|--------|--------------|
| entry:updated | Diary | Dashboard, Timeline, Body Progress |
| meal:created | Nutrition | Dashboard, Library, Timeline |
| meal:updated | Nutrition | Dashboard, Timeline |
| workout:completed | Workout | Dashboard, Timeline, Body Progress |
| injection:created | Medication | Timeline, Dashboard |
| photo:created | Body Progress | Timeline |
| settings:updated | Settings | Todos os módulos de interface |
| backup:restored | Backup | Todos os módulos |
| import:completed | Import | Dashboard, Timeline, Library |
| export:completed | Export | Interface |

---

# CHECKLIST GERAL PARA O CODEX

Antes de implementar qualquer módulo confirmar:

☐ O módulo possui responsabilidade única.

☐ A API pública está documentada.

☐ Não acessa LocalStorage diretamente.

☐ Não calcula indicadores fora do Metrics Engine.

☐ Não publica eventos desnecessários.

☐ Consome apenas eventos necessários.

☐ Todos os componentes são reutilizáveis.

☐ Possui tratamento de erros.

☐ Funciona offline.

☐ Funciona em modo claro.

☐ Funciona em modo escuro.

☐ Funciona em dispositivos móveis.

☐ Funciona em Desktop.

☐ Não possui dependências circulares.

☐ Segue o Design System.

☐ Segue o Data Model.

☐ Segue a Architecture.

☐ Possui documentação.

---

# CHECKLIST PARA CODE REVIEW

Antes de aprovar qualquer Sprint verificar:

✓ Nenhum módulo ultrapassa sua responsabilidade.

✓ Nenhum módulo acessa Storage indevidamente.

✓ Nenhuma regra de negócio foi implementada fora do Metrics Engine.

✓ Nenhum componente duplicado.

✓ Nenhum evento redundante.

✓ Nenhuma dependência circular.

✓ Nenhuma violação do Design System.

✓ Nenhuma violação do Data Model.

✓ Nenhuma violação da Architecture.

✓ Código legível.

✓ Código documentado.

✓ Código testável.

---

# HISTÓRICO DO DOCUMENTO

## Versão 3.0

Principais decisões arquiteturais:

- Arquitetura completamente modular.

- Comunicação baseada em Event Bus.

- Dashboard desacoplado do Storage.

- Metrics Engine centralizado.

- Biblioteca Inteligente independente.

- Integração com IA transformada em módulo oficial.

- Backup transacional.

- Importação e exportação desacopladas.

- PWA tratado como módulo de infraestrutura.

- Preparação para sincronização em nuvem.

- Preparação para múltiplos perfis.

- Preparação para múltiplos provedores de IA.

---

# VISÃO PARA O FUTURO

A arquitetura dos módulos deverá permitir a adição de novas funcionalidades sem necessidade de reconstrução do sistema.

Entre as evoluções previstas estão:

- Cloud Sync;

- Sincronização entre dispositivos;

- Compartilhamento de dados com profissionais de saúde;

- Integração com Apple Health;

- Integração com Google Health Connect;

- Integração com balanças inteligentes;

- Integração com smartwatches;

- IA Conversacional integrada;

- Recomendações nutricionais inteligentes;

- Painel Web para nutricionistas;

- API pública do HWP Platform.

Todas essas evoluções deverão ocorrer através de novos módulos ou extensões dos módulos existentes, preservando a arquitetura definida neste documento.

---

# OBJETIVO FINAL

Os módulos do HWP Platform representam a divisão oficial das responsabilidades do sistema.

Cada módulo deverá ser pequeno, previsível, reutilizável e independente.

Nenhum módulo deverá assumir responsabilidades pertencentes a outro.

Toda comunicação deverá ocorrer através do Event Bus.

Toda regra de negócio deverá permanecer centralizada no Metrics Engine.

Toda persistência deverá ocorrer exclusivamente através do Storage.

Este documento é a referência oficial para implementação de qualquer funcionalidade da HWP Platform 3.0.

# FIM DO DOCUMENTO




