# HWP Platform 3.0

# 07 - USER FLOWS

Versão: 1.0

Status: Oficial

Documento responsável por definir todos os fluxos operacionais do HWP Platform.

---

# Objetivo

Este documento descreve oficialmente como o usuário interage com o sistema.

Todo comportamento funcional deverá seguir rigorosamente os fluxos aqui definidos.

Nenhuma funcionalidade poderá ser implementada utilizando comportamento diferente sem atualização deste documento.

---

# Filosofia dos Fluxos

O HWP Platform foi projetado para minimizar a quantidade de ações necessárias do usuário.

Todo fluxo deverá seguir os princípios abaixo.

• Poucos cliques.

• Baixa carga cognitiva.

• Feedback imediato.

• Nunca perder informações.

• Sempre permitir desfazer quando possível.

• Funcionamento offline.

• Interface previsível.

---

# Convenções

Cada fluxo possui um identificador único.

Formato.

FLW-001

FLW-002

FLW-003

...

Nunca reutilizar identificadores.

---

Todo fluxo deverá conter.

Objetivo.

Participantes.

Gatilho.

Pré-condições.

Fluxo Principal.

Fluxos Alternativos.

Eventos Publicados.

Validações.

Entidades Alteradas.

Entidades Calculadas Atualizadas.

Estados da Interface.

Rollback.

Erros Esperados.

Critérios de Sucesso.

Critérios de Aceitação.

Diagrama.

---

# FLW-001

## Primeira Execução do Aplicativo

---

## Objetivo

Inicializar corretamente o HWP Platform.

Criar todas as estruturas necessárias.

Preparar o usuário para utilização da plataforma.

---

## Participantes

App Shell.

Settings Module.

Storage.

Metrics Engine.

Dashboard Module.

Event Bus.

---

## Gatilho

Primeira abertura do aplicativo.

---

## Pré-condições

Nenhum dado existente.

Storage vazio.

---

## Fluxo Principal

Usuário abre o aplicativo.

↓

App Shell inicializa.

↓

Storage verifica existência de dados.

↓

Nenhum Profile encontrado.

↓

Criar estrutura inicial.

↓

Criar Settings padrão.

↓

Criar Goals padrão.

↓

Inicializar Event Bus.

↓

Inicializar Metrics Engine.

↓

Inicializar Dashboard.

↓

Exibir Assistente Inicial.

---

## Fluxos Alternativos

Caso exista Backup pendente.

↓

Perguntar ao usuário.

↓

Restaurar agora.

ou

Continuar.

---

Caso exista Storage válido.

↓

Ignorar Assistente Inicial.

↓

Abrir Dashboard.

---

## Eventos Publicados

app:started

storage:initialized

profile:created

settings:created

dashboard:loaded

---

## Validações

Storage inicializado.

SchemaVersion válida.

Settings existentes.

Goals existentes.

---

## Entidades Alteradas

Profile.

Goals.

Settings.

---

## Entidades Calculadas Atualizadas

Dashboard.

BodyMetrics.

DailyScore.

---

## Estados da Interface

Splash.

Inicializando.

Assistente Inicial.

Dashboard.

Erro.

---

## Rollback

Caso qualquer etapa falhe.

↓

Cancelar inicialização.

↓

Registrar log.

↓

Exibir mensagem.

↓

Permitir reiniciar.

---

## Erros Esperados

Storage indisponível.

↓

Criar novo Storage.

---

Schema incompatível.

↓

Executar migração.

ou

Solicitar restauração.

---

Falha inesperada.

↓

Registrar log.

↓

Nunca travar aplicação.

---

## Critérios de Sucesso

Storage criado.

Settings criadas.

Goals criadas.

Dashboard inicializado.

Assistente exibido.

---

## Critérios de Aceitação

✓ Fluxo executado integralmente.

✓ Nenhum erro no Console.

✓ Compatível com modo offline.

✓ Compatível com PWA.

---

## Diagrama

```

Usuário

↓

Abrir App

↓

App Shell

↓

Storage

↓

Settings

↓

Metrics

↓

Dashboard

↓

Assistente Inicial

```

---

# FLW-002

## Inicialização Normal

---

## Objetivo

Abrir rapidamente o aplicativo utilizando os dados existentes.

---

## Participantes

App Shell.

Storage.

Metrics Engine.

Dashboard.

Timeline.

Settings.

---

## Gatilho

Abertura do aplicativo.

---

## Pré-condições

Profile existente.

Storage válido.

---

## Fluxo Principal

Usuário abre o aplicativo.

↓

App Shell.

↓

Carregar Storage.

↓

Inicializar Event Bus.

↓

Inicializar Metrics Engine.

↓

Reconstruir ViewModels.

↓

Inicializar módulos.

↓

Renderizar Dashboard.

---

## Fluxos Alternativos

Nova versão disponível.

↓

Atualizar Cache.

↓

Continuar inicialização.

---

Modo Offline.

↓

Utilizar Storage local.

↓

Continuar normalmente.

---

## Eventos Publicados

app:started

storage:loaded

dashboard:refresh

app:ready

---

## Validações

SchemaVersion.

Integridade do Storage.

Cache válido.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Dashboard.

BodyMetrics.

DailyNutrition.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Splash.

Carregando.

Dashboard.

Erro.

Offline.

---

## Rollback

Falha durante inicialização.

↓

Cancelar renderização.

↓

Registrar log.

↓

Exibir erro.

---

## Critérios de Sucesso

Dashboard carregado.

Timeline carregada.

Interface pronta.

---

## Critérios de Aceitação

✓ Inicialização inferior ao tempo definido pelos requisitos de desempenho.

✓ Nenhuma perda de dados.

✓ Funciona offline.

✓ Sem erros no Console.

---

## Diagrama

```

Abrir App

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Interface

```

# FLW-003

## Criar DailyEntry

---

## Objetivo

Criar o registro diário do usuário.

Garantir que exista apenas um DailyEntry para cada data.

Este fluxo representa a criação da entidade central do HWP Platform.

---

## Participantes

Diary Module.

Storage.

Validation.

Metrics Engine.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Primeiro registro realizado em uma data sem DailyEntry.

---

## Pré-condições

Profile existente.

Storage inicializado.

Não existir DailyEntry para a data informada.

---

## Fluxo Principal

Usuário acessa o Diário.

↓

Seleciona uma data.

↓

Diary Module consulta Storage.

↓

Nenhum DailyEntry encontrado.

↓

Criar novo DailyEntry.

↓

Persistir no Storage.

↓

Publicar entry:created.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Renderizar Diário.

---

## Fluxos Alternativos

DailyEntry já existente.

↓

Carregar registro.

↓

Entrar em modo edição.

---

Data futura.

↓

Permitir criação.

↓

Identificar como registro futuro.

---

## Eventos Publicados

entry:created

dashboard:refresh

timeline:created

---

## Validações

Data obrigatória.

Apenas um DailyEntry por data.

Profile obrigatório.

Storage válido.

---

## Entidades Alteradas

DailyEntry.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Dashboard.

DailyScore.

BodyMetrics.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Loading.

Novo Registro.

Registro Criado.

Erro.

Offline.

---

## Rollback

Falha ao persistir.

↓

Cancelar criação.

↓

Não publicar eventos.

↓

Não atualizar Dashboard.

↓

Exibir mensagem.

---

## Erros Esperados

Data inválida.

↓

Cancelar operação.

↓

Solicitar correção.

---

Storage indisponível.

↓

Registrar log.

↓

Permitir nova tentativa.

---

DailyEntry duplicado.

↓

Cancelar criação.

↓

Abrir registro existente.

---

## Critérios de Sucesso

DailyEntry criado.

Timeline atualizada.

Dashboard atualizado.

Nenhum registro duplicado.

---

## Critérios de Aceitação

✓ Um único DailyEntry por data.

✓ Eventos publicados corretamente.

✓ Compatível com Backup.

✓ Compatível com modo Offline.

---

## Diagrama

```

Usuário

↓

Diary Module

↓

Validation

↓

Storage

↓

Event Bus

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-004

## Registrar Peso

---

## Objetivo

Registrar ou atualizar o peso corporal do usuário em um DailyEntry.

---

## Participantes

Diary Module.

Validation.

Storage.

Metrics Engine.

Dashboard Module.

Charts Module.

Timeline Module.

Event Bus.

---

## Gatilho

Usuário altera o campo Peso.

---

## Pré-condições

DailyEntry existente.

---

## Fluxo Principal

Usuário informa peso.

↓

Validation.

↓

Storage.updateDailyEntry().

↓

Publicar weight:updated.

↓

Metrics.invalidate().

↓

BodyMetrics.rebuild().

↓

Dashboard.refresh().

↓

Charts.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Campo vazio.

↓

Persistir valor null.

↓

Atualizar Dashboard.

---

Mesmo valor anterior.

↓

Persistir somente se houver alteração de outros campos.

↓

Não publicar eventos desnecessários.

---

## Eventos Publicados

weight:updated

dashboard:refresh

charts:refresh

timeline:created

---

## Validações

Peso maior que zero.

Valor numérico.

Valor dentro do intervalo permitido.

---

## Entidades Alteradas

DailyEntry.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Dashboard.

BodyMetrics.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Editando.

Salvando.

Sucesso.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Restaurar último valor persistido.

↓

Não atualizar gráficos.

↓

Não publicar eventos.

---

## Erros Esperados

Peso inválido.

↓

Solicitar correção.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Peso salvo.

Dashboard atualizado.

Gráficos atualizados.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Peso persistido corretamente.

✓ Atualização automática do Dashboard.

✓ Atualização automática dos gráficos.

✓ Sem duplicidade de eventos.

---

## Diagrama

```

Peso

↓

Validation

↓

Storage

↓

Event Bus

↓

Metrics

↓

Dashboard

↓

Charts

↓

Timeline

```

---

# FLW-005

## Registrar Circunferência Abdominal

---

## Objetivo

Registrar ou atualizar a circunferência abdominal do usuário.

---

## Participantes

Diary Module.

Validation.

Storage.

Metrics Engine.

Dashboard Module.

Charts Module.

Timeline Module.

---

## Gatilho

Usuário altera o campo Circunferência.

---

## Pré-condições

DailyEntry existente.

---

## Fluxo Principal

Usuário informa circunferência.

↓

Validation.

↓

Storage.updateDailyEntry().

↓

Publicar waist:updated.

↓

Metrics.invalidate().

↓

BodyMetrics.rebuild().

↓

Dashboard.refresh().

↓

Charts.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Campo vazio.

↓

Persistir null.

↓

Atualizar indicadores.

---

Valor igual ao anterior.

↓

Ignorar atualização redundante.

---

## Eventos Publicados

waist:updated

dashboard:refresh

charts:refresh

timeline:created

---

## Validações

Valor obrigatório quando informado.

Maior que zero.

Numérico.

Dentro do intervalo permitido.

---

## Entidades Alteradas

DailyEntry.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

BodyMetrics.

Dashboard.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Editando.

Salvando.

Sucesso.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Restaurar valor anterior.

↓

Não atualizar Dashboard.

↓

Não atualizar gráficos.

---

## Erros Esperados

Valor inválido.

↓

Solicitar correção.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Circunferência salva.

Dashboard atualizado.

Gráficos atualizados.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Persistência correta.

✓ Atualização automática.

✓ Compatível com Backup.

✓ Funciona offline.

---

## Diagrama

```

Circunferência

↓

Validation

↓

Storage

↓

Event Bus

↓

Metrics

↓

Dashboard

↓

Charts

↓

Timeline

↓

Render

