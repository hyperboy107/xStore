import React from 'react'

const CategoryForm = ({value, setValue, handleSubmit, buttonT = "Submit", handleDelete,}) => {
  return (
    <div className="p-3">
        <form onSubmit={handleSubmit}
        className="space-y-3">
        <input type="text" className="py-3 px-4 border rounded-lg w-full" placeholder='Write category value'
            value={value} onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex justify-between">
            <button className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
{buttonT}
            </button>

            {handleDelete && (
                <button onClick={handleDelete} className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">Delete</button>

            )}
        </div>
        </form>
    </div>
  )
}

export default CategoryForm