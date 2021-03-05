import React from 'react'
import { useLocation } from 'react-router'

const ScrollToTop = () => {

  const location = useLocation();
  const previousPath = React.useRef(location.pathname);

  React.useEffect(() => {
    if (previousPath !== location.pathname) {
      window.scrollTo(0, 0)
    }
  }, [previousPath, location])

  return (
    <React.Fragment>
    </React.Fragment>
  )
}

export default ScrollToTop
