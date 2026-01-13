import React, { useEffect, useState } from 'react'
import backicon from '../../assets/Back.png'
import { getAllDepartment } from '../../services/departmentService';
import { addCoursesFun, getInstructorNameFun } from '../../services/coursesServices';
import { getInstructorsFun } from '../../services/usersService';
import CourseDetailsStep from './CourseDetailsStep';
import CourseScheduleStep from './CourseScheduleStep';
export default function AddCourse({courses,setShowAddModal,getCourses ,coursesType}) {
    const [activeStep , setActiveStep] = useState(false);
    const [nextPage, setNextPage]  = useState(false);
    const [loading , setLoading] = useState(false);
    const [ errormsg , setErrormsg]=useState('');
    const [departments , setDepartments] = useState([]);
    const [instructors , setInstructors] = useState([]);
    
    const [form , setForm] = useState({
        name: "",
        availableSeats: "",
        degrees: "",
        hours: "",
        professor: "", 
        location: "", 
        department: "", 
        term: "", 
        description: "",
        prerequisites: [],
        schedule: [],
        type: coursesType
    })
    
    const handleSubmit = async (e)=>{
        console.log('data: ',form);
        
        e.preventDefault();
        const {
            name,
            availableSeats,
            professor,
            location,
            department,
            term
        } = form;

        if (
            !name.trim() ||
            !availableSeats || availableSeats <= 0||
            !professor.trim() ||
            !department ||
            !location ||
            !term
        ) {
            setErrormsg("Please fill all data!");
            return;
        }
        setLoading(true);
        const payload = {
        ...form,
        availableSeats: Number(form.availableSeats),
        degrees: Number(form.degrees),
        hours: Number(form.hours),
        type: coursesType 
        };

        

        try{
            const data = await addCoursesFun(payload); 
            getCourses();
            setShowAddModal(false);
        }catch(err){
            console.log(err.response?.data);
            if(err.response?.data?.errors && err.response.data.errors.length > 0){
                setErrormsg(err.response.data.errors[0].msg);
            } else {
                setErrormsg(err.response?.data?.msg || "Failed to add Course");
            }
        }finally{
            setLoading(false);
        }

    }
    const handleNextStep = (e)=>{
        e.preventDefault(e);
        setActiveStep(true);
        setNextPage(true);
    }
    const handlePrevStep = ()=>{
        setActiveStep(false);
        setNextPage(false);
    }
    const getDepartments = async ()=>{
        try{
            const data = await getAllDepartment();
            setDepartments(data.allDepartments);
            
        }catch(err){
            console.log("error", err);
            setErrormsg(err.response?.data?.message || "Failed to fetch departments");
        }
    }
    const getInstructors = async ()=>{
        try{
            const data = await getInstructorNameFun(coursesType);
            setInstructors(data);
        }catch(err){
            console.log("error", err);
            setErrormsg(err.response?.data?.errors?.[0]?.msg|| "Failed to fetch Instructors!");
        }
    }
    useEffect(()=>{
        getDepartments();
        getInstructors();
        getCourses();
    },[])
    
    return (
        <div className="modal-boxs">
            <i
                className="closeicon fa-solid fa-xmark"
                onClick={() => setShowAddModal(false)}
            ></i>
            <h3>Add New Course</h3>
            
            <div className='nextsteps'>
                <div className='numsteps'>
                    <div className='activeStep'>1</div>
                    <p>Details</p>
                </div>
                <div className={activeStep? 'lineSteps activeline': 'lineSteps lineSteps'}>
                    <div className='line'></div>
                    {errormsg? <p className="error">{errormsg}</p>:""}
                </div>
                <div className='numsteps'>
                    <div className={activeStep? 'activeStep' : 'notActiveStep'}>2</div>
                    <p>Schedule</p>
                </div>
            </div>
            <div className='longForm'>
                <form onSubmit={handleSubmit}>
                {!nextPage?
                    <CourseDetailsStep
                    form={form}
                    setForm={setForm}
                    departments={departments}
                    instructors={instructors}
                    courses={courses}
                    />
                    :
                    <CourseScheduleStep form={form} setForm={setForm} />
                }
                
                <div className='btns-group'>
                    <button type="button" className={nextPage? 'left-btn': 'disnon'} onClick={handlePrevStep}>
                        <img src={backicon} alt="BackIcon" style={{width:'20px'}} />
                        Back
                    </button>
                    {
                        !nextPage?
                            <button
                            type="button"
                            onClick={(e) => handleNextStep(e)}
                            className='right-btn right-btnnot'
                            >
                                <i className="fa-solid fa-share"></i>
                                next
                            </button>
                        :
                            <button type='submit' className='right-btn'>
                                {
                                    loading?
                                    'Saving...'
                                    :
                                    <>
                                    <i className="fa-regular fa-circle-check"></i>
                                    Save
                                    </>
                                }
                            </button>
                    }
                </div>
            </form>
            </div>
        </div>
    )}
