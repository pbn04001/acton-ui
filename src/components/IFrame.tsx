import React, { useEffect, useRef, useState } from 'react'

import './iframe.scss'

export const getHeight = () => window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

type IframeProps = {
  src: string
}

const IFrame: React.FC<IframeProps> = (props: IframeProps) => {
  const [height, setHeight] = useState(getHeight())
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setHeight(getHeight())
    }
    // set resize listener
    window.addEventListener('resize', resizeListener)

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (iframeRef?.current) {
      iframeRef.current.style.height = `${height}px`
    }
  }, [height])

  console.log("Src:", props.src)

  return <iframe className="iframe" frameBorder="0" ref={iframeRef} src={props.src}></iframe>
}

export default IFrame
