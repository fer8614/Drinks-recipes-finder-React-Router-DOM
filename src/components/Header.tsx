import { useEffect, useMemo, useState, ChangeEvent, FormEvent } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore"

export default function Header() {
  const [searchFilters, setSearchFilters] = useState({
    ingredient: "",
    category: "",
  })
  const { pathname } = useLocation()
  const isHome = useMemo(() => pathname === "/", [pathname])
  const fetchCategories = useAppStore((state) => state.fetchCategories);
  const categories = useAppStore((state) => state.categories);
  const searchRecipes = useAppStore((state) => state.searchRecipes);
  const shoNotification = useAppStore((state) => state.showNotification);

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleChange = (e: ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    setSearchFilters({
      ...searchFilters,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: validate
    if (Object.values(searchFilters).includes("")) {
      shoNotification({
        text: "All fields are required",
        error: true
      })
      return
    }
    // Consult API
    searchRecipes(searchFilters)
  }

  return (
    <header className={isHome ? "bg-header bg-center bg-cover" : "bg-slate-800"}>
      <div className="mx-auto container px-5 py-16">
        <div className="flex justify-between items-center">
          <div>
            <img className="w-32" src="/logo.svg" alt="logo" />
          </div>
          <nav className="flex gap-4"   >
            <NavLink
              className={({ isActive }) => isActive ? "font-bold uppercase text-orange-500 hover:text-orange-500" : "text-slate-100 font-bold uppercase hover:text-slate-500"}
              to={"/"}>
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => isActive ? "font-bold uppercase text-orange-500 hover:text-orange-500" : "text-slate-100 font-bold uppercase hover:text-slate-500"}
              to={"/favorites"}>
              Favorites
            </NavLink>
          </nav>
        </div>

        {isHome && (
          <form
            className="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="space-y-4">
              <label
                htmlFor="ingredient"
                className="block text-white uppercase font-extrabold text-lg"
              >Name or ingredient</label>

              <input
                id="ingredient"
                type="text"
                name="ingredient"
                className="p-3 w-full rounded-lg focus:outline-none"
                placeholder="Name or Ingredient. Example: vodka, tequila, etc."
                onChange={handleChange}
                value={searchFilters.ingredient}
              />
            </div>
            <div className="space-y-4">
              <label
                htmlFor="category"
                className="block text-white uppercase font-extrabold text-lg mt-5"
              >Category</label>

              <select
                id="category"
                name="category"
                className="p-3 w-full rounded-lg focus:outline-none"
                onChange={handleChange}
                value={searchFilters.category}

              >
                <option value="">--- Selection ---  </option>
                {categories.drinks.map((category) => (
                  <option
                    key={category.strCategory}
                    value={category.strCategory}
                  >
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
            <input
              type="submit"
              value="Search Recipes"
              className="cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase  mt-5"
            />
          </form>
        )}
      </div>
    </header>
  )
}