```

# FLW-006

## Atualizar Indicador Diário

---

## Objetivo

Atualizar qualquer indicador pertencente ao DailyEntry.

Este fluxo é utilizado para:

- Água
- Sono
- Passos
- Hábitos
- Observações

Todos seguem exatamente o mesmo comportamento operacional.

---

## Participantes

Diary Module.

Validation.

Storage.

Metrics Engine.

Dashboard Module.

Timeline Module.

Event Bus.

---

## Gatilho

Usuário altera qualquer indicador diário.

---

## Pré-condições

DailyEntry existente.

---

## Fluxo Principal

Usuário altera indicador.

↓

Validation.

↓

Storage.updateDailyEntry().

↓

Publicar evento correspondente.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Campo vazio.

↓

Persistir null quando permitido.

↓

Atualizar Dashboard.

---

Mesmo valor anterior.

↓

Ignorar atualização.

↓

Não publicar eventos redundantes.

---

## Eventos Publicados

water:updated

sleep:updated

steps:updated

habit:updated

notes:updated

---

## Validações

Valor válido.

Formato correto.

Dentro do intervalo permitido.

---

## Entidades Alteradas

DailyEntry.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Dashboard.

DailyScore.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Editando.

Salvando.

Sucesso.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Restaurar valor anterior.

↓

Não publicar eventos.

↓

Não atualizar Dashboard.

---

## Erros Esperados

Valor inválido.

↓

Solicitar correção.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Indicador salvo.

Dashboard atualizado.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Persistência correta.

✓ Atualização automática.

✓ Eventos publicados corretamente.

✓ Funciona offline.

---

## Diagrama

```

Indicador Diário

↓

Validation

↓

Storage

↓

Event Bus

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-007

## Registrar Refeição Manualmente

---

## Objetivo

Permitir que o usuário registre uma refeição manualmente.

---

## Participantes

Nutrition Module.

Validation.

Storage.

Library Module.

Metrics Engine.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário toca em

Adicionar Refeição.

---

## Pré-condições

DailyEntry existente.

---

## Fluxo Principal

Usuário abre formulário.

↓

Preenche informações.

↓

Validation.

↓

Storage.createMeal().

↓

Publicar meal:created.

↓

Library.update().

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Salvar como FavoriteMeal.

↓

Library.createFavorite().

↓

favorite:created.

---

Cancelar.

↓

Descartar alterações.

↓

Retornar.

---

## Eventos Publicados

meal:created

nutrition:updated

favorite:created (opcional)

---

## Validações

Título obrigatório.

Slot obrigatório.

Valores nutricionais válidos.

---

## Entidades Alteradas

Meal.

FavoriteMeal (opcional).

TimelineEvent.

---

## Entidades Calculadas Atualizadas

DailyNutrition.

DailyScore.

Dashboard.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Novo.

Editando.

Salvando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Cancelar criação.

↓

Não atualizar Dashboard.

↓

Não atualizar Biblioteca.

↓

Não publicar Timeline.

---

## Erros Esperados

Campos obrigatórios ausentes.

↓

Solicitar preenchimento.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Meal criada.

Dashboard atualizado.

Biblioteca atualizada quando solicitado.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Meal persistida.

✓ Dashboard atualizado.

✓ Timeline atualizada.

✓ Compatível com Backup.

---

## Diagrama

```

Usuário

↓

Nutrition

↓

Validation

↓

Storage

↓

Library

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-008

## Registrar Refeição via HWP_FOOD

---

## Objetivo

Registrar uma refeição utilizando o protocolo oficial HWP_FOOD.

---

## Participantes

ChatGPT Integration Module.

Import Module.

Nutrition Module.

Validation.

Storage.

Library Module.

Metrics Engine.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário cola um bloco HWP_FOOD.

---

## Pré-condições

DailyEntry existente.

HWP_FOOD válido.

---

## Fluxo Principal

Usuário cola HWP_FOOD.

↓

Validation.

↓

Parser.

↓

Preview.

↓

Confirmação.

↓

Storage.createMeal().

↓

meal:created.

↓

Library.update().

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Cancelar importação.

↓

Descartar Preview.

↓

Retornar.

---

Salvar também na Biblioteca.

↓

Library.createFavorite().

↓

favorite:created.

---

## Eventos Publicados

chatgpt:validated

meal:created

nutrition:updated

favorite:created (opcional)

---

## Validações

HWP_FOOD válido.

Schema correto.

Campos obrigatórios presentes.

---

## Entidades Alteradas

Meal.

FavoriteMeal (opcional).

TimelineEvent.

---

## Entidades Calculadas Atualizadas

DailyNutrition.

DailyScore.

Dashboard.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Recebendo.

Validando.

Preview.

Importando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha durante importação.

↓

Cancelar operação.

↓

Nenhuma Meal criada.

↓

Nenhum evento publicado.

---

## Erros Esperados

HWP_FOOD inválido.

↓

Exibir erros.

↓

Permitir nova tentativa.

---

Parser falhou.

↓

Registrar log.

↓

Cancelar importação.

---

## Critérios de Sucesso

Meal criada.

Dashboard atualizado.

Timeline atualizada.

Biblioteca atualizada quando solicitado.

---

## Critérios de Aceitação

✓ HWP_FOOD validado.

✓ Preview obrigatório.

✓ Meal persistida.

✓ Compatível com modo offline para importações locais.

---

## Diagrama

```

HWP_FOOD

↓

Validation

↓

Parser

↓

Preview

↓

Storage

↓

Library

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

# FLW-009

## Editar Refeição

---

## Objetivo

Permitir que o usuário altere uma Meal existente.

Preservar o histórico da refeição e o HWP_FOOD original.

---

## Participantes

Nutrition Module.

Validation.

Storage.

Library Module.

Metrics Engine.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário seleciona uma refeição existente e escolhe "Editar".

---

## Pré-condições

Meal existente.

DailyEntry existente.

---

## Fluxo Principal

Usuário abre editor.

↓

Altera informações.

↓

Validation.

↓

Storage.updateMeal().

↓

meal:updated.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Atualizar também FavoriteMeal.

↓

Confirmação.

↓

Library.updateFavorite().

↓

favorite:updated.

---

Cancelar edição.

↓

Descartar alterações.

↓

Retornar.

---

## Eventos Publicados

meal:updated

nutrition:updated

favorite:updated (opcional)

---

## Validações

Meal existente.

Campos obrigatórios válidos.

Valores nutricionais consistentes.

---

## Entidades Alteradas

Meal.

FavoriteMeal (opcional).

TimelineEvent.

---

## Entidades Calculadas Atualizadas

DailyNutrition.

DailyScore.

Dashboard.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Editando.

Salvando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Restaurar versão anterior.

↓

Não atualizar Dashboard.

↓

Não publicar eventos.

---

## Erros Esperados

Meal inexistente.

↓

Cancelar edição.

↓

Exibir mensagem.

---

Falha na persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Meal atualizada.

Dashboard atualizado.

Timeline atualizada.

---

## Critérios de Aceitação

✓ HWP_FOOD preservado.

✓ Dashboard atualizado.

✓ Timeline atualizada.

✓ Compatível com Backup.

---

## Diagrama

```

Editar Meal

↓

Validation

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-010

## Excluir Refeição

---

## Objetivo

Remover uma Meal do DailyEntry.

Atualizar automaticamente todos os indicadores derivados.

---

## Participantes

Nutrition Module.

Storage.

Metrics Engine.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário escolhe "Excluir".

---

## Pré-condições

Meal existente.

---

## Fluxo Principal

Selecionar excluir.

↓

Solicitar confirmação.

↓

Storage.deleteMeal().

↓

meal:deleted.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Cancelar exclusão.

↓

Nenhuma alteração.

↓

Retornar.

---

## Eventos Publicados

meal:deleted

nutrition:updated

---

## Validações

Meal existente.

Confirmação do usuário.

---

## Entidades Alteradas

Meal.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

DailyNutrition.

DailyScore.

Dashboard.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Confirmação.

Excluindo.

Concluído.

Erro.

Offline.

---

## Rollback

Falha durante exclusão.

↓

Cancelar operação.

↓

Restaurar Meal.

↓

Não atualizar Dashboard.

---

## Erros Esperados

Meal inexistente.

↓

Cancelar exclusão.

---

Falha na persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Meal removida.

Dashboard atualizado.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Exclusão confirmada.

✓ Dashboard atualizado.

✓ Timeline atualizada.

✓ Sem inconsistências.

---

## Diagrama

```

Excluir Meal

↓

Confirmação

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-011

## Duplicar Refeição

---

## Objetivo

Criar uma nova Meal utilizando outra como modelo.

Reduzir tempo de registro de refeições recorrentes.

---

## Participantes

Nutrition Module.

Storage.

Metrics Engine.

Timeline Module.

Dashboard Module.

Library Module.

Event Bus.

---

## Gatilho

Usuário escolhe "Duplicar".

---

## Pré-condições

Meal existente.

---

## Fluxo Principal

Selecionar duplicar.

↓

Criar cópia.

↓

Storage.createMeal().

↓

meal:duplicated.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Duplicar para outro horário.

↓

Selecionar Slot.

↓

Persistir.

---

Duplicar para outra data.

↓

Selecionar Data.

↓

Criar DailyEntry se necessário.

↓

Persistir.

---

## Eventos Publicados

meal:duplicated

meal:created

nutrition:updated

---

## Validações

Meal existente.

Slot válido.

Data válida.

---

## Entidades Alteradas

Meal.

DailyEntry (quando necessário).

TimelineEvent.

---

## Entidades Calculadas Atualizadas

DailyNutrition.

DailyScore.

Dashboard.

WeeklySummary.

---

## Estados da Interface

Duplicando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao duplicar.

↓

Cancelar operação.

↓

Nenhuma Meal criada.

---

## Erros Esperados

Meal inexistente.

↓

Cancelar duplicação.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Nova Meal criada.

Dashboard atualizado.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Duplicação correta.

✓ Compatível com outra data.

✓ Compatível com outro Slot.

---

## Diagrama

```

Duplicar Meal

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-012

## Mover Refeição entre Horários

---

## Objetivo

Alterar o Slot de uma Meal mantendo seus dados nutricionais.

---

## Participantes

Nutrition Module.

Storage.

Metrics Engine.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário altera o horário da refeição.

---

## Pré-condições

Meal existente.

Slot válido.

---

## Fluxo Principal

Selecionar novo Slot.

↓

Validation.

↓

Storage.updateMeal().

↓

meal:moved.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Mover para outro dia.

↓

Selecionar nova data.

↓

Criar DailyEntry se necessário.

↓

Persistir.

---

## Eventos Publicados

meal:moved

nutrition:updated

---

## Validações

Slot válido.

Meal existente.

Data válida.

---

## Entidades Alteradas

Meal.

DailyEntry (quando necessário).

TimelineEvent.

---

## Entidades Calculadas Atualizadas

DailyNutrition.

DailyScore.

Dashboard.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Movendo.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao mover.

↓

Restaurar Slot anterior.

↓

Não atualizar Dashboard.

↓

Não publicar eventos.

---

## Erros Esperados

Slot inválido.

↓

Solicitar correção.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Meal movida.

Dashboard atualizado.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Slot atualizado.

✓ Dashboard atualizado.

✓ Timeline atualizada.

✓ Compatível com Backup.

---

## Diagrama

```

Mover Meal

↓

