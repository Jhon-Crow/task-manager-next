export {
  useSelectCurrentPage,
  selectCurrentPage,
} from "./model/selectors/selectPage";

export {
  name as currentPageReducerName,
  reducer as currentPageReducer,
  changePage,
  useActions as useCurrentPageActions,
} from "./model/slice/currentPageSlice";
