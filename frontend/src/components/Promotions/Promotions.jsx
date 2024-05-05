// import { useState } from "react";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Card from "react-bootstrap/Card";
// import { useQuery } from "react-query";
// import axios from "axios";
// import "react-datepicker/dist/react-datepicker.css";
// import NavBar from "../Header/Header";
// import Footer from "../Footer/Footer";
// import Modal from "react-bootstrap/Modal";
// // import { useParams } from "react-router-dom";
// //import "./style.css";
// import { Button } from "react-bootstrap";
// import Carousel from 'react-bootstrap/Carousel';
// const AllPromotions = () => {
//   const handleClose = () => setShow(false)
//   const [show, setShow] = useState(false)
//   const [searchQuery, setSearchQuery] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [memberData, setMemberData] = useState([]);
//   //   const params = useParams();
//   //   const memberId = params.id;

//   const handleNameClick = (member) => {
//     setMemberData(member);
//     setShowModal(true);
//   };

//   // use react query and fetch member data
//   const { data, isLoading, isError } = useQuery(
//     "acceptedMemberData",
//     async () => {
//       const response = await axios.get("http://localhost:3001/promotion");
//       return response.data;
//     }
//   );

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }

//   if (isError) {
//     return <p>Error loading data</p>;
//   }

  
//   // Apply filters to the data
//   const filteredData = data.filter(
//     (member) =>
//       Object.values(member).some((value) =>
//         value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//       ) &&
//       (categoryFilter
//         ? member.category.toLowerCase() === categoryFilter.toLowerCase()
//         : true)
//   );

//   return (
//     <>
//       <div
//         style={{ backgroundColor: "#271066", height: "60px" }}
//         className="d-flex justify-content-center align-items-center"
//       >
//         <center>
//           <h5 style={{ color: "white" }}>Sign Up and get 10% off. Sign Up </h5>
//         </center>
//       </div>
//       <br />
//       <br />
//       <NavBar />
//       <br />
//       <div>
//         <br />
//         <center>
//           <div>
            
//             <div style={{ margin: "20px", padding: "20px" }}>
//               <Row xs={1} md={3} className="g-4" style={{ padding: "20px" }}>
//                 {filteredData.map((member) => (
//                   <Carousel key={member}>
//                   <Carousel.Item interval={1000}>
//                     <img src={member.image} alt="" />
//                     <Carousel.Caption>
//                       <h3>First slide label</h3>
//                       <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//                     </Carousel.Caption>
//                   </Carousel.Item>
                  
//                 </Carousel>
//                 ))}
//               </Row>
//             </div>

//             {/* Modal */}
//             <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//               <Modal.Header closeButton>
//                 <Modal.Title>{memberData.promotionTitle}</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//               <div
//                           dangerouslySetInnerHTML={{
//                             __html: memberData.description,
//                           }}
//                         />
//                 <hr />
//                 <div>
                  
//                   <p>
//                     <strong>Terms & Conditions: </strong>{" "}
//                     {memberData.termsNconditions}
//                   </p>
//                   <p>
//                     <strong>Valid for: </strong> {memberData.startDate}
//                     <strong> -</strong> $ {memberData.endDate}
//                   </p>
//                   <p>
                    
//                   </p>
//                 </div>
//                 <br />
//                 <center>
//                   <Row>
//                     <Col>
//                       <Button
//                       onClick={handleClose}
//                         style={{
//                           backgroundColor: "black",
//                           borderColor: "black",
//                         }}
//                       >
//                         Close
//                       </Button>
//                     </Col>
                    
//                   </Row>
//                 </center>
//                 <br />
//               </Modal.Body>
//             </Modal>
//           </div>
//         </center>
//       </div>
//       <br />
//       <br />
//       <Footer />
//     </>
//   );
// };

// export default AllPromotions;


import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-query";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import NavBar from "../Header/Header";
import Footer from "../Footer/Footer";
import Modal from "react-bootstrap/Modal";
// import { useParams } from "react-router-dom";
//import "./style.css";
import { Button } from "react-bootstrap";
import "./Promotions.css";
import 'react-multi-carousel/lib/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Carousel from 'react-bootstrap/Carousel';

