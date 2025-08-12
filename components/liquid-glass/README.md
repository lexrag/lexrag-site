# Liquid Glass

Apple's Liquid Glass effect for React.

### Basic Usage

```tsx
import LiquidGlass from '@/components/liquid-glass'

function App() {
  return (
    <LiquidGlass>
      <div className="p-6">
        <h2>Your content here</h2>
        <p>This will have the liquid glass effect</p>
      </div>
    </LiquidGlass>
  )
}
```

### Button Example

```tsx
<LiquidGlass
  displacementScale={64}
  blurAmount={0.1}
  saturation={130}
  aberrationIntensity={2}
  elasticity={0.35}
  cornerRadius={100}
  padding="8px 16px"
  onClick={() => console.log('Button clicked!')}
>
  <span className="text-white font-medium">Click Me</span>
</LiquidGlass>
```

### Header/Inline Example

Use `centered={false}` to avoid center-translate and `compact` to hide outer overlays for tight headers.

```tsx
<LiquidGlass
  centered={false}
  compact
  displacementScale={50}
  blurAmount={0.05}
  saturation={130}
  aberrationIntensity={2}
  elasticity={0.1}
  cornerRadius={100}
  padding="8px 16px"
>
  <a className="text-white font-medium">Sign in</a>
  {/* Or a Link component */}
</LiquidGlass>
```

### Mouse Container Example

When you want the glass effect to respond to mouse movement over a larger area (like a parent container), use the `mouseContainer` prop:

```tsx
function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="w-full h-screen bg-image">
      <LiquidGlass
        mouseContainer={containerRef}
        elasticity={0.3}
        style={{ position: 'fixed', top: '50%', left: '50%' }}
      >
        <div className="p-6">
          <h2>Glass responds to mouse anywhere in the container</h2>
        </div>
      </LiquidGlass>
    </div>
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The content to render inside the glass container |
| `displacementScale` | `number` | `70` | Controls the intensity of the displacement effect |
| `blurAmount` | `number` | `0.0625` | Controls the blur/frosting level |
| `saturation` | `number` | `140` | Controls color saturation of the glass effect |
| `aberrationIntensity` | `number` | `2` | Controls chromatic aberration intensity |
| `elasticity` | `number` | `0.15` | Controls the "liquid" elastic feel (0 = rigid, higher = more elastic) |
| `cornerRadius` | `number` | `999` | Border radius in pixels |
| `className` | `string` | `""` | Additional CSS classes |
| `padding` | `string` | - | CSS padding value |
| `style` | `React.CSSProperties` | - | Additional inline styles |
| `overLight` | `boolean` | `false` | Whether the glass is over a light background |
| `onClick` | `() => void` | - | Click handler |
| `mouseContainer` | `React.RefObject<HTMLElement \| null> \| null` | `null` | Container element to track mouse movement on (defaults to the glass component itself) |
| `mode` | `"standard" \| "polar" \| "prominent" \| "shader"` | `"standard"` | Refraction mode for different visual effects. `shader` is the most accurate but not the most stable. |
| `globalMousePos` | `{ x: number; y: number }` | - | Global mouse position coordinates for manual control |
| `mouseOffset` | `{ x: number; y: number }` | - | Mouse position offset for fine-tuning positioning |
| `centered` | `boolean` | `true` | If `true`, positions at center with translate(-50%, -50%); set `false` for inline/header usage |
| `compact` | `boolean` | `false` | If `true`, hides outer glow/overlay layers for compact UI |
