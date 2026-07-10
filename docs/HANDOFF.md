# HWP Platform 3.0 — Documento de Handoff

> Gerado em 2026-07-10, atualizado em 2026-07-10 (após WP 3.5 "Favorite Meals", WP 3.6 "Meal Plans" e o Work Package "Production Readiness" / Release 1.0 RC), para permitir que uma nova sessão do Claude Code continue o projeto exatamente de onde parou. Leia este documento por completo antes de tocar em qualquer código.

---

## 1. O que é este projeto

**Health Weight Pro (HWP Platform 3.0)** é um app **offline-first**, **local-first** (sem backend, sem conta de usuário, tudo em IndexedDB no navegador) para acompanhamento de saúde/peso: refeições, peso, medidas corporais, medicação (tirzepatida), hábitos diários (água/sono/passos) e configurações.

- Stack: **Vanilla JS (ES Modules)** + **Vite**, **sem TypeScript**, **sem framework de UI** (React/Vue/etc.). Telas são funções puras que retornam strings de template literal HTML.
- PWA com Service Worker (cache-first, apenas same-origin a partir da Release 1.0 RC — ver seção 5) e manifest.
- Repositório local em `C:\Users\Felipe\Documents\HWP Plataform 3.0`.
- **`.git` existe mas está vazio (não inicializado de fato)** — não há histórico de commits para consultar. Todo o histórico de Work Packages vive apenas na memória do Claude Code e neste documento.

---

## 2. Product Principles (Filosofia do Produto)

Confirmados pelo usuário em 2026-07-08. **Permanentes** — orientam toda decisão futura de UX/implementação. Reforçados explicitamente pela Release 1.0 RC: **nenhuma feature nova, nenhum redesenho, apenas polimento** a partir de agora, até que o usuário abra um novo Work Package de feature.

### Princípio central
> **"A aplicação deve minimizar o esforço do usuário. A tecnologia é quem faz o trabalho."**

Preferir sempre automação, inferência e valores padrão inteligentes a pedir entrada manual de dados quando o app puder razoavelmente fazer isso pelo usuário (ex.: importar HWP_FOOD em vez de digitar macros manualmente; registrar uma Favorite Meal ou um Meal Plan inteiro em um único toque).

### Demais princípios em vigor
- **Local-first / offline-first por design**: sem backend, sem conta, sem sincronização em nuvem.
- **Privacidade por padrão**: nenhum dado de saúde do usuário sai do dispositivo automaticamente. IA é sempre "copiar prompt / colar resposta" fora do app.
- **Desacoplamento Nutrição/IA (decisão permanente)**: o app **apenas consome** HWP_FOOD, nunca chama uma API de IA. Ver `src/modules/meal-journal/utils/hwpFoodParser.js` + `src/config/prompts/nutriIaPrompt.js`.
- **Alimentos brasileiros como prioridade de dados** no catálogo inicial.
- **Nunca usar diálogos nativos do navegador**: `alert()`, `confirm()`, `prompt()` são proibidos — sempre `.bottom-sheet` / `showToast()`.
- **Nutrição nunca é duplicada**: Favorite Meals referenciam Food Library por `foodCode` (fallback `id` para alimentos sem `foodCode`, ver seção 9); Meal Plans referenciam Favorite Meals por `favoriteMealId`. Nenhum dos dois armazena valores nutricionais próprios — tudo é recalculado dinamicamente em tempo de render/registro.

---

## 3. Frozen Architecture (Arquitetura Congelada)

Confirmada pelo usuário em 2026-07-08, **reforçada explicitamente como intocável** pelo Work Package "Production Readiness" (Release 1.0 RC: "Preserve completely… Do not redesign anything").

