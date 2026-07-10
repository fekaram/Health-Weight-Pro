# HWP Platform 3.0

# 08 - UI SPECIFICATION

Versão: 1.0

Status: Oficial

Documento responsável por definir toda a interface do HWP Platform.

---

# Objetivo

Este documento define oficialmente toda a experiência visual do usuário.

Toda interface deverá seguir rigorosamente estas especificações.

Nenhuma tela deverá ser implementada sem consultar este documento.

---

# Filosofia da Interface

A interface do HWP Platform deverá transmitir:

• Clareza.

• Rapidez.

• Elegância.

• Confiabilidade.

• Sensação Premium.

• Baixa carga cognitiva.

O usuário deverá conseguir compreender sua situação de saúde em menos de cinco segundos após abrir o aplicativo.

---

# Princípios de UX

Toda tela deverá obedecer aos princípios abaixo.

• Uma ação principal por tela.

• Poucos toques.

• Feedback imediato.

• Navegação previsível.

• Estados sempre visíveis.

• Nunca esconder informações importantes.

• Nunca bloquear o usuário sem motivo.

• Offline First.

---

# Inspirações de Design

A experiência visual deverá combinar características de:

Apple Health

Apple Fitness

Apple Activity

Notion

Linear

Things 3

Todoist

Sem copiar nenhuma interface.

Apenas utilizar os mesmos princípios de simplicidade, hierarquia visual e fluidez.

---

# Identidade Visual

A identidade do HWP Platform deverá transmitir:

Saúde.

Tecnologia.

Precisão.

Minimalismo.

Masculinidade discreta.

Confiabilidade.

Elegância.

---

# Linguagem Visual

Toda interface deverá utilizar:

Muito espaço em branco.

Cards grandes.

Poucos elementos por tela.

Tipografia forte.

Ícones simples.

Animações discretas.

Contraste elevado.

---

# Grid System

Base oficial.

Grid de 8 px.

Todos os espaçamentos deverão ser múltiplos de 8.

Exemplos.

8

16

24

32

40

48

64

---

# Safe Areas

Toda interface deverá respeitar:

Safe Area Top.

Safe Area Bottom.

Notch.

Dynamic Island.

Barra de navegação.

Nunca posicionar componentes críticos fora das Safe Areas.

---

# Estrutura Geral

Toda tela seguirá obrigatoriamente a seguinte organização.

Header

↓

Conteúdo Principal

↓

Ações

↓

Bottom Navigation

---

# Header

Altura recomendada.

64 px.

Conteúdo.

Título.

Subtítulo opcional.

Ação secundária.

Nunca utilizar mais de duas ações no Header.

---

# Conteúdo Principal

Scroll vertical.

Padding lateral de 24 px.

Padding superior de 24 px.

Padding inferior de 120 px.

---

# Bottom Navigation

Fixa.

Sempre visível.

Nunca ocultar durante navegação comum.

Altura recomendada.

88 px.

Compatível com Safe Area.

---

# Estrutura dos Cards

Todos os Cards deverão possuir.

Border Radius

24 px.

Padding interno

24 px.

Título.

Valor Principal.

Informação Secundária.

Ação Opcional.

Nunca utilizar mais de uma ação principal por Card.

---

# Estados Globais

Toda tela deverá prever obrigatoriamente.

Loading.

Empty.

Erro.

Offline.

Atualizando.

Sucesso.

---

# Tempo de Resposta Esperado

Primeira renderização.

Menor que 300 ms.

Atualização parcial.

Menor que 100 ms.

Troca de aba.

Menor que 150 ms.

Animações.

180–220 ms.

---

# Convenções

Todas as telas descritas neste documento seguirão exatamente a estrutura abaixo.

Objetivo.

Hierarquia Visual.

Layout.

Componentes.

Wireframe.

Estados.

Animações.

Gestos.

Acessibilidade.

Performance.

Critérios de Aceitação.

# DASHBOARD

---

# Objetivo

O Dashboard representa a tela principal do HWP Platform.

Seu objetivo é permitir que o usuário compreenda sua situação atual em menos de cinco segundos.

Nenhuma outra tela deverá concentrar mais informações importantes.

---

# Prioridade Visual

Os elementos deverão aparecer na seguinte ordem de importância.

1. Saudação.

2. Peso Atual.

3. Meta.

4. Score Diário.

5. Nutrição.

6. Água.

7. Treino.

8. Timeline.

---

# Layout Geral

Estrutura.

Header

↓

Cards Principais

↓

Cards Secundários

↓

Timeline

↓

Espaço inferior para Bottom Navigation

---

# Header

Conteúdo.

Saudação.

↓

Nome do usuário.

↓

Data atual.

↓

Botão Perfil.

---

Exemplo.

```

Bom dia, Felipe

Quinta-feira, 02 de Julho

                           (Perfil)

```

---

Altura recomendada.

96 px.

---

Padding.

24 px.

---

Nunca utilizar mais de um botão de ação no Header.

---

# Cards Principais

Os Cards deverão ocupar toda largura disponível.

Nunca utilizar duas colunas no iPhone.

No iPad poderão existir duas colunas.

---

Ordem.

Peso.

↓

Meta.

↓

Score.

---

# Card Peso

Objetivo.

Mostrar rapidamente a evolução do peso.

Conteúdo.

Título.

Peso Atual.

Diferença para ontem.

Mini gráfico.

Botão histórico.

---

Layout.

```

Peso Atual

87,3 kg

↓

-0,4 kg

███████▆▅▅▃

```

---

Altura.

160 px.

---

# Card Meta

Conteúdo.

Meta.

Peso restante.

Previsão.

---

Exemplo.

```

Meta

70 kg

Faltam

17,3 kg

Previsão

12 Nov 2026

```

---

Altura.

160 px.

---

# Card Score Diário

Conteúdo.

Score.

Categoria.

Barra circular.

Resumo.

---

Exemplo.

```

Score

92

Excelente

◉

```

---

Altura.

180 px.

---

O Score deverá utilizar apenas quatro categorias.

Excelente.

Bom.

Regular.

Atenção.

Nunca utilizar mais categorias.

---

# Cards Secundários

Ordem.

Nutrição.

↓

Água.

↓

Treino.

↓

Medicamentos.

↓

Hábitos.

---

# Card Nutrição

Conteúdo.

Calorias.

Proteínas.

Carboidratos.

Gorduras.

Barra de progresso.

---

Exemplo.

```

Nutrição

1650 kcal

Proteínas

132 g

████████░░

```

---

Altura.

170 px.

---

# Card Água

Conteúdo.

Quantidade.

Meta.

Barra.

Botão +

---

Exemplo.

```

Água

2,3 L

███████░░░

(+)

```

---

Altura.

150 px.

---

O botão (+) deverá permitir adicionar água em apenas um toque.

---

# Card Treino

Conteúdo.

Status.

Horário.

Duração.

Atalho para registrar treino.

---

Exemplo.

```

Treino

✔ Concluído

18:40

52 min

```

---

Altura.

150 px.

---

# Card Medicamentos

Conteúdo.

Próxima aplicação.

Histórico.

Status.

---

Exemplo.

```

Tirzepatida

Próxima

Sexta

09:00

```

---

Altura.

150 px.

---

# Card Hábitos

Conteúdo.

Sono.

Passos.

Hábitos concluídos.

---

Exemplo.

```

Sono

7 h 42

Passos

8.143

Hábitos

5/6

```

---

Altura.

170 px.

---

# Timeline Resumida

Últimos eventos.

Máximo.

Cinco eventos.

---

Cada item.

Ícone.

Título.

Hora.

---

Exemplo.

```

🍽 Almoço

12:34

🏋 Treino

18:10

💧 Água

18:52

```

---

Botão.

Ver Timeline Completa.

# DASHBOARD

# Comportamento da Interface

---

## Atualização dos Cards

O Dashboard nunca deverá ser totalmente renderizado novamente.

Após qualquer alteração.

↓

Atualizar apenas os Cards impactados.

Exemplos.

Alteração de Peso.

↓

Atualizar.

Peso.

Meta.

Score.

Gráficos.

---

Nova Refeição.

↓

Atualizar.

Nutrição.

Score.

Timeline.

---

Novo Treino.

↓

Atualizar.

Treino.

Score.

Timeline.

---

Nova Água.

↓

Atualizar.

Água.

Score.

---

Nova Aplicação.

↓

Atualizar.

Medicamentos.

Timeline.

---

## Skeleton Loading

Durante carregamentos.

Nunca exibir tela vazia.

Sempre utilizar Skeleton.

---

Header.

↓

Skeleton.

---

Cards.

↓

Skeleton.

---

Timeline.

↓

Skeleton.

---

Tempo máximo.

300 ms.

---

## Empty State

Caso não existam dados.

Exibir.

Ilustração.

↓

Mensagem.

↓

Botão principal.

---

Exemplo.

```

Ainda não há registros.

Comece registrando seu peso.

[ Registrar Peso ]

```

---

Nunca exibir telas vazias.

---

## Estado Offline

Quando Offline.

Exibir indicador discreto.

No Header.

---

Exemplo.

```

● Offline

```

---

Nunca impedir navegação.

---

Nunca bloquear consultas.

---

Alterações deverão ser armazenadas localmente.

---

## Atualização Automática

Após qualquer evento.

Dashboard deverá atualizar automaticamente.

Nunca exigir botão.

Atualizar.

---

Nenhum botão.

"Atualizar".

---

## Scroll

Scroll vertical.

Sempre suave.

Nunca reiniciar posição após pequenas atualizações.

---

Posição deverá ser preservada.

---

## Pull To Refresh

Permitido.

Apenas para sincronização manual.

Nunca obrigatório.

---

## Navegação

Ao tocar em qualquer Card.

Abrir tela correspondente.

Peso.

↓

Body Progress.

---

Nutrição.

↓

Nutrition.

---

Água.

↓

Diary.

---

Treino.

↓

Workout.

---

Medicamentos.

↓

Medication.

---

Timeline.

↓

Timeline Completa.

---

# Responsividade

---

## iPhone

Uma coluna.

Cards largura total.

---

## iPad

Até duas colunas.

Mantendo hierarquia.

---

## Desktop

Grid adaptativo.

