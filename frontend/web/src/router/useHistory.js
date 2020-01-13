import { createBrowserHistory } from 'history'
import { useState, useEffect } from 'react'

const history = createBrowserHistory()

export default function useHistory() {
  const [location, setLocation] = useState(history.location)

  useEffect(() => history.listen(
    _location => setLocation(_location)
  ))

  function push(path) {
    if (path !== location.pathname)
      history.push(path)
  }

  return { ...history, push, location }
}