Validation

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```
# FLW-013

## Criar FavoriteMeal

---

## Objetivo

Criar uma FavoriteMeal na Biblioteca Inteligente.

Permitir reutilização rápida de refeições recorrentes.

---

## Participantes

Library Module.

Nutrition Module.

Storage.

Validation.

Timeline Module.

Event Bus.

---

## Gatilho

Usuário escolhe "Salvar na Biblioteca".

---

## Pré-condições

Meal existente.

---

## Fluxo Principal

Selecionar "Salvar na Biblioteca".

↓

Validation.

↓

Criar FavoriteMeal.

↓

Storage.saveFavoriteMeal().

↓

favorite:created.

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

FavoriteMeal semelhante encontrada.

↓

Oferecer:

Atualizar existente.

Criar nova.

Cancelar.

---

Cancelar operação.

↓

Nenhuma alteração.

---

## Eventos Publicados

favorite:created

library:updated

timeline:created

---

## Validações

Meal existente.

Nome obrigatório.

Categoria válida.

---

## Entidades Alteradas

FavoriteMeal.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Criando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Cancelar criação.

↓

Não atualizar Biblioteca.

↓

Não publicar eventos.

---

## Erros Esperados

Nome inválido.

↓

Solicitar correção.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

FavoriteMeal criada.

Biblioteca atualizada.

Timeline atualizada.

---

## Critérios de Aceitação

✓ FavoriteMeal persistida.

✓ Biblioteca atualizada.

✓ Compatível com Backup.

---

## Diagrama

```

Meal

↓

Library

↓

Validation

↓

Storage

↓

Timeline

↓

Render

```

---

# FLW-014

## Utilizar FavoriteMeal

---

## Objetivo

Criar uma Meal utilizando uma FavoriteMeal existente.

Este deverá ser o método mais rápido para registrar refeições recorrentes.

---

## Participantes

Library Module.

Nutrition Module.

Storage.

Metrics Engine.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário seleciona uma FavoriteMeal.

---

## Pré-condições

FavoriteMeal existente.

DailyEntry existente.

---

## Fluxo Principal

Selecionar FavoriteMeal.

↓

Selecionar horário.

↓

Storage.createMeal().

↓

Atualizar estatísticas.

↓

favorite:used.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

DailyEntry inexistente.

↓

Criar DailyEntry.

↓

Criar Meal.

---

Outro dia selecionado.

↓

Persistir na nova data.

---

## Eventos Publicados

favorite:used

meal:created

nutrition:updated

---

## Validações

FavoriteMeal existente.

Slot válido.

Data válida.

---

## Entidades Alteradas

Meal.

FavoriteMeal.

DailyEntry (quando necessário).

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Dashboard.

DailyNutrition.

DailyScore.

WeeklySummary.

---

## Estados da Interface

Selecionando.

Criando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao criar Meal.

↓

Cancelar operação.

↓

Não atualizar estatísticas.

↓

Não atualizar Dashboard.

---

## Erros Esperados

FavoriteMeal inexistente.

↓

Cancelar operação.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Meal criada.

Dashboard atualizado.

Biblioteca atualizada.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Meal criada corretamente.

✓ Estatísticas atualizadas.

✓ Dashboard atualizado.

✓ Compatível com Backup.

---

## Diagrama

```

FavoriteMeal

↓

Storage

↓

Meal

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-015

## Editar FavoriteMeal

---

## Objetivo

Atualizar uma FavoriteMeal existente sem alterar Meals históricas.

---

## Participantes

Library Module.

Storage.

Validation.

Timeline Module.

Event Bus.

---

## Gatilho

Usuário escolhe "Editar".

---

## Pré-condições

FavoriteMeal existente.

---

## Fluxo Principal

Abrir editor.

↓

Editar informações.

↓

Validation.

↓

Storage.updateFavoriteMeal().

↓

favorite:updated.

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Cancelar edição.

↓

Descartar alterações.

↓

Retornar.

---

## Eventos Publicados

favorite:updated

library:updated

---

## Validações

Nome obrigatório.

Categoria válida.

---

## Entidades Alteradas

FavoriteMeal.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Editando.

Salvando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Restaurar versão anterior.

↓

Não publicar eventos.

---

## Erros Esperados

FavoriteMeal inexistente.

↓

Cancelar edição.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

FavoriteMeal atualizada.

Biblioteca atualizada.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Meals históricas preservadas.

✓ Biblioteca atualizada.

✓ Compatível com Backup.

---

## Diagrama

```

Editar FavoriteMeal

↓

Validation

↓

Storage

↓

Timeline

↓

Render

```

---

# FLW-016

## Excluir FavoriteMeal

---

## Objetivo

Remover uma FavoriteMeal da Biblioteca Inteligente.

Nunca alterar Meals já registradas.

---

## Participantes

Library Module.

Storage.

Timeline Module.

Event Bus.

---

## Gatilho

Usuário escolhe "Excluir".

---

## Pré-condições

FavoriteMeal existente.

---

## Fluxo Principal

Selecionar excluir.

↓

Solicitar confirmação.

↓

Storage.deleteFavoriteMeal().

↓

favorite:deleted.

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Cancelar exclusão.

↓

Retornar.

↓

Nenhuma alteração.

---

## Eventos Publicados

favorite:deleted

library:updated

---

## Validações

FavoriteMeal existente.

Confirmação obrigatória.

---

## Entidades Alteradas

FavoriteMeal.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Confirmação.

Excluindo.

Concluído.

Erro.

Offline.

---

## Rollback

Falha durante exclusão.

↓

Cancelar operação.

↓

Restaurar FavoriteMeal.

↓

Não publicar eventos.

---

## Erros Esperados

FavoriteMeal inexistente.

↓

Cancelar exclusão.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

FavoriteMeal removida.

Biblioteca atualizada.

Timeline atualizada.

Meals históricas preservadas.

---

## Critérios de Aceitação

✓ Apenas FavoriteMeal removida.

✓ Meals existentes permanecem intactas.

✓ Compatível com Backup.

✓ Compatível com Timeline.

---

## Diagrama

```

Excluir FavoriteMeal

↓

Confirmação

↓

Storage

↓

Timeline

↓

Render

```

# FLW-017

## Visualizar Evolução Corporal

---

## Objetivo

Permitir ao usuário acompanhar sua evolução corporal através de indicadores, gráficos e comparações.

---

## Participantes

Body Progress Module.

Metrics Engine.

Charts Module.

Timeline Module.

UI Components.

---

## Gatilho

Usuário acessa a tela Evolução.

---

## Pré-condições

Existir pelo menos um DailyEntry.

---

## Fluxo Principal

Usuário abre Evolução.

↓

Body Progress solicita dados.

↓

Metrics Engine gera ViewModels.

↓

Charts.render().

↓

Exibir indicadores.

↓

Render completo.

---

## Fluxos Alternativos

Poucos registros.

↓

Exibir gráficos simplificados.

---

Nenhum registro.

↓

Exibir Empty State.

↓

Botão Registrar Peso.

---

## Eventos Publicados

progress:viewed

charts:rendered

---

## Validações

DailyEntry existente.

ViewModels válidos.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

BodyMetrics.

WeeklySummary.

MonthlySummary.

Dashboard.

---

## Estados da Interface

Loading.

Sem Dados.

Gráficos.

Comparação.

Erro.

Offline.

---

## Rollback

Falha na geração dos gráficos.

↓

Ocultar gráfico afetado.

↓

Manter restante da tela.

↓

Registrar log.

---

## Erros Esperados

Dados insuficientes.

↓

Exibir gráfico parcial.

---

Erro na renderização.

↓

Recarregar gráfico.

---

## Critérios de Sucesso

Indicadores exibidos.

Gráficos carregados.

Interface responsiva.

---

## Critérios de Aceitação

✓ Funciona offline.

✓ Atualização automática.

✓ Compatível com Charts Module.

---

## Diagrama

```

Usuário

↓

Body Progress

↓

Metrics

↓

Charts

↓

Render

```

---

# FLW-018

## Comparar Fotos de Evolução

---

## Objetivo

Permitir comparação visual entre fotografias de evolução corporal.

---

## Participantes

Body Progress Module.

ProgressPhoto.

Storage.

UI Components.

---

## Gatilho

Usuário seleciona duas fotos.

---

## Pré-condições

Existirem pelo menos duas fotos compatíveis.

---

## Fluxo Principal

Selecionar foto inicial.

↓

Selecionar foto final.

↓

Validation.

↓

Carregar imagens.

↓

Render lado a lado.

---

## Fluxos Alternativos

Comparação automática por datas.

↓

Selecionar datas.

↓

Buscar fotos correspondentes.

---

## Eventos Publicados

photo:compared

---

## Validações

Fotos existentes.

Mesma posição corporal.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Selecionando.

Comparando.

Erro.

Offline.

---

## Rollback

Falha ao carregar imagem.

↓

Cancelar comparação.

↓

Retornar seleção.

---

## Erros Esperados

Imagem inexistente.

↓

Solicitar nova seleção.

---

Posições incompatíveis.

↓

Avisar usuário.

↓

Permitir continuar.

---

## Critérios de Sucesso

Comparação exibida.

Interface fluida.

---

## Critérios de Aceitação

✓ Fotos preservadas.

✓ Nenhuma alteração no Storage.

✓ Compatível com Backup.

---

## Diagrama

```

Selecionar Fotos

↓

Validation

↓

Carregar

↓

Comparação

↓

Render

```

---

# FLW-019

## Registrar Treino

---

## Objetivo

Registrar uma nova sessão de treino.

---

## Participantes

Workout Module.

Validation.

Storage.

Metrics Engine.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário seleciona "Novo Treino".

---

## Pré-condições

DailyEntry existente.

---

## Fluxo Principal

Abrir formulário.

↓

Preencher treino.

↓

Validation.

↓

Storage.createWorkout().

↓

workout:created.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

DailyEntry inexistente.

↓

Criar DailyEntry.

↓

Criar Workout.

---

## Eventos Publicados

workout:created

workout:completed

---

## Validações

Tipo válido.

Duração válida.

Intensidade válida.

---

## Entidades Alteradas

Workout.

DailyEntry.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Dashboard.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Novo.

Salvando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Cancelar operação.

↓

Não atualizar Dashboard.

↓

Não publicar Timeline.

---

## Erros Esperados

Tipo inválido.

↓

Solicitar correção.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Treino salvo.

Dashboard atualizado.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Workout persistido.

✓ Dashboard atualizado.

✓ Compatível com Backup.

---

## Diagrama

```

Workout

↓

Validation

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-020

## Editar ou Excluir Treino

---

## Objetivo

Permitir manutenção do histórico de treinos.

---

## Participantes

Workout Module.

Storage.

Validation.

Metrics Engine.

Timeline Module.

Dashboard Module.

---

## Gatilho

Usuário abre menu contextual do treino.

---

## Pré-condições

Workout existente.

---

## Fluxo Principal

Selecionar Editar.

ou

Selecionar Excluir.

↓

Validation.

↓

Persistir alteração.

↓

workout:updated

ou

workout:deleted

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Cancelar.

↓

Retornar.

↓

Nenhuma alteração.

---

## Eventos Publicados

workout:updated

workout:deleted

---

## Validações

Workout existente.

Confirmação obrigatória para exclusão.

---

## Entidades Alteradas

Workout.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Dashboard.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Editando.

Confirmando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao persistir.

↓

Restaurar versão anterior.

↓

Não atualizar Dashboard.

---

## Erros Esperados

Workout inexistente.

↓

Cancelar operação.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Treino atualizado ou removido.

Dashboard atualizado.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Histórico preservado.

✓ Dashboard consistente.

✓ Compatível com Backup.

---

## Diagrama

```

