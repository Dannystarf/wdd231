/**
 * Performance Monitoring Module
 * Tracks and logs Core Web Vitals and performance metrics
 */

export const performanceMonitor = {
  /**
   * Initialize Web Vitals monitoring
   */
  init() {
    this.logCoreMetrics()
    this.monitorResourceTiming()
    this.trackNavigationTiming()
  },

  /**
   * Log Core Web Vitals
   */
  logCoreMetrics() {
    if (!window.PerformanceObserver) return

    try {
      // Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        console.log("[v0] Largest Contentful Paint:", lastEntry.renderTime || lastEntry.loadTime)
      })
      lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] })

      // Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
            console.log("[v0] Cumulative Layout Shift:", clsValue)
          }
        }
      })
      clsObserver.observe({ entryTypes: ["layout-shift"] })

      // First Input Delay (FID) - deprecated, using INP instead
      const inpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          console.log("[v0] Interaction to Next Paint:", entry.processingDuration)
        })
      })
      inpObserver.observe({ entryTypes: ["first-input"] })
    } catch (error) {
      console.error("[v0] Performance monitoring error:", error)
    }
  },

  /**
   * Monitor resource timing
   */
  monitorResourceTiming() {
    if (!window.PerformanceObserver) return

    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const resources = list.getEntries()
        resources.forEach((resource) => {
          const duration = resource.responseEnd - resource.startTime
          if (duration > 1000) {
            console.warn("[v0] Slow resource:", resource.name, `${duration.toFixed(0)}ms`)
          }
        })
      })
      resourceObserver.observe({ entryTypes: ["resource"] })
    } catch (error) {
      console.error("[v0] Resource monitoring error:", error)
    }
  },

  /**
   * Track navigation timing
   */
  trackNavigationTiming() {
    if (!window.performance || !window.performance.timing) return

    window.addEventListener("load", () => {
      const timing = window.performance.timing
      const metrics = {
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        loadComplete: timing.loadEventEnd - timing.navigationStart,
        serverResponseTime: timing.responseEnd - timing.requestStart,
        renderTime: timing.domInteractive - timing.domLoading,
      }

      console.log("[v0] Navigation Timing:", metrics)
    })
  },

  /**
   * Get performance summary
   */
  getSummary() {
    const navigation = window.performance?.timing
    if (!navigation) return null

    return {
      pageLoadTime: navigation.loadEventEnd - navigation.navigationStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      resourcesLoaded: performance.getEntriesByType("resource").length,
      totalResourceSize: this.calculateTotalResourceSize(),
    }
  },

  /**
   * Calculate total resource size
   */
  calculateTotalResourceSize() {
    const resources = performance.getEntriesByType("resource")
    return resources.reduce((total, resource) => total + (resource.transferSize || 0), 0)
  },
}

// Initialize on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => performanceMonitor.init())
} else {
  performanceMonitor.init()
}
