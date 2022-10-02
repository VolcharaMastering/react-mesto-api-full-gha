import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header(props) {
    const [headerLine, setHeaderLine] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const { pathname } = useLocation();
    useEffect(() => {
        switch (pathname) {
            case ("/signin"):
                setHeaderLine(<Link to='/signup' className="header__nav-bar">Регистрация</Link>)
                setUserEmail('');
                break;
            case '/signup':
                setHeaderLine(<Link to='/signin' className="header__nav-bar">Вход</Link>)
                setUserEmail('');
                break;
            case '/':
                setHeaderLine(<p onClick={props.onLogout} className="header__nav-bar">Выход</p>)
                setUserEmail(props.userEmail);
                break;
            default:
                setHeaderLine(<Link to='/signin' className="header__nav-bar">Вход</Link>);
                setUserEmail('');
        }
    }, [pathname]);

    return (
        <header className="header header_indent_position">
            <div className="logo"></div>
            <div className="header__ident">
                <p className="header__user">{userEmail}</p>
                {headerLine}
            </div>
        </header>
    );
}

export default Header;