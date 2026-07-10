# HWP Platform 3.0

# 09 - COMPONENT LIBRARY

Versão: 1.0

Status: Oficial

Documento responsável por definir todos os componentes reutilizáveis da plataforma.

---

# Objetivo

Este documento define oficialmente a biblioteca de componentes do HWP Platform.

Nenhuma interface deverá criar componentes fora desta biblioteca sem justificativa técnica.

Todos os módulos deverão reutilizar os componentes aqui especificados.

---

# Filosofia

A biblioteca deverá seguir cinco princípios.

Reutilização.

↓

Consistência.

↓

Simplicidade.

↓

Performance.

↓

Acessibilidade.

---

# Organização

Todos os componentes deverão ser classificados em uma das categorias abaixo.

Layout.

↓

Navigation.

↓

Buttons.

↓

Inputs.

↓

Cards.

↓

Indicators.

↓

Feedback.

↓

Containers.

↓

Charts.

↓

Timeline.

↓

Specialized Components.

---

# Estrutura Oficial

Todo componente deverá possuir obrigatoriamente.

Objetivo.

↓

Responsabilidade.

↓

Propriedades.

↓

Eventos.

↓

Estados.

↓

Animações.

↓

Design Tokens.

↓

Acessibilidade.

↓

Performance.

↓

Exemplo.

↓

Critérios de Aceitação.

---

# Convenções

Todos os componentes deverão.

Ser Stateless sempre que possível.

↓

Receber dados por Props.

↓

Nunca acessar Storage diretamente.

↓

Nunca acessar Metrics Engine diretamente.

↓

Nunca conhecer Event Bus.

↓

Nunca conter regras de negócio.

---

# Hierarquia

App

↓

Screen

↓

Layout

↓

Containers

↓

Components

↓

Primitive Components

---

# Primitive Components

São os componentes básicos.

Button.

↓

Text.

↓

Icon.

↓

Card.

↓

Divider.

↓

Badge.

↓

Avatar.

↓

Chip.

↓

ProgressBar.

↓

CircularProgress.

↓

Input.

↓

Textarea.

↓

Switch.

↓

Checkbox.

↓

Radio.

↓

Slider.

↓

FAB.

↓

Toast.

↓

Snackbar.

↓

BottomSheet.

↓

Modal.

---

# Specialized Components

São compostos por Primitive Components.

MetricCard.

↓

NutritionCard.

↓

WorkoutCard.

↓

MedicationCard.

↓

TimelineCard.

↓

WeightCard.

↓

WaterCard.

↓

HabitCard.

↓

ProgressCard.

↓

SummaryCard.

↓

InsightCard.

↓

PhotoCard.

↓

FavoriteMealCard.

---

# Regras Gerais

Todo componente deverá.

Ser reutilizável.

↓

Ser independente.

↓

Ser testável.

↓

Ser desacoplado.

↓

Ser acessível.

↓

Ser responsivo.

↓

Ser compatível com Dark Mode.

↓

Ser compatível com Dynamic Type.

↓

Ser compatível com VoiceOver.

---

# Estados Oficiais

Todos os componentes deverão implementar.

Normal.

↓

Hover (Desktop).

↓

Focused.

↓

Pressed.

↓

Disabled.

↓

Loading.

↓

Success.

↓

Error.

---

# Eventos Oficiais

Quando aplicável.

onClick.

↓

onLongPress.

↓

onFocus.

↓

onBlur.

↓

onChange.

↓

onSubmit.

↓

onCancel.

↓

onDismiss.

---

# Design Tokens

Nenhum componente poderá utilizar valores fixos.

Todos deverão consumir.

Spacing Tokens.

↓

Typography Tokens.

↓

Color Tokens.

↓

Elevation Tokens.

↓

Radius Tokens.

↓

Animation Tokens.

---

# Performance

Todos os componentes deverão.

Renderizar rapidamente.

↓

Evitar reconstruções.

↓

Aceitar Memoization.

↓

Aceitar Lazy Rendering.

↓

Aceitar Virtualização quando aplicável.

---

# Objetivo Final

Construir uma biblioteca única de componentes reutilizáveis que permita desenvolver qualquer tela do HWP Platform mantendo consistência visual, performance e facilidade de manutenção.

# BUTTON COMPONENTS

---

# PrimaryButton

---

## Objetivo

Representar a ação principal da tela.

Toda tela deverá possuir no máximo um PrimaryButton visível por contexto.

---

## Responsabilidade

Executar a ação mais importante da View.

Nunca utilizar para ações secundárias.

---

## Hierarquia

Primitive Component.

---

## Dependências

ButtonBase.

↓

Typography.

↓

Icon.

↓

Design Tokens.

↓

Haptic Engine.

---

## Propriedades

label

string

Obrigatório.

---

icon

Icon

Opcional.

---

leadingIcon

boolean

Padrão.

true.

---

loading

boolean

Padrão.

false.

---

disabled

boolean

Padrão.

false.

---

fullWidth

boolean

Padrão.

true.

---

size

small

medium

large

Padrão.

large.

---

style

filled

Padrão oficial.

---

## Eventos

onClick

---

onLongPress

Opcional.

---

onFocus

Desktop.

---

onBlur

Desktop.

---

## Estados

Normal.

↓

Pressed.

↓

Focused.

↓

Loading.

↓

Disabled.

↓

Success.

↓

Error.

---

## Wireframe

```

┌─────────────────────────────┐

Salvar

└─────────────────────────────┘

```

---

## Layout

Altura.

56 px.

---

Largura.

100%.

---

Padding Horizontal.

24 px.

---

Radius.

24 px.

---

Ícone.

20 px.

---

Espaçamento.

12 px.

---

## Design Tokens

Spacing.

MD.

---

Radius.

LG.

---

Elevation.

Level 1.

---

Typography.

Title.

---

Animation.

Normal.

---

## Animações

Pressed.

Scale.

98%.

↓

100%.

---

Tempo.

120 ms.

---

Loading.

Cross Fade.

---

Success.

Check animado.

↓

Toast.

---

## Feedback Tátil

Tap.

Light.

---

Success.

Success.

---

Erro.

Warning.

---

## Acessibilidade

Accessibility Label.

Obrigatório.

---

Accessibility Hint.

Opcional.

---

Área mínima.

44 px.

---

Compatível.

VoiceOver.

↓

Dynamic Type.

↓

Keyboard.

---

## Performance

Stateless.

---

Compatível com Memoization.

---

Nunca reconstruir durante Loading.

---

## Critérios de Aceitação

✓ Full Width.

✓ Radius 24.

✓ Haptic.

✓ Loading.

✓ Disabled.

✓ VoiceOver.

---

# SecondaryButton

---

## Objetivo

Executar ações secundárias.

---

## Responsabilidade

Complementar o PrimaryButton.

---

## Wireframe

```

┌─────────────────────────────┐

Cancelar

└─────────────────────────────┘

```

---

## Diferenças

Outline.

↓

Sem sombra.

↓

Menor destaque visual.

---

## Propriedades

Mesmas do PrimaryButton.

---

## Estados

Normal.

Pressed.

Focused.

Disabled.

Loading.

---

## Tokens

Radius.

LG.

---

Typography.

Title.

---

Animation.

Normal.

---

## Critérios

✓ Outline.

✓ Full Width.

✓ Compatível com Dark Mode.

---

# TextButton

---

## Objetivo

Executar ações discretas.

---

## Wireframe

```

Editar

```

---

## Utilização

Links.

↓

Ações secundárias.

↓

Cancelar.

↓

Ver mais.

---

## Altura

44 px.

---

Padding.

16 px.

---

Sem sombra.

---

Sem fundo.

---

## Estados

Normal.

↓

Hover.

↓

Pressed.

↓

Disabled.

---

## Critérios

✓ Simples.

✓ Leve.

✓ Feedback imediato.

---

# IconButton

---

## Objetivo

Executar ações representadas apenas por ícones.

---

## Wireframe

```

┌──────┐

⚙

└──────┘

```

---

## Tamanho

48 px.

↓

48 px.

---

Radius.

24 px.

---

Ícone.

24 px.

---

## Utilização

Configurações.

↓

Pesquisa.

↓

Compartilhar.

↓

Editar.

↓

Excluir.

---

Nunca utilizar ícones ambíguos.

---

## Estados

Normal.

↓

Pressed.

↓

Focused.

↓

Disabled.

---

## Feedback

Haptic Light.

---

## Critérios

✓ Área mínima.

44 px.

✓ Ícone centralizado.

---

# FloatingActionButton (FAB)

---

## Objetivo

Executar rapidamente a principal ação da tela.

---

## Utilização

Nova Refeição.

↓

Novo Treino.

↓

Nova Foto.

↓

Adicionar Medicamento.

---

Nunca existir mais de um FAB por tela.

---

## Wireframe

```

╭───────╮

＋

╰───────╯

```

---

## Layout

Diâmetro.

64 px.

---

Radius.

32 px.

---

Posição.

Inferior direita.

---

Margem.

24 px.

---

Safe Area obrigatória.

---

## Conteúdo

Ícone.

Opcionalmente.

Texto.

---

## Estados

Normal.

↓

Pressed.

↓

Hidden.

↓

Disabled.

---

## Animações

Entrada.

Slide Up.

↓

Fade.

---

Saída.

Fade.

↓

Slide Down.

---

Tempo.

180 ms.

---

## Feedback

Haptic Success.

---

## Tokens

Elevation.

Level 2.

---

Radius.

XL.

---

Animation.

Normal.

---

## Performance

Sempre renderizado acima do conteúdo.

---

Nunca bloquear Scroll.

---

## Critérios

✓ Apenas um FAB.

✓ Safe Area.

✓ Compatível com Bottom Navigation.

✓ Compatível com Landscape.

# CARD COMPONENTS

---

# Filosofia

Os Cards representam o principal componente visual do HWP Platform.

Toda informação importante deverá ser apresentada em Cards.

Os Cards deverão transmitir organização, clareza e leitura rápida.

---

# BaseCard

---

## Objetivo

Componente base para todos os Cards da plataforma.

Não deverá ser utilizado diretamente.

Todos os demais Cards deverão herdar seu comportamento.

---

## Responsabilidade

Padronizar.

Layout.

↓

Padding.

↓

Radius.

↓

Elevation.

↓

Estados.

↓

Animações.

↓

Acessibilidade.

---

## Dependências

Container.

↓

Design Tokens.

↓

Animation Tokens.

↓

Elevation Tokens.

---

## Propriedades

padding

Spacing Token

Default

MD

---

radius

Radius Token

Default

LG

---

elevation

Elevation Token

Default

Level 1

---

clickable

boolean

Default

false

---

loading

boolean

Default

false

---

disabled

boolean

Default

false

---

selected

boolean

Default

false

---

## Estados

Normal

↓

Pressed

↓

Selected

↓

Loading

↓

Disabled

↓

Erro

---

## Layout

Padding

24 px

---

Radius

24 px

---

Largura

100%

---

Altura

Automática

---

## Animações

Entrada

Fade

+