Editar/Excluir Workout

↓

Validation

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

# FLW-021

## Cadastrar Medicamento

---

## Objetivo

Cadastrar um novo medicamento ou suplemento utilizado pelo usuário.

---

## Participantes

Medication Module.

Validation.

Storage.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário seleciona "Adicionar Medicamento".

---

## Pré-condições

Profile existente.

---

## Fluxo Principal

Abrir formulário.

↓

Preencher informações.

↓

Validation.

↓

Storage.createMedication().

↓

medication:created.

↓

Timeline.publish().

↓

Dashboard.refresh().

↓

Render.

---

## Fluxos Alternativos

Medicamento já existente.

↓

Sugerir reutilização.

↓

Cancelar ou atualizar.

---

## Eventos Publicados

medication:created

timeline:created

---

## Validações

Nome obrigatório.

Tipo válido.

Frequência válida.

Dose obrigatória.

---

## Entidades Alteradas

Medication.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Dashboard.

---

## Estados da Interface

Novo.

Salvando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Cancelar operação.

↓

Não criar Medication.

↓

Não publicar eventos.

---

## Erros Esperados

Nome inválido.

↓

Solicitar correção.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Medication criada.

Timeline atualizada.

Dashboard atualizado.

---

## Critérios de Aceitação

✓ Medication persistida.

✓ Compatível com Backup.

✓ Funciona offline.

---

## Diagrama

```

Medication

↓

Validation

↓

Storage

↓

Timeline

↓

Dashboard

↓

Render

```

---

# FLW-022

## Registrar Aplicação de Medicamento

---

## Objetivo

Registrar uma aplicação individual de um medicamento.

---

## Participantes

Medication Module.

Validation.

Storage.

Metrics Engine.

Timeline Module.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário seleciona "Registrar Aplicação".

---

## Pré-condições

Medication existente.

---

## Fluxo Principal

Selecionar medicamento.

↓

Informar dose.

↓

Informar data.

↓

Validation.

↓

Storage.createInjection().

↓

injection:created.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Adicionar efeitos colaterais.

↓

Registrar SideEffects.

↓

Persistir Injection.

---

Aplicação retroativa.

↓

Selecionar data anterior.

↓

Persistir normalmente.

---

## Eventos Publicados

injection:created

sideeffect:added (opcional)

---

## Validações

Medication existente.

Dose válida.

Data válida.

---

## Entidades Alteradas

Injection.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Dashboard.

---

## Estados da Interface

Novo.

Salvando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Cancelar operação.

↓

Não criar Injection.

↓

Não atualizar Dashboard.

---

## Erros Esperados

Dose inválida.

↓

Solicitar correção.

---

Medication inexistente.

↓

Cancelar operação.

---

## Critérios de Sucesso

Injection criada.

Timeline atualizada.

Dashboard atualizado.

---

## Critérios de Aceitação

✓ Histórico preservado.

✓ Compatível com Backup.

✓ Funciona offline.

---

## Diagrama

```

Injection

↓

Validation

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-023

## Registrar Foto de Evolução

---

## Objetivo

Adicionar uma fotografia para acompanhamento da evolução corporal.

---

## Participantes

Body Progress Module.

Validation.

Storage.

Timeline Module.

Event Bus.

---

## Gatilho

Usuário seleciona "Adicionar Foto".

---

## Pré-condições

DailyEntry existente.

---

## Fluxo Principal

Selecionar câmera ou galeria.

↓

Selecionar imagem.

↓

Selecionar posição corporal.

↓

Validation.

↓

Storage.createProgressPhoto().

↓

photo:created.

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Cancelar seleção.

↓

Retornar.

↓

Nenhuma alteração.

---

Trocar posição.

↓

Atualizar posição.

↓

Persistir.

---

## Eventos Publicados

photo:created

timeline:created

---

## Validações

Imagem obrigatória.

Posição válida.

DailyEntry existente.

---

## Entidades Alteradas

ProgressPhoto.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Selecionando.

Carregando.

Salvando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Cancelar operação.

↓

Não criar foto.

↓

Não publicar eventos.

---

## Erros Esperados

Imagem inválida.

↓

Solicitar nova seleção.

---

Falha na persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Foto registrada.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Foto persistida.

✓ Compatível com Backup.

✓ Funciona offline.

---

## Diagrama

```

Selecionar Foto

↓

Validation

↓

Storage

↓

Timeline

↓

Render

```

---

# FLW-024

## Alterar Configurações

---

## Objetivo

Permitir ao usuário alterar preferências globais da aplicação.

---

## Participantes

Settings Module.

Theme Engine.

Storage.

Event Bus.

UI Components.

---

## Gatilho

Usuário altera qualquer configuração.

---

## Pré-condições

Settings existentes.

---

## Fluxo Principal

Alterar configuração.

↓

Validation.

↓

Storage.updateSettings().

↓

settings:updated.

↓

Atualizar Interface.

↓

Render.

---

## Fluxos Alternativos

Restaurar padrão.

↓

Confirmation.

↓

Storage.restoreDefaults().

↓

Render.

---

## Eventos Publicados

settings:updated

theme:changed

language:changed

units:changed

---

## Validações

Valor permitido.

Enum válido.

---

## Entidades Alteradas

Settings.

TimelineEvent (opcional).

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Editando.

Salvando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Restaurar último valor.

↓

Atualizar Interface.

---

## Erros Esperados

Valor inválido.

↓

Cancelar alteração.

---

Falha na persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Settings atualizadas.

Interface atualizada.

---

## Critérios de Aceitação

✓ Alteração imediata.

✓ Persistência correta.

✓ Compatível com Backup.

✓ Funciona offline.

---

## Diagrama

```

Settings

↓

Validation

↓

Storage

↓

Theme Engine

↓

Render

```

# FLW-025

## Criar Backup Completo

---

## Objetivo

Gerar um backup completo do HWP Platform contendo todos os dados persistentes do usuário.

Garantir recuperação integral da aplicação.

---

## Participantes

Backup Module.

Storage.

Validation.

Export Module.

Event Bus.

UI Components.

---

## Gatilho

Usuário seleciona "Criar Backup".

---

## Pré-condições

Storage inicializado.

SchemaVersion válida.

---

## Fluxo Principal

Usuário solicita Backup.

↓

Storage.export().

↓

Validation.

↓

Gerar manifesto.

↓

Calcular checksum.

↓

Gerar arquivo HWP Backup.

↓

backup:created.

↓

Compartilhar arquivo.

↓

Render.

---

## Fluxos Alternativos

Cancelar compartilhamento.

↓

Backup permanece criado.

↓

Retornar.

---

## Eventos Publicados

backup:created

export:completed

---

## Validações

SchemaVersion válida.

Checksum válido.

Integridade do Storage.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Preparando.

Exportando.

Compartilhando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha durante geração.

↓

Cancelar exportação.

↓

Excluir arquivo temporário.

↓

Registrar log.

---

## Erros Esperados

Storage inconsistente.

↓

Cancelar Backup.

↓

Exibir mensagem.

---

Erro de escrita.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Arquivo criado.

Checksum válido.

Manifesto criado.

---

## Critérios de Aceitação

✓ Backup íntegro.

✓ Compartilhamento disponível.

✓ Funciona offline.

---

## Diagrama

```

Usuário

↓

Backup Module

↓

Storage

↓

Validation

↓

Export

↓

Arquivo

↓

Compartilhar

```

---

# FLW-026

## Restaurar Backup

---

## Objetivo

Restaurar integralmente um Backup do HWP Platform.

---

## Participantes

Backup Module.

Import Module.

Storage.

Validation.

Metrics Engine.

Dashboard Module.

Timeline Module.

Event Bus.

---

## Gatilho

Usuário seleciona "Restaurar Backup".

---

## Pré-condições

Arquivo HWP Backup válido.

---

## Fluxo Principal

Selecionar arquivo.

↓

Validation.

↓

Validar checksum.

↓

Validar SchemaVersion.

↓

Confirmação.

↓

Storage.restore().

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.refresh().

↓

backup:restored.

↓

Render.

---

## Fluxos Alternativos

Schema incompatível.

↓

Executar migração.

ou

Cancelar.

---

Cancelar restauração.

↓

Nenhuma alteração.

---

## Eventos Publicados

backup:restored

dashboard:refresh

---

## Validações

Arquivo válido.

Checksum.

SchemaVersion.

Manifesto.

---

## Entidades Alteradas

Todas as entidades persistentes.

---

## Entidades Calculadas Atualizadas

Dashboard.

DailyScore.

BodyMetrics.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Validando.

Restaurando.

Concluído.

Erro.

---

## Rollback

Falha durante restauração.

↓

Rollback completo.

↓

Restaurar estado anterior.

↓

Registrar log.

---

## Erros Esperados

Arquivo inválido.

↓

Cancelar restauração.

---

Checksum inválido.

↓

Abortar.

---

Schema incompatível.

↓

Solicitar atualização.

---

## Critérios de Sucesso

Dados restaurados.

Dashboard reconstruído.

Timeline reconstruída.

---

## Critérios de Aceitação

✓ Operação atômica.

✓ Rollback funcionando.

✓ Compatível com versões suportadas.

---

## Diagrama

```

Arquivo

↓

Validation

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

---

# FLW-027

## Importar HWP_FOOD

---

## Objetivo

Importar uma refeição utilizando o protocolo oficial HWP_FOOD.

---

## Participantes

ChatGPT Integration Module.

Import Module.

Nutrition Module.

Validation.

Storage.

Event Bus.

---

## Gatilho

Usuário cola um HWP_FOOD.

---

## Pré-condições

Formato HWP_FOOD válido.

---

## Fluxo Principal

Colar conteúdo.

↓

Validation.

↓

Parser.

↓

Preview.

↓

Confirmação.

↓

Storage.createMeal().

↓

meal:created.

↓

Dashboard.refresh().

↓

Timeline.publish().

↓

Render.

---

## Fluxos Alternativos

Salvar também na Biblioteca.

↓

Library.createFavorite().

---

Cancelar.

↓

Descartar Preview.

---

## Eventos Publicados

chatgpt:validated

meal:created

nutrition:updated

---

## Validações

Formato válido.

Versão compatível.

Campos obrigatórios.

---

## Entidades Alteradas

Meal.

TimelineEvent.

FavoriteMeal (opcional).

---

## Entidades Calculadas Atualizadas

Dashboard.

DailyNutrition.

DailyScore.

---

## Estados da Interface

Validando.

Preview.

Importando.

Concluído.

Erro.

---

## Rollback

Falha.

↓

Cancelar operação.

↓

Nenhuma Meal criada.

---

## Erros Esperados

Parser inválido.

↓

Solicitar nova tentativa.

---

Formato incompatível.

↓

Cancelar importação.

---

## Critérios de Sucesso

Meal criada.

Dashboard atualizado.

Timeline atualizada.

---

## Critérios de Aceitação

✓ Preview obrigatório.

✓ HWP_FOOD preservado.

✓ Compatível com Backup.

---

## Diagrama

```

HWP_FOOD

↓

Parser

↓

Preview

↓

Storage

↓

Dashboard

↓

Timeline

```

---

# FLW-028

## Importar Backup

---

## Objetivo

Importar um arquivo de Backup para substituir os dados atuais.

---

## Participantes

Import Module.

Backup Module.

Validation.

Storage.

Metrics Engine.

Dashboard Module.

Timeline Module.

---

## Gatilho

Usuário escolhe um arquivo HWP Backup.

---

## Pré-condições

Arquivo existente.

---

