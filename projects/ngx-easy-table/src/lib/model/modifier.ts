interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  initialCollectionSize: number;
  filteredCollectionSize: number;
}

export interface Modifier {
  filters: Map<string, string>;
  pagination: Pagination;
}
