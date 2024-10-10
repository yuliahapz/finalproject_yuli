// import React from 'react';
// import { Pagination } from 'antd';
// const onChange = (pageNumber) => {
//   console.log('Page: ', pageNumber);
// };
// const App = () => (
//   <>
//     <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
//     <br />
//     <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} disabled />
//   </>
// );
// export default App;

// const [currentPage, setCurrentPage] = useState(1);
// const [totalPages, setTotalPages] = useState(1);

// <div className="flex justify-center items-center space-x-2 mt-8">
// <button 
//     onClick={goToPreviousPage} 
//     disabled={currentPage === 1} 
//     className={`inline-block w-24 px-4 py-1 text-sm ${currentPage === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} rounded text-center`}
// >
//     Previous
// </button>
// <button 
//     onClick={goToNextPage} 
//     disabled={currentPage === totalPages} 
//     className={`inline-block w-24 px-4 py-1 text-sm ${currentPage === totalPages ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'} rounded text-center`}
// >
//     Next
// </button>
// </div>
// <span className="block text-center mt-4">Page {currentPage} of {totalPages}</span>
// </div>


// const goToNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
// };

// const goToPreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
// };
