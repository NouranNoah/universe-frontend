import React from 'react'

export default function CourseInfo({dataCourse,courses}) {
    

  return (
    <div className='firstPage grid-form'>
        <div className='form-group'>
            <label>Course name:</label>
            <input
                type="text"
                value={dataCourse.name|| ""}
                readOnly
                className='medium'
            />
        </div>

        <div className='form-group'>
            <label>Available seats:</label>
            <input type="text"
            value={dataCourse.availableSeats ?? ""}
            readOnly
            className='medium'
            />
        </div>
        <div className='form-group'>
            <label>Number of degrees:</label>
            <input
            type="text"
            readOnly
            value={dataCourse.degrees ?? ""}
            className='large'
            />
        </div>
        <div className='form-group'>
            <label>Number hours:</label>
            <input
            type="text"
            value={dataCourse.hours ?? ""}
            readOnly
            className='medium'
            />
        </div>

        <div className='form-group'>
            <label>Instructor:</label>
            <input type="text" value={dataCourse.professor?.name || ""} readOnly className='small' />
        </div>
        <div className='form-group'>
            <label>Location:</label>
            <input
            type="text"
            value={dataCourse.location|| ""}
            readOnly
            className='small'
            />
        </div>
        <div className="form-group">
            <label>Department</label>
            <input type="text" value={dataCourse.department|| ""} readOnly className='medium'/>
        </div>

        <div className="form-group">
            <label>Semester</label>
            <input type="text" readOnly value={dataCourse.term|| ""} className='small'/>
        </div>

        <div className='form-group full-width'>
            <label>Description:</label>
            <input type="text"
            className='small1'
            value={dataCourse.description}
            readOnly
            />
        </div>
        <div className="form-group full-width">
            <label>Prerequisites:</label>
            <div className="prereq-container">
                <div className="chips">
                    {dataCourse.prerequisites?.length > 0 ? (
                        dataCourse.prerequisites.map((course, index) => {
                            return (
                            <span className="chip" key={index}>
                                {course.name}
                            </span>
                            );
                        })
                    ) : (
                        <span className="empty-text">No prerequisites</span>
                    )}


                </div>
            </div>
        </div>

    </div>
  )
}