Scale

98%

↓

100%

---

Atualização

Cross Fade

---

Tempo

180 ms

---

## Acessibilidade

Accessibility Label

Obrigatório

---

Accessibility Hint

Opcional

---

Role

Card

---

## Performance

Stateless

↓

Memoization

↓

Nunca recalcular conteúdo

---

## Critérios

✓ Radius padronizado

✓ Padding oficial

✓ Dark Mode

✓ VoiceOver

---

# MetricCard

---

## Objetivo

Exibir indicadores numéricos importantes.

---

## Utilização

Peso

↓

Calorias

↓

Proteínas

↓

Água

↓

Passos

↓

Score

---

## Wireframe

```

┌──────────────────────────────┐

Peso Atual

87,3 kg

▼ -0,4 kg

└──────────────────────────────┘

```

---

## Conteúdo

Título

↓

Valor Principal

↓

Indicador Secundário

↓

Mini Tendência

↓

Ação opcional

---

## Propriedades

title

---

value

---

subtitle

---

trend

---

icon

---

action

---

loading

---

## Altura

160 px

---

## Dependências

BaseCard

↓

Typography

↓

TrendIndicator

↓

MiniChart

---

## Estados

Normal

↓

Loading

↓

Atualizando

↓

Erro

---

## Critérios

✓ Atualização incremental

✓ Valor em destaque

✓ Tendência visível

---

# SummaryCard

---

## Objetivo

Exibir um resumo consolidado.

---

## Utilização

Resumo Diário

↓

Resumo Semanal

↓

Resumo Mensal

↓

Resumo Nutricional

---

## Wireframe

```

┌──────────────────────────────┐

Resumo

1650 kcal

132 g proteína

92 Score

└──────────────────────────────┘

```

---

## Layout

Maior que MetricCard

---

Altura

220 px

---

## Critérios

✓ Informações agrupadas

✓ Leitura rápida

---

# ProgressCard

---

## Objetivo

Mostrar progresso em direção a uma meta.

---

## Utilização

Água

↓

Proteínas

↓

Treinos

↓

Meta de Peso

↓

Passos

---

## Wireframe

```

┌──────────────────────────────┐

Água

2,3 L

████████░░

92%

└──────────────────────────────┘

```

---

## Componentes

Título

↓

Valor

↓

ProgressBar

↓

Percentual

↓

Meta

---

## Propriedades

current

---

target

---

percentage

---

progressColor

---

showPercentage

---

## Altura

170 px

---

## Critérios

✓ ProgressBar animada

✓ Percentual atualizado

---

# TimelineCard

---

## Objetivo

Representar um evento da Timeline.

---

## Wireframe

```

┌──────────────────────────────┐

🍽 Almoço

13:12

690 kcal

└──────────────────────────────┘

```

---

## Conteúdo

Ícone

↓

Título

↓

Descrição

↓

Data

↓

Hora

↓

Menu

---

## Altura

120 px

---

## Eventos

onClick

↓

onLongPress

---

## Critérios

✓ Informações cronológicas

✓ Menu contextual

---

# InsightCard

---

## Objetivo

Apresentar informações inteligentes produzidas pelo Metrics Engine.

---

## Utilização

Alertas

↓

Recomendações

↓

Conquistas

↓

Sugestões

---

## Wireframe

```

┌──────────────────────────────┐

💡 Insight

Hoje você atingiu

98% da meta

de proteínas.

└──────────────────────────────┘

```

---

## Tipos

Informação

↓

Sucesso

↓

Alerta

↓

Recomendação

---

## Propriedades

title

---

message

---

type

---

action

---

dismissible

---

## Critérios

✓ Fácil leitura

✓ Mensagem curta

✓ Apenas uma ação principal

---

# StatusCard

---

## Objetivo

Exibir rapidamente o estado atual de um processo.

---

## Utilização

Backup

↓

Offline

↓

Sincronização

↓

Importação

↓

Exportação

---

## Wireframe

```

┌──────────────────────────────┐

Status

🟢 Backup atualizado

Última execução

Hoje

14:32

└──────────────────────────────┘

```

---

## Conteúdo

Título

↓

Status

↓

Descrição

↓

Última atualização

---

## Critérios

✓ Estado sempre atualizado

✓ Ícone obrigatório

---

# EmptyStateCard

---

## Objetivo

Representar ausência de conteúdo.

---

## Wireframe

```

┌──────────────────────────────┐

📋

Nenhum registro encontrado.

[Adicionar]

└──────────────────────────────┘

```

---

## Componentes

Ilustração

↓

Título

↓

Descrição

↓

PrimaryButton

---

## Critérios

✓ Nunca deixar espaço vazio

✓ CTA obrigatório

---

# SkeletonCard

---

## Objetivo

Representar temporariamente um Card durante carregamento.

---

## Wireframe

```

██████████████████

██████████████

██████████

```

---

## Animação

Shimmer

---

## Tempo

Até substituição pelo Card real

---

## Critérios

✓ Mesmo tamanho do Card final

✓ Sem mudança brusca de layout

# INPUT COMPONENTS

---

# Filosofia

Os Inputs representam o principal meio de entrada de dados da plataforma.

Todos deverão priorizar.

Rapidez.

↓

Clareza.

↓

Poucos toques.

↓

Baixa carga cognitiva.

---

Nunca exigir preenchimento desnecessário.

---

# BaseInput

---

## Objetivo

Componente base para todos os Inputs.

Não deverá ser utilizado diretamente.

---

## Responsabilidade

Padronizar.

Layout.

↓

Estados.

↓

Validação.

↓

Acessibilidade.

↓

Feedback.

---

## Dependências

Typography.

↓

Icon.

↓

Design Tokens.

↓

Animation Tokens.

---

## Propriedades

label

string

Obrigatório.

---

placeholder

string

Opcional.

---

value

any

---

required

boolean

---

disabled

boolean

---

readonly

boolean

---

error

string

---

helperText

string

---

leadingIcon

Icon

---

trailingIcon

Icon

---

## Estados

Normal.

↓

Focused.

↓

Filled.

↓

Disabled.

↓

Loading.

↓

Error.

↓

Success.

---

## Layout

Altura mínima.

56 px.

---

Radius.

16 px.

---

Padding.

16 px.

---

## Critérios

✓ Stateless.

✓ Compatível com Form Validation.

✓ Compatível com Dark Mode.

---

# TextField

---

## Objetivo

Entrada de texto simples.

---

## Utilização

Nome.

↓

Observações curtas.

↓

Medicamentos.

↓

Tags.

---

## Wireframe

```

┌─────────────────────────────┐

Nome

_____________________

└─────────────────────────────┘

```

---

## Propriedades

maxLength

---

autoFocus

---

autoComplete

---

keyboardType

---

## Critérios

✓ Label fixa.

✓ Placeholder opcional.

✓ Erros abaixo do campo.

---

# SearchField

---

## Objetivo

Pesquisar qualquer informação.

---

## Wireframe

```

🔍

Pesquisar...

```

---

## Características

Pesquisa incremental.

---

Ícone obrigatório.

---

Botão limpar.

Opcional.

---

## Eventos

onSearch

---

onClear

---

## Performance

Pesquisa.

<50 ms.

---

# NumberField

---

## Objetivo

Receber valores numéricos.

---

## Utilização

Peso.

↓

Altura.

↓

Água.

↓

Calorias.

↓

Proteínas.

↓

Passos.

---

## Wireframe

```

Peso

87,3

kg

```

---

## Características

Teclado numérico.

---

Permitir casas decimais.

---

Máscara automática.

---

# TextArea

---

## Objetivo

Entrada de textos longos.

---

## Utilização

Observações.

↓

Diário.

↓

Notas.

---

## Layout

Altura inicial.

120 px.

---

Expansível.

---

Nunca limitar quantidade de linhas.

---

# DatePicker

---

## Objetivo

Selecionar datas.

---

## Wireframe

```

02 Jul 2026

📅

```

---

## Comportamento

Abrir calendário.

---

Nunca permitir digitação manual por padrão.

---

# TimePicker

---

## Objetivo

Selecionar horários.

---

## Wireframe

```

18:40

🕒

```

---

## Comportamento

Abrir seletor nativo.

---

Formato.

24 horas.

---

# SegmentedControl

---

## Objetivo

Selecionar rapidamente uma opção.

---

## Utilização

Hoje.

7 dias.

30 dias.

90 dias.

---

## Wireframe

```

Hoje

7d

30d

90d

```

---

## Características

Apenas uma opção ativa.

---

Troca instantânea.

---

# Switch

---

## Objetivo

Ativar ou desativar opções.

---

## Wireframe

```

Backup Automático

◉────

```

---

## Estados

Ligado.

↓

Desligado.

↓

Disabled.

---

Nunca utilizar para ações críticas.

---

# Checkbox

---

## Objetivo

Selecionar múltiplas opções.

---

## Wireframe

```

☑

Registrar Água

```

---

## Utilização

Hábitos.

↓

Filtros.

↓

Exportação.

---

# RadioButton

---

## Objetivo

Selecionar apenas uma opção.

---

## Wireframe

```

◉

Masculino

```

---

## Utilização

Sexo.

↓

Tema.

↓

Unidades.

---

# Slider

---

## Objetivo

Selecionar valores contínuos.

---

## Utilização

Intensidade.

↓

Qualidade do Sono.

↓

Escalas.

---

## Wireframe

```

●────────────

```

---

## Características

Valor exibido durante movimento.

---

Atualização em tempo real.

---

# Stepper

---

## Objetivo

Incrementar ou decrementar rapidamente um valor.

---

## Utilização

Água.

↓

Dose.

↓

Quantidade.

---

## Wireframe

```

−

2

+

```

---

## Características

Resposta imediata.

---

Haptic Light.

---

# Form Validation

---

## Objetivo

Padronizar validação.

---

Validação.

Em tempo real.

---

Nunca validar apenas no envio.

---

Mensagem.

Abaixo do campo.

---

Cor.

Alerta.

+

Ícone.

---

Nunca utilizar Popups.

---

# Feedback

Campo válido.

↓

Ícone discreto.

---

Campo inválido.

↓

Mensagem.

↓

Shake.

120 ms.

---

Campo obrigatório.

↓

Indicador visual.

---

# Performance

Atualização.

<50 ms.

---

Nunca reconstruir formulário inteiro.

---

Atualizar apenas campo alterado.

---

# Critérios de Aceitação

✓ Validação em tempo real.

✓ Compatível com Dynamic Type.

✓ Compatível com VoiceOver.

✓ Máscaras automáticas.

✓ Teclado adequado.

✓ Sem Popups de erro.

✓ Atualização incremental.

# NAVIGATION COMPONENTS

---

# Filosofia

Toda navegação do HWP Platform deverá transmitir.

Clareza.

↓

Rapidez.

↓

Previsibilidade.

↓

Baixa carga cognitiva.

↓

Sensação de aplicativo nativo.

---

Nunca permitir que o usuário fique perdido.

---

# BottomNavigation

---

## Objetivo

