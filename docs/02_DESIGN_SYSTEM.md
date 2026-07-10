# HWP Platform 3.0

# 02 - DESIGN SYSTEM

Versão: 1.0

Status: Oficial

Documento obrigatório para todo desenvolvimento da interface.

---

# Objetivo

Definir a identidade visual oficial do HWP Platform.

Toda interface deverá seguir este documento.

Nenhum componente poderá ser desenvolvido sem respeitar estes padrões.

---

# Filosofia de Design

O HWP Platform deverá transmitir sensação de:

- simplicidade;
- precisão;
- organização;
- tecnologia;
- confiança.

A interface deverá parecer um produto premium.

Nunca um projeto experimental.

---

# Princípios do Design

Toda decisão visual deverá respeitar os princípios abaixo.

## Clareza

O usuário deve compreender imediatamente cada tela.

Evitar excesso de informação.

Evitar excesso de cores.

Evitar excesso de botões.

---

## Espaço em Branco

Espaços vazios fazem parte do design.

Nunca preencher a tela apenas porque existe espaço disponível.

---

## Hierarquia

O usuário deverá identificar facilmente:

- informação principal;
- informação secundária;
- ações disponíveis.

A hierarquia deverá ser construída utilizando:

- tamanho;
- peso tipográfico;
- espaçamento;
- contraste.

Nunca utilizando excesso de cores.

---

## Consistência

Todo componente deverá possuir comportamento previsível.

Botões iguais.

Cards iguais.

Animações iguais.

Ícones consistentes.

---

## Feedback

Toda ação deverá produzir resposta visual.

Exemplos:

- animação suave;

- barra atualizada;

- toast;

- indicador.

O usuário nunca deverá ficar em dúvida se uma ação foi executada.

---

# Inspirações

O HWP Platform NÃO copiará interfaces existentes.

Entretanto, utilizará como referência:

Apple Health

Apple Fitness

Notion

Linear

Tesla App

Arc Browser

Essas referências servem apenas para orientar linguagem visual.

---

# Paleta Oficial

## Cor Primária

Azul

Uso:

ações principais.

botões.

links.

progresso.

---

## Cor Secundária

Verde

Uso:

metas atingidas.

hábitos concluídos.

indicadores positivos.

---

## Cor de Atenção

Laranja

Uso:

alertas.

metas próximas.

informações importantes.

---

## Cor Crítica

Vermelho

Uso:

erros.

dados inconsistentes.

ações destrutivas.

---

## Tons Neutros

Escala completa de cinzas.

Utilizados em:

fundos.

bordas.

textos.

cards.

---

# Modo Claro

Fundo branco.

Cards claros.

Sombras discretas.

Contraste elevado.

---

# Modo Escuro

Fundo quase preto.

Nunca utilizar preto absoluto.

Cards em cinza escuro.

Contraste confortável.

Evitar brilho excessivo.

---

# Tipografia

Fonte oficial:

Sistema do dispositivo.

SF Pro (Apple).

Roboto (Android).

Nunca utilizar fontes decorativas.

---

# Hierarquia Tipográfica

Título Principal

Maior peso.

Maior tamanho.

---

Título Secundário

Peso médio.

---

Texto

Peso regular.

---

Legenda

Peso leve.

Cor secundária.

---

Valores Numéricos

Sempre utilizar peso semibold.

Facilitar leitura.

---

# Espaçamento

Sistema baseado em múltiplos de oito.

8

16

24

32

40

48

Nunca utilizar espaçamentos aleatórios.

---

# Bordas

Cards

16 px

Botões

14 px

Campos

12 px

Modais

24 px

---

# Sombras

Sombras extremamente discretas.

Nunca utilizar sombras pesadas.

Priorizar profundidade através de contraste.

---

# Componentes

Todos os componentes deverão ser reutilizáveis.

Nunca duplicar HTML.

Nunca duplicar CSS.

---

# Cards