- **Clean Architecture** em camadas: `domain` → `infrastructure` → `presentation`/`modules` → `app`.
- **MVVM**: cada módulo tem `entities/`, `repositories/`, `viewmodels/`, `screens/` (alguns também `utils/` ou `services/` quando fazem sentido — ex. `favorites/services/registerFavoriteMeal.js`, `favorites/utils/favoriteMealNutrition.js`, `meal-plans/utils/mealPlanNutrition.js`).
- **Repository Pattern**: `GenericRepository` genérico + `RepositoryFactory` + repositórios específicos por módulo.
- **Dependency Injection manual**: `src/app/createApplication.js` / `src/app/createCoreMvpModules.js`.
- **Event Bus**: `src/core/events/EventBus.js`.
- **IndexedDB** como única persistência, via `src/infrastructure/storage/` (migrações versionadas aditivas em `storageMigrations.js`, hoje em `DATABASE_VERSION = 6`).
- **Novo registry canônico (WP 3.6, não é uma exceção à arquitetura congelada — é uma constante compartilhada, não uma nova camada)**: `src/shared/constants/mealSlots.js` define `MANDATORY_MEAL_SLOTS`, `OPTIONAL_MEAL_SLOTS`, `ALL_MEAL_SLOTS`, `getEnabledMealSlots(settings)` e `getMealSlotLabelKey(mealType)`. É a única fonte de verdade para o vocabulário de "meal slot" usado por Meal Journal, Favorite Meals (campo `category`), Meal Plans (campo `mealSlot`), Nutri IA+ e Settings ("Visible Meal Slots"). **Não duplicar essa lista em nenhum outro arquivo.**
- **Registries vazios intencionais**: `src/domain/engines/index.js` e `src/domain/repositories/index.js` continuam como pontos de extensão futuros — ainda não implementados, ainda não são código morto.
- **Pastas de módulo vazias intencionais**: `src/modules/ai`, `body`, `goals`, `nutrition`, `workout` continuam vazias — marcos futuros do roadmap de longo prazo, fora do escopo do Core MVP.
- **Vanilla JS + templates literais**: nenhuma proposta de migrar para React/Vue/Svelte/TypeScript sem pedido explícito do usuário.

### Regra de ouro sobre docs vs. código
- `docs/01_ARCHITECTURE.md` até `docs/17_RELEASE_BACKLOG.md` + `PRD.md` descrevem a **visão de longo prazo**. `src/` implementa apenas o **Core MVP** atual (agora considerado **feature complete** pela Release 1.0 RC — ver seção 6).
- **Não reportar como bug** "módulo X descrito nos docs mas não implementado" — é o estado esperado e aprovado.

---

## 4. Processo de trabalho (Work Packages)

Inalterado desde a versão anterior deste handoff. Resumo:

- Não existe backlog documentado. Cada WP é colado inteiro pelo usuário, com **Objective / Architecture / requisitos / "Do Not Implement" / Definition of Done**.
- Regras de execução confirmadas como corretas: (1) se um anexo referenciado não existir, parar e perguntar; (2) implementar apenas o escopo declarado; (3) **verificar de fato** rodando a aplicação (preview tools) e checando console/lint, não apenas afirmar; (4) **parar imediatamente** após concluir o WP declarado.
- **A partir da Release 1.0 RC, há uma regra adicional explícita do próprio usuário**: nenhuma feature nova, nenhum redesenho de arquitetura, nenhuma mudança de regra de negócio — qualquer WP futuro (se vier a existir) precisa ser explicitamente etiquetado como tal pelo usuário; do contrário, presumir que se trata de correção/polimento dentro do que já existe.

---

## 5. Work Packages concluídos até agora

| WP | Título / Escopo | Status |
|---|---|---|
| **3.1** | Branding & Visual Identity | ✅ Concluído e aprovado |
| **3.3.1** | Fluxo Nutri IA / cópia de prompt / importação via HWP_FOOD no FAB | ✅ Concluído |
| **3.4** | Food Library (CRUD, catálogo inicial, integração com Meal Journal) | ✅ Concluído |
| **3.4.1** | Refinamentos sobre Food Library | ✅ Concluído e aprovado |
| **3.4.2** | Core Stabilization (versionamento de catálogo, Developer Mode, fix de Event Bus, fix de cache do SW) | ✅ Concluído, verificado ao vivo |
| **3.5** | **Favorite Meals** (ver detalhamento abaixo) | ✅ Concluído, verificado ao vivo |
| **3.6** | **Meal Plans + Configurable Meal Slots** (ver detalhamento abaixo) | ✅ Concluído, verificado ao vivo |
| **Release 1.0 RC** | **Production Readiness** (ver detalhamento abaixo) | ✅ Concluído, verificado ao vivo |

