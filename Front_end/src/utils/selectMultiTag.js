export const categoryOption = (category) => ({
  value: category._id,
  label: category.title,
});

export const filterCategory = (inputValue, categoryData) => {
  const fileOptions = categoryData
    .map(categoryOption)
    .filter((category) =>
      category.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  return fileOptions;
};
