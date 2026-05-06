'use client';

import { Navigation, Footer, SectionBand } from '@/components/organisms';
import { SectionHeader } from '@/components/molecules';
import { Badge, FadeIn, StaggerGrid, Skeleton, LazyLoad } from '@/components/atoms';
import { SkeletonChart } from '@/components/visualizations';
import styles from '../content-demo/page.module.css';

export default function PolishDemo() {
  return (
    <>
      <Navigation />

      <main>
        <div style={{ padding: 'var(--space-8)', background: 'var(--neutral-100)' }}>
          <div className={styles.demoHeader}>
            <Badge variant="success">Phase 6: Polish & Accessibility</Badge>
            <h1>Polish & Accessibility Enhancements Demo</h1>
            <p>
              Demonstrating scroll-triggered animations, loading states, accessibility features, and performance optimizations.
            </p>
          </div>
        </div>

        <div style={{ padding: 'var(--space-12) var(--space-8)', maxWidth: '1200px', margin: '0 auto' }}>

          {/* Scroll-triggered animations demo */}
          <section style={{ marginBottom: 'var(--space-16)' }}>
            <FadeIn>
              <SectionHeader
                eyebrow="Feature 6A"
                headline="Scroll-Triggered Animations"
                description="Sections fade in smoothly as you scroll down the page. All animations respect prefers-reduced-motion for accessibility."
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{
                padding: 'var(--space-6)',
                background: 'white',
                borderRadius: 'var(--radius-md)',
                marginTop: 'var(--space-6)'
              }}>
                <h3 style={{ marginBottom: 'var(--space-3)' }}>FadeIn Component</h3>
                <p style={{ marginBottom: 'var(--space-2)' }}>
                  The FadeIn component uses Framer Motion with Intersection Observer to trigger animations when elements enter the viewport.
                </p>
                <ul style={{ paddingLeft: 'var(--space-6)' }}>
                  <li>Fade in from opacity 0 to 1</li>
                  <li>Slide up 20px while fading</li>
                  <li>Configurable delay (this section has 0.2s delay)</li>
                  <li>Triggers once per element (doesn't re-animate on scroll back up)</li>
                  <li>Respects prefers-reduced-motion media query</li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div style={{
                padding: 'var(--space-6)',
                background: 'var(--primary-50)',
                borderRadius: 'var(--radius-md)',
                marginTop: 'var(--space-4)',
                border: '2px solid var(--primary-200)'
              }}>
                <h3 style={{ marginBottom: 'var(--space-3)', color: 'var(--primary-900)' }}>
                  Accessibility Consideration
                </h3>
                <p style={{ margin: 0, color: 'var(--primary-900)' }}>
                  All animations automatically reduce to near-instant transitions (0.01ms) when the user has prefers-reduced-motion enabled in their system settings.
                </p>
              </div>
            </FadeIn>
          </section>

          {/* Stagger grid demo */}
          <section style={{ marginBottom: 'var(--space-16)' }}>
            <FadeIn>
              <SectionHeader
                eyebrow="Feature 6A (continued)"
                headline="Staggered Grid Animations"
                description="Card grids animate with stagger delays (100ms per item, max 5 items) to create a cascading effect."
              />
            </FadeIn>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-6)'
            }}>
              <StaggerGrid
                staggerDelay={0.1}
                maxItems={6}
              >
              {[1, 2, 3, 4, 5, 6].map(num => (
                <div
                  key={num}
                  style={{
                    padding: 'var(--space-6)',
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-base)',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--primary-500)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    {num}
                  </div>
                  <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--neutral-600)' }}>
                    Card {num} animates with {num * 100}ms delay
                  </p>
                </div>
              ))}
              </StaggerGrid>
            </div>
          </section>

          {/* Loading states demo */}
          <section style={{ marginBottom: 'var(--space-16)' }}>
            <FadeIn>
              <SectionHeader
                eyebrow="Feature 6B"
                headline="Loading States & Skeleton Screens"
                description="Skeleton screens provide visual feedback during data loading, preventing layout shifts and creating a polished experience."
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ marginTop: 'var(--space-6)' }}>
                <h3 style={{ marginBottom: 'var(--space-4)' }}>Skeleton Components</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: 'var(--space-6)',
                  marginBottom: 'var(--space-8)'
                }}>
                  <div>
                    <h4 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-base)' }}>Text Skeleton</h4>
                    <Skeleton variant="text" width="100%" height={16} />
                    <div style={{ marginTop: 'var(--space-2)' }}>
                      <Skeleton variant="text" width="80%" height={16} />
                    </div>
                    <div style={{ marginTop: 'var(--space-2)' }}>
                      <Skeleton variant="text" width="90%" height={16} />
                    </div>
                  </div>

                  <div>
                    <h4 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-base)' }}>Rectangular Skeleton</h4>
                    <Skeleton variant="rectangular" width="100%" height={120} />
                  </div>

                  <div>
                    <h4 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-base)' }}>Circular Skeleton</h4>
                    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                      <Skeleton variant="circular" width={60} height={60} />
                      <Skeleton variant="circular" width={60} height={60} />
                      <Skeleton variant="circular" width={60} height={60} />
                    </div>
                  </div>
                </div>

                <h3 style={{ marginBottom: 'var(--space-4)' }}>Chart Skeleton Variants</h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: 'var(--space-4)'
                }}>
                  <div>
                    <h4 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-base)', textAlign: 'center' }}>Map Skeleton</h4>
                    <SkeletonChart width={300} height={240} variant="map" />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-base)', textAlign: 'center' }}>Bar Chart Skeleton</h4>
                    <SkeletonChart width={300} height={240} variant="bar" />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-base)', textAlign: 'center' }}>Scatter Plot Skeleton</h4>
                    <SkeletonChart width={300} height={240} variant="scatter" />
                  </div>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Accessibility features demo */}
          <section style={{ marginBottom: 'var(--space-16)' }}>
            <FadeIn>
              <SectionHeader
                eyebrow="Feature 6C"
                headline="Accessibility Enhancements"
                description="Comprehensive accessibility features ensure the application is usable by everyone, including people using assistive technologies."
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{
                display: 'grid',
                gap: 'var(--space-4)',
                marginTop: 'var(--space-6)'
              }}>
                <div style={{
                  padding: 'var(--space-6)',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-base)'
                }}>
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>✓ ARIA Labels & Roles</h3>
                  <ul style={{ paddingLeft: 'var(--space-6)', margin: 0 }}>
                    <li>All charts have <code>role="img"</code> and descriptive <code>aria-label</code></li>
                    <li>Map has <code>aria-describedby</code> linking to keyboard instructions</li>
                    <li>Search input has <code>aria-autocomplete</code> and <code>aria-controls</code></li>
                    <li>Dropdown options have <code>role="listbox"</code> and <code>role="option"</code></li>
                  </ul>
                </div>

                <div style={{
                  padding: 'var(--space-6)',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-base)'
                }}>
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>✓ ARIA Live Regions</h3>
                  <ul style={{ paddingLeft: 'var(--space-6)', margin: 0 }}>
                    <li>Explore section has <code>aria-live="polite"</code> region</li>
                    <li>Announces neighborhood selection changes to screen readers</li>
                    <li>Hidden visually but available to assistive technologies</li>
                    <li>Non-intrusive updates that don't interrupt user flow</li>
                  </ul>
                </div>

                <div style={{
                  padding: 'var(--space-6)',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-base)'
                }}>
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>✓ Focus Management</h3>
                  <ul style={{ paddingLeft: 'var(--space-6)', margin: 0 }}>
                    <li>Visible focus indicators on all interactive elements (3px solid outline)</li>
                    <li><code>:focus-visible</code> styling only shows for keyboard navigation</li>
                    <li>Tab order follows logical reading flow</li>
                    <li>Arrow keys navigate autocomplete dropdown</li>
                    <li>Enter and Escape keys work throughout the interface</li>
                  </ul>
                </div>

                <div style={{
                  padding: 'var(--space-6)',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-base)'
                }}>
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>✓ Color Contrast</h3>
                  <ul style={{ paddingLeft: 'var(--space-6)', margin: 0 }}>
                    <li>All text meets WCAG AA standards (4.5:1 for normal text)</li>
                    <li>Interactive elements have sufficient contrast ratios</li>
                    <li>Color is not the only means of conveying information</li>
                    <li>Success (green) and warning (orange) states use icons and text</li>
                  </ul>
                </div>

                <div style={{
                  padding: 'var(--space-6)',
                  background: 'var(--success-green)',
                  color: 'white',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <h3 style={{ marginBottom: 'var(--space-3)', color: 'white' }}>
                    ✓ Motion Preferences
                  </h3>
                  <p style={{ margin: 0 }}>
                    All animations respect <code>prefers-reduced-motion</code>. Users who have enabled reduced motion in their operating system settings will experience instant transitions instead of animations, improving usability for people with vestibular disorders.
                  </p>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Performance optimizations demo */}
          <section style={{ marginBottom: 'var(--space-16)' }}>
            <FadeIn>
              <SectionHeader
                eyebrow="Feature 6D"
                headline="Performance Optimizations"
                description="Multiple optimization strategies ensure fast load times and smooth interactions."
              />
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{
                display: 'grid',
                gap: 'var(--space-4)',
                marginTop: 'var(--space-6)'
              }}>
                <div style={{
                  padding: 'var(--space-6)',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-base)'
                }}>
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>⚡ Lazy Loading</h3>
                  <p style={{ marginBottom: 'var(--space-2)' }}>
                    The LazyLoad component uses Intersection Observer to defer loading of below-the-fold content until the user scrolls near it.
                  </p>
                  <ul style={{ paddingLeft: 'var(--space-6)', margin: 0 }}>
                    <li>Reduces initial page load time</li>
                    <li>Improves Time to Interactive (TTI)</li>
                    <li>Shows skeleton placeholders while loading</li>
                    <li>Configurable trigger distance (default 200px before viewport)</li>
                  </ul>
                </div>

                <div style={{
                  padding: 'var(--space-6)',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-base)'
                }}>
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>⚡ Image Optimization</h3>
                  <ul style={{ paddingLeft: 'var(--space-6)', margin: 0 }}>
                    <li>Next.js Image component automatically optimizes images</li>
                    <li>WebP and AVIF formats for modern browsers</li>
                    <li>Responsive image sizes generated automatically</li>
                    <li>Lazy loading enabled by default</li>
                  </ul>
                </div>

                <div style={{
                  padding: 'var(--space-6)',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-base)'
                }}>
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>⚡ Code Optimization</h3>
                  <ul style={{ paddingLeft: 'var(--space-6)', margin: 0 }}>
                    <li>React useMemo for expensive calculations (linear regression)</li>
                    <li>useCallback for stable function references</li>
                    <li>Package optimization for d3, recharts, and framer-motion</li>
                    <li>Console statements removed in production builds</li>
                  </ul>
                </div>

                <div style={{
                  padding: 'var(--space-6)',
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-base)'
                }}>
                  <h3 style={{ marginBottom: 'var(--space-3)' }}>⚡ Font Optimization</h3>
                  <ul style={{ paddingLeft: 'var(--space-6)', margin: 0 }}>
                    <li>next/font automatically optimizes Google Fonts</li>
                    <li>Font files self-hosted for faster delivery</li>
                    <li>Font display: swap prevents invisible text</li>
                    <li>Subset to Latin characters only reduces file size</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </section>

          {/* Lazy load demo */}
          <section style={{ marginBottom: 'var(--space-16)' }}>
            <FadeIn>
              <SectionHeader
                eyebrow="Feature 6D (Demo)"
                headline="Lazy Loading in Action"
                description="Scroll down to see the LazyLoad component in action. Content below loads when you scroll within 200px of it."
              />
            </FadeIn>

            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--neutral-100)', borderRadius: 'var(--radius-md)', marginTop: 'var(--space-6)' }}>
              <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--neutral-600)' }}>
                ↓ Scroll down to trigger lazy loading ↓
              </p>
            </div>

            <LazyLoad
              placeholder={
                <div style={{ padding: 'var(--space-8)', textAlign: 'center' }}>
                  <SkeletonChart width={800} height={400} variant="scatter" />
                </div>
              }
            >
              <FadeIn>
                <div style={{
                  padding: 'var(--space-8)',
                  background: 'var(--primary-50)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  border: '3px solid var(--primary-500)'
                }}>
                  <h3 style={{ color: 'var(--primary-900)', marginBottom: 'var(--space-3)' }}>
                    🎉 Content Loaded!
                  </h3>
                  <p style={{ margin: 0, color: 'var(--primary-900)' }}>
                    This content was lazy-loaded when you scrolled within 200px of it. Check your browser's Network tab to see when assets were fetched.
                  </p>
                </div>
              </FadeIn>
            </LazyLoad>
          </section>

          {/* Summary */}
          <div style={{
            background: 'var(--success-green)',
            color: 'white',
            padding: 'var(--space-8)',
            borderRadius: 'var(--radius-lg)'
          }}>
            <h2 style={{ color: 'white', marginBottom: 'var(--space-4)' }}>
              Phase 6 Complete ✓
            </h2>
            <p style={{ marginBottom: 'var(--space-4)' }}>
              All polish and accessibility enhancements implemented:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Animations (6A):</strong> Scroll-triggered fade-ins with stagger delays, respects prefers-reduced-motion
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Loading States (6B):</strong> Skeleton screens for all visualizations with shimmer animation
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Accessibility (6C):</strong> ARIA labels, live regions, focus management, keyboard navigation
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Performance (6D):</strong> Lazy loading, image optimization, code splitting, font optimization
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Color Contrast:</strong> All text meets WCAG AA standards (4.5:1 ratio)
              </li>
              <li style={{ marginBottom: 'var(--space-2)' }}>
                <strong>✓ Focus Indicators:</strong> 3px solid outlines with 2px offset for keyboard navigation
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