Máximo.

Três colunas.

---

Nunca utilizar largura superior a.

1440 px.

---

Conteúdo centralizado.

---

# Tipografia

---

Título do Dashboard.

32 px.

Bold.

---

Título dos Cards.

18 px.

Semibold.

---

Valor Principal.

40 px.

Bold.

---

Valor Secundário.

18 px.

Regular.

---

Texto Auxiliar.

15 px.

Regular.

---

Nunca utilizar mais de quatro níveis tipográficos.

---

# Ícones

Todos deverão utilizar.

SF Symbols.

Quando disponível.

---

Caso indisponível.

Utilizar.

Material Symbols Rounded.

---

Nunca misturar estilos.

---

# Cores

Cards.

Utilizar superfície secundária.

---

Texto Principal.

Maior contraste possível.

---

Texto Secundário.

Contraste intermediário.

---

Indicadores Positivos.

Verde.

---

Indicadores de Atenção.

Laranja.

---

Indicadores Críticos.

Vermelho.

---

Nunca utilizar cores apenas como forma de comunicação.

Sempre acompanhar com ícones ou texto.

---

# Sombras

Cards.

Sombra suave.

---

Nunca utilizar sombras exageradas.

---

# Bordas

Border Radius.

24 px.

Padrão para toda plataforma.

---

# Espaçamento

Entre Cards.

24 px.

---

Entre grupos.

32 px.

---

Entre título e conteúdo.

16 px.

---

Padding interno.

24 px.

---

Nunca utilizar espaçamentos aleatórios.

---

# Animações

Toda animação deverá parecer natural.

---

Cards.

Fade.

+

Slide.

180 ms.

---

Atualização.

Cross Fade.

150 ms.

---

Gráficos.

Progressivo.

250 ms.

---

Timeline.

Slide Bottom.

180 ms.

---

Nunca utilizar animações superiores a.

300 ms.

---

Nunca utilizar animações chamativas.

---

# Gestos

Toque.

Abrir.

---

Long Press.

Menu contextual.

---

Swipe.

Somente quando fizer sentido.

Nunca obrigatório.

---

# Feedback Tátil

Dispositivos compatíveis.

Executar.

Haptic Feedback.

---

Somente em.

Salvar.

Excluir.

Concluir.

Registrar.

---

Nunca utilizar vibração excessiva.

---

# Acessibilidade

Todo Card deverá possuir.

Accessibility Label.

Accessibility Hint.

Accessibility Value.

---

Todos os botões deverão possuir.

Área mínima.

44 px.

---

Compatível com.

VoiceOver.

Dynamic Type.

High Contrast.

Reduce Motion.

---

Nunca utilizar texto inferior a.

15 px.

---

# Performance

Primeira renderização.

< 300 ms.

---

Atualização parcial.

< 100 ms.

---

Scroll.

60 FPS.

---

Animações.

60 FPS.

---

Nunca recalcular Dashboard inteiro sem necessidade.

---

# Critérios de Aceitação

✓ Dashboard carregado em menos de 300 ms.

✓ Atualizações incrementais.

✓ Nenhuma renderização completa desnecessária.

✓ Compatível com iPhone.

✓ Compatível com iPad.

✓ Compatível com Desktop.

✓ Funciona Offline.

✓ Compatível com modo Claro.

✓ Compatível com modo Escuro.

✓ Compatível com VoiceOver.

✓ Compatível com Dynamic Type.


# DIARY SCREEN

---

# Objetivo

A tela Diário representa o centro operacional do HWP Platform.

Seu objetivo é permitir que o usuário registre rapidamente todos os dados do dia.

Esta deverá ser a tela com maior frequência de utilização.

---

# Prioridade Visual

Ordem dos elementos.

1. Data.

2. Peso.

3. Circunferência.

4. Água.

5. Sono.

6. Passos.

7. Hábitos.

8. Observações.

---

# Layout Geral

Estrutura.

Header

↓

Seletor de Data

↓

Indicadores Corporais

↓

Indicadores Diários

↓

Hábitos

↓

Observações

↓

Bottom Navigation

---

# Header

Conteúdo.

Título.

Diário.

↓

Data Atual.

↓

Botão Calendário.

↓

Botão Hoje.

---

Exemplo.

```

Diário

Quinta-feira

02 Jul 2026

         📅   Hoje

```

---

Altura.

96 px.

---

Padding.

24 px.

---

# Seletor de Data

Objetivo.

Permitir navegação extremamente rápida entre dias.

---

Layout.

```

◀

02 Jul

▶

```

---

Gestos.

Swipe Left

↓

Próximo dia.

---

Swipe Right

↓

Dia anterior.

---

Tap

↓

Abrir calendário.

---

Nunca exigir múltiplos toques para trocar de dia.

---

# Card Peso

Conteúdo.

Peso Atual.

Último Peso.

Diferença.

Mini tendência.

---

Layout.

```

Peso

87,3 kg

-0,4 kg

██████▅▃

```

---

Botão.

Editar.

---

# Card Circunferência

Conteúdo.

Circunferência Atual.

Diferença.

Meta.

---

Layout.

```

Abdômen

101 cm

↓

Meta

90 cm

```

---

# Card Água

Conteúdo.

Quantidade Atual.

Meta.

Barra.

Botões rápidos.

---

Layout.

```

Água

2,3 L

███████░░

+200

+300

+500

```

---

Os botões rápidos deverão registrar imediatamente.

Sem abrir formulário.

---

# Card Sono

Conteúdo.

Horas dormidas.

Qualidade.

---

Layout.

```

Sono

7 h 45

Boa

```

---

Entrada.

Stepper.

Slider.

ou

Campo numérico.

---

# Card Passos

Conteúdo.

Quantidade.

Meta.

Progresso.

---

Layout.

```

Passos

8.143

██████░░░

```

---

# Card Hábitos

Lista.

Checkbox.

---

Exemplo.

```

☑ Vitaminas

☑ Água

☐ Alongamento

☑ Caminhada

☐ Meditação

```

---

Cada hábito deverá atualizar imediatamente o Score Diário.

---

# Card Observações

Campo livre.

Multilinha.

---

Layout.

```

Observações

______________________

______________________

______________________

```

---

Altura inicial.

120 px.

---

Expansível.

---

# Wireframe Geral

```

────────────────────────────

Diário

02 Julho

────────────────────────────

Peso

87,3 kg

────────────────────────────

Abdômen

101 cm

────────────────────────────

Água

2,3 L

+200 +300 +500

────────────────────────────

Sono

7h45

────────────────────────────

Passos

8143

────────────────────────────

Hábitos

☑

☐

☑

────────────────────────────

Observações

──────────────

────────────────────────────

```

---

# Hierarquia Visual

Peso.

Maior destaque.

↓

Circunferência.

↓

Água.

↓

Sono.

↓

Passos.

↓

Hábitos.

↓

Observações.

---

# Estados

Loading.

↓

Skeleton.

---

Sem Registro.

↓

Mensagem.

↓

Criar Registro.

---

Offline.

↓

Indicador discreto.

---

Erro.

↓

Mensagem.

↓

Tentar novamente.

---

# Atualização Automática

Toda alteração deverá ser persistida imediatamente.

Nunca utilizar botão.

Salvar.

---

Cada alteração deverá executar.

Validation.

↓

Storage.

↓

Event Bus.

↓

Metrics.

↓

Dashboard.

↓

Render.

---

# Scroll

Vertical.

---

Preservar posição.

---

Nunca retornar ao topo após alterações.

---

# Navegação

Peso.

↓

Body Progress.

---

Água.

↓

Histórico de Água.

---

Sono.

↓

Histórico Sono.

---

Passos.

↓

Histórico.

---

Hábitos.

↓

Tela de Hábitos.

---

# Espaçamentos

Entre Cards.

24 px.

---

Padding.

24 px.

---

Padding inferior.

120 px.

---

# Tipografia

Título.

30 px.

Bold.

---

Valor Principal.

38 px.

Bold.

---

Texto Secundário.

17 px.

Regular.

---

Legenda.

15 px.

Regular.

---

# Feedback

Salvar.

Haptic Light.

---

Excluir.

Haptic Medium.

---

Concluir Hábito.

Haptic Success.

---

# Critérios de Aceitação

✓ Registro extremamente rápido.

✓ Sem botão Salvar.

✓ Persistência imediata.

✓ Compatível com modo Offline.

✓ Atualização automática do Dashboard.

✓ Atualização automática do Score.

✓ Compatível com Event Bus.

✓ Compatível com Metrics Engine.

# NUTRITION SCREEN

---

# Objetivo

A tela Nutrição deverá permitir registrar, visualizar e analisar toda a alimentação diária do usuário.

Ela deverá ser a segunda tela mais utilizada da plataforma.

O foco principal deverá ser rapidez de registro e clareza dos indicadores nutricionais.

---

# Prioridade Visual

Ordem dos elementos.

1. Resumo Nutricional.

2. Meta Diária.

3. Lista de Refeições.

4. Botão Nova Refeição.

5. Biblioteca Inteligente.

---

# Layout Geral

Estrutura.

Header

↓

Resumo Nutricional

↓

Cards de Macronutrientes

↓

Lista de Refeições

↓

Botão Flutuante

↓

Bottom Navigation

---

# Header

Conteúdo.

Título.

Nutrição.

↓

Data Atual.

↓

Botão Biblioteca.

↓

Botão Importar HWP_FOOD.

---

Exemplo.

```

Nutrição

02 Julho 2026

📚      ✨

```

---

Altura.

96 px.

---

Padding.

24 px.

---

# Card Resumo Nutricional

Conteúdo.

Calorias.

Proteínas.

Carboidratos.

Gorduras.

Fibras.

Meta.

---

Layout.

```

Hoje

1650 kcal

████████░░

Proteínas

132 g

Carboidratos

118 g

Gorduras

54 g

Fibras

28 g

```

---

Altura.

220 px.

---

Sempre permanecer no topo da tela.

---

# Cards de Macronutrientes

Cada macronutriente deverá possuir um Card próprio.

---

Proteínas.

```

132 g

Meta

150 g

████████░░

```

---

Carboidratos.

```

118 g

██████░░░░

```

---

