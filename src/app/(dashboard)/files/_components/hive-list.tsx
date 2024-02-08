import EmptyFavourites from "./empty-favourites";
import EmptyHives from "./empty-hives";
import EmptySearch from "./empty-search";

interface HiveListParams {
  orgId: string;
  query: {
    search?: string;
    favourites?: string;
  };
}

export default function HiveList({ orgId, query }: HiveListParams) {
  const data = []; // TODO: Change to actual API call

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favourites) {
    return <EmptyFavourites />;
  }

  if (!data?.length) {
    return <EmptyHives />;
  }

  return <div>List</div>;
}
