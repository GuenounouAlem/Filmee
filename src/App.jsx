import Filter from "./Filters";
import Header from "./Header";
import MovieCard from "./MovieCard";

function App() {
  return (
    <>
    <Header></Header>
      <div className="flex flex-col w-full lg:flex-row">
        <Filter></Filter>
        <div className="divider lg:divider-horizontal"></div>
        <MovieCard></MovieCard>
      </div>
    </>
  );
}

export default App;
