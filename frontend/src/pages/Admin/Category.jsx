import {useState} from 'react'
import { toast } from 'react-toastify'
import { useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation,
    useFetchCategoriesQuery } from '../../redux/api/categorySliceApi'
import CategoryForm from '../../components/CategoryForm'
import Modal from '../../components/Modal'
import AdminMenu from './AdminMenu'


const Category = () => {
    const {data: categories} = useFetchCategoriesQuery()
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const [ceateCategory] = useCreateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()

    const handleCreateCategory = async (e) => {
        e.preventDefault()
        if(!name){
            toast.error('Category name is required')
            return
        }
        try {
            const res = await ceateCategory({name}).unwrap()
            if(res.error){
                toast.error(res.error)
            }else{
                setName("")
                toast.success(`${res.name} is created`)
            }
        } catch (error) {
            toast.error('Category creating is failed, try again')
        }
    }

    const handleUpdateCategory = async (e) => {
        e.preventDefault()
        if(!updatingName){ toast.error('Category name is required'); return }

        try {
            const res = await updateCategory({categoryId: selectedCategory._id, updatedCategory: {
                name: updatingName,
            }}).unwrap()
            if(res.error){toast.error(res.error)}
            else{toast.success(`${res.name} is updtaed`)
                setSelectedCategory(null)
                setUpdatingName('')
                setModalVisible(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const handleDeleteCategory = async () => {
        try {
            const res = await deleteCategory(selectedCategory._id).unwrap()
            if(res.error){
                toast.error(res.error)
            }
            else{
                toast.success(`${res.name} is deleted`)
                setSelectedCategory(null)
                setModalVisible(false)
            }
        } catch (error) {
            console.error(error)
            toast.error('Category deleting is failed, try again')
        }
    }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
    <AdminMenu />
        <div className="md:w-3/4 p-3">
            <div className="h-12">Manage Categories</div>
            <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory} /> <br/><hr/>

            <div className="flex flex-wrap">
                {categories?.map((Category) => (
                    <div>
                        <button onClick={() => {{
                            setModalVisible(true)
                            setSelectedCategory(Category)
                            setUpdatingName(Category.name)
                        }}} className="bg-pink-500 border border-pink-500 text-white py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">{Category.name}</button>
                    </div>
                ))}
            </div>
            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <CategoryForm value={updatingName} setValue={(value) => setUpdatingName(value)} 
                handleSubmit={handleUpdateCategory} buttonT="Update"
                handleDelete={handleDeleteCategory} />
            </Modal>
        </div>
    </div>
  )
}

export default Category