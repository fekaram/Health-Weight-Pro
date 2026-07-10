# HWP Platform 3.0

# 01 - ARCHITECTURE

Versão: 1.0

Status: Oficial

Documento obrigatório para todo desenvolvimento.

---

# Objetivo

Definir a arquitetura oficial do HWP Platform.

Este documento estabelece como o sistema será organizado.

Nenhum módulo poderá ser desenvolvido contrariando estas regras.

---

# Filosofia da Arquitetura

A arquitetura do HWP Platform deverá seguir cinco princípios fundamentais.

## 1. Responsabilidade Única

Cada módulo possui apenas uma responsabilidade.

Nunca misturar:

- Interface
- Persistência
- Regras de negócio
- Renderização
- Utilidades

---

## 2. Baixo Acoplamento

Cada módulo deverá conhecer apenas aquilo que realmente precisa.

Alterações em um módulo não deverão exigir alterações em diversos outros módulos.

---

## 3. Alta Coesão

Todas as funções de um mesmo arquivo deverão estar relacionadas.

Arquivos genéricos deverão ser evitados.

---

## 4. Modularização

O sistema deverá ser composto por pequenos módulos independentes.

Evitar arquivos superiores a aproximadamente 400 linhas.

Quando necessário, dividir o módulo.

---

## 5. Simplicidade

Sempre escolher a solução mais simples.

Não criar abstrações desnecessárias.

---

# Estrutura Oficial

```
src/

core/

modules/

ui/

utils/

assets/

styles/

spec/
```

---

# Pasta core

Responsável pela infraestrutura do sistema.

Nunca possuir interface.

Nunca possuir HTML.

Nunca possuir CSS.

---

## storage.js

Responsabilidade

Persistência.

Funções permitidas

- salvar

- ler

- atualizar

- remover

Nunca calcular indicadores.

Nunca calcular score.

Nunca calcular dashboard.

---

## metrics.js

Responsabilidade

Toda regra de negócio.

Funções:

- IMC

- Score

- Dashboard

- Tendências

- Evolução

- Forward Fill

- Metas

Nenhuma função de interface.

---

## export.js

Responsabilidade

Backup.

Exportação.

Importação.

---

## settings.js

Responsabilidade

Configurações globais.

Perfil.

Preferências.

Tema.

---

# Pasta modules

Cada módulo representa uma funcionalidade do produto.

---

## dashboard/

Responsável apenas pela tela inicial.

Nunca calcular métricas.

Obtém todas as informações através do Metrics.

---

## diary/

Registro diário.

Peso.

Circunferência.

Água.

Sono.

Passos.

Hábitos.

---

## nutrition/

Responsável pela alimentação.

Refeições.

HWP_FOOD.

Popup.

Integração com Biblioteca.

---

## library/

Biblioteca Inteligente.

Categorias.

Favoritos.

Mais utilizados.

Últimos utilizados.

---

## timeline/

Histórico completo.

Eventos.

Filtros.

Pesquisa.

---

## workout/

Treinos.

---

## medication/

Tirzepatida.

Outros medicamentos.

---

## photos/

Fotos de evolução.

---

# Pasta ui

Componentes reutilizáveis.

---

toast.js

---

modal.js

---

dialog.js

---

charts.js

---

progress.js

---

theme.js

---

Nenhum componente poderá possuir regra de negócio.

---

# Pasta utils

Funções auxiliares.

---

dates.js

Datas.

---

numbers.js

Conversões.

Arredondamentos.

---

strings.js

Texto.

---

validation.js

Validação.

---

dom.js

Manipulação do DOM.

---

# Pasta assets

Ícones.

Imagens.

Fontes.

Logotipos.

---

# Comunicação entre módulos

Fluxo oficial.

```
Usuário

↓

Interface

↓

Module

↓

Metrics

↓

Storage

↓

LocalStorage
```

Nunca permitir:

```
Dashboard

↓

LocalStorage
```

ou

```
Chart

↓

Storage
```