Permitir acesso rápido aos principais módulos da plataforma.

---

## Responsabilidade

Controlar a navegação principal.

---

## Utilização

Dashboard

↓

Diário

↓

Nutrição

↓

Evolução

↓

Configurações

---

Nunca possuir mais de cinco itens.

---

## Wireframe

```

────────────────────────────

🏠

📅

🍽

📈

⚙

────────────────────────────

```

---

## Layout

Altura.

88 px.

---

Safe Area.

Obrigatória.

---

Largura.

100%.

---

Posição.

Fixa.

---

## Item

Cada item deverá possuir.

Ícone.

↓

Título.

↓

Estado.

---

Nunca utilizar apenas ícone.

---

## Estados

Selecionado.

↓

Não Selecionado.

↓

Disabled.

↓

Badge.

---

## Badge

Utilização.

Notificações.

↓

Alertas.

↓

Pendências.

---

Nunca utilizar Badge para publicidade.

---

## Eventos

onSelect

↓

onReselect

---

## Animações

Mudança.

Cross Fade.

↓

Scale.

---

Tempo.

150 ms.

---

## Critérios

✓ Sempre visível.

✓ Safe Area.

✓ Compatível com Landscape.

---

# NavigationBar

---

## Objetivo

Representar o Header padrão.

---

## Conteúdo

Título.

↓

Subtítulo.

↓

Ações.

---

## Wireframe

```

────────────────────────────

Dashboard

Hoje

⚙

────────────────────────────

```

---

## Layout

Altura.

96 px.

---

Padding.

24 px.

---

Máximo.

2 ações.

---

Nunca utilizar mais que dois botões.

---

# Breadcrumb

---

## Objetivo

Navegação Desktop.

---

## Utilização

Desktop.

↓

iPad Expandido.

---

## Wireframe

```

Dashboard

>

Nutrição

>

Refeição

```

---

Não utilizar no iPhone.

---

# TabBar

---

## Objetivo

Alternar rapidamente entre conteúdos relacionados.

---

## Utilização

Hoje.

↓

Semana.

↓

Mês.

↓

Ano.

---

## Wireframe

```

Hoje

Semana

Mês

Ano

```

---

## Estados

Selecionado.

↓

Normal.

↓

Disabled.

---

## Critérios

✓ Troca instantânea.

✓ Sem animações exageradas.

---

# SegmentedNavigation

---

## Objetivo

Alternância rápida de modos.

---

## Utilização

Lista.

↓

Gráfico.

↓

Calendário.

---

## Wireframe

```

Lista

Gráfico

Calendário

```

---

Apenas uma opção ativa.

---

# NavigationDrawer

---

## Objetivo

Reservado para futuras versões Desktop.

---

Versão Mobile.

Não utilizar.

---

# FloatingNavigation

---

## Objetivo

Permitir navegação contextual.

---

Utilização.

Comparar Fotos.

↓

Filtros rápidos.

↓

Atalhos.

---

Nunca substituir BottomNavigation.

---

# BackButton

---

## Objetivo

Retornar para tela anterior.

---

## Wireframe

```

←

Voltar

```

---

## Estados

Normal.

↓

Pressed.

↓

Disabled.

---

## Comportamento

Sempre preservar estado da tela anterior.

---

Nunca reconstruir tela sem necessidade.

---

# SearchBar

---

## Objetivo

Permitir pesquisa global.

---

## Wireframe

```

🔍

Pesquisar...

```

---

## Componentes

Ícone.

↓

Campo.

↓

Botão limpar.

---

Pesquisa incremental.

Obrigatória.

---

# FilterBar

---

## Objetivo

Aplicar filtros rápidos.

---

## Wireframe

```

Todos

Hoje

Proteínas

Favoritos

```

---

Scroll horizontal.

---

Múltiplos filtros.

Permitidos.

---

# Pagination

---

## Objetivo

Utilização exclusiva Desktop.

---

Mobile.

Utilizar.

Scroll infinito.

---

# PageIndicator

---

## Objetivo

Representar páginas.

---

## Wireframe

```

● ○ ○ ○

```

---

Utilização.

Tutoriais.

↓

Onboarding.

↓

Carrosséis.

---

# ScrollToTopButton

---

## Objetivo

Retornar rapidamente ao topo.

---

Exibir apenas após.

500 px de Scroll.

---

Animação.

Fade.

↓

Scale.

---

# Performance

Troca de telas.

<150 ms.

---

Navegação.

Sem reconstrução completa.

---

Preservar estado.

Sempre.

---

# Critérios de Aceitação

✓ Navegação previsível.

✓ Estado preservado.

✓ Bottom Navigation fixa.

✓ Pesquisa incremental.

✓ Compatível com iPhone.

✓ Compatível com iPad.

✓ Compatível com Desktop.

✓ Compatível com VoiceOver.

✓ Compatível com Dynamic Type.

# INDICATOR COMPONENTS

---

# Filosofia

Os indicadores representam o estado atual dos dados do usuário.

Seu objetivo é permitir leitura extremamente rápida.

Todo indicador deverá comunicar seu significado em menos de um segundo.

---

# ProgressBar

---

## Objetivo

Representar visualmente o progresso até uma meta.

---

## Utilização

Água

↓

Proteínas

↓

Calorias

↓

Treinos

↓

Passos

↓

Meta de Peso

---

## Wireframe

```

████████░░

82%

```

---

## Propriedades

current

number

Obrigatório.

---

target

number

Obrigatório.

---

percentage

number

Calculado automaticamente.

---

showPercentage

boolean

Default

true

---

animated

boolean

Default

true

---

height

small

medium

large

Default

medium

---

## Layout

Largura

100%

---

Altura

8 px

---

Radius

999 px

---

## Estados

Normal

↓

Completo

↓

Excedido

↓

Loading

---

## Animações

Progressiva.

---

Tempo

250 ms.

---

## Performance

Atualizar apenas largura preenchida.

Nunca reconstruir o componente.

---

## Critérios

✓ Animado.

✓ Responsivo.

✓ Atualização incremental.

---

# CircularProgress

---

## Objetivo

Representar indicadores circulares.

---

## Utilização

Score Diário

↓

Conquistas

↓

Objetivos

---

## Wireframe

```

◉

92

```

---

## Propriedades

value

---

max

---

label

---

size

small

medium

large

---

strokeWidth

---

## Layout

Padrão

96 px

↓

96 px

---

## Estados

Normal

↓

Completo

↓

Loading

---

## Animações

Desenho progressivo.

---

Tempo

300 ms.

---

## Critérios

✓ Número centralizado.

✓ Animação suave.

---

# TrendIndicator

---

## Objetivo

Mostrar tendência.

---

## Utilização

Peso

↓

Calorias

↓

Score

↓

Proteínas

↓

Água

---

## Wireframe

```

▲ +0,7

```

---

ou

```

▼ -0,4

```

---

ou

```

▬ 0

```

---

## Tipos

Subindo

↓

Descendo

↓

Estável

---

## Propriedades

direction

---

value

---

unit

---

showIcon

---

## Critérios

✓ Sempre acompanhado por valor.

✓ Nunca utilizar apenas cor.

---

# Badge

---

## Objetivo

Destacar pequenos estados.

---

## Utilização

Novo

↓

Offline

↓

Sincronizado

↓

Premium

↓

Beta

---

## Wireframe

```

[ Novo ]

```

---

## Layout

Padding

Horizontal

12 px

Vertical

6 px

---

Radius

999 px

---

## Estados

Normal

↓

Success

↓

Warning

↓

Error

↓

Info

---

## Critérios

✓ Texto curto.

✓ Apenas um estado.

---

# Chip

---

## Objetivo

Representar filtros rápidos.

---

## Utilização

Categorias

↓

Tags

↓

Filtros

↓

Datas

---

## Wireframe

```

Proteínas

```

---

## Estados

Selecionado

↓

Não Selecionado

↓

Disabled

---

## Layout

Altura

40 px

---

Radius

20 px

---

Padding

16 px

---

## Eventos

onClick

---

onRemove

Opcional

---

## Critérios

✓ Scroll horizontal.

✓ Resposta imediata.

---

# Divider

---

## Objetivo

Separar conteúdos.

---

## Wireframe

```

────────────────────────

```

---

## Espessura

1 px

---

## Margens

16 px

↓

16 px

---

Nunca utilizar como elemento decorativo.

---

# Avatar

---

## Objetivo

Representar usuário.

---

## Wireframe

```

👤

```

---

## Tamanhos

XS

32 px

---

SM

40 px

---

MD

48 px

---

LG

64 px

---

XL

96 px

---

## Estados

Imagem

↓

Iniciais

↓

Placeholder

---

## Critérios

✓ Sempre circular.

✓ Fallback obrigatório.

---

# Icon

---

## Objetivo

Representar ações ou estados.

---

## Biblioteca

SF Symbols

Preferencial.

---

Fallback

Material Symbols Rounded.

---

## Tamanhos

16 px

20 px

24 px

32 px

48 px

---

Nunca utilizar tamanhos intermediários.

---

## Estados

Normal

↓

Disabled

↓

Highlighted

---

## Critérios

✓ Mesmo estilo em toda plataforma.

✓ Nunca misturar famílias.

---

# Statistic

---

## Objetivo

Exibir um único indicador numérico.

---

## Wireframe

```

132 g

Proteínas

```

---

## Componentes

Valor

↓

Legenda

↓

Indicador opcional

---

## Utilização

Macronutrientes

↓

Peso

↓

Dias

↓

Passos

↓

Água

---

# MiniChart

---

## Objetivo

Mostrar tendência rápida.

---

## Wireframe

```

▁▂▃▄▅▆▇█

```

---

## Utilização

Peso

↓

Score

↓

Proteínas

↓

Calorias

↓

Água

---

## Características

Sem eixos.

↓

Sem legenda.

↓

Leitura imediata.

---

# Counter

---

## Objetivo

Animar números.

---

## Utilização

Peso

↓

Calorias

↓

Passos

↓

Água

↓

Proteínas

---

## Comportamento

Valor inicial

↓

Animação

↓

Valor final

---

Tempo

300 ms

---

Nunca alterar instantaneamente.

---

# ScoreIndicator

---

## Objetivo

Representar o Score Diário.

---

## Wireframe

```

92

Excelente

```

---

## Componentes

CircularProgress

↓

Valor

↓

Categoria

---

## Categorias

Excelente

↓

Bom

↓

Regular

↓

Atenção

---

## Critérios

✓ Categoria obrigatória.

✓ Compatível com CircularProgress.

---

# StatusIndicator

---

## Objetivo

Representar rapidamente o estado de um processo.

---

## Utilização

Offline

↓

Sincronizado

↓

Backup

↓

Importação

↓

Exportação

---

## Wireframe

```

🟢

Sincronizado

```

---

## Tipos

Success

↓

Warning

↓

Error

↓

Info

↓

Neutral

---

## Critérios

✓ Ícone obrigatório.

✓ Texto obrigatório.

---

# Performance

Todos os Indicators deverão.

Renderizar em menos de

16 ms.

---