### Detalhamento do WP 3.5 — Favorite Meals

**Conceito**: uma Favorite Meal é uma receita reutilizável — referencia alimentos da Food Library (nunca duplica nutrição), nunca é ela própria um alimento nem uma entrada do Meal Journal.

**Entregue**:
- `src/modules/favorites/entities/FavoriteMeal.js` — entidade com `id, name, category, items[{foodCode, quantity, servingUnit}], usageCount, lastUsedAt, createdAt, updatedAt`. `foodCode` no item é `food.foodCode ?? food.id` (fallback para alimentos personalizados sem `foodCode` real).
- `FavoriteMealsRepository` (store `favorite_meals`, migração v5) + `FavoriteMealsViewModel` (máquina de estados do wizard) + `FavoritesScreen.js`.
- Tela substitui o placeholder antigo: busca + filtro de categoria + ordenação (ver WP 3.6) + grid de cards (nome, categoria, nº de alimentos, calorias/proteína estimadas) + empty state elegante.
- Wizard de criação em 3 passos: **detalhes (nome+categoria) → buscar/selecionar alimentos + quantidade → preview com totais dinâmicos → salvar**. Edição reusa o mesmo wizard. Exclusão via diálogo customizado (nunca `confirm()`).
- **Registro em um toque**: tocar no card cria um `MealEntry` com a data de hoje, mapeando a categoria da favorita para um `mealSlot`, atualiza `usageCount`/`lastUsedAt`, publica eventos, mostra toast de sucesso. Dashboard/Meal Journal atualizam automaticamente via `AppViewModel#refreshAfterAction`.
- **Integração com Nutri IA+**: após um import bem-sucedido, um painel de sucesso oferece "⭐ Save as Favorite Meal" — cria um alimento personalizado na Food Library com os macros importados e abre o wizard pré-preenchido (usuário só informa nome+categoria).

### Detalhamento do WP 3.6 — Meal Plans + Configurable Meal Slots

**Conceito**: `Food → Favorite Meal → Meal Plan → Meal Journal`. Um Meal Plan organiza Favorite Meals em um plano diário reutilizável; nunca duplica nutrição (referencia por `favoriteMealId`, recalcula tudo dinamicamente).

**Entregue**:
- `src/modules/meal-plans/entities/MealPlan.js` — `id, name, description, meals[{favoriteMealId, mealSlot}], createdAt, updatedAt`. Sem valores nutricionais armazenados.
- `MealPlansRepository` (store `meal_plans`, migração v6) + `MealPlansViewModel` + `MealPlansScreen.js`, mesmo padrão de wizard 3 passos (detalhes → selecionar Favorite Meals + atribuir slot → preview → salvar).
- **Registro em um toque**: registra todas as Favorite Meals do plano de uma vez (gera um `MealEntry` por refeição do plano, incrementa `usageCount`/`lastUsedAt` de cada Favorite Meal envolvida via o serviço compartilhado `src/modules/favorites/services/registerFavoriteMeal.js`), mostra toast único, atualiza Dashboard/Meal Journal/Goals.
- Acessível pelo FAB → Register Meal → "🍽️ Meal Plans" (rota `/meal-plans`, oculta da navegação principal, mesmo padrão de Favorites/Food Library).
- **Favorite Meal Sorting**: ⭐ Most Used (padrão) / 🕒 Recently Used / 🔤 Alphabetical na tela de Favorites. Preferência persistida na store `metadata` (`favorites:sort-option`). Registrar uma Favorite Meal (direto ou via Meal Plan) sempre incrementa `usageCount` e atualiza `lastUsedAt`.
- **Configurable Meal Slots**: novo registry canônico (`src/shared/constants/mealSlots.js`) com 3 slots obrigatórios (Breakfast/Lunch/Dinner, sempre visíveis) + 5 opcionais (Morning Snack/Afternoon Snack/Pre Workout/Post Workout/Supper, desabilitados por padrão). Nova seção "Visible Meal Slots" em Settings (`AppSettings.mealSlots`, padrão de checkbox igual ao `dashboardCards`). Slots desabilitados são ocultados no seletor do Meal Journal, no seletor de categoria de Favorite Meals e no seletor de slot de Meal Plans — **a lógica de negócio não muda, apenas a visibilidade** (um registro existente com um slot desabilitado continua sendo exibido corretamente como opção extra ao editar, para não mudar o valor silenciosamente).
- `hwpFoodParser.js` (Nutri IA+) agora reconhece o vocabulário canônico completo de slots (case-insensitive, preservando o texto do prompt em si — "Do not modify Nutri IA+" foi respeitado, só a lista de reconhecimento cresceu).

