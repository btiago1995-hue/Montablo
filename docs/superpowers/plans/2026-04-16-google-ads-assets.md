# Google Ads Asset Group — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 6 new image formats to `/api/ads-image` (2 landscape, 2 square, 2 portrait) and document the approved text copy, resolving "Ad strength is poor / Eligible (Limited)" on Google Ads Campaign #1.

**Architecture:** All image generation lives in a single Edge route at `src/app/api/ads-image/route.tsx`. New format handlers are added as `if (format === '...')` branches before the existing default landscape. Portrait (960×1200) is a new format not previously supported. Copy is documented in a plain text file for manual entry into Google Ads UI.

**Tech Stack:** Next.js 14 Edge Runtime, `next/og` ImageResponse, JSX-in-TSX image rendering, Vercel auto-deploy on push to main.

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `src/app/api/ads-image/route.tsx` | Modify | Add 6 new format branches: `landscape-economia`, `landscape-social`, `square-economia`, `square-social`, `portrait-economia`, `portrait-social` |
| `docs/google-ads-copy.md` | Create | Approved copy for manual entry in Google Ads UI |

---

## Task 1: Add landscape-economia and landscape-social formats

**Files:**
- Modify: `src/app/api/ads-image/route.tsx` (add before the default landscape return)

- [ ] **Step 1: Add landscape-economia handler**

In `src/app/api/ads-image/route.tsx`, add this block immediately after the `if (format === 'square')` block (around line 208, before the default landscape return):

```tsx
  if (format === 'landscape-economia') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: PRIMARY,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              padding: '0 80px',
              gap: '60px',
            }}
          >
            {/* Left: headline + sub + CTA */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0px' }}>
              <div
                style={{
                  fontSize: '16px',
                  color: ACCENT,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  display: 'flex',
                }}
              >
                MonTablo · Menu Digital
              </div>
              <div
                style={{
                  fontSize: '60px',
                  color: WHITE,
                  fontFamily: 'serif',
                  lineHeight: 1.1,
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: '16px',
                }}
              >
                <span style={{ display: 'flex' }}>Fini les menus</span>
                <span style={{ color: ACCENT, display: 'flex' }}>imprimés</span>
              </div>
              <div style={{ fontSize: '22px', color: WHITE60, marginBottom: '28px', display: 'flex' }}>
                Mettez à jour votre carte en temps réel. Sans impression. Sans frais.
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                {['QR Code', 'Bilingue FR/EN'].map((item, i) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {i > 0 && (
                      <div
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: ACCENT,
                          display: 'flex',
                        }}
                      />
                    )}
                    <div style={{ fontSize: '20px', color: WHITE60, display: 'flex' }}>{item}</div>
                  </div>
                ))}
                <div
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: ACCENT,
                    display: 'flex',
                  }}
                />
                <div
                  style={{
                    backgroundColor: ACCENT,
                    borderRadius: '100px',
                    padding: '10px 28px',
                    fontSize: '20px',
                    color: PRIMARY,
                    fontWeight: 700,
                    display: 'flex',
                  }}
                >
                  14J Gratuit →
                </div>
              </div>
            </div>
            {/* Right: price comparison */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                width: '220px',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(231,76,60,0.1)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  borderLeft: '4px solid #e74c3c',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontSize: '14px', color: WHITE60, display: 'flex' }}>Menu papier / an</div>
                <div
                  style={{
                    fontSize: '36px',
                    color: '#e74c3c',
                    fontFamily: 'serif',
                    fontWeight: 700,
                    display: 'flex',
                  }}
                >
                  ~300€
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', display: 'flex' }}>
                  impression + design
                </div>
              </div>
              <div
                style={{
                  textAlign: 'center',
                  fontSize: '24px',
                  color: ACCENT,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                ↓
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(212,165,116,0.12)',
                  borderRadius: '16px',
                  padding: '20px 24px',
                  borderLeft: `4px solid ${ACCENT}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontSize: '14px', color: WHITE60, display: 'flex' }}>MonTablo</div>
                <div
                  style={{
                    fontSize: '36px',
                    color: ACCENT,
                    fontFamily: 'serif',
                    fontWeight: 700,
                    display: 'flex',
                  }}
                >
                  14J Gratuit
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', display: 'flex' }}>
                  puis abonnement mensuel
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />
        </div>
      ),
      { width: 1200, height: 628 }
    )
  }
