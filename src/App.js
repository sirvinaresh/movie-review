import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import { useFormik } from 'formik';
import Rating from 'react-rating';
import 'font-awesome/css/font-awesome.min.css';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { SiTicktick } from "react-icons/si";
import { BiCameraMovie } from "react-icons/bi";
import { MdLocalMovies,MdDelete } from "react-icons/md";
import { TiDelete } from "react-icons/ti";

let vali = Yup.object({
  title:Yup.string().required('title must be required...'),
  review:Yup.string().min(10,'please enter min 10 character...') .required('review must be required...'),
  rating:Yup.number().min(1,'please provide rating')
})
function App() {
  
   const [data,setdata] = useState([]);

  let init = {
    title:'',
    review:'',
    rating:0,
    rec:false
  }

  const {values,errors,touched,handleBlur,handleChange,handleSubmit,resetForm,setFieldValue} = useFormik({
    initialValues:init,
    validationSchema:vali,
    onSubmit:(values)=>{
      const record = [...data,values]
      setdata(record)
      localStorage.setItem("movie",JSON.stringify(record))
    }
  })

 const remove = (index) =>{
  const record = data.filter((ele,i)=> i !==index)
  setdata(record)
  localStorage.setItem("movie",JSON.stringify(record))
 }

  useEffect(()=>{
    setdata(JSON.parse(localStorage.getItem("movie")) || []);
  },[])
  
  return (
    <div className="App">
      <Container className='text-light mt-5'>
        <Row >
          {/* get review */}
          <Col lg={4} md={6} sm={12} xs={12} className='box border border-2 border-warning bg-transparent shadow p-3 mb-3 h-25'>
            <form action="" onSubmit={handleSubmit}>
          <h2 className='pb-4'>Movie Review <BiCameraMovie /></h2> 
            <div className="my-3">
              <div>
                <label htmlFor="formGroupExampleInput" className="form-label">Moview Title</label>
                <input type="text" className="form-control bg-transparent text-light" id="formGroupExampleInput" name='title' value={values.title} onBlur={handleBlur} onChange={handleChange}/>
                {(touched.title && errors.title) ? <font color="red">{errors.title}</font> : null}
              </div>

              <div>
                <label htmlFor="floatingTextarea" className="form-label mt-3">Moview Review</label>
                <textarea className="form-control bg-transparent text-light " rows={3} id="floatingTextarea" name='review' value={values.review} onBlur={handleBlur} onChange={handleChange}/>
                {(touched.review && errors.review) ? <font color="red">{errors.review}</font> : null}
              </div>

              <div>
                <label htmlFor="rat" className="form-label mt-3">Rating</label> <br /> 
                <Rating
                stop={5}
                initialRating={values.rating}
                onChange={(rate)=>{setFieldValue('rating',rate)}}
                emptySymbol="fa fa-star-o fa-2x text-warning"
                fullSymbol="fa fa-star fa-2x text-warning"
              /> <br />
              {(touched.rating && errors.rating) ? <font color="red">{errors.rating}</font> : null}
              </div>

             <div className="form-check my-3">
              <input className="form-check-input bg-transparent text-light" type="checkbox" name='rec' onChange={handleChange} checked={values.rec} id="gridCheck" />
              <label className="form-check-label" htmlFor="gridCheck">Recommend Movie</label>
            </div>
            
           <button type="submit" className="btn btn-outline-primary w-100 text-light fw-bold">Submit</button>

            {/* <input type="submit" value="Submit" className='btn1 border bg-transparent  text-light' /> */}
             </div>
            </form>
          </Col>

          {/* display review */}
          <Col lg={7} md={6} sm={12} xs={12} className=' bg-transparent rounded-4 ms-lg-auto  p-4' >
            {
              data.map((val,i)=>{
                return(
                  <>
                    <div className='shadow mb-3 rounded-5 border-end border-start px-4 py-3 '>
                      <div className='d-flex justify-content-between'>
                        <h2>{val.title} <MdLocalMovies /></h2> 
                        <h2><TiDelete className='text-danger' onClick={()=>{remove(i)}}/></h2>

                      </div>  
                    <small >
                      <Rating
                      initialRating={val.rating} 
                      stop={val.rating}
                      emptySymbol="fa fa-star-o fa-2x text-warning"
                      fullSymbol="fa fa-star fa-2x text-warning"
                      readonly
                    />
                    </small>

                    <p className='my-3'>{val.review}</p>
                    {val.rec ? <p className='text-success fw-bold'><SiTicktick /> Recommended</p> : <p className='text-danger fw-bold'> Not Recommended</p> }
                    </div>
                  </>
                )
              })
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