Gorduras.

```

54 g

███████░░░

```

---

Fibras.

```

28 g

████████░░

```

---

Altura.

120 px.

---

# Lista de Refeições

As refeições deverão aparecer em ordem cronológica.

---

Estrutura.

Café da Manhã.

↓

Lanche.

↓

Almoço.

↓

Lanche.

↓

Jantar.

↓

Ceia.

---

Cada refeição deverá possuir um Card independente.

---

# Card da Refeição

Conteúdo.

Ícone.

Horário.

Nome.

Calorias.

Proteínas.

Menu contextual.

---

Exemplo.

```

🍳 Café da Manhã

07:32

2 ovos

280 kcal

24 g proteína

⋯

```

---

Altura.

120 px.

---

# Ações do Card

Tap.

↓

Abrir detalhes.

---

Long Press.

↓

Menu.

Editar.

Duplicar.

Mover.

Excluir.

Salvar na Biblioteca.

---

Swipe Left.

↓

Excluir.

---

Swipe Right.

↓

Duplicar.

---

Esses gestos deverão ser opcionais.

Nunca obrigatórios.

---

# Botão Flutuante

Posição.

Canto inferior direito.

---

Conteúdo.

+

Nova Refeição.

---

Ao tocar.

Abrir Bottom Sheet.

---

# Bottom Sheet

Opções.

Nova Refeição.

↓

Biblioteca Inteligente.

↓

Importar HWP_FOOD.

↓

Escanear Foto (futuro).

↓

Cancelar.

---

Nunca abrir tela cheia.

---

# Wireframe

```

────────────────────────────

Nutrição

────────────────────────────

1650 kcal

████████░░

P 132

C 118

G 54

F 28

────────────────────────────

🍳 Café

280 kcal

────────────────────────────

🍎 Lanche

180 kcal

────────────────────────────

🍛 Almoço

690 kcal

────────────────────────────

☕

Lanche

────────────────────────────

🥗

Jantar

────────────────────────────

+

Nova Refeição

```

---

# Biblioteca Inteligente

Ao tocar.

↓

Abrir Modal.

---

Pesquisa.

↓

Favoritos.

↓

Categorias.

↓

Mais utilizados.

↓

Mais recentes.

---

Nunca abrir nova tela.

---

# Importação HWP_FOOD

Ao tocar.

↓

Abrir Bottom Sheet.

↓

Campo para colar.

↓

Validar.

↓

Preview.

↓

Confirmar.

↓

Salvar.

---

Nunca salvar diretamente.

Preview obrigatório.

---

# Preview

Mostrar.

Nome.

Ingredientes.

Calorias.

Proteínas.

Carboidratos.

Gorduras.

Fibras.

Horário.

---

Botões.

Cancelar.

↓

Editar.

↓

Confirmar.

---

# Empty State

Quando não houver refeições.

Exibir.

```

🍽

Nenhuma refeição registrada.

Comece adicionando sua primeira refeição.

[ Nova Refeição ]

```

---

# Scroll

Vertical.

---

Sempre preservar posição.

---

# Navegação

Resumo.

↓

Detalhamento Nutricional.

---

Card.

↓

Detalhes da Meal.

---

Biblioteca.

↓

Modal Biblioteca.

---

Nova Refeição.

↓

Bottom Sheet.

---

Importação.

↓

Preview.

---

# Espaçamentos

Entre Cards.

20 px.

---

Padding lateral.

24 px.

---

Padding inferior.

140 px.

---

# Tipografia

Título.

30 px.

Bold.

---

Nome da Refeição.

20 px.

Semibold.

---

Calorias.

32 px.

Bold.

---

Macronutrientes.

16 px.

Regular.

---

Legenda.

15 px.

Regular.

# SMART LIBRARY SCREEN

---

# Objetivo

A Biblioteca Inteligente deverá permitir reutilizar refeições em poucos segundos.

Seu objetivo é reduzir drasticamente o tempo necessário para registrar refeições recorrentes.

Esta deverá ser uma das telas mais rápidas da plataforma.

---

# Prioridade Visual

Ordem dos elementos.

1. Campo de Pesquisa.

2. Categorias.

3. Mais Utilizadas.

4. Favoritas.

5. Mais Recentes.

6. Todas as Refeições.

---

# Layout Geral

Estrutura.

Header

↓

Pesquisa

↓

Categorias

↓

Carrossel de Favoritas

↓

Lista

↓

Bottom Navigation

---

# Header

Conteúdo.

Biblioteca Inteligente.

↓

Quantidade de refeições.

↓

Botão Fechar.

---

Exemplo.

```

Biblioteca

248 refeições

                ✕

```

---

Altura.

88 px.

---

# Campo de Pesquisa

Sempre visível.

Sempre fixo.

---

Placeholder.

```

Pesquisar refeição...

```

---

Pesquisar por.

Nome.

Ingrediente.

Categoria.

Proteína.

Horário.

Tags.

---

Resultados.

Atualização instantânea.

---

Nunca exigir botão.

Pesquisar.

---

# Categorias

Formato.

Chips horizontais.

---

Exemplo.

```

Todas

Café

Almoço

Jantar

Lanche

Sobremesa

Proteínas

Fit

Vegetariano

```

---

Scroll horizontal.

---

Uma categoria ativa.

---

# Carrossel

Mais Utilizadas.

---

Cards compactos.

---

Exemplo.

```

🍳

Ovos

42 usos

```

---

```

🍗

Frango

37 usos

```

---

```

🥩

Patinho

31 usos

```

---

Altura.

100 px.

---

Scroll horizontal.

---

# Lista Principal

Cada FavoriteMeal deverá ocupar um Card.

---

Conteúdo.

Ícone.

Nome.

Categoria.

Calorias.

Proteínas.

Quantidade de usos.

Última utilização.

---

Layout.

```

🍳

Ovos Mexidos

280 kcal

24 g proteína

Usado 42 vezes

Ontem

```

---

Altura.

120 px.

---

# Menu Contextual

Long Press.

↓

Editar.

Duplicar.

Excluir.

Exportar.

---

Tap.

↓

Adicionar ao Diário.

---

Nunca abrir imediatamente modo edição.

---

# Botão Principal

Cada Card.

↓

Botão.

Adicionar.

---

Exemplo.

```

+

Adicionar

```

---

Ao tocar.

↓

Selecionar horário.

↓

Criar Meal.

↓

Fechar Modal.

↓

Atualizar Dashboard.

---

# Wireframe

```

────────────────────────────

Biblioteca

248 refeições

────────────────────────────

Pesquisar...

────────────────────────────

Categorias

────────────────────────────

Favoritas

🍳

🍗

🥩

────────────────────────────

Ovos Mexidos

280 kcal

24 g proteína

+

────────────────────────────

Frango Grelhado

+

────────────────────────────

Patinho

+

────────────────────────────

```

---

# Ordenação

Usuário poderá ordenar.

Mais utilizadas.

↓

Mais recentes.

↓

Nome.

↓

Maior proteína.

↓

Menor caloria.

↓

Categoria.

---

Ordenação.

Bottom Sheet.

---

# Filtros

Categorias.

Proteína.

Calorias.

Macronutrientes.

Última utilização.

Favoritas.

---

Sempre mostrar filtros ativos.

---

# Estados

Loading.

↓

Skeleton.

---

Sem Resultados.

↓

Mensagem.

↓

Limpar filtros.

---

Biblioteca vazia.

↓

Mensagem.

↓

Criar primeira FavoriteMeal.

---

Offline.

↓

Funciona normalmente.

---

Erro.

↓

Tentar novamente.

---

# Scroll

Vertical.

---

Posição preservada.

---

Nunca retornar ao topo.

---

# Navegação

Tap.

↓

Adicionar Meal.

---

Long Press.

↓

Menu.

---

Pesquisa.

↓

Atualização instantânea.

---

Categorias.

↓

Filtro.

---

# Espaçamentos

Padding lateral.

24 px.

---

Entre Cards.

16 px.

---

Entre seções.

32 px.

---

# Tipografia

Título.

30 px.

Bold.

---

Nome.

20 px.

Semibold.

---

Calorias.

18 px.

Bold.

---

Informações.

15 px.

Regular.

---

# Performance

Pesquisa.

Menor que.

50 ms.

---

Filtro.

Menor que.

80 ms.

---

Scroll.

60 FPS.

---

Render.

Incremental.

---

Nunca recarregar toda Biblioteca.

---

# Acessibilidade

Pesquisa.

Compatível VoiceOver.

---

Categorias.

44 px mínimos.

---

Cards.

Accessibility Label.

Accessibility Hint.

---

# Critérios de Aceitação

✓ Pesquisa instantânea.

✓ Filtros rápidos.

✓ Adicionar refeição em menos de três toques.

✓ Compatível com Offline.

✓ Compatível com Dynamic Type.

✓ Compatível com VoiceOver.

✓ Compatível com iPhone.

✓ Compatível com iPad.

✓ Sem renderizações completas.

# BODY PROGRESS SCREEN

---

# Objetivo

A tela Evolução Corporal deverá permitir que o usuário visualize sua transformação física ao longo do tempo.

Seu objetivo é reforçar a motivação através de indicadores visuais claros e comparações objetivas.

---

# Prioridade Visual

Ordem dos elementos.

1. Peso Atual.

2. Evolução.

3. Fotos.

4. Circunferência.

5. Gráficos.

6. Projeção da Meta.

---

# Layout Geral

Estrutura.

Header

↓

Resumo Corporal

↓

Gráfico Principal

↓

Fotos Comparativas

↓

Indicadores

↓

Histórico

↓

Bottom Navigation

---

# Header

Conteúdo.

Evolução Corporal.

↓

Peso Atual.

↓

Botão Comparar Fotos.

↓

Botão Nova Foto.

---

Exemplo.

```

Evolução

87,3 kg

📷      ⇄

```

---

Altura.

96 px.

---

Padding.

24 px.

---

# Card Resumo Corporal

Conteúdo.

Peso Atual.

Meta.

Diferença.

Velocidade semanal.

IMC (opcional).

---

Layout.

```

Peso

87,3 kg

Meta

70 kg

↓

-17,3 kg

0,7 kg/semana

```

---

Altura.

