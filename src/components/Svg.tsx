import React, { FunctionComponent } from 'react'

const files = require.context('../assets', true, /.*\.svg$/)
files.keys().forEach(files)

type SvgProps = {
  name: string
  className?: string
  ref?: React.Ref<SVGSVGElement>
}

const Svg: FunctionComponent<SvgProps> = ({ name, className, ref }: SvgProps) => (
  <svg ref={ref} className={className}>
    <use xlinkHref={`#${name}`}></use>
  </svg>
)

export default Svg