Nunca recalcular valores.

---

Receber apenas Props.

---

Compatíveis com Memoization.

---

# Critérios Gerais de Aceitação

✓ Totalmente reutilizáveis.

✓ Stateless.

✓ Compatíveis com Design Tokens.

✓ Compatíveis com Dark Mode.

✓ Compatíveis com Dynamic Type.

✓ Compatíveis com VoiceOver.

✓ Compatíveis com Memoization.

✓ Compatíveis com Renderização Incremental.

# FEEDBACK COMPONENTS

---

# Filosofia

Todo evento iniciado pelo usuário deverá gerar um feedback claro.

O usuário nunca deverá ficar em dúvida se uma ação foi executada.

Os Feedback Components deverão ser rápidos, discretos e consistentes.

---

# Toast

---

## Objetivo

Informar operações concluídas com sucesso.

---

## Utilização

Registro salvo.

↓

Backup criado.

↓

Importação concluída.

↓

Exportação concluída.

↓

Meta atingida.

---

## Wireframe

```

┌──────────────────────────────┐

✔ Registro salvo.

└──────────────────────────────┘

```

---

## Layout

Posição.

Inferior da tela.

---

Largura.

Automática.

---

Altura.

56 px.

---

Radius.

16 px.

---

## Duração

2 segundos.

---

Nunca exigir interação.

---

## Estados

Success.

↓

Info.

↓

Warning.

↓

Error.

---

## Eventos

onShow

↓

onHide

---

## Animações

Entrada.

Fade.

+

Slide Up.

---

Saída.

Fade.

↓

Slide Down.

---

Tempo.

180 ms.

---

## Feedback Tátil

Success.

↓

Light.

---

Warning.

↓

Medium.

---

Error.

↓

Heavy.

---

## Critérios

✓ Nunca bloquear interface.

✓ Fechamento automático.

✓ Compatível com VoiceOver.

---

# Snackbar

---

## Objetivo

Permitir desfazer operações.

---

## Utilização

Excluir refeição.

↓

Excluir treino.

↓

Excluir foto.

↓

Excluir medicamento.

---

## Wireframe

```

┌──────────────────────────────┐

Refeição removida.

[DESFAZER]

└──────────────────────────────┘

```

---

## Duração

5 segundos.

---

## Componentes

Mensagem.

↓

Botão.

↓

Ícone opcional.

---

## Eventos

onUndo

↓

onDismiss

---

## Critérios

✓ Sempre permitir desfazer.

✓ Nunca utilizar Popup.

---

# StatusBanner

---

## Objetivo

Exibir estados persistentes da aplicação.

---

## Utilização

Offline.

↓

Nova versão disponível.

↓

Backup pendente.

↓

Sincronização.

↓

Meta importante.

---

## Wireframe

```

────────────────────────────

🟠

Modo Offline

As alterações serão sincronizadas.

────────────────────────────

```

---

## Layout

Largura.

100%.

---

Altura.

Automática.

---

Posição.

Logo abaixo do Header.

---

## Tipos

Success.

↓

Info.

↓

Warning.

↓

Error.

↓

Neutral.

---

## Estados

Visível.

↓

Oculto.

↓

Dismissed.

---

## Critérios

✓ Não interromper navegação.

✓ Sempre reutilizável.

---

# AlertDialog

---

## Objetivo

Solicitar confirmação para ações críticas.

---

## Utilização

Excluir.

↓

Restaurar Backup.

↓

Resetar Dados.

↓

Alterações irreversíveis.

---

## Wireframe

```

Excluir refeição?

Esta ação não poderá ser desfeita.

[Cancelar]

[Excluir]

```

---

## Componentes

Título.

↓

Mensagem.

↓

Botão secundário.

↓

Botão principal.

---

## Critérios

✓ Nunca utilizar para mensagens simples.

✓ Sempre bloquear apenas a ação atual.

---

# ConfirmationDialog

---

## Objetivo

Confirmar operações importantes.

---

## Utilização

Exportação.

↓

Importação.

↓

Troca de versão.

↓

Restauração.

---

## Wireframe

```

Deseja restaurar este Backup?

[Cancelar]

[Confirmar]

```

---

# BottomSheet

---

## Objetivo

Apresentar ações contextuais.

---

## Utilização

Novo Treino.

↓

Nova Refeição.

↓

Filtros.

↓

Compartilhar.

↓

Selecionar Categoria.

---

## Wireframe

```

────────────

Nova Refeição

Biblioteca

Importar

Cancelar

────────────

```

---

## Layout

Altura.

Dinâmica.

---

Máximo.

60% da tela.

---

Radius superior.

32 px.

---

Safe Area.

Obrigatória.

---

## Animações

Entrada.

Slide Bottom.

↓

Fade.

---

Saída.

Slide Down.

---

Tempo.

220 ms.

---

## Critérios

✓ Drag para fechar.

✓ Tap fora fecha.

✓ Compatível com teclado.

---

# Modal

---

## Objetivo

Exibir conteúdos importantes.

---

## Utilização

Preview.

↓

Configurações.

↓

Comparação.

↓

Visualização.

---

## Wireframe

```

┌──────────────────────────────┐

Título

Conteúdo

[Cancelar]

[Salvar]

└──────────────────────────────┘

```

---

## Layout

Largura.

90%.

---

Altura.

Automática.

---

Máximo.

80% da tela.

---

## Animação

Fade.

+

Scale.

---

Tempo.

200 ms.

---

## Critérios

✓ Nunca utilizar para formulários extensos.

✓ Sempre possuir botão fechar.

---

# LoadingOverlay

---

## Objetivo

Bloquear temporariamente a interação durante operações críticas.

---

## Utilização

Migração.

↓

Restauração.

↓

Backup.

↓

Importação.

---

Nunca utilizar durante operações rápidas.

---

## Wireframe

```

████████████████

Carregando...

████████████████

```

---

## Componentes

Progress Indicator.

↓

Mensagem.

↓

Background translúcido.

---

## Critérios

✓ Nunca Spinner infinito.

✓ Sempre indicar progresso quando possível.

---

# EmptyState

---

## Objetivo

Comunicar ausência de conteúdo.

---

## Wireframe

```

📋

Nenhum registro encontrado.

[Adicionar]

```

---

## Componentes

Ilustração.

↓

Título.

↓

Descrição.

↓

PrimaryButton.

---

## Tipos

Primeiro acesso.

↓

Sem resultados.

↓

Pesquisa vazia.

↓

Erro recuperável.

---

# Skeleton

---

## Objetivo

Representar conteúdo durante carregamento.

---

## Wireframe

```

██████████████

████████

██████████████

```

---

## Animação

Shimmer.

---

Velocidade.

Constante.

---

## Critérios

✓ Mesmo tamanho do conteúdo final.

✓ Evitar Layout Shift.

---

# ProgressOverlay

---

## Objetivo

Exibir progresso detalhado de operações longas.

---

## Utilização

Backup.

↓

Exportação.

↓

Importação.

↓

Atualização.

---

## Wireframe

```

Importando...

████████░░

82%

```

---

## Componentes

Título.

↓

Barra.

↓

Percentual.

↓

Mensagem.

---

## Performance

Atualização.

<100 ms.

---

# Critérios Gerais

Todos os Feedback Components deverão.

✓ Ser reutilizáveis.

✓ Ser Stateless.

✓ Utilizar Design Tokens.

✓ Possuir Feedback Tátil.

✓ Ser compatíveis com Dark Mode.

✓ Ser compatíveis com Dynamic Type.

✓ Ser compatíveis com VoiceOver.

✓ Nunca bloquear desnecessariamente a interface.

✓ Respeitar Reduce Motion.

# LIST COMPONENTS

---

# Filosofia

As listas representam a principal forma de apresentar coleções de dados.

Toda lista deverá priorizar.

Leitura rápida.

↓

Baixo consumo de memória.

↓

Scroll fluido.

↓

Renderização incremental.

↓

Virtualização quando necessário.

---

Nunca carregar listas completas desnecessariamente.

---

# BaseList

---

## Objetivo

Componente base para todas as listas da plataforma.

Não deverá ser utilizado diretamente.

---

## Responsabilidade

Padronizar.

Scroll.

↓

Virtualização.

↓

Separadores.

↓

Estados.

↓

Empty State.

↓

Skeleton.

↓

Paginação.

---

## Propriedades

items

Array

Obrigatório.

---

renderItem

Function

Obrigatório.

---

keyExtractor

Function

Obrigatório.

---

loading

Boolean

---

emptyState

Component

---

separator

Boolean

Default

true

---

refreshable

Boolean

Default

false

---

onRefresh

Function

---

## Performance

Virtualização obrigatória acima de 50 itens.

---

Lazy Rendering obrigatório.

---

Memoização dos itens.

---

# TimelineList

---

## Objetivo

Exibir eventos cronológicos.

---

## Utilização

Timeline.

↓

Histórico.

↓

Registros.

---

## Item

TimelineCard

---

## Agrupamento

Hoje

↓

Ontem

↓

Últimos 7 dias

↓

Por mês

---

## Wireframe

```

Hoje

────────────

Evento

Evento

Evento

────────────

Ontem

────────────

Evento

Evento

```

---

## Critérios

✓ Agrupamento automático.

✓ Lazy Loading.

✓ Scroll infinito.

---

# MealList

---

## Objetivo

Exibir refeições.

---

## Item

FavoriteMealCard

ou

MealCard.

---

## Ordenação

Horário.

↓

Mais recente.

↓

Categoria.

---

## Critérios

✓ Atualização imediata.

✓ Compatível com filtros.

---

# WorkoutList

---

## Objetivo

Exibir treinos.

---

## Item

WorkoutCard.

---

## Ordenação

Data.

↓

Tipo.

↓

Duração.

---

# MedicationList

---

## Objetivo

Exibir medicamentos.

---

## Item

MedicationCard.

---

## Ordenação

Próxima aplicação.

↓

Nome.

↓

Status.

---

# PhotoGrid

---

## Objetivo

Exibir fotos da evolução corporal.

---

## Layout

2 colunas.

iPhone.

---

4 colunas.

iPad.

---

Grid adaptativo.

Desktop.

---

## Item

PhotoCard.

---

## Critérios

✓ Lazy Loading.

✓ Miniaturas.

✓ Zoom.

---

# GridList

---

## Objetivo

Representar listas em formato Grid.

---

## Utilização

Biblioteca.

↓

Fotos.

↓

Categorias.

↓

Templates.

---

## Colunas

Automáticas.

---

Gap

24 px.

---

# SectionList

---

## Objetivo

Agrupar conteúdos por categoria.

---

## Utilização

Biblioteca.

↓

Configurações.

↓

Timeline.

↓

Exportações.

---

## Wireframe

```

Proteínas

────────────

Frango

Patinho

Ovos

────────────

Vegetais

────────────

Brócolis

Alface

```

---

# HorizontalList

---

## Objetivo

Scroll horizontal.

---

## Utilização

Categorias.

↓

Filtros.

↓

Favoritos.

↓

Períodos.

---

