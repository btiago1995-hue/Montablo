import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Usage:
// Landscape 1200x628:         /api/ads-image?format=landscape&city=Annecy
// Landscape Economia 1200x628: /api/ads-image?format=landscape-economia
// Landscape Social 1200x628:   /api/ads-image?format=landscape-social
// Square 1200x1200:            /api/ads-image?format=square&city=Annecy
// Square Economia 1200x1200:   /api/ads-image?format=square-economia
// Square Social 1200x1200:     /api/ads-image?format=square-social
// Portrait Economia 960x1200:  /api/ads-image?format=portrait-economia
// Portrait Social 960x1200:    /api/ads-image?format=portrait-social
// Logo 1:1 500x500:            /api/ads-image?format=logo

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const format = searchParams.get('format') || 'landscape'
  const city = searchParams.get('city') || 'Haute-Savoie'

  const PRIMARY = '#2C3E2D'
  const DARK = '#1a2a1b'
  const ACCENT = '#D4A574'
  const RED = '#e74c3c'
  const WHITE = '#FFFFFF'
  const WHITE60 = 'rgba(255,255,255,0.6)'
  const WHITE30 = 'rgba(255,255,255,0.15)'

  if (format === 'logo') {
    return new ImageResponse(
      (
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: PRIMARY,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '0px',
          }}
        >
          {/* UtensilsCrossed icon as SVG */}
          <svg
            width="140"
            height="140"
            viewBox="0 0 24 24"
            fill="none"
            stroke={ACCENT}
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
            <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
            <path d="m2.1 21.8 6.4-6.3" />
            <path d="m19 5-7 7" />
          </svg>

          {/* MonTablo */}
          <div
            style={{
              fontSize: '56px',
              color: WHITE,
              fontFamily: 'serif',
              letterSpacing: '-0.01em',
              marginTop: '20px',
              display: 'flex',
            }}
          >
            MonTablo
          </div>

          {/* Menu Digital */}
          <div
            style={{
              fontSize: '20px',
              color: ACCENT,
              letterSpacing: '0.14em',
              marginTop: '10px',
              textTransform: 'uppercase',
              display: 'flex',
            }}
          >
            Menu Digital
          </div>
        </div>
      ),
      { width: 500, height: 500 }
    )
  }

  if (format === 'square') {
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
          {/* Top accent bar */}
          <div style={{ width: '100%', height: '8px', backgroundColor: ACCENT, display: 'flex' }} />

          {/* Main content */}
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
            {/* Logo row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={ACCENT} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                <path d="m2.1 21.8 6.4-6.3" />
                <path d="m19 5-7 7" />
              </svg>
              <div
                style={{
                  fontSize: '42px',
                  color: WHITE,
                  fontFamily: 'serif',
                  letterSpacing: '-0.01em',
                  display: 'flex',
                }}
              >
                MonTablo
              </div>
            </div>

            {/* Headline */}
            <div
              style={{
                fontSize: '72px',
                color: WHITE,
                fontFamily: 'serif',
                textAlign: 'center',
                lineHeight: 1.1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ display: 'flex' }}>Menu Digital</span>
              <span style={{ color: ACCENT, display: 'flex' }}>à {city}</span>
            </div>

            {/* Divider */}
            <div
              style={{
                width: '64px',
                height: '2px',
                backgroundColor: ACCENT,
                margin: '44px 0',
                display: 'flex',
              }}
            />

            {/* Pills */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['QR Code', 'Bilingue FR/EN', 'Temps Réel'].map((pill) => (
                <div
                  key={pill}
                  style={{
                    backgroundColor: WHITE30,
                    borderRadius: '100px',
                    padding: '10px 24px',
                    fontSize: '24px',
                    color: WHITE,
                    display: 'flex',
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                marginTop: '56px',
                backgroundColor: ACCENT,
                borderRadius: '100px',
                padding: '20px 52px',
                fontSize: '30px',
                color: PRIMARY,
                fontWeight: 700,
                display: 'flex',
              }}
            >
              Essai Gratuit 14 Jours
            </div>
          </div>

          {/* Bottom accent bar */}
          <div style={{ width: '100%', height: '8px', backgroundColor: ACCENT, display: 'flex' }} />
        </div>
      ),
      { width: 1200, height: 1200 }
    )
  }

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
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                  <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                  <path d="m2.1 21.8 6.4-6.3" />
                  <path d="m19 5-7 7" />
                </svg>
                <div style={{ fontSize: '22px', color: WHITE60, fontFamily: 'serif', display: 'flex' }}>MonTablo</div>
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
                  borderLeft: `4px solid ${RED}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontSize: '14px', color: WHITE60, display: 'flex' }}>Menu papier / an</div>
                <div
                  style={{
                    fontSize: '36px',
                    color: RED,
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

  if (format === 'landscape-social') {
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
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '0px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                  <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                  <path d="m2.1 21.8 6.4-6.3" />
                  <path d="m19 5-7 7" />
                </svg>
                <div style={{ fontSize: '22px', color: WHITE60, fontFamily: 'serif', display: 'flex' }}>MonTablo</div>
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: ACCENT,
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '16px',
                  display: 'flex',
                }}
              >
                Haute-Savoie · Annecy · Chamonix
              </div>
              <div
                style={{
                  fontSize: '48px',
                  color: WHITE,
                  fontFamily: 'serif',
                  lineHeight: 1.1,
                  marginBottom: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <span style={{ display: 'flex' }}>Les restaurants</span>
                <span style={{ display: 'flex' }}>savoyards adoptent</span>
                <span style={{ color: ACCENT, display: 'flex' }}>MonTablo</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
                padding: '28px 24px',
                width: '260px',
                minWidth: '260px',
                maxWidth: '260px',
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                  &quot;
                </div>
                <div
                  style={{
                    fontSize: '18px',
                    color: '#333',
                    lineHeight: 1.5,
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                >
                  Plus besoin de réimprimer le menu à chaque saison
                </div>
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
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={ACCENT} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                <path d="m2.1 21.8 6.4-6.3" />
                <path d="m19 5-7 7" />
              </svg>
              <div
                style={{
                  fontSize: '42px',
                  color: WHITE,
                  fontFamily: 'serif',
                  letterSpacing: '-0.01em',
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
                  borderLeft: `4px solid ${RED}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ fontSize: '18px', color: WHITE60, display: 'flex' }}>Menu papier / an</div>
                <div
                  style={{
                    fontSize: '44px',
                    color: RED,
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
                  14 jours d&apos;essai
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

  if (format === 'square-social') {
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
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={ACCENT} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                <path d="m2.1 21.8 6.4-6.3" />
                <path d="m19 5-7 7" />
              </svg>
              <div style={{ fontSize: '42px', color: WHITE, fontFamily: 'serif', letterSpacing: '-0.01em', display: 'flex' }}>MonTablo</div>
            </div>
            {/* Geo tag */}
            <div
              style={{
                fontSize: '16px',
                color: ACCENT,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                display: 'flex',
              }}
            >
              Haute-Savoie · Annecy · Chamonix
            </div>
            {/* Headline */}
            <div
              style={{
                fontSize: '58px',
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
                &quot;
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={ACCENT} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                <path d="m2.1 21.8 6.4-6.3" />
                <path d="m19 5-7 7" />
              </svg>
              <div
                style={{
                  fontSize: '32px',
                  color: WHITE60,
                  fontFamily: 'serif',
                  letterSpacing: '-0.01em',
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
                  borderLeft: `4px solid ${RED}`,
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
                    color: RED,
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

  if (format === 'portrait-social') {
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={ACCENT} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                <path d="m2.1 21.8 6.4-6.3" />
                <path d="m19 5-7 7" />
              </svg>
              <div
                style={{
                  fontSize: '32px',
                  color: WHITE60,
                  fontFamily: 'serif',
                  letterSpacing: '-0.01em',
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
                &quot;
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

  // Default: landscape 1200x628
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
        {/* Top accent bar */}
        <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '0 80px',
            gap: '0px',
          }}
        >
          {/* Left: text */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0px',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={ACCENT} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
                <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
                <path d="m2.1 21.8 6.4-6.3" />
                <path d="m19 5-7 7" />
              </svg>
              <div
                style={{
                  fontSize: '28px',
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
                fontSize: '58px',
                color: WHITE,
                fontFamily: 'serif',
                lineHeight: 1.1,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <span style={{ display: 'flex' }}>Menu Digital</span>
              <span style={{ display: 'flex' }}>
                pour Restaurants{' '}
                <span style={{ color: ACCENT, marginLeft: '16px', display: 'flex' }}>à {city}</span>
              </span>
            </div>

            {/* Divider */}
            <div
              style={{
                width: '48px',
                height: '2px',
                backgroundColor: ACCENT,
                margin: '24px 0',
                display: 'flex',
              }}
            />

            {/* Sub */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
              {['QR Code', 'Bilingue FR/EN', '14J Gratuits'].map((item, i) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
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
                  <div style={{ fontSize: '22px', color: WHITE60, display: 'flex' }}>{item}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mock card */}
          <div
            style={{
              width: '280px',
              backgroundColor: '#FAFAF7',
              borderRadius: '20px',
              padding: '28px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
              marginLeft: '60px',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                textAlign: 'center',
                paddingBottom: '16px',
                borderBottom: '1px solid #E5E5E0',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <div style={{ fontSize: '18px', fontFamily: 'serif', color: '#1A1A1A', display: 'flex' }}>
                Le Chalet
              </div>
              <div style={{ fontSize: '12px', color: '#9B9B9B', marginTop: '4px', display: 'flex' }}>
                Menu · {city}
              </div>
            </div>
            {[
              { name: 'Fondue Savoyarde', price: '18€' },
              { name: 'Tartiflette', price: '16€' },
              { name: 'Raclette', price: '19€' },
            ].map((item) => (
              <div
                key={item.name}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0',
                  borderBottom: '1px solid #E5E5E0',
                }}
              >
                <div style={{ fontSize: '13px', color: '#1A1A1A', display: 'flex' }}>{item.name}</div>
                <div style={{ fontSize: '13px', color: PRIMARY, fontWeight: 700, display: 'flex' }}>
                  {item.price}
                </div>
              </div>
            ))}
            <div
              style={{
                marginTop: '20px',
                backgroundColor: PRIMARY,
                borderRadius: '100px',
                padding: '10px 0',
                textAlign: 'center',
                fontSize: '13px',
                color: WHITE,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              Scanner le QR code
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div style={{ width: '100%', height: '6px', backgroundColor: ACCENT, display: 'flex' }} />
      </div>
    ),
    { width: 1200, height: 628 }
  )
}