180 px.

---

# Gráfico Principal

Tipo.

Linha.

---

Períodos.

7 dias.

30 dias.

90 dias.

1 ano.

Tudo.

---

Sempre mostrar.

Peso.

Meta.

Tendência.

---

Nunca utilizar gráfico 3D.

---

# Comparação de Fotos

Elemento principal da tela.

---

Layout.

```

Antes

         ⇄

Depois

```

---

Botão.

Comparar.

---

Ao tocar.

↓

Abrir seletor.

↓

Escolher fotos.

↓

Comparação lado a lado.

---

# Fotos

Cada foto deverá possuir.

Miniatura.

↓

Data.

↓

Peso.

↓

Posição corporal.

---

Layout.

```

📷

Frente

02 Jul

87,3 kg

```

---

Grid.

2 colunas iPhone.

4 colunas iPad.

---

# Indicadores

Cards.

Peso.

↓

Circunferência.

↓

IMC.

↓

Dias consecutivos.

↓

Meta restante.

↓

Velocidade.

---

Altura.

120 px.

---

# Histórico

Lista cronológica.

---

Cada item.

Data.

Peso.

Circunferência.

Observação.

---

Exemplo.

```

02 Jul

87,3 kg

101 cm

```

---

# Wireframe

```

────────────────────────────

Evolução

87,3 kg

────────────────────────────

██████▆▅▃

────────────────────────────

Antes

⇄

Depois

────────────────────────────

Peso

Circunferência

Velocidade

────────────────────────────

Fotos

📷 📷 📷 📷

────────────────────────────

Histórico

02 Jul

01 Jul

30 Jun

────────────────────────────

```

---

# Navegação

Gráfico.

↓

Tela expandida.

---

Foto.

↓

Visualizador.

---

Histórico.

↓

Registro do dia.

---

# Estados

Loading.

↓

Skeleton.

---

Sem Fotos.

↓

Mensagem.

↓

Adicionar Foto.

---

Sem Peso.

↓

Registrar Peso.

---

Offline.

↓

Funcionamento completo.

---

Erro.

↓

Recarregar.

---

# Scroll

Vertical.

---

Posição preservada.

---

# Comparação

Ao abrir comparação.

Utilizar transição suave.

Fade.

180 ms.

---

Permitir.

Zoom.

Pan.

---

Nunca alterar proporção das imagens.

---

# Espaçamentos

Padding lateral.

24 px.

---

Entre grupos.

32 px.

---

Entre Cards.

20 px.

---

# Tipografia

Título.

30 px.

Bold.

---

Peso.

42 px.

Bold.

---

Indicadores.

18 px.

Semibold.

---

Legenda.

15 px.

Regular.

---

# Feedback

Nova Foto.

Haptic Success.

---

Comparação.

Haptic Light.

---

Excluir Foto.

Haptic Warning.

---

# Performance

Carregar miniaturas.

Sob demanda.

---

Fotos.

Lazy Loading.

---

Gráficos.

Render incremental.

---

Nunca carregar imagens em resolução máxima na lista.

---

# Acessibilidade

Fotos.

Accessibility Label.

↓

Data.

↓

Peso.

↓

Posição.

---

Compatível.

VoiceOver.

Dynamic Type.

Reduce Motion.

---

# Critérios de Aceitação

✓ Comparação fluida.

✓ Gráficos rápidos.

✓ Fotos preservadas.

✓ Compatível com Backup.

✓ Compatível com Offline.

✓ Lazy Loading obrigatório.

✓ Compatível com iPhone.

✓ Compatível com iPad.

# WORKOUT SCREEN

---

# Objetivo

A tela Treinos deverá permitir registrar sessões de treino em poucos segundos.

O foco principal deverá ser velocidade de registro, acompanhamento da frequência semanal e visualização da evolução dos treinos.

Não deverá funcionar como um aplicativo completo de musculação.

---

# Prioridade Visual

Ordem dos elementos.

1. Status do treino de hoje.

2. Frequência semanal.

3. Histórico.

4. Próximo treino.

5. Botão Novo Treino.

---

# Layout Geral

Estrutura.

Header

↓

Status de Hoje

↓

Resumo Semanal

↓

Histórico

↓

Botão Flutuante

↓

Bottom Navigation

---

# Header

Conteúdo.

Treinos.

↓

Data Atual.

↓

Sequência atual.

↓

Botão Histórico.

---

Exemplo.

```

Treinos

02 Julho

🔥 5 dias

        📋

```

---

Altura.

96 px.

---

Padding.

24 px.

---

# Card Treino de Hoje

Conteúdo.

Status.

Horário.

Duração.

Tipo.

Botão Registrar.

---

Layout.

```

Treino de Hoje

✔ Concluído

Musculação

52 min

```

---

Caso ainda não exista treino.

```

Treino de Hoje

Ainda não registrado

[ Registrar ]

```

---

Altura.

180 px.

---

# Card Frequência

Conteúdo.

Treinos realizados.

Meta semanal.

Dias restantes.

---

Layout.

```

Semana

3 / 5

██████░░░

Faltam

2 treinos

```

---

Altura.

160 px.

---

# Histórico

Lista cronológica.

Cada item.

Tipo.

↓

Data.

↓

Horário.

↓

Duração.

↓

Observação.

---

Exemplo.

```

🏋

Musculação

18:40

52 min

```

---

```

🚶

Caminhada

07:15

32 min

```

---

Altura do Card.

110 px.

---

# Botão Flutuante

Posição.

Inferior direita.

---

Conteúdo.

+

Novo Treino.

---

Ao tocar.

↓

Abrir Bottom Sheet.

---

# Bottom Sheet

Opções.

Musculação.

↓

Cardio.

↓

Corrida.

↓

Caminhada.

↓

Bicicleta.

↓

Alongamento.

↓

Outro.

↓

Cancelar.

---

Nunca abrir tela cheia.

---

# Formulário

Campos.

Tipo.

↓

Data.

↓

Hora.

↓

Duração.

↓

Intensidade.

↓

Observações.

---

Campos opcionais.

Calorias.

↓

Frequência cardíaca.

↓

Carga total.

---

# Wireframe

```

────────────────────────────

Treinos

🔥 5 dias

────────────────────────────

Hoje

✔ Musculação

52 min

────────────────────────────

Semana

3 / 5

██████░░░

────────────────────────────

🏋

18:40

52 min

────────────────────────────

🚶

07:20

32 min

────────────────────────────

+

Novo Treino

```

---

# Menu Contextual

Long Press.

↓

Editar.

↓

Duplicar.

↓

Excluir.

---

Swipe Left.

↓

Excluir.

---

Swipe Right.

↓

Duplicar.

---

Gestos opcionais.

---

# Navegação

Card.

↓

Detalhes.

---

Histórico.

↓

Registro.

---

Sequência.

↓

Resumo Mensal.

---

# Estados

Loading.

↓

Skeleton.

---

Sem Treinos.

↓

Mensagem.

↓

Registrar Primeiro Treino.

---

Offline.

↓

Funcionamento completo.

---

Erro.

↓

Recarregar.

---

# Scroll

Vertical.

---

Preservar posição.

---

# Espaçamentos

Padding lateral.

24 px.

---

Entre Cards.

20 px.

---

Entre grupos.

32 px.

---

# Tipografia

Título.

30 px.

Bold.

---

Tipo de treino.

22 px.

Semibold.

---

Tempo.

32 px.

Bold.

---

Informações.

16 px.

Regular.

---

# Feedback

Registrar.

Haptic Success.

---

Excluir.

Haptic Warning.

---

Duplicar.

Haptic Light.

---

# Performance

Atualização.

Menor que.

100 ms.

---

Scroll.

60 FPS.

---

Lista.

Lazy Rendering.

---

# Acessibilidade

Todos os Cards.

Accessibility Label.

↓

Tipo.

↓

Duração.

↓

Data.

---

Compatível.

VoiceOver.

Dynamic Type.

Reduce Motion.

---

# Critérios de Aceitação

✓ Registro rápido.

✓ Histórico organizado.

✓ Frequência semanal correta.

✓ Compatível com Offline.

✓ Compatível com Backup.

✓ Lazy Rendering obrigatório.

✓ Compatível com iPhone.

✓ Compatível com iPad.

---

# MEDICATION SCREEN

---

# Objetivo

A tela Medicamentos deverá centralizar todo o controle de medicamentos e suplementos do usuário.

O foco principal deverá ser segurança, organização e facilidade de acompanhamento.

---

# Prioridade Visual

1. Próxima aplicação.

2. Medicamentos ativos.

3. Histórico de aplicações.

4. Efeitos colaterais registrados.

---

# Layout Geral

Header

↓

Próxima Aplicação

↓

Medicamentos Ativos

↓

Histórico

↓

Bottom Navigation

---

# Header

Conteúdo.

Medicamentos.

↓

Próxima dose.

↓

Botão Adicionar.

---

Exemplo.

```

Medicamentos

Próxima

Sexta • 09:00

          +

```

---

# Card Próxima Aplicação

Conteúdo.

Nome.

Dose.

Data.

Hora.

Contagem regressiva.

---

Layout.

```

Tirzepatida

5 mg

Sexta

09:00

Faltam

2 dias

```

---

Altura.

180 px.

---

# Lista de Medicamentos

Cada medicamento deverá possuir um Card.

Conteúdo.

Nome.

Dose.

Frequência.

Status.

Última aplicação.

---

Exemplo.

```

Tirzepatida

5 mg

Semanal

Última:

27 Jun

```

---

# Histórico

Lista cronológica.

Aplicações.

↓

Data.

↓

Hora.

↓

Dose.

↓

Observações.

---

# Botão Flutuante

+

Registrar Aplicação

---

Ao tocar.

↓

Bottom Sheet.

---

# Bottom Sheet

Selecionar medicamento.

↓

Dose.

↓

Data.

↓

Hora.

↓

Efeitos colaterais.

↓

Confirmar.

---

# Estados

Loading.

Sem Medicamentos.

Offline.

Erro.

---

# Performance

Atualização.

<100 ms.

---

Scroll.

60 FPS.

---

# Critérios de Aceitação

✓ Registro rápido.

✓ Histórico completo.

