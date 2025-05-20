const Pagination = ({ currentPage, setcurrentPage, totalPage }) => {
  const generatePagination = () => {
    let page = [];
    if (currentPage > 0) page.push(1);
    let window = [];

    if (currentPage > Math.trunc(totalPage / 2) && totalPage > 7) {
      page.push('...');
    }

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 1 && i <= totalPage - 1) {
        window.push(i);
      }
    }

    if (window.length < 5) {
      if (window[window.length - 1] < totalPage - 1) {
        let remaining = 5 - window.length;
        while (remaining > 0 && window[window.length - 1] < totalPage - 1) {
          let last = window[window.length - 1];
          window.push(last + 1);
          remaining--;
        }
      } else if (window[window.length - 1] === totalPage - 1) {
        let remaining = 5 - window.length;
        while (remaining > 0 && window[0] > 2) {
          window.unshift(window[0] - 1);
          remaining--;
        }
      }
    }

    page = [...page, ...window];

    if (currentPage <= Math.trunc(totalPage / 2) && totalPage > 7) {
      if (currentPage <= totalPage - 3) page.push('...');
    }

    if (!page.includes(totalPage)) {
      page.push(totalPage);
    }

    return page;
  };

  return (
    <div className="flex gap-4 justify-center">
      <button
        disabled={currentPage === 0}
        className={`border-1 rounded-lg py-1 px-3 text-lg font-bold my-2 
        ${
          currentPage === 1
            ? 'cursor-not-allowed bg-gray-300 text-white'
            : 'hover:bg-gray-500 hover:text-white'
        } `}
        onClick={() => setcurrentPage((prev) => prev - 1)}
      >
        Prev
      </button>
      <div className="flex gap-4">
        {generatePagination().map((ele, idx) => {
          if (ele === '...') {
            return <button className="text-xl font-bold" key={idx}>{ele}</button>;
          }
          return (
            <button
              className={`border-1 rounded-lg py-1 px-3 text-lg font-bold my-2 cursor-pointer ${
                currentPage === ele
                  ? 'bg-black text-white'
                  : 'hover:bg-gray-500 hover:text-white'
              }`}
              key={idx}
              onClick={() => setcurrentPage(ele)}
            >
              {ele}
            </button>
          );
        })}
      </div>
      <button
        disabled={currentPage === totalPage}
        className={`border-1 rounded-lg py-1 px-3 text-lg font-bold my-2 
        ${
          currentPage === totalPage
            ? 'cursor-not-allowed bg-gray-300 text-white'
            : 'hover:bg-gray-500 hover:text-white'
        } `}
        onClick={() => setcurrentPage((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
