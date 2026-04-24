import Header from './Header';
import {useGithubSearch} from "./GithubSearch.tsx";
import {Body} from "./Body.tsx";
function App() {
    const {
        searchUserName,
        results,
        hints,
        onSearch,
        onKeyDown,
        selectHint
    } = useGithubSearch()
  return (
      <div className='flex flex-col min-h-screen'>
        <Header
            searchUserName={searchUserName}
            hints={hints}
            onSearch={onSearch}
            onKeyDown={onKeyDown}
            selectHint={selectHint}
        />
        <Body
            results={results}
            searchUserName={searchUserName}
        />
      </div>
  )
}

export default App