✓ Próxima aplicação sempre visível.

✓ Compatível com Backup.

✓ Compatível com Offline.

✓ Compatível com VoiceOver.

# SETTINGS SCREEN

---

# Objetivo

A tela Configurações deverá concentrar todas as preferências do usuário sem comprometer a simplicidade da aplicação.

O usuário deverá encontrar qualquer configuração em menos de três toques.

---

# Prioridade Visual

Ordem dos grupos.

1. Perfil.

2. Metas.

3. Aparência.

4. Backup.

5. Exportação.

6. Integrações.

7. Sobre.

---

# Layout Geral

Estrutura.

Header

↓

Perfil

↓

Metas

↓

Preferências

↓

Dados

↓

Sistema

↓

Bottom Navigation

---

# Header

Conteúdo.

Configurações.

↓

Nome do usuário.

↓

Foto.

---

Exemplo.

```

Configurações

Felipe Karam

👤

```

---

Altura.

96 px.

---

Padding.

24 px.

---

# Grupo Perfil

Itens.

Nome.

↓

Data de nascimento.

↓

Altura.

↓

Sexo.

↓

Foto.

---

Cada item.

Chevron.

>

---

Tap.

↓

Editar.

---

# Grupo Metas

Itens.

Peso-alvo.

↓

Proteínas.

↓

Calorias.

↓

Água.

↓

Sono.

↓

Passos.

↓

Treinos.

---

Cada meta deverá exibir.

Valor atual.

↓

Valor desejado.

---

Exemplo.

```

Peso

87,3

↓

70,0 kg

>

```

---

# Grupo Aparência

Itens.

Modo.

↓

Tema.

↓

Fonte.

↓

Animações.

↓

Idioma.

↓

Unidades.

---

Modo.

Claro.

Escuro.

Sistema.

---

Animações.

Ligado.

Desligado.

Reduzido.

---

# Grupo Backup

Itens.

Criar Backup.

↓

Restaurar Backup.

↓

Backup Automático.

↓

Último Backup.

---

Exemplo.

```

Último Backup

02 Jul

14:32

```

---

# Grupo Exportação

Itens.

PDF.

↓

Excel.

↓

CSV.

↓

JSON.

↓

Compartilhar.

---

# Grupo Integrações

Itens.

Apple Health.

↓

Health Connect.

↓

ChatGPT.

↓

Nuvem (futuro).

---

Itens indisponíveis.

Exibir.

"Em breve"

---

# Grupo Sistema

Itens.

Versão.

↓

Licenças.

↓

Política.

↓

Logs.

↓

Diagnóstico.

---

# Wireframe

```

────────────────────────────

Configurações

Felipe

────────────────────────────

Perfil

>

────────────────────────────

Metas

>

────────────────────────────

Aparência

>

────────────────────────────

Backup

>

────────────────────────────

Exportação

>

────────────────────────────

Integrações

>

────────────────────────────

Sistema

>

────────────────────────────

```

---

# Navegação

Tap.

↓

Tela correspondente.

---

Nunca utilizar menus aninhados além de dois níveis.

---

# Estados

Loading.

↓

Skeleton.

---

Erro.

↓

Mensagem.

↓

Tentar novamente.

---

Offline.

↓

Configurações disponíveis.

↓

Integrações indisponíveis quando necessário.

---

# Scroll

Vertical.

---

Posição preservada.

---

# Espaçamentos

Padding lateral.

24 px.

---

Entre grupos.

32 px.

---

Entre itens.

16 px.

---

# Tipografia

Título.

30 px.

Bold.

---

Grupo.

20 px.

Semibold.

---

Item.

17 px.

Regular.

---

Descrição.

15 px.

Regular.

---

# Feedback

Salvar.

Haptic Success.

---

Restaurar.

Haptic Warning.

---

Backup.

Haptic Medium.

---

# Performance

Mudança de configuração.

<100 ms.

---

Mudança de tema.

Instantânea.

---

# Acessibilidade

Todos os itens.

Accessibility Label.

↓

Accessibility Hint.

---

Área mínima.

44 px.

---

Compatível.

VoiceOver.

Dynamic Type.

High Contrast.

---

# Critérios de Aceitação

✓ Navegação intuitiva.

✓ Alterações persistidas imediatamente.

✓ Compatível com Offline.

✓ Compatível com Backup.

✓ Compatível com iPhone.

✓ Compatível com iPad.

---

# BACKUP & IMPORT SCREEN

---

# Objetivo

Permitir ao usuário proteger, restaurar e transferir todos os seus dados com segurança.

---

# Prioridade Visual

1. Criar Backup.

2. Restaurar Backup.

3. Histórico.

4. Exportação.

---

# Layout Geral

Header

↓

Resumo

↓

Ações

↓

Histórico

↓

Bottom Navigation

---

# Card Resumo

Conteúdo.

Último Backup.

↓

Tamanho.

↓

Versão.

↓

Status.

---

Layout.

```

Último Backup

02 Jul

14:32

Versão

3.0

Integridade

✓

```

---

Altura.

180 px.

---

# Card Criar Backup

Botão principal.

```

Criar Backup

```

---

Ao tocar.

↓

Animação de progresso.

↓

Compartilhamento.

---

# Card Restaurar

Botão.

```

Restaurar Backup

```

---

Ao tocar.

↓

Selecionar arquivo.

↓

Pré-visualização.

↓

Confirmação.

---

Nunca restaurar imediatamente.

---

# Histórico

Lista.

Data.

↓

Versão.

↓

Tamanho.

↓

Origem.

---

# Estados

Loading.

Criando.

Restaurando.

Erro.

Offline.

---

# Performance

Backup.

Barra de progresso obrigatória.

---

Operações longas.

Nunca bloquear a interface.

---

# Critérios de Aceitação

✓ Processo claro.

✓ Confirmação obrigatória.

✓ Pré-visualização antes da restauração.

✓ Compatível com SchemaVersion.

✓ Compatível com Rollback.

# TIMELINE SCREEN

---

# Objetivo

A Timeline representa a memória completa do HWP Platform.

Seu objetivo é permitir que o usuário visualize cronologicamente tudo o que aconteceu durante sua jornada de saúde.

A Timeline deverá funcionar como um diário inteligente.

---

# Prioridade Visual

Ordem dos elementos.

1. Pesquisa.

2. Filtros.

3. Timeline.

4. Resumo Diário.

---

# Layout Geral

Estrutura.

Header

↓

Pesquisa

↓

Filtros

↓

Linha do Tempo

↓

Bottom Navigation

---

# Header

Conteúdo.

Timeline.

↓

Quantidade de eventos.

↓

Botão Filtrar.

---

Exemplo.

```

Timeline

2.418 eventos

      🔍    ⚙

```

---

Altura.

96 px.

---

Padding.

24 px.

---

# Campo de Pesquisa

Sempre visível.

---

Placeholder.

```

Pesquisar eventos...

```

---

Pesquisar por.

Refeições.

↓

Peso.

↓

Treinos.

↓

Medicamentos.

↓

Fotos.

↓

Observações.

↓

Datas.

---

Pesquisa.

Atualização instantânea.

---

# Filtros

Formato.

Chips horizontais.

---

Exemplo.

```

Todos

🍽

🏋

⚖

💧

💉

📷

```

---

Permitir múltiplos filtros.

---

Filtros ativos.

Sempre destacados.

---

# Timeline

Cada evento deverá possuir um Card.

---

Conteúdo.

Ícone.

↓

Título.

↓

Descrição.

↓

Data.

↓

Hora.

↓

Indicadores.

↓

Menu.

---

Exemplo.

```

🍽

Almoço

690 kcal

13:12

Hoje

⋯

```

---

Outro exemplo.

```

⚖

Peso

87,3 kg

08:10

Hoje

```

---

Outro.

```

🏋

Treino

Musculação

52 min

18:41

```

---

# Agrupamento

Eventos deverão ser agrupados por data.

---

Exemplo.

```

Hoje

────────────

Eventos

────────────

Ontem

────────────

Eventos

────────────

30 Junho

────────────

Eventos

```

---

# Card Diário

Ao final de cada grupo.

Exibir resumo.

---

Conteúdo.

Calorias.

↓

Treino.

↓

Peso.

↓

Água.

↓

Score.

---

Exemplo.

```

Resumo do Dia

Score

92

Água

2,6 L

Treino

✔

```

---

# Wireframe

```

────────────────────────────

Timeline

────────────────────────────

Pesquisar...

────────────────────────────

Todos 🍽 🏋 ⚖ 💉

────────────────────────────

Hoje

────────────────────────────

🍽 Almoço

13:12

────────────────────────────

🏋 Treino

18:41

────────────────────────────

⚖ Peso

08:10

────────────────────────────

Resumo

92

────────────────────────────

```

---

# Menu Contextual

Long Press.

↓

Abrir origem.

↓

Editar.

↓

Duplicar.

↓

Excluir.

↓

Compartilhar.

---

Tap.

↓

Abrir detalhes.

---

# Navegação

Evento.

↓

Tela correspondente.

---

Peso.

↓

Body Progress.

---

Meal.

↓

Nutrition.

---

Workout.

↓

Workout.

---

Medication.

↓

Medication.

---

Foto.

↓

Body Progress.

---

# Estados

Loading.

↓

Skeleton.

---

Timeline vazia.

↓

Mensagem.

↓

Começar registros.

---

Offline.

↓

Funcionamento completo.

---

Erro.

↓

Recarregar.

---

# Scroll

Infinito.

---

Lazy Loading.

Obrigatório.

---

Nunca carregar toda Timeline.

---

# Espaçamentos

Padding.

24 px.

---

Entre Cards.

16 px.

---

Entre grupos.

32 px.

---

# Tipografia

Título.

30 px.

Bold.

---

Evento.

19 px.

Semibold.

---

Hora.

16 px.

Regular.

---

Descrição.

15 px.

Regular.

---

# Performance

Pesquisa.

<50 ms.

---

Scroll.

60 FPS.

---

Render.

Incremental.

---

# Acessibilidade

Todos os eventos.

Accessibility Label.

↓

Tipo.

↓

Data.

↓

Hora.

---

Compatível.

VoiceOver.

Dynamic Type.

---

