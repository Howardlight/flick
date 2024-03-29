import * as React from "react"
import { SVGProps } from "react"

const Star = (props: SVGProps<SVGSVGElement>) => (
  <svg
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122.88 117.1"
    width="1em"
    height="1em"
    {...props}
  >
    <title>{"star-symbol"}</title>
    <path
      d="m64.42 2 15.71 36.7L120 42.26a3.2 3.2 0 0 1 1.82 5.62l-30.18 26.3 8.9 39a3.19 3.19 0 0 1-2.42 3.82 3.27 3.27 0 0 1-2.46-.46L61.41 96.1l-34.34 20.54a3.18 3.18 0 0 1-4.38-1.09 3.14 3.14 0 0 1-.37-2.38l8.91-39L1.09 47.88a3.24 3.24 0 0 1-.32-4.52 3.32 3.32 0 0 1 2.29-1l39.72-3.56L58.49 2a3.24 3.24 0 0 1 5.93 0Z"
      style={{
        fill: "#ffd401",
      }}
    />
  </svg>
)

export default Star;