### Detalhamento do Work Package "Production Readiness" (Release 1.0 RC)

**Objetivo**: transformar o Core MVP em algo pronto para uso diário real — **sem nenhuma feature nova, sem redesenho**. Auditoria + correções objetivamente benéficas.

**Corrigido (bugs reais encontrados)**:
- Saudação do Dashboard mostrava "Good morning Health Weight Pro." quando `displayName` estava vazio (usava o próprio nome do app como fallback). Agora usa uma saudação sem nome (`dashboard.greetingNoName`) quando `displayName` não está configurado.
- `public/sw.js`: o `fetch` handler fazia cache-first de **qualquer** requisição GET, inclusive cross-origin, e o fallback offline (`/index.html`) se aplicava a **qualquer** requisição falha (não só navegação), o que faria uma imagem/script offline "resolver" incorretamente para o HTML do app shell. Corrigido para só cachear same-origin e só cair para `/index.html` em `event.request.mode === 'navigate'`. `CACHE_NAME` incrementado para `hwp-platform-3-shell-v4`.
- `registerServiceWorker()` usava `console.warn` bruto, fora do `Logger`. Agora recebe o `logger` da aplicação (retornado por `createApplication()`) e loga através dele, aparecendo em Developer Mode → Export Application Logs.

**Melhorado (UX/acessibilidade)**:
- **Escape fecha qualquer diálogo/bottom-sheet/wizard aberto** (FAB, Favorites, Food Library, Meal Plans, confirmação destrutiva do Developer Mode), espelhando o comportamento já existente de clique no backdrop. Implementado como um único listener global em `renderAppShell.js` (`closeTopmostDialog`), sem duplicar por tela.
- **Cards `role="button"` (Food Library, Favorite Meals, Meal Plans) agora são operáveis via teclado** (Enter/Espaço), via um único listener delegado em `root`, reaproveitando o dispatch de clique já existente (`target.click()`).
- Botões desabilitados (ex. "Review"/"Continue to Preview" com wizard vazio) agora têm um estilo visual consistente (`button:disabled` em `layout.css`) em vez do default inconsistente do navegador.

**Verificado, sem alterações necessárias**: labels de formulário, diálogos com `role`/`aria-modal`, foco visível em cards/inputs, ausência de strings hardcoded fora de `i18n.t()`, ausência de código morto real (alguns helpers como `createFavoriteMealItem`/`computeItemNutrition` são exportados mas só usados internamente ao próprio arquivo — não são "código morto", só não fazem parte de uma API pública externa; deixados como estão por não serem necessidade real de mudança).

**Regressão completa executada ao vivo** (preview tools): Dashboard → Settings (toggle de Meal Slot + reload) → Meal Journal (dropdown reflete o toggle) → Favorites (sort, registro via clique E via teclado) → Meal Plans (criar, atribuir slot, preview, salvar, registrar) → Food Library → Weight Tracking → Medication → Daily Habits (via FAB) → Developer Mode (diálogo de confirmação + Escape). Sem erros de console em nenhuma etapa (only o aviso inofensivo de WebSocket do HMR do harness de preview, não relacionado ao código da aplicação). Testado sem overflow horizontal em 320px/768px/1440px.

**`npm run lint` e `npm run build`**: limpos (0 erros; 1 warning pré-existente em `Logger.js` não relacionado a este WP).

---

## 6. Planned Work Packages / Roadmap

**A partir da Release 1.0 RC, o Core MVP é considerado feature complete pelo próprio usuário.** Não há nenhum próximo Work Package de feature conhecido ou implícito. Ao iniciar a próxima sessão:

