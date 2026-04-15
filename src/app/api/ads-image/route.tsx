import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

// Usage:
// Landscape 1200x628: /api/ads-image?format=landscape&city=Annecy
// Square 1200x1200:   /api/ads-image?format=square&city=Annecy
// Logo 1:1 500x500:   /api/ads-image?format=logo

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const format = searchParams.get('format') || 'landscape'
  const city = searchParams.get('city') || 'Haute-Savoie'

  const PRIMARY = '#2C3E2D'
  const ACCENT = '#D4A574'
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
              <div
                style={{
                  fontSize: '32px',
                  display: 'flex',
                }}
              >
                🍽️
              </div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ fontSize: '22px', display: 'flex' }}>🍽️</div>
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