# Critérios de Aceitação

✓ Pesquisa instantânea.

✓ Scroll infinito.

✓ Agrupamento por data.

✓ Compatível com Offline.

✓ Compatível com Backup.

✓ Lazy Loading obrigatório.

---

# GLOBAL SEARCH

---

# Objetivo

Permitir localizar qualquer informação da plataforma em um único lugar.

---

# Escopo

A pesquisa deverá localizar.

Meals.

↓

FavoriteMeals.

↓

Workouts.

↓

Weights.

↓

Photos.

↓

Medications.

↓

Goals.

↓

TimelineEvents.

↓

Observações.

---

# Layout

Header

↓

Campo Pesquisa

↓

Filtros

↓

Resultados

---

# Campo

Sempre focado ao abrir.

---

Placeholder.

```

Pesquisar qualquer informação...

```

---

# Resultados

Agrupados por tipo.

---

Exemplo.

```

Refeições

──────────

Ovos

Frango

──────────

Treinos

──────────

Musculação

──────────

Pesos

──────────

87,3 kg

```

---

# Estados

Sem resultados.

↓

Mensagem.

↓

Sugestões.

---

Carregando.

↓

Skeleton.

---

# Performance

Primeiros resultados.

<100 ms.

---

Pesquisa incremental.

Obrigatória.

---

# Critérios de Aceitação

✓ Pesquisa global.

✓ Incremental.

✓ Compatível com Offline.

✓ Agrupamento por tipo.


# CHATGPT INTEGRATION SCREEN

---

# Objetivo

A tela de integração com o ChatGPT deverá permitir importar informações utilizando linguagem natural ou o protocolo oficial HWP_FOOD.

O foco principal deverá ser simplicidade, rapidez e transparência.

---

# Prioridade Visual

Ordem dos elementos.

1. Campo de Entrada.

2. Histórico de Importações.

3. Preview.

4. Sugestões.

---

# Layout Geral

Estrutura.

Header

↓

Campo de Entrada

↓

Botões de Importação

↓

Preview

↓

Histórico

↓

Bottom Navigation

---

# Header

Conteúdo.

Nutri IA+

↓

Status da conexão.

↓

Botão Ajuda.

---

Exemplo.

```

✨ Nutri IA+

Pronto para importar

         ?

```

---

Altura.

96 px.

---

Padding.

24 px.

---

# Campo Principal

Placeholder.

```

Cole aqui um bloco HWP_FOOD
ou descreva sua refeição.

```

---

Altura mínima.

180 px.

---

Expansível.

---

Nunca limitar visualmente textos longos.

---

# Botões

Importar.

↓

Limpar.

↓

Colar.

---

Botão principal.

```

Importar Refeição

```

---

Botão secundário.

```

Limpar

```

---

# Preview

Sempre obrigatório.

---

Conteúdo.

Nome.

↓

Ingredientes.

↓

Calorias.

↓

Proteínas.

↓

Carboidratos.

↓

Gorduras.

↓

Fibras.

↓

Horário.

↓

Categoria.

---

Layout.

```

Frango Grelhado

520 kcal

Proteínas

48 g

Carboidratos

32 g

Gorduras

14 g

```

---

Botões.

Cancelar.

↓

Editar.

↓

Confirmar.

---

Nunca permitir salvar sem Preview.

---

# Histórico

Lista.

Últimas importações.

---

Cada item.

Data.

↓

Horário.

↓

Nome.

↓

Status.

---

Exemplo.

```

02 Jul

Almoço

Importado

✓

```

---

# Sugestões

Exibir exemplos.

```

Cole um HWP_FOOD

ou

Descreva.

"Comi dois ovos,
um pão francês
e café."

```

---

# Wireframe

```

────────────────────────────

✨ Nutri IA+

────────────────────────────

[ Campo ]

────────────────────────────

Importar

Limpar

────────────────────────────

Preview

520 kcal

48 g proteína

────────────────────────────

Histórico

────────────────────────────

```

---

# Estados

Aguardando.

↓

Validando.

↓

Preview.

↓

Importando.

↓

Concluído.

↓

Erro.

---

# Feedback

Validação.

Animação discreta.

---

Importação concluída.

Haptic Success.

---

Erro.

Haptic Warning.

---

# Performance

Validação local.

Instantânea.

---

Preview.

<150 ms.

---

Importação.

<300 ms.

---

# Acessibilidade

Campo.

Dynamic Type.

↓

VoiceOver.

↓

Ditado.

---

Compatível com teclado externo.

---

# Critérios de Aceitação

✓ Preview obrigatório.

✓ Histórico preservado.

✓ Compatível com HWP_FOOD.

✓ Compatível com modo Offline para importações locais.

---

# EXPORT SCREEN

---

# Objetivo

Permitir exportar informações da plataforma em diversos formatos.

---

# Layout

Header

↓

Formato

↓

Período

↓

Opções

↓

Botão Exportar

---

# Formatos

PDF.

↓

Excel.

↓

CSV.

↓

JSON.

---

Sempre exibir descrição do formato.

---

# Seleção do Período

Hoje.

↓

Últimos 7 dias.

↓

30 dias.

↓

90 dias.

↓

Personalizado.

---

# Opções

Incluir Fotos.

↓

Incluir Timeline.

↓

Incluir Metadados.

↓

Compactar Arquivo.

---

# Botão Principal

```

Exportar

```

---

Após exportação.

↓

Compartilhamento do sistema.

---

Nunca salvar automaticamente.

---

# Estados

Selecionando.

↓

Gerando.

↓

Compartilhando.

↓

Concluído.

↓

Erro.

---

# Critérios de Aceitação

✓ Processo intuitivo.

✓ Compartilhamento nativo.

✓ Compatível com Backup.

# Objetivo

Quando instalado como aplicativo, o HWP Platform deverá parecer um aplicativo nativo.

---

# Splash Screen

Exibir.

Logo.

↓

Nome.

↓

Versão.

---

Tempo máximo.

800 ms.

---

Nunca superior a.

1 segundo.

---

# Navegação

Sem barras do navegador.

---

Tela cheia.

---

Compatível com Safe Areas.

---

# Atualizações

Quando houver nova versão.

↓

Banner discreto.

↓

Botão Atualizar.

---

Nunca interromper uma operação do usuário.

---

# Offline

Sempre exibir indicador discreto.

---

Operações continuam normalmente.

---

# Critérios de Aceitação

✓ Aparência nativa.

✓ Sem elementos do navegador.

✓ Atualizações não intrusivas.

✓ Compatível com iOS.

✓ Compatível com Android.

# GLOBAL UI STATES

---

# Objetivo

Definir o comportamento padrão de todos os estados visuais da plataforma.

Toda tela deverá implementar obrigatoriamente estes estados.

Nenhuma View poderá existir sem tratamento para todos eles.

---

# Estados Obrigatórios

Todas as telas deverão possuir.

Loading.

↓

Skeleton.

↓

Empty.

↓

Offline.

↓

Atualizando.

↓

Erro.

↓

Sucesso.

---

# LOADING

Objetivo.

Informar que a interface está carregando.

Nunca bloquear totalmente a navegação.

---

## Skeleton

Sempre substituir os componentes reais.

Nunca utilizar spinner como elemento principal.

---

Exemplo.

```

██████████

██████████

██████████

```

---

Tempo esperado.

Menor que.

300 ms.

---

Caso ultrapasse.

Exibir mensagem.

```

Carregando informações...

```

---

# EMPTY STATE

Objetivo.

Informar ausência de dados.

Nunca deixar áreas vazias.

---

Estrutura.

Ilustração.

↓

Título.

↓

Descrição.

↓

Ação principal.

---

Exemplo.

```

📋

Nenhum registro encontrado.

Comece adicionando seu primeiro registro.

[ Adicionar ]

```

---

Toda tela deverá possuir Empty State próprio.

---

# OFFLINE STATE

Objetivo.

Permitir funcionamento integral da aplicação.

---

Quando Offline.

Exibir indicador discreto.

Nunca utilizar popups.

---

Exemplo.

```

● Offline

```

---

Operações permitidas.

Criar.

Editar.

Excluir.

Consultar.

Pesquisar.

Exportar.

---

Operações indisponíveis.

Integrações Online.

Sincronização.

---

Quando conexão retornar.

Executar sincronização automática.

---

# UPDATING

Objetivo.

Informar atualização parcial.

---

Nunca bloquear interface.

---

Utilizar.

Progress Indicator discreto.

---

Exemplo.

```

Atualizando...

```

---

Tempo máximo.

150 ms.

---

# ERROR STATE

Objetivo.

Comunicar erros de maneira clara.

---

Estrutura.

Ícone.

↓

Título.

↓

Descrição.

↓

Ação principal.

---

Exemplo.

```

⚠

Ocorreu um problema.

[Tentar novamente]

```

---

Nunca exibir mensagens técnicas.

---

Nunca exibir Stack Trace.

---

Sempre registrar Log interno.

---

# SUCCESS STATE

Objetivo.

Confirmar operação concluída.

---

Utilizar.

Toast discreto.

↓

Haptic Feedback.

↓

Ícone.

---

Exemplo.

```

✔ Registro salvo.

```

---

Tempo.

2 segundos.

---

Nunca exigir confirmação.

---

# CONFIRMATION DIALOG

Objetivo.

Evitar operações irreversíveis.

---

Utilizar apenas para.

Excluir.

↓

Restaurar Backup.

↓

Resetar Dados.

↓

Alterações críticas.

---

Nunca solicitar confirmação para.

Salvar.

↓

Editar.

↓

Registrar.

↓

Atualizar.

---

Exemplo.

```

Excluir refeição?

Esta ação não poderá ser desfeita.

[Cancelar]

[Excluir]

```

---

# TOASTS

Utilização.

Operações rápidas.

---

Exemplos.

Registro salvo.

↓

Backup criado.

↓

Exportação concluída.

↓

Importação realizada.

---

Posição.

Parte inferior.

---

Tempo.

2 segundos.

---

Nunca interromper interação.

---

# SNACKBARS

Utilização.

Operações reversíveis.

---

Exemplo.

```

Refeição excluída.

[Desfazer]

```

---

Tempo.

5 segundos.

---

# MODALS