1. **Não presumir** que existe um próximo WP de feature — pergunte ao usuário o que ele deseja fazer a seguir.
2. Se o pedido for um bug ou ajuste pontual, tratar como continuação natural da Release 1.0 RC (correção, não feature nova).
3. Itens do roadmap de visão de longo prazo (`docs/14_IMPLEMENTATION_ROADMAP.md`, `docs/PRD.md`) — Barcode Scanner, OCR, Cloud Sync, Charts/Reports, Notifications, Analytics, Health Connect/Apple Health, AI Integration Engine completo, as "13 Business Engines" — continuam **explicitamente fora de escopo** e foram reiterados como "Do Not Implement" no próprio WP de Production Readiness. Não iniciar nenhum desses sem pedido explícito e inequívoco do usuário.
4. **Lógica de auto-migração do catálogo de alimentos** (infraestrutura pronta desde WP 3.4.2, lógica de decisão ainda não implementada) continua pendente — ver seção 14.

---

## 7. Current Versions (Versões Atuais)

| Item | Valor | Onde está definido |
|---|---|---|
| **Application Version** | `3.0` | `APP_VERSION` em `src/app/localization/i18n.js` (não alterado nesta release) |
| **Database Version (IndexedDB)** | `6` | `DATABASE_VERSION` em `src/infrastructure/storage/databaseSchema.js` |
| **Starter Catalog Version** | `2` | `STARTER_FOOD_CATALOG_VERSION` em `src/data/starterFoodCatalog.js` (inalterado) |
| **Service Worker Cache** | `hwp-platform-3-shell-v4` | `CACHE_NAME` em `public/sw.js` |
| **Package version (`package.json`)** | `0.0.0` | Ainda não sincronizado com `APP_VERSION` — dívida técnica conhecida, não urgente |
| **Release label (documentação)** | `Release 1.0 RC` | `VERSION.md` — rótulo de milestone, distinto de `APP_VERSION` |

Migrações do IndexedDB até agora: v1 (stores de sistema) → v2 (Core MVP) → v3 (Daily Habits) → v4 (Food Library) → v5 (Favorite Meals) → v6 (Meal Plans). Todas aditivas, nenhuma removeu/renomeou stores existentes.

---

## 8. Estrutura de pastas (estado atual real, verificado)

```
HWP Plataform 3.0/
├── docs/
│   ├── 00_PROJECT_MANIFEST.md .. 17_RELEASE_BACKLOG.md, PRD.md, UX_GUIDELINES.md
│   ├── CHANGELOG.md              # changelog da própria documentação (não das releases do app)
│   ├── RELEASE_NOTES.md          # NOVO (Release 1.0 RC) — changelog do app, stakeholder-facing
│   └── HANDOFF.md                # ESTE ARQUIVO
├── public/
│   ├── icons/, manifest.json
│   └── sw.js                     # cache-first, agora restrito a same-origin (Release 1.0 RC)
├── src/
│   ├── app/ (createApplication.js agora expõe `logger`; createCoreMvpModules.js; localization/i18n.js; navigation/routes.js)
│   ├── core/ (events/EventBus.js, logging/Logger.js, repositories/BaseRepository.js, utils/)
│   ├── data/starterFoodCatalog.js
│   ├── domain/ (engines/, repositories/ — registries vazios intencionais)
│   ├── infrastructure/ (storage/ com DATABASE_VERSION=6; pwa/registerServiceWorker.js agora recebe `logger`)
│   ├── modules/
│   │   ├── ai, body, goals, nutrition, workout   (VAZIOS — futuro, fora de escopo)
│   │   ├── backup-restore/    ✅
│   │   ├── body-measurements/ ✅
│   │   ├── daily-habits/      ✅
│   │   ├── dashboard/         ✅
│   │   ├── developer/         ✅
│   │   ├── favorites/         ✅ (WP 3.5) — entities/repositories/screens/services/utils/viewmodels
│   │   ├── food-library/      ✅
│   │   ├── meal-journal/      ✅
│   │   ├── meal-plans/        ✅ (WP 3.6) — entities/repositories/screens/utils/viewmodels
│   │   ├── medication/        ✅
│   │   ├── settings/          ✅ (agora com seção "Visible Meal Slots")
│   │   ├── shared/            (formComponents, html, records, CrudViewModel)
│   │   └── weight-tracking/   ✅
│   ├── presentation/ (shell/renderAppShell.js — agora com listener global de Escape + Enter/Espaço; viewmodels/)
│   ├── shared/
│   │   ├── constants/mealSlots.js   # NOVO (WP 3.6) — registry canônico de meal slots
│   │   └── errors/.gitkeep
│   ├── theme/ (tokens.css, base.css, layout.css — agora com estado `:disabled` genérico para botões)
│   └── main.js
├── tests/                   # apenas .gitkeep — sem testes reais (dívida técnica conhecida)
└── VERSION.md                # ATUALIZADO nesta release (antes desatualizado, agora reflete Release 1.0 RC)
```

