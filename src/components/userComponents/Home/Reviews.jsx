import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { ButtonGroup } from "react-bootstrap";
import axios from "../../../services/axiosInterceptor";
import { toast } from "react-hot-toast";
import "./Reviews.css"; 
function Reviews() {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);

  const data = useSelector((state) => state.appointment);
  const doctorId = data?.appointment?.doctorId?._id;
  const userId = data?.appointment?.userId?._id;
  const userName = data?.appointment?.userId?.name;

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const navigate = useNavigate();

  // useEffect(()=>{
  //     console.log(rating,'rating');
  //     console.log(review,'review');
  // },[review,rating])

  const handleSubmit = async () => {
    await axios
      .post(`/rating`, { review, rating, doctorId, userId, userName })
      .then((res) => {
        toast.success(`Feedback submitted`);
        navigate("/");
      });
  };

  return (
    <>
      <div className="text-center">
        <h1 className="title">Thank You</h1>
        <p className="sub-title">
          Hope you had a good session with the doctor, and we are here for your
          future assistance.
        </p>
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
                          variant={rating >= value ? "warning" : "light"}
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

export default Reviews;
