import Header from './Header Components/Header.tsx';
import {useGithubSearch} from "./Header Components/useGithubSearch.ts";
import {Body} from "./Body Components/Body.tsx";
import {useBodyLogic} from "./Body Components/useBodyLogic.ts";
import {useTheme} from "./useTheme.ts";
function App() {
    const {
        searchUserName,
        results,
        hints,
        notFound,
        onSearch,
        onKeyDown,
        selectHint,
        handleLogoClick,
        hintsRef
    } = useGithubSearch()

    const {
        reposUser,
        weeks,
        loading,
        currentStreak,
        isActive
    } = useBodyLogic(results)

    const {
        theme,
        toggleTheme,
    } = useTheme()

  return (
      <div className='flex flex-col min-h-screen bg-slate-50 dark:bg-ink-950'>
        <Header
            searchUserName={searchUserName}
            hints={hints}
            onSearch={onSearch}
            onKeyDown={onKeyDown}
            selectHint={selectHint}
            handleLogoClick={handleLogoClick}
            theme={theme}
            toggleTheme={toggleTheme}
            hintsRef={hintsRef}
        />
        <Body
            results={results}
            reposUser={reposUser}
            weeks={weeks}
            loading={loading}
            currentStreak={currentStreak}
            isActive={isActive}
            notFound={notFound}
        />
      </div>
  )
}

export default App
