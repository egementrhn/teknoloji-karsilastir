import Link from 'next/link';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={`container ${styles.headerContainer}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.logoIcon}></span>
                    <span className="gradient-text">TeknoKıyas</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/telefons" className={styles.navLink}>Telefonlar</Link>
                    <Link href="/karsilastir" className={styles.navLink}>Karşılaştır</Link>
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}
