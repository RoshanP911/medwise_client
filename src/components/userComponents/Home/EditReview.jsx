
// import React, { useEffect } from "react";
// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";
// import { ButtonGroup } from "react-bootstrap";
// import axios from "../../../services/axiosInterceptor";
// import { toast } from "react-hot-toast";
// import "./Reviews.css"; 


// function EditReview() {




  
//   const location = useLocation(); 
//   const userrId = location.state.userId ;
//   const doctorrId=location.state.doctorId
  
//   console.log(userrId,'useridd');
//   console.log(doctorrId,'daktarrridd');


//     return (
//     <>
//       <div className="text-center">
//         {/* <h1 className="title">Thank You</h1> */}
//         {/* <p className="sub-title">
//           Hope you had a good session with the doctor, and we are here for your
//           future assistance.
//         </p> */}
//         <Container>
//           <Row className="justify-content-center">
//             <Col>
//               <h3 className="section-title">Your Review & Ratings</h3>
//             </Col>
//           </Row>
//           <Row className="justify-content-center">
//             <Col>
//               <Card className="mt-4 mb-4">
//                 <Card.Body>
//                   <div className="text-center mb-4">
//                     <h3>Rating:</h3>
//                     <ButtonGroup>
//                       {[1, 2, 3, 4, 5].map((value) => (
//                         <Button
//                           // key={value}
//                           // variant={rating >= value ? "warning" : "light"}

//                           // onClick={() => handleRatingClick(value)}
//                         >
//                           <FaStar />
//                         </Button>
//                       ))}
//                     </ButtonGroup>
//                     {/* <p>You rated this {rating} stars.</p> */}
//                   </div>

//                   <h5 className="text-center">Write a Feedback</h5>
//                   <form>
//                     <div className="text-center">
//                       <input
//                         type="text"
//                         // value={review}
//                         placeholder="Enter your reviews..."
//                         className="form-control review-input"
//                         // onChange={(e) => setReview(e.target.value)}
//                       />
//                     </div>
//                   </form>
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </Container>
//         <br />
//         <button
//           className="btn btn-success submit-button"
//           // onClick={handleSubmit}
//         >
//           Submit
//         </button>
//       </div>
//     </>
//   );
// }



// export default EditReview;






















import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";
import axios from "../../../services/axiosInterceptor";
import { toast } from "react-hot-toast";
import "./Reviews.css"; 

function EditReview() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [existReview, setExistReview] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  //FROM APPOINTMENT PAGE
  const location = useLocation(); 
  const userId = location.state.userId ;
  const doctorId=location.state.doctorId
  const userName=location.state.userName

  console.log(userId,'useridd');
  console.log(doctorId,'daktarrridd');


  useEffect(() => {
    const getReviews = async () => {
      try {
        // const response = await doctorList();
        const response = await axios.post(`/edit-review`, { userId,doctorId });
console.log(response,'ressssssmeeeeeeee');
const old=response.data.allRatings[0]
console.log(old,'oldldldlddll');

setRating(old?.rating)
setReview(old?.feedback)

        if (response.data.success) {
          console.log(old,'jjjjjjjjjjj');
          setExistReview(old);
        } 
        else {
          console.error("API request failed with:", response.data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
      //  finally {
      //   setIsLoading(false);
      // }
    };

    
    getReviews();
  }, []);





  // const data = useSelector((state) => state.appointment);
  // const doctorId = data?.appointment?.doctorId?._id;
  // const userId = data?.appointment?.userId?._id;
  // const userName = data?.appointment?.userId?.name;

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const navigate = useNavigate();
 
  const handleSubmit = async () => {
    await axios
      .post(`/rating`, { review, rating, doctorId, userId,userName})
      .then((res) => {
        toast.success(`Feedback submitted`);
        navigate("/");
      });
  };

  console.log(existReview,'rexxxxxxxxxx');

  return (
    <>
    
      <div className="text-center">
        <Container>
          <Row className="justify-content-center">
            <Col>
              <h3 className="section-title">Your Review & Ratings</h3>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col>
              <Card className="mt-4 mb-4">
                <Card.Body>
                  <div className="text-center mb-4">
                    <h3>Rating:</h3>
                    <ButtonGroup>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <Button
                          key={value}
                          variant={(rating )>= value ? "warning" : "light"}
                          onClick={() => handleRatingClick(value)}
                        >
                          <FaStar />
                        </Button>
                      ))}
                    </ButtonGroup>
                    <p>You rated this {rating} stars.</p>
                  </div>

                  <h5 className="text-center">Write a Feedback</h5>
                  <form>
                    <div className="text-center">
                      <input
                        type="text"
                        value={review}
                        placeholder="Enter your reviews..."
                        className="form-control review-input"
                        onChange={(e) => setReview(e.target.value)}
                      />
                    </div>
                  </form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <br />
        <button
          className="btn btn-success submit-button"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default EditReview;
