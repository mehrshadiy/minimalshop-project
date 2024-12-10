
import {SearchForm} from "@/app/ui/searchForm/SearchForm";
import {CategorySection} from "@/app/ui/sections/CategorySection";
import {getAllCategories} from "@/app/lib/api/Api";

export default async function Home() {

    const categories = await getAllCategories()

    return (
      <>
          <SearchForm/>

          {
              categories &&
              categories.map((category, index) => (
                  <CategorySection category={category} limit={3} link={true} key={index} />
              ))
          }
      </>
  );
}
