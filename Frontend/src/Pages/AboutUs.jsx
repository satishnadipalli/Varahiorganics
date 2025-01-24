import React, { useState, useEffect, useRef } from 'react';
import './AboutUs.css';

const AdvancedAboutUs = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState({});
  const sectionRefs = useRef({});

  // const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const testimonials = [
    { content: "I switched to Kujipatalia organic rice and I can feel the difference. The taste of rice is so pure, and it cooks perfectly every time. It's a healthier choice for my family!", author: "Sandeep Reddy" },
    { content: "I purchased  Varahi organic rice, and it’s amazing! The aroma is so natural, and the rice is perfect for all dishes .I’m never going back to regular rice again.", author: "Ramesh.D" },
    { content: "Switching to  Varahi organic rice was the best decision for my family. The traditional  Kujipatalia rice variety is perfect for our daily meals. It's chemical-free, light, and tastes just like home!", author: "Sowmya Kasu" },
    // { content: "Fantastic customer support and quick response.", author: "Anna Lee" },
  ];
  

  

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsIntersecting(prev => ({ ...prev, [entry.target.id]: entry.isIntersecting }));
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach(
      (ref) => ref && observer.observe(ref)
    );

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleTestimonialClick = (index) => {
    setActiveTestimonial(index);
  };

  return (
    <div className="about-us">
      <section className="hero">
        <div className="hero-content">
          <h1 className=' font-bold text-emerald-200 shadow-xl'>Nourishing India,Feeding Traditions</h1>
          <p>Discover the pure essence of organic living</p>
        </div>
      </section>

      <section 
        ref={el => sectionRefs.current['story'] = el} 
        id="story" 
        className={`section story ${isIntersecting['story'] ? 'fade-in' : ''}`}
      >
        <div className="story-content">
          <h2 className={`section-title ${isIntersecting['story'] ? 'visible' : ''}`}>Our Journey</h2>
          <p>
          Our journey began in 2016 in the  farming fields of Vijjeswaram village, where we embraced organic farming with a commitment to purity and sustainability. Since then, we have dedicated ourselves to cultivating organic rice using traditional methods, including the use of cow's gomutram and gomayam, to ensure natural and wholesome produce. Our mission is to bring the essence of authentic organic farming to every table
          </p>
          <p>
            {/* Today, we continue to grow, innovate, and inspire, always staying true to our roots and our unwavering commitment to the health of our planet and its people. Every product we offer is a testament to this journey - a journey of love, respect, and harmony with nature. */}
          </p>
        </div>
        <img src="https://wallpapercave.com/w200/wp10648986.jpg" alt="Our organic farm" className="story-image" />
      </section>

      <section 
        ref={el => sectionRefs.current['values'] = el} 
        id="values" 
        className={`section values ${isIntersecting['values'] ? 'fade-in' : ''}`}
      >
        <h2 className={`section-title ${isIntersecting['values'] ? 'visible' : ''}`}>Our Core Values</h2>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">🌱</div>
            <h3>Sustainability</h3>
            <p>We nurture the earth that nurtures us, employing regenerative farming practices to ensure a healthier planet for generations to come.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🤝</div>
            <h3>Community</h3>
            <p>We believe in the power of community, fostering strong relationships with local farmers, artisans, and customers to create a resilient food ecosystem.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">🍎</div>
            <h3>Quality</h3>
            <p>We are uncompromising in our commitment to quality, ensuring that every product we offer meets the highest standards of purity and nutrition.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">💚</div>
            <h3>Transparency</h3>
            <p>We believe in open, honest communication about our products and practices, empowering our customers to make informed choices.</p>
          </div>
        </div>
      </section>

      <section 
        ref={el => sectionRefs.current['team'] = el} 
        id="team" 
        className={`section team ${isIntersecting['team'] ? 'fade-in' : ''} m-atuo`}
      >
        <h2 className={`section-title ${isIntersecting['team'] ? 'visible' : ''}`}>Meet Our Family</h2>
        <div className="team-grid m-atuo">
          <div className="team-member">
            <img className="m-auto"  src="https://media.istockphoto.com/photos/old-farmer-holding-digital-tablet-picture-id547133100?b=1&k=20&m=547133100&s=170667a&w=0&h=TzaClWim4cPhK25MQEfgmVQlKdzluRqQdr15Ac8WEME=" alt="Jane Doe" />
            <div className="team-member-info">
              <h3>Sri RamaChandra Murthy</h3>
              <p>Organic Rice Farmer</p>
            </div>
          </div>
          <div className="team-member">
            <img className="m-auto" src="https://media.istockphoto.com/photos/old-farmer-holding-digital-tablet-picture-id547133100?b=1&k=20&m=547133100&s=170667a&w=0&h=TzaClWim4cPhK25MQEfgmVQlKdzluRqQdr15Ac8WEME=" alt="John Smith" />
            <div className="team-member-info">
              <h3>John Smith</h3>
              <p>Master Farmer</p>
            </div>
          </div>
          <div className="team-member">
            <img className="m-auto" src="https://media.istockphoto.com/photos/old-farmer-holding-digital-tablet-picture-id547133100?b=1&k=20&m=547133100&s=170667a&w=0&h=TzaClWim4cPhK25MQEfgmVQlKdzluRqQdr15Ac8WEME=" alt="Emily Brown" />
            <div className="team-member-info">
              <h3>Emily Brown</h3>
              <p>Sustainability Expert</p>
            </div>
          </div>
          <div className="team-member">
            <img className="m-auto" src="https://media.istockphoto.com/photos/old-farmer-holding-digital-tablet-picture-id547133100?b=1&k=20&m=547133100&s=170667a&w=0&h=TzaClWim4cPhK25MQEfgmVQlKdzluRqQdr15Ac8WEME=" alt="Michael Lee" />
            <div className="team-member-info">
              <h3>Michael Lee</h3>
              <p>Community Liaison</p>
            </div>
          </div>
        </div>
      </section>

      {/* <section 
        ref={el => sectionRefs.current['timeline'] = el} 
        id="timeline" 
        className={`section timeline ${isIntersecting['timeline'] ? 'fade-in' : ''}`}
      >
        <h2 className={`section-title ${isIntersecting['timeline'] ? 'visible' : ''} `}>Our Growth</h2>
        <div className="timeline-item left">
          <div className="timeline-content">
            <h3>2010</h3>
            <p>Founded as a small family farm with a vision for organic, sustainable agriculture.</p>
          </div>
        </div>
        <div className="timeline-item right">
          <div className="timeline-content">
            <h3>2013</h3>
            <p>Expanded to partner with local farmers, creating a network of organic producers.</p>
          </div>
        </div>
        <div className="timeline-item left">
          <div className="timeline-content">
            <h3>2016</h3>
            <p>Launched our e-commerce platform, bringing organic products directly to consumers nationwide.</p>
          </div>
        </div>
        <div className="timeline-item right">
          <div className="timeline-content">
            <h3>2019</h3>
            <p>Implemented regenerative farming practices across our entire network, further enhancing sustainability.</p>
          </div>
        </div>
        <div className="timeline-item left">
          <div className="timeline-content">
            <h3>2022</h3>
            <p>Achieved carbon-neutral status and expanded our product line to include artisanal, organic-based goods.</p>
          </div>
        </div>
      </section> */}

      <section className="testimonials">
      <h2 className="section-title">What Our Customers Say</h2>
      <div className="testimonial-slider">
        <button className="prev" onClick={prevTestimonial}>
          &#10094;
        </button>
        <div className="testimonial-card">
          <p className="testimonial-content">"{testimonials[activeTestimonial].content}"</p>
          <p className="testimonial-author">- {testimonials[activeTestimonial].author}</p>
        </div>
        <button className="next" onClick={nextTestimonial}>
          &#10095;
        </button>
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === activeTestimonial ? 'active' : ''}`}
            onClick={() => setActiveTestimonial(index)}
          ></span>
        ))}
      </div>
    </section>

      <section className="section cta bg-green-300">
        <img src="./logo.png" className='w-24 m-auto' alt="" />
        <h2 className="section-title">Join Our Organic Revolution</h2>
        <p>Experience the difference of truly organic, sustainably-sourced products.</p>
        <a href="/store" className="cta-button">Shop Now</a>
      </section>
    </div>
  );
};

export default AdvancedAboutUs;

