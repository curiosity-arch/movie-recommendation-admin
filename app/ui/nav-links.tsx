import Link from "next/link";
import styles from "@/public/styles/side-nav.module.css";
import { ButtonSignOutAdmin } from './buttonSignOut';

const SideBar = () => {
    const menuItems = [
        { name: 'Home', path: '/dashboard'},
        { name: 'User', path: '/dashboard/user'},
        { name: 'Admin', path: '/dashboard/admin'},
    ];

    return (
        <>
            {menuItems.map((item) => (
                <Link
                    key={item.path}
                    href={item.path}
                    className={styles.item}
                >
                    {item.name}
                </Link>
            ))}
            <div>
                <ButtonSignOutAdmin />
            </div>
        </>
    );
};

export { SideBar };