```

- [ ] **Step 2: Add landscape-social handler**

Immediately after the `landscape-economia` block, add:

```tsx
  if (format === 'landscape-social') {
    const DARK = '#1a2a1b'
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: DARK,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              padding: '0 80px',
              gap: '60px',
            }}
          >
            {/* Left */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0px' }}>
              <div
                style={{
                  fontSize: '14px',
                  color: ACCENT,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '20px',
                  display: 'flex',
                }}
              >
                Haute-Savoie · Annecy · Chamonix
              </div>
              <div
                style={{
                  fontSize: '54px',
                  color: WHITE,
                  fontFamily: 'serif',
                  lineHeight: 1.1,
                  marginBottom: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ display: 'flex' }}>Les restaurants</span>
                <span style={{ display: 'flex' }}>savoyards adoptent</span>
                <span style={{ color: ACCENT, display: 'flex' }}>MonTablo</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {['Menu bilingue FR/EN', 'QR Code inclus'].map((pill) => (
                  <div
                    key={pill}
                    style={{
                      backgroundColor: WHITE30,
                      borderRadius: '100px',
                      padding: '8px 20px',
                      fontSize: '18px',
                      color: WHITE,
                      display: 'flex',
                    }}
                  >
                    {pill}
                  </div>
                ))}
                <div
                  style={{
                    backgroundColor: ACCENT,
                    borderRadius: '100px',
                    padding: '8px 24px',
                    fontSize: '18px',
                    color: PRIMARY,
                    fontWeight: 700,
                    display: 'flex',
                  }}
                >
                  14J Gratuit →
                </div>
              </div>
            </div>
            {/* Right: testimonial card */}
            <div
              style={{
                backgroundColor: WHITE,
                borderRadius: '20px',
                padding: '32px 28px',
                width: '240px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
              }}
            >
              <div
                style={{
                  fontSize: '48px',
                  color: ACCENT,
                  fontFamily: 'serif',
                  lineHeight: 1,
                  display: 'flex',
                  marginBottom: '8px',
                }}
              >
                "
              </div>
              <div
                style={{
                  fontSize: '18px',
                  color: '#333',
                  lineHeight: 1.5,
                  flex: 1,
                  display: 'flex',
                }}
              >
                Plus besoin de réimprimer le menu à chaque saison
              </div>
              <div
                style={{
                  borderTop: '1px solid #eee',
                  paddingTop: '16px',
                  marginTop: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: '15px', fontWeight: 700, color: PRIMARY, display: 'flex' }}>
                  Le Chalet
                </div>
                <div style={{ fontSize: '13px', color: '#999', display: 'flex' }}>
                  Restaurant · Annecy
                </div>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />
        </div>
      ),
      { width: 1200, height: 628 }
    )
  }
```

- [ ] **Step 3: Verify visually**

Run the dev server and open these URLs in the browser:
- `http://localhost:3000/api/ads-image?format=landscape-economia`
- `http://localhost:3000/api/ads-image?format=landscape-social`

