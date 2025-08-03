type SortType = "sort" | "reverse";
type SortField = "name" | "date";
const sortData = (
  data: any[],
  type: SortType = "sort",
  field: SortField = "name"
) => {
  const factor = type === "sort" ? 1 : -1;

  return data.sort((a, b) => {
    let aValue = field === "name" ? a.name : a.createdAt;
    let bValue = field === "name" ? b.name : b.createdAt;

    return aValue.localeCompare(bValue) * factor;
  });
};
export default sortData;
