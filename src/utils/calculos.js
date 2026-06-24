import {
  BV_PERCENT,
  MEDALHAS_PRECO_BASE, MEDALHA_PRECO_COR, MEDALHA_PRECO_FITA,
  MEDALHA_DESC_QTD, MEDALHA_ESPESSURA_EXTRA, MEDALHAS_FERRAMENTA,
  BOTTOM_NIQUEL_REVENDA, BOTTOM_OURO_REVENDA, BOTTOM_NIQUEL_WS,
  BOTTOM_QTD_BREAKS, BOTTOM_PRECO_COR, BOTTOM_FECHO_BORBOLETA,
  BOTTOM_ARGOLINHA, BOTTOM_FECHO_MAGNETICO, BOTTOM_FERRAMENTA,
  CHAVEIRO_NIQUEL, CHAVEIRO_PRECO_COR, CHAVEIRO_FERRAMENTA,
  CHAVEIRO_CORRENTE_SIMPLES, CHAVEIRO_CORRENTE_ITALIANA, CHAVEIRO_CORRENTE_ESFERICA,
  CRACHA_REAJUSTE, CRACHA_FECHO_MAGNETICO, CRACHA_FECHO_ALFINETE,
  FITA_PRECO_VENDA, FITA_QTD_BREAKS, FITA_FRETE,
} from '../data/precos';

export const fmt = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function applyBV(preco, tipoCliente) {
  const pct = BV_PERCENT[tipoCliente] ?? 0;
  if (pct >= 0) return preco * (1 + pct);
  return preco * (1 + pct); // ws = -0.10
}

// ── MEDALHAS ──────────────────────────────────────────
export function calcMedalha({ medida, quantidade, cores, comFita, espessuraMm, cobrarMolde, tipoCliente }) {
  const base = MEDALHAS_PRECO_BASE[medida] ?? 0;
  const qtd = parseInt(quantidade) || 0;

  const descEntry = MEDALHA_DESC_QTD.find(d => qtd >= d.min && qtd <= d.max);
  const descPct = descEntry ? descEntry.pct : 0;
  const precoComDesc = base * (1 + descPct);

  const corExtra = (parseInt(cores) || 0) * MEDALHA_PRECO_COR;
  const fitaExtra = comFita ? MEDALHA_PRECO_FITA : 0;
  const espExtra = espessuraMm > 2 ? (espessuraMm - 2) * (MEDALHA_ESPESSURA_EXTRA[medida] ?? 0) : 0;

  const precoUnit = precoComDesc + corExtra + fitaExtra + espExtra;
  const precoFinal = applyBV(precoUnit, tipoCliente);
  const molde = cobrarMolde ? (MEDALHAS_FERRAMENTA[medida] ?? 550.56) : 0;
  const total = precoFinal * qtd + molde;

  return { precoUnit: precoFinal, total, molde, descPct };
}

// ── BOTTONS / PINGENTES ───────────────────────────────
function getBottomQtdKey(qtd) {
  for (let i = BOTTOM_QTD_BREAKS.length - 1; i >= 0; i--) {
    if (qtd >= BOTTOM_QTD_BREAKS[i]) return BOTTOM_QTD_BREAKS[i];
  }
  return BOTTOM_QTD_BREAKS[0];
}

export function calcBottom({ area, banho, quantidade, cores, fecho, cobrarMolde, tipoCliente }) {
  const qtd = parseInt(quantidade) || 0;
  const qtdKey = getBottomQtdKey(qtd);

  let tabela;
  if (tipoCliente === 'ws') {
    tabela = banho === 'ouro' ? BOTTOM_OURO_REVENDA : BOTTOM_NIQUEL_WS;
  } else {
    tabela = banho === 'ouro' ? BOTTOM_OURO_REVENDA : BOTTOM_NIQUEL_REVENDA;
  }

  let precoUnit = tabela[area]?.[qtdKey] ?? 0;

  if (tipoCliente !== 'ws') {
    precoUnit = applyBV(precoUnit, tipoCliente);
  }

  precoUnit += (parseInt(cores) || 0) * BOTTOM_PRECO_COR;
  if (fecho === 'borboleta') precoUnit += BOTTOM_FECHO_BORBOLETA;
  if (fecho === 'argolinha') precoUnit += BOTTOM_ARGOLINHA;
  if (fecho === 'magnetico') precoUnit += BOTTOM_FECHO_MAGNETICO;

  const molde = cobrarMolde ? BOTTOM_FERRAMENTA : 0;
  const total = precoUnit * qtd + molde;
  return { precoUnit, total, molde };
}

// ── CHAVEIROS ─────────────────────────────────────────
export function calcChaveiro({ area, quantidade, cores, corrente, cobrarMolde, tipoCliente }) {
  const qtd = parseInt(quantidade) || 0;
  let precoUnit = CHAVEIRO_NIQUEL[area] ?? 0;
  precoUnit += (parseInt(cores) || 0) * CHAVEIRO_PRECO_COR;
  if (corrente === 'simples') precoUnit += CHAVEIRO_CORRENTE_SIMPLES;
  if (corrente === 'italiana') precoUnit += CHAVEIRO_CORRENTE_ITALIANA;
  if (corrente === 'esferica') precoUnit += CHAVEIRO_CORRENTE_ESFERICA;

  precoUnit = applyBV(precoUnit, tipoCliente);
  const molde = cobrarMolde ? CHAVEIRO_FERRAMENTA : 0;
  const total = precoUnit * qtd + molde;
  return { precoUnit, total, molde };
}

// ── CRACHÁ ────────────────────────────────────────────
export function calcCracha({ opcao, quantidade, fecho, tipoCliente }) {
  const qtd = parseInt(quantidade) || 0;
  let precoUnit = (opcao?.preco ?? 0) * CRACHA_REAJUSTE;
  if (fecho === 'magnetico') precoUnit += CRACHA_FECHO_MAGNETICO * CRACHA_REAJUSTE;
  if (fecho === 'alfinete') precoUnit += CRACHA_FECHO_ALFINETE * CRACHA_REAJUSTE;
  precoUnit = applyBV(precoUnit, tipoCliente);
  const total = precoUnit * qtd;
  return { precoUnit, total };
}

// ── FITAS ALCATEVI ────────────────────────────────────
function getFitaQtdKey(qtd) {
  for (let i = FITA_QTD_BREAKS.length - 1; i >= 0; i--) {
    if (qtd >= FITA_QTD_BREAKS[i]) return FITA_QTD_BREAKS[i];
  }
  return FITA_QTD_BREAKS[0];
}

export function calcFita({ largura, quantidade, comFrete }) {
  const qtd = parseInt(quantidade) || 0;
  const qtdKey = getFitaQtdKey(qtd);
  const precoUnit = FITA_PRECO_VENDA[largura]?.[qtdKey] ?? 0;
  const frete = comFrete ? FITA_FRETE : 0;
  const total = precoUnit * qtd + frete;
  return { precoUnit, total, frete };
}