---

## 9. Padrões de código (seguir sempre)

Tudo o que já estava documentado neste handoff (módulo típico MVVM, dois estilos de ViewModel, convenção de Event Bus, roteamento sem framework, padrão "live-typing não re-renderiza tudo", metadata store reutilizável, diálogos/confirmações, localização, identificadores estáveis, estilo de código) **continua válido e inalterado**. Adições da Release 1.0 RC / WP 3.5-3.6:

- **Serviço compartilhado entre módulos**: quando duas ViewModels precisam da mesma operação de negócio (ex. "registrar uma Favorite Meal" usado tanto por `FavoriteMealsViewModel` quanto por `MealPlansViewModel`), extrair para `src/modules/<dono>/services/<nome>.js` em vez de duplicar a lógica. Ver `favorites/services/registerFavoriteMeal.js`.
- **Referência estável a um registro**: quando um campo precisa referenciar outro registro que pode ou não ter um identificador de catálogo estável (`foodCode`), usar o padrão `record.foodCode ?? record.id` (ver `favoriteMealNutrition.js#foodReferenceKey`) em vez de assumir que o identificador de catálogo sempre existe.
- **Vocabulário compartilhado entre módulos**: quando um conceito (como "meal slot") é usado por múltiplos módulos, definir uma única fonte de verdade em `src/shared/constants/` (não em `src/modules/shared/`, que é para utilitários de apresentação) e importar dali em todos os módulos — nunca duplicar a lista.
- **Fechamento de diálogo por teclado**: qualquer novo diálogo/bottom-sheet que siga o padrão `activeDialog` + ação `closeDialog`/`closeWizard` já ganha suporte a Escape automaticamente pelo listener global em `renderAppShell.js` — não é necessário adicionar handler de teclado por tela. Se um novo módulo usar um nome de ação diferente para fechar, adicionar uma entrada em `ESCAPE_CLOSE_ACTIONS` (mesmo arquivo).
- **Cards clicáveis (`role="button" tabindex="0"`)**: já ganham suporte a Enter/Espaço automaticamente pelo listener global em `renderAppShell.js` — não é necessário adicionar handler por tela.

---

## 10. Estado atual por módulo

| Módulo | Estado | Observações |
|---|---|---|
| `dashboard` | ✅ Completo | Saudação corrigida para não usar o nome do app como fallback (Release 1.0 RC) |
| `meal-journal` | ✅ Completo | Dropdown de `mealType` agora dinâmico, respeitando Visible Meal Slots (WP 3.6) |
| `weight-tracking` | ✅ Completo | |
| `body-measurements` | ✅ Completo | |
| `medication` | ✅ Completo | |
| `daily-habits` | ✅ Completo | |
| `food-library` | ✅ Completo | |
| `favorites` | ✅ Completo (WP 3.5) | Sort (Most Used/Recently Used/Alphabetical), registro em 1 toque, integração com Nutri IA+ |
| `meal-plans` | ✅ Completo (WP 3.6) | Wizard de 3 passos, registro em 1 toque de um plano inteiro |
| `settings` | ✅ Completo | Nova seção "Visible Meal Slots" (WP 3.6) |
| `backup-restore` | ✅ Completo | |
| `developer` | ✅ Completo | |
| `ai`, `body`, `goals`, `nutrition`, `workout` | 🔲 Vazio (futuro) | Fora de escopo, "Do Not Implement" reiterado na Release 1.0 RC |
| `domain/engines`, `domain/repositories` | 🔲 Registries vazios (futuro) | |

---

## 11. Funcionalidades implementadas (resumo funcional)