## Scroll

Snap opcional.

---

Nunca bloquear scroll vertical.

---

# Carousel

---

## Objetivo

Destacar conteúdos importantes.

---

## Utilização

Insights.

↓

Conquistas.

↓

Sugestões IA.

↓

Dicas.

---

## Wireframe

```

◄

Card

►

```

---

## Indicador

● ○ ○ ○

---

# ReorderableList

---

## Objetivo

Permitir reorganização.

---

## Utilização

Hábitos.

↓

Favoritos.

↓

Atalhos.

---

## Gesto

Drag.

↓

Drop.

---

## Critérios

✓ Feedback visual.

✓ Haptic.

---

# InfiniteScroll

---

## Objetivo

Carregar grandes listas.

---

## Utilização

Timeline.

↓

Histórico.

↓

Biblioteca.

---

## Funcionamento

Scroll.

↓

Pré-carregar próxima página.

↓

Atualizar silenciosamente.

---

Nunca exibir Spinner de página inteira.

---

# RefreshControl

---

## Objetivo

Atualização manual.

---

## Wireframe

```

↓

Atualizando...

```

---

## Utilização

Dashboard.

↓

Timeline.

↓

Biblioteca.

---

Nunca obrigatório.

---

# ListSeparator

---

## Objetivo

Separar itens.

---

Espessura

1 px.

---

Margem

16 px.

---

Nunca exagerar na quantidade de separadores.

---

# ScrollController

---

## Objetivo

Controlar o comportamento do Scroll.

---

Responsabilidades.

Preservar posição.

↓

Scroll To Top.

↓

Pull To Refresh.

↓

Infinite Scroll.

↓

Scroll Restoration.

---

# Performance

Todas as listas deverão.

Virtualizar itens.

↓

Renderizar apenas elementos visíveis.

↓

Utilizar Lazy Rendering.

↓

Utilizar Memoization.

↓

Evitar re-renderizações completas.

---

# Critérios Gerais

✓ Virtualização obrigatória.

✓ Scroll 60 FPS.

✓ Lazy Loading.

✓ Infinite Scroll.

✓ Refresh opcional.

✓ Compatível com Dark Mode.

✓ Compatível com Dynamic Type.

✓ Compatível com VoiceOver.

✓ Preservação da posição do Scroll.

# DASHBOARD COMPONENTS

---

# Filosofia

Os componentes do Dashboard deverão comunicar o estado atual do usuário em menos de cinco segundos.

Toda informação deverá ser apresentada com alta prioridade visual.

Os componentes deverão privilegiar leitura rápida, atualização incremental e baixa carga cognitiva.

---

# DashboardHeader

---

## Objetivo

Apresentar a identificação do usuário e contextualizar o dia atual.

---

## Wireframe

```

Bom dia, Felipe

Quinta-feira, 02 Julho

👤

```

---

## Componentes

Greeting

↓

User Name

↓

Current Date

↓

Profile Button

---

## Propriedades

user

---

date

---

greeting

---

profileImage

---

onProfileClick

---

## Critérios

✓ Atualização automática da saudação

✓ Compatível com Dynamic Type

✓ Compatível com VoiceOver

---

# DashboardGrid

---

## Objetivo

Organizar todos os Cards do Dashboard.

---

## Responsabilidade

Posicionar.

Cards Fixos

↓

Cards Dinâmicos

↓

Cards Contextuais

---

## Layout

iPhone

1 coluna

---

iPad

2 colunas

---

Desktop

3 colunas

---

## Critérios

✓ Grid adaptativo

✓ Preservar ordem lógica

---

# WeightCard

---

## Objetivo

Apresentar rapidamente a evolução do peso.

---

## Wireframe

```

Peso Atual

87,3 kg

▼ -0,4 kg

▁▂▃▄▅▆▇█

```

---

## Dependências

MetricCard

↓

TrendIndicator

↓

MiniChart

---

## Propriedades

currentWeight

---

difference

---

trend

---

history

---

unit

---

## Eventos

onClick

↓

onHistory

---

## Critérios

✓ Atualização incremental

✓ Mini gráfico obrigatório

---

# GoalCard

---

## Objetivo

Mostrar o progresso em direção ao peso-alvo.

---

## Wireframe

```

Meta

70 kg

Faltam

17,3 kg

Previsão

12 Nov

```

---

## Dependências

ProgressCard

↓

Statistic

---

## Propriedades

currentWeight

---

goalWeight

---

estimatedDate

---

remaining

---

## Critérios

✓ Atualização automática

✓ Data prevista obrigatória

---

# DailyScoreCard

---

## Objetivo

Representar visualmente o Score Diário.

---

## Wireframe

```

92

Excelente

◉

```

---

## Dependências

CircularProgress

↓

ScoreIndicator

---

## Propriedades

score

---

category

---

details

---

## Eventos

onDetails

---

## Critérios

✓ Categoria obrigatória

✓ Atualização automática

---

# NutritionSummaryCard

---

## Objetivo

Apresentar o resumo nutricional do dia.

---

## Wireframe

```

1650 kcal

132 g proteína

118 g carboidratos

54 g gordura

```

---

## Dependências

SummaryCard

↓

Statistic

↓

ProgressBar

---

## Critérios

✓ Atualização imediata

✓ Compatível com Nutrition Module

---

# WaterCard

---

## Objetivo

Permitir acompanhar e registrar rapidamente a ingestão de água.

---

## Wireframe

```

Água

2,3 L

███████░░░

+200

```

---

## Dependências

ProgressCard

↓

PrimaryButton

---

## Propriedades

current

---

goal

---

quickActions

---

## Eventos

onAddWater

---

## Critérios

✓ Registro em um toque

✓ Atualização imediata

---

# WorkoutSummaryCard

---

## Objetivo

Mostrar o estado do treino do dia.

---

## Wireframe

```

Treino

✔ Concluído

52 min

```

---

## Dependências

MetricCard

↓

StatusIndicator

---

## Critérios

✓ Atualização automática

✓ Link para detalhes

---

# MedicationSummaryCard

---

## Objetivo

Exibir a próxima aplicação.

---

## Wireframe

```

Tirzepatida

5 mg

Sexta

09:00

```

---

## Dependências

MetricCard

↓

StatusIndicator

↓

Countdown

---

## Critérios

✓ Contagem regressiva

✓ Atualização automática

---

# HabitSummaryCard

---

## Objetivo

Mostrar o progresso diário dos hábitos.

---

## Wireframe

```

Hábitos

5 / 6

████████░░

```

---

## Dependências

ProgressCard

↓

Statistic

---

## Critérios

✓ Atualização em tempo real

✓ Integração com Score

---

# DashboardTimeline

---

## Objetivo

Exibir os últimos eventos relevantes.

---

## Wireframe

```

🍽 Almoço

🏋 Treino

💧 Água

```

---

## Dependências

TimelineCard

↓

TimelineList

---

## Quantidade

Máximo

5 eventos

---

## Botão

Ver Timeline Completa

---

# InsightCarousel

---

## Objetivo

Apresentar insights produzidos pelo Metrics Engine.

---

## Exemplos

Meta de proteína atingida.

↓

Peso caiu acima da média.

↓

Treino em atraso.

↓

Meta de água pendente.

↓

Nova conquista.

---

## Dependências

Carousel

↓

InsightCard

---

## Critérios

✓ Exibição contextual

✓ Máximo de três Insights

---

# DashboardSkeleton

---

## Objetivo

Representar o Dashboard durante carregamento.

---

## Componentes

HeaderSkeleton

↓

MetricCardSkeleton

↓

SummaryCardSkeleton

↓

TimelineSkeleton

---

## Critérios

✓ Mesmo layout da versão final

✓ Shimmer Animation

---

# Performance

Todos os componentes do Dashboard deverão.

Atualizar apenas o componente alterado.

↓

Nunca reconstruir o Dashboard completo.

↓

Compatíveis com Memoization.

↓

Compatíveis com Lazy Rendering.

↓

Tempo máximo de atualização

100 ms.

---

# Critérios Gerais

✓ Componentes totalmente desacoplados.

✓ Compatíveis com Event Bus.

✓ Compatíveis com Metrics Engine.

✓ Compatíveis com Design Tokens.

✓ Compatíveis com Dark Mode.

✓ Compatíveis com Dynamic Type.

✓ Compatíveis com VoiceOver.

✓ Compatíveis com Renderização Incremental.

# NUTRITION COMPONENTS

---

# Filosofia

Os componentes de Nutrição deverão permitir registrar refeições rapidamente e visualizar indicadores nutricionais de forma clara.

O objetivo é reduzir o tempo de registro sem perder qualidade das informações.

---

# MealCard

---

## Objetivo

Representar uma refeição registrada.

---

## Wireframe

```

🍽 Almoço

12:34

690 kcal

48 g proteína

⋯

```

---

## Dependências

BaseCard

↓

Statistic

↓

IconButton

↓

MealQualityBadge

---

## Propriedades

mealId

---

mealName

---

mealType

---

time

---

calories

---

protein

---

carbohydrates

---

fat

---

quality

---

favorite

---

## Eventos

onClick

↓

onEdit

↓

onDuplicate

↓

onDelete

↓

onFavorite

---

## Estados

Normal

↓

Loading

↓

Selected

↓

Deleted

---

## Critérios

✓ Atualização imediata

✓ Swipe Actions

✓ Long Press Menu

---

# MealQualityBadge

---

## Objetivo

Representar rapidamente a qualidade nutricional da refeição.

---

## Categorias

Excelente

↓

Muito Boa

↓

Boa

↓

Regular

↓

Atenção

---

## Wireframe

```

🟢 Excelente

```

---

## Dependências

Badge

---

## Critérios

✓ Texto obrigatório

✓ Nunca utilizar apenas cor

---

# MacronutrientCard

---

## Objetivo

Apresentar um macronutriente.

---

## Wireframe

```

Proteínas

132 g

████████░░

```

---

## Dependências

ProgressCard

↓

ProgressBar

↓

Statistic

---

## Utilização

Proteínas

↓

Carboidratos

↓

Gorduras

↓

Fibras

---

## Critérios

✓ Atualização automática

---

# NutritionSummary

---

## Objetivo

Apresentar o resumo nutricional diário.

---

## Wireframe

```

1650 kcal

132 g

118 g

54 g

28 g

```

---

## Componentes

Statistic

↓

ProgressBar

↓

MacronutrientCard

---

## Critérios

✓ Compatível com Metrics Engine

---

# FavoriteMealCard

---

## Objetivo

Representar uma refeição salva na Biblioteca Inteligente.

---

## Wireframe

```

🍗

Frango Grelhado

520 kcal

48 g proteína

+

```

---

## Dependências

BaseCard

↓

PrimaryButton

↓

Badge

---

## Eventos

onAdd

↓

onEdit

↓

onDelete

---

## Critérios

✓ Adicionar em um toque

---

# MealPreviewCard

---

## Objetivo

Exibir o Preview antes da importação.

---

## Wireframe

```

Frango Grelhado

520 kcal

Proteínas

48 g

[Editar]

[Confirmar]

```

