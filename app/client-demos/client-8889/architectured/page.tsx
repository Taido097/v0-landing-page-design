import NativeArchitecturedPage from "./native-page"

export const dynamic = "force-dynamic"
export const revalidate = 0

const finalClientTheme = `
  .concept04Final main {
    --ink: #001b46 !important;
  }

  .concept04Final #services {
    background: #001b46 !important;
  }

  .concept04Final #services button > span:nth-child(2) > span {
    background: #001b46 !important;
    border-color: rgba(255, 255, 255, 0.28) !important;
    color: #f3f0e9 !important;
  }

  .concept04Final #projects article {
    background: #001b46 !important;
    color: #f3f0e9 !important;
  }

  .concept04Final #projects article [class*="arrow"] {
    border-color: rgba(255, 255, 255, 0.38) !important;
  }

  .concept04Final section[aria-label="NGUYEN handbook"] {
    background: #001b46 !important;
    position: relative;
    padding-top: 150px;
  }

  .concept04Final section[aria-label="NGUYEN handbook"]::before {
    content: "NGUYEN HANDBOOK";
    position: absolute;
    top: 64px;
    left: clamp(18px, 3vw, 52px);
    z-index: 3;
    color: #f3f0e9;
    font-family: Arial, Helvetica, sans-serif;
    font-size: clamp(30px, 4vw, 62px);
    line-height: 1;
    letter-spacing: -0.045em;
    font-weight: 700;
  }

  .concept04Final section[aria-label="NGUYEN handbook"] > div {
    position: relative;
    z-index: 2;
  }

  .concept04Final #faq aside {
    background: #001b46 !important;
    color: #f3f0e9 !important;
  }

  .concept04Final #faq aside input,
  .concept04Final #faq aside textarea {
    color: #f3f0e9 !important;
    border-color: rgba(255, 255, 255, 0.38) !important;
  }

  .concept04Final #faq aside input::placeholder,
  .concept04Final #faq aside textarea::placeholder {
    color: rgba(243, 240, 233, 0.7) !important;
  }

  @media (max-width: 680px) {
    .concept04Final section[aria-label="NGUYEN handbook"] {
      padding-top: 120px;
    }

    .concept04Final section[aria-label="NGUYEN handbook"]::before {
      top: 48px;
      left: 16px;
    }
  }
`

export default function NguyenConcept04() {
  return (
    <div className="concept04Final">
      <style dangerouslySetInnerHTML={{ __html: finalClientTheme }} />
      <NativeArchitecturedPage />
    </div>
  )
}
