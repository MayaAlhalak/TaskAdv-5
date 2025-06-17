import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './Dashboard.css';
import { Button, Form, InputGroup, Pagination, Row, Col, Card } from "react-bootstrap";

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
  const itemsPerPage = 6;
  const [show , setshow] = useState<number | null >(null)
  const [numberId , setnumberId] = useState<number | null >(null)
  const [showpop , setshowpop] = useState<boolean>(false)

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

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const renderPagination = () => {
    let pages = [];

    if (currentPage > 2) {
      pages.push(<Pagination.Item key={1} onClick={() => setCurrentPage(1)}>1</Pagination.Item>);
      if (currentPage > 3) {
        pages.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
      }
    }

    for (
      let number = Math.max(1, currentPage - 1);
      number <= Math.min(currentPage + 1, totalPages);
      number++
    ) {
      pages.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pages.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
      }
      pages.push(
        <Pagination.Item key={totalPages} onClick={() => setCurrentPage(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return (
      <Pagination className="justify-content-center">
        <Pagination.Prev
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        />
        {pages}
        <Pagination.Next
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    );
  };

  return (
    <section className="position-relative">
      {
      showpop && <div className="d-flex justify-content-center align-items-center backtrnsperant  position-absolute">
      <div className="bg-light padpop">
        <p className="text-black fs-22 lh-1 fw-semibold mb-80 ">Are you sure you want to delete the product?</p>
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
      }
    <section className="w-100 h-100 ">
      <InputGroup className="mb-0 w-664 mx-auto search">
       <Form.Control
          placeholder="Search product by name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button variant="outline-secondary" id="button-addon2">
          <img src="/assets/image/search.png" alt="" />
        </Button>
      </InputGroup>
      <div className="d-flex justify-content-end align-items-center ">
         <button className=" additem fs-14 fw-medium  border border-0 text-light lh-1 mt-5 mb-32" onClick={gotoAddItem} >ADD NEW PRODUCT</button>
       </div>

      <div>
        <Row className="position-relative">
          {paginatedItems.map(item => (
            <Col key={item.id} md={3} className="mb-4"  
            onMouseEnter={() => setshow(item.id)}
            onMouseLeave={() => setshow(null)}>
                    {show === item.id && 
                      <div className=" d-flex justify-content-center align-items-center flex-column  position-absolute hoveradd" >
                          <p className="lh-1 fw-medium fs-30 text-black mb-32">{item.name}</p>
                          <div>
                            <Link to={`EdaitItem/${item?.id}`} className="lh-1 fw-medium fs-14 text-light py-2 padedit backColor border border-0 reduis-4">Edit</Link>
                            <button  className="lh-1 fw-medium fs-14 text-light py-2 backred border border-0 paddelet reduis-4 ms-2" onClick={() => popdelet(item.id)}>delete</button>
                          </div>
                          <div className="hoverLayer   position-absolute">
                            <button 
                              className="  position-relative additem fs-14 fw-medium  border border-0 text-light lh-1 mt-5 mb-32" 
                              onClick={() => navigate(`ShowItem/${item.id}`)}>
                              Show Info
                            </button>
                          </div>
                      </div>
                    }
                <Card.Img variant="top" src={item.image_url} className="imgmobile " />    
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
