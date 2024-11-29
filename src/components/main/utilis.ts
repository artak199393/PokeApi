function OnPaginationWithDots(currPage: number, paginationData: any) {
  function paginate(
    pageNumbers: string[],
    selectedPage: number,
    maxVisiblePages: number = 5,
    ellipsis: string = '...'
  ): (string | string[])[] {
    const numPages = pageNumbers.length;

    if (numPages <= maxVisiblePages) {
      return pageNumbers;
    }

    const halfVisiblePages = Math.floor(maxVisiblePages / 2);

    if (selectedPage <= halfVisiblePages) {
      const visiblePages = pageNumbers
        ? pageNumbers?.slice(0, maxVisiblePages - 1)
        : pageNumbers;
      visiblePages.push(ellipsis);
      visiblePages.push(pageNumbers[numPages - 1]);
      return visiblePages;
    }
    if (selectedPage >= numPages - halfVisiblePages - 1) {
      const visiblePages = [pageNumbers[0], ellipsis];
      visiblePages.push(...pageNumbers.slice(numPages - maxVisiblePages + 1));
      return visiblePages;
    }
    const visiblePages =
      selectedPage > 3 ? [pageNumbers[0], ellipsis] : [pageNumbers[0]];

    const startIdx = selectedPage - halfVisiblePages;
    const endIdx = selectedPage + halfVisiblePages;

    if (pageNumbers.length) {
      visiblePages.push(...pageNumbers.slice(startIdx, endIdx));
    }
    visiblePages.push(ellipsis);
    visiblePages.push(pageNumbers[numPages - 1]);

    return visiblePages;
  }
  let newData;
  if (paginationData) {
    newData = paginate(paginationData, currPage);
  }
  return newData;
}

export default OnPaginationWithDots;