---

## Dependências

SummaryCard

↓

PrimaryButton

↓

SecondaryButton

---

## Critérios

✓ Preview obrigatório

✓ Nunca importar diretamente

---

# MealIngredientList

---

## Objetivo

Exibir ingredientes de uma refeição.

---

## Estrutura

Ingrediente

↓

Quantidade

↓

Unidade

↓

Calorias

---

## Wireframe

```

Frango

150 g

248 kcal

```

---

## Critérios

✓ Scroll independente

✓ Lazy Rendering

---

# NutritionGoalCard

---

## Objetivo

Comparar consumo versus meta.

---

## Wireframe

```

Proteínas

132 / 150 g

████████░░

88%

```

---

## Dependências

ProgressCard

↓

ProgressBar

↓

Statistic

---

## Critérios

✓ Atualização automática

---

# SmartSuggestionCard

---

## Objetivo

Apresentar sugestões produzidas pela IA.

---

## Exemplos

Consumir mais proteína.

↓

Adicionar fibras.

↓

Reduzir gordura.

↓

Hidratação insuficiente.

---

## Wireframe

```

💡 Sugestão

Acrescente uma fruta
no lanche da tarde.

```

---

## Dependências

InsightCard

---

## Critérios

✓ Apenas uma recomendação principal

✓ Mensagem objetiva

---

# ImportHistoryItem

---

## Objetivo

Representar uma importação realizada.

---

## Wireframe

```

02 Jul

Almoço

Importado

✔

```

---

## Componentes

Ícone

↓

Data

↓

Hora

↓

Status

---

## Critérios

✓ Ordem cronológica

✓ Compatível com filtros

---

# NutritionSkeleton

---

## Objetivo

Representar o módulo durante carregamento.

---

## Componentes

NutritionSummarySkeleton

↓

MealCardSkeleton

↓

MacronutrientSkeleton

↓

FavoriteMealSkeleton

---

## Critérios

✓ Mesmo Layout da versão final

✓ Shimmer Animation

---

# Performance

Todos os componentes de Nutrição deverão.

Atualizar apenas o componente afetado.

↓

Nunca recalcular macronutrientes na Interface.

↓

Receber dados prontos do Metrics Engine.

↓

Compatíveis com Memoization.

↓

Compatíveis com Lazy Rendering.

---

# Critérios Gerais

✓ Componentes desacoplados.

✓ Compatíveis com Event Bus.

✓ Compatíveis com Metrics Engine.

✓ Compatíveis com Design Tokens.

✓ Compatíveis com Dark Mode.

✓ Compatíveis com Dynamic Type.

✓ Compatíveis com VoiceOver.

✓ Compatíveis com Offline.

✓ Compatíveis com Renderização Incremental.

# WORKOUT COMPONENTS

---

# Filosofia

Os componentes de Treino deverão privilegiar rapidez de registro e acompanhamento da evolução.

O usuário deverá conseguir registrar um treino em menos de 15 segundos.

---

# WorkoutCard

---

## Objetivo

Representar um treino realizado.

---

## Wireframe

```

🏋 Musculação

18:40

52 min

✔ Concluído

```

---

## Dependências

BaseCard

↓

StatusIndicator

↓

Statistic

↓

IconButton

---

## Propriedades

workoutId

---

type

---

date

---

duration

---

intensity

---

status

---

notes

---

## Eventos

onClick

↓

onEdit

↓

onDuplicate

↓

onDelete

---

## Critérios

✓ Registro rápido

✓ Atualização incremental

✓ Compatível com Timeline

---

# WorkoutSummaryCard

---

## Objetivo

Apresentar o resumo semanal dos treinos.

---

## Wireframe

```

Semana

4 / 5

████████░░

```

---

## Dependências

ProgressCard

↓

ProgressBar

↓

Statistic

---

## Critérios

✓ Atualização automática

✓ Meta sempre visível

---

# WorkoutHistoryItem

---

## Objetivo

Representar um item do histórico.

---

## Conteúdo

Tipo

↓

Horário

↓

Duração

↓

Observações

---

# WorkoutSkeleton

---

Mesmo layout do WorkoutCard.

---

Shimmer obrigatório.

---

# MEDICATION COMPONENTS

---

# MedicationCard

---

## Objetivo

Representar um medicamento ativo.

---

## Wireframe

```

💉 Tirzepatida

5 mg

Semanal

Próxima

Sexta

09:00

```

---

## Dependências

BaseCard

↓

Countdown

↓

StatusIndicator

↓

Badge

---

## Propriedades

medicationId

---

name

---

dose

---

frequency

---

nextApplication

---

lastApplication

---

status

---

## Eventos

onApply

↓

onEdit

↓

onHistory

---

## Critérios

✓ Próxima aplicação destacada

✓ Atualização automática

---

# MedicationHistoryItem

---

## Objetivo

Representar uma aplicação realizada.

---

## Wireframe

```

27 Jun

09:02

5 mg

✔

```

---

## Componentes

Data

↓

Hora

↓

Dose

↓

Status

↓

Observações

---

# CountdownIndicator

---

## Objetivo

Mostrar tempo restante para próximo evento.

---

## Wireframe

```

Faltam

2 dias

```

---

## Atualização

Automática.

---

Sem necessidade de Refresh.

---

# SideEffectCard

---

## Objetivo

Registrar efeitos colaterais.

---

## Wireframe

```

Náusea

Leve

Hoje

```

---

## Dependências

BaseCard

↓

Badge

↓

SeverityIndicator

---

## Critérios

✓ Gravidade obrigatória

✓ Compatível com Timeline

---

# MedicationSkeleton

---

Mesmo layout do MedicationCard.

---

# BODY PROGRESS COMPONENTS

---

# WeightHistoryCard

---

## Objetivo

Representar um registro de peso.

---

## Wireframe

```

⚖

87,3 kg

▼ -0,4 kg

02 Jul

```

---

## Dependências

MetricCard

↓

TrendIndicator

---

## Eventos

onEdit

↓

onDelete

---

# MeasurementCard

---

## Objetivo

Representar medidas corporais.

---

## Wireframe

```

Abdômen

101 cm

▼ -2 cm

```

---

## Utilização

Abdômen

↓

Peitoral

↓

Braço

↓

Coxa

↓

Quadril

---

# ProgressPhotoCard

---

## Objetivo

Representar uma foto de evolução.

---

## Wireframe

```

📷

Frente

02 Jul

87,3 kg

```

---

## Dependências

Image

↓

Badge

↓

Statistic

---

## Eventos

onOpen

↓

onCompare

↓

onDelete

---

## Critérios

✓ Miniatura

✓ Lazy Loading

✓ Zoom

---

# BeforeAfterComparison

---

## Objetivo

Comparar duas fotos.

---

## Wireframe

```

Antes

⇄

Depois

```

---

## Recursos

Zoom

↓

Pan

↓

Comparação lado a lado

---

Nunca alterar proporção.

---

# BodyProgressChart

---

## Objetivo

Exibir evolução corporal.

---

## Séries

Peso

↓

Meta

↓

Tendência

---

## Períodos

7 dias

↓

30 dias

↓

90 dias

↓

1 ano

↓

Tudo

---

# ProgressTimeline

---

## Objetivo

Exibir marcos importantes da evolução.

---

## Exemplos

Início

↓

Primeira meta

↓

Mudança de dose

↓

Nova foto

↓

Meta atingida

---

# ProgressSkeleton

---

Mesmo layout dos componentes finais.

↓

Shimmer Animation.

---

# Performance

Todos os componentes especializados deverão.

Receber dados exclusivamente por Props.

↓

Nunca acessar Storage.

↓

Nunca acessar Database.

↓

Nunca executar cálculos.

↓

Compatíveis com Memoization.

↓

Compatíveis com Lazy Loading.

↓

Compatíveis com Renderização Incremental.

---

# Critérios Gerais

✓ Componentes desacoplados.

✓ Compatíveis com Event Bus.

✓ Compatíveis com Metrics Engine.

✓ Compatíveis com Design Tokens.

✓ Compatíveis com Dark Mode.

✓ Compatíveis com Dynamic Type.

✓ Compatíveis com VoiceOver.

✓ Compatíveis com Offline.

✓ Compatíveis com Backup.

# LAYOUT & CONTAINER COMPONENTS

---

# Filosofia

Os componentes de Layout deverão organizar toda a interface da plataforma.

Eles nunca deverão conter regras de negócio.

Sua única responsabilidade será estruturar visualmente os componentes filhos.

---

# ScreenContainer

---

## Objetivo

Representar o container principal de qualquer tela.

---

## Responsabilidade

Aplicar Safe Areas.

↓

Background.

↓

Scroll.

↓

Padding.

↓

Keyboard Safe.

---

## Wireframe

┌────────────────────────────┐

Header

Conteúdo

Bottom Navigation

└────────────────────────────┘

---

## Layout

Largura

100%

---

Altura

100%

---

Padding Horizontal

24 px

---

Padding Superior

Safe Area

---

Padding Inferior

Bottom Navigation

---

## Critérios

✓ Safe Area obrigatória

✓ Keyboard Safe

✓ Dark Mode

---

# ScrollContainer

---

## Objetivo

Padronizar todo Scroll da plataforma.

---

## Responsabilidade

Scroll Vertical.

↓

Preservar posição.

↓

Pull To Refresh.

↓

Infinite Scroll.

---

## Propriedades

refreshable

---

rememberPosition

---

showScrollbar

---

nestedScroll

---

## Critérios

✓ 60 FPS

✓ Scroll Restoration

✓ Lazy Rendering

---

# SectionContainer

---

## Objetivo

Agrupar componentes relacionados.

---

## Wireframe

────────────────────────

Nutrição

──────────────

Componentes

────────────────────────

---

## Componentes

Título

↓

Descrição opcional

↓

Conteúdo

---

## Critérios

✓ Espaçamento padrão

✓ Reutilizável

---

# CardGrid

---

## Objetivo

Organizar Cards.

---

## Layout

iPhone

1 coluna

---

iPad

2 colunas

---

Desktop

3 colunas

---

Gap

24 px

---

## Critérios

✓ Grid responsivo

✓ Layout consistente

---

# ResponsiveColumns

---

## Objetivo

Distribuir componentes automaticamente.

---

## Breakpoints

Compact

1 coluna

---

Medium

2 colunas

---

Expanded

3 colunas

---

# StickyHeader

---

## Objetivo

Manter informações importantes sempre visíveis.

---

## Utilização

Pesquisa

↓

Filtros

↓

Resumo Diário

↓

Categorias

---

## Critérios

✓ Scroll suave

✓ Sem sobreposição

---

# FloatingContainer

---

## Objetivo

Exibir elementos flutuantes.

---

## Utilização

FAB

↓

ScrollToTop

↓

Quick Actions

---

## Safe Area

Obrigatória

---

# DividerSection

---

## Objetivo

Separar grandes blocos.

---

Espaçamento

32 px

---

Divider

Opcional

---

# DashboardLayout

---

## Objetivo