const AllPromotions = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {setShowModal(false)};
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [memberData, setMemberData] = useState([]);
  //   const params = useParams();
  //   const memberId = params.id;
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  
 

  const handleNameClick = (member) => {
    setMemberData(member);
    setShowModal(true);
  };
  

  // use react query and fetch member data
  const { data, isLoading, isError } = useQuery(
    "acceptedMemberData",
    async () => {
      const response = await axios.get("http://localhost:3001/promotion");
      return response.data;
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }

  
  // Apply filters to the data
  const filteredData = data.filter(
    (member) =>
      Object.values(member).some((value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      (categoryFilter
        ? member.category.toLowerCase() === categoryFilter.toLowerCase()
        : true)
  );
  
    

  return (
    
    <>
      <div
        style={{ backgroundColor: "#271066", height: "60px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <center>
          <h5 style={{ color: "white" }}>Sign Up and get 10% off. Sign Up </h5>
        </center>
      </div>
      <br />
      <br />
      <NavBar />
      <br />
      <div>
        <br />
        <center>
          <div>
          <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item interval={1000}>
      <img style={{maxHeight:'450px', maxWidth:'1425px'}}  src="https://i.ytimg.com/vi/LFlW4QhUUfE/maxresdefault.jpg" />

        <Carousel.Caption>
          <h3>Exclusive Card Offers for you</h3>
          <p>NDB cards only valid</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item  interval={1000}>
      <img style={{maxHeight:'450px', maxWidth:'1425px'}} src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t39.30808-6/299950081_5727174290647027_6316019789937536919_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEEraUhvQnnKFMlnKrJiEOzTiRYGTkf_XNOJFgZOR_9c0GmlN0bd8tsaFEo95BNqeT52wALBvIg94UnlMt7OPo0&_nc_ohc=KpXquOayQLIQ7kNvgEIoLPO&_nc_ht=scontent.fcmb2-2.fna&oh=00_AfASTJWVrCGX6El0fY-ocvzPPeH02hN3LRzU3THJJWdS-w&oe=663B0408" />

        <Carousel.Caption>
          <h3>New Arrivals......!</h3>
          <p>Latest desings & offers</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
      <img style={{maxHeight:'450px', maxWidth:'1425px'}} className="img-size" src="https://exclusivelines.lk/wp-content/uploads/2023/06/OFFER-BANNER.png" />

        <Carousel.Caption>
          <h3>Limited time Offers</h3>
          <p>
              Up to 50% on selected items.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
          
          
            
            <div style={{ margin: "20px", padding: "20px" }}>
              <Row xs={1} md={3} className="g-4" style={{ padding: "20px" }}>
                {filteredData.map((member) => (
                  <Col key={member.cusMemberID}>
                    <center>
                    <Card
                    
                    
                      style={{
                        marginBottom: "20px",
                        padding: "10px",
                        borderRadius: "10px",
                        borderWidth: "2px",
                        borderColor: "black",
                        backgroundColor: "Transparent",
                        height:"350px",
                          width:"350px"
                      }}
                      onClick={() => handleNameClick(member)}
                          
                    >
                      <Card.Body>
                        
                        
                        <Card.Img style={{
                          height:"200px",
                          width:"200px"
                        
                      }}variant="top" src={member.image} />
                      <br/>
                      <br/>
                      <Card.Title>{member.promotionTitle}</Card.Title>
                        
                        
                        <Button
                          onClick={() => handleNameClick(member)}
                          style={{
                            backgroundColor: "Transparent",
                            borderColor: "black",
                            color:"black",
                            
                          }}
                        >
                          <i>Shop Now</i>
                        </Button>
                      </Card.Body>
                    </Card>
                    </center>
                  </Col>
                ))}
              </Row>
            </div>

            {/* Modal */}
            
            <Modal
             
            show={showModal} onHide={() => setShowModal(false)} centered>
              <Modal.Header closeButton className="custom-modal">
                <Modal.Title>{memberData.promotionTitle}</Modal.Title>
              </Modal.Header>
              <Modal.Body >
              <div
                          dangerouslySetInnerHTML={{
                            __html: memberData.description,
                          }}
                        />
                <hr />
                <div>
                  
                  <p>
                    <strong>Terms & Conditions: </strong>{" "}
                    {memberData.termsNconditions}
                  </p>
                  <p>
                    <strong>Valid for: </strong> {new Date(memberData.startDate).toLocaleDateString()}
                    <strong> -</strong>{new Date(memberData.endDate).toLocaleDateString()}
                  </p>
                  <p>
                    
                  </p>
                </div>
                <br />
                <center>
                  <Row>
                    <Col>
                    <Button variant="primary" onClick={handleClose}
                    style={{ width: "400px",backgroundColor:"black" }}>
            Close
          </Button>
                    </Col>
                    
                  </Row>
                </center>
                <br />
              </Modal.Body>
            </Modal>
          </div>
        </center>
      </div>
      <br />
      <br />
      <Footer />
    </>
  );
};

export default AllPromotions;
