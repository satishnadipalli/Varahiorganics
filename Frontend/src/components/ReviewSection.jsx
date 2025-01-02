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
        url: './bglessprofile.png',
      },
      name: 'Swetha',
      review: "I switched to organic rice and I can feel the difference. The taste of basmati is so pure, and it cooks perfectly every time. It's a healthier choice for my family!",
      position: 'Software Engineer',
      enabled: true,
      _id: '65f1fcdf0556c3f887e9d74c',
    },
    {
      image: {
        public_id: 'portfolio3/1710357705657-aimydg.png',
        url: './bglessprofile.png',
      },
      name: 'Meera',
      review: 'I purchased  Varahi organic rice, and it’s amazing! The aroma is so natural, and the rice is perfect for traditional  dishes .I’m never going back to regular rice again.',
      position: 'Project Manager',
      enabled: true,
      _id: '65f1fcca0556c3f887e9d6e8',
    },
    {
      image: {
        public_id: 'portfolio3/1710357726628-c4dr18.png',
        url: './bglessprofile.png',
      },
      name: 'Jyoti',
      review: 'Organic rice is not just healthy; it also reminds me of the rice my grandmother used to cook. I love how clean and chemical-free it is. My family can taste the difference too!',
      position: 'Software Engineer',
      enabled: true,
      _id: '65f1fcdf0556c3f887e9d74c',
    },
    {
      image: {
        public_id: 'portfolio3/1710357705657-aimydg.png',
        url: './bglessprofile.png',
      },
      name: 'Aditi',
      review: 'The quality of this  varahi organic rice is unmatched. I love how fluffy the cooked grains are, and the earthy aroma makes it so appetizing. Great value for money!',
      position: 'Project Manager',
      enabled: true,
      _id: '65f1fcca0556c3f887e9d6e8',
    },
    
  ],
};


const ReviewSection = () => {
  return (
    <div style={{boxShadow:"none",width:'100%',margin:"auto"}}>
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
          // className="swiper-container"
          style={{width:"100%"}}
        >
          {data.testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial._id}>
              <div className="testimonial-slide" style={{display:"grid"}}>
                {/* <img src={semicolum} className='semicol' alt="Here is your semi column" /> */}
                <p className="testimonial-review">"{testimonial.review}"</p>
                <div className='slide_info '>
                  <img className='testimonial-image ml-5' src={testimonial.image.url} alt="" />
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