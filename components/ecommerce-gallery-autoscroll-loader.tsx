'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

const EcommerceGalleryAutoScroll = dynamic(
  () =>
    import('@/components/ecommerce-gallery-autoscroll').then(
      (module) => module.EcommerceGalleryAutoScroll,
    ),
  { ssr: false },
)

export function EcommerceGalleryAutoScrollLoader() {
  const pathname = usePathname()

  if (pathname !== '/services/ecommerce') return null

  return <EcommerceGalleryAutoScroll />
}
