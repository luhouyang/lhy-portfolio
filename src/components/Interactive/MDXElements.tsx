import { type ReactNode } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// --- Custom Warm Archival Syntax Theme ---
const warmArchivalTheme: { [key: string]: React.CSSProperties } = {
  'code[class*="language-"]': { color: '#d6d3d1', background: 'none', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.9em', lineHeight: '1.6' },
  'pre[class*="language-"]': { color: '#d6d3d1', background: '#1c1917', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.9em', lineHeight: '1.6' },
  'comment': { color: '#78716c', fontStyle: 'italic' },
  'punctuation': { color: '#a8a29e' },
  'property': { color: '#fdba74' }, // Warm Orange
  'tag': { color: '#c2410c' },      // Terracotta
  'boolean': { color: '#c2410c' },
  'constant': { color: '#fdba74' },
  'symbol': { color: '#fdba74' },
  'number': { color: '#fdba74' },
  'string': { color: '#c1c9ba' },   // Sage Green
  'char': { color: '#c1c9ba' },
  'builtin': { color: '#c1c9ba' },
  'operator': { color: '#a8a29e' },
  'variable': { color: '#d6d3d1' },
  'keyword': { color: '#c2410c', fontWeight: 'bold' }, // Terracotta Bold
  'function': { color: '#fed7aa' }, // Light Peach
  'class-name': { color: '#fed7aa' },
};

// --- Typography & Layout ---
export const H1 = ({ children }: { children: ReactNode }) => (
  <h1 className="text-4xl font-bold text-[#292524] dark:text-[#fafaf9] mt-12 mb-6 tracking-tight border-b border-[#e7e5e4] dark:border-[#44403c] pb-4">{children}</h1>
);
export const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl font-semibold text-[#292524] dark:text-[#fafaf9] mt-10 mb-4 tracking-tight">{children}</h2>
);
export const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="text-xl font-semibold text-[#44403c] dark:text-[#d6d3d1] mt-8 mb-3">{children}</h3>
);
export const P = ({ children }: { children: ReactNode }) => (
  <p className="text-[#44403c] dark:text-[#d6d3d1] leading-relaxed mb-6 text-lg">{children}</p>
);
export const A = ({ href, children }: { href: string; children: ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#c2410c] dark:text-[#fb923c] underline decoration-[#fdba74] dark:decoration-[#9a3412] decoration-2 underline-offset-4 hover:decoration-[#c2410c] dark:hover:decoration-[#fb923c] transition-colors font-medium">{children}</a>
);
export const Blockquote = ({ children }: { children: ReactNode }) => (
  <blockquote className="border-l-4 border-[#c2410c] pl-6 py-2 my-8 italic text-[#57534e] dark:text-[#a8a29e] bg-[#fdfbf7]/60 dark:bg-[#1c1917]/40 rounded-r-lg">{children}</blockquote>
);
export const UL = ({ children }: { children: ReactNode }) => (
  <ul className="list-disc pl-6 mb-6 space-y-2 text-[#44403c] dark:text-[#d6d3d1] marker:text-[#c2410c]">{children}</ul>
);
export const OL = ({ children }: { children: ReactNode }) => (
  <ol className="list-decimal pl-6 mb-6 space-y-2 text-[#44403c] dark:text-[#d6d3d1] marker:text-[#c2410c] marker:font-mono">{children}</ol>
);
export const LI = ({ children }: { children: ReactNode }) => (
  <li className="leading-relaxed">{children}</li>
);
export const IMG = ({ src, alt }: { src: string; alt: string }) => (
  <figure className="my-10">
    <img src={src} alt={alt} className="rounded-lg shadow-md border border-[#e7e5e4] dark:border-[#44403c] w-full" />
    {alt && <figcaption className="text-center text-sm text-[#78716c] dark:text-[#a8a29e] mt-3 italic">{alt}</figcaption>}
  </figure>
);

// --- Code Blocks (Syntax Highlighted) ---
export const Pre = ({ children }: any) => {
  // MDX passes the <code> element as children of <pre>
  const language = children?.props?.className?.replace('language-', '') || 'text';
  const codeString = children?.props?.children?.trim() || '';

  return (
    <SyntaxHighlighter
      language={language}
      style={warmArchivalTheme}
      customStyle={{
        background: '#1c1917', // Dark Espresso
        border: '1px solid #44403c',
        borderRadius: '0.5rem',
        margin: '2rem 0',
        padding: '1.5rem',
        fontSize: '0.9em',
        boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)'
      }}
      showLineNumbers={true}
      lineNumberStyle={{ color: '#57534e', minWidth: '2.5em', paddingRight: '1em' }}
    >
      {codeString}
    </SyntaxHighlighter>
  );
};

export const Code = ({ children, className }: any) => {
  // If it has a className, it's a block handled by the <Pre> component above
  if (className) {
    return <code className={className}>{children}</code>;
  }
  // Inline code styling
  return (
    <code className="bg-[#f5f5f4] dark:bg-[#292524] text-[#c2410c] dark:text-[#fb923c] px-1.5 py-0.5 rounded border border-[#e7e5e4] dark:border-[#44403c] text-[0.9em] font-mono">
      {children}
    </code>
  );
};