Utilização.

Operações importantes.

---

Nunca utilizar Modals para formulários longos.

---

Máximo recomendado.

60% da altura da tela.

---

# BOTTOM SHEETS

Padrão oficial da plataforma.

---

Utilizar para.

Escolhas.

↓

Menus.

↓

Importações.

↓

Filtros.

↓

Compartilhamentos.

---

Nunca abrir tela inteira sem necessidade.

---

# DRAWERS

Não utilizar.

---

Toda navegação deverá ocorrer por telas ou Bottom Sheets.

---

# LOADING PROGRESS

Operações longas.

Backup.

↓

Importação.

↓

Exportação.

↓

Migração.

---

Sempre utilizar barra de progresso.

Nunca Spinner infinito.

---

# FEEDBACK VISUAL

Salvar.

↓

Toast.

↓

Haptic Success.

---

Excluir.

↓

Snackbar.

↓

Haptic Warning.

---

Atualizar.

↓

Progress Indicator.

---

Erro.

↓

Toast vermelho.

↓

Haptic Error.

---

# Performance

Mudança entre estados.

<100 ms.

---

Animação.

180 ms.

---

Nunca reconstruir a tela inteira.

---

# Critérios de Aceitação

✓ Toda tela implementa todos os estados.

✓ Skeleton obrigatório.

✓ Empty State obrigatório.

✓ Offline obrigatório.

✓ Atualização parcial.

✓ Toasts padronizados.

✓ Snackbars padronizados.

✓ Bottom Sheets padronizados.

✓ Feedback tátil consistente.

✓ Nenhuma tela sem tratamento de erro.

# GLOBAL ANIMATIONS

---

# Objetivo

Definir oficialmente todas as animações do HWP Platform.

Toda animação deverá transmitir fluidez, leveza e velocidade.

A interface nunca deverá parecer lenta ou chamativa.

O usuário deverá perceber que a aplicação responde imediatamente às suas ações.

---

# Filosofia

As animações deverão seguir quatro princípios.

Naturalidade.

↓

Rapidez.

↓

Discrição.

↓

Consistência.

---

Nunca utilizar animações apenas por estética.

Toda animação deverá comunicar uma mudança de estado.

---

# Duração Oficial

Micro interação

120 ms

---

Interação padrão

180 ms

---

Mudança de tela

220 ms

---

Bottom Sheet

250 ms

---

Modal

250 ms

---

Nunca utilizar animações superiores a

300 ms.

---

# Curvas de Animação

Padrão oficial.

Ease Out.

---

Abertura.

Ease Out.

---

Fechamento.

Ease In.

---

Movimento contínuo.

Ease In Out.

---

Nunca utilizar animações lineares.

---

# Entrada das Telas

Ao abrir qualquer tela.

Fade In

+

Slide Bottom

---

Distância

12 px.

---

Duração

180 ms.

---

Opacidade

0%

↓

100%

---

# Troca de Abas

Bottom Navigation.

---

Apenas.

Cross Fade.

---

Nunca mover toda a interface.

---

Tempo.

150 ms.

---

# Cards

Ao aparecer.

Fade

+

Scale

98%

↓

100%

---

Tempo.

180 ms.

---

Nunca utilizar Bounce.

---

# Atualização dos Cards

Após qualquer alteração.

Cross Fade.

↓

Atualizar apenas o Card afetado.

---

Nunca atualizar todos os Cards.

---

# Gráficos

Ao carregar.

Desenho progressivo.

---

Linhas.

Esquerda

↓

Direita.

---

Tempo.

250 ms.

---

# Barras de Progresso

Sempre animadas.

---

Mudança.

Suave.

---

Tempo.

250 ms.

---

Nunca alterar instantaneamente.

---

# Contadores

Peso.

↓

Calorias.

↓

Proteínas.

↓

Passos.

↓

Água.

---

Atualização.

Contagem progressiva.

---

Tempo.

300 ms.

---

# Bottom Sheets

Abrir.

Slide Bottom.

---

Fechar.

Slide Down.

---

Tempo.

220 ms.

---

Background.

Fade.

---

# Modals

Fade.

+

Scale.

95%

↓

100%

---

Tempo.

200 ms.

---

# Toast

Fade In.

↓

2 segundos.

↓

Fade Out.

---

Nunca bloquear interação.

---

# Snackbars

Slide Bottom.

↓

5 segundos.

↓

Slide Down.

---

# Skeleton

Animação.

Shimmer.

---

Velocidade.

Lenta.

---

Nunca utilizar piscadas.

---

# Timeline

Novos eventos.

↓

Slide Top.

↓

Fade.

---

Tempo.

180 ms.

---

# Fotos

Miniaturas.

Fade.

↓

Lazy Loading.

---

Imagem completa.

Zoom suave.

---

# Dashboard

Ao abrir.

Header.

↓

Cards Fixos.

↓

Cards Dinâmicos.

↓

Timeline.

---

Cada grupo.

Intervalo.

40 ms.

---

Nunca animar todos simultaneamente.

---

# Navegação

Ao abrir uma tela.

Preservar contexto visual.

---

Nunca utilizar transições bruscas.

---

# Gestos

Swipe.

↓

Mover elemento.

↓

Soltar.

↓

Spring Animation.

---

Tempo.

200 ms.

---

# Pull To Refresh

Progress Indicator.

↓

Atualizar.

↓

Fade.

---

Nunca girar indefinidamente.

---

# Erros

Shake Animation.

Apenas.

Campos inválidos.

---

Distância.

6 px.

---

Tempo.

120 ms.

---

Nunca utilizar Shake na tela inteira.

---

# Sucesso

Check animado.

↓

Toast.

↓

Haptic Success.

---

Tempo total.

2 segundos.

---

# Exclusão

Swipe.

↓

Desaparecer.

↓

Collapse.

---

Tempo.

200 ms.

---

# Restauração

Expand.

↓

Fade.

---

Tempo.

180 ms.

---

# Performance

Toda animação.

60 FPS.

---

Nunca bloquear Thread principal.

---

Nunca utilizar animações pesadas.

---

Respeitar.

Reduce Motion.

---

Quando ativado.

Substituir animações por Fade simples.

---

# Critérios de Aceitação

✓ Todas as animações padronizadas.

✓ 60 FPS.

✓ Compatível com Reduce Motion.

✓ Atualizações incrementais.

✓ Sem Bounce.

✓ Sem animações excessivas.

✓ Feedback imediato.

---

# GLOBAL GESTURES

---

# Objetivo

Padronizar toda interação por gestos.

---

# Tap

Abrir.

Selecionar.

Confirmar.

---

Tempo máximo.

100 ms.

---

# Double Tap

Reservado.

Favoritos.

Futuras funcionalidades.

---

# Long Press

Abrir Menu Contextual.

---

Tempo.

500 ms.

---

# Swipe Left

Excluir.

Arquivar.

Remover.

---

Sempre exibir confirmação visual.

---

# Swipe Right

Duplicar.

Adicionar.

Registrar.

---

Nunca executar ações irreversíveis.

---

# Drag

Reordenar listas.

---

Nunca utilizado para navegação.

---

# Pinch

Apenas.

Fotos.

Gráficos.

---

# Zoom

Somente.

Fotos.

---

# Pull To Refresh

Atualização manual.

---

Nunca obrigatório.

---

# Scroll

Sempre vertical.

---

Horizontal.

Apenas.

Carrosséis.

Categorias.

Gráficos.

---

# Feedback Tátil

Tap importante.

↓

Light.

---

Salvar.

↓

Success.

---

Erro.

↓

Error.

---

Excluir.

↓

Warning.

---

Nunca utilizar vibração contínua.

---

# Critérios de Aceitação

✓ Gestos consistentes.

✓ Feedback imediato.

✓ Compatível com iOS.

✓ Compatível com Android.

✓ Gestos nunca obrigatórios.

# RESPONSIVE DESIGN

---

# Objetivo

Garantir que toda a interface do HWP Platform adapte-se perfeitamente a qualquer dispositivo suportado.

A experiência deverá parecer nativa em todos os tamanhos de tela.

---

# Dispositivos Suportados

iPhone SE

↓

iPhone Mini

↓

iPhone Standard

↓

iPhone Plus

↓

iPhone Pro

↓

iPhone Pro Max

↓

iPad Mini

↓

iPad Air

↓

iPad Pro

↓

Desktop

---

# Filosofia

Nunca ampliar componentes apenas para ocupar espaço.

Sempre reorganizar o Layout.

---

# Breakpoints Oficiais

Compact

0–599 px

---

Medium

600–1023 px

---

Expanded

1024 px+

---

# iPhone

Layout.

Uma coluna.

---

Cards.

100% largura.

---

Bottom Navigation.

Obrigatória.

---

FAB.

Inferior direita.

---

# iPad

Layout.

Até duas colunas.

---

Dashboard.

Grid adaptativo.

---

Cards.

Largura flexível.

---

Sidebar opcional.

---

# Desktop

Layout.

Até três colunas.

---

Conteúdo centralizado.

---

Largura máxima.

1440 px.

---

Nunca esticar componentes indefinidamente.

---

# Orientação

Portrait.

Padrão.

---

Landscape.

Suportado.

---

Nunca bloquear orientação.

---

# Safe Areas

Sempre respeitar.

Notch.

↓

Dynamic Island.

↓

Home Indicator.

↓

Status Bar.

---

# KEYBOARD BEHAVIOR

---

Objetivo.

Evitar que o teclado esconda informações.

---

Campos focados.

Sempre visíveis.

---

Scroll automático.

Obrigatório.

---

Nunca esconder botão principal.

---

# Dynamic Type

Compatível.

Obrigatório.

---

Todos os textos deverão aumentar proporcionalmente.

---

Nunca quebrar Layout.

---

# Reduce Motion

Quando ativado.

↓

Substituir animações.

↓

Fade.

---

Nunca ignorar preferência do usuário.

---

# High Contrast

Compatível.

---

Todos os componentes.

AA mínimo.

---

AAA recomendado.

---

# Dark Mode

Compatível.

Obrigatório.

---

Nunca utilizar preto absoluto.

---

Nunca utilizar branco absoluto.

---

# Light Mode

Compatível.