Expected: two distinct 1200×628 images matching the approved designs.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/ads-image/route.tsx
git commit -m "feat: add landscape-economia and landscape-social ad image formats"
```

---

## Task 2: Add square-economia and square-social formats

**Files:**
- Modify: `src/app/api/ads-image/route.tsx`

- [ ] **Step 1: Add square-economia handler**

Add after the `landscape-social` block:

```tsx
  if (format === 'square-economia') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: PRIMARY,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '100%', height: '8px', backgroundColor: ACCENT, display: 'flex' }} />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              gap: '0px',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '48px',
              }}
            >
              <div style={{ fontSize: '32px', display: 'flex' }}>🍽️</div>
              <div
                style={{
                  fontSize: '42px',
                  color: WHITE,
                  fontFamily: 'serif',
                  display: 'flex',
                }}
              >
                MonTablo
              </div>
            </div>
            {/* Headline */}
            <div
              style={{
                fontSize: '68px',
                color: WHITE,
                fontFamily: 'serif',
                textAlign: 'center',
                lineHeight: 1.1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '40px',
              }}
            >
              <span style={{ display: 'flex' }}>Fini les menus</span>
              <span style={{ color: ACCENT, display: 'flex' }}>imprimés</span>
            </div>
            {/* Comparison */}
            <div
              style={{
                display: 'flex',
                gap: '20px',
                width: '100%',
                marginBottom: '48px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(231,76,60,0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  borderLeft: '4px solid #e74c3c',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontSize: '18px', color: WHITE60, display: 'flex' }}>Menu papier / an</div>
                <div
                  style={{
                    fontSize: '44px',
                    color: '#e74c3c',
                    fontFamily: 'serif',
                    fontWeight: 700,
                    display: 'flex',
                  }}
                >
                  ~300€
                </div>
                <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)', display: 'flex' }}>
                  impression + design
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  color: ACCENT,
                  width: '40px',
                  flexShrink: 0,
                }}
              >
                →
              </div>
              <div
                style={{
                  flex: 1,
                  backgroundColor: 'rgba(212,165,116,0.12)',
                  borderRadius: '16px',
                  padding: '24px',
                  borderLeft: `4px solid ${ACCENT}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontSize: '18px', color: WHITE60, display: 'flex' }}>MonTablo</div>
                <div
                  style={{
                    fontSize: '44px',
                    color: ACCENT,
                    fontFamily: 'serif',
                    fontWeight: 700,
                    display: 'flex',
                  }}
                >
                  Gratuit
                </div>
                <div style={{ fontSize: '15px', color: 'rgba(255,255,255,0.35)', display: 'flex' }}>
                  14 jours d'essai
                </div>
              </div>
            </div>
            {/* CTA */}
            <div
              style={{
                backgroundColor: ACCENT,
                borderRadius: '100px',
                padding: '24px 64px',
                fontSize: '32px',
                color: PRIMARY,
                fontWeight: 700,
                display: 'flex',
              }}
            >
              Essai Gratuit 14 Jours →
            </div>
            <div style={{ fontSize: '18px', color: WHITE60, marginTop: '16px', display: 'flex' }}>
              Sans carte bancaire
            </div>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: ACCENT, display: 'flex' }} />
        </div>
      ),
      { width: 1200, height: 1200 }
    )
  }
```

- [ ] **Step 2: Add square-social handler**

Add immediately after `square-economia`:

```tsx
  if (format === 'square-social') {
    const DARK = '#1a2a1b'
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: DARK,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '100%', height: '8px', backgroundColor: ACCENT, display: 'flex' }} />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              gap: '0px',
            }}
          >
            {/* Geo tag */}
            <div
              style={{
                fontSize: '18px',
                color: ACCENT,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '32px',
                display: 'flex',
              }}
            >
              Haute-Savoie · Annecy · Chamonix
            </div>
            {/* Headline */}
            <div
              style={{
                fontSize: '62px',
                color: WHITE,
                fontFamily: 'serif',
                textAlign: 'center',
                lineHeight: 1.1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '48px',
              }}
            >
              <span style={{ display: 'flex' }}>Les restaurants</span>
              <span style={{ display: 'flex' }}>savoyards adoptent</span>
              <span style={{ color: ACCENT, display: 'flex' }}>MonTablo</span>
            </div>
            {/* Testimonial */}
            <div
              style={{
                backgroundColor: WHITE,
                borderRadius: '20px',
                padding: '36px',
                width: '100%',
                marginBottom: '40px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: '52px',
                  color: ACCENT,
                  fontFamily: 'serif',
                  lineHeight: 1,
                  display: 'flex',
                  marginBottom: '12px',
                }}
              >
                "
              </div>
              <div
                style={{
                  fontSize: '24px',
                  color: '#333',
                  lineHeight: 1.5,
                  display: 'flex',
                  marginBottom: '20px',
                }}
              >
                Plus besoin de réimprimer le menu à chaque saison
              </div>
              <div
                style={{
                  borderTop: '1px solid #eee',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: '18px', fontWeight: 700, color: PRIMARY, display: 'flex' }}>
                  Le Chalet
                </div>
                <div style={{ fontSize: '15px', color: '#999', display: 'flex' }}>
                  Restaurant · Annecy
                </div>
              </div>
            </div>
            {/* CTA */}
            <div
              style={{
                backgroundColor: ACCENT,
                borderRadius: '100px',
                padding: '24px 64px',
                fontSize: '32px',
                color: PRIMARY,
                fontWeight: 700,
                display: 'flex',
              }}
            >
              14 Jours Gratuits →
            </div>
          </div>
          <div style={{ width: '100%', height: '8px', backgroundColor: ACCENT, display: 'flex' }} />
        </div>
      ),
      { width: 1200, height: 1200 }
    )
  }
```

- [ ] **Step 3: Verify visually**

```
http://localhost:3000/api/ads-image?format=square-economia
http://localhost:3000/api/ads-image?format=square-social
```

Expected: two distinct 1200×1200 images.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/ads-image/route.tsx
git commit -m "feat: add square-economia and square-social ad image formats"
```

---

## Task 3: Add portrait-economia and portrait-social formats (new 960×1200)

**Files:**
- Modify: `src/app/api/ads-image/route.tsx`

- [ ] **Step 1: Add portrait-economia handler**

Add after `square-social`, before the default landscape return:

```tsx
  if (format === 'portrait-economia') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: PRIMARY,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '56px 64px',
              gap: '0px',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '40px',
              }}
            >
              <div style={{ fontSize: '26px', display: 'flex' }}>🍽️</div>
              <div
                style={{
                  fontSize: '32px',
                  color: WHITE60,
                  fontFamily: 'serif',
                  display: 'flex',
                }}
              >
                MonTablo
              </div>
            </div>
            {/* Headline */}
            <div
              style={{
                fontSize: '64px',
                color: WHITE,
                fontFamily: 'serif',
                lineHeight: 1.1,
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '16px',
              }}
            >
              <span style={{ display: 'flex' }}>Fini les</span>
              <span style={{ display: 'flex' }}>menus</span>
              <span style={{ color: ACCENT, display: 'flex' }}>imprimés</span>
            </div>
            <div
              style={{
                fontSize: '22px',
                color: WHITE60,
                marginBottom: '40px',
                lineHeight: 1.4,
                display: 'flex',
              }}
            >
              Mettez à jour votre carte en temps réel. Sans impression. Sans frais.
            </div>
            {/* Comparison */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                marginBottom: '40px',
              }}
            >
              <div
                style={{
                  backgroundColor: 'rgba(231,76,60,0.1)',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  borderLeft: '4px solid #e74c3c',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '16px', color: WHITE60, display: 'flex' }}>Menu papier / an</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', display: 'flex' }}>
                    impression + design
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '36px',
                    color: '#e74c3c',
                    fontFamily: 'serif',
                    fontWeight: 700,
                    display: 'flex',
                  }}
                >
                  ~300€
                </div>
              </div>
              <div
                style={{
                  backgroundColor: 'rgba(212,165,116,0.12)',
                  borderRadius: '14px',
                  padding: '20px 24px',
                  borderLeft: `4px solid ${ACCENT}`,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <div style={{ fontSize: '16px', color: WHITE60, display: 'flex' }}>MonTablo</div>
                  <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.35)', display: 'flex' }}>
                    puis abonnement
                  </div>
                </div>
                <div
                  style={{
                    fontSize: '28px',
                    color: ACCENT,
                    fontFamily: 'serif',
                    fontWeight: 700,
                    display: 'flex',
                  }}
                >
                  14J Gratuit
                </div>
              </div>
            </div>
            {/* CTA */}
            <div
              style={{
                backgroundColor: ACCENT,
                borderRadius: '100px',
                padding: '22px 0',
                fontSize: '28px',
                color: PRIMARY,
                fontWeight: 700,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Essai Gratuit 14 Jours →
            </div>
            <div
              style={{
                fontSize: '16px',
                color: WHITE60,
                marginTop: '12px',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Sans carte bancaire
            </div>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />
        </div>
      ),
      { width: 960, height: 1200 }
    )
  }
```

- [ ] **Step 2: Add portrait-social handler**

Add immediately after `portrait-economia`:

```tsx
  if (format === 'portrait-social') {
    const DARK = '#1a2a1b'
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: DARK,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '56px 64px',
              gap: '0px',
            }}
          >
            {/* Logo + geo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginBottom: '12px',
              }}
            >
              <div style={{ fontSize: '26px', display: 'flex' }}>🍽️</div>
              <div
                style={{
                  fontSize: '32px',
                  color: WHITE60,
                  fontFamily: 'serif',
                  display: 'flex',
                }}
              >
                MonTablo
              </div>
            </div>
            <div
              style={{
                fontSize: '14px',
                color: ACCENT,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '36px',
                display: 'flex',
              }}
            >
              Haute-Savoie · Annecy · Chamonix
            </div>
            {/* Headline */}
            <div
              style={{
                fontSize: '56px',
                color: WHITE,
                fontFamily: 'serif',
                lineHeight: 1.1,
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '40px',
              }}
            >
              <span style={{ display: 'flex' }}>Les restaurants</span>
              <span style={{ display: 'flex' }}>savoyards</span>
              <span style={{ display: 'flex' }}>adoptent</span>
              <span style={{ color: ACCENT, display: 'flex' }}>MonTablo</span>
            </div>
            {/* Testimonial */}
            <div
              style={{
                backgroundColor: WHITE,
                borderRadius: '20px',
                padding: '28px 32px',
                marginBottom: '36px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  fontSize: '44px',
                  color: ACCENT,
                  fontFamily: 'serif',
                  lineHeight: 1,
                  display: 'flex',
                  marginBottom: '8px',
                }}
              >
                "
              </div>
              <div
                style={{
                  fontSize: '22px',
                  color: '#333',
                  lineHeight: 1.5,
                  display: 'flex',
                  marginBottom: '16px',
                }}
              >
                Plus besoin de réimprimer le menu à chaque saison
              </div>
              <div
                style={{
                  borderTop: '1px solid #eee',
                  paddingTop: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 700, color: PRIMARY, display: 'flex' }}>
                  Le Chalet
                </div>
                <div style={{ fontSize: '13px', color: '#999', display: 'flex' }}>
                  Restaurant · Annecy
                </div>
              </div>
            </div>
            {/* CTA */}
            <div
              style={{
                backgroundColor: ACCENT,
                borderRadius: '100px',
                padding: '22px 0',
                fontSize: '28px',
                color: PRIMARY,
                fontWeight: 700,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              14 Jours Gratuits →
            </div>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />
        </div>
      ),
      { width: 960, height: 1200 }
    )
  }
