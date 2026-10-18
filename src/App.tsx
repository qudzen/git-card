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
        error,
        hintsError,
        activeIndex,
        onSearch,
        onKeyDown,
        selectHint,
        retrySearch,
        handleLogoClick,
        hintsRef
    } = useGithubSearch()

    const {
        reposUser,
        weeks,
        languages,
        loading,
        currentStreak,
        isActive,
        error: bodyError,
        retry: retryBody
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
            hintsError={hintsError}
            activeIndex={activeIndex}
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
            languages={languages}
            loading={loading}
            currentStreak={currentStreak}
            isActive={isActive}
            error={error}
            retrySearch={retrySearch}
            bodyError={bodyError}
            retryBody={retryBody}
        />
      </div>
  )
}

export default App
