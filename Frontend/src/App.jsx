import Herosection from "./components/Herosection";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import BooksDetails from "./pages/BooksDetails";
import AllBooks from "./pages/AllBooks";
import AddBook from "./pages/AddBook";
import MyBook from "./pages/myBook";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="relative max-w-7xl mx-auto">
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <Layout>
              <Herosection />
              <Home />
            </Layout>
          }
        />

        {/* Book Details Page */}
        <Route
          path="/books-details/:id"
          element={
            <Layout>
              <BooksDetails />
            </Layout>
          }
        />

        {/* All Books */}

        <Route
          path="/all-books"
          element={
            <Layout>
              <AllBooks />
            </Layout>
          }
        />

        {/* Add Book Page */}
        <Route
          path="/add-book"
          element={
            <Layout>
              <AddBook />
            </Layout>
          }
        />

        {/* My Books List */}
        <Route
          path="/my-books"
          element={
            <Layout>
              <MyBook />
            </Layout>
          }
        />

        {/* Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
