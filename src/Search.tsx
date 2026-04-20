function Search(userName) {
    if (userName === undefined){
        return(
            <div>Ничего не найдено</div>
        )
    }
    return (
        <div>Пользователь {userName} найден</div>
    )
}
export default Search;