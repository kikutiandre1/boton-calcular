import { useState } from 'react';
import {
  TIPOS_CLIENTE, MEDALHAS_SIZES, BOTTOM_AREAS, CHAVEIRO_AREAS,
  CRACHA_OPCOES, FITA_LARGURAS,
} from './data/precos';
import {
  fmt, calcMedalha, calcBottom, calcChaveiro, calcCracha, calcFita,
} from './utils/calculos';

const PRODUTOS = ['Bottom / Pingente', 'Medalha', 'Chaveiro', 'Crachá', 'Fita Alcatevi'];

// Determina a faixa de área do bottom a partir dos cm²
function getAreaKey(cm2) {
  if (cm2 <= 0) return null;
  if (cm2 < 5)  return { key: '499',  label: 'Até 4,99 cm²' };
  if (cm2 < 8)  return { key: '799',  label: '5 a 7,99 cm²' };
  if (cm2 < 11) return { key: '1099', label: '8 a 10,99 cm²' };
  if (cm2 < 15) return { key: '1499', label: '11 a 14,99 cm²' };
  if (cm2 < 20) return { key: '1999', label: '15 a 19,99 cm²' };
  return null; // fora de faixa
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {options.map(o => (
        <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>
      ))}
    </select>
  );
}

function NumberInput({ value, onChange, min = 1 }) {
  return (
    <input
      type="number"
      value={value}
      min={min}
      onChange={e => onChange(e.target.value)}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

function Checkbox({ label, checked, onChange }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        className="w-4 h-4 accent-blue-600" />
      {label}
    </label>
  );
}

function ResultBox({ precoUnit, total, moldePorPeca, margem, freteInfo }) {
  const [mostrarCusto, setMostrarCusto] = useState(false);
  const margemNum = parseFloat(margem) || 0;
  const temMargem = margemNum > 0 && margemNum < 100;
  const precoVenda = temMargem ? precoUnit / (1 - margemNum / 100) : null;
  const totalVenda = temMargem ? total / (1 - margemNum / 100) : null;

  return (
    <div className="mt-6 space-y-3">
      {/* Custo — colapsável */}
      <div className="border border-blue-200 rounded-xl overflow-hidden">
        <button
          onClick={() => setMostrarCusto(v => !v)}
          className="w-full flex justify-between items-center px-5 py-3 bg-blue-50 hover:bg-blue-100 transition-colors"
        >
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Custo</span>
          <span className={`text-blue-400 text-sm transition-transform duration-200 ${mostrarCusto ? 'rotate-180' : ''}`}>▼</span>
        </button>
        {mostrarCusto && (
          <div className="bg-blue-50 px-5 pb-5 space-y-2 border-t border-blue-100">
            <div className="flex justify-between items-center pt-3">
              <span className="text-sm text-gray-600">Preço Unitário</span>
              <span className="text-lg font-bold text-blue-700">{fmt(precoUnit)}</span>
            </div>
            {moldePorPeca > 0 && (
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>↳ inclui molde diluído</span>
                <span>{fmt(moldePorPeca)} / peça</span>
              </div>
            )}
            {freteInfo && (
              <div className="flex justify-between items-center text-xs text-gray-400">
                <span>↳ inclui frete</span>
                <span>{fmt(freteInfo)}</span>
              </div>
            )}
            <div className="border-t border-blue-200 pt-2 flex justify-between items-center">
              <span className="font-semibold text-gray-700">Total de Custo</span>
              <span className="text-xl font-extrabold text-blue-800">{fmt(total)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Preço de venda com margem */}
      {temMargem && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-5 space-y-2">
          <p className="text-xs font-semibold text-green-500 uppercase tracking-wide">
            Preço de Venda — Margem {margemNum}%
          </p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Unitário de Venda</span>
            <span className="text-lg font-bold text-green-700">{fmt(precoVenda)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>↳ lucro por peça</span>
            <span>{fmt(precoVenda - precoUnit)}</span>
          </div>
          <div className="border-t border-green-200 pt-2 flex justify-between items-center">
            <span className="font-semibold text-gray-700">Total de Venda</span>
            <span className="text-xl font-extrabold text-green-800">{fmt(totalVenda)}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CalcMedalha({ tipoCliente, margem }) {
  const [medida, setMedida] = useState('50mm');
  const [quantidade, setQtd] = useState(50);
  const [cores, setCores] = useState(0);
  const [comFita, setComFita] = useState(false);
  const [espessura, setEspessura] = useState(2);
  const [cobrarMolde, setCobrarMolde] = useState(false);

  const res = calcMedalha({ medida, quantidade, cores, comFita, espessuraMm: espessura, cobrarMolde, tipoCliente });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Medida">
          <Select value={medida} onChange={setMedida} options={MEDALHAS_SIZES} />
        </Field>
        <Field label="Quantidade">
          <NumberInput value={quantidade} onChange={setQtd} />
        </Field>
        <Field label="Nº de Cores (0–12)">
          <Select value={cores} onChange={setCores}
            options={Array.from({ length: 13 }, (_, v) => ({ value: v, label: `${v} cor${v !== 1 ? 'es' : ''}` }))} />
        </Field>
        <Field label="Espessura (mm)">
          <Select value={espessura} onChange={v => setEspessura(Number(v))}
            options={[2,3,4,5,6].map(v => ({ value: v, label: `${v} mm` }))} />
        </Field>
      </div>
      <div className="flex flex-wrap gap-4">
        <Checkbox label="Com Fita" checked={comFita} onChange={setComFita} />
        <Checkbox label="Cobrar Molde/Ferramenta (diluído no unit.)" checked={cobrarMolde} onChange={setCobrarMolde} />
      </div>
      {res.descPct > 0 && (
        <p className="text-xs text-green-700 bg-green-50 rounded-lg px-3 py-1">
          Adicional por quantidade: +{Math.round(res.descPct * 100)}% sobre o preço base
        </p>
      )}
      <ResultBox precoUnit={res.precoUnit} total={res.total} moldePorPeca={res.moldePorPeca} margem={margem} />
    </div>
  );
}

function CalcBottom({ tipoCliente, margem }) {
  const [largura, setLargura] = useState('');
  const [altura, setAltura] = useState('');
  const [banho, setBanho] = useState('niquel');
  const [quantidade, setQtd] = useState(100);
  const [cores, setCores] = useState(0);
  const [fecho, setFecho] = useState('nenhum');
  const [cobrarMolde, setCobrarMolde] = useState(false);

  const cm2 = parseFloat(largura || 0) * parseFloat(altura || 0);
  const faixaInfo = getAreaKey(cm2);
  const area = faixaInfo?.key ?? '499';

  const res = calcBottom({ area, banho, quantidade, cores, fecho, cobrarMolde, tipoCliente });

  return (
    <div className="space-y-4">
      {/* Dimensões → área automática */}
      <Field label="Dimensões do Pin (cm)">
        <div className="flex items-center gap-2">
          <input
            type="number" min="0" step="0.1" placeholder="Largura"
            value={largura} onChange={e => setLargura(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="text-gray-400 font-medium">×</span>
          <input
            type="number" min="0" step="0.1" placeholder="Altura"
            value={altura} onChange={e => setAltura(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {cm2 > 0 && (
          <div className={`mt-1 text-xs px-3 py-1 rounded-lg ${faixaInfo ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
            {cm2.toFixed(2)} cm² →{' '}
            {faixaInfo ? faixaInfo.label : 'Fora das faixas disponíveis (máx. 19,99 cm²)'}
          </div>
        )}
      </Field>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Banho">
          <Select value={banho} onChange={setBanho}
            options={[{ value: 'niquel', label: 'Níquel' }, { value: 'ouro', label: 'Ouro' }]} />
        </Field>
        <Field label="Quantidade">
          <NumberInput value={quantidade} onChange={setQtd} />
        </Field>
        <Field label="Nº de Cores (0–12)">
          <Select value={cores} onChange={setCores}
            options={Array.from({ length: 13 }, (_, v) => ({ value: v, label: `${v} cor${v !== 1 ? 'es' : ''}` }))} />
        </Field>
        <Field label="Fecho">
          <Select value={fecho} onChange={setFecho}
            options={[
              { value: 'nenhum', label: 'Padrão' },
              { value: 'borboleta', label: 'Borboleta (+R$ 0,49)' },
              { value: 'magnetico', label: 'Magnético (+R$ 1,26)' },
              { value: 'argolinha', label: 'Argolinha Pingente (+R$ 1,50)' },
            ]} />
        </Field>
      </div>
      <Checkbox label="Cobrar Molde/Ferramenta (diluído no unit.)" checked={cobrarMolde} onChange={setCobrarMolde} />
      {faixaInfo && <ResultBox precoUnit={res.precoUnit} total={res.total} moldePorPeca={res.moldePorPeca} margem={margem} />}
      {cm2 > 0 && !faixaInfo && (
        <p className="text-sm text-red-500 bg-red-50 rounded-lg px-3 py-2">
          Área fora das faixas tabeladas. Consulte o vendedor.
        </p>
      )}
    </div>
  );
}

function CalcChaveiro({ tipoCliente, margem }) {
  const [area, setArea] = useState('4');
  const [quantidade, setQtd] = useState(100);
  const [cores, setCores] = useState(0);
  const [corrente, setCorrente] = useState('nenhuma');
  const [cobrarMolde, setCobrarMolde] = useState(false);

  const res = calcChaveiro({ area, quantidade, cores, corrente, cobrarMolde, tipoCliente });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Área">
          <Select value={area} onChange={setArea}
            options={CHAVEIRO_AREAS.map(a => ({ value: a.key, label: a.label }))} />
        </Field>
        <Field label="Quantidade">
          <NumberInput value={quantidade} onChange={setQtd} />
        </Field>
        <Field label="Nº de Cores (0–12)">
          <Select value={cores} onChange={setCores}
            options={Array.from({ length: 13 }, (_, v) => ({ value: v, label: `${v} cor${v !== 1 ? 'es' : ''}` }))} />
        </Field>
        <Field label="Corrente">
          <Select value={corrente} onChange={setCorrente}
            options={[
              { value: 'nenhuma', label: 'Nenhuma' },
              { value: 'simples', label: 'Simples (+R$ 0,67)' },
              { value: 'italiana', label: 'Italiana (+R$ 2,00)' },
              { value: 'esferica', label: 'Esférica (+R$ 0,74)' },
            ]} />
        </Field>
      </div>
      <Checkbox label="Cobrar Molde/Ferramenta (diluído no unit.)" checked={cobrarMolde} onChange={setCobrarMolde} />
      <ResultBox precoUnit={res.precoUnit} total={res.total} moldePorPeca={res.moldePorPeca} margem={margem} />
    </div>
  );
}

function CalcCracha({ tipoCliente, margem }) {
  const [opcaoKey, setOpcaoKey] = useState('aco_simples');
  const [quantidade, setQtd] = useState(10);
  const [fecho, setFecho] = useState('nenhum');

  const opcao = CRACHA_OPCOES.find(o => o.key === opcaoKey);
  const res = calcCracha({ opcao, quantidade, fecho, tipoCliente });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Material e Acabamento">
          <Select value={opcaoKey} onChange={setOpcaoKey}
            options={CRACHA_OPCOES.map(o => ({ value: o.key, label: o.label }))} />
        </Field>
        <Field label="Quantidade">
          <NumberInput value={quantidade} onChange={setQtd} />
        </Field>
        <Field label="Fecho">
          <Select value={fecho} onChange={setFecho}
            options={[
              { value: 'nenhum', label: 'Sem fecho adicional' },
              { value: 'magnetico', label: 'Magnético (+R$ 6,68)' },
              { value: 'alfinete', label: 'Alfinete (+R$ 0,88)' },
            ]} />
        </Field>
      </div>
      <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-1">
        Reajuste de 15% já aplicado nos preços de crachá.
      </p>
      <ResultBox precoUnit={res.precoUnit} total={res.total} margem={margem} />
    </div>
  );
}

function CalcFita({ margem }) {
  const [largura, setLargura] = useState('20 mm');
  const [quantidade, setQtd] = useState(100);
  const [comFrete, setComFrete] = useState(false);

  const res = calcFita({ largura, quantidade, comFrete });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Largura">
          <Select value={largura} onChange={setLargura} options={FITA_LARGURAS} />
        </Field>
        <Field label="Quantidade">
          <NumberInput value={quantidade} onChange={setQtd} min={100} />
        </Field>
      </div>
      <Checkbox label="Incluir Frete (R$ 86,40)" checked={comFrete} onChange={setComFrete} />
      <p className="text-xs text-gray-500">Faixas de preço: 100–499 / 500–999 / 1000+ unidades</p>
      <ResultBox precoUnit={res.precoUnit} total={res.total}
        freteInfo={res.frete > 0 ? res.frete : null} margem={margem} />
    </div>
  );
}

export default function App() {
  const [produto, setProduto] = useState('Bottom / Pingente');
  const [tipoCliente, setTipoCliente] = useState('revenda');
  const [margem, setMargem] = useState('50');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Pin Zamac — Calculadora de Preços</h1>
        <p className="text-xs text-gray-500">Selecione o produto e preencha os dados para calcular</p>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-4 mt-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 grid grid-cols-2 gap-4">
          <Field label="Tipo de Cliente">
            <Select
              value={tipoCliente}
              onChange={setTipoCliente}
              options={TIPOS_CLIENTE.map(t => ({ value: t.id, label: t.label }))}
            />
          </Field>
          <Field label="Margem de Lucro (%)">
            <div className="relative">
              <input
                type="number"
                min="0"
                max="99"
                step="0.5"
                placeholder="Ex: 30"
                value={margem}
                onChange={e => setMargem(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full pr-8 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </Field>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <Field label="Produto">
            <div className="flex flex-wrap gap-2 mt-1">
              {PRODUTOS.map(p => (
                <button key={p} onClick={() => setProduto(p)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors
                    ${produto === p
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'}`}>
                  {p}
                </button>
              ))}
            </div>
          </Field>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">{produto}</h2>
          {produto === 'Medalha' && <CalcMedalha tipoCliente={tipoCliente} margem={margem} />}
          {produto === 'Bottom / Pingente' && <CalcBottom tipoCliente={tipoCliente} margem={margem} />}
          {produto === 'Chaveiro' && <CalcChaveiro tipoCliente={tipoCliente} margem={margem} />}
          {produto === 'Crachá' && <CalcCracha tipoCliente={tipoCliente} margem={margem} />}
          {produto === 'Fita Alcatevi' && <CalcFita margem={margem} />}
        </div>
      </main>
    </div>
  );
}