## Fluxo Principal

Selecionar arquivo.

↓

Validation.

↓

Pré-visualização.

↓

Confirmação.

↓

Storage.restore().

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Timeline.refresh().

↓

Render.

---

## Fluxos Alternativos

Cancelar.

↓

Retornar.

↓

Nenhuma alteração.

---

## Eventos Publicados

import:completed

backup:restored

---

## Validações

Arquivo.

Manifesto.

Checksum.

SchemaVersion.

---

## Entidades Alteradas

Todas as entidades persistentes.

---

## Entidades Calculadas Atualizadas

Todas as ViewModels.

---

## Estados da Interface

Selecionando.

Validando.

Importando.

Concluído.

Erro.

---

## Rollback

Falha.

↓

Rollback integral.

↓

Restaurar estado anterior.

---

## Erros Esperados

Arquivo inexistente.

↓

Cancelar.

---

Manifesto inválido.

↓

Cancelar.

---

Erro de leitura.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Backup restaurado.

Dashboard reconstruído.

Timeline reconstruída.

---

## Critérios de Aceitação

✓ Operação transacional.

✓ Compatível com SchemaVersion.

✓ Compatível com Backup Module.

---

## Diagrama

```

Arquivo

↓

Validation

↓

Import

↓

Storage

↓

Metrics

↓

Dashboard

↓

Timeline

↓

Render

```

# FLW-029

## Exportar Dados

---

## Objetivo

Exportar dados do HWP Platform em formatos suportados.

Permitir compartilhamento e preservação das informações.

---

## Participantes

Export Module.

Storage.

Metrics Engine.

Validation.

UI Components.

Event Bus.

---

## Gatilho

Usuário seleciona "Exportar".

---

## Pré-condições

Storage inicializado.

---

## Fluxo Principal

Selecionar formato.

↓

Selecionar período.

↓

Validation.

↓

Gerar arquivo.

↓

Compartilhar.

↓

export:completed.

↓

Render.

---

## Fluxos Alternativos

Cancelar compartilhamento.

↓

Encerrar fluxo.

↓

Retornar.

---

## Eventos Publicados

export:started

export:completed

---

## Validações

Formato suportado.

Período válido.

Dados disponíveis.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Relatórios temporários.

---

## Estados da Interface

Selecionando.

Gerando.

Compartilhando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha durante exportação.

↓

Excluir arquivo temporário.

↓

Registrar log.

---

## Erros Esperados

Formato inválido.

↓

Cancelar operação.

---

Falha ao gerar arquivo.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Arquivo gerado.

Compartilhamento disponível.

---

## Critérios de Aceitação

✓ Exportação íntegra.

✓ Compatível com Backup.

✓ Funciona offline quando aplicável.

---

## Diagrama

```

Export

↓

Validation

↓

Gerar Arquivo

↓

Compartilhar

↓

Render

```

---

# FLW-030

## Instalar PWA

---

## Objetivo

Permitir instalação do HWP Platform como aplicativo.

---

## Participantes

PWA Module.

Service Worker.

UI Components.

Settings Module.

---

## Gatilho

Usuário seleciona "Instalar Aplicativo".

---

## Pré-condições

Navegador compatível.

Manifest disponível.

---

## Fluxo Principal

Solicitar instalação.

↓

Sistema operacional.

↓

Confirmação.

↓

Instalar PWA.

↓

Registrar instalação.

↓

Render.

---

## Fluxos Alternativos

Instalação cancelada.

↓

Encerrar fluxo.

↓

Retornar.

---

Aplicativo já instalado.

↓

Abrir normalmente.

---

## Eventos Publicados

pwa:installed

app:installed

---

## Validações

Manifest válido.

Service Worker ativo.

---

## Entidades Alteradas

Settings.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Instalando.

Concluído.

Erro.

---

## Rollback

Falha.

↓

Cancelar instalação.

↓

Registrar log.

---

## Erros Esperados

Dispositivo incompatível.

↓

Exibir instruções.

---

Service Worker indisponível.

↓

Cancelar instalação.

---

## Critérios de Sucesso

Aplicativo instalado.

---

## Critérios de Aceitação

✓ Compatível com iOS.

✓ Compatível com Android.

✓ Compatível com Desktop.

---

## Diagrama

```

Usuário

↓

PWA Module

↓

Sistema

↓

Instalar

↓

Render

```

---

# FLW-031

## Atualização Automática do Aplicativo

---

## Objetivo

Atualizar o aplicativo preservando integralmente os dados do usuário.

---

## Participantes

PWA Module.

Service Worker.

Cache Manager.

Storage.

Event Bus.

---

## Gatilho

Nova versão disponível.

---

## Pré-condições

Aplicativo instalado.

---

## Fluxo Principal

Detectar atualização.

↓

Baixar recursos.

↓

Criar novo Cache.

↓

Validar.

↓

Troca atômica.

↓

Atualizar Interface.

↓

Render.

---

## Fluxos Alternativos

Usuário adiar atualização.

↓

Continuar utilizando versão atual.

---

## Eventos Publicados

cache:updated

pwa:updated

---

## Validações

Cache íntegro.

Versão válida.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Atualizando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha.

↓

Restaurar cache anterior.

↓

Continuar aplicação.

---

## Erros Esperados

Download interrompido.

↓

Manter versão anterior.

---

Cache inválido.

↓

Reconstruir cache.

---

## Critérios de Sucesso

Nova versão ativa.

Dados preservados.

---

## Critérios de Aceitação

✓ Atualização segura.

✓ Nenhuma perda de dados.

✓ Rollback funcionando.

---

## Diagrama

```

Nova Versão

↓

Download

↓

Cache

↓

Troca

↓

Render

```

---

# FLW-032

## Sincronização Offline

---

## Objetivo

Garantir funcionamento integral da aplicação durante ausência de conexão.

Preparar a futura sincronização em nuvem.

---

## Participantes

PWA Module.

Storage.

Event Bus.

Metrics Engine.

Dashboard Module.

---

## Gatilho

Perda de conexão.

---

## Pré-condições

Aplicativo inicializado.

---

## Fluxo Principal

Detectar Offline.

↓

Ativar modo Offline.

↓

Persistir alterações localmente.

↓

Atualizar Dashboard.

↓

Render.

---

## Fluxos Alternativos

Conexão restaurada.

↓

Sincronizar pendências.

↓

Atualizar Interface.

---

## Eventos Publicados

app:offline

app:online

sync:pending

sync:completed

---

## Validações

Storage disponível.

Fila consistente.

---

## Entidades Alteradas

Fila de sincronização.

---

## Entidades Calculadas Atualizadas

Dashboard.

DailyScore.

---

## Estados da Interface

Online.

Offline.

Sincronizando.

Concluído.

Erro.

---

## Rollback

Falha na sincronização.

↓

Manter fila.

↓

Permitir nova tentativa.

---

## Erros Esperados

Sem conexão.

↓

Continuar funcionamento.

---

Conflito de sincronização.

↓

Manter dados locais.

↓

Registrar conflito.

---

## Critérios de Sucesso

Aplicação continua funcionando.

Nenhuma perda de dados.

---

## Critérios de Aceitação

✓ Totalmente funcional offline.

✓ Preparado para Cloud Sync.

✓ Compatível com Event Bus.

---

## Diagrama

```

Offline

↓

Storage

↓

Fila Local

↓

Dashboard

↓

Render

```

# FLW-033

## Pesquisar na Biblioteca Inteligente

---

## Objetivo

Localizar rapidamente uma FavoriteMeal utilizando pesquisa, filtros e ordenação.

---

## Participantes

Library Module.

Storage.

UI Components.

Event Bus.

---

## Gatilho

Usuário acessa Biblioteca.

---

## Pré-condições

Biblioteca inicializada.

---

## Fluxo Principal

Abrir Biblioteca.

↓

Carregar FavoriteMeals.

↓

Exibir lista.

↓

Usuário pesquisa.

↓

Aplicar filtros.

↓

Ordenar.

↓

Render.

---

## Fluxos Alternativos

Nenhum resultado.

↓

Exibir Empty State.

↓

Sugerir criar FavoriteMeal.

---

Biblioteca vazia.

↓

Exibir mensagem inicial.

---

## Eventos Publicados

library:searched

library:filtered

---

## Validações

Texto válido.

Filtros válidos.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Carregando.

Lista.

Pesquisa.

Sem resultados.

Erro.

Offline.

---

## Rollback

Falha ao carregar.

↓

Recarregar Biblioteca.

↓

Registrar log.

---

## Erros Esperados

Storage indisponível.

↓

Exibir mensagem.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Resultados exibidos.

Pesquisa instantânea.

---

## Critérios de Aceitação

✓ Pesquisa rápida.

✓ Funciona offline.

✓ Sem travamentos.

---

## Diagrama

```

Biblioteca

↓

Storage

↓

Pesquisa

↓

Filtros

↓

Render

```

---

# FLW-034

## Visualizar Timeline

---

## Objetivo

Permitir ao usuário consultar todo o histórico cronológico da aplicação.

---

## Participantes

Timeline Module.

Storage.

Metrics Engine.

UI Components.

---

## Gatilho

Usuário acessa Timeline.

---

## Pré-condições

Timeline existente.

---

## Fluxo Principal

Abrir Timeline.

↓

Carregar TimelineEvents.

↓

Ordenar.

↓

Render.

---

## Fluxos Alternativos

Aplicar filtros.

↓

Atualizar lista.

↓

Render.

---

Pesquisar eventos.

↓

Atualizar lista.

↓

Render.

---

## Eventos Publicados

timeline:viewed

timeline:filtered

timeline:searched

---

## Validações

Timeline íntegra.

Filtros válidos.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Carregando.

Lista.

Pesquisa.

Sem eventos.

Erro.

Offline.

---

## Rollback

Falha.

↓

Recarregar Timeline.

↓

Registrar log.

---

## Erros Esperados

Timeline vazia.

↓

Exibir Empty State.

---

Falha de leitura.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Eventos exibidos.

Filtros funcionando.

---

## Critérios de Aceitação

✓ Ordem cronológica correta.

✓ Pesquisa rápida.

✓ Funciona offline.

---

## Diagrama

```

Timeline

↓

Storage

↓

Filtros

↓

Pesquisa

↓

Render

```

---

# FLW-035

## Alterar Meta de Peso

---

## Objetivo

Atualizar a meta principal de peso do usuário.

Recalcular automaticamente todas as projeções.

---

## Participantes

Goals Module.

Storage.

Metrics Engine.

Dashboard Module.

Body Progress Module.

Event Bus.

---

## Gatilho

Usuário altera a meta de peso.

---

## Pré-condições

Profile existente.

Goals existentes.

---

## Fluxo Principal

Abrir Metas.

↓

Editar Peso-Alvo.

↓

Validation.

↓

Storage.updateGoals().

↓

goal:updated.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

BodyProgress.refresh().

↓

Render.

---

## Fluxos Alternativos

Restaurar meta anterior.

↓

Persistir.

↓

Atualizar Interface.

---

## Eventos Publicados

goal:updated

dashboard:refresh

---

## Validações

Peso válido.

Peso diferente do atual.

Peso dentro do intervalo permitido.

---

## Entidades Alteradas

Goals.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

Dashboard.

BodyMetrics.

WeightProjection.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Editando.

Salvando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Restaurar meta anterior.

↓

Não atualizar Dashboard.

---

## Erros Esperados

Peso inválido.

↓

Solicitar correção.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Meta atualizada.

Dashboard recalculado.

Projeções atualizadas.

---

## Critérios de Aceitação

