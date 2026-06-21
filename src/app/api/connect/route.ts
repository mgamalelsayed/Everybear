import { NextResponse } from 'next/server';
import { connectSchema } from '@/lib/connectSchema';

/**
 * Connect form endpoint.
 *
 * Currently forwards validated submissions to Formspree if the environment
 * variable FORMSPREE_ENDPOINT is set. Otherwise it logs the submission and
 * returns success — useful in local dev without credentials.
 *
 * To wire up Formspree:
 *  1. Create a form at https://formspree.io (or any other provider).
 *  2. Add to .env.local:    FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxx
 *  3. Restart `npm run dev`.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Honeypot — bots tend to fill every field.
  if (
    typeof body === 'object' &&
    body !== null &&
    'website' in body &&
    typeof (body as Record<string, unknown>).website === 'string' &&
    (body as Record<string, string>).website.length > 0
  ) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const parsed = connectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const submission = parsed.data;
  const endpoint = process.env.FORMSPREE_ENDPOINT;

  if (!endpoint) {
    // eslint-disable-next-line no-console
    console.log('[connect] submission (no endpoint configured)', submission);
    return NextResponse.json({ ok: true, mode: 'dev' });
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        ...submission,
        _subject: `New Everybear inquiry · ${submission.company}`,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      // eslint-disable-next-line no-console
      console.error('[connect] formspree rejected', res.status, text);
      return NextResponse.json({ error: 'Provider rejected' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[connect] formspree fetch failed', err);
    return NextResponse.json({ error: 'Network error' }, { status: 502 });
  }
}
