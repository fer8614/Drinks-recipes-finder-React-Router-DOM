import { useMemo } from "react"
import { useAppStore } from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {

  const drinks = useAppStore((state) => state.drinks)

  const hasDrinks = useMemo(() => drinks.drinks.length, [drinks])

  return (
    <>
      <h1 className="text-6xl font-extrabold text-center sm:text-justify md:mx-44 sm:mx-auto">Recipes</h1>

      {hasDrinks ? (
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-10 gap-10 mx-5 md:mx-10 lg:mx-44">
          {drinks.drinks.map((drink) => (
            <DrinkCard
              key={drink.idDrink}
              drink={drink}
            />
          ))}
        </div>
      ) : (
        <p className="my-10 text-center text-2xl">
          There are no recipes, please search in the form
        </p>
      )}
    </>
  )
}