Tudo o que já estava listado permanece válido. Adições (WP 3.5 / 3.6):

- **Favorite Meals**: salvar refeições frequentes a partir da Food Library, registrar em 1 toque, ordenar por uso/recência/alfabética, criar a partir de um import do Nutri IA+.
- **Meal Plans**: organizar Favorite Meals em planos diários reutilizáveis, registrar o plano inteiro em 1 toque.
- **Visible Meal Slots**: configurar em Settings quais horários de refeição opcionais aparecem em toda a aplicação.
- **Acessibilidade de teclado**: Escape fecha diálogos; Enter/Espaço ativa cards `role="button"` (Release 1.0 RC).

---

## 12. Funcionalidades pendentes (conhecidas)

Idêntico ao handoff anterior, com Favorite Meals e Meal Plans **removidos** desta lista (agora implementados):

- **Lógica de auto-migração do catálogo de alimentos** — infraestrutura pronta, decisão automática ainda não implementada (ver seção 14).
- **Barcode Scanner, OCR, Cloud Sync, Charts/Reports, Notifications, Analytics, Health Connect/Apple Health, AI Integration Engine completo, "13 Business Engines"** — todos explicitamente fora de escopo, reiterados como "Do Not Implement" na Release 1.0 RC.

---

## 13. Known Technical Debt (Dívida Técnica Conhecida)

Atualizado — **`VERSION.md` desatualizado foi corrigido nesta release** (removido da lista). Itens que continuam válidos:

- **Sem suíte de testes automatizados** (`tests/` só tem `.gitkeep`).
- **Lógica de auto-migração do catálogo de alimentos ainda não existe** (ver seção 14).
- **Nome físico de store dessincronizado do domínio**: `CORE_MVP_STORE_NAMES.medicationApplications = 'tirzepatide_doses'` — mantido de propósito.
- **`favorites` e `meal-plans` são rotas ocultas** (`hidden: true`), acessíveis apenas via FAB → Register Meal — decisão de UX deliberada (mesma zona do FAB, não do menu principal), não um bug.
- **`.git` inicializado mas vazio** — ainda sem histórico de commits real.
- **Sem CI/pipeline automatizado** — apenas scripts locais (`npm run lint`, `npm run build`).
- **`package.json` `"version": "0.0.0"`** — ainda não sincronizado com `APP_VERSION` (`3.0`).
- **Manifest de ícones usa `"purpose": "any maskable"` combinado** em vez de variantes separadas — funciona, mas pode cortar a logo em launchers Android que aplicam a safe-zone de maskable a uma arte que não foi desenhada com essa margem. Não corrigido nesta release porque exigiria retrabalho do asset de imagem (fora do escopo de código); considerar no futuro se houver revisão de branding.

---

## 14. Future Migration Strategy (Estratégia de Migração Futura)

Idêntico ao handoff anterior — nenhuma mudança nesta release. Migrações de schema IndexedDB continuam aditivas e funcionando (agora em v6). Estratégia recomendada para auto-migração do catálogo de alimentos permanece a mesma (comparar `storedCatalogVersion` vs `STARTER_FOOD_CATALOG_VERSION` na inicialização, chamar `reimportStarterCatalog` automaticamente se desatualizado) — **ainda não implementada**, não implementar sem WP explícito.

---

## 15. Arquivos importantes criados/modificados (WP 3.5, WP 3.6 e Release 1.0 RC)

**WP 3.5 (Favorite Meals)**: `src/modules/favorites/**` (novo módulo completo), `src/infrastructure/storage/databaseSchema.js` + `storageMigrations.js` (store `favorite_meals`, v5), `src/app/createCoreMvpModules.js`, `src/app/navigation/routes.js`, `src/presentation/viewmodels/AppViewModel.js` (refresh cycle), `src/presentation/viewmodels/FabViewModel.js` (estado `nutri-ia-success`), `src/presentation/shell/renderAppShell.js` (painel de sucesso do Nutri IA+, entrada do FAB), `src/app/localization/i18n.js`, `src/theme/layout.css`.