✓ Persistência correta.

✓ Recalculo automático.

✓ Compatível com Backup.

---

## Diagrama

```

Goal

↓

Validation

↓

Storage

↓

Metrics

↓

Dashboard

↓

Body Progress

↓

Render

```

---

# FLW-036

## Registrar Consumo de Água por Ação Rápida

---

## Objetivo

Permitir registrar rapidamente a ingestão de água com apenas um toque.

---

## Participantes

Diary Module.

Storage.

Metrics Engine.

Dashboard Module.

Event Bus.

---

## Gatilho

Usuário toca no botão "+ Água".

---

## Pré-condições

DailyEntry existente.

---

## Fluxo Principal

Selecionar quantidade.

↓

Atualizar DailyEntry.

↓

Storage.

↓

water:updated.

↓

Metrics.invalidate().

↓

Dashboard.refresh().

↓

Render.

---

## Fluxos Alternativos

Quantidade personalizada.

↓

Inserir valor.

↓

Persistir.

---

Desfazer última ação.

↓

Restaurar valor anterior.

↓

Atualizar Dashboard.

---

## Eventos Publicados

water:updated

dashboard:refresh

---

## Validações

Quantidade válida.

Limite diário permitido.

---

## Entidades Alteradas

DailyEntry.

TimelineEvent.

---

## Entidades Calculadas Atualizadas

DailyScore.

Dashboard.

HydrationStatus.

---

## Estados da Interface

Atualizando.

Concluído.

Erro.

Offline.

---

## Rollback

Falha ao salvar.

↓

Restaurar valor anterior.

↓

Não publicar eventos.

---

## Erros Esperados

Valor inválido.

↓

Solicitar correção.

---

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Água registrada.

Dashboard atualizado.

---

## Critérios de Aceitação

✓ Registro em um toque.

✓ Atualização imediata.

✓ Compatível com modo offline.

---

## Diagrama

```

Botão Água

↓

Storage

↓

Metrics

↓

Dashboard

↓

Render

```

# FLW-037

## Pesquisar Informações no Dashboard

---

## Objetivo

Permitir que o usuário visualize rapidamente seus principais indicadores de saúde e evolução.

---

## Participantes

Dashboard Module.

Metrics Engine.

Storage.

UI Components.

---

## Gatilho

Usuário abre o Dashboard.

---

## Pré-condições

Storage inicializado.

Metrics Engine inicializado.

---

## Fluxo Principal

Abrir Dashboard.

↓

Solicitar ViewModel.

↓

Metrics Engine.

↓

Construir indicadores.

↓

Render Cards.

↓

Render gráficos resumidos.

↓

Interface pronta.

---

## Fluxos Alternativos

Sem dados suficientes.

↓

Exibir Cards vazios.

↓

Exibir orientações.

---

Offline.

↓

Utilizar dados locais.

↓

Render normalmente.

---

## Eventos Publicados

dashboard:viewed

---

## Validações

ViewModel válido.

Storage íntegro.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Dashboard.

---

## Estados da Interface

Loading.

Resumo.

Sem Dados.

Erro.

Offline.

---

## Rollback

Falha na renderização.

↓

Renderizar apenas Cards disponíveis.

↓

Registrar log.

---

## Erros Esperados

Storage indisponível.

↓

Exibir mensagem.

↓

Permitir atualização.

---

Metrics indisponível.

↓

Ocultar indicadores derivados.

---

## Critérios de Sucesso

Dashboard carregado.

Indicadores corretos.

---

## Critérios de Aceitação

✓ Renderização rápida.

✓ Compatível com modo Offline.

✓ Nenhuma consulta direta ao Storage.

---

## Diagrama

```

Dashboard

↓

Metrics

↓

ViewModel

↓

Render

```

---

# FLW-038

## Pesquisar Histórico Nutricional

---

## Objetivo

Permitir localizar refeições registradas anteriormente.

---

## Participantes

Nutrition Module.

Storage.

UI Components.

---

## Gatilho

Usuário utiliza pesquisa.

---

## Pré-condições

Meals existentes.

---

## Fluxo Principal

Pesquisar.

↓

Aplicar filtros.

↓

Ordenar resultados.

↓

Render.

---

## Fluxos Alternativos

Nenhum resultado.

↓

Empty State.

↓

Sugerir Biblioteca.

---

## Eventos Publicados

nutrition:searched

---

## Validações

Texto válido.

Filtros válidos.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Pesquisando.

Resultados.

Sem resultados.

Erro.

---

## Rollback

Falha.

↓

Reexecutar pesquisa.

---

## Erros Esperados

Pesquisa vazia.

↓

Exibir histórico completo.

---

## Critérios de Sucesso

Resultados corretos.

Pesquisa instantânea.

---

## Critérios de Aceitação

✓ Pesquisa rápida.

✓ Funciona offline.

---

## Diagrama

```

Pesquisa

↓

Storage

↓

Filtros

↓

Render

```

---

# FLW-039

## Compartilhar Relatório

---

## Objetivo

Permitir compartilhar relatórios gerados pelo sistema.

---

## Participantes

Export Module.

Metrics Engine.

UI Components.

Sistema Operacional.

---

## Gatilho

Usuário seleciona Compartilhar.

---

## Pré-condições

Relatório disponível.

---

## Fluxo Principal

Selecionar relatório.

↓

Gerar arquivo.

↓

Sistema Compartilhar.

↓

Escolher destino.

↓

Compartilhamento concluído.

---

## Fluxos Alternativos

Cancelar.

↓

Retornar.

---

## Eventos Publicados

report:shared

export:completed

---

## Validações

Arquivo válido.

Formato suportado.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Relatório temporário.

---

## Estados da Interface

Gerando.

Compartilhando.

Concluído.

Erro.

---

## Rollback

Falha.

↓

Excluir arquivo temporário.

---

## Erros Esperados

Aplicativo indisponível.

↓

Permitir salvar localmente.

---

## Critérios de Sucesso

Relatório compartilhado.

---

## Critérios de Aceitação

✓ Compartilhamento funcionando.

✓ Arquivo íntegro.

---

## Diagrama

```

Relatório

↓

Export

↓

Sistema

↓

Compartilhar

```

---

# FLW-040

## Restaurar Configurações Padrão

---

## Objetivo

Restaurar todas as preferências do aplicativo para seus valores originais.

Sem alterar dados do usuário.

---

## Participantes

Settings Module.

Storage.

Theme Engine.

UI Components.

---

## Gatilho

Usuário seleciona Restaurar Configurações.

---

## Pré-condições

Settings existentes.

---

## Fluxo Principal

Selecionar restaurar.

↓

Confirmação.

↓

Storage.restoreSettings().

↓

settings:updated.

↓

Atualizar Interface.

↓

Render.

---

## Fluxos Alternativos

Cancelar.

↓

Retornar.

---

## Eventos Publicados

settings:updated

theme:changed

---

## Validações

Confirmação obrigatória.

---

## Entidades Alteradas

Settings.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Confirmando.

Restaurando.

Concluído.

Erro.

---

## Rollback

Falha.

↓

Restaurar Settings anteriores.

↓

Atualizar Interface.

---

## Erros Esperados

Falha de persistência.

↓

Permitir nova tentativa.

---

## Critérios de Sucesso

Configurações restauradas.

---

## Critérios de Aceitação

✓ Dados do usuário preservados.

✓ Interface atualizada.

✓ Compatível com Backup.

---

## Diagrama

```

Settings

↓

Storage

↓

Theme

↓

Render

```

# FLW-041

## Tratamento Global de Erros

---

## Objetivo

Garantir que qualquer erro ocorrido na aplicação seja tratado de forma segura, previsível e sem comprometer os dados do usuário.

---

## Participantes

Error Handler.

Event Bus.

UI Components.

Logger.

Todos os módulos.

---

## Gatilho

Qualquer exceção não tratada.

---

## Pré-condições

Aplicação inicializada.

---

## Fluxo Principal

Erro ocorre.

↓

Capturar exceção.

↓

Registrar log.

↓

Classificar erro.

↓

Exibir mensagem amigável.

↓

Permitir continuidade da aplicação.

---

## Fluxos Alternativos

Erro crítico.

↓

Encerrar operação atual.

↓

Preservar dados.

↓

Retornar ao último estado seguro.

---

Erro recuperável.

↓

Executar recuperação automática.

↓

Continuar operação.

---

## Eventos Publicados

error:captured

error:handled

---

## Validações

Erro identificado.

Contexto disponível.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Erro.

Recuperando.

Concluído.

---

## Rollback

Restaurar último estado consistente.

↓

Atualizar Interface.

↓

Registrar log.

---

## Erros Esperados

Falha de Storage.

Erro de renderização.

Erro de validação.

Erro de comunicação.

Erro inesperado.

---

## Critérios de Sucesso

Aplicação permanece funcional.

Nenhum dado perdido.

---

## Critérios de Aceitação

✓ Nenhuma exceção interrompe a aplicação.

✓ Logs registrados.

✓ Interface permanece utilizável.

---

## Diagrama

```

Erro

↓

Error Handler

↓

Logger

↓

UI

↓

Aplicação continua

```

---

# FLW-042

## Recuperação Automática após Falha

---

## Objetivo

Restaurar automaticamente a aplicação para um estado consistente após falhas recuperáveis.

---

## Participantes

Recovery Engine.

Storage.

Metrics Engine.

Dashboard Module.

Event Bus.

---

## Gatilho

Erro recuperável.

---

## Pré-condições

Snapshot válido.

---

## Fluxo Principal

Erro detectado.

↓

Recovery Engine.

↓

Restaurar último estado consistente.

↓

Reconstruir ViewModels.

↓

Atualizar Dashboard.

↓

Render.

---

## Fluxos Alternativos

Recuperação impossível.

↓

Solicitar reinicialização.

↓

Preservar dados.

---

## Eventos Publicados

recovery:started

recovery:completed

---

## Validações

Snapshot válido.

Storage íntegro.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Dashboard.

BodyMetrics.

DailyNutrition.

---

## Estados da Interface

Recuperando.

Concluído.

Erro.

---

## Rollback

Falha durante recuperação.

↓

Restaurar Snapshot anterior.

↓

Solicitar reinício.

---

## Erros Esperados

Snapshot inválido.

↓

Cancelar recuperação.

---

Storage corrompido.

↓

Solicitar restauração de Backup.

---

## Critérios de Sucesso

Aplicação restaurada.

Dados preservados.

---

## Critérios de Aceitação

✓ Nenhuma perda de dados.

✓ Dashboard consistente.

✓ Funciona offline.

---

## Diagrama

```

Erro

↓

Recovery

↓

Storage

↓

Metrics

↓

Dashboard

↓

Render

```

---

# FLW-043

## Migração Automática do Schema

---

## Objetivo

Migrar automaticamente os dados quando houver alteração da SchemaVersion.

---

## Participantes

Migration Engine.

Storage.

Validation.

Backup Module.

Event Bus.

---

## Gatilho

SchemaVersion incompatível.

---

## Pré-condições

Storage existente.

---

## Fluxo Principal

Detectar versão.

↓

Selecionar migração.

↓

Criar Backup automático.

↓

Executar migração.

↓

Validation.

↓

Atualizar SchemaVersion.

↓

Render.

---

## Fluxos Alternativos

Migração não suportada.

↓

Cancelar.

↓

Solicitar Backup.

---

## Eventos Publicados

migration:started

migration:completed

backup:created

---

## Validações

Schema válido.

Backup criado.

Migração íntegra.

---

## Entidades Alteradas

Todas necessárias.

---

