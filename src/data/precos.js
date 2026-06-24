// Tabelas de preços extraídas da planilha Tabela_Calcular.ots

export const TIPOS_CLIENTE = [
  { id: 'revenda', label: 'Revendas (sem BV)' },
  { id: 'bv5', label: 'Direto BV 5%' },
  { id: 'bv10', label: 'Direto BV 10%' },
  { id: 'bv15', label: 'Direto BV 15%' },
  { id: 'bv20', label: 'Direto BV 20%' },
  { id: 'ws', label: 'WS Brindes (-10%)' },
];

// BV percentuais sobre o preço Revenda
export const BV_PERCENT = { revenda: 0, bv5: 0.05, bv10: 0.10, bv15: 0.15, bv20: 0.20, ws: -0.10 };

// ─────────────────────────────────────────────────────
// MEDALHAS
// ─────────────────────────────────────────────────────
export const MEDALHAS_SIZES = ['40mm', '50mm', '55mm', '60mm', '70mm', '80mm', '90mm', '100mm'];

export const MEDALHAS_PRECO_BASE = {
  '40mm': 3.50, '50mm': 5.56, '55mm': 6.41, '60mm': 7.67,
  '70mm': 11.98, '80mm': 15.66, '90mm': 20.91, '100mm': 23.13,
};

export const MEDALHAS_FERRAMENTA = {
  '40mm': 550.56,
};

// Preço por cor adicional
export const MEDALHA_PRECO_COR = 0.48;
// Preço fita simples por medalha
export const MEDALHA_PRECO_FITA = 1.01; // reajustado: 1.07

// Desconto progressivo por quantidade
export const MEDALHA_DESC_QTD = [
  { min: 1, max: 2, pct: 0.80 },
  { min: 3, max: 5, pct: 0.60 },
  { min: 6, max: 10, pct: 0.40 },
  { min: 11, max: 15, pct: 0.30 },
  { min: 16, max: 20, pct: 0.25 },
  { min: 21, max: 30, pct: 0.20 },
  { min: 31, max: 50, pct: 0.15 },
  { min: 51, max: 100, pct: 0.10 },
  { min: 101, max: 200, pct: 0.05 },
  { min: 201, max: Infinity, pct: 0 },
];

// Espessura extra (preço adicional por mm acima do padrão 2mm)
export const MEDALHA_ESPESSURA_EXTRA = {
  '40mm': 0.70, '50mm': 1.11, '55mm': 1.28, '60mm': 1.53,
  '70mm': 2.40, '80mm': 3.13, '90mm': 4.18, '100mm': 4.63,
};

// ─────────────────────────────────────────────────────
// BOTTONS / PINGENTES
// ─────────────────────────────────────────────────────
export const BOTTOM_AREAS = [
  { label: 'Até 4,99 cm²', key: '499' },
  { label: '5 a 7,99 cm²', key: '799' },
  { label: '8 a 10,99 cm²', key: '1099' },
  { label: '11 a 14,99 cm²', key: '1499' },
  { label: '15 a 19,99 cm²', key: '1999' },
];

// Preços Revendas por área e qtd
export const BOTTOM_NIQUEL_REVENDA = {
  '499':  { 50: 3.38, 100: 3.14, 200: 2.90, 300: 2.78, 500: 2.66, 750: 2.54, 1000: 2.42 },
  '799':  { 50: 4.28, 100: 3.97, 200: 3.67, 300: 3.51, 500: 3.36, 750: 3.21, 1000: 3.06 },
  '1099': { 50: 5.26, 100: 4.88, 200: 4.50, 300: 4.32, 500: 4.13, 750: 3.94, 1000: 3.75 },
  '1499': { 50: 6.27, 100: 5.83, 200: 5.38, 300: 5.15, 500: 4.93, 750: 4.71, 1000: 4.48 },
  '1999': { 50: 8.01, 100: 7.43, 200: 6.86, 300: 6.58, 500: 6.29, 750: 6.00, 1000: 5.72 },
};

export const BOTTOM_OURO_REVENDA = {
  '499':  { 50: 6.98, 100: 6.74, 200: 6.50, 300: 6.38, 500: 6.26, 750: 6.14, 1000: 6.02 },
  '799':  { 50: 9.81, 100: 9.50, 200: 9.20, 300: 9.05, 500: 8.89, 750: 8.74, 1000: 8.59 },
  '1099': { 50: 12.72, 100: 12.34, 200: 11.97, 300: 11.78, 500: 11.59, 750: 11.40, 1000: 11.22 },
  '1499': { 50: 16.31, 100: 15.86, 200: 15.41, 300: 15.19, 500: 14.97, 750: 14.74, 1000: 14.52 },
  '1999': { 50: 21.26, 100: 20.69, 200: 20.12, 300: 19.83, 500: 19.54, 750: 19.26, 1000: 18.97 },
};