```

- [ ] **Step 3: Verify visually**

```
http://localhost:3000/api/ads-image?format=portrait-economia
http://localhost:3000/api/ads-image?format=portrait-social
```

Expected: two 960×1200 portrait images — these are the new format that was missing.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/ads-image/route.tsx
git commit -m "feat: add portrait-economia and portrait-social ad image formats (960x1200)"
```

---

## Task 4: Build, deploy, and generate images

**Files:**
- No code changes

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: Build completes with no TypeScript errors. Zero `Type error` lines in output.

- [ ] **Step 2: Push to main and wait for deploy**

```bash
git push origin main
```

Wait ~2 minutes for Vercel to deploy. Check https://www.montablo.com to confirm deploy is live.

- [ ] **Step 3: Generate all 8 images**

Open each URL in the browser and save as PNG (right-click → Save image as):

```
https://www.montablo.com/api/ads-image?format=landscape           → landscape-original.png
https://www.montablo.com/api/ads-image?format=landscape-economia  → landscape-economia.png
https://www.montablo.com/api/ads-image?format=landscape-social    → landscape-social.png
https://www.montablo.com/api/ads-image?format=square              → square-original.png
https://www.montablo.com/api/ads-image?format=square-economia     → square-economia.png
https://www.montablo.com/api/ads-image?format=square-social       → square-social.png
https://www.montablo.com/api/ads-image?format=portrait-economia   → portrait-economia.png
https://www.montablo.com/api/ads-image?format=portrait-social     → portrait-social.png
https://www.montablo.com/api/ads-image?format=logo                → logo.png
```

