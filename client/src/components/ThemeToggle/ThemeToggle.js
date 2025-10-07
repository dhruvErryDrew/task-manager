import { useAtom } from 'jotai';
import { themeAtom } from '../../Atoms';
import './ThemeToggle.css';

function ThemeToggle() {
    const [theme, setTheme] = useAtom(themeAtom);

    function toggleTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <div className="theme-toggle-container">
            <button 
                className={`theme-toggle ${theme}`}
                onClick={toggleTheme}
                aria-label="Toggle theme"
            >
                {theme === 'light' ? '🌙' : '☀️'}
            </button>
        </div>
    );
}

export default ThemeToggle;
