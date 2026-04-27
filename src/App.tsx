import Header from './Header Components/Header.tsx';
import {useGithubSearch} from "./Header Components/useGithubSearch.ts";
import {Body} from "./Body Components/Body.tsx";
import {useBodyLogic} from "./Body Components/useBodyLogic.ts";
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
        loading,
    } = useBodyLogic(results)

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
            loading={loading}
        />
      </div>
  )
}

export default App