## Entidades Calculadas Atualizadas

Dashboard.

BodyMetrics.

DailyNutrition.

WeeklySummary.

---

## Estados da Interface

Migrando.

Validando.

Concluído.

Erro.

---

## Rollback

Falha durante migração.

↓

Restaurar Backup.

↓

Registrar log.

---

## Erros Esperados

Migração incompatível.

↓

Cancelar operação.

---

Backup falhou.

↓

Cancelar migração.

---

## Critérios de Sucesso

Schema atualizado.

Dados preservados.

---

## Critérios de Aceitação

✓ Migração automática.

✓ Rollback disponível.

✓ Compatível com versões suportadas.

---

## Diagrama

```

Schema

↓

Migration

↓

Backup

↓

Storage

↓

Render

```

---

# FLW-044

## Atualização Global do Dashboard

---

## Objetivo

Garantir que qualquer alteração relevante reflita imediatamente em todos os indicadores da plataforma.

---

## Participantes

Event Bus.

Metrics Engine.

Dashboard Module.

Charts Module.

Body Progress Module.

Timeline Module.

---

## Gatilho

Qualquer evento que altere dados persistentes.

---

## Pré-condições

Evento válido.

---

## Fluxo Principal

Evento publicado.

↓

Metrics.invalidate().

↓

Reconstruir ViewModels.

↓

Atualizar Dashboard.

↓

Atualizar Charts.

↓

Atualizar Body Progress.

↓

Atualizar Timeline.

↓

Render.

---

## Fluxos Alternativos

Evento não impacta indicadores.

↓

Ignorar Metrics.

↓

Atualizar apenas módulo correspondente.

---

## Eventos Consumidos

entry:updated

meal:created

meal:updated

meal:deleted

workout:created

workout:updated

workout:deleted

injection:created

goal:updated

backup:restored

---

## Validações

Evento válido.

Payload consistente.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Dashboard.

BodyMetrics.

DailyNutrition.

DailyScore.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Atualizando.

Concluído.

Erro.

---

## Rollback

Falha na reconstrução.

↓

Restaurar ViewModels anteriores.

↓

Registrar log.

---

## Erros Esperados

Evento inválido.

↓

Ignorar.

---

Falha no Metrics Engine.

↓

Manter Dashboard anterior.

↓

Registrar log.

---

## Critérios de Sucesso

Todos os módulos sincronizados.

Indicadores consistentes.

---

## Critérios de Aceitação

✓ Atualização automática.

✓ Nenhuma inconsistência visual.

✓ Sem renderizações desnecessárias.

---

## Diagrama

```

Evento

↓

Event Bus

↓

Metrics

↓

Dashboard

↓

Charts

↓

Timeline

↓

Render

```

# FLW-045

## Inicialização Completa dos Módulos

---

## Objetivo

Garantir que todos os módulos do HWP Platform sejam inicializados na ordem correta.

Evitar dependências não resolvidas.

---

## Participantes

App Shell.

Storage.

Event Bus.

Metrics Engine.

Todos os módulos.

---

## Gatilho

Inicialização da aplicação.

---

## Pré-condições

Aplicação carregada.

---

## Fluxo Principal

App Shell inicia.

↓

Storage.initialize().

↓

EventBus.initialize().

↓

Settings.initialize().

↓

Metrics.initialize().

↓

Dashboard.initialize().

↓

Diary.initialize().

↓

Nutrition.initialize().

↓

Library.initialize().

↓

Workout.initialize().

↓

Medication.initialize().

↓

Timeline.initialize().

↓

BodyProgress.initialize().

↓

Render.

---

## Fluxos Alternativos

Falha em módulo não crítico.

↓

Registrar erro.

↓

Continuar inicialização.

---

Falha em módulo crítico.

↓

Cancelar inicialização.

↓

Exibir mensagem.

---

## Eventos Publicados

app:initializing

modules:initialized

app:ready

---

## Validações

Todos os módulos registrados.

Dependências satisfeitas.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Dashboard.

BodyMetrics.

DailyNutrition.

---

## Estados da Interface

Inicializando.

Carregando.

Pronto.

Erro.

---

## Rollback

Falha crítica.

↓

Finalizar módulos iniciados.

↓

Liberar recursos.

↓

Registrar log.

---

## Erros Esperados

Dependência ausente.

↓

Cancelar inicialização.

---

Falha inesperada.

↓

Registrar log.

↓

Exibir mensagem.

---

## Critérios de Sucesso

Todos os módulos inicializados.

Interface pronta.

---

## Critérios de Aceitação

✓ Ordem respeitada.

✓ Sem dependências circulares.

✓ Sem erros no Console.

---

## Diagrama

```

App Shell

↓

Storage

↓

Event Bus

↓

Settings

↓

Metrics

↓

Modules

↓

Render

```

---

# FLW-046

## Encerramento Seguro da Aplicação

---

## Objetivo

Garantir que o encerramento da aplicação preserve completamente o estado atual.

---

## Participantes

App Shell.

Storage.

Event Bus.

Todos os módulos.

---

## Gatilho

Aplicação encerrada.

---

## Pré-condições

Aplicação inicializada.

---

## Fluxo Principal

Detectar encerramento.

↓

Salvar operações pendentes.

↓

Persistir Settings.

↓

Liberar listeners.

↓

Liberar recursos.

↓

Encerrar módulos.

---

## Fluxos Alternativos

Fechamento inesperado.

↓

Recuperar automaticamente na próxima abertura.

---

## Eventos Publicados

app:closing

app:closed

---

## Validações

Fila sincronizada.

Storage íntegro.

---

## Entidades Alteradas

PendingOperation.

Settings.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Encerrando.

Concluído.

---

## Rollback

Falha.

↓

Persistir estado mínimo.

↓

Registrar log.

---

## Erros Esperados

Falha ao persistir.

↓

Registrar recuperação automática.

---

## Critérios de Sucesso

Estado preservado.

---

## Critérios de Aceitação

✓ Nenhuma perda de dados.

✓ Recursos liberados.

---

## Diagrama

```

Aplicação

↓

Persistência

↓

Liberação

↓

Encerramento

```

---

# FLW-047

## Recuperação da Sessão

---

## Objetivo

Restaurar automaticamente o estado da interface após reabertura do aplicativo.

---

## Participantes

App Shell.

Storage.

Settings.

Dashboard Module.

Navigation Module.

---

## Gatilho

Nova abertura do aplicativo.

---

## Pré-condições

Sessão anterior existente.

---

## Fluxo Principal

Abrir aplicativo.

↓

Carregar estado salvo.

↓

Restaurar tela.

↓

Restaurar filtros.

↓

Restaurar scroll.

↓

Render.

---

## Fluxos Alternativos

Sessão inválida.

↓

Abrir Dashboard.

---

## Eventos Publicados

session:restored

---

## Validações

Sessão íntegra.

---

## Entidades Alteradas

SessionState.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Restaurando.

Concluído.

Erro.

---

## Rollback

Falha.

↓

Abrir Dashboard padrão.

---

## Erros Esperados

Sessão corrompida.

↓

Ignorar sessão.

↓

Abrir normalmente.

---

## Critérios de Sucesso

Interface restaurada.

---

## Critérios de Aceitação

✓ Estado preservado.

✓ Navegação consistente.

---

## Diagrama

```

Abrir

↓

Storage

↓

Session

↓

Render

```

---

# FLW-048

## Processamento de Eventos

---

## Objetivo

Garantir que todos os eventos publicados sejam processados de maneira consistente.

---

## Participantes

Event Bus.

Todos os módulos inscritos.

---

## Gatilho

Publicação de qualquer evento.

---

## Pré-condições

Event Bus inicializado.

---

## Fluxo Principal

Evento publicado.

↓

Validar payload.

↓

Localizar listeners.

↓

Executar listeners.

↓

Finalizar processamento.

---

## Fluxos Alternativos

Nenhum listener.

↓

Encerrar processamento.

---

Listener gera exceção.

↓

Registrar erro.

↓

Continuar processamento.

---

## Eventos Consumidos

Todos os eventos da aplicação.

---

## Eventos Publicados

Nenhum.

---

## Validações

Payload válido.

Listener registrado.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Conforme listener.

---

## Estados da Interface

Processando.

Concluído.

Erro.

---

## Rollback

Falha em listener.

↓

Cancelar apenas aquele listener.

↓

Continuar processamento.

---

## Erros Esperados

Evento desconhecido.

↓

Ignorar.

---

Payload inválido.

↓

Cancelar evento.

---

## Critérios de Sucesso

Todos os listeners executados.

---

## Critérios de Aceitação

✓ Sem bloqueios.

✓ Sem dependências circulares.

✓ Processamento consistente.

---

## Diagrama

```

Evento

↓

Event Bus

↓

Listeners

↓

Conclusão

```

# FLW-049

## Sincronização Completa da Interface

---

## Objetivo

Garantir que toda alteração realizada pelo usuário seja refletida imediatamente em todos os módulos da interface.

---

## Participantes

Event Bus.

Metrics Engine.

Dashboard Module.

Timeline Module.

Charts Module.

Body Progress Module.

Nutrition Module.

Diary Module.

UI Components.

---

## Gatilho

Qualquer alteração persistida.

---

## Pré-condições

Evento publicado.

---

## Fluxo Principal

Evento recebido.

↓

Metrics.invalidate().

↓

Reconstruir ViewModels.

↓

Atualizar módulos afetados.

↓

Renderização incremental.

↓

Interface sincronizada.

---

## Fluxos Alternativos

Evento sem impacto visual.

↓

Nenhuma renderização.

↓

Encerrar fluxo.

---

## Eventos Consumidos

Todos os eventos persistentes.

---

## Eventos Publicados

ui:synchronized

---

## Validações

Evento válido.

ViewModels consistentes.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Dashboard.

DailyNutrition.

DailyScore.

BodyMetrics.

WeeklySummary.

MonthlySummary.

---

## Estados da Interface

Atualizando.

Sincronizada.

Erro.

---

## Rollback

Falha na atualização.

↓

Restaurar ViewModel anterior.

↓

Registrar log.

---

## Erros Esperados

ViewModel inválido.

↓

Cancelar renderização.

↓

Manter estado anterior.

---

## Critérios de Sucesso

Toda Interface sincronizada.

---

## Critérios de Aceitação

✓ Nenhum módulo inconsistente.

✓ Atualização incremental.

✓ Sem renderizações completas desnecessárias.

---

## Diagrama

```

Evento

↓

Metrics

↓

ViewModels

↓

Módulos

↓

Render

```

---

# FLW-050

## Recalcular Indicadores

---

## Objetivo

Reconstruir todos os indicadores derivados após alterações persistentes.

---

## Participantes

Metrics Engine.

Dashboard Module.

Charts Module.

Body Progress Module.

---

## Gatilho

Metrics.invalidate().

---

## Pré-condições

Dados persistidos.

---

## Fluxo Principal

Receber invalidação.

↓

Reconstruir DailyMetrics.

↓

Reconstruir WeeklySummary.

↓

Reconstruir MonthlySummary.

↓

Reconstruir Dashboard.

↓

Atualizar gráficos.

↓

Render.

---

## Fluxos Alternativos

Nenhum dado alterado.

↓

Cancelar reconstrução.

---

## Eventos Publicados

metrics:recalculated

---

## Validações

Dados íntegros.

ViewModels válidos.

---

## Entidades Alteradas

Nenhuma.

---

## Entidades Calculadas Atualizadas

Todas.

---

## Estados da Interface

Calculando.

Atualizando.

Concluído.

---

## Rollback

