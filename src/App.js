import './App.css';
import { Formik,Form,Field,ErrorMessage,FieldArray } from 'formik'
import * as Yup from 'yup'


function App() {

  const initialValues = {
    nombre:'',
    apellido:'',
    correo:'',
    cuidad:'',
    telefonos:[{telefono:''}]

  }

  const validationSchema = Yup.object({
    nombre:Yup.string().matches(/[a-z]/,'No es un formato adecuado,solo minusculas').required('Requerido'),
    apellido:Yup.string().matches(/[a-z]/,'No es un formato adecuado,solo minusculas').required('Requerido'),
    correo:Yup.string().email('Establece tu email en un formato valido').required('Requerido'),
    cuidad:Yup.string().required('Requerido'),
    telefonos:Yup.array().of(Yup.object().shape({
      telefono:Yup.string().required('Requerido')
    }))
    
  })

  const onSubmit = (values,actions) =>{
      alert(JSON.stringify(values));
      actions.setSubmitting(false)
      actions.resetForm()
      
  }
  return (
    <div className="App bg-slate-200" >
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>

      <div className="mt-10 sm:mt-0 ">
        <div className="md:grid md:grid-cols-3 md:gap-6 ">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Informacion personal</h3>
              <p className="mt-1 text-sm text-gray-600">Rinel iñiguez sosa.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 ">
            <Formik 
            initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}
            validateOnChange={false} validateOnBlur={false} >
            {({isSubmitting,values})=>(
            <Form >
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                        Nombre
                      </label>
                      <Field
                        type="text"
                        name="nombre"
                        id="nombre"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage className="text-blue-600" name="nombre"></ErrorMessage>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                        Apellido
                      </label>
                      <Field
                        type="text"
                        name="apellido"
                        id="apellido"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage className="text-blue-600" name="apellido"></ErrorMessage>
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                        Correo Electronico
                      </label>
                      <Field
                        type="text"
                        name="correo"
                        id="correo"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <ErrorMessage className="text-blue-600" name="correo"></ErrorMessage>
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                        Cuidad
                      </label>
                      <Field as="select"
                        id="cuidad"
                        name="cuidad"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      >
                        <option label='Seleciona una opción'></option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>Mexico</option>
                      </Field>
                      <ErrorMessage className="text-blue-600" name="cuidad"></ErrorMessage>
                    </div>

                    <div className="col-span-6">
                      <label htmlFor="Telefonos" className="block text-sm font-medium text-gray-700">
                        Numero Telefonico
                      </label>
                      <FieldArray name="telefonos" render={arrayHelpers =>(
                        <div>
                          {values.telefonos && values.telefonos.length > 0
                          ? (values.telefonos.map((telefono,index)=>(
                              <div className="w-full border-black flex flex-row" key={index}>
                              <Field  className="mt-1 block w-52 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" name={`telefonos.${index}.telefono`}>
                              </Field>
                              <button className="mt-1 block py-2 px-3 bg-red-600 w-16 rounded-md" onClick={()=> arrayHelpers.remove(index)}>-</button>
                              <button className="mt-1 block py-2 px-3 bg-blue-400 w-16 rounded-md" onClick={()=> arrayHelpers.insert(index,'')}>+</button>
                              <br></br>
                              <ErrorMessage className="text-blue-600" name={`telefonos.${index}.telefono`} >
                              </ErrorMessage>
                              <br></br>
                              
                              </div>
                              
                          )))
                          :
                          <button className="mt-1 block py-2 px-3 bg-blue-400 w-16 rounded-md" 
                          onClick={()=> arrayHelpers.push('')}>+</button>
                          }
                           
                        </div>
                        
                      )}>
                      </FieldArray>
                      
                    </div>

                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </Form>
             )}
            </Formik>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default App;