Os Cards serão o principal elemento visual do sistema.

Todo Card deverá conter:

Título.

Conteúdo.

Espaçamento interno.

Bordas suaves.

---

Tipos de Cards

Dashboard

Resumo

Nutrição

Timeline

Indicadores

Fotos

Biblioteca

Treinos

---

# Botões

Tipos

Primário

Secundário

Terciário

Destrutivo

---

Botão Primário

Cor principal.

Maior destaque.

---

Botão Secundário

Borda.

Fundo discreto.

---

Botão Terciário

Texto apenas.

---

Botão Destrutivo

Cor vermelha.

Confirmação obrigatória.

---

# Campos

Campos deverão ser mínimos.

Sempre que possível substituir:

digitação

por

seleção.

---

# Modais

Todo modal deverá possuir:

Título.

Descrição opcional.

Conteúdo.

Botão principal.

Cancelar.

Fechar.

---

Nunca abrir múltiplos modais simultaneamente.

---

# Barras de Progresso

As barras de progresso serão o principal indicador visual do Dashboard.

Formato oficial:

Título

████████░░

88%

132 / 150 g

---

Toda barra deverá mostrar:

valor atual.

meta.

porcentagem.

---

As barras deverão possuir animação suave.

---

# Indicadores

Os indicadores deverão utilizar:

ícone.

valor.

descrição.

tendência.

Nunca apenas números.

---

# Gráficos

Objetivo:

mostrar tendência.

Nunca excesso de detalhes.

Evitar:

grades excessivas.

legendas complexas.

múltiplas escalas.

---

Gráficos obrigatórios

Peso

Circunferência

Proteína

Score

Água

---

# Timeline

Organização vertical.

Ordem cronológica.

Cada evento deverá possuir:

ícone.

horário.

descrição.

categoria.

---

# Biblioteca

Exibir em Cards.

Cada Card deverá mostrar:

Nome.

Categoria.

Proteína.

Calorias.

Quantidade de usos.

Última utilização.

Botão adicionar.

---

# Dashboard

O Dashboard será composto por:

Resumo Executivo.

Meta.

Peso.

Progresso.

Nutrição.

Hábitos.

Timeline resumida.

Insights.

Nunca utilizar listas extensas.

---

# Navegação

A navegação deverá exigir o menor número possível de toques.

Máximo desejado:

3 toques

para qualquer funcionalidade.

---

# Ícones

Utilizar ícones simples.

Mesmo estilo em todo o aplicativo.

Nunca misturar bibliotecas.

---

# Animações

Todas as animações deverão ser discretas.

Objetivo:

transmitir fluidez.

Nunca chamar atenção.

---

# Estados

Todo componente deverá prever:

Normal.

Hover (Desktop).

Pressed.

Disabled.

Loading.

Erro.

Vazio.

---

# Responsividade

Toda tela deverá funcionar em:

iPhone SE.

iPhone padrão.

iPhone Pro Max.

iPad.

Desktop.

Sem necessidade de layouts independentes.

---

# Acessibilidade

Contraste adequado.

Fontes legíveis.

Áreas mínimas de toque.

Compatibilidade com Dynamic Type quando possível.

---

# Checklist para o Codex

Antes de finalizar qualquer componente verificar:

☐ Segue a paleta oficial.

☐ Segue a tipografia oficial.

☐ Utiliza componentes reutilizáveis.

☐ Não cria estilos duplicados.

☐ Funciona em modo claro.

☐ Funciona em modo escuro.

☐ Possui estados completos.

☐ Respeita espaçamentos.

☐ Respeita bordas.

☐ Possui feedback visual.

☐ Mantém consistência com os demais componentes.

---

# Objetivo Final

O usuário deverá reconhecer o HWP Platform imediatamente pela sua identidade visual.

A interface deverá transmitir simplicidade, confiança e qualidade profissional.

Todo componente desenvolvido deverá reforçar essa identidade.

# FIM DO DOCUMENTO