**WP 3.6 (Meal Plans + Configurable Meal Slots)**: `src/modules/meal-plans/**` (novo módulo completo), `src/shared/constants/mealSlots.js` (novo), `src/modules/favorites/entities/FavoriteMeal.js` (usageCount/lastUsedAt, categorias expandidas), `src/modules/favorites/repositories/FavoriteMealsRepository.js` (persistência de sort option), `src/modules/favorites/services/registerFavoriteMeal.js` (novo, compartilhado), `src/modules/settings/entities/AppSettings.js` + `screens/SettingsScreen.js` (seção Visible Meal Slots), `src/modules/meal-journal/screens/MealJournalScreen.js` (dropdown dinâmico), `src/modules/meal-journal/utils/hwpFoodParser.js` (vocabulário de slots expandido), `src/infrastructure/storage/databaseSchema.js` + `storageMigrations.js` (store `meal_plans`, v6), `src/presentation/shell/renderAppShell.js` (entrada "Meal Plans" no FAB, label de slot no preview do Nutri IA+).

**Release 1.0 RC (Production Readiness)**: `src/modules/dashboard/screens/DashboardScreen.js` (fix da saudação), `public/sw.js` (fix de cache same-origin + fallback de navegação, `CACHE_NAME` → v4), `src/infrastructure/pwa/registerServiceWorker.js` (recebe `logger`), `src/app/createApplication.js` (expõe `logger`), `src/main.js` (passa `logger` para `registerServiceWorker`), `src/presentation/shell/renderAppShell.js` (listener global de Escape `closeTopmostDialog` + listener global de Enter/Espaço para `role="button"`), `src/theme/layout.css` (`button:disabled` genérico), `VERSION.md` (reescrito), `docs/RELEASE_NOTES.md` (novo), `docs/HANDOFF.md` (este arquivo).

---

## 16. Convenções adotadas (checklist rápido)

Tudo o que já estava na lista continua valendo. Adições:

- [ ] Todo novo diálogo que usa o padrão `activeDialog` + `closeDialog`/`closeWizard` já fecha com Escape automaticamente — só adicionar em `ESCAPE_CLOSE_ACTIONS` (`renderAppShell.js`) se usar um nome de ação de fechamento diferente.
- [ ] Todo card `role="button" tabindex="0"` já é ativável por Enter/Espaço automaticamente — nenhuma ação extra necessária.
- [ ] Um novo "meal slot" ou categoria de refeição nunca deve ser adicionado como uma lista paralela — sempre estender `src/shared/constants/mealSlots.js` e reusar `getEnabledMealSlots`/`getMealSlotLabelKey` em qualquer novo seletor.
- [ ] Qualquer nova store no IndexedDB precisa de uma migração aditiva nova (nunca reaproveitar um número de versão já usado) e deve ser somada ao `databaseSchema.js`.

---

## 17. O que NÃO deve ser alterado

Tudo o que já estava nesta seção continua valendo integralmente. Reforços explícitos da Release 1.0 RC:

- **Nenhuma feature nova** a partir de agora sem um Work Package explícito do usuário — isso inclui não adicionar novos cards de Dashboard, novas seções de Settings, gráficos, relatórios, notificações, ou qualquer item da lista "Do Not Implement" reiterada nesta release.
- **O vocabulário canônico de meal slots** (`src/shared/constants/mealSlots.js`) não deve ganhar uma lista paralela/duplicada em nenhum módulo novo.
- **O padrão de fechamento global de diálogo por Escape e ativação por teclado** (`renderAppShell.js`) não deve ser duplicado por tela — é intencionalmente centralizado.
- **`public/sw.js`**: qualquer mudança futura no Service Worker exige incrementar `CACHE_NAME`, exatamente como documentado desde o WP 3.4.2.

---

## 18. Próximo Work Package recomendado

**Não há nenhum próximo Work Package de feature conhecido.** A Release 1.0 RC declarou explicitamente o Core MVP como *feature complete*. Ao iniciar a próxima sessão:

1. **Perguntar ao usuário** o que ele deseja fazer a seguir — não presumir uma nova feature.
2. Se o pedido for um bug ou ajuste pontual, tratar como continuação natural da Release 1.0 RC (correção, não feature nova).
3. Se o usuário pedir uma feature genuinamente nova, ela precisa vir com um texto de Work Package explícito (Objective/Architecture/Do Not Implement/Definition of Done) — não há backlog para inferir.