Toda comunicação deverá passar pelo módulo correto.

---

# Fluxo de Dados

Exemplo:

Adicionar refeição.

```
Popup

↓

nutrition.saveMeal()

↓

metrics.update()

↓

storage.save()

↓

Dashboard.update()

↓

Timeline.update()

↓

Library.update()
```

---

# Estado da Aplicação

O sistema possuirá apenas um estado.

```
AppState
```

Nenhum módulo poderá criar estados paralelos.

---

# Fonte Única da Verdade

Os dados serão armazenados apenas no Storage.

Dashboard.

Charts.

Timeline.

Biblioteca.

Nunca manterão cópias permanentes.

Sempre consultarão o estado oficial.

---

# Eventos

A comunicação entre módulos deverá ocorrer através de eventos.

Exemplo.

```
meal:added

entry:updated

weight:changed

timeline:updated

settings:changed
```

Evitar chamadas diretas entre módulos.

---

# Dependências

Dependência permitida.

```
UI

↓

Modules

↓

Metrics

↓

Storage
```

Dependência proibida.

```
Storage

↓

Dashboard
```

ou

```
Metrics

↓

HTML
```

---

# Padrão de Arquivos

Cada arquivo deverá possuir:

Cabeçalho.

Descrição.

Responsabilidade.

Dependências.

Exportações.

---

# Padrão de Funções

Funções públicas

camelCase

Exemplo.

```
getDashboard()

saveMeal()

calculateScore()

renderTimeline()
```

Funções privadas

Prefixadas por "_"

```
_calculateBMI()

_updateProgress()

_sortLibrary()
```

---

# Tratamento de Erros

Todo módulo deverá tratar erros internamente.

Nunca interromper a aplicação.

Sempre retornar mensagens amigáveis.

---

# Performance

Evitar:

Renderizações repetidas.

Consultas repetidas.

Loops desnecessários.

Sempre utilizar cache quando fizer sentido.

---

# Reutilização

Nenhuma funcionalidade deverá existir em dois lugares diferentes.

Toda lógica deverá possuir apenas uma implementação.

---

# Critérios de Aceitação

Uma arquitetura será considerada correta quando:

✓ Baixo acoplamento.

✓ Alta coesão.

✓ Responsabilidade única.

✓ Código reutilizável.

✓ Fácil manutenção.

✓ Fácil expansão.

✓ Sem dependências circulares.

---

# Regras Obrigatórias

Nunca acessar LocalStorage diretamente fora do Storage.

Nunca calcular métricas fora do Metrics.

Nunca renderizar HTML fora da UI.

Nunca misturar CSS com lógica.

Nunca misturar lógica de negócio com interface.

---
# Padrões de Desenvolvimento

Esta seção define as convenções obrigatórias para todo o código do HWP Platform.

Todos os módulos desenvolvidos deverão seguir estes padrões.

O objetivo é manter consistência, legibilidade e facilidade de manutenção durante toda a vida do projeto.

---

# Organização dos Arquivos

Cada arquivo deverá possuir a seguinte estrutura.

1. Cabeçalho.

2. Imports.

3. Constantes.

4. Tipos (quando aplicável).

5. Estado interno.

6. Funções privadas.

7. Funções públicas.

8. Inicialização.

9. Exportações.

Nunca alterar essa ordem.

---

# Convenção de Nomes

## Arquivos

Utilizar sempre **kebab-case**.

Exemplos:

dashboard-module.js

nutrition-library.js

timeline-service.js

progress-card.js

Nunca utilizar espaços.

Nunca utilizar acentos.

Nunca utilizar nomes genéricos.

---

## Classes

Utilizar PascalCase.

Exemplo.

DashboardModule

NutritionLibrary

MetricsEngine

StorageService

---

## Funções

Utilizar camelCase.

Exemplos.

calculateScore()

saveMeal()

loadProfile()

updateDashboard()

---

## Variáveis

Utilizar camelCase.

Exemplos.

dailyProtein

currentWeight

