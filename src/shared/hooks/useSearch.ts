import React, {
  useEffect,
  useRef,
} from "react";
import * as JsSearch from "js-search";
import debounce from "lodash/debounce";

type UseSearchProps<T> = {
  list?: T[];
  searchableFields: string[];
};
export default function useSearch<T>(props: UseSearchProps<T>) {
  const { list, searchableFields } = props;
  const search = useRef<JsSearch.Search | null>();
  const [inputSearch, setInputSearch] = React.useState("");
  const debounceSearch = React.useCallback(debounce(onSearch, 1000), []);

  useEffect(() => {
    search.current = new JsSearch.Search("id");
    searchableFields.forEach((field) => {
      search.current?.addIndex(field);
    });
    search.current?.addDocuments(list ?? []);
  }, [list]);

  const filteredSearch = React.useMemo(() => {
    if(inputSearch) {
      return search.current?.search(inputSearch) ?? list;
    }
    return list ?? []
  }, [inputSearch, search.current, list]) as T[];

  const state = {
    results: filteredSearch,
  };

  const handlers = {
    onInputChange,
  };

  return [state, handlers] as const;

  function onInputChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | undefined>) {
    event.persist();
    debounceSearch(event.currentTarget?.value);
  }

  function onSearch(value: string) {
    setInputSearch(value);
  }
}
