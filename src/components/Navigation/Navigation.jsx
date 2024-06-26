import { NavLink } from 'react-router-dom';
import css from './Navigation.module.css'
import clsx from 'clsx';


const Navigation = () => {


    return (
        <>
            <nav className={css.navbar}>
                <NavLink className={({isActive}) => {return clsx(css.navLink, isActive && css.isActive ) }} to='/'>Home</NavLink>
                <NavLink className={css.navLink} to='/movies'>Movies</NavLink>
            </nav>
        </>
    )
}

export default Navigation;