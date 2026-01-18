import toast, { Toaster } from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }: SearchBarProps) => {
  const handleAction = (formData: FormData) => {
    const query = formData.get("query") as string;

    if (!query || query.trim() === "") {
      toast.error("Please enter search term!");
      return;
    }

    onSubmit(query.trim());
  };

  return (
    <header className={styles.header}>
      <div>
        <Toaster />
      </div>
      <form className={styles.form} action={handleAction}>
        <input
          className={styles.input}
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        />
        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
