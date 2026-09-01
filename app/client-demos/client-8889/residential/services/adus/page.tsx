import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Check } from 'lucide-react';
import ServiceDetailPage from '../[slug]/page';

const ADU_TYPES = [
  'Detached ADUs',
  'Attached ADUs',
  'Garage Conversions',
];

const INCLUDED = [
  'Site Evaluation + Feasibility',
  'Concept Design + Floor Plans',
  'Architectural Design',
  'Structural Engineering',
  'MEP Design',
  'Title 24 Compliance',
  'Permit Submittal + Plan Check',
];

const OPTION_ONE_CSS = `
.adu-o1-wrap{margin-top:clamp(56px,7vw,104px)}
.adu-o1-panel{background:var(--surface);border:1px solid var(--line);padding:clamp(52px,5.5vw,78px) clamp(34px,5.5vw,76px)}
.adu-o1-head{text-align:center;max-width:720px;margin:0 auto clamp(44px,5vw,64px)}
.adu-o1-head h2{margin:0;font-family:"Inter Display","Inter Display Placeholder","Inter",sans-serif;font-size:clamp(28px,3.5vw,42px);line-height:1.05;font-weight:600;letter-spacing:.005em;text-transform:uppercase;color:var(--ink)}
.adu-o1-head p{margin:16px 0 0;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--soft);line-height:1.7}
.adu-o1-accent{display:block;width:34px;height:1px;background:var(--gold);margin:20px auto 0}
.adu-o1-grid{display:grid;grid-template-columns:.85fr 1.15fr;max-width:820px;margin:0 auto}
.adu-o1-col{min-width:0;padding:0 clamp(30px,4vw,56px)}
.adu-o1-col:first-child{padding-left:0;border-right:1px solid var(--line)}
.adu-o1-col:last-child{padding-right:0}
.adu-o1-title{margin:0 0 28px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:700;color:var(--ink)}
.adu-o1-title::after{content:"";display:block;width:28px;height:1px;background:var(--gold);margin-top:14px}
.adu-o1-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:16px}
.adu-o1-list li{display:flex;align-items:flex-start;gap:11px;font-size:13.5px;line-height:1.45;color:#453f39}
.adu-o1-list svg{margin-top:1px;flex:none;color:var(--gold)}
@media(max-width:620px){
  .adu-o1-panel{padding:42px 24px}
  .adu-o1-grid{grid-template-columns:1fr}
  .adu-o1-col{padding:0}
  .adu-o1-col:first-child{border-right:0;border-bottom:1px solid var(--line);padding-bottom:32px;margin-bottom:32px}
}
`;

function ScopeColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="adu-o1-col">
      <p className="adu-o1-title">{title}</p>
      <ul className="adu-o1-list">
        {items.map((item) => (
          <li key={item}>
            <Check size={16} strokeWidth={2} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function AduScopeOptionOne() {
  return (
    <section className="adu-o1-wrap" aria-labelledby="adu-scope-title">
      <style dangerouslySetInnerHTML={{ __html: OPTION_ONE_CSS }} />
      <div className="adu-o1-panel">
        <div className="adu-o1-head">
          <h2 id="adu-scope-title">Scope of Services</h2>
          <p>Coordinated across architecture, engineering, and permitting.</p>
          <span className="adu-o1-accent" aria-hidden="true" />
        </div>
        <div className="adu-o1-grid">
          <ScopeColumn title="ADU Types" items={ADU_TYPES} />
          <ScopeColumn title="What's Included" items={INCLUDED} />
        </div>
      </div>
    </section>
  );
}

type NodeProps = {
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
};

function replaceAduScope(node: ReactNode): ReactNode {
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<NodeProps>;
  const className = typeof element.props.className === 'string' ? element.props.className : '';

  if (element.type === 'section' && className.includes('nrd-adu-scope')) {
    return <AduScopeOptionOne />;
  }

  if (element.props.children === undefined) return element;

  return cloneElement(element, {
    children: Children.map(element.props.children, replaceAduScope),
  });
}

export const metadata = {
  title: 'Accessory Dwelling Units — NGUYEN Architecture & Engineering',
  robots: { index: false, follow: false },
};

export default async function AduPage() {
  const rendered = await ServiceDetailPage({
    params: Promise.resolve({ slug: 'adus' }),
  });

  if (!isValidElement(rendered)) return rendered;

  const root = rendered as ReactElement<NodeProps>;
  return cloneElement(root, {
    children: Children.map(root.props.children, replaceAduScope),
  });
}
