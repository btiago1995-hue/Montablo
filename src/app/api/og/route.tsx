import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const name = searchParams.get('name') || 'MonTablo'
  const color = searchParams.get('color') || '#2C3E2D'

  // Determine if this is the default MonTablo branding (no restaurant name passed)
  const isDefault = !searchParams.get('name')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color,
          position: 'relative',
        }}
      >
        {/* Subtle top border accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: '#D4A574',
            display: 'flex',
          }}
        />

        {/* Decorative element */}
        <div
          style={{
            fontSize: 48,
            marginBottom: 24,
            display: 'flex',
          }}
        >
          🍽️
        </div>

        {/* Restaurant name */}
        <div
          style={{
            fontSize: isDefault ? 64 : 72,
            color: 'white',
            fontFamily: 'serif',
            textAlign: 'center',
            maxWidth: '900px',
            lineHeight: 1.1,
            display: 'flex',
          }}
        >
          {name}
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: '80px',
            height: '2px',
            backgroundColor: '#D4A574',
            marginTop: 28,
            marginBottom: 28,
            display: 'flex',
          }}
        />

        {/* Subtitle */}
        <div
          style={{
            fontSize: 28,
            color: '#D4A574',
            letterSpacing: '0.1em',
            display: 'flex',
          }}
        >
          {isDefault ? 'Menu digital pour restaurants' : 'Consultez notre carte'}
        </div>

        {/* MonTablo branding at bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <div
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.4)',
              display: 'flex',
            }}
          >
            {isDefault ? '' : 'Propulsé par MonTablo'}
          </div>
        </div>

        {/* Subtle bottom border accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '6px',
            backgroundColor: '#D4A574',
            display: 'flex',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
