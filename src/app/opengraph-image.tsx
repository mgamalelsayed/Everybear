import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Everybear — Advertising. Production. Everywhere.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0a0a0a',
          color: '#f0ece1',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          Everybear · Advertising
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 168,
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: '-0.025em',
            textTransform: 'uppercase',
          }}
        >
          <span>Everybear</span>
          <span>Everywhere</span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 22,
            opacity: 0.55,
          }}
        >
          <div>Brand · Packaging · Signage · Events</div>
          <div>everybear.net</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
