import React, { useEffect, useState } from 'react'
import { deleteSpecificComponentFun, getComponentOfCourseFun } from '../../../services/DoctorServices/gradeDocService'
import './Ccomponent.css'
import AddComponent from './AddComponent'
import EditComponent from './EditComponent'

export default function Component({ courseId  ,onComponentsChange}) {
  const [components, setComponents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [componentId, setComponentId] = useState('');
  const [componentName, setComponentName] = useState('');
  const [componentpercentage, setComponentpercentage] = useState('');
  const [showDelete, setShowDelete] = useState('');
  console.log('idCourse',courseId);
  
  
  const getComponent = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await getComponentOfCourseFun(courseId)
      setComponents(data || [])
      if (onComponentsChange) onComponentsChange()
    } catch (err) {
        console.log(err.response);
      setError("Failed to load components")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (courseId) getComponent()
  }, [courseId])

  
  
  const deleteComponent= async()=>{
    if(components.length===1){
        setError("Cannot be deleted the only component!")
        return
    }
    setLoading(true);
    try{
        await deleteSpecificComponentFun(courseId , componentId)
        console.log('deleted');
        setShowDelete(false);
        getComponent();
    }catch(err){
        setError('failed to delete Component!')
        console.log(err.response);
    }finally{
        setLoading(false);
    }
  }
  if (loading) return <p>Loading components...</p>
  if (error) return <p className="error">{error}</p>

  return (
    <div className="components-wrapper">
        <div className="components-header">
        <h3>Grade Components</h3>
        <button
            className="btn-add"
            disabled={components.length >= 4 && totalPercentage >= 100}
            onClick={() => setShowAddModal(true)}
        >
            + Add Component
        </button>
        {error && <p className="error">{error}</p>} 
        {loading && <p>Loading components...</p>}
        </div>

        {!loading && (
        <>
            {!components.length ? (
            <p className="noYet">No Components Yet!</p>
            ) : (
            <div className="components-grid">
                {components.map((item, index) => (
                <div className="component-card" key={index}>
                    <div className="card-header">
                    <h4>{item.name}</h4>
                    <span className="percentage">{item.percentage}%</span>
                    </div>
                    <div className="btns-group">
                    {
                        components.length !== 1 ? (
                            <button
                        className="left-btn"
                        onClick={() => {
                        setShowDelete(true);
                        setComponentId(item._id);
                        setComponentName(item.name);
                        }}
                    >
                        <i className="fa-solid fa-ban"></i> Delete
                    </button>
                        ):''
                    }
                    <button
                        className="right-btn"
                        onClick={() => {
                        setShowEdit(true);
                        setComponentId(item._id);
                        setComponentName(item.name);
                        setComponentpercentage(item.percentage);
                        }}
                    >
                        <i className="fa-regular fa-pen-to-square"></i> Edit
                    </button>
                    </div>
                </div>
                ))}
            </div>
            )}
        </>
        )}

        {/* Modals */}
        {showAddModal && (
        <div className="modal-overlay">
            <AddComponent
            courseId={courseId}
            setShowAddModal={setShowAddModal}
            getComponent={getComponent}
            />
        </div>
        )}
        {showEdit && (
        <div className="modal-overlay">
            <EditComponent
            componentpercentage={componentpercentage}
            componentName={componentName}
            courseId={courseId}
            componentId={componentId}
            setShowEdit={setShowEdit}
            getComponent={getComponent}
            />
        </div>
        )}

        {showDelete && (
        <div className="deletemsgD">
            <p>Are You sure you want to delete {componentName}?</p>
            <div>
            <button
                className="left-btn"
                onClick={() => deleteComponent()}
            >
                {loading ? "Loading..." : "Delete"}
            </button>
            <button
                className="right-btn"
                onClick={() => setShowDelete(false)}
            >
                Cancel
            </button>
            </div>
        </div>
        )}
    </div>
);

}
