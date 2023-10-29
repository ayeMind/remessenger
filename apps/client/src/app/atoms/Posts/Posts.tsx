export default function Posts({ postList }: { postList: string[] }) {
    const postListItems = postList.map((item, index) => (
      <div className="flex items-center mt-4 ">
        <div className=" rounded-[50%] h-8 w-8 bg-white" />
        <div
          key={index}
          className=" ml-2 h-12 rounded-lg bg-[#191621] flex items-center pl-2"
        >
          <p className='pl-1 pr-4'>{item}</p>
        </div>
      </div>
    ));
  
    return (
      <ul className="overflow-y-auto w-[28rem] h-[90vh]">
        {postListItems}
      </ul>
    );
  }
  