import React, { useEffect, useState } from 'react'

export default function CourseDetailsStep({form , setForm,departments,instructors,courses}) {
    

    const handleChange = (e)=>{
        const { name, value } = e.target;
        
        if (["availableSeats", "degrees", "hours"].includes(name)) {
            if (!/^\d*$/.test(value)) return;
        }
        setForm({ ...form, [name]: value });
    }

    const addPrerequisite = (course) => {
        if (!course) return;

        if (form.prerequisites.includes(course._id)) return;

        setForm({
            ...form,
            prerequisites: [...form.prerequisites, course._id]
        });

    };

    const removePrerequisite = (courseId, courseName) => {
        setForm({
            ...form,
            prerequisites: form.prerequisites.filter(id => id !== courseId)
        });
    };

    
  return (
    <div className='firstPage grid-form'>
        <div className='form-group'>
            <label>Course name:</label>
            <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="EX: Software Engineering"
                className='medium'
            />
        </div>

        <div className='form-group'>
            <label>Available seats:</label>
            <input type="text"
            name="availableSeats"
            value={form.availableSeats}
            onChange={handleChange}
            placeholder='EX: 100'
            className='medium'
            />
        </div>
        <div className='form-group'>
            <label>Number of degrees:</label>
            <input
            type="text"
            placeholder='EX: 100'
            name='degrees'
            value={form.degrees}
            onChange={handleChange}
            className='large'
            />
        </div>
        <div className='form-group'>
            <label>Number hours:</label>
            <input
            type="text"
            placeholder='EX: 3'
            name='hours'
            value={form.hours}
            onChange={handleChange}
            className='medium'
            />
        </div>

        <div className='form-group'>
            <label className='sellabel'>Instructor:</label>
            <select name="professor" value={form.professor} onChange={handleChange}>
                <option value="">Select Instructor</option>
                {instructors.map(inst => (
                    <option key={inst._id} value={inst._id}>{inst.name}</option>
                ))}
            </select>
        </div>
        <div className='form-group'>
            <label>Location:</label>
            <input
            type="text"
            placeholder='EX: Room 1'
            name='location'
            value={form.location}
            onChange={handleChange}
            className='small'
            />
        </div>
        <div className="form-group">
            <label className='sellabel'>Department</label>
            <select name="department" value={form.department} onChange={handleChange}>
                <option value="">Select Department</option>
                {departments.map(dep => (
                <option key={dep._id} value={dep.name}>{dep.name}</option>
                ))}
            </select>
            

        </div>

        <div className="form-group">
            <label className='sellabel'>Semester</label>
            <select name="term" value={form.term} onChange={handleChange}>
                <option value="">Select Semester</option>
                <option value="First Term">First Term</option>
                <option value="Second Term">Second Term</option>
                <option value="Summer Term">Summer Term</option>
            </select>
        </div>

        <div className='form-group full-width'>
            <label>Description:</label>
            <input type="text"
            name='description'
            className='small1'
            value={form.description}
            onChange={handleChange}
            placeholder='EX: Mohamed EX: focuses on building software using objects, classes, and reusable structures.'
            />
        </div>
        <div className="form-group full-width">
            <label className='sellabel'>Prerequisites:</label>
            <div className="prereq-container">
                <div className="chips">
                    {
                        form.prerequisites.length === 0
                        ?
                        <span className="add-chip">
                            + Add new course
                        </span>
                        :''
                    }
                    {form.prerequisites.map((courseId, index) => {
                        const course = courses.find(c => c._id === courseId);
                        if (!course) return null;
                        return (
                        <span className="chip" key={index}>
                            {course.name}
                            <i
                            className="fa-solid fa-xmark"
                            onClick={() => removePrerequisite(courseId, course.name)}
                            ></i>
                        </span>
                        );
                    })}

                </div>

                <select
                    onChange={(e) => {
                        const selectedCourse = courses.find(c => c._id === e.target.value);
                        addPrerequisite(selectedCourse);
                        e.target.value = "";
                    }}
                    className='selCourse'
                    >
                    <option value="">Specific Course</option>

                    {courses
                        .filter(course => !form.prerequisites.includes(course._id))
                        .map(course => (
                        <option key={course._id} value={course._id}>
                            {course.name}
                        </option>
                        ))}
                </select>


            </div>
        </div>

    </div>
 )
}