- [ ] **Step 4: Upload to Google Ads**

In Google Ads → Campaign #1 → Asset Group 1 → Edit asset group:
1. Upload all 3 landscape images under "Landscape image (1.91:1)"
2. Upload all 3 square images under "Square image (1:1)"
3. Upload both portrait images under "Portrait image (4:5)"
4. Confirm logo is present under "Logo"

- [ ] **Step 5: Enter text copy**

In the same asset group, enter:

**Headlines** (in "Short headline" field, one per line):
1. Fini les menus imprimés
2. Menu digital, 14J gratuit
3. Haute-Savoie choisit MonTablo
4. QR Code pour votre restaurant
5. Carte à jour en temps réel

**Long Headlines** (in "Long headline" field):
1. Fini les menus imprimés — mettez votre carte à jour en temps réel, sans frais.
2. Les restaurants de Haute-Savoie adoptent MonTablo — menu bilingue FR/EN inclus.
3. Créez votre menu QR Code en quelques minutes. Essai 14 jours offert, sans CB.

**Descriptions**:
1. Menu QR Code bilingue FR/EN, photos HD, mise à jour instantanée. 14J gratuits.
2. Les restaurants savoyards digitalisent leur carte avec MonTablo. Sans engagement.
3. Économisez sur l'impression. Carte toujours à jour. Essai gratuit, sans CB.
4. Menu numérique élégant en 10 minutes. QR Code, photos HD, bilingue FR/EN.
5. Les restaurants de Haute-Savoie adoptent MonTablo. Menu digital, QR Code inclus.

