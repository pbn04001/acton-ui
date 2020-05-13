export function navigateIframe(url: string) {
  const iframe = document.getElementById('root-iframe') as HTMLIFrameElement
  if (iframe != null) {
    iframe.contentWindow?.postMessage(
      {
        actonNavigate: url
      },
      '*'
    )
  }
}

export function loadLogin() {
  const iframe = document.getElementById('root-iframe') as HTMLIFrameElement
  if (iframe != null) {
    iframe.contentWindow?.postMessage(
      {
        actonNavigateLogin: true
      },
      '*'
    )
  }
}
