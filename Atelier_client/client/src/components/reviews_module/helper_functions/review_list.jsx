export function handleSortType (setSortType) {
  const sort = document.getElementById('sort-type').value;
  setSortType(sort);
  setSort(sort);
}