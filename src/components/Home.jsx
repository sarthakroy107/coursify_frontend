import { useEffect, useState } from "react"
import { apiConnector } from "../../services/apiConnector";
import { endpoints } from "../../services/api";

const Home = () => {
  const [searchType, setSerchType] = useState(false);
  const [categoryData, setCategoryData] = useState([])
  const [tagIds, setTagIds] = useState([])
  const [tagDetails, setTagDetails] = useState([])
  const [tagIndex, setTagIndex] = useState([])
  const [studentArray, setStudentArray] = useState([])

  const findCategory = async () => {
    const categories = await apiConnector("POST", endpoints.GET_CATEGORIES)
    //console.log(categories?.data?.data);
    setCategoryData(categories?.data?.data)
  }

  const fetchTags = async (e) => {
    console.log(e.target.value)
    const tags = await apiConnector("POST", endpoints.GET_TAGS, {categoryId: e.target.value})
    console.log(tags?.data?.data);
    setTagDetails(tags?.data?.data)
    setTagIds([])
    setStudentArray([])
  }

  const studentData = async () => {
    const studentDatas = await apiConnector("POST", endpoints.GET_STUDENTS, {
      tags: tagIds
    })
    console.log(studentDatas?.data?.data)
    setStudentArray(studentDatas?.data?.data)
  }
  useEffect(()=>{
    findCategory()
  }, [])


  useEffect(()=>{
    console.log(tagIds)
    if(tagIds.length) {
      studentData();
    }
  }, [categoryData, tagDetails, tagIds])

  useEffect(()=>{

  }, [studentArray])


  return (
    <main className='w-full min-h-screen'>
        <div className='bg-purple-600 w-full flex justify-center p-5 py-20 min-h-min'>
          <div className="text-4xl w-1/2 font-bold text-white/90 flex justify-center flex-col items-center">
            <p className="text-center my-4">Where techies realise their true potential</p>
            <p className="text-xl font-normal text-center my-4">
              Look beyond the obvious. Use Cutshort to easily get discovered by awesome companies and get referred 
              to job positions very few know about.
            </p>
            <div className="flex gap-4 text-xl font-normal">
              <button className="border border-white/90 hover:scale-95 duration-150 p-2 px-3 rounded-md bg-white text-purple-600">Hire</button>
              <button className="border border-white/90 hover:scale-95 duration-150 p-2 px-3 rounded-md bg-white text-purple-600">Find job</button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
            <div className="w-11/12 md:w-4/5 xl:w-2/3 flex items-center justify-center p-2 flex-col">
              <h2 className="text-2xl font-medium my-5">Find what you want</h2>
              <div className="md:h-24 rounded-md w-full border border-black flex flex-col md:flex-row justify-between p-3">
                <div className="w-2/3 md:w-1/4">
                  <div className="flex gap-2 border border-black/30 rounded-full h-fit p-3 px-4">
                    <div onClick={()=>setSerchType(false)}
                    className={`${searchType ? "" : "bg-purple-500/75 text-white"} p-2 px-3 rounded-full cursor-pointer`}>Job post</div>
                    <div onClick={()=>setSerchType(true)}
                    className={`${searchType ? "bg-purple-500/75 text-white" : ""} p-2 px-3 rounded-full cursor-pointer`}>Candidate</div>
                  </div>
                </div>
                <div className="w-4/5 md:w-1/4 mx-5 border border-black/30 p-2 px-3 rounded-full flex justify-center items-center h-16">
                  <label className="mx-2">Category</label>
                  <select onChange={fetchTags} className="outline-none rounded-full p-1 px-2 bg-slate-400/50" name="">
                    <option selected disabled hidden>Choose category</option>
                    {
                      categoryData.map((category, index)=>(
                        <option value={category._id} key={index}>{category.name}</option>
                      )) 
                    }
                  </select>
                </div>
                <div className="w-4/5 my-3 md:my-0 md:w-2/4 flex justify-center items-center">
                  {
                    tagDetails.length === 0 ? (
                      <div>Select category</div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {
                          tagDetails.map((tag, index)=>(
                            <div onClick={()=>{setTagIds([...tagIds, tag._id]); setTagIndex([...tagIndex, index])}}
                            key={index} className={`${tagIndex.includes(index) ? "bg-purple-500/75 text-white":"border border-black/30"} p-1 
                            cursor-pointer px-2 rounded-md`}> 
                              {tag.name}
                            </div>
                          ))
                        }
                      </div>
                    )
                  }
                </div>
              </div>
              <div className={`w-full mt-16 ${studentArray.length ? "border border-black": ""} grid grid-cols-2 gap-2 p-2`}>
                {
                  studentArray.map((student, index)=>(
                    <div className="w-full border border-black/50 rounded-sm p-1 px-3"
                     key={index}>
                      <p className="text-2xl font-medium">{student.user.name} | Experience: {student.experience} years</p>
                      <p className="text-md text-slate-700/50">{student.user.email}</p>
                      <p>{student.workFromHome ? (<p className="text-sm text-slate-500">Work from home only</p>): 
                      (<p className="text-sm text-slate-500">Work from home & work from office</p>)}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
    </main>
  )
}
export default Home