Estruturar o Dashboard.

---

## Estrutura

Header

↓

Cards Fixos

↓

Cards Dinâmicos

↓

Cards Contextuais

↓

Timeline

---

## Critérios

✓ Ordem preservada

✓ Atualização parcial

---

# FormLayout

---

## Objetivo

Padronizar formulários.

---

## Estrutura

Título

↓

Descrição

↓

Campos

↓

Botões

---

## Espaçamento

24 px

---

## Critérios

✓ Navegação por teclado

✓ Auto Focus

---

# ModalLayout

---

## Objetivo

Estruturar conteúdo interno de Modals.

---

## Estrutura

Título

↓

Conteúdo

↓

Botões

---

Máximo

80% altura

---

# BottomSheetLayout

---

## Objetivo

Estruturar Bottom Sheets.

---

## Estrutura

Handle

↓

Título

↓

Conteúdo

↓

Ações

---

Radius Superior

32 px

---

# EmptyLayout

---

## Objetivo

Padronizar Empty States.

---

## Estrutura

Ilustração

↓

Título

↓

Descrição

↓

PrimaryButton

---

# LoadingLayout

---

## Objetivo

Padronizar telas em carregamento.

---

## Estrutura

Skeleton Header

↓

Skeleton Cards

↓

Skeleton List

---

# CHART COMPONENTS

---

# Filosofia

Todos os gráficos deverão comunicar tendências rapidamente.

Nunca utilizar gráficos complexos.

---

# LineChart

---

## Objetivo

Representar evolução temporal.

---

## Utilização

Peso

↓

Circunferência

↓

Score

↓

Água

↓

Calorias

---

## Recursos

Zoom

↓

Tooltip

↓

Highlight

---

Nunca utilizar 3D.

---

# BarChart

---

## Objetivo

Comparar valores.

---

## Utilização

Proteínas

↓

Calorias

↓

Treinos

↓

Passos

---

# AreaChart

---

## Objetivo

Representar evolução acumulada.

---

## Utilização

Água

↓

Calorias

↓

Sono

---

# MiniChart

---

## Objetivo

Exibir tendência resumida.

---

## Utilização

Cards

↓

Dashboard

↓

Timeline

---

Sem eixos.

↓

Sem legenda.

---

# ProgressRing

---

## Objetivo

Representar progresso circular.

---

## Utilização

Score

↓

Objetivos

↓

Conquistas

---

# ChartLegend

---

## Objetivo

Explicar séries do gráfico.

---

## Componentes

Indicador

↓

Nome

↓

Valor

---

# ChartTooltip

---

## Objetivo

Exibir detalhes do ponto selecionado.

---

## Conteúdo

Valor

↓

Data

↓

Informações adicionais

---

# Performance

Todos os gráficos deverão.

Renderização incremental.

↓

Animação progressiva.

↓

60 FPS.

↓

Receber dados já processados.

↓

Nunca calcular métricas internamente.

---

# Critérios Gerais

✓ Componentes Stateless.

✓ Compatíveis com Memoization.

✓ Compatíveis com Lazy Loading.

✓ Compatíveis com Design Tokens.

✓ Compatíveis com Dark Mode.

✓ Compatíveis com Dynamic Type.

✓ Compatíveis com VoiceOver.

✓ Compatíveis com Renderização Incremental.

# SHARED COMPONENTS

---

# Filosofia

Os Shared Components deverão representar funcionalidades comuns a toda a plataforma.

Nunca deverão conhecer regras de negócio.

Deverão ser totalmente reutilizáveis.

---

# DateTimeDisplay

---

## Objetivo

Exibir datas e horários de forma padronizada.

---

## Utilização

Timeline

↓

Treinos

↓

Medicamentos

↓

Nutrição

↓

Backup

↓

Exportação

---

## Wireframe

```

02 Jul 2026

18:42

```

---

## Propriedades

date

Date

---

format

date

time

datetime

relative

---

locale

---

showIcon

---

## Critérios

✓ Internacionalização

✓ Timezone automático

✓ Atualização automática para datas relativas

---

# Countdown

---

## Objetivo

Exibir tempo restante até um evento.

---

## Utilização

Próxima aplicação

↓

Meta

↓

Eventos

↓

Desafios

---

## Wireframe

```

Faltam

2 dias

4 horas

```

---

## Atualização

Automática.

---

Sem necessidade de Refresh.

---

# StatisticGroup

---

## Objetivo

Agrupar indicadores.

---

## Wireframe

```

132 g

Proteínas

118 g

Carboidratos

54 g

Gorduras

```

---

## Componentes

Statistic

↓

Divider

↓

Statistic

↓

Statistic

---

## Critérios

✓ Layout uniforme

✓ Responsivo

---

# MetricGroup

---

## Objetivo

Agrupar vários MetricCards.

---

## Utilização

Dashboard

↓

Resumo Diário

↓

Nutrição

---

## Layout

Vertical.

↓

Grid adaptativo.

---

# SectionHeader

---

## Objetivo

Representar o cabeçalho de uma seção.

---

## Wireframe

```

Nutrição

Ver tudo >

```

---

## Componentes

Título

↓

Descrição opcional

↓

Ação

---

## Eventos

onAction

---

## Critérios

✓ Apenas uma ação

✓ Compatível com Dynamic Type

---

# ActionMenu

---

## Objetivo

Apresentar ações contextuais.

---

## Wireframe

```

Editar

Duplicar

Compartilhar

Excluir

```

---

## Utilização

MealCard

↓

WorkoutCard

↓

PhotoCard

↓

MedicationCard

↓

TimelineCard

---

## Critérios

✓ Bottom Sheet no Mobile

✓ Menu Contextual no Desktop

---

# QuickActionBar

---

## Objetivo

Executar ações rápidas.

---

## Wireframe

```

+ Água

+ Peso

+ Refeição

+ Treino

```

---

## Utilização

Dashboard

↓

Diário

↓

Nutrição

---

## Critérios

✓ Máximo quatro ações

✓ Ícones obrigatórios

---

# EmptyPlaceholder

---

## Objetivo

Representar espaço reservado para conteúdo futuro.

---

## Utilização

Funcionalidades futuras

↓

Integrações

↓

Módulos Premium

---

## Wireframe

```

Em breve

```

---

# SearchResultItem

---

## Objetivo

Representar um resultado da Pesquisa Global.

---

## Wireframe

```

🍽

Frango Grelhado

Biblioteca

```

---

## Componentes

Ícone

↓

Título

↓

Categoria

↓

Descrição

---

## Eventos

onClick

---

# FilterChipGroup

---

## Objetivo

Gerenciar grupos de filtros.

---

## Wireframe

```

Todos

Proteínas

Favoritos

Hoje

```

---

## Recursos

Scroll horizontal

↓

Seleção múltipla

↓

Remoção rápida

---

# EmptyIllustration

---

## Objetivo

Padronizar ilustrações de Empty State.

---

## Tipos

Sem Dados

↓

Sem Pesquisa

↓

Offline

↓

Erro

↓

Primeiro Uso

---

# ErrorView

---

## Objetivo

Representar erros recuperáveis.

---

## Wireframe

```

⚠

Ocorreu um erro.

[Tentar novamente]

```

---

## Componentes

Ícone

↓

Título

↓

Descrição

↓

PrimaryButton

---

## Critérios

✓ Mensagem clara

✓ Nunca Stack Trace

---

# OfflineIndicator

---

## Objetivo

Representar modo Offline.

---

## Wireframe

```

● Offline

```

---

## Estados

Offline

↓

Sincronizando

↓

Sincronizado

---

# VersionBadge

---

## Objetivo

Exibir versão da aplicação.

---

## Utilização

Configurações

↓

Diagnóstico

↓

Debug

---

## Wireframe

```

v3.0.0

```

---

# BuildInfo

---

## Objetivo

Exibir informações técnicas.

---

## Conteúdo

Versão

↓

Build

↓

Schema

↓

Último Backup

---

Utilização.

Tela de Diagnóstico.

---

# PerformanceBadge

---

## Objetivo

Exibir métricas técnicas.

---

## Utilização

Modo Desenvolvedor.

---

## Exemplos

60 FPS

↓

Memory

↓

Storage

↓

Render Time

---

Nunca exibir para usuários comuns.

---

# SharedSkeleton

---

## Objetivo

Base para todos os Skeletons.

---

## Recursos

Shimmer

↓

Layout Responsivo

↓

Mesmo tamanho do componente final

---

# Performance

Todos os Shared Components deverão.

Ser Stateless.

↓

Receber apenas Props.

↓

Não acessar Storage.

↓

Não acessar Event Bus.

↓

Não acessar Metrics Engine.

↓

Compatíveis com Memoization.

↓

Compatíveis com Lazy Rendering.

---

# Critérios Gerais

✓ Totalmente reutilizáveis.

✓ Independentes do domínio.

✓ Compatíveis com Design Tokens.

✓ Compatíveis com Dark Mode.

✓ Compatíveis com Dynamic Type.

✓ Compatíveis com VoiceOver.

✓ Compatíveis com iPhone.

✓ Compatíveis com iPad.

✓ Compatíveis com Desktop.

# COMPONENT STANDARDS

---

# Objetivo

Definir os padrões obrigatórios que deverão ser respeitados por todos os componentes da biblioteca.

Nenhum componente poderá ser aprovado sem atender integralmente estes requisitos.

---

# Filosofia

Todo componente deverá ser.

Simples.

↓

Reutilizável.

↓

Testável.

↓

Performático.

↓

Acessível.

↓

Consistente.

---

# Stateless First

Todo componente deverá ser Stateless sempre que possível.

---

Nunca acessar diretamente.

Storage.

↓

IndexedDB.

↓

LocalStorage.

↓

API.

↓

Metrics Engine.

↓

Repositories.

↓

Services.

---

Os componentes deverão receber todas as informações através de Props.

---

# Single Responsibility

Cada componente deverá possuir apenas uma responsabilidade.

---

Exemplos.

ProgressBar

↓

Representar progresso.

---

Nunca calcular progresso.

---

MetricCard

↓

Exibir métricas.

---

Nunca calcular métricas.

---

MealCard

↓

Exibir refeição.

---

Nunca calcular macronutrientes.

---

# Composition over Inheritance

Sempre preferir composição.

---

Exemplo.

MetricCard

↓

Statistic

↓

TrendIndicator

↓

MiniChart

↓

Badge

---

Nunca duplicar código visual.

---

# Naming Convention

Todos os componentes deverão utilizar PascalCase.

---

Exemplos.

PrimaryButton

MetricCard

ProgressBar

TimelineCard

MealCard

WorkoutCard

MedicationCard

---

Nunca utilizar abreviações.

---

# Props Convention

Obrigatórias.

id

↓

data

↓

loading

↓

disabled

↓

onClick

↓

testID

---

Props opcionais.

variant

↓

size

↓

icon

↓

badge

↓

action

---

Nunca utilizar Props genéricas.

---

# Event Convention

Eventos deverão iniciar com.

on

---

Exemplos.

onClick

