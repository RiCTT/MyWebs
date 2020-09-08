import { useEffect, useRef } from 'react'

function useWatch(dep, callback) {
  const prev = useRef()
  useEffect(() => {
    callback(prev.current)
    prev.current = dep
  // eslint-disable-next-line
  }, [dep])
}

export default useWatch