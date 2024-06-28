import css from './NotFoundPage.module.css'


const NotFoundPage = () => {
    return (
        <>
            <div className={css.container}>
                <h1>Error 404</h1>
                <h3>Page not found</h3>
            </div>
        </>
    )
}

export default NotFoundPage;