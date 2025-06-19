import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Dashboard.css';
import { Button, Form, InputGroup,  Row, Col, Card } from "react-bootstrap";

interface Product {
  id: number;
  image_url: string;
  name: string;
}

function Dashboard() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;
  const [show , setshow] = useState<number | null >(null)
  const [numberId , setnumberId] = useState<number | null >(null)
  const [showpop , setshowpop] = useState<boolean>(false)

  useEffect(() =>{
    if(!localStorage.getItem("token"))
    {
      navigate("/")
    } 
   },[])

  // delet
  const popdelet = (id : number) =>{
    setshowpop(true)
    setnumberId(id)
  }
  const deletitem = (id: number) =>{
    axios.delete(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
      headers :{
        Accept : "application/json",
        Authorization :`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then (res => { console.log(res.data)
    })
    .catch(error => console.log(error))
  }
      // get item
    useEffect(() => {
    axios.get("https://web-production-3ca4c.up.railway.app/api/items" , {
      headers : {
        Accept : "application/json",
        Authorization :`Bearer ${localStorage.getItem("token")}`
      }
    })
    .then (res => { console.log(res.data)
        const updatedItems = res.data.map((item: Product) => ({
      ...item,
      image_url: item.image_url ? item.image_url : "/vite.svg"
    }));
    setItems(updatedItems);
      // setItems(res.data)
    })
    .catch(error => console.log(error))
  },[])

  const gotoAddItem = () => {
    navigate("AddIems");
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = 10;

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
// Pagination
  const renderPagination = () => {
  const pages = [];

  if (currentPage > 2) {
    pages.push(
      <button key={1} onClick={() => setCurrentPage(1)} className="page-btn border-0  rounded-circle border border-1 border-style fs-13">1</button>
    );
    if (currentPage > 3) {
      pages.push(<span key="start-ellipsis" className="page-ellipsis">...</span>);
    }
  }

  for (
    let number = Math.max(1, currentPage - 1);
    number <= Math.min(currentPage + 1, totalPages);
    number++
  ) {
    pages.push(
      <button
        key={number}
        className={`page-btn rounded-circle border-0 fs-13 border border-1 border-style ${number === currentPage ? 'active' : ''}`}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </button>
    );
  }

  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      pages.push(<span key="end-ellipsis" className="px-4 lh-1 fs-6 fw-semibold">...</span>);
    }
    pages.push(
      <button key={totalPages} onClick={() => setCurrentPage(totalPages)} className="page-btn border-0  rounded-circle fs-13 border border-1 border-style">
        {totalPages}
      </button>
    );
  }

  return (
    <div className="pagination-wrapper d-flex justify-content-center align-items-center flex-wrap mb-0 ">
      <button
        className="nav-btn d-flex justify-content-center align-items-center border-0 text-black rounded-circle fs-13 border border-1 border-style"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {pages}
      <button
        className="nav-btn rounded-circle border-0 fs-13 border border-1 border-style "
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

 
  return (
    <section className="position-relative paddingright">
      {/* Page delet */}
      {
      showpop && <div className="d-flex justify-content-center align-items-center backtrnsperant  position-fixed">
      <div className="bg-light padpop">
        <p className="text-black fs-22 lh-1 fw-semibold mb-80 ">Are you sure you want to delete the product?</p>
        <div className="d-flex justify-content-between align-items-center">
          <button className="border dorder-0 text-light backColor padyes" onClick={() =>
          {
            if(numberId !== null)
            {
              deletitem(numberId)
              setnumberId(null)
              setshowpop(false)
            }
          } }>Yes</button>
        <button className="border dorder-0 text-light backColor padyes" onClick={() => setshowpop(false)}>No</button>
        </div>
      </div>
    </div>
      }

    <section className="w-100 h-100 ">
      {/* search */}
      <InputGroup className="mb-0 w-664 mx-auto search">
       <Form.Control
          placeholder="Search product by name "
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary" id="button-addon2">
          <img src="/TaskAdv-5/assets/image/search.png" alt="" />
        </Button>
      </InputGroup>
      {/* Add product */}
      <div className="d-flex justify-content-lg-end justify-content-center align-items-center ">
         <button className=" additem reduis-4 fs-14 fw-medium  border border-0 text-light lh-1 mt-5 mb-32" onClick={gotoAddItem} >ADD NEW PRODUCT</button>
       </div>
      {/* products */}
      <div>
        <Row className="position-relative p-0 m-0  " >
          {paginatedItems.map(item => (
            <Col key={item.id} xs={12} sm={6} md={3}className="imgmobile p-0 m-0 rounded-4  "  
            onMouseEnter={() => setshow(item.id)}
            onMouseLeave={() => setshow(null)}>
                    {show === item.id && 
                      <div className=" d-flex justify-content-center align-items-center flex-column  position-absolute hoveradd" 
                       onClick={() => navigate(`ShowItem/${item.id}`)}>
                          <p className="lh-1 fw-medium fs-30 text-black mb-32">{item.name}</p>
                          <div>
                            <Link 
                                to={`EdaitItem/${item?.id}`} 
                                className="lh-1 fw-medium fs-14 text-light py-2 padedit backColor border border-0 reduis-4 text-decoration-none"
                                onClick={(e) => e.stopPropagation()}
                                >
                                Edit
                          </Link>

                          <button
                            className="lh-1 fw-medium fs-14 text-light py-2 backred border border-0 paddelet reduis-4 ms-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              popdelet(item.id);
                            }}>
                            delete
                          </button>
                          </div>
                      </div>
                    }
                <Card.Img variant="top" src={item.image_url} className="w-100 h-100" />    
            </Col>
          ))}
        </Row>
        {renderPagination()}
      </div>
    </section>
    </section>
  );
}

export default Dashboard;
