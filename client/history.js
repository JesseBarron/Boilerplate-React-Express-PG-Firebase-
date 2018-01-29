import createBrowserHistory from 'history/createBrowserHistory'
import createMemoryHistory from 'history/createMemoryHistory'

const history = process.NODE_ENV === 'test' ? createMemoryHistory() : createBrowserHistory()

export default history