- [ ] **Step 6: Verify ad strength improved**

In Google Ads → Campaign #1 → Asset Group 1, check the Ad strength indicator.
Expected: changes from "Poor" to "Good" or "Excellent" within a few minutes of saving.

---

## Copy Reference

```
HEADLINES (max 30 chars)
1. Fini les menus imprimés           [23]
2. Menu digital, 14J gratuit         [25]
3. Haute-Savoie choisit MonTablo     [29]
4. QR Code pour votre restaurant     [29]
5. Carte à jour en temps réel        [26]

LONG HEADLINES (max 90 chars)
1. Fini les menus imprimés — mettez votre carte à jour en temps réel, sans frais.   [79]
2. Les restaurants de Haute-Savoie adoptent MonTablo — menu bilingue FR/EN inclus.  [80]
3. Créez votre menu QR Code en quelques minutes. Essai 14 jours offert, sans CB.    [78]

DESCRIPTIONS (max 90 chars)
1. Menu QR Code bilingue FR/EN, photos HD, mise à jour instantanée. 14J gratuits.   [80]
2. Les restaurants savoyards digitalisent leur carte avec MonTablo. Sans engagement. [81]
3. Économisez sur l'impression. Carte toujours à jour. Essai gratuit, sans CB.      [75]
4. Menu numérique élégant en 10 minutes. QR Code, photos HD, bilingue FR/EN.        [74]
5. Les restaurants de Haute-Savoie adoptent MonTablo. Menu digital, QR Code inclus. [81]
```
