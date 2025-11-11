import html2canvas from 'html2canvas';

export interface SummaryAttachment {
  base64: string;
  fileName: string;
  contentType: string;
}

export interface SummaryCaptureOptions {
  width?: number;
  backgroundColor?: string;
  fileNamePrefix?: string;
  scale?: number;
  quality?: number;
  contentType?: string;
}

export const escapeHtml = (value: unknown): string => {
  if (value == null) {
    return '-';
  }

  const str = String(value);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

export interface SummaryRow {
  label: string;
  value: unknown;
}

export const buildRowsHtml = (rows: SummaryRow[]): string => {
  if (!rows || rows.length === 0) {
    return `<p style="margin:0; color:#9CA3AF; font-size:14px;">Keine Angaben</p>`;
  }

  return rows
    .map(
      ({ label, value }) => `
        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; margin-bottom:10px;">
          <span style="color:#9CA3AF; font-size:14px;">${escapeHtml(label)}</span>
          <span style="color:#F9FAFB; font-weight:600; font-size:14px; text-align:right; max-width:60%;">
            ${escapeHtml(value ?? '-')}
          </span>
        </div>
      `
    )
    .join('');
};

export const buildSectionHtml = (title: string, rows: SummaryRow[]): string => `
  <div style="background: rgba(17,24,39,0.78); border: 1px solid rgba(96,165,250,0.35); border-radius: 16px; padding: 20px;">
    <h2 style="margin: 0 0 16px; font-size: 18px; color: #60A5FA;">${escapeHtml(title)}</h2>
    ${buildRowsHtml(rows)}
  </div>
`;

export const captureHtmlToPng = async (
  html: string,
  options: SummaryCaptureOptions = {}
): Promise<SummaryAttachment | null> => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  let container: HTMLDivElement | null = null;

  try {
    container = document.createElement('div');
    const width = `${options.width ?? 900}px`;

    Object.assign(container.style, {
      position: 'fixed',
      top: '-10000px',
      left: '0',
      width,
      zIndex: '-1',
      opacity: '0',
      pointerEvents: 'none',
      background: options.backgroundColor ?? '#111827',
    });

    container.innerHTML = html;
    document.body.appendChild(container);

    const canvas = await html2canvas(container, {
      scale: options.scale ?? 2,
      useCORS: true,
      logging: false,
      backgroundColor: options.backgroundColor ?? '#111827',
      windowWidth: options.width ?? 900,
    });

    const mimeType = options.contentType ?? 'image/png';
    const dataUrl = canvas.toDataURL(mimeType, options.quality ?? 0.95);
    const [meta, base64Data] = dataUrl.split(',');

    if (!base64Data) {
      return null;
    }

    const contentTypeMatch = meta?.match(/data:(.*);base64/);

    return {
      fileName: `${options.fileNamePrefix ?? 'balkonfuchs-summary'}-${Date.now()}.png`,
      contentType: contentTypeMatch?.[1] || mimeType,
      base64: base64Data,
    };
  } catch (error) {
    console.error('Fehler beim Erfassen der Zusammenfassung:', error);
    return null;
  } finally {
    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }
  }
};

