

interface typeText  {
    img : string ;
    title : string ;
    text : string ;
    show: boolean
}
function Title({img , title , text , show} : typeText) {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <img src= {img} alt="" className='mb-42' />
      <h2 className='lh-1 fw-semibold text-dark mb-2 fs-22' >{title}</h2>
      <p className={`lh-1 color-gray mb-50 fs-14  ${show ? 'mb-50' : "mb-4"}`} >{text}</p>
    </div>
  )
}

export default Title
