import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination, Navigation } from 'swiper/modules'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ReviewSection.css';
// import semicolum from "./assets/colun.svg";
// Testimonial data
const data = {
  testimonials: [
    {
      image: {
        public_id: 'portfolio3/1710357726628-c4dr18.png',
        url: 'https://th.bing.com/th/id/OIP.EPkaFgMMDNRVNbu15yC5wwHaEK?rs=1&pid=ImgDetMain',
      },
      name: 'Samantha Wu',
      review: 'I had the pleasure of working closely with John on a challenging project. He is a highly skilled developer who consistently delivered excellent results  making to stay consistant at out times to us good environment...',
      position: 'Software Engineer',
      enabled: true,
      _id: '65f1fcdf0556c3f887e9d74c',
    },
    {
      image: {
        public_id: 'portfolio3/1710357705657-aimydg.png',
        url: 'https://th.bing.com/th/id/OIP.EPkaFgMMDNRVNbu15yC5wwHaEK?rs=1&pid=ImgDetMain',
      },
      name: 'David Rodriguez',
      review: 'Throughout our project, John demonstrated exceptional technical skills and a strong work ethic. He consistently met deadlines and produced high-quality code and making to stay consistant at out times to us good environment...',
      position: 'Project Manager',
      enabled: true,
      _id: '65f1fcca0556c3f887e9d6e8',
    },
    {
      image: {
        public_id: 'portfolio3/1710357726628-c4dr18.png',
        url: 'https://th.bing.com/th/id/OIP.EPkaFgMMDNRVNbu15yC5wwHaEK?rs=1&pid=ImgDetMain',
      },
      name: 'Samantha Wu',
      review: 'I had the pleasure of working closely with John on a challenging project. He is a highly skilled developer who consistently delivered excellent results  making to stay consistant at out times to us good environment...',
      position: 'Software Engineer',
      enabled: true,
      _id: '65f1fcdf0556c3f887e9d74c',
    },
    {
      image: {
        public_id: 'portfolio3/1710357705657-aimydg.png',
        url: 'https://th.bing.com/th/id/OIP.EPkaFgMMDNRVNbu15yC5wwHaEK?rs=1&pid=ImgDetMain',
      },
      name: 'David Rodriguez',
      review: 'Throughout our project, John demonstrated exceptional technical skills and a strong work ethic. He consistently met deadlines and produced high-quality code  making to stay consistant at out times to us good environment...',
      position: 'Project Manager',
      enabled: true,
      _id: '65f1fcca0556c3f887e9d6e8',
    },
    
  ],
};


const ReviewSection = () => {
  return (
    <div style={{marginBottom:"60px"}}>
      <h4 className='feed-from' style={{textAlign:"center",marginTop:"80px",marginBottom:"20px",color:"#2d3748",fontWeight:"500"}}>Feed From Employees and Clients</h4>
      <h5 className='eco'>We've changed the way hundreds of teams work today with the products we are building in the HR ecosystem.</h5>
      <div className="testimonial-container">
        <Swiper
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Pagination, Navigation]}
          className="swiper-container"
          // style={{backgroundColor:"orange"}}
        >
          {data.testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div className="testimonial-slide" style={{display:"grid"}}>
                {/* <img src={semicolum} className='semicol' alt="Here is your semi column" /> */}
                <p className="testimonial-review">"{testimonial.review}"</p>
                <div className='slide_info'>
                  <img className='testimonial-image' src={testimonial.image.url} alt="" />
                  <div className='ccc'>
                    <span className='testimonial-name'>{testimonial.name}</span>
                    <span className='testimonial-position'>{testimonial.position}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </div>
  );
};

export default ReviewSection;