onDelete

onEdit

onSave

onRefresh

onDismiss

---

Nunca utilizar nomes ambíguos.

---

# Renderização

Todo componente deverá.

Receber Props.

↓

Renderizar.

↓

Retornar.

---

Nunca modificar estado global.

---

# Memoization

Sempre permitir.

React.memo

↓

useMemo

↓

useCallback

Quando aplicável.

---

Nunca impedir Memoization.

---

# Lazy Loading

Obrigatório para.

Fotos.

↓

Gráficos.

↓

Listas.

↓

Timeline.

↓

Biblioteca.

---

Nunca carregar conteúdo invisível.

---

# Virtualização

Obrigatória.

Acima de 50 itens.

---

Componentes compatíveis.

Timeline.

↓

Biblioteca.

↓

Históricos.

↓

Pesquisa.

---

# Error Boundary

Todo módulo deverá possuir Error Boundary.

---

Os componentes deverão ser compatíveis.

---

Nunca interromper a aplicação inteira.

---

# Logging

Componentes nunca deverão escrever Logs diretamente.

---

Utilizar.

Logger Service.

---

# Telemetria

Eventos opcionais.

---

Exemplos.

Component Mounted.

↓

Component Clicked.

↓

Action Executed.

---

Nunca enviar telemetria automaticamente.

---

# Acessibilidade

Obrigatória.

---

Todo componente deverá possuir.

Accessibility Label.

↓

Accessibility Hint.

↓

Accessibility Role.

↓

Accessibility Value.

Quando aplicável.

---

Área mínima.

44 px.

↓

44 px.

---

Compatível.

VoiceOver.

↓

TalkBack.

↓

Dynamic Type.

↓

Keyboard Navigation.

↓

High Contrast.

↓

Reduce Motion.

---

# Internacionalização

Todos os textos deverão utilizar Translation Keys.

---

Nunca utilizar Strings fixas.

---

Exemplo.

```

dashboard.weight.title

nutrition.meal.add

workout.history.empty

```

---

# Temas

Todos os componentes deverão utilizar.

Theme Engine.

↓

Design Tokens.

---

Nunca utilizar cores fixas.

---

Nunca utilizar fontes fixas.

---

Nunca utilizar espaçamentos fixos.

---

# Responsividade

Todos os componentes deverão adaptar-se automaticamente.

---

Compact.

↓

Medium.

↓

Expanded.

---

Nunca depender de tamanho fixo.

---

# Performance

Tempo máximo de renderização.

16 ms.

---

Scroll.

60 FPS.

---

Animações.

60 FPS.

---

Atualizações.

Incrementais.

---

Nunca reconstruir a árvore inteira.

---

# Testabilidade

Todo componente deverá permitir.

Unit Test.

↓

Snapshot Test.

↓

Accessibility Test.

↓

Visual Regression Test.

---

# Documentação

Todo componente deverá possuir.

Descrição.

↓

Props.

↓

Eventos.

↓

Exemplos.

↓

Critérios.

---

# Versionamento

Mudanças incompatíveis.

Major.

---

Novos componentes.

Minor.

---

Correções.

Patch.

---

Seguir Semantic Versioning.

---

# Depreciação

Componentes antigos.

Marcar.

Deprecated.

---

Nunca remover imediatamente.

---

Sempre documentar substituto.

---

# Checklist

Antes da aprovação verificar.

☐ Stateless.

☐ Reutilizável.

☐ Design Tokens.

☐ Theme Engine.

☐ Memoization.

☐ Lazy Loading.

☐ Acessibilidade.

☐ Dark Mode.

☐ Dynamic Type.

☐ Responsividade.

☐ Internacionalização.

☐ Testável.

☐ Documentado.

☐ Performance.

☐ Compatível com Event Bus.

☐ Compatível com ViewModels.

---

# Critérios Gerais

✓ Nenhum componente conhece regras de negócio.

✓ Nenhum componente acessa Storage.

✓ Nenhum componente realiza cálculos.

✓ Nenhum componente depende de APIs.

✓ Todos os componentes utilizam Design Tokens.

✓ Todos os componentes são reutilizáveis.

✓ Todos os componentes seguem a Component Library.

# IMPLEMENTATION CONTRACT

---

# Objetivo

Definir oficialmente as regras para criação, manutenção e evolução da Component Library do HWP Platform.

Este documento deverá ser considerado obrigatório para qualquer implementação realizada por desenvolvedores ou agentes de IA.

---

# Princípios Fundamentais

Toda decisão envolvendo componentes deverá priorizar.

Consistência.

↓

Reutilização.

↓

Performance.

↓

Acessibilidade.

↓

Escalabilidade.

↓

Baixa complexidade.

---

Nenhum componente poderá existir apenas para atender uma única tela se puder ser reutilizado.

---

# Fluxo Oficial para Criação de Componentes

Antes de criar qualquer componente.

Verificar.

↓

Existe componente semelhante?

↓

Pode ser reutilizado?

↓

Pode ser parametrizado?

↓

Pode ser composto?

↓

Somente então criar novo componente.

---

# Ordem Oficial de Construção

Todo componente deverá seguir.

Objetivo.

↓

Wireframe.

↓

API (Props).

↓

Estados.

↓

Eventos.

↓

Animações.

↓

Design Tokens.

↓

Acessibilidade.

↓

Performance.

↓

Critérios de Aceitação.

↓

Testes.

↓

Documentação.

---

Nunca iniciar pelo código.

---

# Hierarquia Oficial

Primitive Components

↓

Composite Components

↓

Feature Components

↓

Screen Assemblies

↓

Screens

---

Nunca inverter essa hierarquia.

---

# Dependências Permitidas

Componentes poderão depender apenas de.

Primitive Components.

↓

Design Tokens.

↓

Theme Engine.

↓

Animation Tokens.

↓

Icons.

↓

Typography.

---

Nunca depender diretamente de.

Repositories.

↓

Storage.

↓

Metrics Engine.

↓

Database.

↓

Services.

↓

API.

---

# Versionamento da Biblioteca

Semantic Versioning obrigatório.

---

MAJOR

Mudanças incompatíveis.

---

MINOR

Novos componentes.

↓

Novas Props.

↓

Novos Estados.

---

PATCH

Correções.

↓

Performance.

↓

Acessibilidade.

↓

Layout.

---

# Evolução

Novos componentes deverão.

Manter padrão visual.

↓

Manter nomenclatura.

↓

Manter Design Tokens.

↓

Manter acessibilidade.

↓

Ser compatíveis com Dark Mode.

↓

Ser compatíveis com Dynamic Type.

↓

Ser compatíveis com VoiceOver.

---

# Depreciação

Ao substituir um componente.

Marcar como.

Deprecated.

---

Documentar.

Substituto.

↓

Motivo.

↓

Prazo de remoção.

---

Nunca remover imediatamente.

---

# Testes Obrigatórios

Todo componente deverá possuir.

Unit Test.

↓

Snapshot Test.

↓

Accessibility Test.

↓

Visual Regression Test.

↓

Interaction Test.

---

Cobertura mínima.

95%.

---

# Documentação Obrigatória

Todo componente deverá possuir.

Objetivo.

↓

Wireframe.

↓

Props.

↓

Eventos.

↓

Estados.

↓

Exemplos.

↓

Critérios de Aceitação.

↓

Histórico de alterações.

---

# Storybook

Todo componente deverá existir no Storybook oficial.

---

Cada Story deverá conter.

Estado Normal.

↓

Loading.

↓

Disabled.

↓

Error.

↓

Success.

↓

Dark Mode.

↓

Light Mode.

↓

Dynamic Type.

↓

Responsivo.

---

# Performance

Toda alteração deverá preservar.

Renderização.

<16 ms.

---

Scroll.

60 FPS.

---

Animações.

60 FPS.

---

Renderização incremental.

Obrigatória.

---

# Acessibilidade

Nenhuma alteração poderá reduzir acessibilidade.

---

Sempre validar.

VoiceOver.

↓

TalkBack.

↓

Keyboard.

↓

Dynamic Type.

↓

High Contrast.

↓

Reduce Motion.

---

# Compatibilidade

Todos os componentes deverão permanecer compatíveis com.

Event Bus.

↓

ViewModels.

↓

Theme Engine.

↓

Metrics Engine.

↓

Offline Engine.

↓

Backup Engine.

↓

Sync Engine.

---

# Compatibilidade Futura

A biblioteca deverá permitir expansão para.

Wearables.

↓

Apple Watch.

↓

Android Watch.

↓

Widgets.

↓

Live Activities.

↓

CarPlay.

↓

Android Auto.

↓

Web Desktop.

↓

Aplicações futuras.

---

# Checklist Oficial do Desenvolvedor

Antes de concluir qualquer componente.

☐ Reutilização verificada.

☐ Nome oficial utilizado.

☐ Stateless.

☐ Props tipadas.

☐ Eventos padronizados.

☐ Design Tokens utilizados.

☐ Theme Engine utilizado.

☐ Dark Mode.

☐ Dynamic Type.

☐ VoiceOver.

☐ Memoization.

☐ Lazy Loading.

☐ Performance validada.

☐ Testes implementados.

☐ Storybook atualizado.

☐ Documentação atualizada.

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

☐ Nunca criar componente duplicado.

☐ Nunca utilizar valores hardcoded.

☐ Nunca acessar Storage.

☐ Nunca implementar regras de negócio em componentes.

☐ Sempre reutilizar componentes existentes.

☐ Sempre utilizar ViewModels.

---

# Definição de Pronto (Definition of Done)

Um componente será considerado concluído apenas quando.

✓ Especificação implementada.

✓ Todos os estados funcionarem.

✓ Todos os eventos funcionarem.

✓ Design Tokens utilizados.

✓ Tema Claro.

✓ Tema Escuro.

✓ Responsividade validada.

✓ Acessibilidade validada.

✓ Performance validada.

✓ Testes aprovados.

✓ Storybook atualizado.

✓ Documentação atualizada.

---

# Objetivo Final

A Component Library deverá permitir que qualquer nova funcionalidade do HWP Platform seja construída exclusivamente por composição de componentes existentes, minimizando duplicações, reduzindo manutenção e garantindo uma experiência consistente em toda a plataforma.

---

# HISTÓRICO DO DOCUMENTO

## Versão 3.0

Primeira especificação oficial da biblioteca de componentes do HWP Platform.

Inclui.

• Primitive Components.

• Buttons.

• Cards.

• Inputs.

• Navigation.

• Indicators.

• Feedback.

• Lists.

• Dashboard Components.

• Nutrition Components.

• Workout Components.

• Medication Components.

• Body Progress Components.

• Layout Components.

• Shared Components.

• Component Standards.

• Storybook Guidelines.

• Implementation Contract.

---

# DOCUMENTO CONCLUÍDO

Este documento representa a especificação oficial da Component Library do HWP Platform 3.0.

Toda implementação deverá utilizar exclusivamente os componentes aqui definidos.

Qualquer evolução futura deverá ser registrada através de revisão deste documento.

# FIM DO DOCUMENTO