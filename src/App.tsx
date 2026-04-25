import Header from './Header';
import {useGithubSearch} from "./useGithubSearch.ts";
import {Body} from "./Body.tsx";
import {useBodyLogic} from "./useBodyLogic.ts";
function App() {
    const {
        searchUserName,
        results,
        hints,
        onSearch,
        onKeyDown,
        selectHint
    } = useGithubSearch()

    const {
        reposUser,
        totalCommits,
        weeks,
    } = useBodyLogic(searchUserName)

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
            reposUser={reposUser}
            totalCommits={totalCommits}
            weeks={weeks}
        />
      </div>
  )
}

export default App
