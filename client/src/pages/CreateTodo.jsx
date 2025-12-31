import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { createTodo } from '../features/todo/todoSlice'
import { SiProtodotio } from "react-icons/si"
import { useFormik} from 'formik'
import { todoValidation } from '../validation/formValidation'
import { SyncLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const CreateTodo = () => {
      let inputStyle = 'inputbox-shadow w-full bg-input rounded-lg py-3 px-5 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder-secondary-text';
      let dispatch = useDispatch()
      let { loading} = useSelector(state=> state.todo)
      const [fileKey, setFileKey] = useState(0);
      

   let formik = useFormik({
        initialValues: { text: '', avatar: null},
        validationSchema: todoValidation,
        onSubmit: async(values) => {
         try {
          let res = await dispatch(createTodo(values))
          toast.success(res.message, { position: "top-right", autoClose: 3000 });
          formik.resetForm();
          setFileKey(prev => prev + 1)
         } catch (err) {
          toast.error(err.error, { position: "top-right", autoClose: 3000 });
         }
        }
      })

  let errors = formik.errors
  let touch = formik.touched

  return (

    <>
     <section className="relative min-h-screen w-full flex items-center justify-center  overflow-hidden text-white"> 
      <div className="shadow-glow relative z-10 w-full max-w-lg p-10 bg-[#121212] rounded-2xl shadow-2xl">
        <div className=' flex justify-center'>
          <SiProtodotio className=' text-7xl text-[#0070f3]'/>
        </div>
        <h2 className="text-2xl font-semibold text-center my-4">Todo Application</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              name='text'
              placeholder="Write here . . . ." 
              className={inputStyle}
              value={formik.values.text}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {
            errors.text && touch.text ?
             <div className=' text-red-500 text-xs mb-2'>{errors.text}</div>
            : null
          }

          <div className="relative">
            <input 
              type="file" 
              key={fileKey}
              name='avatar'
              className={inputStyle}
              onChange={(event) => {
                formik.setFieldValue("avatar", event.currentTarget.files[0]);
              }}
            />
          </div>
          {
            errors.avatar && touch.avatar ?
             <div className=' text-red-500 text-xs mb-2'>{errors.avatar}</div>
            : null
          }

          <button type='submit' className="button cursor-pointer w-full bg-[#0070f3] text-white font-medium py-3 rounded-lg mt-2 transition-all">
            {
            loading ? <SyncLoader size={8} color="#ffffff"/> : 'Create Todo'
           }
          </button>
        </form>

        
      </div>
    </section>

     {error && console.log(error)}
    </>
  )
}
 
export default CreateTodo