Falha.

↓

Restaurar ViewModels anteriores.

---

## Erros Esperados

Falha de cálculo.

↓

Registrar log.

↓

Manter indicadores anteriores.

---

## Critérios de Sucesso

Indicadores consistentes.

---

## Critérios de Aceitação

✓ Nenhuma inconsistência.

✓ Processamento rápido.

✓ Sem persistência de cálculos.

---

## Diagrama

```

Invalidate

↓

Metrics

↓

Dashboard

↓

Charts

↓

Render

```

---

# FLW-051

## Navegação Entre Módulos

---

## Objetivo

Permitir navegação rápida e consistente entre todas as áreas do aplicativo.

---

## Participantes

Navigation Module.

UI Components.

Settings Module.

---

## Gatilho

Usuário altera aba ou menu.

---

## Pré-condições

Aplicação inicializada.

---

## Fluxo Principal

Selecionar módulo.

↓

Validation.

↓

Carregar View.

↓

Restaurar estado anterior.

↓

Render.

---

## Fluxos Alternativos

Primeiro acesso.

↓

Inicializar módulo.

↓

Render.

---

## Eventos Publicados

navigation:changed

module:opened

---

## Validações

Módulo existente.

Permissões válidas.

---

## Entidades Alteradas

SessionState.

---

## Entidades Calculadas Atualizadas

Nenhuma.

---

## Estados da Interface

Carregando.

Pronto.

Erro.

---

## Rollback

Falha.

↓

Retornar módulo anterior.

---

## Erros Esperados

Módulo inexistente.

↓

Cancelar navegação.

---

## Critérios de Sucesso

Nova tela carregada.

---

## Critérios de Aceitação

✓ Navegação instantânea.

✓ Estado preservado.

✓ Sem perda de contexto.

---

## Diagrama

```

Selecionar Módulo

↓

Navigation

↓

View

↓

Render

```

---

# FLW-052

## Encadeamento de Operações

---

## Objetivo

Padronizar todas as operações que modificam dados da aplicação.

---

## Participantes

Validation.

Storage.

Event Bus.

Metrics Engine.

UI Components.

---

## Gatilho

Qualquer operação de escrita.

---

## Pré-condições

Operação válida.

---

## Fluxo Principal

Receber solicitação.

↓

Validation.

↓

BEGIN TRANSACTION.

↓

Persistência.

↓

Publicar eventos.

↓

Metrics.invalidate().

↓

Atualizar Interface.

↓

COMMIT.

↓

Render.

---

## Fluxos Alternativos

Falha em qualquer etapa.

↓

ROLLBACK.

↓

Restaurar estado anterior.

↓

Registrar log.

↓

Exibir mensagem.

---

## Eventos Publicados

transaction:started

transaction:committed

transaction:rolledback

---

## Validações

Operação válida.

Entidade existente.

Payload consistente.

---

## Entidades Alteradas

Conforme operação.

---

## Entidades Calculadas Atualizadas

Conforme operação.

---

## Estados da Interface

Processando.

Concluído.

Erro.

---

## Rollback

Obrigatório.

Todas as operações deverão suportar rollback.

---

## Erros Esperados

Falha na validação.

↓

Cancelar operação.

---

Falha na persistência.

↓

Rollback.

---

Falha no Metrics Engine.

↓

Rollback.

---

Falha na Interface.

↓

Rollback parcial da renderização.

---

## Critérios de Sucesso

Operação concluída integralmente.

---

## Critérios de Aceitação

✓ Toda operação é transacional.

✓ Nenhuma inconsistência.

✓ Eventos publicados apenas após persistência.

---

## Diagrama

```

Validation

↓

BEGIN TRANSACTION

↓

Storage

↓

Event Bus

↓

Metrics

↓

Render

↓

COMMIT

```

# FLW-053

## Recuperação após Encerramento Inesperado

---

## Objetivo

Garantir que o HWP Platform recupere automaticamente a última sessão consistente após encerramento inesperado da aplicação.

---

## Participantes

App Shell.

Recovery Engine.

Storage.

Metrics Engine.

Dashboard Module.

Navigation Module.

Event Bus.

---

## Gatilho

Abertura do aplicativo após encerramento inesperado.

---

## Pré-condições

RecoverySnapshot disponível.

---

## Fluxo Principal

Abrir aplicativo.

↓

Detectar encerramento inesperado.

↓

Carregar RecoverySnapshot.

↓

Validar integridade.

↓

Restaurar estado.

↓

Reconstruir ViewModels.

↓

Atualizar Dashboard.

↓

Atualizar Interface.

↓

Render.

---

## Fluxos Alternativos

Snapshot inexistente.

↓

Inicialização normal.

---

Snapshot inválido.

↓

Ignorar Snapshot.

↓

Registrar log.

↓

Inicialização normal.

---

## Eventos Publicados

recovery:started

recovery:completed

app:ready

---

## Validações

Snapshot íntegro.

SchemaVersion compatível.

---

## Entidades Alteradas

SessionState.

---

## Entidades Calculadas Atualizadas

Dashboard.

BodyMetrics.

DailyNutrition.

DailyScore.

---

## Estados da Interface

Recuperando.

Concluído.

Erro.

---

## Rollback

Falha.

↓

Descartar Snapshot.

↓

Inicialização padrão.

---

## Erros Esperados

Snapshot corrompido.

↓

Ignorar.

---

Storage inconsistente.

↓

Solicitar restauração de Backup.

---

## Critérios de Sucesso

Sessão restaurada.

Nenhuma perda de dados.

---

## Critérios de Aceitação

✓ Recuperação automática.

✓ Nenhuma inconsistência.

✓ Compatível com modo Offline.

---

## Diagrama

```

Abrir App

↓

Recovery Engine

↓

Storage

↓

Metrics

↓

Dashboard

↓

Render

```

---

# FLW-054

## Fluxo Universal de Operações

---

## Objetivo

Definir o comportamento padrão para qualquer operação do HWP Platform.

Este fluxo deverá ser seguido por todos os módulos.

---

## Participantes

Validation.

Storage.

Event Bus.

Metrics Engine.

UI Components.

Logger.

Recovery Engine.

---

## Gatilho

Qualquer operação que altere dados.

---

## Pré-condições

Aplicação inicializada.

---

## Fluxo Principal

Receber solicitação.

↓

Validation.

↓

BEGIN TRANSACTION.

↓

Persistência.

↓

Publicar Eventos.

↓

Metrics.invalidate().

↓

Reconstruir ViewModels.

↓

Atualizar Interface.

↓

COMMIT.

↓

Render.

---

## Fluxos Alternativos

Falha na Validation.

↓

Cancelar operação.

---

Falha na Persistência.

↓

ROLLBACK.

---

Falha nos Eventos.

↓

ROLLBACK.

---

Falha no Metrics Engine.

↓

ROLLBACK.

---

Falha na Renderização.

↓

Restaurar Interface.

↓

COMMIT já realizado.

---

## Eventos Publicados

transaction:started

transaction:committed

transaction:rolledback

ui:updated

---

## Validações

Payload.

Entidade.

Storage.

Permissões.

Schema.

---

## Entidades Alteradas

Conforme operação.

---

## Entidades Calculadas Atualizadas

Conforme operação.

---

## Estados da Interface

Validando.

Persistindo.

Atualizando.

Concluído.

Erro.

---

## Rollback

Obrigatório.

Toda operação deverá possuir rollback documentado.

---

## Erros Esperados

ValidationError.

StorageError.

MetricsError.

RenderError.

UnexpectedError.

---

## Critérios de Sucesso

Operação concluída integralmente.

Todos os módulos sincronizados.

Interface consistente.

---

## Critérios de Aceitação

✓ Fluxo seguido por todos os módulos.

✓ Nenhuma inconsistência.

✓ Nenhuma atualização parcial.

✓ Eventos publicados corretamente.

---

## Diagrama

```

Solicitação

↓

Validation

↓

BEGIN TRANSACTION

↓

Storage

↓

Event Bus

↓

Metrics

↓

ViewModels

↓

Render

↓

COMMIT

```

---

# FLW-055

## Encerramento Completo de Operação

---

## Objetivo

Garantir que toda operação finalize em um estado consistente.

---

## Participantes

Storage.

Metrics.

Dashboard.

Logger.

Event Bus.

---

## Gatilho

Final de qualquer operação.

---

## Pré-condições

Operação concluída.

---

## Fluxo Principal

Confirmar persistência.

↓

Confirmar eventos.

↓

Confirmar Metrics.

↓

Confirmar Interface.

↓

Registrar sucesso.

↓

Liberar recursos.

↓

Encerrar operação.

---

## Fluxos Alternativos

Erro.

↓

Rollback.

↓

Registrar erro.

↓

Liberar recursos.

---

## Eventos Publicados

operation:completed

operation:failed

---

## Validações

Persistência confirmada.

Interface consistente.

---

## Critérios de Sucesso

Sistema consistente.

---

## Critérios de Aceitação

✓ Recursos liberados.

✓ Nenhum listener órfão.

✓ Nenhum vazamento de memória.

---

## Diagrama

```

Persistência

↓

Eventos

↓

Metrics

↓

Render

↓

Finalizar

```

---

# PRINCÍPIOS GERAIS DOS FLUXOS

Todos os fluxos do HWP Platform deverão seguir obrigatoriamente os princípios abaixo.

---

## Responsabilidade Única

Cada fluxo deverá executar apenas uma responsabilidade principal.

---

## Idempotência

Sempre que possível.

Executar o mesmo fluxo duas vezes deverá produzir o mesmo resultado.

---

## Atomicidade

Operações de escrita deverão ser transacionais.

---

## Consistência

Nenhum módulo poderá permanecer desatualizado após uma operação.

---

## Isolamento

Fluxos independentes não deverão interferir entre si.

---

## Durabilidade

Toda operação confirmada deverá permanecer persistida.

---

## Reatividade

A interface deverá reagir automaticamente às alterações.

---

## Baixo Acoplamento

Toda comunicação deverá ocorrer pelo Event Bus.

---

## Performance

Sempre priorizar renderização incremental.

Nunca renderizar toda a Interface sem necessidade.

---

## Offline First

Todos os fluxos possíveis deverão funcionar sem conexão.

---

# CHECKLIST PARA O CODEX

Antes de implementar qualquer fluxo verificar.

☐ Objetivo definido.

☐ Participantes definidos.

☐ Gatilho definido.

☐ Pré-condições definidas.

☐ Fluxo Principal completo.

☐ Fluxos Alternativos definidos.

☐ Eventos documentados.

☐ Validações definidas.

☐ Rollback documentado.

☐ Critérios de Sucesso definidos.

☐ Critérios de Aceitação definidos.

☐ Diagrama incluído.

☐ Compatível com Event Bus.

☐ Compatível com Metrics Engine.

☐ Compatível com Storage.

☐ Compatível com modo Offline.

---

# HISTÓRICO DO DOCUMENTO

## Versão 3.0

Primeira especificação oficial dos Fluxos Operacionais da HWP Platform.

Inclui:

- Fluxos do usuário.
- Fluxos internos.
- Fluxos transacionais.
- Fluxos de recuperação.
- Fluxos de sincronização.
- Fluxos de infraestrutura.
- Fluxo universal de operações.

---

# DOCUMENTO CONCLUÍDO

Este documento representa a especificação oficial do comportamento operacional da HWP Platform 3.0.

Toda implementação deverá seguir rigorosamente os fluxos aqui definidos.

Alterações futuras deverão ser realizadas através de revisão deste documento.

# FIM DO DOCUMENTO