Obrigatório.

---

# Rotation

Ao girar dispositivo.

↓

Preservar estado.

↓

Preservar Scroll.

↓

Preservar formulário.

---

Nunca perder dados.

---

# Split View

Compatível.

iPad.

---

Layout adaptável.

---

# Multi Window

Preparado.

---

# Critérios de Aceitação

✓ Todos os dispositivos suportados.

✓ Dynamic Type.

✓ Dark Mode.

✓ Landscape.

✓ Safe Areas.

✓ Keyboard Safe.

✓ Sem perda de estado.

---

# ACCESSIBILITY

---

# Objetivo

Garantir que qualquer pessoa consiga utilizar o HWP Platform.

---

# VoiceOver

Compatível.

Obrigatório.

---

Todos os componentes deverão possuir.

Accessibility Label.

↓

Accessibility Hint.

↓

Accessibility Value.

---

# Área de Toque

Mínimo.

44 x 44 px.

---

Nunca utilizar áreas menores.

---

# Texto

Tamanho mínimo.

15 px.

---

Contraste.

AA obrigatório.

---

# Ícones

Nunca utilizar apenas ícones.

Sempre acompanhar texto.

---

# Cores

Nunca comunicar informação apenas pela cor.

---

Sempre utilizar.

Texto.

↓

Ícone.

↓

Forma.

---

# Navegação por Teclado

Compatível.

---

# Leitores de Tela

Compatível.

---

# Ordem de Foco

Sempre lógica.

---

Nunca permitir foco perdido.

---

# Campos

Erro.

↓

Lido automaticamente.

---

Placeholder.

Nunca substituir Label.

---

# Feedback

Sucesso.

↓

Anunciado.

---

Erro.

↓

Anunciado.

---

# Reduce Transparency

Compatível.

---

# Bold Text

Compatível.

---

# Critérios de Aceitação

✓ VoiceOver.

✓ Dynamic Type.

✓ Reduce Motion.

✓ High Contrast.

✓ Keyboard Navigation.

✓ Áreas mínimas.

✓ Ordem lógica.

---

# DESIGN TOKENS

---

# Objetivo

Centralizar todos os valores visuais da plataforma.

Nenhum valor deverá ser repetido diretamente nos componentes.

---

# Espaçamentos

XS

8 px

---

SM

16 px

---

MD

24 px

---

LG

32 px

---

XL

48 px

---

XXL

64 px

---

# Border Radius

SM

12 px

---

MD

16 px

---

LG

24 px

---

XL

32 px

---

# Elevação

Level 0

Sem sombra.

---

Level 1

Cards.

---

Level 2

Bottom Sheet.

---

Level 3

Modal.

---

# Duração

Fast

120 ms

---

Normal

180 ms

---

Slow

250 ms

---

# Opacidade

Disabled

40%

---

Secondary

70%

---

Primary

100%

---

# Grid

Base.

8 px.

---

Nunca utilizar outros valores.

---

# Tipografia

Display

40 px

---

Headline

30 px

---

Title

22 px

---

Body

17 px

---

Caption

15 px

---

# Critérios de Aceitação

✓ Nenhum valor hardcoded.

✓ Todos os componentes utilizam Tokens.

✓ Fácil alteração futura.

# IMPLEMENTATION GUIDELINES

---

# Objetivo

Definir as regras obrigatórias para implementação de qualquer interface do HWP Platform.

Este documento deverá ser considerado vinculativo para qualquer desenvolvedor ou agente de IA responsável pela implementação.

Nenhuma tela deverá ser criada sem seguir estas diretrizes.

---

# Filosofia

A Interface deverá transmitir.

Rapidez.

↓

Clareza.

↓

Elegância.

↓

Precisão.

↓

Confiabilidade.

↓

Sensação Premium.

---

Toda decisão de UI deverá favorecer a experiência do usuário.

Nunca apenas a facilidade de implementação.

---

# Ordem de Construção

Toda nova tela deverá seguir exatamente esta sequência.

Objetivo.

↓

Wireframe.

↓

Layout.

↓

Componentes.

↓

Estados.

↓

Navegação.

↓

Animações.

↓

Gestos.

↓

Acessibilidade.

↓

Performance.

↓

Critérios de Aceitação.

---

Nunca inverter esta ordem.

---

# Componentização

Todo componente deverá ser reutilizável.

Nunca criar componentes exclusivos quando um componente genérico puder ser utilizado.

---

Exemplos.

PrimaryButton.

↓

SecondaryButton.

↓

InfoCard.

↓

MetricCard.

↓

StatCard.

↓

ProgressBar.

↓

CircularProgress.

↓

TimelineCard.

↓

BottomSheet.

↓

Modal.

↓

Toast.

↓

Snackbar.

↓

StatusBanner.

↓

EmptyState.

↓

Skeleton.

---

Todos deverão utilizar Design Tokens.

---

# Reutilização

Sempre reutilizar componentes existentes.

Antes de criar um novo componente verificar.

Existe componente semelhante?

↓

Pode ser parametrizado?

↓

Pode ser estendido?

↓

Somente criar novo componente quando necessário.

---

# Performance

Toda interface deverá priorizar.

Renderização incremental.

↓

Lazy Loading.

↓

Virtualização de listas.

↓

Cache de imagens.

↓

Memoização.

↓

Componentes leves.

---

Nunca.

Renderizar listas completas.

↓

Carregar imagens originais.

↓

Executar cálculos na Interface.

↓

Bloquear a Thread principal.

---

# Organização Visual

Toda tela deverá possuir.

Header.

↓

Conteúdo.

↓

Ação Principal.

↓

Bottom Navigation.

---

Nunca utilizar elementos flutuando aleatoriamente.

---

# Consistência

Todo componente deverá possuir.

Mesmo Radius.

↓

Mesmo Padding.

↓

Mesmo comportamento.

↓

Mesmas animações.

↓

Mesmo Feedback.

---

Nunca existirão dois componentes iguais com comportamentos diferentes.

---

# Navegação

Toda navegação deverá ser previsível.

O usuário sempre deverá saber.

Onde está.

↓

Como voltar.

↓

O que acontecerá ao tocar.

---

Nunca utilizar navegação inesperada.

---

# Feedback

Toda ação deverá gerar feedback.

Salvar.

↓

Toast.

↓

Haptic.

---

Erro.

↓

Mensagem.

↓

Ação sugerida.

---

Excluir.

↓

Snackbar.

↓

Desfazer.

---

Nunca deixar o usuário sem retorno visual.

---

# Estados

Toda tela deverá implementar.

Loading.

↓

Skeleton.

↓

Empty.

↓

Offline.

↓

Erro.

↓

Atualizando.

↓

Sucesso.

---

Nenhuma exceção.

---

# Compatibilidade

Obrigatória.

iPhone.

↓

iPad.

↓

Desktop.

↓

Modo Claro.

↓

Modo Escuro.

↓

VoiceOver.

↓

Dynamic Type.

↓

Landscape.

↓

Offline.

---

# Segurança da Interface

Nunca perder dados por falha visual.

↓

Nunca permitir operações irreversíveis sem confirmação.

↓

Nunca bloquear a aplicação durante operações longas.

↓

Sempre permitir recuperação.

---

# Checklist do Desenvolvedor

Antes de finalizar qualquer tela verificar.

☐ Objetivo implementado.

☐ Layout conforme especificação.

☐ Design Tokens utilizados.

☐ Responsividade validada.

☐ Safe Areas respeitadas.

☐ Dark Mode funcionando.

☐ Dynamic Type funcionando.

☐ VoiceOver funcionando.

☐ Reduce Motion funcionando.

☐ Estados implementados.

☐ Skeleton implementado.

☐ Empty State implementado.

☐ Offline implementado.

☐ Toast implementado.

☐ Snackbar implementado.

☐ Bottom Sheet implementado.

☐ Feedback Tátil implementado.

☐ Navegação funcionando.

☐ Performance validada.

☐ Critérios de Aceitação atendidos.

---

# Checklist do Codex

Antes de implementar qualquer tela.

☐ Ler este documento.

☐ Verificar Architecture.

☐ Verificar Design System.

☐ Verificar Data Model.

☐ Verificar Modules.

☐ Verificar User Flows.

☐ Utilizar apenas componentes oficiais.

☐ Utilizar Design Tokens.

☐ Nunca criar componentes duplicados.

☐ Nunca alterar a arquitetura.

☐ Nunca alterar o Data Model.

☐ Nunca alterar Event Bus.

☐ Nunca alterar Metrics Engine.

☐ Nunca alterar Storage.

☐ Nunca alterar nomenclaturas oficiais.

---

# Padrão Visual Oficial

Toda interface deverá transmitir.

Apple Quality.

↓

Minimalismo.

↓

Elegância.

↓

Baixa carga cognitiva.

↓

Leitura extremamente rápida.

↓

Sensação de aplicativo nativo.

---

Nunca copiar interfaces existentes.

Inspirar-se apenas nos princípios de usabilidade e organização visual.

---

# Objetivo Final da Interface

Ao abrir o HWP Platform o usuário deverá sentir que.

• Todas as informações importantes estão imediatamente visíveis.

• A navegação é intuitiva.

• Cada ação possui resposta imediata.

• O aplicativo é rápido.

• O aplicativo é confiável.

• O aplicativo parece nativo.

• O aplicativo transmite qualidade profissional.

---

# HISTÓRICO DO DOCUMENTO

## Versão 3.0

Primeira especificação oficial da interface do HWP Platform.

Inclui.

• Filosofia visual.

• Dashboard.

• Diário.

• Nutrição.

• Biblioteca Inteligente.

• Evolução Corporal.

• Treinos.

• Medicamentos.

• Configurações.

• Timeline.

• Busca Global.

• Nutri IA+.

• Exportação.

• PWA Experience.

• Estados Globais.

• Animações.

• Gestos.

• Responsividade.

• Acessibilidade.

• Design Tokens.

---

# DOCUMENTO CONCLUÍDO

Este documento representa a especificação oficial da Interface do HWP Platform 3.0.

Toda implementação deverá seguir rigorosamente estas definições.

Qualquer alteração futura deverá ser realizada através de revisão deste documento.

# FIM DO DOCUMENTO