selectedMeal

currentProfile

---

## Constantes

Utilizar UPPER_SNAKE_CASE.

Exemplos.

MAX_SCORE

DEFAULT_PROFILE

CACHE_VERSION

APP_VERSION

---

## Eventos

Utilizar sempre o padrão:

```
modulo:acao
```

Exemplos.

meal:added

meal:removed

entry:updated

dashboard:refresh

settings:changed

library:updated

Nunca utilizar nomes genéricos.

---

# Estrutura das Funções

Cada função deverá possuir apenas uma responsabilidade.

Sempre que possível:

máximo de 30 linhas.

Caso ultrapasse aproximadamente 50 linhas:

avaliar extração de funções auxiliares.

---

# Comentários

Comentários deverão explicar decisões.

Nunca explicar código óbvio.

Correto:

```javascript
// Forward Fill evita que ausência de peso seja interpretada como zero.
```

Incorreto:

```javascript
// Soma dois números.
```

---

# Imports

Organização obrigatória.

1. Bibliotecas.

2. Core.

3. Modules.

4. UI.

5. Utils.

6. Assets.

Sempre nessa ordem.

---

# Estrutura dos Módulos

Todo módulo deverá exportar apenas sua API pública.

Nunca expor funções internas.

Exemplo.

```javascript
export {
    initialize,
    render,
    destroy
}
```

---

# Responsabilidade dos Métodos

Métodos públicos.

Executam ações do módulo.

Métodos privados.

Implementam detalhes internos.

Nenhum outro módulo poderá chamar métodos privados.

---

# Tratamento de Erros

Toda função pública deverá tratar exceções.

Sempre retornar mensagens compreensíveis.

Nunca interromper a execução da aplicação.

---

# Logs

Durante desenvolvimento utilizar:

console.info()

console.warn()

console.error()

Antes da Release:

remover logs desnecessários.

Nunca deixar logs temporários.

---

# Performance

Evitar:

consultas repetidas;

re-renderizações;

loops desnecessários;

criação excessiva de objetos.

Sempre reutilizar resultados quando possível.

---

# Código Morto

Nunca manter funções não utilizadas.

Nunca manter código comentado.

Utilizar o Git para histórico.

---

# TODO

Caso uma implementação precise ser adiada.

Utilizar:

```javascript
// TODO(v3.1): descrição da melhoria.
```

Nunca utilizar apenas:

TODO

Sem contexto.

---

# Versionamento

Cada Sprint deverá atualizar:

CHANGELOG.md

Versão do aplicativo.

Número da Sprint.

Nunca alterar múltiplos módulos sem necessidade.

---

# Critérios para Refatoração

Sempre considerar refatoração quando ocorrer qualquer uma das situações abaixo.

- função maior que 50 linhas;

- arquivo maior que 400 linhas;

- duplicação de código;

- dependência circular;

- responsabilidades múltiplas;

- acoplamento elevado.

---

# Revisão de Código

Antes de finalizar qualquer Sprint verificar:

✓ responsabilidade única;

✓ baixo acoplamento;

✓ alta coesão;

✓ nomenclatura consistente;

✓ ausência de duplicação;

✓ arquitetura preservada;

✓ documentação atualizada.

Nenhum código deverá ser entregue sem passar por esta revisão.

---
# Checklist para o Codex

Antes de iniciar qualquer Sprint confirme:

☐ O módulo respeita responsabilidade única.

☐ Não acessa LocalStorage diretamente.

☐ Não calcula métricas fora do Metrics.

☐ Não mistura UI com regra de negócio.

☐ Não ultrapassa o tamanho recomendado.

☐ Possui documentação.

☐ Segue os padrões deste documento.

---

# Objetivo Final

O HWP Platform deverá possuir uma arquitetura capaz de suportar novas funcionalidades durante muitos anos sem necessidade de reconstrução estrutural.

Toda nova funcionalidade deverá encaixar-se naturalmente na arquitetura definida neste documento.

# FIM DO DOCUMENTO