// WS Brindes (desconto 10%)
export const BOTTOM_NIQUEL_WS = {
  '499':  { 50: 3.04, 100: 2.83, 200: 2.61, 300: 2.50, 500: 2.39, 750: 2.28, 1000: 2.17 },
  '799':  { 50: 3.85, 100: 3.57, 200: 3.30, 300: 3.16, 500: 3.02, 750: 2.89, 1000: 2.75 },
  '1099': { 50: 4.73, 100: 4.39, 200: 4.05, 300: 3.89, 500: 3.72, 750: 3.55, 1000: 3.38 },
  '1499': { 50: 5.65, 100: 5.24, 200: 4.84, 300: 4.64, 500: 4.44, 750: 4.23, 1000: 4.03 },
  '1999': { 50: 7.20, 100: 6.69, 200: 6.18, 300: 5.92, 500: 5.66, 750: 5.40, 1000: 5.15 },
};

export const BOTTOM_QTD_BREAKS = [50, 100, 200, 300, 500, 750, 1000];

export const BOTTOM_PRECO_COR = 0.49;
export const BOTTOM_FECHO_BORBOLETA = 0.49;
export const BOTTOM_ARGOLINHA = 1.50;
export const BOTTOM_FECHO_MAGNETICO = 1.26;
export const BOTTOM_FERRAMENTA = 443.23;

// ─────────────────────────────────────────────────────
// CHAVEIROS
// ─────────────────────────────────────────────────────
export const CHAVEIRO_AREAS = [
  { label: 'Até 4 cm²', key: '4' },
  { label: 'Até 7 cm²', key: '7' },
  { label: 'Até 9 cm²', key: '9' },
  { label: 'Até 13 cm²', key: '13' },
  { label: 'Até 16 cm²', key: '16' },
  { label: 'Até 20 cm²', key: '20' },
  { label: 'Até 25 cm²', key: '25' },
];

export const CHAVEIRO_NIQUEL = {
  '4': 1.68, '7': 2.16, '9': 2.58, '13': 2.83,
  '16': 3.11, '20': 3.44, '25': 3.78,
};

export const CHAVEIRO_PRECO_COR = 0.48;
export const CHAVEIRO_FERRAMENTA = 426.97;
export const CHAVEIRO_CORRENTE_SIMPLES = 0.67;
export const CHAVEIRO_CORRENTE_ITALIANA = 2.00;
export const CHAVEIRO_CORRENTE_ESFERICA = 0.74;

// ─────────────────────────────────────────────────────
// CRACHÁ
// ─────────────────────────────────────────────────────
export const CRACHA_OPCOES = [
  { key: 'aco_simples', label: 'Aço — Simples', preco: 13.32 },
  { key: 'aco_fosco', label: 'Aço — Fosco Polido', preco: 17.76 },
  { key: 'aco_impresso', label: 'Aço — Impresso', preco: 8.88 },
  { key: 'latao_simples', label: 'Latão — Simples', preco: 22.20 },
  { key: 'latao_fosco', label: 'Latão — Fosco Polido', preco: 26.64 },
  { key: 'latao_impresso', label: 'Latão — Impresso', preco: 10.66 },
];

export const CRACHA_FECHO_MAGNETICO = 6.68;
export const CRACHA_FECHO_ALFINETE = 0.88;
export const CRACHA_REAJUSTE = 1.15;

// ─────────────────────────────────────────────────────
// FITAS ALCATEVI
// ─────────────────────────────────────────────────────
export const FITA_LARGURAS = ['20 mm', '25 mm', '30 mm', '35 mm', '40 mm'];
export const FITA_QTD_BREAKS = [100, 500, 1000];
export const FITA_PRECO_VENDA = {
  '20 mm': { 100: 2.51, 500: 2.27, 1000: 2.15 },
  '25 mm': { 100: 3.07, 500: 2.78, 1000: 2.67 },
  '30 mm': { 100: 3.67, 500: 3.35, 1000: 3.18 },
  '35 mm': { 100: 4.28, 500: 3.88, 1000: 3.70 },
  '40 mm': { 100: 4.68, 500: 4.26, 1000: 4.05 },
};
export const FITA_FRETE = 86.40;
